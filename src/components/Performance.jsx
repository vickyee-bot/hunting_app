import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const data = [
  { name: "Occupied", value: 200 },
  { name: "Vacant", value: 0 },
];
const colors = ["#000", "#ccc"];
const revenueData = [
  { x: "Jan", y: 100 },
  { x: "Feb", y: 200 },
  { x: "Mar", y: 300 },
];
const viewsData = [
  { x: "Jan", y: 50 },
  { x: "Feb", y: 150 },
  { x: "Mar", y: 250 },
];

const Performance = () => {
  return (
    <section className="mt-6 ml-2">
      <h2 className="text-xl font-bold">Performance</h2>
      <p className="text-gray-500">
        Track property views, inquiries, and tenant interactions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Occupancy Rate</h3>
          <PieChart width={200} height={200}>
            <Pie data={data} dataKey="value" outerRadius={80} fill="#000">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Revenue Insights</h3>
          <BarChart width={250} height={150} data={revenueData}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="y" fill="#000" />
          </BarChart>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 shadow-md rounded-lg mt-6">
        <h3 className="text-lg font-semibold">Property Views</h3>
        <LineChart width={350} height={200} data={viewsData}>
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#000" />
        </LineChart>
      </div>
    </section>
  );
};

export default Performance;
