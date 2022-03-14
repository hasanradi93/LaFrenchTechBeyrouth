import Cookies from 'js-cookie'
export const setCookie = (name, value, minutes) => {
    let inFifteenMinutes = new Date(new Date().getTime() + minutes * 60 * 1000)
    Cookies.set(name, value, { expires: inFifteenMinutes, path: '/', secure: true })
}
export const getCookie = (name) => {
    console.log("name", name)
    return Cookies.get(name)
}
export const removeCookie = (name) => {
    return Cookies.remove(name)
}