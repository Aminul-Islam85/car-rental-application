import { useEffect, useState } from "react";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hero-car-rental.vercel.app/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cars...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Available Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="card bg-base-100 shadow-lg p-4">
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">{car.model}</h3>
            <p className="text-gray-600">${car.dailyPrice} per day</p>
            <p className="text-sm">Status: {car.availability}</p>
            <p className="text-sm">Location: {car.location}</p>
            <p className="text-sm">Features: {car.features.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
