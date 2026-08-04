import { Outlet } from "react-router";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout() {
    return (
        <SidebarProvider>
            <TooltipProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="text-sm text-muted-foreground">
                            Marketing Ops / Canvas
                        </div>
                    </header>
                    <Outlet />
                </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    );
}
