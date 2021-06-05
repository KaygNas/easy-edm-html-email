import { CSSProperties } from "react"
import { Img } from "../../../../components/Img"
import { TableItem } from "../../../../components/Table/types"
import imgs from "../../common/imgs"
import { textCommonStyle } from "../../common/comonStyles"

const timeStyle: CSSProperties = {
  ...textCommonStyle,
  fontSize: "15px",
  fontFamily: "Arial",
  color: "#D83B01",
  backgroundColor: "#FFF"
}
const timeMargin = [0, 0, 0, 15]
const timePadding = [10, 10, 10, 10]

const actStyle: CSSProperties = {
  ...textCommonStyle,
  fontSize: "13px",
  backgroundColor: "#FFF"
}
const actMargin = [0, 15, 0, 0]
const actPadding = [10, 10, 10, 10]

export const arrangement: TableItem[] = [
  { area: "arrange_title", element: Img(imgs.headerArragment), margin: [0, 0, 0, 10] },
  {
    area: "arrange1_time",
    element: "13:30-14:00",
    style: timeStyle,
    margin: timeMargin,
    padding: timePadding,
    width: 100
  },
  {
    area: "arrange1_act",
    element: "课程签到",
    style: actStyle,
    margin: actMargin,
    padding: actPadding
  },
  {
    area: "arrange2_time",
    element: "14:00-15:00",
    style: timeStyle,
    margin: timeMargin,
    padding: timePadding,
    width: 100
  },
  {
    area: "arrange2_act",
    element: "深入探究 无密码身份验证实施方案",
    style: actStyle,
    margin: actMargin,
    padding: actPadding
  },
  {
    area: "arrange3_time",
    element: "15:00-15:20",
    style: timeStyle,
    margin: timeMargin,
    padding: timePadding,
    width: 100
  },
  {
    area: "arrange3_act",
    element: "专家答疑",
    style: actStyle,
    margin: actMargin,
    padding: actPadding
  },
  {
    area: "dashed",
    element: Img(imgs.dashedLine),
    style: { textAlign: "center" },
    margin: [0, 10, 0, 10],
    padding: [0, 10, 0, 10]
  }
]

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
