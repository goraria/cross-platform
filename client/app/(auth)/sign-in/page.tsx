"use client";

import React, { ComponentProps, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/elements/box-icon";

export default function SignInPage({
  className,
  // ...props
}: ComponentProps<"div">) {
  const layout = 0;

  return (
    <>
      {/*{...props}*/}
      <div className={cn("flex flex-col gap-6", className)}>
        <Card className="text-center">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-24 items-center justify-center rounded-md">
                  {/*<GalleryVerticalEnd className="size-6" />*/}
                  <Image
                    src="/logos/logo.png"
                    alt="Gorth Inc."
                    width={96}
                    height={96}
                    // className="rounded-full"
                  />
                </div>
                <span className="sr-only">Gorth Inc.</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome to Gorth Inc.</h1>
            </div>
            <CardTitle className="text-xl">
              Login to your account
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="apple"
                      size="sm"
                    />
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="google"
                      size="sm"
                    />
                    Login with Google
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="apple"
                      size="sm"
                    />
                    <span className="sr-only">Login with Apple</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="google"
                      size="sm"
                    />
                    <span className="sr-only">Login with Google</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="meta"
                      size="sm"
                    />
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <BoxIcon
                      type="logo"
                      name="github"
                      size="sm"
                    />
                    <span className="sr-only">Login with Github</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our
          {" "}<Link href="/terms-of-service">Terms of Service</Link>
          {" "} and <Link href="/privacy-policy">Privacy Policy</Link>.
        </div>
      </div>
    </>
  );
}
