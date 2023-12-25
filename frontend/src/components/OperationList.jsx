/* eslint-disable react/prop-types */
import React from "react";

function OperationList({ ops }) {
  console.log(ops);
  return (
    <div className="flex flex-col m-7">
      <div className="text-2xl font-serif">LIST OF OPERATIONS</div>
      {ops.map((op) => {
        return (
          <ul
            key={op.id}
            className={`flex flex-row w-58 justify-between font-mono font-semibold  p-2 border-t border-black mt-5 gap-10`}
          >
            <li>{`${op.id}`}</li>
            <li
              className={`px-2 py-1 text-white ${
                op.status == "success" ? "bg-green-600" : "bg-red-600"
              } font-mono font-semibold rounded-sm`}
            >{`${op.status}`}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default OperationList;
