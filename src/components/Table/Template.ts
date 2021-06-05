import { isUndefined } from "lodash"
import { Array2D } from "./Array2D"
import { TemplateItem } from "./TemplateItem"
import { Coordinate, ItemMap, RawTemplate } from "./types"

export type Direction = "row" | "col"
export type SpacingType = "margin" | "padding"
export type Position = "top" | "right" | "bottom" | "left"

const MARGIN_COL_AREA = "_mca"
const MARGIN_ROW_AREA = "_mra"
const PADDING_COL_AREA = "_pca"
const PADDING_ROW_AREA = "_pra"
const POS_T = "top"
const POS_R = "right"
const POS_B = "bottom"
const POS_L = "left"
const positions: Position[] = [POS_T, POS_R, POS_B, POS_L]
const spacingAreas = [
  [MARGIN_ROW_AREA, PADDING_ROW_AREA],
  [MARGIN_COL_AREA, PADDING_COL_AREA]
]

function getSpacingAreaName(direction: Direction, type: SpacingType) {
  return spacingAreas[direction === "row" ? 0 : 1][type === "margin" ? 0 : 1]
}

function regInDirectionAndType(direction: Direction, type: SpacingType) {
  return regForSpacingArea(getSpacingAreaName(direction, type))
}

function regForSpacingArea(area: string) {
  return new RegExp(`^(${area})_(\\w+)_(${positions.join("|")})$`)
}

export function isSpacingArea(area: string) {
  return spacingAreas.some((_) =>
    _.some((spacingArea) => regForSpacingArea(spacingArea).test(area))
  )
}

export function getTypePosAreaFromSpacing(spacing: string) {
  const sAreas = new Array2D(spacingAreas)
  const direction: Direction = sAreas.getRow(0).some((_) => regForSpacingArea(_).test(spacing))
    ? "row"
    : "col"
  const type: SpacingType =
    sAreas
      .getRow(direction === "row" ? 0 : 1)
      .findIndex((_) => regForSpacingArea(_).test(spacing)) === 0
      ? "margin"
      : "padding"
  const res = regInDirectionAndType(direction, type).exec(spacing)
  const area = res?.[2] as string
  const pos = res?.[3] as Position
  return { area, pos, type }
}

export class Template {
  public template: TemplateItem[][]

  constructor(rawTemplate: RawTemplate, itemMap: ItemMap) {
    this.template = this.resolve(rawTemplate, itemMap)
  }

  resolve(rawTemplate: RawTemplate, itemMap: ItemMap): TemplateItem[][] {
    rawTemplate = this.clearDupRowAndCol(rawTemplate)
    rawTemplate = this.insertCellInAllDirections(rawTemplate, itemMap)
    const temp = this.resolveTemplate(rawTemplate)

    // temp.print("resovedTemplate")
    return temp.output()
  }

  private insertCellInAllDirections(rawTemplate: RawTemplate, itemMap: ItemMap): RawTemplate {
    const area2DOr = new Array2D(rawTemplate)
    const area2DAppendedCell = area2DOr
      .fmap((area2DOr) => {
        const [yMaxOr, xMaxOr] = area2DOr.edge()
        return this.insertCellInDirection(area2DOr, itemMap, yMaxOr + 1, "row", "margin")
      })
      .fmap((area2DRM) => {
        const [yMaxRM, xMaxRM] = area2DRM.edge()
        return this.insertCellInDirection(area2DRM, itemMap, xMaxRM + 1, "col", "margin")
      })
      .fmap((area2DCM) => {
        const [yMaxCM, xMaxCM] = area2DCM.edge()
        return this.insertCellInDirection(area2DCM, itemMap, yMaxCM + 1, "row", "padding")
      })
      .fmap((area2DRP) => {
        const [yMaxRP, xMaxRP] = area2DRP.edge()
        return this.insertCellInDirection(area2DRP, itemMap, xMaxRP + 1, "col", "padding")
      })
    // area2DAppendedCell.print("area2DAppendedCell")
    return area2DAppendedCell.output()
  }

  private insertCellInDirection(
    area2D: Array2D<string>,
    itemMap: ItemMap,
    gapMax: number,
    direction: Direction,
    type: SpacingType
  ): Array2D<string> {
    const reg = regInDirectionAndType(direction, type)
    const directionInRow = () => direction === "row"
    const typeIsMargin = () => type === "margin"
    const isSpacingArea = (text: string) => reg.test(text)
    const isSameSpacingArea = (area1: string, area2: string) => {
      return getArea(area1) === getArea(area2)
    }
    const getArea = (text: string) => {
      const res = reg.exec(text)
      return res ? res[2] : text
    }
    const spacingInput = { mt: 0, mr: 1, mb: 2, ml: 3 }
    const ahead = directionInRow() ? spacingInput.mt : spacingInput.ml
    const behind = directionInRow() ? spacingInput.mb : spacingInput.mr
    const SPACING_AREA = directionInRow()
      ? typeIsMargin()
        ? MARGIN_ROW_AREA
        : PADDING_ROW_AREA
      : typeIsMargin()
      ? MARGIN_COL_AREA
      : PADDING_COL_AREA

    const spacingRecord = new Array2D<string[]>()
    const spacingRecordRowsOrCols = directionInRow()
      ? () => spacingRecord.rows()
      : () => spacingRecord.cols()

    const getRowOrCol = directionInRow()
      ? (i: number) => area2D.getRow(i)
      : (i: number) => area2D.getCol(i)

    const insertRowOrCol = function <T>(array2D: Array2D<T>, items: T[]) {
      return direction == "row" ? array2D.insertRow(items) : array2D.insertCol(items)
    }

    // 生成插入单元格位置的记录表
    for (let gap = 0; gap < gapMax; gap++) {
      const left = gap - 1
      const right = gap
      const mrLeftOfGap = getRowOrCol(left).map((area) => {
        const m = (itemMap.get(area)?.[type] || [0, 0, 0, 0])[behind]
        // 确定空隙的类型以及位置
        return m > 0 ? `${SPACING_AREA}_${area}_${directionInRow() ? POS_B : POS_R}` : area
      })
      const mlRightOfGap = getRowOrCol(right).map((area) => {
        const m = (itemMap.get(area)?.[type] || [0, 0, 0, 0])[ahead]
        // 确定空隙的类型以及位置
        return m > 0 ? `${SPACING_AREA}_${area}_${directionInRow() ? POS_T : POS_L}` : area
      })

      const spacingArea = mrLeftOfGap.map((mr, i) => {
        const ml = mlRightOfGap[i]
        if (isSameSpacingArea(ml, mr)) {
          const area = getArea(ml)
          return [area, area]
        }
        return [mr, ml]
      })
      insertRowOrCol(spacingRecord, spacingArea)
    }

    const newArea2D = new Array2D<string>()
    spacingRecordRowsOrCols().forEach((record, gap) => {
      const left = gap - 1
      const mrOfLeft = record.map((_) => _[0])
      const mlOfRight = record.map((_) => _[1])
      if (left >= 0) insertRowOrCol(newArea2D, getRowOrCol(left))
      if (mrOfLeft.some((_) => isSpacingArea(_))) insertRowOrCol(newArea2D, mrOfLeft)
      if (mlOfRight.some((_) => isSpacingArea(_))) insertRowOrCol(newArea2D, mlOfRight)
    })
    // area2D.print(`-- ${type}-${direction}:area2D --`)
    // spacingRecord.print(`-- ${type}-${direction}: spacingRecord --`)
    // newArea2D.print(`-- ${type}-${direction}:newArea2D --`)

    return newArea2D
  }

  private resolveTemplate(rawTemplate: RawTemplate) {
    const area2D = new Array2D(rawTemplate)
    const checkedMark = "_checked"
    const [yMax, xMax] = area2D.edge()
    const temp = new Array2D<TemplateItem>()
    let x = 0
    let y = 0
    while (y < yMax) {
      // 解析 area 横跨的列数和行数（找到id最右下角的位置即可确定）
      const { area, lastX, lastY } = this.locateLastCoord({
        rawTemplate,
        origin: { x, y },
        edge: { x: xMax, y: yMax },
        checkedMark
      })

      if (area !== checkedMark) {
        const colSpan = lastX - x + 1
        const rowSpan = lastY - y + 1
        const templateItem = new TemplateItem(area, rowSpan, colSpan)
        // 将解析结果插入二维数组
        temp.insert(templateItem, y)
      }

      // 继续解析下一个 area
      x = lastX + 1
      if (x >= xMax) {
        y += 1
        x = 0
      }
    }

    return temp
  }

  private clearDupRowAndCol(rawTemplate: RawTemplate): RawTemplate {
    const arrOr = new Array2D(rawTemplate)
    const arrNoDupRowAndCol = arrOr
      .fmap((arr) => {
        const arrNoDupRow = new Array2D<string>()
        return arr.rows().reduce((pre, cur) => {
          const isDup = cur.every((area, col) => area === pre.get(pre.edge()[0] - 1, col))
          if (!isDup) pre.insertRow(cur)
          return pre
        }, arrNoDupRow)
      })
      .fmap((arr) => {
        const arrNoDupCol = new Array2D<string>()
        return arr.cols().reduce((pre, cur) => {
          const isDup = cur.every((area, row) => area === pre.get(row, pre.edge()[1] - 1))
          if (!isDup) pre.insertCol(cur)
          return pre
        }, arrNoDupCol)
      })

    return arrNoDupRowAndCol.output()
  }

  private locateLastCoord({
    rawTemplate,
    origin,
    edge,
    checkedMark = ""
  }: {
    rawTemplate: RawTemplate
    origin: Coordinate
    edge: Coordinate
    checkedMark: string
  }) {
    const area2D = new Array2D(rawTemplate)
    const area = area2D.get(origin.y, origin.x)
    if (isUndefined(area)) throw `no area at origin`
    let lastX = origin.x
    let lastY = origin.y

    for (let x = origin.x; x < edge.x; x++) {
      const curArea = area2D.get(origin.y, x)
      if (curArea !== area) break
      lastX = x
    }

    loop: for (let y = origin.y; y < edge.y; y++) {
      for (let x = origin.x; x <= lastX; x++) {
        const curArea = area2D.get(y, x)
        // 如果当前元素不相同，退出循环
        if (curArea !== area) break loop
      }
      // 如果上面整行都相同，则更新 LastY
      // 并将该行标记为已查询，避免重复
      lastY = y
      for (let x = origin.x; x <= lastX; x++) {
        area2D.set(y, x, checkedMark)
      }
    }

    return { area, lastX, lastY }
  }
}
