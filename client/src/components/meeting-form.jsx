import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { data } from "@/lib/data"
import { useMeetingContext } from "@/context/meeting-context"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in 24-hour format (HH:MM).",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in 24-hour format (HH:MM).",
  }),
  location: z.string().optional(),
  calendar: z.string({
    required_error: "Please select a calendar.",
  }),
  participants: z.string().optional(),
})

export function MeetingForm({ meeting, onCancel }) {
  const { addMeeting, updateMeeting } = useMeetingContext()
  const isEditing = !!meeting

  // Helper function to convert Date to HH:MM string
  const dateToTimeString = (date) => {
    return format(date, "HH:mm")
  }

  // Initialize form with meeting data if editing
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing
      ? {
          title: meeting.title,
          description: meeting.description,
          date: meeting.date,
          startTime: dateToTimeString(meeting.date),
          endTime: dateToTimeString(meeting.endTime),
          location: meeting.location,
          calendar: meeting.calendar,
          participants: meeting.participants.join(", "),
        }
      : {
          title: "",
          description: "",
          date: new Date(),
          startTime: "09:00",
          endTime: "10:00",
          location: "",
          calendar: "Work",
          participants: "",
        },
  })

  function onSubmit(values) {
    // Parse time strings to create Date objects
    const [startHours, startMinutes] = values.startTime.split(":").map(Number)
    const [endHours, endMinutes] = values.endTime.split(":").map(Number)

    const startDate = new Date(values.date)
    startDate.setHours(startHours, startMinutes)

    const endDate = new Date(values.date)
    endDate.setHours(endHours, endMinutes)

    const participants = values.participants ? values.participants.split(",").map((p) => p.trim()) : []

    const meetingData = {
      title: values.title,
      description: values.description || "",
      date: startDate,
      endTime: endDate,
      location: values.location || "",
      calendar: values.calendar,
      status: "upcoming",
      participants,
    }

    if (isEditing) {
      updateMeeting({ ...meetingData, id: meeting.id })
    } else {
      addMeeting(meetingData)
    }

    onCancel()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Meeting title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Meeting details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calendar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calendar</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a calendar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.calendars.flatMap((calendar) =>
                      calendar.items.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      )),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="09:00" {...field} />
                  </div>
                </FormControl>
                <FormDescription>24-hour format (HH:MM)</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="10:00" {...field} />
                  </div>
                </FormControl>
                <FormDescription>24-hour format (HH:MM)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Meeting location" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe, Jane Smith" {...field} />
                </div>
              </FormControl>
              <FormDescription>Separate names with commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isEditing ? "Update Meeting" : "Create Meeting"}</Button>
        </div>
      </form>
    </Form>
  )
}

