
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/monarch";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/monarch/theme.css";
import "@fullcalendar/react/themes/monarch/palettes/green.css";



type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  url: string;
  allDay: boolean;
};

export default function BookingCalendar({
  events,
}: {
  events: CalendarEvent[];
}) {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      events={events}
      height="auto"
    />
  );
}
