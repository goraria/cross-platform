import '@/global.css';

import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { useIsomorphicLayoutEffect } from "@rn-primitives/hooks";

import { NAV_THEME } from '@/lib/constants';

import { HapticTab } from '@/components/element/HapticTab';
import { IconSymbol } from '@/components/element/IconSymbol';
import TabBarBackground from '@/components/element/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/lib/useColorScheme';

import { ThemeToggle } from '@/components/element/ThemeToggle';
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export default function TabLayout() {
    // const colorSchemeDefault = useColorScheme();
    const hasMounted = React.useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

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
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                <Stack>
                    <Stack.Screen
                        name='index'
                        options={{
                            title: 'Starter Base',
                            headerRight: () => <ThemeToggle />,
                        }}
                    />
                </Stack>
                <PortalHost />

                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[isDarkColorScheme ? 'light' : 'dark'].tint,
                        headerShown: false,
                        tabBarButton: HapticTab,
                        tabBarBackground: TabBarBackground,
                        tabBarStyle: Platform.select({
                            ios: {
                                // Use a transparent background on iOS to show the blur effect
                                position: 'absolute',
                            },
                            default: {},
                        }),
                    }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color}/>,
                        }}
                    />
                    <Tabs.Screen
                        name="explore"
                        options={{
                            title: 'Explore',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
                        }}
                    />
                </Tabs>
            </ThemeProvider>
        </>
    );
}
