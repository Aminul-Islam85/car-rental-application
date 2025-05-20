import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [recentCars, setRecentCars] = useState([]);

useEffect(() => {
  fetch(`https://hero-car-rental.vercel.app/api/cars`)
    .then(res => res.json())
    .then(data => {
      const sorted = data
        .sort((a, b) => new Date(b._id.toString().substring(0, 8) * 1000) - new Date(a._id.toString().substring(0, 8) * 1000))
        .slice(0, 6); // latest 6 cars
      setRecentCars(sorted);
    });
}, []);

  return (
    <div>
      
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549921296-3a8b60a2a085?auto=format&fit=crop&w=1470&q=80')` }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded shadow-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🚗 Drive Your Dreams Today!</h1>
          <Link to="/cars" className="btn btn-primary text-white text-lg px-6">
            View Available Cars
          </Link>
        </div>
      </section>

      
<section className="py-16 bg-base-200">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
        <div className="text-4xl mb-3">🚘</div>
        <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
        <p className="text-sm text-gray-600">From budget-friendly to luxury — all in one place.</p>
      </div>
      <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
        <div className="text-4xl mb-3">💰</div>
        <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
        <p className="text-sm text-gray-600">Competitive daily rates you can count on.</p>
      </div>
      <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
        <div className="text-4xl mb-3">🖱️</div>
        <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
        <p className="text-sm text-gray-600">Seamlessly book your ride in just a few clicks.</p>
      </div>
      <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
        <div className="text-4xl mb-3">📞</div>
        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
        <p className="text-sm text-gray-600">Always here to help with your queries.</p>
      </div>
    </div>
  </div>
</section>


<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Recent Listings</h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentCars.map((car) => (
        <div key={car._id} className="card bg-base-100 shadow hover:shadow-lg transform hover:scale-[1.02] transition">
          <figure>
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded-t" />
          </figure>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-1">{car.model}</h3>
            <p className="text-gray-700">${car.dailyPrice}/day</p>
            <p className="text-sm text-gray-500">Availability: <span className="font-medium">{car.availability}</span></p>
            <p className="text-sm text-gray-400 mt-1">Added recently</p>

            <Link to={`/book/${car._id}`} className="btn btn-primary btn-sm mt-3 w-full">Book Now</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


<section className="py-16 bg-base-200">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Special Offers</h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 animate-slide-in-left">
        <h3 className="text-xl font-bold mb-2">🎉 15% OFF Weekend Rentals!</h3>
        <p className="text-sm text-gray-600 mb-4">Book any car for the weekend and enjoy a 15% discount.</p>
        <Link to="/cars" className="btn btn-primary btn-sm">Book Now</Link>
      </div>

      
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 animate-bounce hover:scale-105">
        <h3 className="text-xl font-bold mb-2">💎 Luxury Cars at $99/day</h3>
        <p className="text-sm text-gray-600 mb-4">Drive premium cars this holiday season at just $99 per day!</p>
        <Link to="/cars" className="btn btn-primary btn-sm">View Deals</Link>
      </div>

      
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 animate-slide-in-right">
        <h3 className="text-xl font-bold mb-2">🛡️ Free Insurance</h3>
        <p className="text-sm text-gray-600 mb-4">Get complimentary insurance coverage on your first booking.</p>
        <Link to="/cars" className="btn btn-primary btn-sm">Learn More</Link>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
