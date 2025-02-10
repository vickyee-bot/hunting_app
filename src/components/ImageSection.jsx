import houseImage from "../assets/2.jpg"; // Import image

export default function ImageSection() {
  return (
    <div className="relative w-full  max-w-md bg-white p-0 rounded-xl shadow-lg border-4 border-teal-300 mx-auto hidden md:flex md:w-1/2 md:mr-1">
      {" "}
      {/* Adjust height as needed */}
      <img
        src={houseImage}
        alt="Find Your Home"
        className="w-full min-h-full object-cover rounded-xl "
      />
      <div className="absolute bottom-7 left-6 text-white font-bold text-4xl">
        Find Your <br /> Perfect Home!
      </div>
    </div>
  );
}
