// app/(auth)/sign-in.tsx
import React, { useState } from "react";
import { View, Image, useWindowDimensions, Pressable } from "react-native";
import Animated, { FadeInUp, SlideInLeft } from "react-native-reanimated";
import { useRouter } from "expo-router";

// shadcn-like components (adjust imports to your project)
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";
import { AuthWrapper, ResponsiveCard } from "@/app/(auth)/_layout"

export default function SignInScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  function onSubmit() {
    // TODO: replace with your auth logic / redux / RTK Query
    console.log("submit", { identifier, password, remember });
    // router.replace('/');
  }

  return (
    <AuthWrapper>
      <ResponsiveCard
        rightPane={
          <Image
            // source={ILLUSTRATION}
            style={{ width: undefined, height: '100%', resizeMode: 'cover' }}
            accessible
            accessibilityLabel="Auth illustration"
          />
        }
      >
        <View className="flex flex-col gap-6">
          <View className="flex flex-col items-center gap-2">
            <Pressable onPress={() => router.push('/') } className="flex flex-col items-center gap-2">
              <View className="flex size-24 items-center justify-center rounded-md">
                {/* Replace with your logo component */}
                {/* <Image source={require('/assets/logo.png')} style={{ width: 96, height: 96 }} /> */}
              </View>
            </Pressable>
            <Text className="text-xl font-bold">Welcome to Gorth Inc.</Text>
          </View>

          <View className="flex flex-col items-center gap-2 text-center">
            <Text className="text-2xl font-bold">Login to your account</Text>
            <Text className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</Text>
          </View>

          <View className="grid gap-6">
            <View className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" onPress={() => {}}>
                {/* Your provider icons */}
                <Text>Login with Apple</Text>
              </Button>
              <Button variant="outline" className="w-full" onPress={() => {}}>
                <Text>Login with Google</Text>
              </Button>
            </View>

            <View className="relative text-center text-sm">
              <View style={{ position: 'relative', alignItems: 'center' }}>
                <View style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTopWidth: 1, borderColor: '#E6E6E6' }} />
                <View style={{ backgroundColor: 'transparent', paddingHorizontal: 8 }}>
                  <Text className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</Text>
                </View>
              </View>
            </View>

            <View className="grid gap-3">
              <Label htmlFor="identifier">Email hoặc Username</Label>
              <Input
                id="identifier"
                placeholder="user@example.com hoặc username"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View className="grid gap-3">
              <View className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Pressable onPress={() => router.push('/forgot-password')} style={{ marginLeft: 'auto' }}>
                  <Text className="ml-auto inline-block text-sm underline-offset-4">Forgot your password?</Text>
                </Pressable>
              </View>

              <Input
                id="password"
                placeholder="********"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <View className="flex items-center flex-row" style={{ paddingTop: 4 }}>
                <Checkbox id="remember_me" checked={remember} onCheckedChange={(v: boolean) => setRemember(Boolean(v))} />
                <Label htmlFor="remember_me" className="text-xs" style={{ marginLeft: 8 }}>Remember me</Label>
              </View>
            </View>

            <View className="flex flex-col gap-3">
              <Button onPress={onSubmit} className="w-full">
                <Text>{"Login"}</Text>
              </Button>
            </View>

            <View className="text-center text-sm">
              <Text>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/sign-up')}>
                <Text className="underline underline-offset-4">Sign up</Text>
              </Pressable>
            </View>

            {isWide && (
              <View className="text-muted-foreground text-xs text-center">
                <Text>By clicking continue, you agree to our </Text>
                {/* Small inline links */}
              </View>
            )}
          </View>
        </View>
      </ResponsiveCard>

      {/* Footer for narrow screens */}
      {!isWide && (
        <View style={{ marginTop: 12 }} className="text-muted-foreground text-center text-xs">
          <Text>By clicking continue, you agree to our Terms of Service and Privacy Policy.</Text>
        </View>
      )}
    </AuthWrapper>
  );
}
