/* eslint-disable react/prop-types */
import { useState } from "react";

function ResultCard({ result }) {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(result.identification_number);
  const [name, setName] = useState(result.name);
  const [dob, setDob] = useState("");

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Remove non-digit characters
    value = value.replace(/\D/g, "");

    value = value.replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)/, "$1 $2 $3 $4 $5");

    // Limit to 19 characters (to allow for spaces)
    value = value.slice(0, 19);

    setInputValue(value);
  };
  const handleNameChange = (e) => {
    let value = e.target.value;
    setName(value);
  };
  const handleDobChange = (e) => {
    let value = e.target.value;

    // Remove non-digit and non-letter characters
    value = value.replace(/[^a-zA-Z0-9]/g, "");

    // Apply the specific date format with spaces
    value = value.replace(/^(\d{2})([a-zA-Z]{3})(\d{4})$/, "$1 $2. $3");

    // Limit to 14 characters (to allow for spaces and the period)
    value = value.slice(0, 13);

    setDob(value);
  };
  return (
    <div className=" relative bg-blue-300 p-5 m-5 rounded-md font-mono font-semibold h-64 drop-shadow-lg">
      {!edit ? (
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
      ) : (
        <div className="h-full">
          <form action="" className="flex flex-col justify-between h-full">
            <div>
              <label htmlFor="identification_number" className=" mx-2">
                {`"Identification Number":`}
              </label>
              <input
                type="text"
                name="identification_number"
                placeholder={result.identification_number}
                value={inputValue}
                onChange={handleInputChange}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="name" className=" mx-2">
                {`"name":`}
              </label>
              <input
                type="text"
                name="name"
                placeholder={result.name}
                value={name}
                onChange={handleNameChange}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="birth" className=" mx-2">
                {`"date-of-birth":`}
              </label>
              <input
                type="date"
                name="birth"
                placeholder={result.date_of_birth}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="issue" className=" mx-2">
                {`"date-of-issue":`}
              </label>
              <input
                type="date"
                name="issue"
                placeholder={result.date_of_issue}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="exoiry" className=" mx-2">
                {`"date-of-exoiry":`}
              </label>
              <input
                type="date"
                name="expiry"
                placeholder={result.date_of_expiry}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
          </form>
        </div>
      )}
      <button
        className="absolute bottom-2 right-5 bg-blue-100 rounded-sm w-12 text-slate-400 hover:text-white hover:bg-blue-600 duration-300"
        onClick={() => {
          if (edit == true) setEdit(false);
          else setEdit(true);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default ResultCard;
