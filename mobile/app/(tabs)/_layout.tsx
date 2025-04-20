
import React, { useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/element/HapticTab';
import TabBarBackground from '@/components/element/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import {
    LucideBell,
    LucideHome,
    LucideMessageCircle,
    LucidePlane,
    LucideSend,
    LucideUser,
    LucideUsers
} from "lucide-react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ? 'light' : 'dark'].tint,
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
                        tabBarIcon: ({ color }) => <LucideHome color={color} size={28}/>,
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: '',
                        tabBarIcon: ({ color }) => <LucideSend color={color} size={28}/>,
                    }}
                />
                <Tabs.Screen
                    name="message"
                    options={{
                        title: 'Message',
                        tabBarIcon: ({ color }) => <LucideMessageCircle color={color} size={28}/>,
                    }}
                />
                <Tabs.Screen
                    name="notification"
                    options={{
                        title: 'Notification',
                        tabBarIcon: ({ color }) => <LucideBell color={color} size={28}/>,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <LucideUser color={color} size={28}/>,
                        // headerRight: () => <ThemeToggle/>,
                    }}
                />
            </Tabs>
        </>
    );
}
