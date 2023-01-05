export const isUserPermittedLogin= (userName: string, password : string) => {
    let result = false
    if(userName == "sercan" && password == "amaris") {
        result = true
    }
    return result;
}