import React, { useState } from "react";
import { View, ScrollView, Image, useWindowDimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";
// rn-primitives usage for accessible low-level primitives (no reanimated)
// import { Stack, Text as RNPText } from "react-native-primitives";

// shadcn-like UI components (assumed available in your project)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";

// This file exports two screens: SignInScreen (default) and SignUpScreen (named)
// Layout aims to match the responsive web design from your example:
// - Mobile: single column, centered card
// - Tablet/Desktop (width >= 768): two-column card with illustration on the right

// const ILLUSTRATION = require("/assets/auth-illustration.png"); // swap with your image

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
      <View style={{ flex: 1, minHeight: '100%' }} className="flex-1 justify-center p-6">
        {children}
      </View>
    </ScrollView>
  );
}

export function ResponsiveCard({ children, rightPane }: { children: React.ReactNode; rightPane?: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768; // same breakpoint as md in web

  if (!isWide) {
    return (
      <Card className="p-6 w-full max-w-md self-center rounded-2xl shadow">{children}</Card>
    );
  }

  return (
    <Card className="overflow-hidden w-full max-w-4xl self-center rounded-2xl shadow">
      <CardContent className="p-0 md:grid md:grid-cols-2">
        <View style={{ padding: 24, flex: 1 }}>{children}</View>
        <View style={{ flex: 1, minHeight: 320 }} className="hidden md:block bg-muted">
          {rightPane}
        </View>
      </CardContent>
    </Card>
  );
}