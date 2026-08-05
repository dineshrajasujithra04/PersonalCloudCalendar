import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");


  useEffect(() => {
    getEvent();
  }, []);


  const getEvent = async () => {

    try {

      const response = await api.get(`/events/${id}`);

      const event = response.data;

      setTitle(event.title);
      setDescription(event.description);
      setEventDate(event.event_date);
      setEventTime(event.event_time);

    } catch (error) {

      console.log(error);
      alert("Failed to load event");

    }

  };


  const updateEvent = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/events/${id}`, {

        title,
        description,
        event_date: eventDate,
        event_time: eventTime

      });


      alert("Event Updated Successfully!");

      navigate("/view-events");


    } catch (error) {

      console.log(error);
      alert("Failed to update event");

    }

  };


  return (

    <div
      style={{
        textAlign:"center",
        marginTop:"50px"
      }}
    >

      <h1>✏ Edit Event</h1>


      <form onSubmit={updateEvent}>


        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Event Title"
        />

        <br/><br/>


        <input
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Description"
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
          Update Event
        </button>


      </form>


    </div>

  );

}

export default EditEvent;