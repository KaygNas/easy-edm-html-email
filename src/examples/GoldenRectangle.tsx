import React from "react"
import Table from "../components/Table"
import { TableItem } from "../components/Table/types"

export default function GoldenRectangle() {
  return (
    <Table
      debug={true}
      template={["a b b b b", "a e f f c", "a e i g c", "a e h g c", "a d d d c"]}
      items={tableItems}
    />
  )
}

const tableItems: TableItem[] = [
  {
    area: "a",
    height: 200,
    width: 200,
    style: { backgroundColor: "#9EA2FF" }
  },
  {
    area: "b",
    width: 123,
    height: 123,
    style: { backgroundColor: "#B4009E" }
  },
  {
    area: "c",
    width: 77,
    height: 77,
    style: { backgroundColor: "#E73550" }
  },
  {
    area: "d",
    width: 46,
    height: 46,
    style: { backgroundColor: "#6BB700" }
  },
  {
    area: "e",
    width: 28,
    height: 28,
    style: { backgroundColor: "#FFB900" }
  },
  {
    area: "f",
    height: 17,
    width: 17,
    style: { backgroundColor: "rgba(196,49,75,0.9)" }
  },
  {
    area: "g",
    width: 11,
    height: 11,
    style: { backgroundColor: "#979593" }
  },
  {
    area: "h",
    height: 6.7,
    width: 6.7,
    style: { backgroundColor: "#1F191D" }
  },
  {
    area: "i",
    width: 4.1,
    height: 4.1,
    style: { backgroundColor: "#373644" }
  },
  {
    area: "j",
    height: 2.5,
    width: 4.1,
    style: { backgroundColor: "#943670" }
  }
]
