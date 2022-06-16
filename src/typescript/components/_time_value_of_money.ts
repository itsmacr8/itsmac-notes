import { LumpSum } from './_finance_classes';

const timeValueOfMoneyForm = document.querySelector('[data-time="chapter-four-form"]') as HTMLFormElement;
const answerContainer = document.querySelector('[data-time="answer"]') as HTMLElement;

const dom = {
    type: document.querySelector('[data-time="type"]') as HTMLOptionElement,
    totalAmount: document.querySelector('[data-time="total-amount"]') as HTMLInputElement,
    interest: document.querySelector('[data-time="interest"]') as HTMLInputElement,
    year: document.querySelector('[data-time="year"]') as HTMLInputElement,
    compound: document.querySelector('[data-time="compound-frequency"]') as HTMLInputElement,
    annuity: document.querySelector('[data-time="annuity"]') as HTMLInputElement,

    getType() {
        return dom.type.value
    }
}

dom.type?.addEventListener('change', () => {
    const type = dom.getType()
    const totalAmountInput = document.querySelector('[data-time="input-total-amount"]') as HTMLDivElement;
    const annuityAmount = document.querySelector('[data-time="input-annuity-amount"]') as HTMLDivElement;
    hideTotalOrAnnuityAmountInput();

    function hideTotalOrAnnuityAmountInput() {
        if (type === 'A' || type === 'PV' || type === 'FV') {
            totalAmountInput.classList.remove('d-none');
            annuityAmount.classList.add('d-none');
        } else {
            totalAmountInput.classList.add('d-none');
            annuityAmount.classList.remove('d-none');
        }
    }
});

timeValueOfMoneyForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const type: string = dom.getType();
    const totalAmount: number = Number(dom.totalAmount.value);
    const interest: number = Number(dom.interest.value);
    const year: number = Number(dom.year.value);
    const compound: number = Number(dom.compound.value)
    const annuity: number = Number(dom.annuity.value);

    const lumpSum = new LumpSum(type, totalAmount, year, interest, compound);

    if (type === 'PV' || type === 'FV') {
        lumpSum.findAnswer(answerContainer);
    } else if (type === 'A') {

    } else if (type.includes('Due')) {

    } else {

    }
})

