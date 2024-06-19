import React, { useState } from "react";
import { gapi } from "gapi-script";
import "../App.css"

export const CreateEvent = () => {
  const [event, setEvent] = useState({
    summary: "",
    location: "",
    description: "",
    start: "",
    end: "",
    attendees: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const addAttendee = (email) => {
    setEvent({ ...event, attendees: [...event.attendees, { email }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      summary: event.summary,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.start,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: event.end,
        timeZone: "America/Los_Angeles",
      },
      attendees: event.attendees,
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: eventData,
      })
      .then((response) => {
        console.log("Event created: ", response);
      });
  };

  return (
    <form className='Container' onSubmit={handleSubmit}>
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleInputChange}
      ></textarea>
      <input type="datetime-local" name="start" onChange={handleInputChange} />
      <input type="datetime-local" name="end" onChange={handleInputChange} />
      <input
        type="email"
        placeholder="Attendee Email"
        onBlur={(e) => addAttendee(e.target.value)}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};
