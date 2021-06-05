import { TableItem } from "../../../../components/Table"
import React, { CSSProperties } from "react"
import { Img } from "../../../../components/Img"
import imgs from "../../common/imgs"
import { textCommonStyle } from "../../common/comonStyles"

export const classInfo: TableItem[] = [
  { area: "class_info_title", element: Img(imgs.headerClassInfo) },
  { area: "info1", element: "A" },
  { area: "info2", element: "A" }
]

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
