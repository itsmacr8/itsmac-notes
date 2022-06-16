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

    findAnswer(renderArea: HTMLElement) {
        const TypeUI: string = this.getTypeUI();
        const totalInterestUI: string = `${this.getInterestFormula()}${this.getYearFormula()}`;
        const formula = `${this.baseTemplate(`${TypeUI} ${totalInterestUI}`)}`
        const setValue = `${this.baseTemplate(`${this.value} ${this.setValue()}`)}`
        const [calculation, answer]: string[] = this.calculate();
        this.renderTemplate(formula, setValue, calculation, answer, renderArea)
    }

    protected renderTemplate(formula: string, setValue: string, calculation: string, answer: string, renderArea: HTMLElement) {
        renderArea.innerHTML =
            `<h2>Answer is:</h2>
            <div class="pl-4">
                ${formula}
                ${setValue}
                ${this.baseTemplate(calculation)}
                ${this.baseTemplate(answer)}
            </div>`
    }

    protected getTypeUI() {
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

    protected setValue() {
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

    protected calculate() {
        const totalInterest: number = this.calcInterestWithPower()
        const answer = Math.round(this.value * totalInterest);
        return [`${this.value} × ${totalInterest}`, String(answer)]
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
}

export { LumpSum }