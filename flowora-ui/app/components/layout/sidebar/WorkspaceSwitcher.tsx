import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import FloworaMark from "./FloworaMark";

const workspaces = [
    { id: "w1", name: "Marketing Ops", color: "#4FD1C5", count: 3 },
    { id: "w2", name: "Data Pipeline", color: "#F5B454", count: 12 },
    { id: "w3", name: "Customer Onboarding", color: "#A78BFA", count: 5 },
];

export default function WorkspaceSwitcher() {
    const [active, setActive] = useState(workspaces[0]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group"
                        >
                            <FloworaMark />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Flowora</span>
                                <span className="truncate text-xs text-sidebar-foreground/60">
                                    {active.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Workspaces
                        </DropdownMenuLabel>
                        {workspaces.map((w) => (
                            <DropdownMenuItem
                                key={w.id}
                                onClick={() => setActive(w)}
                                className="gap-2"
                            >
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: w.color }}
                                />
                                {w.name}
                                <span className="ml-auto text-xs text-muted-foreground">
                                    {w.count}
                                </span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                            <Plus className="size-4" />
                            Add workspace
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
