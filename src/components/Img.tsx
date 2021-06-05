import React, { CSSProperties } from "react"

export type ImgProps = { src: string; alt?: string; style?: CSSProperties }
export function Img(props: ImgProps) {
  return <img {...props} />
}
