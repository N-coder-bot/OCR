/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Result({ results }) {
  return (
    <div className="flex flex-col justify-center items-center m-7">
      <div className="text-2xl font-serif">RESULTS</div>
      {results.map((result, index) => (
        <div
          key={index}
          className=" bg-blue-300 p-5 m-5 rounded-md font-mono font-semibold h-64 drop-shadow-lg"
        >
          <ul className="flex flex-col justify-between h-full">
            <li>
              {`"Identification Number"`}:{`"${result.identification_number}"`},
            </li>
            <li>
              {`"name"`}:{`"${result.name}"`},
            </li>
            <li>
              {`"last_name"`}:{`"${result.last_name}"`},
            </li>
            <li>
              {`"date-of-birth"`}:{`"${result.date_of_birth}"`},
            </li>
            <li>
              {`"date-of-issue"`}:{`"${result.date_of_issue}"`},
            </li>
            <li>
              {`"date-of-expiry"`}:{`"${result.date_of_expiry}"`},
            </li>
            <li>
              {`"status"`}:
              {result.status == "successful" ? (
                <span className="text-green-800">SUCCESSFUL</span>
              ) : (
                <span className="text-red-600">FAILED</span>
              )}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Result;
