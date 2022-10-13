// import './components/_header.ts';
// import './components/_footer.ts';
import './components/_accordion.ts';
// import './components/_note_app.ts';
// import './components/_sticky_navigation.ts';
// import './components/_time_value_of_money.ts';

const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton?.addEventListener('click', () => {
    navbarLinks?.classList.toggle('js-navbar-links--active');
});
