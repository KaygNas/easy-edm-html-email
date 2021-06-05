import React, { useState } from "react"
import EmbededTable from "./msEDM/EmbededTable/EmbededTable"
import PlainTable from "./msEDM/PlainTable/PlainTable"
import GoldenRectangle from "./GoldenRectangle"

export default function Example() {
  const [display, setDisplay] = useState<"goldenRect" | "plain" | "embeded">("goldenRect")
  let displayContent
  switch (display) {
    case "goldenRect":
      displayContent = <GoldenRectangle />
      break
    case "plain":
      displayContent = <PlainTable />
      break
    case "embeded":
      displayContent = <EmbededTable />
      break
    default:
      break
  }
  return (
    <div className="container">
      <div className="nav">
        <h1>Easy EDM (HTML Email)</h1>
        <div>
          <button className="btn" onClick={() => setDisplay("goldenRect")}>
            黄金矩形
          </button>
          <button className="btn" onClick={() => setDisplay("plain")}>
            无嵌套表格的EDM
          </button>
          <button className="btn" onClick={() => setDisplay("embeded")}>
            嵌套表格的EDM
          </button>
        </div>
      </div>
      {displayContent}
    </div>
  )
}
