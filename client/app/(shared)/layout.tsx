import React, { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="border-grid border-b">{/**/}
          <div className="container-wrapper">
            <div className="container flex flex-col items-start gap-1 px-6 py-8 md:py-10 lg:py-12"><a
              className="group mb-2 inline-flex items-center gap-2 px-0.5 text-sm font-medium" href="/docs/tailwind-v4">
              <span className="underline-offset-4 group-hover:underline">Get Started with Tailwind v4</span>
            </a>
              <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">Color
                Library
              </h1>
              <p className="max-w-2xl text-base font-light text-foreground sm:text-lg">
                Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats.
              </p>
              <div className="flex w-full items-center justify-start gap-2 pt-2">
                <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">
                  Browse Colors
                </a>
                <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                  href="/docs/theming">Documentation
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="container-wrapper h-[100vh]">
          <div className="container p-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
