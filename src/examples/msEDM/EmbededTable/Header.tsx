import React, { CSSProperties } from "react"
import { textCommonStyle } from "../common/comonStyles"
import Table from "../../../components/Table"
import { Img } from "../../../components/Img"
import { TableItem } from "../../../components/Table/types"
import imgs from "../common/imgs"
import { Button } from "../../../components/Button"
import { btnUrl } from "./RelatedClasses"

export default function Header() {
  return <Table template={["banner", "p1", "p2", "btn1"]} items={tableItems} />
}

const pStyle: CSSProperties = {
  ...textCommonStyle,
  fontSize: "12px",
  lineHeight: 1.5,
  textIndent: "24px"
}

export const tableItems: TableItem[] = [
  { area: "banner", element: Img(imgs.banner) },
  {
    area: "p1",
    // TODO: 修改此处
    element:
      "用户身份访问管理是企业信息安全的第一道防线，也是最薄弱的环节。为了实现增强的身份访问管理，企业通常部署多重身份验证（MFA）解决方案，但用户通常对必须记住密码之外的其他安全保护方法而感到不方便。",
    style: pStyle,
    margin: [20, 10, 8, 10]
  },
  {
    area: "p2",
    // TODO: 修改此处
    element:
      "无密码身份验证（Passwordless）是一种更安全、更高效的用户身份验证方法，本课程中将详细介绍 Azure AD 集成的无密码身份验证配置方案，包括 Windows Hello 企业版、Microsoft Authenticator 应用，以及 FIDO2 安全密钥。",
    style: pStyle,
    margin: [0, 10, 0, 10]
  },
  {
    area: "btn1",
    element: (
      <Button href={btnUrl}>
        <Img {...imgs.btnBig} />
      </Button>
    ),
    style: { textAlign: "center" },
    margin: [20, 0, 25, 0]
  }
]
