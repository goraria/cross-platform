"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LucidePenLine } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyEmailPage({
  className,
  // ...props
}: ComponentProps<"div">) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(120);
  const [isExpired, setIsExpired] = useState(false);

  const handleResend = () => {
    setTimer(120);
    setIsExpired(false);
    // TODO: trigger resend OTP action
  };

  useEffect(() => {
    if (timer <= 0) {
      setIsExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)}>
        <Card>
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              Enter the verification code send to your email ID
            </CardDescription>
            <CardDescription className="flex items-center gap-2">
              <span className="text-foreground">email@mail.com</span>
              <LucidePenLine size={16} className="text-foreground"/>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-y-2">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                {/*<InputOTPSeparator />*/}
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                {/*<InputOTPSeparator />*/}
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="mt-4 text-center text-sm">
              Didn&apos;t receive a code? {" "}
              {/*<Link href="/sign-up" className="underline underline-offset-4">*/}
              {/*  Resend code*/}
              {/*</Link>*/}

              {isExpired ? (
                <Button
                  variant="link"
                  className="underline underline-offset-4 cursor-pointer p-0"
                  onClick={handleResend}
                >
                  Resend code
                </Button>
              ) : (
                <>Resend code in ({timer}s)</>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}