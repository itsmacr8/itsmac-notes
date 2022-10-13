const nav: HTMLElement = document.querySelector('nav') as HTMLElement;
const supportPageOffset: boolean = window.pageXOffset !== undefined;
const isCSS1Compat: boolean = (document.compatMode || '') === 'CSS1Compat';

let previousScrollPosition: number = 0;
let throttleTimer: boolean;

function getScrolledPosition(): number {
    const CSS1Compat = isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
    return supportPageOffset ? window.pageYOffset : CSS1Compat;
}

const isScrollingDown = (): boolean => {
    const scrolledPosition = getScrolledPosition();
    const isScrollDown: boolean = scrolledPosition > previousScrollPosition;

    // Temporarily solution to fix the issue with the sticky navbar when
    // clicking on the hamburger menu to show the navbar links on tablet and
    // mobile devices. 100 is a random number and it works fine.
    previousScrollPosition = scrolledPosition + 100;
    return isScrollDown;
};

const handleNavScroll = () => {
    if (isScrollingDown() && !nav?.contains(document.activeElement)) {
        nav?.classList.add('scroll-down');
        nav?.classList.remove('scroll-up');
    } else {
        nav?.classList.add('scroll-up');
        nav?.classList.remove('scroll-down');
    }
};

const throttle = (callback: Function, time: number) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('scroll', () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 750);
    }
});

// To fix the navigation covering content on scroll when user
// clicks on a link to scroll to a specific section.
const navigationHeight = nav.offsetHeight;
document.documentElement.style.setProperty('--scroll-padding', `${navigationHeight}px`);
