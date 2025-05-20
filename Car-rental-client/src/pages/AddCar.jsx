import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const newCar = {
      model: form.model.value,
      dailyPrice: form.dailyPrice.value,
      availability: form.availability.value,
      registrationNumber: form.registrationNumber.value,
      features: form.features.value.split(","),
      description: form.description.value,
      image: form.image.value,
      bookingCount: 0,
      location: form.location.value,
      email: user.email, 
    };
  
    try {
      const response = await fetch(`https://hero-car-rental.vercel.app/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCar)
      });
  
      if (response.ok) {
        console.log("✅ Car added!");
        setShowModal(true);
        form.reset();
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error adding car:", err);
      setError("Network error or server not responding");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add a New Car</h2>

      <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="model" placeholder="Car Model" className="input input-bordered w-full" required />
        <input type="number" name="dailyPrice" placeholder="Daily Rental Price ($)" className="input input-bordered w-full" required />
        <input type="text" name="availability" placeholder="Available / Booked" className="input input-bordered w-full" required />
        <input type="text" name="registrationNumber" placeholder="Vehicle Registration Number" className="input input-bordered w-full" required />
        <input type="text" name="features" placeholder="Features (comma separated)" className="input input-bordered w-full" />
        <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" />
        <input type="url" name="image" placeholder="Image URL" className="input input-bordered w-full" required />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full md:col-span-2" required></textarea>

        {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}

        <button type="submit" className="btn btn-primary md:col-span-2">Add Car</button>
      </form>

      {/* ✅ Modal */}
      {showModal && (
        <dialog id="success_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">🎉 Car Added Successfully!</h3>
            <p className="py-4">The new car has been added to your system.</p>
            <div className="modal-action">            
                <button className="btn" onClick={() => setShowModal(false)}>Close</button>              
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddCar;
