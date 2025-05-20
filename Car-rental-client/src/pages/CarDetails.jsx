import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hero-car-rental.vercel.app/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error("Failed to fetch car details", err));
  }, [id]);

  const handleConfirmBooking = async () => {
    try {
      const booking = {
        carId: car._id,
        name: user.displayName,
        email: user.email,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      };

      const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        toast.success("Booking confirmed!");
        setShowModal(false);
        navigate("/my-bookings");
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!car) return <div className="text-center mt-10">Loading car details...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{car.model}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <img src={car.image} alt={car.model} className="rounded shadow-md" />
        <div>
          <p><strong>Price Per Day:</strong> ${car.dailyPrice}</p>
          <p><strong>Availability:</strong> {car.availability}</p>
          <p><strong>Features:</strong> {car.features?.join(", ")}</p>
          <p><strong>Location:</strong> {car.location}</p>
          <p className="mt-4 text-sm text-gray-700">{car.description}</p>
          <button className="btn btn-primary mt-6" onClick={() => setShowModal(true)}>
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">Confirm Booking</h3>
            <p className="mb-2"><strong>Car:</strong> {car.model}</p>
            <p><strong>Price Per Day:</strong> ${car.dailyPrice}</p>
            <p><strong>Availability:</strong> {car.availability}</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleConfirmBooking}>
                Confirm
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CarDetails;
