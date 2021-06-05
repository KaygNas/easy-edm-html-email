import React, { CSSProperties, ReactNode } from "react"

export type ButtonProps = { children: ReactNode; href: string; style?: CSSProperties }
export function Button({ children, href, style }: ButtonProps) {
  return (
    <a href={href} style={{ color: "inherit", ...style }}>
      {children}
    </a>
  )
}
