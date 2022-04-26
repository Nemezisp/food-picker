export const createCookie = (name, value) => {
    const d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getCookie = (name) => {
    let cname = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
}

export const updateCookie = (name, value) => {
    let currentValue = getCookie(name)
    let newValue = currentValue + ',' + value
    createCookie(name, newValue)
}