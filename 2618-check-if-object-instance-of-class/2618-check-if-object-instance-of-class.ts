function checkIfInstanceOf(obj: any, classFunction: any): boolean {
    return Object(obj) instanceof classFunction;
};

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */