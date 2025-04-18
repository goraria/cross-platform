import React, { ReactElement } from "react";

export default function LayoutWrapper({ children }: { children: ReactElement }) {
  return (
    <div className="layout-wrapper">
      {children}
    </div>
  )
}