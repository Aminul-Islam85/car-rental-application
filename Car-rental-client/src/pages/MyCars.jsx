import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [sortOption, setSortOption] = useState("date-desc");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://hero-car-rental.vercel.app/api/cars?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Failed to load user's cars", err));
  }, [user]);

  const sortCars = (cars) => {
    const sorted = [...cars];
    if (sortOption === "price-asc") {
      return sorted.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (sortOption === "price-desc") {
      return sorted.sort((a, b) => b.dailyPrice - a.dailyPrice);
    } else if (sortOption === "date-asc") {
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/cars/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCars(cars.filter((car) => car._id !== id));
      } else {
        console.error("Failed to delete car");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCar = {
      model: form.model.value,
      dailyPrice: form.dailyPrice.value,
      availability: form.availability.value,
      registrationNumber: form.registrationNumber.value,
      features: form.features.value.split(","),
      description: form.description.value,
      image: form.image.value,
      location: form.location.value,
    };

    try {
      const res = await fetch(`https://hero-car-rental.vercel.app/api/cars/${selectedCar._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });

      if (res.ok) {
        const updated = await res.json();
        setCars(cars.map((car) => (car._id === updated._id ? updated : car)));
        setShowModal(false);
        setSelectedCar(null);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const sortedCars = sortCars(cars);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Listed Cars</h2>

      {cars.length === 0 ? (
        <p className="text-center">
          You haven't listed any cars yet. <a href="/add-car" className="text-blue-500 underline">Add one now</a>
        </p>
      ) : (
        <>
          
          <div className="flex justify-end mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="select select-bordered"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Booking Count</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <img src={car.image} alt={car.model} className="w-20 h-16 rounded object-cover" />
                    </td>
                    <td>{car.model}</td>
                    <td>${car.dailyPrice}/day</td>
                    <td>{car.bookingCount || 0}</td>
                    <td>{car.availability}</td>
                    <td>{new Date(car.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(car)} className="btn btn-xs btn-warning mr-2">Update</button>
                      <button onClick={() => handleDelete(car._id)} className="btn btn-xs btn-error">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          {showModal && selectedCar && (
            <dialog open className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Update Car</h3>
                <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 gap-4">
                  <input defaultValue={selectedCar.model} name="model" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.dailyPrice} name="dailyPrice" type="number" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.availability} name="availability" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.registrationNumber} name="registrationNumber" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.features.join(",")} name="features" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.location} name="location" className="input input-bordered w-full" />
                  <input defaultValue={selectedCar.image} name="image" className="input input-bordered w-full" />
                  <textarea defaultValue={selectedCar.description} name="description" className="textarea textarea-bordered w-full" />

                  <div className="modal-action">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
};

export default MyCars;
