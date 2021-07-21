import { ReactNode, CSSProperties } from "react"
import { TemplateItem } from "./TemplateItem"
// 先定义 Template
export type TableTemplate<T = string> = readonly T[]

// 从 Template 提取所有 Area
type TupleToUnion<T extends TableTemplate> = T[number]
type StringToUnion<S extends string> = S extends `${infer Char} ${infer Rest}`
  ? Char | StringToUnion<Rest>
  : S
export type AreaNameOfTemplate<T extends TableTemplate> = StringToUnion<TupleToUnion<T>>

// 用 Area 限制 TableItem 的 Area 类型
export type Area<Name = string> = Name

export type TableItem<AreaName = string> = {
  area: Area<AreaName>
  element?: ReactNode
  style?: CSSProperties
  width?: number
  height?: number
  margin?: number[]
  padding?: number[]
  hAlign?: "left" | "center" | "right"
  vAlign?: "top" | "middle" | "bottom"
} & Partial<Pick<TemplateItem, "colSpan" | "rowSpan">>

export type RawTemplate<AreaName = string> = Area<AreaName>[][]

export type ItemMap<AreaName = string> = Map<TableItem<AreaName>["area"], TableItem>

export type Coordinate = {
  x: number
  y: number
}
