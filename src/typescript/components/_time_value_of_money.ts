import { LumpSum, Annuity, AnnuityDue } from './_finance_classes';

const TIME_VALUE_OF_MONEY_FORM = document.querySelector('[data-time="chapter-four-form"]') as HTMLFormElement;
const ANSWER_CONTAINER = document.querySelector('[data-time="answer"]') as HTMLElement;

const DOM = {
    type: document.querySelector('[data-time="type"]') as HTMLOptionElement,
    totalAmount: document.querySelector('[data-time="total-amount"]') as HTMLInputElement,
    interest: document.querySelector('[data-time="interest"]') as HTMLInputElement,
    year: document.querySelector('[data-time="year"]') as HTMLInputElement,
    compound: document.querySelector('[data-time="compound-frequency"]') as HTMLInputElement,

    getType() {
        return DOM.type.value
    }
}

DOM.type?.addEventListener('change', () => {
    const TYPE = DOM.getType()
    const AMOUNT_LABEL = document.querySelector('[data-time="input-total-amount"]') as HTMLLabelElement;
    changeLabelText();

    function changeLabelText() {
        if (TYPE === 'PV' || TYPE === 'FV') {
            AMOUNT_LABEL.innerText = 'Enter present value or future value';
        } else {
            AMOUNT_LABEL.innerText = 'Enter annuity amount';
        }
    }
});

TIME_VALUE_OF_MONEY_FORM?.addEventListener('submit', (event) => {
    event.preventDefault();
    const TYPE: string = DOM.getType();
    const TOTAL_AMOUNT: string = DOM.totalAmount.value;
    const INTEREST: number = Number(DOM.interest.value);
    const YEAR: number = Number(DOM.year.value);
    const COMPOUND: number = Number(DOM.compound.value)

    const LUMP_SUM = new LumpSum(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    const ANNUITY = new Annuity(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    const ANNUITY_DUE = new AnnuityDue(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);

    if (TYPE === 'PV' || TYPE === 'FV') {
        LUMP_SUM.findAnswer(ANSWER_CONTAINER);
    } else if (TYPE.includes('Due')) {
        ANNUITY_DUE.findAnswer(ANSWER_CONTAINER);
    } else {
        ANNUITY.findAnswer(ANSWER_CONTAINER);
    }
})
