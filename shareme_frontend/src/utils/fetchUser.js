export const fetchUser = () => {
    const userInfo =
        localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user"))
            : localStorage.clear();

    return userInfo;
}

export const checkTheme = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export const getTheme = () => {
    return localStorage.getItem('theme');
}
