const storedData = (book) => {
  localStorage.setItem('form', JSON.stringify(book));
};

export default storedData;