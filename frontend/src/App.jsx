import { useState, useEffect } from "react";
import Result from "./components/Result";
import { getResponseFromApi } from "./utils/getResponseFromApi";
import { convertToBase64 } from "./utils/convertToBase64";
function App() {
  const [files, setFiles] = useState([]); // Storing image file.
  const [data, setData] = useState(null); // Storing "Base64 Encoded" string form of the image file.
  const [error, setError] = useState("");
  const [results, setResults] = useState([]); // Store json results.
  // Handling error message.
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

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
      setResults([...results, newRecord]);
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
    <div className="h-screen bg-slate-100">
      <div className="flex flex-col justify-around border-2 h-28">
        <div className="text-center text-3xl text-black font-medium pt-5">
          Optical Character Recognition
        </div>
        <div className="text-center text-slate-600 font-medium pb-1">
          The application scans an id and gives the JSON format data.
        </div>
      </div>
      <div className="p-10 w-200 flex justify-center font-mono bg-white drop-shadow-md h-2/4">
        {files.length != 0 ? (
          <img src={`${URL.createObjectURL(files[0])}`} alt="" />
        ) : (
          <></>
        )}
        <form
          className="flex flex-col h-full justify-around px-5"
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
      <Result results={results} />
    </div>
  );
}

export default App;
