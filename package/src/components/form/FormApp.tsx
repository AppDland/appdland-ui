import React, { createContext, useContext } from 'react';
import { FormAppProps, formValuesInt, useFormAppProps } from './FormApp.types';
import { useForm } from './useForm';

interface FormContextProps<T> extends useFormAppProps<T> { }

const FormContext = createContext<FormContextProps<any> | undefined>(undefined);

export const FormAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const form = useForm();

    return (
        <FormContext.Provider value={form}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormApp: <T extends object = formValuesInt>() => useFormAppProps<T> = <T extends object = formValuesInt>() => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within a FormAppProvider');
    }
    return context as FormContextProps<T>;
};

export const FormApp: React.FC<FormAppProps> = (props) => {
    const { validateForm, formValues } = useFormApp();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const response = validateForm();
                if (response) {
                    props.onSubmit(formValues);
                }
            }}
            style={props.style}
            className={props.className}
        >
            {props.children}
        </form>
    );
};