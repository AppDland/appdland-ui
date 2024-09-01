import React from 'react';
import { FormAppProps } from './FormApp.types';

export const FormApp: React.FC<FormAppProps> = (props) => {

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (props.validateForm) {
                    const response = props.validateForm();
                    if (response) {
                        props.onSubmit();
                    }
                } else {
                    props.onSubmit();
                }
            }}
            style={props.style}
        >
            {props.children}
        </form>
    )
}