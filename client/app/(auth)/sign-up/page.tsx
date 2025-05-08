"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function SignUpPage() {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

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
      confirm_password: watch("password"),
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
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="phone"
              placeholder="+84 000 000 000"
              {...registerField("phone_number")}
              // required
            />
            {errors.phone_number && (
              <p className="text-sm text-red-500">{errors.phone_number.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...registerField("password")}
              // required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
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

function SignUpPageDemo() {
  const [layout, setLayout] = useState(1);

  return (
    <>
      {layout === 0 ? (
        <>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
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
                  Register your new account
                </CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    {/*<div className="flex flex-col gap-4">*/}
                    {/*  <Button variant="outline" className="w-full">*/}
                    {/*    <BoxIcon*/}
                    {/*      type="logo"*/}
                    {/*      name="apple"*/}
                    {/*      size="sm"*/}
                    {/*    />*/}
                    {/*    Login with Apple*/}
                    {/*  </Button>*/}
                    {/*  <Button variant="outline" className="w-full">*/}
                    {/*    <BoxIcon*/}
                    {/*      type="logo"*/}
                    {/*      name="google"*/}
                    {/*      size="sm"*/}
                    {/*    />*/}
                    {/*    Login with Google*/}
                    {/*  </Button>*/}
                    {/*  <Button variant="outline" className="w-full">*/}
                    {/*    <BoxIcon*/}
                    {/*      type="logo"*/}
                    {/*      name="meta"*/}
                    {/*      size="sm"*/}
                    {/*    />*/}
                    {/*    Login with Meta*/}
                    {/*  </Button>*/}
                    {/*</div>*/}
                    {/*<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">*/}
                    {/*  <span className="bg-card text-muted-foreground relative z-10 px-2">*/}
                    {/*    Or continue with*/}
                    {/*  </span>*/}
                    {/*</div>*/}
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
                          required
                        />
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
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="username"
                        placeholder="username"
                        required
                      />
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
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        type="phone"
                        placeholder="+84 000 000 000"
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
                        Register
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
                      Already have an account?{" "}
                      <Link href="/sign-in" className="underline underline-offset-4">
                        Sign in
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
                        Register new your Gorth Inc account
                      </p>
                    </div>
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
                          required
                        />
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
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="username"
                        placeholder="username"
                        required
                      />
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
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        type="phone"
                        placeholder="+84 000 000 000"
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
                        Register
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
        <>
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
                    required
                  />
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
                    required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  required
                />
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
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="+84 000 000 000"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
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
      ) : layout === 2 ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
}