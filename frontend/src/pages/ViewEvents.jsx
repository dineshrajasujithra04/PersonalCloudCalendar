import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ViewEvents() {

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getEvents();
  }, []);


  const getEvents = async () => {
    try {

      const response = await api.get("/events/");

      setEvents(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load events");

    }
  };


  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      await api.delete(`/events/${id}`);

      alert("Event Deleted Successfully!");

      getEvents();


    } catch (error) {

      console.log(error);
      alert("Failed to delete event");

    }

  };


  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "50px"
      }}
    >

      <h1>📋 My Events</h1>


      {events.length === 0 ? (

        <p>No Events Found</p>

      ) : (

        events.map((event) => (

          <div
            key={event.id}
            style={{
              margin: "20px auto",
              width: "350px",
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px"
            }}
          >

            <h2>{event.title}</h2>

            <p>{event.description}</p>


            <p>
              📅 {event.event_date}
            </p>


            <p>
              ⏰ {event.event_time}
            </p>


            <button
              onClick={() => navigate(`/edit-event/${event.id}`)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              ✏ Edit
            </button>


            <button
              onClick={() => deleteEvent(event.id)}
              style={{
                padding: "10px 20px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              🗑 Delete
            </button>


          </div>

        ))

      )}

    </div>

  );
}

export default ViewEvents;