import { isArray } from "lodash"

export class Array2D<T> {
  private arr: T[][]
  constructor(arr?: T[][]) {
    this.arr = arr ?? []
  }

  insert(item: T, row: number, col?: number) {
    if (!isArray(this.arr[row])) this.arr[row] = []
    col = col ?? this.edge()[1]
    this.arr[row] = [...this.arr[row].slice(0, col + 1), item, ...this.arr[row].slice(col + 1)]
  }

  insertCol(colItems: T[], col?: number) {
    colItems.forEach((item, row) => {
      this.insert(item, row, col)
    })
  }

  insertRow(rowItems: T[], row?: number) {
    row = row ?? this.edge()[0]
    this.arr = [...this.arr.slice(0, row + 1), rowItems, ...this.arr.slice(row + 1)]
  }

  append(item: T, row: number, col: number = 0) {
    if (!isArray(this.arr[row])) this.arr[row] = []
    this.arr[row] = [...this.arr[row].slice(0, col), item, ...this.arr[row].slice(col)]
  }

  appendCol(items: T[], col?: number) {
    items.forEach((item, row) => {
      this.append(item, row, col)
    })
  }

  appendRow(rowItems: T[], row?: number) {
    row = row ?? this.edge()[0]
    this.arr = [...this.arr.slice(0, row), rowItems, ...this.arr.slice(row)]
  }

  /**
   *
   * @returns [yMax,xMax]
   */
  edge() {
    const xMax = this.arr.reduce((pre, cur) => Math.max(pre, cur?.length ?? 0), 0)
    const yMax = this.arr.length
    return [yMax, xMax]
  }

  get(y: number, x: number) {
    const [yMax, xMax] = this.edge()
    if (y < 0 || y >= yMax) return undefined
    return this.arr[y][x]
  }

  getCol(x: number): T[] {
    return this.arr.map((_) => _[x])
  }

  getRow(y: number): T[] {
    const [yMax, xMax] = this.edge()
    if (y < 0 || y >= yMax) return new Array(xMax).fill(undefined)
    else return this.arr[y]
  }

  cols() {
    return this.getRow(0).map((_, x) => this.getCol(x))
  }

  rows() {
    return this.arr
  }

  set(y: number, x: number, item: T) {
    this.arr[y][x] = item
  }

  print(title?: string) {
    const arr = this.output()
    const printText = arr.map((row) => row.join(" | ")).join("\n")

    title && console.log(title)
    console.log(printText)
  }

  fmap(fn: (arr2D: Array2D<T>) => Array2D<T>) {
    return fn(this)
  }

  output() {
    return this.arr
  }
}
