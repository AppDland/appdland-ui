import { registerConfig, useInputGroup } from "../../custom/useInput";

interface BasicFormatsInt {
    min: (param: number | undefined) => BasicFormatsInt;
    max: (param: number | undefined) => BasicFormatsInt;
    isValid: () => { state: boolean, error: string };
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

interface RegisterInt {
    value: string;
    onChange: (param: string) => void;
    validator: boolean;
    register: () => void;
    errorMessage: string;
}

interface validateSettings {
    onRequiredError?: string;
    onMinError?: string;
    onMaxError?: string;
    onIsStringError?: string;
    onIsNumberError?: string;
}

export const useFormApp = () => {

    const [form, setForm, registerInput] = useInputGroup();

    const validateFormat: (value: string, settings?: validateSettings) => FormatsInt = function (value: string, settings?: validateSettings) {

        let validate = true;
        let error = "";

        const basicVals = () => {
            return {
                min(argument: number | undefined) {
                    if (argument && String(value).length < argument) {
                        validate = false;
                        let message = argument === 1
                            ? settings
                                ? settings.onRequiredError
                                    ? settings.onRequiredError
                                    : 'Campo requerido'
                                : 'Campo requerido'

                            : settings
                                ? settings.onMinError
                                    ? settings.onMinError
                                    : `Mínimo ${argument} carácteres`
                                : `Mínimo ${argument} carácteres`

                        error = message;
                    }
                    return this;
                },
                max(argument: number | undefined) {
                    if (argument && String(value).length > argument) {
                        validate = false;
                        error = settings?.onMaxError ? settings.onMaxError : `Máximo ${argument} carácteres`;
                    }
                    return this;
                },
                isValid() {
                    return {
                        state: validate,
                        error
                    };
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
                    error = settings?.onIsStringError ? settings.onIsStringError : "Formato no válido"
                }
                return {
                    ...basicVals(),
                    ...formatNumber()
                };
            },
            isNumber() {
                if (isNaN(Number(value))) {
                    validate = false;
                    error = settings?.onIsNumberError ? settings.onIsNumberError : "Ingresa únicamente números"
                }
                return {
                    ...basicVals(),
                    ...formatString()
                };
            }
        };
    }


    const register: (name: string, settings?: registerConfig) => RegisterInt = (name: string, settings?: registerConfig) => {

        return {
            value: form[name]?.value || "",
            onChange: (val: string) => setForm(name, val),
            validator: form[name]?.validate || false,
            register: () => registerInput(name, settings),
            errorMessage: form[name]?.errorMessage || ""
        }
    }

    const validateForm: (settings?: validateSettings) => boolean = (settings?: validateSettings) => {
        let validator = true;
        for (const input of Object.keys(form)) {
            const { value, required, min, max, type } = form[input];

            let innerValidator = true;
            const innerValidate = validateFormat(value, settings);

            if (type === "number") {
                if (value.length === 0 && required === true) {
                    const { state, error } = innerValidate.isNumber().min(1).isValid();
                    if (state === false) {
                        setForm(input, value, true, error);
                        innerValidator = state;
                    }
                } else {
                    const { state, error } = innerValidate.isNumber()
                        .min(min ? min : undefined)
                        .max(max ? max : undefined)
                        .isValid()
                    if (state === false) {
                        setForm(input, value, true, error);
                        innerValidator = state;
                    }
                }

            } else {
                if (value.length === 0 && required === true) {
                    const { state, error } = innerValidate.isString().min(1).isValid();
                    if (state === false) {
                        setForm(input, value, true, error);
                        innerValidator = state;
                    }
                } else {
                    const { state, error } = innerValidate.isString()
                        .min(min ? min : undefined)
                        .max(max ? max : undefined)
                        .isValid();
                    if (state === false) {
                        setForm(input, value, true, error);
                        innerValidator = state;
                    }
                }
            }

            if (innerValidator === false) {
                validator = false;
            }
        }
        return validator;
    }

    return {
        register,
        validateForm,
        setForm
    }
}