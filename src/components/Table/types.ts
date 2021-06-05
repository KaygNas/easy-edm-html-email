import { ReactNode, CSSProperties } from "react"
import { TemplateItem } from "./TemplateItem"

export type Area = string

export type RawTemplate = Area[][]

export type TableItem = {
  area: Area
  element?: ReactNode
  style?: CSSProperties
  width?: number
  height?: number
  margin?: number[]
  padding?: number[]
  hAlign?: "left" | "center" | "right"
  vAlign?: "top" | "middle" | "bottom"
} & Partial<TemplateItem>

export type ItemMap = Map<TableItem["area"], TableItem>

export type Coordinate = {
  x: number
  y: number
}
