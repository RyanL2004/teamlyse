import * as React from "react"
import {
  Monitor,
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Airplay,
  Presentation,
  Calendar,
  History,
  BriefcaseBusiness,
  UserRoundPen,
  Handshake,
  Pen,
  PenLine,
  Play,
  School,
  Flame,
  Wrench,
  Settings,
  UserRoundCog,
  CreditCard,
  MousePointerClick,

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const data = {
  navMain: [
    {
      title: "New Meeting",
      url: "/meeting-panel",
      icon: Play,
      isActive: true,
    },
    {
      title: "Meetings",
      url: "#",
      icon: Monitor,
      isActive: true,
      items: [
        {
          title: "My Calendar",
          url: "#",
          icon: Calendar,
        },
        {
          title: "My History",
          url: "#",
          icon: History,
        },
        {
          title: "My Debriefings",
          url: "/debriefing",
          icon: BriefcaseBusiness,
        },
        {
          title: "Members",
          url: "#",
          icon: UserRoundPen,
        },
      ],
    },
    {
      title: " AI Compagnions",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Select",
          url: "#",
          icon: MousePointerClick
        },
        {
          title: "Customise",
          url: "#",
          icon: Pen,
        }
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
          icon: Flame,
        },
        {
          title: "Get Started",
          url: "#",
          icon: Play,
        },
        {
          title: "Tutorials",
          url: "#",
          icon: School,
        },
        {
          title: "Changelog",
          url: "#",
          icon: PenLine,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
          icon: Settings2,
        },
        {
          title: "Teams",
          url: "#",
          icon: UserRoundCog,
        },
        {
          title: "Billing",
          url: "#",
          icon: CreditCard,
        },
        {
          title: "Limits",
          url: "#",
          icon: Calendar,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({...props}) {
    const { user, loading } = useContext(UserContext);


  return (
    (<Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TΞAMLYSE</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
      <NavUser user = {user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
