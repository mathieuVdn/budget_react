export const formatDateEU = (dateUS) => {
  const [year, month, day] = dateUS.split("-");
  return `${day}/${month}/${year}`;
};

export const formatDateUS = (date) => {
  const [year, month, day] = date.split("/");
  return `${month}-${day}-${year}`;
};
