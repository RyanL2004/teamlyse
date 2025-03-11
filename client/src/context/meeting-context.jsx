"use client"

import { createContext, useState, useContext } from "react"
import { data } from "@/lib/data"

const MeetingContext = createContext(undefined)

export function MeetingProvider({ children }) {
  const [meetings, setMeetings] = useState(data.meetings)
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedMeeting, setSelectedMeeting] = useState(null)

  const addMeeting = (meeting) => {
    const newMeeting = {
      ...meeting,
      id: Math.random().toString(36).substring(2, 9),
    }
    setMeetings([...meetings, newMeeting])
  }

  const updateMeeting = (meeting) => {
    setMeetings(meetings.map((m) => (m.id === meeting.id ? meeting : m)))
  }

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id))
  }

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        selectedDate,
        selectedMeeting,
        setSelectedDate,
        setSelectedMeeting,
        addMeeting,
        updateMeeting,
        deleteMeeting,
      }}
    >
      {children}
    </MeetingContext.Provider>
  )
}

export function useMeetingContext() {
  const context = useContext(MeetingContext)
  if (context === undefined) {
    throw new Error("useMeetingContext must be used within a MeetingProvider")
  }
  return context
}

