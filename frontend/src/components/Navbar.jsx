import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#1e3a8a",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* Logo */}
      <h2>
        ☁ Personal Calendar
      </h2>


      {/* Menu */}
      <div>

        <Link
          to="/dashboard"
          style={linkStyle}
        >
          Dashboard
        </Link>


        <Link
          to="/add-event"
          style={linkStyle}
        >
          Add Event
        </Link>


        <Link
          to="/view-events"
          style={linkStyle}
        >
          View Events
        </Link>


        <button
          onClick={logout}
          style={{
            background:"red",
            color:"white",
            border:"none",
            padding:"8px 15px",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Logout
        </button>


      </div>


    </nav>
  );
}


const linkStyle = {
  color:"white",
  textDecoration:"none",
  margin:"0 15px",
  fontSize:"16px"
};


export default Navbar;