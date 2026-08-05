import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [totalEvents, setTotalEvents] = useState(0);


  useEffect(() => {

    const name = localStorage.getItem("userName");

    if(name){
      setUserName(name);
    }

    getEventsCount();

  }, []);



  const getEventsCount = async () => {

    try {

      const response = await api.get("/events/");

      setTotalEvents(response.data.length);

    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <div
      style={{
        minHeight:"80vh",
        padding:"40px",
        fontFamily:"Arial",
        background:"#f5f7fb"
      }}
    >


      <div
        style={{
          textAlign:"center"
        }}
      >

        <h1>
          ☁️ Personal Cloud Calendar
        </h1>


        <h2>
          Hello {userName} 👋
        </h2>


        <p>
          Manage your schedule easily from one place.
        </p>


      </div>



      <div
        style={{
          display:"flex",
          justifyContent:"center",
          gap:"30px",
          marginTop:"40px",
          flexWrap:"wrap"
        }}
      >


        <div
          style={{
            background:"white",
            width:"220px",
            padding:"25px",
            borderRadius:"15px",
            textAlign:"center",
            boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            📅
          </h2>

          <h3>
            Total Events
          </h3>

          <h1>
            {totalEvents}
          </h1>

        </div>




        <div
          style={{
            background:"white",
            width:"220px",
            padding:"25px",
            borderRadius:"15px",
            textAlign:"center",
            boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            📝
          </h2>


          <h3>
            Upcoming Events
          </h3>


          <h1>
            {totalEvents}
          </h1>


        </div>


      </div>




      <div
        style={{
          textAlign:"center",
          marginTop:"50px"
        }}
      >


        <button
          onClick={()=>navigate("/add-event")}
          style={{
            padding:"15px 30px",
            margin:"10px",
            borderRadius:"10px",
            border:"none",
            background:"#667eea",
            color:"white",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >

          ➕ Add Event

        </button>



        <button
          onClick={()=>navigate("/view-events")}
          style={{
            padding:"15px 30px",
            margin:"10px",
            borderRadius:"10px",
            border:"none",
            background:"#764ba2",
            color:"white",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >

          📋 View Calendar

        </button>



      </div>



    </div>

  );

}


export default Dashboard;