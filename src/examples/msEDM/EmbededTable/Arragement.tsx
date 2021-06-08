import React, { CSSProperties } from "react"
import Table from "../../../components/Table"
import { Img } from "../../../components/Img"
import { TableItem } from "../../../components/Table/types"
import imgs from "../common/imgs"
import { textCommonStyle } from "../common/comonStyles"

export default function Arrangement() {
  return <Table debug align="left" template={["title", "content"]} items={arrangementItems} />
}

const arrangementItems: TableItem[] = [
  {
    area: "title",
    element: Img(imgs.headerArragment),
    margin: [0, 0, 15, 0]
  },
  { area: "content", element: <Content /> }
]

function Content() {
  return (
    <Table
      style={{ backgroundColor: "#FFF" }}
      template={["time1 act1", "sep sep", "time2 act2", "sep sep", "time3 act3"]}
      items={contentItems}
    />
  )
}

const timeStyle: CSSProperties = {
  ...textCommonStyle,
  fontSize: "15px",
  fontFamily: "Arial",
  color: "#D83B01"
}
const timeMargin = [13, 15, 13, 15]

const actStyle: CSSProperties = {
  ...textCommonStyle,
  fontSize: "13px"
}
const actMargin = [0, 20, 0, 0]

const contentItems: TableItem[] = [
  {
    area: "title",
    element: Img(imgs.headerArragment)
  },
  { area: "time1", element: "13:30-14:00", style: timeStyle, margin: timeMargin },
  { area: "time2", element: "14:00-15:00", style: timeStyle, margin: timeMargin },
  { area: "time3", element: "15:00-15:20", style: timeStyle, margin: timeMargin },
  { area: "act1", element: "课程签到", style: actStyle, margin: actMargin },
  {
    area: "act2",
    // TODO: 修改此处
    element: "深入探究 无密码身份验证实施方案",
    style: actStyle,
    margin: actMargin
  },
  { area: "act3", element: "专家答疑", style: actStyle, margin: actMargin },
  { area: "sep", element: Img(imgs.dashedLine), style: { textAlign: "center" } }
]
