import {
  FaHome,
  FaUsers,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const cards = [
  { icon: <FaHome />, title: "Total Property", value: 200 },
  { icon: <FaUsers />, title: "Total Tenants", value: 200 },
  { icon: <FaCheckCircle />, title: "Occupied", value: 200 },
  { icon: <FaTimesCircle />, title: "Vacant", value: 0 },
  { icon: <FaDollarSign />, title: "Total Income", value: "Ksh. 2,000,000" },
  { icon: <FaDollarSign />, title: "Overdue Rent", value: "Ksh. 0.00" },
];

const Overview = () => {
  return (
    <section className="w-full bg-white shadow-md p-6 rounded-md mb-8 mt-4 ml-2">
      <h2 className="text-xl font-bold">Overview</h2>
      <p className="text-gray-500">
        Real-time information and activities of your property
      </p>

      {/* Use CSS Grid for 3 columns and 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-2xl w-auto h-[150px] flex flex-col justify-between relative"
          >
            {/* Icon */}
            <span className="text-4xl text-teal-400">{card.icon}</span>

            {/* Title & Value */}
            <div>
              <p className="text-gray-700 text-lg font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>

            {/* Growth Indicator */}
            <div className="flex items-center gap-2 text-gray-500 text-sm absolute bottom-3 right-3 mt-4">
              <span className="bg-teal-100 text-teal-600 px-2 py-1 rounded-full flex items-center text-sm">
                ⬆ 5.2%
              </span>
              <span>last month</span>
            </div>

            {/* Three-dot menu */}
            <div className="absolute top-3 right-3">
              <span className="text-gray-400 text-xl">⋯</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
