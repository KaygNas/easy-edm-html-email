import React, { CSSProperties, TableHTMLAttributes } from "react"
import { isSpacingArea, Template, getTypePosAreaFromSpacing, Position } from "./Template"
import { TableItem } from "./types"

export type TableProps = {
  template: string[]
  items: TableItem[]
  align?: "left" | "center" | "right"
  style?: CSSProperties
  debug?: boolean
} & TableHTMLAttributes<HTMLTableElement>

export function Table({ template, items, debug = false, ...restProps }: TableProps) {
  // 将 items 构建哈希表
  const itemMap = new Map<TableItem["area"], TableItem>()
  items.forEach((_) => itemMap.set(_.area, _))

  // 从模板中确定每行的元素，以及每个元素的横跨的行和列
  const temp = new Template(
    template.map((_) => _.split(/\s+/)),
    itemMap
  ).template

  // 逐渐行填充元素
  const tableItems: TableItem[][] = temp.map((row) =>
    row.map((_) => {
      let tableItem = itemMap.get(_.area) ?? { area: "", element: "" }
      if (isSpacingArea(_.area)) {
        const { type, area, pos } = getTypePosAreaFromSpacing(_.area)
        const { margin, padding, style } = itemMap.get(area) as TableItem
        const useMargin = type === "margin"
        const spacing: number[] = (useMargin ? margin : padding) ?? [0, 0, 0, 0]
        const posToIdx: { [k in Position]: number } = {
          top: 0,
          right: 1,
          bottom: 2,
          left: 3
        }
        function getSize(pos: Position) {
          return spacing[posToIdx[pos]]
        }
        const useWidth = ["left", "right"].some((_) => _ === pos)
        let spacingStyle = useWidth ? { width: getSize(pos) } : { height: getSize(pos) }
        const item: TableItem = { element: "", ..._, ...spacingStyle }
        if (type === "padding") item.style = style ?? {}
        return item
      } else {
        return { ...tableItem, ..._ }
      }
    })
  )
  console.log("tableItems:", tableItems)
  // 为每个元素添加其 rowSpan 和 colSpan 属性以及其他输入的属性
  // 每个元素四周都各有一个单元格，拥有相同的 rowSpan 和 colSpan，用于控制 margin

  return (
    <table cellPadding="0" cellSpacing="0" border={debug ? "1" : "0"} align="center" {...restProps}>
      <tbody>
        {tableItems.map((rowItems) => (
          <tr>
            {rowItems.map(
              ({
                area,
                element,
                margin,
                vAlign = "middle",
                hAlign = "left",
                style,
                ...restProps
              }) => (
                <td
                  style={{
                    textAlign: hAlign,
                    verticalAlign: vAlign,
                    fontSize: ["img", "Button"].includes(
                      (element as any)?.type?.name ?? (element as any)?.type
                    )
                      ? 0
                      : "inherit",
                    ...style
                  }}
                  {...restProps}>
                  {element}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
