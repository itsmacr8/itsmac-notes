const header = document.querySelector("#header");
header?.insertAdjacentHTML(
    'beforeend',
    `<nav role="navigation">
        <div class="navbar container">
            <div><a href="index.html" class="brand-title">MAC-notes</a></div>
            <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
            <div class="navbar-links">
                <ul class="nav">
                    <li class="nav__item">
                        <a class="nav__link" href="index.html#first-year">First Year</a>
                    </li>
                    <li class="nav__item">
                        <a class="nav__link" href="index.html#second-year">Second Year</a>
                    </li>
                    <li class="nav__item">
                        <a class="nav__link" href="index.html#third-year">Third Year</a>
                    </li>
                    <li class="nav__item">
                        <a class="nav__link" href="index.html#fourth-year">Fourth Year</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
);
