"use client";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { data } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { createMeeting, updateMeetingThunk, fetchUpcomingMeetings } from "@/store/meetingsSlice";


// Define your schema
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
});

export function MeetingForm({ meeting, onCancel }) {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Determine if editing based on the existence of a meeting prop
  const isEditing = !!meeting;

  // Optionally, get a companion from navigation state (if passed)
  const companionFromNav = location.state?.selectedCompanion;

  // Get selected companion id from Redux
  const { companionsList, selectedCompanionId } = useSelector(
    (state) => state.companions
  );

  // Look up the full companion object using the ID
  const selectedCompanion =
    companionsList.find((comp) => comp._id === selectedCompanionId) ||
    companionFromNav ||
    null;

  // Select Companion Event Handler: (without triggering parent state)
  function handleSelectCompanion () {
    // Let the parent component handleCancelForm we are closing the form layout 
    // And not to remove the localStorageDraft
    onCancel({ removeDraft: false})
    
    // Now navigate to the companion route safely with resumeForm: true
    navigate("/select-companion", {
    state: { from: "calendar",resumeForm: true }
  });
}

  // Helper function to convert Date to HH:mm string
  const dateToTimeString = (date) => format(date, "HH:mm");

  // Save the meetingform draft 
  const draft = localStorage.getItem("meetingFormDraft");
  let parsedDraft = null;
  try {
    parsedDraft = draft ? JSON.parse(draft) : null
  }
  catch (error) {
    console.error('Invalid meeting draft in localStorage:', error);
  }


  // Set up the form defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing
      ? {
          title: meeting.title,
          description: meeting.description,
          date: new Date(meeting.date),
          startTime: dateToTimeString(new Date(meeting.date)),
          endTime: dateToTimeString(new Date(meeting.endTime)),
          location: meeting.location,
          calendar: meeting.calendar,
          participants: meeting.participants.join(", "),
        }
      : parsedDraft ? {
          ...parsedDraft,
          date: new Date(parsedDraft.date),
      } : {
          title: "",
          description: "",
          date: new Date(),
          startTime: "09:00",
          endTime: "10:00",
          location: "",
          calendar: "Work",
          participants: "",
        },
  });


      // Save form input persistance
      useEffect(() => {
        const subscription = form.watch((values) => {
          localStorage.setItem("meetingFormDraft", JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
      }, [form]);

  function onSubmit(values) {
    // Parse time strings to create Date objects
    const [startHours, startMinutes] = values.startTime.split(":").map(Number);
    const [endHours, endMinutes] = values.endTime.split(":").map(Number);

    const startDate = new Date(values.date);
    startDate.setHours(startHours, startMinutes);

    const formattedStartDate = startDate.toISOString();

    const endDate = new Date(values.date);
    endDate.setHours(endHours, endMinutes);
    const formattedEndDate = endDate.toISOString();


    const participants = values.participants
      ? values.participants.split(",").map((p) => p.trim())
      : [];

    const meetingData = {
      title: values.title,
      description: values.description || "",
      date: formattedStartDate,
      endTime: formattedEndDate,
      location: values.location || "",
      calendar: values.calendar,
      status: "upcoming",
      participants,

      // Here we send the selected companion's identifier
      companion: selectedCompanion ? selectedCompanion._id : null,
    };
    console.log("Selected Companion ID", selectedCompanion?._id);
    console.log("Meeting Data sent to Backend:", meetingData);
  
    if (isEditing) {
      //Dispatch the update action with meeting id and updated data 
      dispatch(
        updateMeetingThunk({ meetingId: meeting._id, updateData: meetingData })
      );
    } else {
      // Dispatch the create action with the new meeting data
      dispatch(createMeeting(meetingData)).then(() => {
        dispatch(fetchUpcomingMeetings());
      });
    }
    localStorage.removeItem("meetingFormDraft"); // remove drafted form
    onCancel(); // Call onCancel prop to reset form/UI
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Meeting Title */}
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

        {/* Meeting Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>

                <Textarea
                  placeholder="Tell your AI Companion what the meeting is about"
                  {...field}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Companion Selection Section */}
        <div className="border rounded p-4">
          <h3 className="text-lg font-semibold">Selected Companion</h3>
          {selectedCompanion ? (
            <p className="font-bold">
              You have selected:{" "}
              <span className="font-bold">{selectedCompanion.name}</span>
            </p>
          ) : (
            <p className="text-muted-foreground">
              No companion selected yet.
            </p>
          )}
          <Button
            variant="outline"
            className="mt-2"
            onClick={handleSelectCompanion}
          >
            Select
          </Button>
        </div>

        {/* Meeting Date and Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="pb-1.5">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
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
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
              <FormLabel>
                Location <span className="ml-1 italic text-sm text-muted-foreground">(optional)</span>
              </FormLabel>
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
              <FormLabel>
                Participants <span className="ml-1 italic text-sm text-muted-foreground">(optional)</span>
              </FormLabel>
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

      <p className="footer-text">
        TΞAMLYSE Helpers can make mistakes. Consider checking important information.
      </p>
    </Form>
  );
}
