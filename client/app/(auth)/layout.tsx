"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [layout] = useState(1);

  return (
    <>
      {layout === 0 ? (
        <>
          <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              {children}
            </div>
          </div>
        </>
      ) : layout === 3 ? (
        <>
          <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
              {children}
            </div>
          </div>
        </>
      ) : layout === 1 ? (
        <>
          <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
              <div className="flex justify-center gap-2 md:justify-start">
                <Link href="/" className="flex items-center gap-2 font-medium">
                  {/*<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">*/}
                  {/*  <GalleryVerticalEnd className="size-4" />*/}
                  {/*</div>*/}
                  <div className="flex size-12 items-center justify-center rounded-md">
                    <Image
                      src="/logos/logo.png"
                      alt="Gorth Inc."
                      width={64}
                      height={64}
                      // className="rounded-full"
                      // className="invert-[0.8] dark:invert-0"
                    />
                  </div>
                  Gorth Inc.
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                  {children}
                </div>
              </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
              {/*<img*/}
              {/*  src="/backgrounds/placeholder.svg"*/}
              {/*  alt="Image"*/}
              {/*  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"*/}
              {/*/>*/}
              <img
                // src="/backgrounds/placeholder.svg"
                src="/avatars/suit-gradient.jpeg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.9] dark:invert dark:grayscale"
              />
            </div>
          </div>
        </>
      ) : layout === 2 ? (
        <>
          <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Gorth Inc.
              </a>
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </>
  )
}