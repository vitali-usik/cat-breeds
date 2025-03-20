const generateRandomApiError = () => {
  const BREED_REQUEST_COUNT_KEY = "breed-request-count";
  let breedRequestsCount = Number(localStorage.getItem(BREED_REQUEST_COUNT_KEY));

  if (!breedRequestsCount) {
    breedRequestsCount = 1;
  } else {
    breedRequestsCount += 1;
  }

  localStorage.setItem(BREED_REQUEST_COUNT_KEY, `${breedRequestsCount}`);

  if (breedRequestsCount % 5 === 0) {
    throw new Error("Internal Server Error");
  }
}

export default generateRandomApiError;
