const Footer = () => {
    return (
      <footer className="bg-base-300 text-base-content mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">🚗 CarRentalPro</h2>
            <p className="text-sm">© {new Date().getFullYear()} CarRentalPro. All rights reserved.</p>
          </div>
  
          
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl hover:text-primary">📸</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  