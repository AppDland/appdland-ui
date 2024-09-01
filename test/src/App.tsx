import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp } from "@juandland/appdland-ui"
function App() {

    const [values, setValues] = useState("");

    useEffect(() => {
        console.log(values);
    }, [values]);

    const { validateFormat } = useFormApp();

    const validateForm = () => {
        const inputVal = validateFormat(values).isString().min(5).isValid();

        console.log(inputVal)

        return inputVal;
    }


    return (
        <div style={{
            backgroundColor: "red",
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <FormApp
                onSubmit={() => console.log("submited")}
                validateForm={validateForm}
                style={{
                    borderStyle: "solid"
                }}
            >
                <InputApp
                    value={values}
                    onChange={setValues}
                    type='money'
                    placeholder='Ingresa Texto'
                    style='box'
                    textAlign='left'
                    background='transparent'
                    fontSize='large'
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