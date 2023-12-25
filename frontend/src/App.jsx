import { useState, useEffect } from "react";
import Result from "./components/Result";
import { getResponseFromApi } from "./utils/getResponseFromApi";
import { convertToBase64 } from "./utils/convertToBase64";
import { origin } from "./utils/origin";

import axios from "axios";
import OperationList from "./components/OperationList";
function App() {
  const [files, setFiles] = useState([]); // Storing image file.
  const [data, setData] = useState(null); // Storing "Base64 Encoded" string form of the image file.
  const [error, setError] = useState("");
  const [results, setResults] = useState([]); // Store json results.
  const [ops, setOps] = useState([]); // Stored success/failed operations.

  // Handling error message.
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  // Effect for fetching all the records.
  useEffect(() => {
    const getRecords = async () => {
      let response = await axios.get(`${origin}/user/getAllRecords`);
      // console.log(response.data);
      setResults(response.data.records); // setting for storing records.
    };
    getRecords();
  }, []);

  // Effect for fetching all the operations.
  useEffect(() => {
    const getOps = async () => {
      let response = await axios.get(`${origin}/operation/getOps`);
      setOps(response.data.ops); // setting for storing operations.
    };
    getOps();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data != null) {
      // console.log("DATA",data);
      const body = {
        // This is one of the required parameters to the POST method.
        requests: [
          {
            image: {
              content: `${data}`,
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      };
      let newRecord = await getResponseFromApi(body); // Custom Api call to the google cloud vision api.
      let RecordResponse = await axios.post(
        `${origin}/user/createRecord`,
        newRecord
      ); // Create record in the database.
      setResults([...results, RecordResponse.data.user]);

      // This also is a new operation. So calling create operation api.
      let newOp = {
        status: RecordResponse.data.user.status,
        id: RecordResponse.data.user._id,
      };
      let OpResponse = await axios.post(`${origin}/operation/createOp`, newOp);
      setOps([...ops, OpResponse.data.op]);
    }
  };
  const handleImageChange = (e) => {
    let imgSize = e.target.files[0].size;
    if (imgSize / 1048576 > 2) {
      setError("Image size should be less than 2 MB.");
      setFiles([]);
    } else {
      setFiles(e.target.files);
      convertToBase64(e.target.files[0], setData);
    }
    // else setFiles(e.target.files);
  };
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col justify-around h-28">
        <div className="text-center text-3xl text-black font-medium pt-5">
          Optical Character Recognition
        </div>
        <div className="text-center text-slate-600 font-medium pb-1">
          The application scans an id and gives the JSON format data.
        </div>
      </div>
      <div className="p-10 flex justify-center font-mono bg-white drop-shadow-md">
        {files.length != 0 ? (
          <img
            src={`${URL.createObjectURL(files[0])}`}
            alt=""
            className=" w-64"
          />
        ) : (
          <></>
        )}
        <form
          className="flex flex-col justify-around px-5"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            className=""
            onChange={handleImageChange}
          />
          <button
            className=" bg-indigo-500 p-2 rounded duration-200 text-white w-6/12 font-semibold hover:bg-green-500"
            type="submit"
          >
            Get Information
          </button>
          {error != "" ? (
            <div className="bg-red-200 text-red-600 p-2 rounded-sm duration-1000 absolute">
              {error}
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div className="flex justify-center">
        <Result results={results} setOps={setOps} ops={ops} />
        <OperationList ops={ops} />
      </div>
    </div>
  );
}

export default App;
