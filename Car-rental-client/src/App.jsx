import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddCar from "./pages/AddCar";
import PrivateRoute from "./routes/PrivateRoute";
import Cars from "./pages/Cars";
import BookCar from "./pages/BookCar";
import MyBookings from "./pages/MyBookings";
import AdminPanel from "./pages/AdminPanel";
import MyCars from "./pages/MyCars";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CarDetails from "./pages/CarDetails";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/add-car"
            element={
              <PrivateRoute>
                <AddCar />
              </PrivateRoute>
            }
          />
          <Route path="/cars" element={<Cars />} />
          <Route
            path="/book/:id"
            element={
              <PrivateRoute>
                <BookCar />
              </PrivateRoute>
            }
          />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route
            path="/my-cars"
            element={
              <PrivateRoute>
                <MyCars />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
