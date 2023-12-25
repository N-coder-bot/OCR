/* eslint-disable react/prop-types */

import ResultCard from "./ResultCard";

// eslint-disable-next-line react/prop-types
function Result({ results, setOps, ops, setFilter, filter }) {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="flex flex-col items-center m-7 w-1/2">
      <div className="text-2xl font-serif flex">
        <div>RESULTS</div>
        <select
          name="filter"
          id="filter"
          className="mx-2 bg-blue-500 rounded-md text-white"
          defaultValue={filter}
          onChange={handleChange}
        >
          <option value="0">Time</option>
          <option value="1">success</option>
          <option value="2">failed</option>
          <option value="3">Latest</option>
        </select>
      </div>
      {results.map((result, index) => (
        <ResultCard key={index} result={result} setOps={setOps} ops={ops} />
      ))}
    </div>
  );
}

export default Result;
