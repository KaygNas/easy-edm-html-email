import React from "react"
import Table from "../../../components/Table"
import { TableItem } from "../../../components/Table/types"
import Arrangement from "./Arragement"
import ClassInfo from "./ClassInfo"
import Footer from "./Footer"
import Header from "./Header"
import RelatedClasses from "./RelatedClasses"

export default function EmbededTable() {
  return (
    <Table
      debug
      style={{ width: 640, backgroundColor: "#F5F5F5" }}
      template={[
        "header header",
        "arrangement classInfo",
        "relatedClasses relatedClasses",
        "footer footer"
      ]}
      items={items}
    />
  )
}

const items: TableItem[] = [
  {
    area: "header",
    element: <Header />
  },
  {
    area: "arrangement",
    element: <Arrangement />,
    margin: [0, 20, 0, 10]
  },
  {
    area: "classInfo",
    element: <ClassInfo />,
    margin: [0, 10, 0, 0]
  },
  {
    area: "relatedClasses",
    element: <RelatedClasses />,
    margin: [25, 10, 25, 10]
  },
  {
    area: "footer",
    element: <Footer />
  }
]
