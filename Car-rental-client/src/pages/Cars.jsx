import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [view, setView] = useState("grid"); // grid or list

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`https://hero-car-rental.vercel.app/api/cars`);
        const data = await res.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load cars:", err);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.dailyPrice - b.dailyPrice;
      if (sortOption === "price-desc") return b.dailyPrice - a.dailyPrice;
      if (sortOption === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) return <div className="text-center mt-10">Loading cars...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Cars</h2>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by model or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />

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

        <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="btn btn-outline">
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      {/* Cars Display */}
      <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredCars.map((car) => (
          <div key={car._id} className="card bg-base-100 shadow-md p-4 flex flex-col md:flex-row gap-4">
            <img
              src={car.image}
              alt={car.model}
              className={`rounded object-cover ${view === "grid" ? "h-48 w-full" : "w-40 h-28"}`}
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{car.model}</h3>
              <p><strong>Price:</strong> ${car.dailyPrice}/day</p>
              <p><strong>Status:</strong> {car.availability}</p>
              <p><strong>Location:</strong> {car.location}</p>
              {view === "grid" && <p className="text-sm mt-2 text-gray-600">{car.description}</p>}
              <Link to={`/car/${car._id}`} className="btn btn-primary btn-sm mt-3">
                Book Now
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
