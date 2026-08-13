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

    const token = localStorage.getItem("token");

    console.log(
      "Token before adding event:",
      token
    );


    if (!token) {

      alert("Please login first.");

      navigate("/");

      return;
    }


    try {

      const response = await api.post(
        "/events/",
        {
          title: title,
          description: description,
          event_date: eventDate,
          event_time: eventTime
        }
      );


      console.log(
        "Event created:",
        response.data
      );


      alert(
        "Event Added Successfully!"
      );


      navigate("/dashboard");

    }

    catch (error) {

      console.log(
        "Add Event Error:",
        error
      );


      if (error.response) {

        console.log(
          "Status:",
          error.response.status
        );


        console.log(
          "Response:",
          error.response.data
        );


        if (
          error.response.status === 401
        ) {

          alert(
            "Session expired. Please login again."
          );

          navigate("/");

          return;
        }


        alert(
          error.response.data?.detail ||
          "Failed to add event"
        );

      }

      else {

        alert(
          "Cannot connect to backend."
        );
      }
    }
  };


  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "50px"
      }}
    >

      <h1>Add Event</h1>


      <form onSubmit={addEvent}>

        <input
          placeholder="Event Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />


        <br />
        <br />


        <input
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        <br />
        <br />


        <input
          type="date"
          value={eventDate}
          onChange={(e) =>
            setEventDate(e.target.value)
          }
          required
        />


        <br />
        <br />


        <input
          type="time"
          value={eventTime}
          onChange={(e) =>
            setEventTime(e.target.value)
          }
          required
        />


        <br />
        <br />


        <button type="submit">
          Add Event
        </button>

      </form>

    </div>
  );
}


export default AddEvent;