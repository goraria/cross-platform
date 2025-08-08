"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { useRouter, useParams, useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/elements/box-icon";
import { loginSchema } from "@/schemas/authSchemas";
import type { SubmitHandler } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginMutation, useGetMeQuery } from "@/state/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DirectingPage from "@/app/(misc)/directing/page";
import LoadingPage from "@/app/(misc)/loading/page";

export default function SignInPage() {
  const [layout] = useState(1); // layout selector (1 active)
  const [login, { isLoading }] = useLoginMutation();
  interface LoginFormShape { identifier: string; password: string; remember_me?: boolean }
  const { register: formRegister, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormShape>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  defaultValues: { identifier: '', password: '', remember_me: false }
  });
  const router = useRouter();
  // Gọi API lấy user hiện tại (dựa vào cookie)
  const { data: meResp, isLoading: isUserLoading } = useGetMeQuery();
  // console.log(user, isUserLoading);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[SignIn] effect', { isUserLoading, meResp });
    }
    if (!isUserLoading && meResp?.authenticated && meResp.data) router.replace("/profile");
  }, [meResp, isUserLoading, router]);

  // Xử lý submit dùng react-hook-form, đồng bộ validate zod, toast lỗi rõ ràng
  const onSubmit: SubmitHandler<LoginFormShape> = async (data: LoginFormShape) => {
    try {
  await login(data).unwrap();
      toast.success("Login successful");
      router.replace("/");
    } catch (err: unknown) {
      let message = "Login failed";
      if (typeof err === 'object' && err) {
        const e = err as { data?: { error?: string; message?: string }; message?: string };
        message = e.data?.error || e.data?.message || e.message || message;
      }
      toast.error(message);
    }
  };

  // Nếu đang loading user thì có thể return null hoặc spinner
  if (isUserLoading) {
    return (
      <LoadingPage />
    );
  }

  // Đã xác thực -> hiển thị màn chờ thay vì form (tránh flash UI) trong lúc useEffect redirect
  if (!isUserLoading && meResp?.authenticated && meResp.data) {
    return (
      <DirectingPage />
    );
  }

  return (
    <>
      {layout === 1 ? (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-24 items-center justify-center rounded-md">
                <Image src="/logos/logo.png" alt="Gorth Inc." width={96} height={96} />
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
              <Button variant="outline" className="w-full" type="button">
                <BoxIcon type="logo" name="apple" size="sm" />
                Login with Apple
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <BoxIcon type="logo" name="google" size="sm" />
                Login with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="identifier">Email hoặc Username</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="user@example.com hoặc username"
                required
                {...formRegister("identifier")}
              />
              {errors.identifier && (
                <span className="text-red-500 text-xs">{errors.identifier.message as string}</span>
              )}
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
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                {...formRegister("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message as string}</span>
              )}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="remember_me"
                  checked={watch('remember_me')}
                  onCheckedChange={(v) => setValue('remember_me', Boolean(v))}
                />
                <Label htmlFor="remember_me" className="text-xs">Remember me</Label>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Button variant="outline" type="button" className="w-full">
                <BoxIcon type="logo" name="apple" size="sm" />
                <span className="sr-only">Login with Apple</span>
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <BoxIcon type="logo" name="google" size="sm" />
                <span className="sr-only">Login with Google</span>
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <BoxIcon type="logo" name="meta" size="sm" />
                <span className="sr-only">Login with Meta</span>
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <BoxIcon type="logo" name="github" size="sm" />
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
      ) : layout === 0 ? (
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
                  <Image
                    src="/backgrounds/placeholder.svg"
                    alt="Auth Illustration"
                    fill
                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                    priority
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
      ) : layout === 2 ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
}
