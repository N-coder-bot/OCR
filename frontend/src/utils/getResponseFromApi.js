import axios from "axios";
import { getAccessToken } from "./getAccessToken";

export const getResponseFromApi = async (body) => {
  let token = await getAccessToken(); // Fetching token from the backend server.
  const response = await axios.post(
    "https://vision.googleapis.com/v1/images:annotate",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-goog-user-project": `${import.meta.env.VITE_PRODUCT_ID}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  let text = response.data.responses[0].fullTextAnnotation.text;
  // console.log(text);
  // Below regexes are important for Parsing the data, from the text recieved.

  // 1. Identification Number.
  const identificationNumberRegex = /(\d{1,2}\s\d{4}\s\d{5}\s\d{2}\s\d)/;

  // 2. Name regexes.
  const nameRegex = /Name\s(.+?)\n/;
  const lastnameRegex = /Last\sname\s(.+?)\n/;

  // 3. Date of Birth
  const dateOfBirthRegex = /Date of Birth (\d{1,2}\s[A-Za-z]+\.\s\d{4})/i;

  // 4. Date of Issue
  const dateOfIssueRegex = /(\d{1,2}\s[A-Za-z]+\.\s\d{4})\nDate of Issue/i;

  // 5. Date of Expiry.
  const dateOfExpiryRegex = /(\d{1,2}\s[A-Za-z]+\.\s\d{4})\nDate of Expiry/i;

  // Setting details.
  let identification_number = text.match(identificationNumberRegex)?.[1];
  let name = text.match(nameRegex)?.slice(1)[0] || undefined;
  let last_name = text.match(lastnameRegex)?.slice(1)[0] || undefined;
  let date_of_birth = text.match(dateOfBirthRegex)?.[1];
  let date_of_issue = text.match(dateOfIssueRegex)?.[1];
  let date_of_expiry = text.match(dateOfExpiryRegex)?.[1];

  let newDetail = {
    identification_number,
    name,
    last_name,
    date_of_birth,
    date_of_issue,
    date_of_expiry,
  };
  // checking whether the query was success or not.
  if (
    identification_number == undefined ||
    name == undefined ||
    last_name == undefined ||
    date_of_birth == undefined ||
    date_of_expiry == undefined ||
    date_of_issue == undefined
  ) {
    newDetail.status = "failed";
  } else newDetail.status = "success";
  return newDetail;
};
