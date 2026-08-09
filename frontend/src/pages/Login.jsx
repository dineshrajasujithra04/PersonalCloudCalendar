import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // Save user information
      localStorage.setItem(
        "userName",
        response.data.name
      );

      localStorage.setItem(
        "userId",
        response.data.user_id
      );

      localStorage.setItem(
        "userEmail",
        response.data.email
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
          "Login failed"
        );
      } else {
        alert("Cannot connect to backend");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>☁️</h1>

          <h2>Personal Cloud Calendar</h2>

          <p>Login to manage your events</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>📧 Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label>🔒 Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#667eea",
              color: "white",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <p>New user?</p>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "10px 25px",
              borderRadius: "10px",
              border: "1px solid #667eea",
              background: "white",
              color: "#667eea",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;