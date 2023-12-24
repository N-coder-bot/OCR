/* eslint-disable react/prop-types */

import ResultCard from "./ResultCard";

// eslint-disable-next-line react/prop-types
function Result({ results }) {
  return (
    <div className="flex flex-col justify-center items-center m-7">
      <div className="text-2xl font-serif">RESULTS</div>
      {results.map((result, index) => (
        <ResultCard key={index} result={result} />
      ))}
    </div>
  );
}

export default Result;
