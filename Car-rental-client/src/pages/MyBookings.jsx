import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDates, setNewDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings?email=${user.email}`);
        const data = await res.json();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirmed = confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: "Canceled" } : b));
        toast.success("Booking canceled!");
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleModify = (booking) => {
    setSelectedBooking(booking);
    setNewDates({ startDate: booking.startDate, endDate: booking.endDate });
  };

  const handleConfirmModify = async () => {
    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/bookings/${selectedBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDates),
      });

      if (res.ok) {
        setBookings(bookings.map(b =>
          b._id === selectedBooking._id ? { ...b, ...newDates } : b
        ));
        toast.success("Booking dates updated!");
        setSelectedBooking(null);
      } else {
        toast.error("Failed to update booking.");
      }
    } catch (err) {
      console.error("Update failed:", err); 
      toast.error("Error updating booking.");
    }
    
  };

  if (loading) return <div className="text-center mt-10">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 overflow-x-auto">
      <h2 className="text-3xl font-bold text-center mb-6">My Bookings</h2>

      <table className="table w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>Car Image</th>
            <th>Model</th>
            <th>Booking Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover">
              <td><img src={b.carId?.image} alt="car" className="w-20 h-16 rounded" /></td>
              <td>{b.carId?.model}</td>
              <td>{new Date(b.createdAt).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" })}</td>
              <td>${b.totalPrice || b.carId?.dailyPrice || 0}</td>
              <td>{b.status || "Confirmed"}</td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-error" onClick={() => handleCancel(b._id)}>
                  <FaTrash className="mr-1" /> Cancel
                </button>
                <button className="btn btn-sm btn-info" onClick={() => handleModify(b)}>
                  <FaCalendarAlt className="mr-1" /> Modify Date
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedBooking && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Modify Booking Dates</h3>
            <label className="block mb-2">Start Date:</label>
            <input type="date" className="input input-bordered w-full mb-4"
              value={newDates.startDate} onChange={(e) => setNewDates({ ...newDates, startDate: e.target.value })} />

            <label className="block mb-2">End Date:</label>
            <input type="date" className="input input-bordered w-full mb-4"
              value={newDates.endDate} onChange={(e) => setNewDates({ ...newDates, endDate: e.target.value })} />

            <div className="modal-action">
              <button className="btn btn-success" onClick={handleConfirmModify}>Confirm</button>
              <button className="btn" onClick={() => setSelectedBooking(null)}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyBookings;
