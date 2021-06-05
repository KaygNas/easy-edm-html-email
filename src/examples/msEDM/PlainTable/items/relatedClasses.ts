import { Img, ImgProps } from "../../../../components/Img"
import { Button } from "../../../../components/Button"
import { TableItem } from "../../../../components/Table/types"
import imgs from "../../common/imgs"
import { textCommonStyle } from "../../common/comonStyles"
import { CSSProperties } from "react"

export const btnUrl =
  "https://chinaevent.microsoft.com/app/meetings/MeetingPc/Detail?pf_uid=5407_3&id=994&pf_type=3&channel_id=19&channel_name=%E5%86%85%E9%83%A8%E6%8E%A8%E5%B9%BF&tag_id=6e1209cfa7bba1fd"
const cardParams: GenCardParams[] = [
  {
    img: imgs.classCover1,
    title: "深入探究：Microsoft Teams 高效会议",
    time: "2021年6月3日 14:00-15:20",
    btnUrl
  },
  {
    img: imgs.classCover2,
    title: "深入探究：Microsoft Teams 高效会议",
    time: "2021年6月10日 14:00-15:20",
    btnUrl
  },
  {
    img: imgs.classCover3,
    title: "深入探究：动态条件访问策略应用场景",
    time: "2021年6月17日 14:00-15:20",
    btnUrl
  },
  {
    img: imgs.classCover4,
    title: "深入探究：Microsoft Lists 应用定制",
    time: "2021年6月22日 14:00-15:20",
    btnUrl
  },
  {
    img: imgs.classCover5,
    title: "深入探究：Microsoft Teams 审批流程",
    time: "2021年6月24日 14:00-15:20",
    btnUrl
  },
  {
    img: imgs.classCover6,
    title: "深入探究：无密码身份验证实施方案",
    time: "2021年6月29日 14:00-15:20",
    btnUrl
  }
]

export const relatedClasses: TableItem[] = [
  {
    area: "related_class_title",
    element: Img(imgs.headerRelatedClass),
    margin: [25, 10, 15, 10]
  },
  ...cardParams.map((_, i) => genCardItems(i + 1, _)).flat()
]

type GenCardParams = {
  img: ImgProps
  title: string
  time: string
  btnUrl: string
}
function genCardItems(idx: number, { img, title, time, btnUrl }: GenCardParams): TableItem[] {
  const isRightCard = idx % 2 === 0
  const mr = isRightCard ? 10 : 8
  const ml = isRightCard ? 8 : 10
  const margin = [0, mr, 0, ml]
  const bgColor: CSSProperties = { backgroundColor: "#FFF" }
  return [
    {
      area: `card${idx}_cover`,
      element: Img(img),
      margin
    },
    {
      area: `card${idx}_title`,
      element: title,
      style: { ...textCommonStyle, textAlign: "center", fontSize: "13px", ...bgColor },
      padding: [8, 0, 4, 0],
      margin
    },
    {
      area: `card${idx}_time`,
      element: time,
      style: {
        textAlign: "center",
        fontSize: "15px",
        fontFamily: "Arial",
        color: "#D83B01",
        ...bgColor
      },
      padding: [0, 0, 8, 0],
      margin
    },
    {
      area: `card${idx}_btn`,
      element: Button({ href: btnUrl, children: Img(imgs.btnSmall) }),
      margin
    }
  ]
}
