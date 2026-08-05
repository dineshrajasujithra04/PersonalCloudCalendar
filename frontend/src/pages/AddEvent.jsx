import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddEvent() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const addEvent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/events", {
        title: title,
        description: description,
        event_date: eventDate,
        event_time: eventTime
      });

      alert("Event Added Successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Failed to add event");
    }
  };


  return (
    <div style={{
      textAlign:"center",
      marginTop:"50px"
    }}>

      <h1>Add Event</h1>

      <form onSubmit={addEvent}>

        <input
          placeholder="Event Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <br/><br/>

        <input
          type="date"
          value={eventDate}
          onChange={(e)=>setEventDate(e.target.value)}
        />

        <br/><br/>

        <input
          type="time"
          value={eventTime}
          onChange={(e)=>setEventTime(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Add Event
        </button>

      </form>

    </div>
  );
}

export default AddEvent;