import React, { useState } from 'react'


const MeetingsHistory = () => {
  //toggle sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

    </div>
  )
}

export default MeetingsHistory
