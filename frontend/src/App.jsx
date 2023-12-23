import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [files, setFiles] = useState([]); // Storing image file.
  const [data,setData ] = useState(null); // Storing "Base64 Encoded" string form of the image file.
  const [token,setToken] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  // OCR Api takes base64 URL format only, below function converts file to base64.
  const convertToBase64 = (file) => {
    const reader = new FileReader(); // FileReader for reading file content.
    reader.onload = function () {
      setData(reader.result.slice(23));
    };
    reader.readAsDataURL(file);
  };
  // Fetching token from the backend server.
  const getToken = async() => {
    const response = await axios.get("http://localhost:3000/user/getAccessToken");
    setToken(response.data.accessToken.token);
  }
  // Google Cloud Vision Api called, with the provided user id image.
  const getResponse = async (body) => {
    getToken();
    const response = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate",
      body,
      {
        headers: {
          Authorization:
          `Bearer ${token}`,
          "x-goog-user-project": `${import.meta.env.VITE_PRODUCT_ID}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    console.log(response);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data != null) {
      // console.log("DATA",data);
      const body = {// This is one of the required parameters to the POST method.
        "requests": [
          {
            "image": {
              "content": `${data}`,
            },
            "features": [
              {
                "type": "TEXT_DETECTION",
              },
            ],
          },
        ],
      };
      getResponse(body);
    }
  };

  const handleImageChange = (e) => {
    let imgSize = e.target.files[0].size;
    if (imgSize / 1048576 > 2) {
      setError("Image size should be less than 2 MB.");
      setFiles([]);
    } else {
      setFiles(e.target.files);
      convertToBase64(e.target.files[0]);
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
      <div className="flex justify-center">Results</div>
    </div>
  );
}

export default App;
