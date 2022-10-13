const accParEl = document.querySelector(
    '[data-accordion="accordions"]',
) as HTMLDivElement;
const accBodyEls = document.querySelectorAll(
    '[data-accordion-body]',
) as NodeListOf<HTMLDivElement>;

accParEl?.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    target.getAttribute('data-accordion-icon');
    if (target.hasAttribute('data-accordion-icon')) {
        const iconValue = target.dataset.accordionIcon;
        let initIconValue: number = 1;
        for (const accBodyEl of accBodyEls) {
            const iconEl = document.querySelector(
                `[data-accordion-icon='${initIconValue}']`,
            )!;
            const bodyValue = accBodyEl.dataset.accordionBody;
            const bodyEl = document.querySelector(
                `[data-accordion-body='${bodyValue}']`,
            );

            if (iconValue === bodyValue) {
                bodyEl?.classList.toggle('js-accordion__body--active');
                iconEl.classList.replace('fa-plus', 'fa-minus');
            } else {
                bodyEl?.classList.remove('js-accordion__body--active');
                iconEl.classList.replace('fa-minus', 'fa-plus');
            }
            initIconValue += 1;
        }
    }
});
