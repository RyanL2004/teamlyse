"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { FaHome, FaChevronRight } from "react-icons/fa";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingProvider, useMeetingContext } from "@/context/meeting-context";
import { MeetingList } from "@/components/meeting-list";
import { MeetingForm } from "@/components/meeting-form";
import { Link } from "react-router-dom";

function DashboardContent() {
  const { selectedDate, selectedMeeting, setSelectedMeeting } =
    useMeetingContext();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateMeeting = () => {
    setSelectedMeeting(null);
    setIsCreating(true);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setSelectedMeeting(null);
  };

  return (
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4 rounded-lg">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="flex items-center">
                <FaHome className="text-white" />
                <BreadcrumbLink
                  asChild
                  className="ml-2 hover:text-gray-100 transition"
                >
                  <Link to = "/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <FaChevronRight className="text-gray-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {selectedDate
                    ? format(selectedDate, "MMMM yyyy")
                    : "Meeting Dashboard"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button onClick={handleCreateMeeting} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New Meeting
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Meetings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-0">
            {isCreating || selectedMeeting ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedMeeting ? "Edit Meeting" : "Create New Meeting"}
                </h2>
                <MeetingForm
                  meeting={selectedMeeting || undefined}
                  onCancel={handleCancelForm}
                />
              </div>
            ) : (
              <MeetingList />
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {isCreating || selectedMeeting ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedMeeting ? "Edit Meeting" : "Create New Meeting"}
                </h2>
                <MeetingForm
                  meeting={selectedMeeting || undefined}
                  onCancel={handleCancelForm}
                />
              </div>
            ) : (
              <MeetingList />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}

export default function DashboardPage() {
  return (
    <MeetingProvider>
      <SidebarProvider>
        <AppSidebar />
        <DashboardContent />
      </SidebarProvider>
    </MeetingProvider>
  );
}
