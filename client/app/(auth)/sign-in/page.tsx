"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useRouter, useParams, useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/elements/box-icon";

export default function SignInPage() {
  const [layout, setLayout] = useState(1);

  return (
    <>
      {layout === 0 ? (
        <>
          {/*{...props}*/}
          <div className="flex flex-col gap-6">
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
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
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
      ) : layout === 3 ? (
        <>
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <form className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
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
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your Gorth Inc account
                      </p>
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
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
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
                <div className="bg-muted relative hidden md:block">
                  <img
                    src="/backgrounds/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our
              {" "}<Link href="/terms-of-service">Terms of Service</Link>
              {" "} and <Link href="/privacy-policy">Privacy Policy</Link>.
            </div>
          </div>
        </>
      ) : layout === 1 ? (
        <form className="flex flex-col gap-6">
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
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
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
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
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
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      ) : layout === 2 ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
}
