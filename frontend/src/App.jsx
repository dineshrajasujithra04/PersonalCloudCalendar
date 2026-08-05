import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import ViewEvents from "./pages/ViewEvents";
import EditEvent from "./pages/EditEvent";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Public Pages */}

        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Pages */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          <Route
            path="/add-event"
            element={<AddEvent />}
          />


          <Route
            path="/view-events"
            element={<ViewEvents />}
          />


          <Route
            path="/edit-event/:id"
            element={<EditEvent />}
          />


        </Route>


      </Routes>


    </BrowserRouter>

  );
}


export default App;