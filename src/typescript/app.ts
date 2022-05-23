import './components/_header';
import './components/_footer';
import './components/_accordion';

const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton?.addEventListener('click', () => {
    navbarLinks?.classList.toggle('js-navbar-links--active');
});