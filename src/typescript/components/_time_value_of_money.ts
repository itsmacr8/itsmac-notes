import { LumpSum, Annuity, AnnuityDue } from './_finance_classes';

const TIME_VALUE_OF_MONEY_FORM = document.querySelector('[data-time="chapter-four-form"]') as HTMLFormElement;
const ANSWER_CONTAINER = document.querySelector('[data-time="answer"]') as HTMLElement;

const DOM = {
    type: document.querySelector('[data-time="type"]') as HTMLOptionElement,
    totalAmount: document.querySelector('[data-time="total-amount"]') as HTMLInputElement,
    interest: document.querySelector('[data-time="interest"]') as HTMLInputElement,
    year: document.querySelector('[data-time="year"]') as HTMLInputElement,
    compound: document.querySelector('[data-time="compound-frequency"]') as HTMLInputElement,
    annuity: document.querySelector('[data-time="annuity"]') as HTMLInputElement,

    getType() {
        return DOM.type.value
    }
}

DOM.type?.addEventListener('change', () => {
    const TYPE = DOM.getType()
    const TOTAL_AMOUNT_INPUT = document.querySelector('[data-time="input-total-amount"]') as HTMLDivElement;
    const ANNUITY_AMOUNT = document.querySelector('[data-time="input-annuity-amount"]') as HTMLDivElement;
    hideTotalOrAnnuityAmountInput();

    function hideTotalOrAnnuityAmountInput() {
        if (TYPE === 'A' || TYPE === 'PV' || TYPE === 'FV') {
            TOTAL_AMOUNT_INPUT.classList.remove('d-none');
            ANNUITY_AMOUNT.classList.add('d-none');
        } else {
            TOTAL_AMOUNT_INPUT.classList.add('d-none');
            ANNUITY_AMOUNT.classList.remove('d-none');
        }
    }
});

TIME_VALUE_OF_MONEY_FORM?.addEventListener('submit', (event) => {
    event.preventDefault();
    const TYPE: string = DOM.getType();
    const TOTAL_AMOUNT: number = Number(DOM.totalAmount.value);
    const INTEREST: number = Number(DOM.interest.value);
    const YEAR: number = Number(DOM.year.value);
    const COMPOUND: number = Number(DOM.compound.value)
    const ANNUITY_VAL: number = Number(DOM.annuity.value);

    const LUMP_SUM = new LumpSum(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    const ANNUITY = new Annuity(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND, ANNUITY_VAL);
    const ANNUITY_DUE = new AnnuityDue(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND, ANNUITY_VAL);

    if (TYPE === 'PV' || TYPE === 'FV') {
        LUMP_SUM.findAnswer(ANSWER_CONTAINER);
    } else if (TYPE.includes('Due')) {
        ANNUITY_DUE.findAnswer(ANSWER_CONTAINER);
    } else {
        ANNUITY.findAnswer(ANSWER_CONTAINER);
    }
})
