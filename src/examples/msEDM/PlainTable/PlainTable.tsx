import React from "react"
import Table from "../../../components/Table"
import { TableItem } from "../../../components/Table/types"
import { arrangement } from "./items/arrangement"
import { classInfo } from "./items/classInfo"
import { footer } from "./items/footer"
import { header } from "./items/header"
import { relatedClasses } from "./items/relatedClasses"

export default function PlainTable() {
  return (
    <Table
      // debug={true}
      style={{ width: 640, backgroundColor: "#F5F5F5" }}
      template={[
        "banner banner",
        "p1 p1",
        "p2 p2",
        "btn_main btn_main",
        "related_class_title related_class_title",
        ...cardTemplate(1),
        ...cardTemplate(2),
        ...cardTemplate(3),
        "company icon",
        "address icon"
      ]}
      items={items}
    />
  )
}

function cardTemplate(row: number) {
  const count = row * 2 - 1
  return [
    `card${count}_cover card${count + 1}_cover`,
    `card${count}_title card${count + 1}_title`,
    `card${count}_time card${count + 1}_time`,
    `card${count}_btn card${count + 1}_btn`
  ]
}

const items: TableItem[] = [...header, ...arrangement, ...classInfo, ...relatedClasses, ...footer]
