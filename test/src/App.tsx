import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp } from "@juandland/appdland-ui"
function App() {
    
    const { register, validateForm, form, formValues } = useFormApp();
    
    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    return (
        <div style={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <FormApp
                onSubmit={() => console.log("submited")}
                validateForm={() => validateForm()}
            >
                <InputApp
                    {
                    ...register("inputPrueba", {
                        min: 5,
                        max: 10,
                        onMinError: "Mínimo 5 carácteres perrooooo"
                    })
                    }
                    type='number'
                    placeholder='Ingresa Texto'
                    style='box'
                    textAlign='left'
                    fontSize='large'
                    errorOnPlaceholder
                />
                <ButtonApp
                    title='boton'
                    validateSubmit
                    style='solid'
                    buttonStyle={{
                        backgroundColor: "blue",
                        textColor: "red"
                    }}
                />
            </FormApp>
        </div>
    );
}

export default App;