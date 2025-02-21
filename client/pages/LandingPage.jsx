import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import houseImage from "../../src/assets/2.jpg";
import Logo from "../../src/assets/46-removebg-preview 1.svg";

export default function LandingPage() {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        {/* <h1 className="text-2xl font-bold text-blue-600">HouseHunt</h1> */}
        <img src={Logo} alt="logo" className="w-15 h-15" />
        <nav>
          <ul className="flex space-x-6">
            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
              Find a Home
            </li>
            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
              About
            </li>
            <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
              Contact
            </li>
          </ul>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section
        className="text-center py-20 bg-[url('/hero.jpg')] bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${houseImage})` }}
      >
        <h2 className="text-4xl font-bold">Find Your Dream Home</h2>
        <p className="mt-4 text-lg">
          Search from thousands of verified listings.
        </p>
        <div className="mt-6 flex justify-center space-x-4 ">
          <input
            type="text"
            placeholder="Enter Location"
            className="p-3 rounded-md text-black bg-white"
          />
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
            Search Homes
          </button>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12 px-6">
        <h3 className="text-3xl font-semibold mb-8">Featured Listings</h3>

        {/* Horizontal Scroll Wrapper */}
        <div className="flex overflow-x-scroll space-x-6 p-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="bg-white min-w-[300px] p-4 rounded-lg shadow-md"
            >
              <img src={houseImage} alt="House" className="w-full rounded-md" />
              <h4 className="text-xl font-bold mt-2">Luxury Apartment</h4>
              <p className="text-gray-500">$1,200/month - Nairobi</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-12 text-center">
        <h3 className="text-3xl font-semibold">Why Choose Us?</h3>
        <div className="flex justify-center mt-6 space-x-10">
          <div>
            <h4 className="text-xl font-bold">🏠 Verified Listings</h4>
            <p>No scams, just real homes.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">💬 Direct Chat</h4>
            <p>Talk directly to landlords.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">🚀 Fast Process</h4>
            <p>Find a home in minutes.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-200 text-center">
        <h3 className="text-3xl font-semibold mb-6">What Our Users Say</h3>
        <Swiper spaceBetween={50} slidesPerView={1}>
          <SwiperSlide>
            <p className="text-lg">
              “HouseHunt made finding my new apartment stress-free!”
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-lg">“Fast, reliable, and easy to use.”</p>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h3 className="text-3xl font-semibold">Start Your House Hunt Today!</h3>
        <button className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2025 HouseHunt. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
