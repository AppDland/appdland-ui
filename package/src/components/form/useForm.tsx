interface BasicFormatsInt {
    min: (param: number) => BasicFormatsInt;
    max: (param: number) => BasicFormatsInt;
    isValid: () => boolean;
}

interface NumberFormatInt extends BasicFormatsInt {
    toString: () => string;
}

interface StringFormatInt extends BasicFormatsInt {
    toNumber: () => number;
}

interface FormatsInt {
    isString: () => StringFormatInt;
    isNumber: () => NumberFormatInt;
}

export const useFormApp = () => {

    const validateFormat: (value: string) => FormatsInt = function (value: string) {

        let validate = true;

        const basicVals = () => {
            return {
                min(argument: number) {
                    if (String(value).length < argument) {
                        validate = false;
                    }
                    return this;
                },
                max(argument: number) {
                    if (String(value).length > argument) {
                        validate = false;
                    }
                    return this;
                },
                isValid() {
                    return validate;
                }
            }
        }

        const formatNumber = () => {
            return {
                toNumber() {
                    return Number(value);
                }
            }
        }

        const formatString = () => {
            return {
                toString() {
                    return String(value);
                }
            }
        }
        return {
            isString() {
                if (typeof value !== "string") {
                    validate = false;
                }
                return {
                    ...basicVals(),
                    ...formatNumber()
                };
            },
            isNumber() {
                if (isNaN(Number(value))) {
                    validate = false;
                }
                return {
                    ...basicVals(),
                    ...formatString()
                };
            }
        };
    }


    return {
        validateFormat
    }
}