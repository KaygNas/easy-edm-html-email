import { Area } from "./types"

export class TemplateItem {
  constructor(public area: Area, public rowSpan: number, public colSpan: number) {}

  toString() {
    return `${this.area}-${this.rowSpan}-${this.colSpan}`
  }
}
