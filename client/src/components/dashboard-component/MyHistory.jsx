import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMeetings, createMeeting, updateMeeting, deleteMeeting } from "@/store/meetingsSlice";
import { AppSidebar } from "../app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaUpload,
  FaCommentDots,
  FaHome,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCalendar = () => {
  const dispatch = useDispatch();
  const { meetings, loading, error } = useSelector((state) => state.meetings);

  useEffect(() => {
    dispatch(fetchUpcomingMeetings());
  }, [dispatch]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 bg-dark-background items-center gap-2 text-white shadow-lg px-4 mb-10">
          <SidebarTrigger className="-ml-1 transition hover:scale-110 duration-200" />
          <Separator orientation="vertical" className="mr-2 h-4 opacity-30" />
          <div className="flex-1 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-2 text-sm text-gray-300">
                <BreadcrumbItem className="flex items-center">
                  <FaHome className="text-white" />
                  <BreadcrumbLink
                    href="#"
                    className="ml-2 hover:text-gray-100 transition"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <FaChevronRight className="text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-400">
                    History
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          <h1 className="text-center text-lg font-bold">Meetings History</h1>
          {/* First condition:Checks if page needs loading but also checks if there is an error fetching the meetings 
                Yes: Engages Loading 
                No: Error Whilte fetching the meetings

            Second condition: Checks if there is any meetings
              Yes: Iterate over the meetings 
              No: Display No upcoming meetings    */}
          {loading ? (

            <p> Loading your Scheduled meetings...</p>

          ) : error ? (

            <p> Error: {error}</p>

          ) : meetings.length > 0 ? (

            meetings.map((meeting) => (
              <div key={meeting._id} className="border-b py-2">
                {meeting.title} - {new Date(meeting.scheduledTime).toString()}
              </div>
            ))

          ) : (
            <p> No Upcoming meetings. </p>
          )}

        </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default MyCalendar;
