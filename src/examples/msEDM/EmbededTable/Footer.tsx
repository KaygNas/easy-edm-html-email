import React from "react"
import Table from "../../../components/Table"
import { Img } from "../../../components/Img"
import { TableItem } from "../../../components/Table/types"
import imgs from "../common/imgs"
import { textCommonStyle } from "../common/comonStyles"
import { Button } from "../../../components/Button"

export default function Footer() {
  return (
    <Table
      style={{
        width: "100%",
        backgroundColor: "#150534",
        ...textCommonStyle,
        color: "#FFF",
        fontSize: "12px"
      }}
      template={["text icon", "address  icon"]}
      items={items}
    />
  )
}

const rightUrl = "https://www.microsoft.com/zh-cn/legal/intellectualproperty/copyright"
const markUrl = "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks"
const privacyUrl = "https://privacy.microsoft.com/zh-cn/privacystatement"
const items: TableItem[] = [
  {
    area: "text",
    element: (
      <>
        微软（中国）有限公司 |{" "}
        <Button href={rightUrl} style={{ color: "#FFF" }}>
          保留所有权利
        </Button>{" "}
        |{" "}
        <Button href={markUrl} style={{ color: "#FFF" }}>
          商标
        </Button>{" "}
        |{" "}
        <Button href={privacyUrl} style={{ color: "#FFF" }}>
          隐私声明
        </Button>
      </>
    ),
    margin: [8, 0, 4, 8]
  },
  {
    area: "address",
    element: "北京市海淀区丹棱街5号微软大厦100080",
    margin: [0, 0, 8, 8]
  },
  { area: "icon", element: Img(imgs.iconMs), style: { textAlign: "right" }, margin: [0, 8, 0, 0] }
]
