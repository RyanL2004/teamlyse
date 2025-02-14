import React, { useState } from 'react'


const UpcomingMeetings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className = "flex h-screen bg-neutral-950 text-white">
      <DashboardSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

    </div>
  )
}

export default UpcomingMeetings
