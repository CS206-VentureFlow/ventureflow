'use client'
import React from 'react'
import { Nav } from './nav'
import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    UsersRound,
    File,
} from "lucide-react"
import { Button } from './button'
import { useWindowWidth } from '@react-hook/window-size'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [userType, setUserType] = React.useState(() => sessionStorage.getItem("userType") || "VC")

    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 768

    React.useEffect(() => {
        sessionStorage.setItem("userType", userType)
        window.dispatchEvent(new Event("userTypeChange"))
    }, [userType])

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed)
    }

    function handleToggle() {
        setUserType((prev) => (prev === "VC" ? "LP" : "VC"))
    }

    return (
        <div className={`relative min-w-[80px] border-r px-3 pb-10 pt-24 transition-all ${isCollapsed ? "w-[80px]" : "w-[250px]"}`}>
            {!mobileWidth && (
                <div className="absolute right-[-20px] top-7">
                    <Button variant="secondary" className="rounded-full p-2" onClick={toggleSidebar}>
                        <ChevronRight className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
                    </Button>
                </div>
            )}

            {!isCollapsed && (
                <div className="flex items-center space-x-2 mb-4">
                    <Label>{userType}</Label>
                    <Switch checked={userType === "LP"} onCheckedChange={handleToggle} />
                </div>
            )}

            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    { title: "Dashboard", href: "/", icon: LayoutDashboard, variant: "default" },
                    { title: "Message Board", href: "/message-board", icon: UsersRound, variant: "default" },
                    { title: "Capital Calls", href: "/capital-calls", icon: File, variant: "default" },
                ]}
            />
        </div>
    )
}
