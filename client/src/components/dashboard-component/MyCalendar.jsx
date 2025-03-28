"use client";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

import { MeetingList } from "@/components/meeting-list";
import { MeetingForm } from "@/components/meeting-form";
import { Link } from "react-router-dom";

//State Management Imports:
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMeetings } from "@/store/meetingsSlice";



function DashboardContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const selectedFromState = location.state?.selectedCompanion;

  // Local State for UI-specific selections
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [shouldResumeForm, setShouldResumeForm] = useState(false);
  
  // Check resume form flag and keep the form Open 
  useEffect(() => {
    if (location.state?.resumeForm) {
      setShouldResumeForm(true);
      setIsCreating(true);
      navigate(location.pathname, { replace: true }); // Cleans up the state 
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const storedMeetings = localStorage.getItem("meetings");

    if (storedMeetings) {
      try {
        const parsedMeetings = JSON.parse(storedMeetings);
        console.log("Stored Meetings in Local Storage:", parsedMeetings);

        if (Array.isArray(parsedMeetings) && parsedMeetings.length > 0) {
          dispatch(fetchUpcomingMeetings()); // ✅ Always fetch from API
        } else {
          dispatch(fetchUpcomingMeetings()); // ✅ Fetch if storage is empty
        }
      } catch (error) {
        console.error("Error parsing meetings from localStorage:", error);
        dispatch(fetchUpcomingMeetings());
      }
    } else {
      dispatch(fetchUpcomingMeetings());
    }
  }, [dispatch]);

  // ✅ Listen for new meetings and update UI
  const meetings = useSelector((state) => state.meetings.meetings);
  useEffect(() => {
    console.log("Meetings Updated in Redux:", meetings); // ✅ Debugging
  }, [meetings]);

  const handleCreateMeeting = () => {
    setSelectedMeeting(null);
    setIsCreating(true);
  };

  const handleCancelForm = (options = {}) => {
    const { removeDraft = true } = options;
    setIsCreating(false);
    setSelectedMeeting(null);
    setShouldResumeForm(false);

    if (removeDraft) {
      localStorage.removeItem("meetingFormDraft")
    }
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
                  <Link to="/dashboard">Dashboard</Link>
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
            {isCreating || shouldResumeForm || selectedMeeting ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedMeeting ? "Edit Meeting" : "Create New Meeting"}
                </h2>
                <MeetingForm
                  meeting={selectedMeeting || undefined}
                  onCancel={handleCancelForm}
                  selectedFromNavigation={selectedFromState}
                />
              </div>
            ) : (
              <MeetingList setSelectedMeeting={setSelectedMeeting} />
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
              <MeetingList setSelectedMeeting={setSelectedMeeting} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardContent />
    </SidebarProvider>
  );
}
