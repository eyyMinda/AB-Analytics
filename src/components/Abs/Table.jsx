export default function Table(props) {
  const { analyticsData, loading, startDate, endDate } = props;
  const tableHeaders = ["Country", "Start Date", "End Date", "Value"];

  return (
    <div className="w-[80%]">
      <div className="pl-2">
        <table className="w-[100%] mb-10">
          <thead>
            <tr className="bg-[#082f49] text-white">
              {tableHeaders.map(header => (
                <th key={header} className="p-2 text-center justify-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {analyticsData &&
              analyticsData[0].rows &&
              analyticsData[0].rows.map((row, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-[#ccfbf1]" : "bg-[#a5f3fc]"
                    }`}>
                    <td className="p-2">{row.dimensionValues[0].value}</td>
                    <td className="p-2">{startDate}</td>
                    <td className="p-2">{endDate}</td>
                    <td className="p-2">
                      {new Intl.NumberFormat("en-US").format(
                        row.metricValues[0].value
                      )}
                    </td>
                  </tr>
                );
              })}
            {analyticsData && analyticsData[0].rows.length <= 0 && (
              <tr className="text-center justify-center">No data found</tr>
            )}
          </tbody>
        </table>

        <div className={`${loading ? "relative blur-sm" : ""}`}>
          {loading && (
            <div className="absolute inset-0 flex items-start justify-center mt-5 z-5">
              <div className="border-[#082f49] border-t-4 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
