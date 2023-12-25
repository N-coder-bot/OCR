/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { origin } from "../utils/origin";
import Loader from "./Loader";
function ResultCard({ result, setOps, ops }) {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(result.identification_number);
  const [name, setName] = useState(result.name);
  const [lastName, setLastName] = useState(result.last_name);
  const [dob, setDob] = useState(result.date_of_birth);
  const [issue, setIssue] = useState(result.date_of_issue);
  const [expiry, setExpiry] = useState(result.date_of_expiry);
  const [status, setStatus] = useState(result.status);
  const [error, setError] = useState("");
  const [loadingRecord, setLoadingRecord] = useState(false);
  const [remove, setRemove] = useState(false);

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
    let value = e.target.value.split("-");
    setDob(value[2] + "/" + value[1] + "/" + value[0]);
  };
  const handleIssueChange = (e) => {
    let value = e.target.value.split("-");
    setIssue(value[2] + "/" + value[1] + "/" + value[0]);
  };
  const handleExpiryChange = (e) => {
    let value = e.target.value.split("-");
    setExpiry(value[2] + "/" + value[1] + "/" + value[0]);
  };
  const handleDelete = async () => {
    setLoadingRecord(true);
    await axios.delete(`${origin}/user/deleteRecord/${result._id}`);
    setRemove(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = status;
    // None of the values can be empty when editing the values, if they are that OCR is a failed operation.
    if (!inputValue || !name || !dob || !issue || !expiry || !lastName) {
      setStatus("failed");
      x = "failed";
    } else {
      setStatus("success");
      x = "success";
    }
    try {
      // Make axios put request.
      setLoadingRecord(true);
      await axios.put(`${origin}/user/editRecord`, {
        _id: result._id,
        identification_number: inputValue,
        name: name,
        last_name: lastName,
        date_of_birth: dob,
        date_of_issue: issue,
        date_of_expiry: expiry,
        status: x,
      });
      setLoadingRecord(false);
      // Since updation of the detail is another operation, we call create operation api here.
      let Opresponse = await axios.post(`${origin}/operation/createOp`, {
        id: result._id,
        status: x,
      });
      setOps([...ops, Opresponse.data.op]);
      setEdit(!edit);
      setError("");
    } catch (error) {
      console.error("Error editing record:", error.message);
      setError("Error editing record. Please try again.");
    }
  };
  return (
    <>
      {!remove ? (
        <div className=" relative bg-blue-300 p-5 m-5 rounded-md font-mono font-semibold h-64 drop-shadow-lg">
          <div
            className="absolute top-0  right-0 m-1  hover:cursor-pointer "
            onClick={handleDelete}
          >
            ❌
          </div>
          {loadingRecord ? (
            <Loader />
          ) : !edit ? (
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
            // Displaying Edit form, when edit button is clicked.
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
                    value={`${dob.slice(6)}-${dob.slice(3, 5)}-${dob.slice(
                      0,
                      2
                    )}`}
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
                    value={`${issue.slice(6)}-${issue.slice(
                      3,
                      5
                    )}-${issue.slice(0, 2)}`}
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
                    value={`${expiry.slice(6)}-${expiry.slice(
                      3,
                      5
                    )}-${expiry.slice(0, 2)}`}
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
            className="absolute bottom-2 right-5 bg-blue-100 rounded-sm w-16 px-1 text-slate-400 hover:text-white hover:bg-blue-600 duration-300"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ResultCard;
