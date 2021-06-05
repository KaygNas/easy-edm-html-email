import React from "react"
import Table from "../../../components/Table"
import { Img, ImgProps } from "../../../components/Img"
import { Button } from "../../../components/Button"
import { TableItem } from "../../../components/Table/types"
import imgs from "../common/imgs"
import { textCommonStyle } from "../common/comonStyles"

export default function RelatedClasses() {
  let start = 0
  const cards = new Array<string>(3).fill("").map((_) => `card${start++} card${start++}`)

  return <Table debug template={["title title", ...cards]} items={relatedClassesItems} />
}

export const btnUrl =
  "https://chinaevent.microsoft.com/app/meetings/MeetingPc/Detail?pf_uid=5407_3&id=994&pf_type=3&channel_id=19&channel_name=%E5%86%85%E9%83%A8%E6%8E%A8%E5%B9%BF&tag_id=6e1209cfa7bba1fd"
const cardItems: TableItem[] = [
  genCardItems({
    img: imgs.classCover1,
    title: "深入探究：Microsoft Teams 高效会议",
    time: "2021年6月3日 14:00-15:20",
    btnUrl
  }),
  genCardItems({
    img: imgs.classCover2,
    title: "深入探究：Microsoft Teams 高效会议",
    time: "2021年6月10日 14:00-15:20",
    btnUrl
  }),
  genCardItems({
    img: imgs.classCover3,
    title: "深入探究：动态条件访问策略应用场景",
    time: "2021年6月17日 14:00-15:20",
    btnUrl
  }),
  genCardItems({
    img: imgs.classCover4,
    title: "深入探究：Microsoft Lists 应用定制",
    time: "2021年6月22日 14:00-15:20",
    btnUrl
  }),
  genCardItems({
    img: imgs.classCover5,
    title: "深入探究：Microsoft Teams 审批流程",
    time: "2021年6月24日 14:00-15:20",
    btnUrl
  }),
  genCardItems({
    img: imgs.classCover6,
    title: "深入探究：无密码身份验证实施方案",
    time: "2021年6月29日 14:00-15:20",
    btnUrl
  })
].map((cardItem, i) => ({
  area: `card${i}`,
  element: <Card items={cardItem} />,
  margin: [15, i % 2 === 0 ? 7 : 0, 0, i % 2 === 0 ? 0 : 7]
}))

const relatedClassesItems: TableItem[] = [
  {
    area: "title",
    element: Img(imgs.headerRelatedClass)
  },
  ...cardItems
]

type GenItemsParams = {
  img: ImgProps
  title: string
  time: string
  btnUrl: string
}
function genCardItems({ img, title, time, btnUrl }: GenItemsParams): TableItem[] {
  return [
    {
      area: "cover",
      element: Img(img)
    },
    {
      area: "title",
      element: title,
      style: { ...textCommonStyle, textAlign: "center", fontSize: "13px" },
      margin: [8, 0, 4, 0]
    },
    {
      area: "time",
      element: time,
      style: {
        textAlign: "center",
        fontSize: "15px",
        fontFamily: "Arial",
        color: "#D83B01"
      },
      margin: [0, 0, 8, 0]
    },
    {
      area: "btn",
      element: (
        <Button href={btnUrl}>
          <Img style={{ width: "304px" }} {...imgs.btnSmall} />
        </Button>
      )
    }
  ]
}

function Card({ items }: { items: TableItem[] }) {
  return (
    <Table
      style={{ backgroundColor: "#FFF" }}
      template={["cover", "title", "time", "btn"]}
      items={items}
    />
  )
}
