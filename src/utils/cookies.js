const getCookie = () => {
    if (!document.cookie.length) {
        return {};
    }

    return document.cookie.split('; ').reduce((res, curr) => {
        const [name, value] = curr.split('=');

        return { ...res, [name]: value };
    }, {});
}

const setCookie = (name, value, { expires }) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + expires);
    document.cookie = `${name}=${value};expires=${d.toGMTString()}`;
}

const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=;expires=${new Date(0)}`;
}

export {
    getCookie,
    deleteCookie,
    setCookie
}