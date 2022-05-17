const footer = document.querySelector('#footer');
footer?.insertAdjacentHTML(
    "beforeend",
    `<div class="footer container">
        <p class="m-0">Developed by ITS MAC</p>
        <ul class="social">
            <li class="social__item">
                <a class="social__link" href="https://www.linkedin.com/in/itsmacr8">
                    <i class="fab fa-linkedin"></i>
                </a>
            </li>
            <li class="social__item">
                <a class="social__link" href="https://github.com/itsmacr8">
                    <i class="fab fa-github"></i>
                </a>
            </li>
            <li class="social__item">
                <a class="social__link" href="https://twitter.com/itsmacr8">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
        </ul>
    </div>`
);

footer?.insertAdjacentHTML(
    "beforebegin",
    `<div class="back-to-top"><a href="#header">Top</a></div>`
);