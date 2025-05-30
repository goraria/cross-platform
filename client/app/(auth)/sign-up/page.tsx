"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/elements/box-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput } from "@/constants/schemas";
import { registerSchema } from "@/constants/schemas";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/state/api";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: ""
    }
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await register(data).unwrap();
      reset();
      toast.success("Registration successful");
      router.push("/sign-in");
    } catch (error: any) {
      // console.log("Register error:", error);
      toast.error(error.data?.message || "Registration failed");
      // toast.error("Japtor");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted directly");
    
    // Lấy tất cả giá trị form  
    const formData = {
      username: watch("username"),
      email: watch("email"),
      phone_number: watch("phone_number"),
      password: watch("password"),
      confirm_password: watch("confirm_password"),
      first_name: watch("first_name"),
      last_name: watch("last_name")
    };
    
    // console.log("Form data:", formData);
    
    // Validate form data
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      toast.error("Validation errors!");
      // console.log("Validation errors:", result.error);
      return;
    }
    
    // Submit form
    await onSubmit(result.data);
  };

  return (
    <>
      <form 
        onSubmit={handleFormSubmit}
        // onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   handleSubmit(onSubmit)(e);
        // }}
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
                <Label htmlFor="firstname">First name</Label>
                <span className="ml-auto inline-block text-muted-foreground text-xs underline-offset-4">
                  Optional
                </span>
              </div>
              <Input
                id="firstname"
                type="text"
                placeholder="Japtor"
                {...registerField("first_name")}
                // required
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">{errors.first_name.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="lastname">Last name</Label>
                <span className="ml-auto inline-block text-muted-foreground text-xs underline-offset-4">
                  Optional
                </span>
              </div>
              <Input
                id="lastname"
                type="text"
                placeholder="Gorthenburg"
                {...registerField("last_name")}
                // required
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">{errors.last_name.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="flex">
              <Select defaultValue="us">
                <SelectTrigger className="w-[120px] rounded-r-none border-r-0">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vn">VN (+84)</SelectItem>
                  <SelectItem value="us">US (+1)</SelectItem>
                  <SelectItem value="uk">UK (+44)</SelectItem>
                  <SelectItem value="de">DE (+49)</SelectItem>
                  <SelectItem value="fr">FR (+33)</SelectItem>
                  <SelectItem value="jp">JP (+81)</SelectItem>
                  <SelectItem value="cn">CN (+86)</SelectItem>
                </SelectContent>
              </Select>
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
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirm_password">Confirm password</Label>
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
          <div className="flex flex-col gap-3">
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