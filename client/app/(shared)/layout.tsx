import React, { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>Pro</Navbar>
      {children}
      <Footer>Pro</Footer>
    </>
  );
}
