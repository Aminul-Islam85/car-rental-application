import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BookCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`https://hero-car-rental.vercel.app/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error("Failed to load car:", err));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;

    const booking = {
      carId: id,
      name: form.name.value,
      email: form.email.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
    };

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

    if (res.ok) {
        setSuccess("✅ Booking submitted successfully!");
        form.reset();
      } else {
        setSuccess("❌ Failed to submit booking.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setSuccess("❌ Error while booking.");
    }
  };

  if (!car) return <div className="text-center mt-10">Loading car details...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book: {car.model}</h2>
      <p className="mb-2 text-sm text-gray-600">{car.description}</p>

      <form onSubmit={handleBooking} className="grid grid-cols-1 gap-4">
        <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full" required />
        <input type="date" name="startDate" className="input input-bordered w-full" required />
        <input type="date" name="endDate" className="input input-bordered w-full" required />

        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>

      {success && (
        <p className="text-green-600 text-center font-medium mt-4">{success}</p>
      )}
    </div>
  );
};

export default BookCar;
