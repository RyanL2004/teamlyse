// Sample data for the application
export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    calendars: [
      {
        name: "My Calendars",
        items: ["Personal", "Work", "Family"],
      },
      {
        name: "Favorites",
        items: ["Holidays", "Birthdays"],
      },
      {
        name: "Other",
        items: ["Travel", "Reminders", "Deadlines"],
      },
    ],
    meetings: [
      {
        id: "1",
        title: "Team Standup",
        description: "Daily team standup meeting",
        date: new Date(2024, 9, 3, 9, 0), // Oct 3, 2024, 9:00 AM
        endTime: new Date(2024, 9, 3, 9, 30), // Oct 3, 2024, 9:30 AM
        location: "Conference Room A",
        calendar: "Work",
        status: "upcoming",
        participants: ["John Doe", "Jane Smith", "Bob Johnson"],
      },
      {
        id: "2",
        title: "Project Review",
        description: "Monthly project review with stakeholders",
        date: new Date(2024, 9, 5, 14, 0), // Oct 5, 2024, 2:00 PM
        endTime: new Date(2024, 9, 5, 15, 30), // Oct 5, 2024, 3:30 PM
        location: "Main Boardroom",
        calendar: "Work",
        status: "upcoming",
        participants: ["Alice Williams", "Charlie Brown", "Diana Prince"],
      },
      {
        id: "3",
        title: "Client Meeting",
        description: "Presentation of new features to client",
        date: new Date(2024, 9, 10, 11, 0), // Oct 10, 2024, 11:00 AM
        endTime: new Date(2024, 9, 10, 12, 0), // Oct 10, 2024, 12:00 PM
        location: "Virtual - Zoom",
        calendar: "Work",
        status: "upcoming",
        participants: ["Frank Miller", "Grace Lee"],
      },
      {
        id: "4",
        title: "Family Dinner",
        description: "Weekly family dinner",
        date: new Date(2024, 9, 6, 18, 0), // Oct 6, 2024, 6:00 PM
        endTime: new Date(2024, 9, 6, 20, 0), // Oct 6, 2024, 8:00 PM
        location: "Home",
        calendar: "Family",
        status: "upcoming",
        participants: ["Mom", "Dad", "Sister", "Brother"],
      },
      {
        id: "5",
        title: "Doctor Appointment",
        description: "Annual checkup",
        date: new Date(2024, 9, 15, 10, 0), // Oct 15, 2024, 10:00 AM
        endTime: new Date(2024, 9, 15, 11, 0), // Oct 15, 2024, 11:00 AM
        location: "Medical Center",
        calendar: "Personal",
        status: "upcoming",
        participants: [],
      },
    ],
  }
  
  export const Meeting = {
    id: String,
    title: String,
    description: String,
    date: Date,
    endTime: Date,
    location: String,
    calendar: String,
    status: String,
    participants: Array,
  }
  
  export const Calendar = {
    name: String,
    items: Array,
  }
  
  export const User = {
    name: String,
    email: String,
    avatar: String,
  }
  
  