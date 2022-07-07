function getData() {
  const receivedData = localStorage.getItem('form');
  if (receivedData) {
    return JSON.parse(receivedData);
  }
  return JSON.parse(receivedData);
}

export default getData;