import { LumpSum, Annuity, AnnuityDue } from './_finance_classes';

const TIME_VALUE_OF_MONEY_FORM = document.querySelector('[data-time="chapter-four-form"]') as HTMLFormElement;
const TIME_VALUE_OF_MONEY_SECTION = document.querySelector('[data-time="time-value-of-money"]') as HTMLElement;

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

    const ANSWER_CONTAINER = document.querySelector('[data-time="answer"]') as HTMLElement;
    const LUMP_SUM = new LumpSum(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    const ANNUITY = new Annuity(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    const ANNUITY_DUE = new AnnuityDue(TYPE, TOTAL_AMOUNT, YEAR, INTEREST, COMPOUND);
    findAnswerBasedOnProblemType(TYPE, LUMP_SUM, ANNUITY_DUE, ANNUITY, ANSWER_CONTAINER)
})

TIME_VALUE_OF_MONEY_SECTION?.addEventListener('click', (event) => {
    const TARGET = event.target as HTMLElement;
    const BUTTON_DATA = TARGET.dataset.time
    if (BUTTON_DATA) {
        const QUESTION_TYPE = BUTTON_DATA.replace('-btn', '')
        const BUTTON = document.querySelector(`[data-time='${QUESTION_TYPE}-btn']`) as HTMLButtonElement;
        changeButtonText(BUTTON);
        setClassArguments(QUESTION_TYPE);
    }
})

function instantiateClass(questionType: string, type: string, amount: string, year: number, interest: number, compound: number) {
    const ANSWER_CONTAINER = document.querySelector(`[data-time='${questionType}']`) as HTMLElement;
    ANSWER_CONTAINER.classList.toggle('d-none')
    const LUMP_SUM = new LumpSum(type, amount, year, interest, compound);
    const ANNUITY = new Annuity(type, amount, year, interest, compound);
    const ANNUITY_DUE = new AnnuityDue(type, amount, year, interest, compound);
    findAnswerBasedOnProblemType(type, LUMP_SUM, ANNUITY_DUE, ANNUITY, ANSWER_CONTAINER)
}

function findAnswerBasedOnProblemType(type: string, lumpSum: LumpSum, annuityDue: AnnuityDue, Annuity: Annuity, answer_container: HTMLElement) {
    if (type === 'PV' || type === 'FV') {
        lumpSum.findAnswer(answer_container);
    } else if (type.includes('Due')) {
        annuityDue.findAnswer(answer_container);
    } else {
        Annuity.findAnswer(answer_container);
    }
}

function changeButtonText(button: HTMLButtonElement) {
    if (button) {
        button.classList.toggle('mt-1');
        button.innerText = 'Show answer';
        if (button.classList.contains('mt-1')) {
            button.innerText = 'Hide Answer';
        }
    }
}

function setClassArguments(questionType: string) {
    if (questionType === 'pv-1') {
        instantiateClass(questionType, 'PV', '5,00,000', 5, 12, 1);
    } else if (questionType === 'pv-2') {
        instantiateClass(questionType, 'PV', '2,610', 5, 10, 4);
    } else if (questionType === 'pva-1') {
        instantiateClass(questionType, 'PVA', '12,000', 25, 9, 1);
    } else if (questionType === 'pva-2') {
        instantiateClass(questionType, 'PVA', '60,000', 10, 12, 12);
    } else if (questionType === 'pva-due-1') {
        instantiateClass(questionType, 'PVA-Due', '450,000', 20, 10, 1);
    } else if (questionType === 'pva-due-2') {
        instantiateClass(questionType, 'PVA-Due', '18,000', 20, 6, 12);
    } else if (questionType === 'fv-1') {
        instantiateClass(questionType, 'FV', '2,83,715', 5, 12, 1);
    } else if (questionType === 'fv-2') {
        instantiateClass(questionType, 'FV', '2,000', 3, 10, 4);
    } else if (questionType === 'fva-1') {
        instantiateClass(questionType, 'FVA', '5,000', 10, 10, 1);
    } else if (questionType === 'fva-2') {
        instantiateClass(questionType, 'FVA', '500', 10, 12, 12);
    } else if (questionType === 'fva-due-1') {
        instantiateClass(questionType, 'FVA-Due', '1,000', 5, 7, 1);
    } else if (questionType === 'fva-due-2') {
        instantiateClass(questionType, 'FVA-Due', '1,000', 5, 7, 12);
    }
}