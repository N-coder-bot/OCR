// OCR Api takes base64 URL format only, below function converts file to base64.
export const convertToBase64 = (file, setData) => {
  const reader = new FileReader(); // FileReader for reading file content.
  reader.onload = function () {
    // console.log(reader.result);
    setData(reader.result.replace(/data:image\/(jpeg|png|jpg);base64,/, "")); // Regex to parse data correctly.
  };
  reader.readAsDataURL(file);
};
