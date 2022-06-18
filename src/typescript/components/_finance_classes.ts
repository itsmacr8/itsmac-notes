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
        const SET_VALUE = `${this.baseTemplate(`${this.value} ${this.setValue()}`)}`
        const TOTAL_INTEREST: number = this.calcInterestWithPower()
        const ANSWER_UI = this.calculateAnswerUI(this.value, TOTAL_INTEREST);
        const ANSWER = Math.round(this.value * TOTAL_INTEREST)
        this.renderTemplate(`${FORMULA}${SET_VALUE}`, ANSWER_UI, String(ANSWER), renderArea)
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
        if (this.isCompound()) {
            interest = '(1+i/m)'
        }
        return interest
    }

    protected getYearFormula() {
        let yearUI: string = 'n';
        if (this.isPresent()) {
            yearUI = '-n';
        }
        if (this.isCompound()) {
            yearUI = `${yearUI}m`
        }
        return `<sup>${yearUI}</sup>`
    }

    private setValue(): string {
        return `${this.getInterestValue()}${this.getYearValue()}`
    }

    protected getInterestValue() {
        if (this.isCompound()) {
            return `(1+${this.interest}/${this.compound})`
        }
        return `(1+${this.interest})`
    }

    protected getYearValue() {
        let yearValue: string = `${this.year}`;
        if (this.isPresent()) {
            yearValue = `-${yearValue}`;
        }
        if (this.isCompound()) {
            yearValue = `${this.year}×${this.compound}`
            if (this.isPresent()) {
                yearValue = `-(${yearValue})`
            }
        }
        return `<sup>${yearValue}</sup>`
    }

    protected calculateAnswerUI(totalAmount: number, interest: number): string {
        return `${totalAmount} × ${interest}`
    }

    protected calcInterest(): number {
        let interest: number = (1 + this.interest);
        if (this.isCompound()) {
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
        if (this.isCompound()) {
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

    protected isCompound(): boolean {
        return this.compound > 1 ? true : false;
    }

    protected baseTemplate(value: string): string {
        return `<div>${this.type} = ${value}</div>`
    }

    protected renderTemplate(applyFormula: string, calculation: string, answer: string, renderArea: HTMLElement) {
        renderArea.innerHTML =
            `<h2>Answer is:</h2>
            <p class="mb-0">We know,</p>
            <div class="pl-4">
                ${applyFormula}
                ${this.baseTemplate(calculation)}
                ${this.baseTemplate(answer)}
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

        const SET_VALUE = this.setAnnuityValue(this.setInterestRuleUI())
        const LINE_THREE: string = this.getLineThree();
        const LINE_FOUR = this.getLineFour()
        const ANSWER: number = this.calculateAnswer();

        this.renderTemplate(`${FORMULA}${SET_VALUE}${LINE_THREE}`, `${LINE_FOUR}`, String(ANSWER), renderArea)
    }

    protected formula() {
        const INTEREST_UI: string = this.getInterestFormula();
        const YEAR_UI: string = this.getYearFormula();
        const INTEREST_RULE_UI = this.getInterestRuleUI(INTEREST_UI, YEAR_UI);
        const ANNUITY_DIVIDE_UI: string = this.getAnnuityDivideUI();
        return [ANNUITY_DIVIDE_UI, INTEREST_RULE_UI]
    }

    private calcAnnuityAndInterestUI(CALCULATED_ANNUITY_VALUE: number) {
        const TOTAL_INTEREST: number = this.calcInterestWithPower();
        let calculatedInterestValueUI: string = `${TOTAL_INTEREST} - 1`;
        if (this.isPresent()) {
            calculatedInterestValueUI = `1 - ${TOTAL_INTEREST}`;
        }

        let isCompound: boolean = false;
        let lineThreeUIValues: string[] = [String(CALCULATED_ANNUITY_VALUE), calculatedInterestValueUI]
        if (this.isCompound()) {
            isCompound = true
            const annuity = String(this.annuity)
            const interestDivCompound = String(this.getDivideInterestWithCompound())
            lineThreeUIValues = [annuity, interestDivCompound, `<div> × (1 - ${TOTAL_INTEREST})`]
        }
        return { lineThreeUIValues, isCompound };
    }

    private calcAnnuityAndInterest() {
        let calculatedAnnuityValue: number = this.getAnnuity();
        if (this.isCompound()) {
            calculatedAnnuityValue = Math.round(this.annuity / this.getDivideInterestWithCompound())
        }

        const TOTAL_INTEREST: number = this.calcInterestWithPower();
        let calculatedInterestValue: number = Number((TOTAL_INTEREST - 1).toFixed(5));
        if (this.isPresent()) {
            calculatedInterestValue = Number((1 - TOTAL_INTEREST).toFixed(5));
        }
        return [calculatedAnnuityValue, calculatedInterestValue];
    }

    private getAnnuityDivideUI(): string {
        let annuityDivideUI: string = 'i'
        if (this.isCompound()) {
            annuityDivideUI = 'i/m'
        }
        return annuityDivideUI
    }

    private getAnnuityDivideValue(): string {
        let annuityDivideValue: string = `${this.interest}`
        if (this.isCompound()) {
            annuityDivideValue = `${annuityDivideValue}/${this.compound}`
        }
        return annuityDivideValue
    }

    private getInterestRuleUI(interestUI: string, yearUI: string): string {
        let interestRuleUI: string = `<div> × [${interestUI}${yearUI} - 1]`;
        if (this.isPresent()) {
            interestRuleUI = `<div> × [1 - ${interestUI}${yearUI}]`;
        }
        return interestRuleUI
    }

    private getAnnuity(): number {
        return Math.round(this.annuity / this.interest)
    }

    private getDivideInterestWithCompound(): number {
        return Number((this.interest / this.compound).toFixed(5))
    }

    protected setInterestRuleUI() {
        return this.getInterestRuleUI(this.getInterestValue(), this.getYearValue());
    }

    protected setAnnuityValue(interestRuleUI: string): string {
        return this.annuityTemplate(String(this.annuity), this.getAnnuityDivideValue(), interestRuleUI)
    }

    protected getLineThree(due?: boolean) {
        const [CALCULATED_ANNUITY_VALUE, _] = this.calcAnnuityAndInterest()
        const { lineThreeUIValues, isCompound }: { lineThreeUIValues: string[]; isCompound: boolean; } = this.calcAnnuityAndInterestUI(CALCULATED_ANNUITY_VALUE);

        const [ANNUITY, ANNUITY_DIVIDE_UI] = lineThreeUIValues;
        const DUE_INTEREST = this.calcInterest()

        let lineThree: string = this.baseTemplate(`${ANNUITY} (${ANNUITY_DIVIDE_UI})`);
        if (due) {
            lineThree = this.baseTemplate(`${ANNUITY} (${ANNUITY_DIVIDE_UI}) × ${DUE_INTEREST}`);
        }
        if (isCompound) {
            let interestRuleUI: string = `${lineThreeUIValues[2]}`;
            if (due) {
                interestRuleUI = `${interestRuleUI} × ${DUE_INTEREST}`
            }
            lineThree = this.annuityTemplate(ANNUITY, ANNUITY_DIVIDE_UI, interestRuleUI);
        }
        return lineThree;
    }

    protected getLineFour(): string {
        const [CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE] = this.calcAnnuityAndInterest()
        return this.calculateAnswerUI(CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE)
    }

    protected calculateAnswer(): number {
        const [CALCULATED_ANNUITY_VALUE, CALCULATED_INTEREST_VALUE] = this.calcAnnuityAndInterest()
        return Math.round(CALCULATED_ANNUITY_VALUE * CALCULATED_INTEREST_VALUE)
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
        const TYPE = this.type.split('-')[0]
        const DUE = this.type.split('-')[1]
        this.type = `${TYPE}<sub>${DUE}</sub>`

        let [ANNUITY_DIVIDE_UI, interestRuleUI] = this.formula()
        interestRuleUI = `${interestRuleUI} × ${this.getInterestFormula()}`
        const FORMULA = this.annuityTemplate('a', ANNUITY_DIVIDE_UI, interestRuleUI)

        const SET_VALUE = this.setAnnuityValue(`${this.setInterestRuleUI()} × ${this.getInterestValue()}`)
        const LINE_THREE: string = this.getLineThree(true);
        const DUE_INTEREST = this.calcInterest()
        const LINE_FOUR = `${this.getLineFour()} × ${DUE_INTEREST}`
        const ANSWER = Math.round(this.calculateAnswer() * DUE_INTEREST)

        this.renderTemplate(`${FORMULA}${SET_VALUE}${LINE_THREE}`, `${LINE_FOUR}`, String(ANSWER), renderArea)
    }
}

export { LumpSum, Annuity, AnnuityDue }