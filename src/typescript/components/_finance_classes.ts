class LumpSum {
    type: string
    value: number
    year: number
    interest: number
    compound: number

    constructor(type: string, value: number, year: number, interest: number, compound: number) {
        this.type = type;
        this.value = value;
        this.year = year;
        this.interest = interest / 100;
        this.compound = compound;
    }

    findAnswer(renderArea: HTMLElement): void {
        const TOTAL_INTEREST_UI: string = `${this.getInterestFormula()}${this.getYearFormula()}`;
        const FORMULA = `${this.baseTemplate(`${this.getTypeUI()} ${TOTAL_INTEREST_UI}`)}`
        const SET_VALUE = `${this.baseTemplate(`${this.value} ${this.set_value()}`)}`
        const [CALCULATION, ANSWER]: string[] = this.calculate();
        this.renderTemplate(`${FORMULA}${SET_VALUE}`, CALCULATION, ANSWER, renderArea)
    }

    private getTypeUI() {
        let type: string = 'PV';
        if (this.isPresent()) {
            type = 'FV';
        }
        return type
    }

    protected getInterestFormula() {
        let interest = '(1+i)'
        if (this.IS_COMPOUND()) {
            interest = '(1+i/m)'
        }
        return interest
    }

    protected getYearFormula() {
        let YEAR_UI: string = 'n';
        if (this.isPresent()) {
            YEAR_UI = '-n';
        }
        if (this.IS_COMPOUND()) {
            YEAR_UI = `${YEAR_UI}m`
        }
        return `<sup>${YEAR_UI}</sup>`
    }

    private set_value() {
        return `${this.getInterestValue()}${this.getYearValue()}`
    }

    protected getInterestValue() {
        if (this.IS_COMPOUND()) {
            return `(1+${this.interest}/${this.compound})`
        }
        return `(1+${this.interest})`
    }

    protected getYearValue() {
        let yearValue: string = `${this.year}`;
        if (this.isPresent()) {
            yearValue = `-${yearValue}`;
        }
        if (this.IS_COMPOUND()) {
            yearValue = `${this.year}×${this.compound}`
            if (this.isPresent()) {
                yearValue = `-(${yearValue})`
            }
        }
        return `<sup>${yearValue}</sup>`
    }

    private calculate() {
        const TOTAL_INTEREST: number = this.calcInterestWithPower()
        const ANSWER = Math.round(this.value * TOTAL_INTEREST);
        return [`${this.value} × ${TOTAL_INTEREST}`, String(ANSWER)]
    }

    protected calcInterest(): number {
        let interest: number = (1 + this.interest);
        if (this.IS_COMPOUND()) {
            interest = (1 + (this.interest / this.compound));
        }
        return Number(interest.toFixed(5))
    }

    protected calcInterestWithPower(): number {
        let year: number = this.year;
        let calcPower: number = this.calcInterest() ** year
        if (this.isPresent()) {
            calcPower = this.calcInterest() ** -year
        }
        if (this.IS_COMPOUND()) {
            year = year * this.compound;
            calcPower = this.calcInterest() ** (year);
            if (this.isPresent()) {
                calcPower = this.calcInterest() ** -(year);
            }
        }
        return Number(calcPower.toFixed(5))
    }

    protected isPresent(): boolean {
        return this.type.includes('PV') ? true : false;
    }

    protected IS_COMPOUND(): boolean {
        return this.compound > 1 ? true : false;
    }

    protected baseTemplate(value: string): string {
        return `<div>${this.type} = ${value}</div>`
    }

    protected renderTemplate(applyFormula: string, CALCULATION: string, ANSWER: string, renderArea: HTMLElement) {
        renderArea.innerHTML =
            `<h2>Answer is:</h2>
            <div class="pl-4">
                ${applyFormula}
                ${this.baseTemplate(CALCULATION)}
                ${this.baseTemplate(ANSWER)}
            </div>`
    }
}

class Annuity extends LumpSum {

    annuity: number
    constructor(type: string, value: number, year: number, interest: number, compound: number, annuity: number) {
        super(type, value, year, interest, compound);
        this.annuity = annuity
    }

    findAnswer(renderArea: HTMLElement): void {

        const [ANNUITY_DIVIDE_UI, INTEREST_RULE_UI] = this.formula()
        const FORMULA = this.annuityTemplate('a', ANNUITY_DIVIDE_UI, INTEREST_RULE_UI)

        const SET_VALUE = this.annuityTemplate(String(this.annuity), this.getAnnuityDivideValue(), this.getInterestRuleUI(this.getInterestValue(), this.getYearValue()))

        const [CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE] = this.calcAnnuityAndInterest()
        const { LINE_THREE_UI_VALUES, LINE_FOUR_UI_VALUE, IS_COMPOUND }: { LINE_THREE_UI_VALUES: string[]; LINE_FOUR_UI_VALUE: string; IS_COMPOUND: boolean; } = this.calcAnnuityAndInterestUI(CALCULATED_ANNUITY_VALUE);
        const LINE_THREE: string = this.getLineThree(LINE_THREE_UI_VALUES, IS_COMPOUND);
        const LINE_FOUR = `${LINE_FOUR_UI_VALUE} × ${CALCULATED_INTEREST_VALUE}`

        const ANSWER: number = Math.round(CALCULATED_ANNUITY_VALUE * CALCULATED_INTEREST_VALUE);
        this.renderTemplate(`${FORMULA}${SET_VALUE}${LINE_THREE}`, `${LINE_FOUR}`, String(ANSWER), renderArea)
    }

    protected formula() {
        const INTEREST_UI: string = this.getInterestFormula();
        const YEAR_UI: string = this.getYearFormula();
        const INTEREST_RULE_UI = this.getInterestRuleUI(INTEREST_UI, YEAR_UI);
        const ANNUITY_DIVIDE_UI: string = this.getAnnuityDivideUI();
        return [ANNUITY_DIVIDE_UI, INTEREST_RULE_UI]
    }

    protected calcAnnuityAndInterestUI(CALCULATED_ANNUITY_VALUE: number) {
        const TOTAL_INTEREST: number = this.calcInterestWithPower();
        let calculatedInterestValueUI: string = `${TOTAL_INTEREST} - 1`;
        if (this.isPresent()) {
            calculatedInterestValueUI = `1 - ${TOTAL_INTEREST}`;
        }

        const LINE_FOUR_UI_VALUE: string = String(CALCULATED_ANNUITY_VALUE)

        let IS_COMPOUND: boolean = false;
        let LINE_THREE_UI_VALUES: string[] = [LINE_FOUR_UI_VALUE, calculatedInterestValueUI]
        if (this.IS_COMPOUND()) {
            IS_COMPOUND = true
            const annuity = String(this.annuity)
            const interestDivCompound = String(this.getDivideInterestWithCompound())
            LINE_THREE_UI_VALUES = [annuity, interestDivCompound, `<div> × (1 - ${TOTAL_INTEREST})`]
        }
        return { LINE_THREE_UI_VALUES, LINE_FOUR_UI_VALUE, IS_COMPOUND };
    }

    protected calcAnnuityAndInterest() {
        let CALCULATED_ANNUITY_VALUE: number = this.getAnnuity();
        if (this.IS_COMPOUND()) {
            CALCULATED_ANNUITY_VALUE = Math.round(this.annuity / this.getDivideInterestWithCompound())
        }

        let TOTAL_INTEREST: number = this.calcInterestWithPower();
        let CALCULATED_INTEREST_VALUE: number = Number((TOTAL_INTEREST - 1).toFixed(5));
        if (this.isPresent()) {
            CALCULATED_INTEREST_VALUE = Number((1 - TOTAL_INTEREST).toFixed(5));
        }
        return [CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE];
    }

    private getAnnuityDivideUI(): string {
        let annuityDivideUI: string = 'i'
        if (this.IS_COMPOUND()) {
            annuityDivideUI = 'i/m'
        }
        return annuityDivideUI
    }

    protected getAnnuityDivideValue(): string {
        let annuityDivideUI: string = `${this.interest}`
        if (this.IS_COMPOUND()) {
            annuityDivideUI = `${annuityDivideUI}/${this.compound}`
        }
        return annuityDivideUI
    }

    protected getInterestRuleUI(interestUI: string, yearUI: string): string {
        let interestRuleUI: string = `<div> × [${interestUI}${yearUI} - 1]`;
        if (this.isPresent()) {
            interestRuleUI = `<div> × [1 - ${interestUI}${yearUI}]`;
        }
        return interestRuleUI
    }

    private getAnnuity(): number {
        return Math.round(this.annuity / this.interest)
    }

    protected getDivideInterestWithCompound(): number {
        return Number((this.interest / this.compound).toFixed(5))
    }

    protected getLineThree(lineThreeUIValues: string[], isCompound: boolean, due?: boolean) {
        let lineThree: string = this.baseTemplate(`${lineThreeUIValues[0]} (${lineThreeUIValues[1]})`);
        if (due) {
            lineThree = this.baseTemplate(`${lineThreeUIValues[0]} (${lineThreeUIValues[1]}) × ${this.calcInterest()}`);
        }
        if (isCompound) {
            const annuity: string = lineThreeUIValues[0];
            const ANNUITY_DIVIDE_UI: string = lineThreeUIValues[1];
            let INTEREST_RULE_UI: string = `${lineThreeUIValues[2]}`;
            if (due) {
                INTEREST_RULE_UI = `${lineThreeUIValues[2]} × ${this.calcInterest()}`
            }
            lineThree = this.annuityTemplate(annuity, ANNUITY_DIVIDE_UI, INTEREST_RULE_UI);
        }
        return lineThree;
    }

    protected annuityTemplate(annuity: string, annuityDivUI: string, interestRuleUI: string) {
        return `<div class="d-flex ai-center gap">
                    <div>${this.type} =</div>
                    <div class="d-flex gap text-center">
                        <div class="flex-column">
                            <span>${annuity}</span>
                            <span class="bt-1">${annuityDivUI}</span>
                        </div>
                        ${interestRuleUI}</div>
                    </div>
                </div>`
    }
}

class AnnuityDue extends Annuity {

    constructor(type: string, value: number, year: number, interest: number, compound: number, annuity: number) {
        super(type, value, year, interest, compound, annuity);
    }

    findAnswer(renderArea: HTMLElement): void {

        let [ANNUITY_DIVIDE_UI, interestRuleUI] = this.formula()
        interestRuleUI = `${interestRuleUI} × ${this.getInterestFormula()}`
        const FORMULA = this.annuityTemplate('a', ANNUITY_DIVIDE_UI, interestRuleUI)

        const VALUE = `${this.getInterestRuleUI(this.getInterestValue(), this.getYearValue())} × ${this.getInterestValue()}`
        const SET_VALUE = this.annuityTemplate(String(this.annuity), this.getAnnuityDivideValue(), VALUE)

        const [CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE] = this.calcAnnuityAndInterest()
        const { LINE_THREE_UI_VALUES, LINE_FOUR_UI_VALUE, IS_COMPOUND }: { LINE_THREE_UI_VALUES: string[]; LINE_FOUR_UI_VALUE: string; IS_COMPOUND: boolean; } = this.calcAnnuityAndInterestUI(CALCULATED_ANNUITY_VALUE);
        const LINE_THREE: string = this.getLineThree(LINE_THREE_UI_VALUES, IS_COMPOUND, true);

        const CALC_INTEREST = this.calcInterest()
        const LINE_FOUR = `${LINE_FOUR_UI_VALUE} × ${CALCULATED_INTEREST_VALUE} × ${CALC_INTEREST}`

        const ANSWER = Math.round(CALCULATED_ANNUITY_VALUE * CALCULATED_INTEREST_VALUE * CALC_INTEREST)
        this.renderTemplate(`${FORMULA}${SET_VALUE}${LINE_THREE}`, `${LINE_FOUR}`, String(ANSWER), renderArea)
    }
}

export { LumpSum, Annuity, AnnuityDue }