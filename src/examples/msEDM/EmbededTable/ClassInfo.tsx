import React from "react"
import Table from "../../../components/Table"
import { Img } from "../../../components/Img"
import { TableItem } from "../../../components/Table/types"
import imgs from "../common/imgs"
import { textCommonStyle } from "../common/comonStyles"

export default function ClassInfo() {
  return <Table align="right" template={["title", "content1", "content2"]} items={classInfoItems} />
}

const content1Items: TableItem[] = [
  {
    area: "tag1",
    element: Img(imgs.tagBefore)
  },
  {
    area: "tag2",
    element: Img(imgs.tagLiveTime),
    style: { verticalAlign: "top" }
  },
  {
    area: "bg",
    element: Img(imgs.tagLiveTimeBg),
    style: { textAlign: "right" }
  },
  {
    area: "text",
    // TODO: 修改此处
    element: "2021年6月29日 14:00-15:20",
    style: { ...textCommonStyle, fontSize: "13px" },
    margin: [0, 0, 0, 8]
  }
]

const content2Items: TableItem[] = [
  {
    area: "tag1",
    element: Img(imgs.tagBefore)
  },
  {
    area: "tag2",
    element: Img(imgs.tagAudience),
    style: { verticalAlign: "top" }
  },
  {
    area: "bg",
    element: Img(imgs.tagAudienceBg),
    style: { textAlign: "right" }
  },
  {
    area: "text",
    // TODO: 修改此处
    element: "IT 管理员",
    style: { ...textCommonStyle, fontSize: "13px" },
    margin: [0, 0, 0, 8]
  }
]

const classInfoItems: TableItem[] = [
  {
    area: "title",
    element: Img(imgs.headerClassInfo),
    margin: [0, 0, 15, 0]
  },
  {
    area: "content1",
    element: <Content items={content1Items} />,
    margin: [0, 0, 15, 0]
  },
  {
    area: "content2",
    element: <Content items={content2Items} />,
    margin: [0, 0, 0, 0],
    style: { verticalAlign: "bottom" }
  }
]

function Content({ items }: { items: TableItem[] }) {
  return (
    <Table
      style={{ backgroundColor: "#fff" }}
      template={["tag1 tag2 bg", "tag1 text bg"]}
      items={items}
    />
  )
}
