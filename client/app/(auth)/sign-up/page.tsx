"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/elements/box-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "@/schemas/authSchemas";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useRegisterMutation, useGetMeQuery } from "@/state/api";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import DirectingPage from "@/app/(misc)/directing/page";
import LoadingPage from "@/app/(misc)/loading/page";

type RegisterFormValues = z.input<typeof registerSchema>;

export default function SignUpPage() {
  const router = useRouter();
  // Nếu đã đăng nhập thì chuyển khỏi trang sign-up
  const { data: meResp, isLoading: meLoading } = useGetMeQuery();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[SignUp] effect', { meLoading, meResp });
    }
    if (!meLoading && meResp?.authenticated && meResp.data) router.replace('/profile');
  }, [meLoading, meResp, router]);

  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerField,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    setValue
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      phone_code: "+84",
      password: "",
      confirm_password: "",
      terms_accepted: false,
      newsletter_subscription: false
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const parsed: RegisterInput = registerSchema.parse(data);
      await register(parsed).unwrap();
      reset();
      toast.success("Registration successful");
      router.push("/sign-in");
    } catch (error: unknown) {
      let message = "Registration failed";
      if (typeof error === 'object' && error !== null) {
        const anyErr = error as Record<string, unknown> & { message?: string; data?: { message?: string } };
        message = anyErr.data?.message || anyErr.message || message;
      }
      toast.error(message);
    }
  };

  // Auto ensure phone_code stays +84 if user changes anything (in case future UI adds selector)
  React.useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === 'phone_code' && value.phone_code !== '+84') {
        setValue('phone_code', '+84');
      }
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  if (meLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!meLoading && meResp?.authenticated && meResp.data) {
    return (
      <DirectingPage />
    );
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
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
          <h1 className="text-2xl font-bold">Register your new account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="firstname">First name <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="firstname"
                type="text"
                placeholder="Japtor"
                {...registerField("first_name")}
                required
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">{errors.first_name.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="lastname">Last name <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="lastname"
                type="text"
                placeholder="Gorthenburg"
                {...registerField("last_name")}
                required
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">{errors.last_name.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
            <Input
              id="username"
              type="username"
              placeholder="username"
              {...registerField("username")}
              // required
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...registerField("email")}
              // required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <span className="flex items-center px-3 border border-r-0 border-input rounded-l-md bg-background text-muted-foreground">
                <AtSign />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...registerField("email")}
                className="rounded-l-none"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div> */}
          {/* <div className="grid gap-3">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="phone"
              placeholder="+84 000 000 000"
              {...registerField("phone_number")}
              // required
            />
          </div> */}
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
            <div className="flex">
              <div className="flex items-center justify-center w-[120px] rounded-l-md border border-input bg-muted text-sm font-medium">+84</div>
              <input type="hidden" value={watch("phone_code") || "+84"} {...registerField("phone_code")} />
              <Input
                id="phoneNumber"
                className="rounded-l-none"
                placeholder="202 555 0111"
                {...registerField("phone_number")}
              />
            </div>
            {errors.phone_number && (
              <p className="text-sm text-red-500">{errors.phone_number.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
            <div className="flex">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...registerField("password")}
                className="rounded-r-none"
              />
              <Button
                type="button"
                variant="ghost"
                tabIndex={-1}
                className="rounded-md rounded-l-none border border-l-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye/> : <EyeClosed/>}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirm_password">Confirm password <span className="text-red-500">*</span></Label>
            <div className="flex">
              <Input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...registerField("confirm_password")}
                className="rounded-r-none"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-l-none border-l-0 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <Eye/> : <EyeClosed/>}
              </Button>
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>
          <div className="grid gap-4">
            <div className="flex items-start gap-2">
              <Checkbox id="terms_accepted" checked={watch("terms_accepted")} onCheckedChange={(v) => setValue("terms_accepted", Boolean(v))} />
              <Label htmlFor="terms_accepted" className="text-sm leading-snug">Tôi đồng ý với <Link href="/terms-of-service" className="underline underline-offset-4">Điều khoản sử dụng</Link> và <Link href="/privacy-policy" className="underline underline-offset-4">Chính sách bảo mật</Link> <span className="text-red-500">*</span></Label>
            </div>
            {errors.terms_accepted && (
              <p className="text-sm text-red-500">{errors.terms_accepted.message as string}</p>
            )}
            <div className="flex items-start gap-2">
              <Checkbox id="newsletter_subscription" checked={watch("newsletter_subscription") || false} onCheckedChange={(v) => setValue("newsletter_subscription", Boolean(v))} />
              <Label htmlFor="newsletter_subscription" className="text-sm leading-snug">Nhận bản tin cập nhật sản phẩm</Label>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            {/* <Button type="submit" className="w-full">
              Register
            </Button> */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
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
          Already have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </>
  )
}