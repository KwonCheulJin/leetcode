class ArrayWrapper {
    private items = []
    constructor(nums: number[]) {
        this.items = nums;
    }
    
    valueOf(): number {
        return this.items.reduce((acc, cur) => acc + cur, 0)
    }
    
    toString(): string {
        return JSON.stringify(this.items)
    }
};

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */