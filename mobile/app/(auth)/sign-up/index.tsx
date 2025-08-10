// app/(auth)/sign-up.tsx
import React, { useState } from "react";
import { View, Image, useWindowDimensions } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function SignUpScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      // gọi API đăng ký
      router.replace("/(tabs)");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 bg-background">
      <Animated.View entering={FadeInUp.duration(300)} className={isWide ? "w-full max-w-5xl" : "w-full max-w-sm"}>
        <View className={isWide ? "flex-row items-center gap-6" : "flex-col"}>
          <View className={isWide ? "flex-1" : "w-full"}>
            <Card className="p-6 rounded-2xl">
              <CardHeader className="items-center">
                <View className="items-center">
                  {/* <Image source={require('@/assets/logo.png')} style={{ width: 72, height: 72 }} /> */}
                </View>
                <Text className="text-2xl font-bold mt-4">Create your account</Text>
                <Text className="text-sm text-muted-foreground text-center mt-2">
                  Join us today — it&apos;s quick and easy.
                </Text>
              </CardHeader>

              <CardContent className="mt-4 gap-4">
                {/* Inputs */}
                <View className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="m@example.com" value={email} onChangeText={setEmail} />
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="********" secureTextEntry value={password} onChangeText={setPassword} />
                </View>

                <Button className="w-full mt-2" onPress={onSubmit} disabled={loading}>
                  <Text>{loading ? "Creating..." : "Create account"}</Text>
                </Button>

                <View className="mt-3">
                  <Text className="text-center text-sm">
                    Already have an account?{" "}
                    <Text className="underline text-primary" onPress={() => router.push("/sign-in")}>Sign in</Text>
                  </Text>
                </View>
              </CardContent>
            </Card>
          </View>

          {isWide && (
            <View className="flex-1 items-stretch justify-center">
              <View className="h-full rounded-2xl overflow-hidden bg-muted">
                {/* <Image
                  source={require('@/assets/auth-illustration.png')}
                  style={{ width: undefined, height: "100%", flex: 1, resizeMode: "cover" }}
                /> */}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
