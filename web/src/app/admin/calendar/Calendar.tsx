
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
  compact = false,
}: {
  events: CalendarEvent[];
  compact?: boolean;
}) {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={
        compact ? {
           left: "prev",
              center: "title",
              right: "next",
            }
          : {
              left: "prev,next today",
              center: "title",
              right: "",
            }
      

        }
          events={events}
        height={compact ? 360 : "auto"}
        dayHeaderFormat={
          compact ? { weekday: "narrow" } : { weekday: "short" }
        }
        dayMaxEvents={compact ? 1 : false}
        eventDisplay={compact ? "list-item" : "auto"}
    />
  );
}
