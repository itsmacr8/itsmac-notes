import './components/_header';
import './components/_footer';
import './components/_accordion';
import './components/_note_app';
import './components/_sticky_navigation';
import './components/_time_value_of_money';

const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton?.addEventListener('click', () => {
    navbarLinks?.classList.toggle('js-navbar-links--active');
});