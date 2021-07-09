import React, { CSSProperties } from "react"

export type ImgProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  style?: CSSProperties
}
export function Img({ style, ...restProps }: ImgProps) {
  const { width, height } = style || {}
  const sizeProps = { width, height, style }
  return <img {...sizeProps} {...restProps} />
}
