import { Stack } from 'expo-router/stack'
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function Layout() {
    return (
        <>
            <Stack />
            <SignedOut>
            </SignedOut>
            <SignedIn>
            </SignedIn>
        </>
    )
}