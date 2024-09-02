import { useEffect, useState } from "react";
import { GroupInt, registerConfig, useInputGroup } from "../../custom/useInput";

interface FormatsInt {
    notEmpty: (param: boolean | undefined, errorMessage?: string | undefined) => FormatsInt;
    format: (type: "string" | "number", errorMessage?: string | undefined) => FormatsInt;
    min: (param: number | undefined, errorMessage?: string | undefined) => FormatsInt;
    max: (param: number | undefined, errorMessage?: string | undefined) => FormatsInt;
    isValid: () => { state: boolean, error: string };
}

interface RegisterInt {
    value: string;
    onChange: (param: string) => void;
    validator: boolean;
    register: () => void;
    errorMessage: string;
    maxLength: number | undefined;
}

interface useFormAppInt {
    /**
     * Registra un input, se debe usar con el operador Spread.
     *
     * *Ejemplo*: 
     * ```
     * <InputApp
        * {...register('inputName')}
        * otherProps
     * />
     * ```
     * 
     * | ATRIBUTOS |
     * 
     * @param name asigna un nombre al input
     * @param settings ajustes para validar el formulario
     * @returns
     * - value
     * - onChange
     * - validator
     * - register
     * - errorMessage
     * - maxLength
     * 
     * NOTA:
     * 
     * No reasigne los atributos que se están retornano, esto causaria un posible error
     */
    register: (name: string, settings?: registerConfig) => RegisterInt;
    /**
     * La función que finalmente valida que los inputs cumplan los requisitos del formulario
     * @param settings configuraciones opcionales
     * @returns boolean
     */
    validateForm: () => boolean;
    /**
     * 
     */
    form: GroupInt;
    setForm: (key: string, value: string, validate?: boolean, errorMessage?: string) => void;
    /**
     * Accede a un objeto con los inputs y sus values
     */
    formValues: formValuesInt;
}

interface formValuesInt {
    [key: string]: string | number;
}

export const useFormApp: () => useFormAppInt = () => {

    const [formValues, setFormValues] = useState<formValuesInt>({});

    const [form, setForm, registerInput] = useInputGroup();

    useEffect(() => {
        for (const input of Object.keys(form)) {
            const { value, type } = form[input];

            setFormValues({
                ...formValues,
                [input]: type === "number" ? Number(value) : value
            })
        }
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
                format(type: "string" | "number", errorMessage?: string | undefined) {
                    if (validate && typeof value !== type) {
                        validate = false;
                        error = errorMessage
                            ? errorMessage
                            : type === "string"
                                ? "Formato no válido"
                                : "Ingresa únicamente números"
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

        return {
            value: form[name]?.value || "",
            onChange: (val: string) => setForm(name, val),
            validator: form[name]?.validate || false,
            register: () => registerInput(name, settings),
            errorMessage: form[name]?.errorMessage || "",
            maxLength: settings?.max ? settings.max : undefined
        }
    }

    const validateForm: () => boolean = () => {
        let validator = true;
        for (const input of Object.keys(form)) {
            const { value, required, min, max, type, onRequiredError, onFormatError, onMinError, onMaxError } = form[input];
            let innerValidator = true;
            const innerValidate = validateFormat(
                type === "number" && Number(value) > 0 ? Number(value) : value,
            );

            const { state, error } = innerValidate.notEmpty(required === undefined ? true : required, onRequiredError)
                .format(type ? type : "string", onFormatError)
                .min(min, onMinError)
                .max(max, onMaxError)
                .isValid();
            if (state === false) {
                setForm(input, value, true, error);
                innerValidator = state;
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
        form,
        setForm,
        formValues
    }
}