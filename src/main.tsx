import React from "react"
import ReactDom from "react-dom"
import Example from "./examples/Example"

ReactDom.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
  document.getElementById("root")
)
