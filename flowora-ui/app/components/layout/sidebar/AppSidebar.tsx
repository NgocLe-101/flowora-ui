import {
    AlertCircle,
    Boxes,
    CheckCircle2,
    ChevronRight,
    Clock,
    Command,
    Flower2,
    FolderKanban,
    FolderTree,
    History,
    PlayCircle,
    Plus,
    Users,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "../../ui/sidebar";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import StatusIcon from "./StatusIcon";
import NavUser from "./NavUser";

const workspaces = [
    { id: "w1", name: "Marketing Ops", color: "#4FD1C5", count: 3 },
    { id: "w2", name: "Data Pipeline", color: "#F5B454", count: 12 },
    { id: "w3", name: "Customer Onboarding", color: "#A78BFA", count: 5 },
];

const activeRuns = [
    { id: "run-8f3a91", label: "Sync CRM contacts", meta: "2m 14s" },
    { id: "run-2c91b4", label: "Nightly ETL", meta: "41s" },
];

const recentRuns = [
    {
        id: "run-771b02",
        label: "Send welcome emails",
        status: "success",
        meta: "12m ago",
    },
    {
        id: "run-44de19",
        label: "Enrich lead data",
        status: "failed",
        meta: "1h ago",
    },
    {
        id: "run-9a02f1",
        label: "Slack digest",
        status: "success",
        meta: "3h ago",
    },
];

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <WorkspaceSwitcher />
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                {/* Workspaces */}
                <SidebarGroup>
                    <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
                    <SidebarGroupAction title="Add workspace">
                        <Plus className="size-4" />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {workspaces.map((w, i) => (
                                <SidebarMenuItem key={w.id}>
                                    <SidebarMenuButton tooltip={w.name} isActive={i === 0}>
                                        <Boxes />
                                        <span>{w.name}</span>
                                    </SidebarMenuButton>
                                    <SidebarMenuBadge>{w.count}</SidebarMenuBadge>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Runs */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="flex w-full items-center">
                                Runs
                                <span className="ml-2 rounded-full bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-sidebar-accent-foreground">
                                    {activeRuns.length} live
                                </span>
                                <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Runs">
                                            <History />
                                            <span>Active</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            {activeRuns.map((r) => (
                                                <SidebarMenuSubItem key={r.id}>
                                                    <SidebarMenuSubButton className="gap-2">
                                                        <StatusIcon status="running" />
                                                        <span className="flex-1 truncate">{r.label}</span>
                                                        <span className="text-[10px] font-mono">
                                                            {r.meta}
                                                        </span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Recent runs">
                                            <History />
                                            <span>Recent</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            {recentRuns.map((r) => (
                                                <SidebarMenuSubItem key={r.id}>
                                                    <SidebarMenuSubButton className="gap-2">
                                                        <StatusIcon status={r.status} />
                                                        <span className="flex-1 truncate">{r.label}</span>
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {r.meta}
                                                        </span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="text-teal-500">
                                            <span>View all runs →</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
