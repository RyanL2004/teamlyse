import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { FaMicrophone, FaUpload, FaCommentDots, FaHome, FaChevronRight } from "react-icons/fa";

export default function Page() {
  return (
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
                  <BreadcrumbLink href="#" className="ml-2 hover:text-gray-100 transition">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <FaChevronRight className="text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-400">AI Meeting Tools</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <h1 className="text-center">Welcome to your Dashbord </h1>
          <div className="grid auto-rows-min gap-6 md:grid-cols-3">
            {/* Start a Meeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-blue-900 to-blue-600 p-6 rounded-xl shadow-md text-white hover:scale-[1.02] transition duration-300"
            >
              <FaMicrophone className="text-4xl text-yellow-400 animate-pulse" />
              <h2 className="text-lg font-semibold mt-3">Start a Meeting</h2>
              <p className="text-gray-300 mt-2">Enable AI assistance for real-time transcription and insights.</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-yellow-600 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition"
              >
                Start with AI
              </motion.button>
            </motion.div>

            {/* Upload Meeting Audio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-gradient-to-br from-gray-800 to-gray-600 p-6 rounded-xl shadow-md text-white hover:scale-[1.02] transition duration-300"
            >
              <FaUpload className="text-4xl text-green-400 animate-bounce" />
              <h2 className="text-lg font-semibold mt-3">Upload Meeting Audio</h2>
              <p className="text-gray-300 mt-2">Process past meetings for AI-generated summaries and insights.</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Upload File
              </motion.button>
            </motion.div>

            {/* Chat About Past Meetings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative bg-gradient-to-br from-purple-900 to-purple-600 p-6 rounded-xl shadow-md text-white hover:scale-[1.02] transition duration-300"
            >
              <FaCommentDots className="text-4xl text-pink-400 animate-spin-slow" />
              <h2 className="text-lg font-semibold mt-3">Chat with AI</h2>
              <p className="text-gray-300 mt-2">Discuss insights and key moments from past meetings.</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-pink-600 px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
              >
                Start Chat
              </motion.button>
            </motion.div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
