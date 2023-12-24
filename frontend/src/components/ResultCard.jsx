/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
function ResultCard({ result }) {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(result.identification_number);
  const [name, setName] = useState(result.name);
  const [lastName, setLastName] = useState(result.last_name);
  const [dob, setDob] = useState(result.date_of_birth);
  const [issue, setIssue] = useState(result.date_of_issue);
  const [expiry, setExpiry] = useState(result.date_of_expiry);
  const [status, setStatus] = useState(result.status);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Remove non-digit characters
    value = value.replace(/\D/g, "");

    value = value.replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)/, "$1 $2 $3 $4 $5");

    // Limit to 17 characters (to allow for spaces)
    value = value.slice(0, 17);

    setInputValue(value);
  };
  const handleNameChange = (e) => {
    let value = e.target.value;
    setName(value);
  };
  const handleLastNameChange = (e) => {
    let value = e.target.value;
    setLastName(value);
  };
  const handleDobChange = (e) => {
    let value = e.target.value;
    setDob(value);
  };
  const handleIssueChange = (e) => {
    let value = e.target.value;
    setIssue(value);
  };
  const handleExpiryChange = (e) => {
    let value = e.target.value;
    setExpiry(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // None of the values can be empty when editing the values, if they are that OCR is a failed operation.
    if (!inputValue || !name || !dob || !issue || !expiry || !lastName) {
      setStatus("failed");
    } else {
      setStatus("success");
    }
    try {
      // Make axios put request.
      const response = await axios.put(
        "http://localhost:3000/user/editRecord",
        {
          _id: result._id,
          identification_number: inputValue,
          name: name,
          last_name: lastName,
          date_of_birth: dob,
          date_of_issue: issue,
          date_of_expiry: expiry,
          status: status,
        }
      );

      console.log("Record edited successfully:", response.data);
      // Reset error state
      setError("");
    } catch (error) {
      console.error("Error editing record:", error.message);
      setError("Error editing record. Please try again.");
    }
  };
  return (
    <div className=" relative bg-blue-300 p-5 m-5 rounded-md font-mono font-semibold h-64 drop-shadow-lg">
      {!edit ? (
        <ul className="flex flex-col justify-between h-full">
          <li>
            {`"Identification Number"`}:{`"${inputValue}"`},
          </li>
          <li>
            {`"name"`}:{`"${name}"`},
          </li>
          <li>
            {`"last_name"`}:{`"${lastName}"`},
          </li>
          <li>
            {`"date-of-birth"`}:{`"${dob}"`},
          </li>
          <li>
            {`"date-of-issue"`}:{`"${issue}"`},
          </li>
          <li>
            {`"date-of-expiry"`}:{`"${expiry}"`},
          </li>
          <li>
            {`"status"`}:
            {status == "success" ? (
              <span className="text-green-800">SUCCESSFUL</span>
            ) : (
              <span className="text-red-600">FAILED</span>
            )}
          </li>
        </ul>
      ) : (
        <div className="h-full">
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="identification_number" className=" mx-2">
                {`"Identification Number":`}
              </label>
              <input
                type="text"
                name="identification_number"
                placeholder={inputValue}
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
                placeholder={name}
                value={name}
                onChange={handleNameChange}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="lastname" className=" mx-2">
                {`"last_name":`}
              </label>
              <input
                type="text"
                name="lastname"
                placeholder={lastName}
                value={lastName}
                onChange={handleLastNameChange}
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
                placeholder={dob}
                className=" px-1 rounded-sm outline-none"
                onChange={handleDobChange}
              />
            </div>
            <div>
              <label htmlFor="issue" className=" mx-2">
                {`"date-of-issue":`}
              </label>
              <input
                type="date"
                name="issue"
                placeholder={issue}
                onChange={handleIssueChange}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="expiry" className=" mx-2">
                {`"date-of-expiry":`}
              </label>
              <input
                type="date"
                name="expiry"
                placeholder={expiry}
                onChange={handleExpiryChange}
                className=" px-1 rounded-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-100 rounded-sm w-12 text-slate-400 hover:text-white hover:bg-blue-600 duration-300"
            >
              Save
            </button>
          </form>
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
      <button
        className="absolute bottom-2 right-5 bg-blue-100 rounded-sm w-12 text-slate-400 hover:text-white hover:bg-blue-600 duration-300"
        onClick={() => setEdit(!edit)}
      >
        {edit ? "Cancel" : "Edit"}
      </button>
    </div>
  );
}

export default ResultCard;
