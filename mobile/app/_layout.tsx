import '@/global.css';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Theme } from "@react-navigation/native/lib/typescript/module/src";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from "@/lib/constants";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "@/components/element/ThemeToggle";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export default function RootLayout() {
    // const colorScheme = useColorScheme();
    // const [loaded] = useFonts({
    //     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // });

    const hasMounted = useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        if (Platform.OS === 'web') {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add('bg-background');
        }
        setAndroidNavigationBar(colorScheme);
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <>
            {/*<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>*/}
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'}/>
                {/*<StatusBar style="auto"/>*/}
                <Stack>
                    <Stack.Screen name="(tabs)" options={{
                        headerShown: false,
                        headerRight: () => <ThemeToggle/>,
                    }}/>
                    <Stack.Screen name="+not-found"/>
                </Stack>
                <PortalHost/>
            </ThemeProvider>
        </>
    );
}

const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined' ? useEffect : useLayoutEffect;


