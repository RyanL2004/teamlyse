import { format, isSameDay } from "date-fns"
import { Calendar, Clock, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useMeetingContext } from "@/context/meeting-context"

export function MeetingList() {
  const { meetings, selectedDate, setSelectedMeeting, deleteMeeting } = useMeetingContext()

  // Filter meetings by selected date if there is one
  const filteredMeetings = selectedDate ? meetings.filter((meeting) => isSameDay(meeting.date, selectedDate)) : meetings

  // Sort meetings by date (ascending)
  const sortedMeetings = [...filteredMeetings].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Group meetings by date
  const meetingsByDate = sortedMeetings.reduce((acc, meeting) => {
    const dateKey = format(meeting.date, "yyyy-MM-dd")
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(meeting)
    return acc
  }, {})

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "in-progress":
        return "bg-green-500"
      case "completed":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  if (sortedMeetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No meetings found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedDate
            ? `No meetings scheduled for ${format(selectedDate, "MMMM d, yyyy")}`
            : "No upcoming meetings scheduled"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(meetingsByDate).map(([dateKey, dateMeetings]) => (
        <div key={dateKey} className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
          </h3>
          <div className="grid gap-3">
            {dateMeetings.map((meeting) => (
              <Card key={meeting.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {format(meeting.date, "h:mm a")} - {format(meeting.endTime, "h:mm a")}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {meeting.calendar}
                      </Badge>
                      <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(meeting.status)}`} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedMeeting(meeting)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => deleteMeeting(meeting.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                {meeting.description && (
                  <CardContent className="pb-2">
                    <p className="text-sm">{meeting.description}</p>
                  </CardContent>
                )}
                <CardFooter className="pt-0 text-xs text-muted-foreground">
                  {meeting.location && (
                    <div className="flex items-center mr-4">
                      <span>📍 {meeting.location}</span>
                    </div>
                  )}
                  {meeting.participants.length > 0 && (
                    <div className="flex items-center">
                      <span>👥 {meeting.participants.length} participants</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

