class Calculator {
    private baseNumber: number;
    constructor(value: number) {
        this.baseNumber = value;
    }
    
    add(value: number): Calculator {
        this.baseNumber += value;
        return this;
    }
    
    subtract(value: number): Calculator {
        this.baseNumber -= value;
        return this;
    }
    
    multiply(value: number): Calculator {
        this.baseNumber *= value;    
        return this;
    }
    
    divide(value: number): Calculator {
        if (value === 0) {
            throw "Division by zero is not allowed"
        }

        this.baseNumber /= value
        return this;
    }
    
    power(value: number): Calculator {
        this.baseNumber **= value;
        return this;
    }
    
    getResult(): number {
        return this.baseNumber;
    }
}