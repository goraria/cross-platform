import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { tokenCache } from '@/state/cache'

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function RootLayout0() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
            <StatusBar style="auto"/>
        </ThemeProvider>
    );
}

function RootLayoutNav() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    if (!publishableKey) {
        throw new Error(
            'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
        )
    }

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <ClerkLoaded>
                <Slot />
            </ClerkLoaded>
        </ClerkProvider>
    )
}

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
    }

    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <Slot />
            </ClerkLoaded>
        </ClerkProvider>
    )
}