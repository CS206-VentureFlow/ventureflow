'use client'
import React, { useEffect } from 'react'
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [userType, setUserType] = React.useState("VC");

    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    useEffect(() => {
        const storedUserType = sessionStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
        }
    }, []);

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    function handleUserTypeChange() {
        const newUserType = userType === "VC" ? "LP" : "VC";
        setUserType(newUserType);
        sessionStorage.setItem("userType", newUserType);
    }

    return (
        <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
            {!mobileWidth && (
                <div className='absolute right-[-20px] top-7'>
                    <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar}>
                        <ChevronRight />
                    </Button>
                </div>
            )}

            <div className='flex items-center gap-2 mb-4'>
                <Label>VC</Label>
                <Switch checked={userType === "LP"} onCheckedChange={handleUserTypeChange} />
                <Label>LP</Label>
            </div>
            
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Dashboard",
                        href: "/",
                        icon: LayoutDashboard,
                        variant: "default",
                    },
                    {
                        title: "Message Board",
                        href: "/message-board",
                        icon: UsersRound,
                        variant: "default",
                    },
                    {
                        title: "Capital Calls",
                        href: "/capital-calls",
                        icon: File,
                        variant: "default",
                    }
                ]}
            />
        </div>
    );
}
