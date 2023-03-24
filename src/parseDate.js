const parseDate = (date, time, tzOffset) => {
  // date looks like 2/2/2023
  // time looks like 20:52:01
  // tzOffset looks like -04

  const dateParts = date.split("/");
  const timeParts = time.split(":");

  const dateString = `${dateParts[2]}-${dateParts[0].padStart(
    2,
    "0"
  )}-${dateParts[1].padStart(2, "0")}T${timeParts[0].padStart(
    2,
    "0"
  )}:${timeParts[1].padStart(2, "0")}:${timeParts[2].padStart(
    2,
    "0"
  )}${tzOffset}`;
  return new Date(dateString);
};

export default parseDate;