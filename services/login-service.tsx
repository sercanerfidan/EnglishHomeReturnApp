export const isUserPermittedLogin = (userName: string, password: string) => {
  let result = false;
  if (userName == "ehm" && password == "amaris") {
    result = true;
  }
  return result;
};
