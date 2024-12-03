import { useEffect, useState } from "react";
import { registerConfig, useInputGroup } from "../../custom/useInput";
import { formValuesInt, RegisterInt, useFormAppProps } from "./FormApp.types";

interface FormatsInt {
    notEmpty: (param: boolean | undefined, errorMessage?: string | undefined) => FormatsInt;
    format: (type: "string" | "number" | "name", errorMessage?: string | undefined) => FormatsInt;
    min: (param: number | undefined, errorMessage?: string | undefined) => FormatsInt;
    max: (param: number | undefined, errorMessage?: string | undefined) => FormatsInt;
    positive: (param: boolean | undefined, errorMessage?: string | undefined) => FormatsInt;
    isValid: () => { state: boolean, error: string };
}

export const useForm: <T extends object = formValuesInt>() => useFormAppProps<T> = <T extends object = formValuesInt>() => {

    const [formValues, setFormValues] = useState<T>({} as T);

    const [form, setForm, registerInput] = useInputGroup();

    useEffect(() => {
        let vals = {};
        for (const input of Object.keys(form)) {
            const { value, type } = form[input];
            vals = {
                ...vals,
                [input]: type === "number" && Number(value) > 0 ? Number(value) : value
            }

        }
        setFormValues(vals as T);
    }, [form]);

    const validateFormat: (value: string | number) => FormatsInt = function (value: string | number) {

        let validate = true;
        let error = "";

        const validators = () => {
            return {
                /**
                 * Valida que no este vacío si es required
                 * @param required pasar el atributo required del input
                 * @param errorMessage mensaje personalizado
                 * @returns 
                 */
                notEmpty(required: boolean | undefined, errorMessage?: string | undefined) {
                    if (String(value).length === 0 && required === true) {
                        validate = false;
                        error = errorMessage
                            ? errorMessage
                            : 'Campo requerido'
                    }
                    return this;
                },
                /**
                 * valida que el formato sea correcto 
                 * @param type tipo de formato a validar
                 * @param errorMessage mensaje personalizado
                 */
                format(type: "string" | "number" | "name", errorMessage?: string | undefined) {
                    if (validate) {
                        if (type === "name") {
                            if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(String(value))) {
                                validate = false;
                                error = errorMessage
                                    ? errorMessage
                                    : "Ingresa un nombre válido"
                            }
                        } else if (typeof value !== type) {
                            validate = false;
                            error = errorMessage
                                ? errorMessage
                                : type === "string"
                                    ? "Formato no válido"
                                    : "Ingresa únicamente números"
                        }
                    }
                    return this;
                },
                /**
                 * Valida que el input cumpla el mínimo de carácteres especificado
                 * @param argument Carácteres mínimos
                 * @param errorMessage mensaje personalizado
                 * @returns 
                 */
                min(argument: number | undefined, errorMessage?: string | undefined) {
                    if (validate && argument && String(value).length < argument) {
                        validate = false;
                        let message = errorMessage
                            ? errorMessage
                            : `Mínimo ${argument} carácteres`

                        error = message;
                    }
                    return this;
                },
                /**
                 * Valida que el input cumpla el máximo de carácteres especificado
                 * @param argument Carácteres máximos
                 * @param errorMessage mensaje personalizado
                 * @returns 
                 */
                max(argument: number | undefined, errorMessage?: string | undefined) {
                    if (validate && argument && String(value).length > argument) {
                        validate = false;
                        error = errorMessage
                            ? errorMessage
                            : `Máximo ${argument} carácteres`;
                    }
                    return this;
                },
                positive(positive: boolean | undefined, errorMessage?: string | undefined) {
                    if (validate && positive === true && Number(value) <= 0) {
                        validate = false;
                        error = errorMessage
                            ? errorMessage
                            : 'Ingresa un número positivo'
                    }
                    return this;
                },
                /**
                 * Método final
                 * @returns 
                 * - state: 
                 * **true** *(válido)* / **false** *(no cumple los requisitos)*
                 * - error: **Mensaje de error a mostrar en el input**
                 */
                isValid() {
                    return {
                        state: validate,
                        error
                    };
                }
            }
        }

        return {
            ...validators()
        };
    }


    const register: (name: string, settings?: registerConfig) => RegisterInt = (name: string, settings?: registerConfig) => {

        useEffect(() => {
            registerInput(name, settings);
        }, []);

        return {
            value: form[name]?.value || "",
            onChange: (val: string) => setForm(name, val),
            validator: form[name]?.validate || false,
            errorMessage: form[name]?.errorMessage || "",
            maxLength: settings?.max ? settings.max : undefined
        }
    }

    const validateForm: () => boolean = () => {
        let validator = true;
        let counter = 0;
        for (const input of Object.keys(form)) {
            counter++;
            const { value, required, min, max, type, positive, errorEvents } = form[input];
            let innerValidator = true;
            const innerValidate = validateFormat(
                type === "number" && Number(value) > 0 ? Number(value) : value,
            );

            if (required !== false || value !== "") {
                const { state, error } = innerValidate.notEmpty(required === undefined ? true : required, errorEvents?.onRequiredError)
                    .format(type ? type : "string", errorEvents?.onFormatError)
                    .min(min, errorEvents?.onMinError)
                    .max(max, errorEvents?.onMaxError)
                    .positive(positive === undefined ? true : positive, errorEvents?.onPositiveNumberError)
                    .isValid();

                if (state === false) {
                    setForm(input, value, true, error);
                    innerValidator = state;
                }

                if (innerValidator === false) {
                    validator = false;
                }
            }
        }

        return validator;
    }

    return {
        register,
        validateForm,
        form,
        setForm,
        formValues
    }
}