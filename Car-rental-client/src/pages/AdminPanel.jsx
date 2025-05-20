import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all cars and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, bookingsRes] = await Promise.all([
          fetch(`https://hero-car-rental.vercel.app/api/cars`),
          fetch(`https://hero-car-rental.vercel.app/api/bookings`),
        ]);

        const carsData = await carsRes.json();
        const bookingsData = await bookingsRes.json();

        setCars(carsData);
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    };

    fetchData();
  }, []);

  // Delete car
  const handleDeleteCar = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/cars/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCars(cars.filter((car) => car._id !== id));
      }
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    const confirmDelete = confirm("Are you sure you want to cancel this booking?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading admin panel...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-warning">Admin Panel</h2>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">All Cars</h3>
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car._id} className="card bg-base-100 shadow p-4 border">
                <img src={car.image} alt={car.model} className="h-40 w-full object-cover mb-2 rounded" />
                <h4 className="text-xl font-semibold">{car.model}</h4>
                <p className="text-sm">Location: {car.location}</p>
                <p className="text-sm">Price: ${car.dailyPrice}/day</p>
                <button onClick={() => handleDeleteCar(car._id)} className="btn btn-sm btn-error mt-2">
                  Delete Car
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">All Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-base-100 shadow p-4 border rounded">
                <h4 className="font-semibold text-lg">{booking.carId?.model || "Car"}</h4>
                <p><strong>User:</strong> {booking.name} ({booking.email})</p>
                <p><strong>From:</strong> {booking.startDate} | <strong>To:</strong> {booking.endDate}</p>
                <button onClick={() => handleDeleteBooking(booking._id)} className="btn btn-sm btn-error mt-2">
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
