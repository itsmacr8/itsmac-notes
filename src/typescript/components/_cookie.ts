const cookieName: string = 'MACNotesPass';
const cookieValue: string = 'whoami';
const expireDays: number = 1;
const body = document.querySelector('body')! as HTMLBodyElement;

function setOrUpdateCookie() {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expireDate = `expires=${date.toUTCString()}`;
    document.cookie = `${cookieName}=${cookieValue};${expireDate};`;
}

function getCookie() {
    const name = `${cookieName}=`;
    let cookieArray = document.cookie.split(';');
    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}

function checkCookie() {
    let user = getCookie();
    if (user !== cookieValue) {
        const userInput = prompt('Enter the password to access the website.\nHint: The most important question one can ask oneself.') || '';
        if (userInput === cookieValue) {
            setOrUpdateCookie();
        } else {
            body.classList.add('pass-protection');
            body.innerHTML = '<h1 class="text-center">Access Denied.</h1><p class="text-center mb-0">You cannot access this website without password. Contact the owner of the website for the password.</p>';
        }
    }
}

checkCookie();
