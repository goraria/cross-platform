import React, { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PersonalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="border-grid border-b">
          <div className="container-wrapper">

          </div>
        </section>
        <div className="container-wrapper">
          <div className="p-6">{/* container */}
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
