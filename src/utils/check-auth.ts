export const checkAuth = (statusCode: number, callback: () => void) => {
  console.log("statusCode", statusCode);
  if (statusCode === 401) {
    console.log("callback");
    callback();
  }
};
