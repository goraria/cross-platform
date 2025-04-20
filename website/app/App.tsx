import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ModeToggle } from "@/components/element/mode-toggle";

export default function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center min-h-svh">
                    <Button>Click me</Button>
                    <ModeToggle/>
                </div>
            </ThemeProvider>
        </>
    )
}
