import { Img } from "../../../../components/Img"
import { TableItem } from "../../../../components/Table/types"
import imgs from "../../common/imgs"
import { Button } from "../../../../components/Button"
import { textCommonStyle } from "../../common/comonStyles"

const bgColor = { backgroundColor: "#150534" }
const fontStyle = {
  ...textCommonStyle,
  color: "#FFF",
  fontSize: "12px"
}
const rightUrl = "https://www.microsoft.com/zh-cn/legal/intellectualproperty/copyright"
const markUrl = "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks"
const privacyUrl = "https://privacy.microsoft.com/zh-cn/privacystatement"
const margin = [25, 0, 0, 0]
export const footer: TableItem[] = [
  {
    area: "company",
    element: [
      "微软（中国）有限公司",
      " | ",
      Button({ href: rightUrl, style: { color: "#FFF" }, children: "保留所有权利" }),
      " | ",
      Button({ href: markUrl, style: { color: "#FFF" }, children: "商标" }),
      " | ",
      Button({ href: privacyUrl, style: { color: "#FFF" }, children: "隐私声明" })
    ],
    style: { ...fontStyle, ...bgColor },
    margin,
    padding: [8, 0, 4, 8]
  },
  {
    area: "address",
    element: "北京市海淀区丹棱街5号微软大厦100080",
    style: { ...fontStyle, ...bgColor },
    padding: [0, 0, 8, 8]
  },
  {
    area: "icon",
    element: Img(imgs.iconMs),
    style: { textAlign: "right", ...bgColor },
    margin,
    padding: [0, 8, 0, 0]
  }
]
