import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Register() {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleRegister = async (e) => {

    e.preventDefault();


    if(password !== confirmPassword){

      alert("Passwords do not match");
      return;

    }


    try{


      await api.post("/register",{

        name,
        email,
        password

      });



      alert("Registration Successful!");


      navigate("/");



    }
    catch(error){


      console.log(error);


      if(error.response){

        alert(error.response.data.detail);

      }
      else{

        alert("Cannot connect to backend");

      }


    }


  };



  return (


    <div

      style={{

        minHeight:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        background:"linear-gradient(135deg,#667eea,#764ba2)",

        padding:"20px"

      }}

    >


      <div

        style={{

          width:"380px",

          background:"white",

          padding:"35px",

          borderRadius:"20px",

          boxShadow:"0 10px 30px rgba(0,0,0,0.2)"

        }}

      >



        <div

          style={{

            textAlign:"center"

          }}

        >


          <h1>
            ☁️
          </h1>


          <h2>
            Create Account
          </h2>


          <p>
            Join Personal Cloud Calendar
          </p>


        </div>




        <form onSubmit={handleRegister}>


          <label>
            👤 Name
          </label>


          <input

            type="text"

            placeholder="Enter your name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            required

            style={inputStyle}

          />



          <label>
            📧 Email
          </label>


          <input

            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

            style={inputStyle}

          />




          <label>
            🔒 Password
          </label>


          <input

            type="password"

            placeholder="Create password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

            style={inputStyle}

          />




          <label>
            🔐 Confirm Password
          </label>


          <input

            type="password"

            placeholder="Confirm password"

            value={confirmPassword}

            onChange={(e)=>setConfirmPassword(e.target.value)}

            required

            style={inputStyle}

          />




          <button

            type="submit"

            style={{

              width:"100%",

              padding:"12px",

              marginTop:"15px",

              borderRadius:"10px",

              border:"none",

              background:"#667eea",

              color:"white",

              fontSize:"17px",

              cursor:"pointer"

            }}

          >

            Register

          </button>



        </form>




        <div

          style={{

            textAlign:"center",

            marginTop:"20px"

          }}

        >


          <p>
            Already have an account?
          </p>


          <button

            onClick={()=>navigate("/")}

            style={{

              padding:"10px 25px",

              borderRadius:"10px",

              border:"1px solid #667eea",

              background:"white",

              color:"#667eea",

              cursor:"pointer"

            }}

          >

            Login

          </button>


        </div>



      </div>


    </div>


  );

}



const inputStyle = {

  width:"100%",

  padding:"12px",

  marginTop:"8px",

  marginBottom:"18px",

  borderRadius:"10px",

  border:"1px solid #ccc",

  fontSize:"16px"

};



export default Register;