export function dateFormatter(dateParam) {
  const dateString = dateParam;
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate
}