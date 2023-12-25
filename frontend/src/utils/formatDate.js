export const formatDate = (date) => {
  console.log(date);
  if (date == undefined) return date;
  let formatedDate = "";
  let x = false; // meaning double digit day.
  if (date[1] == " ") x = true; // meaning that single digit day.

  formatedDate += x ? date[0] : date.slice(0, 2); // days.
  let months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  if (x) {
    formatedDate =
      "0" +
      formatedDate +
      "/" +
      months[date.slice(2, 5)] +
      "/" +
      date.slice(date.length - 4);
  } else {
    formatedDate =
      formatedDate +
      "/" +
      months[date.slice(3, 6)] +
      "/" +
      date.slice(date.length - 4);
  }
  console.log(formatedDate);
  return formatedDate;
};
