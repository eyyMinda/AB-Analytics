import { useState, useEffect } from "react";
import { metrics } from "../../../data/metrics";
import Table from "../../components/Abs/Table";

const Dashboard = () => {
  const [sumTotal, setSumTotal] = useState(0);
  const [analyticsData, setAnalyticsData] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const initialEndDate = `${year}-${month}-${day}`;
  const initalStartDate = `${year}-${month}-${String(
    today.getDate() - 30
  ).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(initalStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [metric, setMetric] = useState("activeUsers");

  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(null);

  const fetchAnalyticsData = async () => {
    setLoading(true);

    if (new Date(startDate) > new Date(endDate)) {
      setDateError(
        `start date ${startDate} must be less than or equal to end date ${endDate}`
      );
      setLoading(false);
    } else {
      setDateError(null);

      try {
        const queryParams = new URLSearchParams([
          ["metrics", JSON.stringify([{ name: metric }])],
          ["dimensions", JSON.stringify([{ name: "country" }])],
          [
            "dateRanges",
            JSON.stringify([{ startDate: startDate, endDate: endDate }]),
          ],
        ]);
        const PORT = import.meta.env.VITE_PORT || 3000;
        const response = await fetch(
          `http://localhost:${PORT}/api?${queryParams}`
        );
        // const response = await fetch(`/api?${queryParams}`);
        const data = await response.json();
        setAnalyticsData(data);

        if (data && data[0].rows) {
          const total = data[0].rows.reduce((sum, row) => {
            return sum + parseInt(row.metricValues[0].value, 10);
          }, 0);
          setSumTotal(new Intl.NumberFormat("en-US").format(total));
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);
  console.log(analyticsData);

  return (
    <div className="p-2">
      <form className="flex items-start justify-end text-end p-2 m-2">
        <div className="p-2">
          <label htmlFor="startDate">Start Date:</label>
        </div>
        <input
          className="p-2 rounded-md border-double border-2 border-[#082f49]"
          type="date"
          name="startDate"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <div className="p-2">
          <label htmlFor="endDate">End Date:</label>
        </div>
        <input
          className="p-2 rounded-md border-double border-2 border-[#082f49]"
          type="date"
          name="endDate"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <select
          className="p-2 ml-2 rounded-md border-double border-2 border-[#082f49]"
          type="select"
          name="metric"
          value={metric}
          onChange={e => setMetric(e.target.value)}>
          {metrics.map((metric, index) => {
            return (
              <option value={metric} key={index}>
                {metric}
              </option>
            );
          })}
        </select>
        <input
          className="p-2 ml-2 rounded-md text-white text-[18px] font-bold bg-[#77002e] w-[200px] cursor-pointer"
          type="button"
          onClick={() => {
            console.log(startDate, endDate);
            fetchAnalyticsData();
          }}
          value="Fetch"
        />
      </form>

      {dateError && (
        <div className="bg-[#f59e0b] text-white p-2 rounded-sm">
          {dateError}
        </div>
      )}

      <div className="flex flex-1 w-[100%] pt-2">
        <div className="flex-col w-[20%]">
          <div className="flex items-center justify-center bg-[#77002e] h-[370px]">
            <p className="justify-center text-center text-white font-bold text-[32px] p-2">
              Total Values: <br /> {sumTotal}
            </p>
          </div>
          <div className="flex items-center justify-center bg-white h-[370px]">
            <p className="font-bold text-lg">Chart goes here</p>
          </div>
        </div>

        <Table
          analyticsData={analyticsData}
          loading={loading}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
