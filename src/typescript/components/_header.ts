const header = document.querySelector("#navigation");
header?.insertAdjacentHTML(
    'beforeend',
    `<div class="navbar container">
        <div><a href="index.html" class="brand-title">MAC-notes</a></div>
        <div class="toggle-button">
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <div class="navbar-links">
            <ul class="nav">
                <li class="nav__item">
                    <a class="nav__link" href="#section-b">Section B</a>
                </li>
                <li class="nav__item">
                    <a class="nav__link" href="#section-c">Section C</a>
                </li>
            </ul>
        </div>
    </div>`
);
