const nav: HTMLElement = document.querySelector('nav') as HTMLElement;
const supportPageOffset: boolean = window.pageXOffset !== undefined;
const isCSS1Compat: boolean = (document.compatMode || '') === 'CSS1Compat';

let previousScrollPosition: number = 0;
let throttleTimer: boolean;


const isScrollingDown = (): boolean => {
    const scrolledPosition = getScrolledPosition();
    const isScrollingDown: boolean = true ? scrolledPosition > previousScrollPosition : false;

    // Temporarily solution to fix the issue with the sticky navbar when clicking on the hamburger menu to show the navbar links on tablet and mobile devices. 100 is a random number and it works fine.
    previousScrollPosition = scrolledPosition + 100;
    return isScrollingDown;
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

function getScrolledPosition(): number {
    return supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
}

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('scroll', () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 750);
    }
});