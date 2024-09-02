import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp } from "@juandland/appdland-ui"
function App() {

    const [values, setValues] = useState("");

    useEffect(() => {
        console.log(values);
    }, [values]);

    const { register, validateForm } = useFormApp();

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
                validateForm={() => validateForm({
                    onMinError: "minimo perro"
                })}
            >
                <InputApp
                    {
                    ...register("inputPrueba", {
                        max: 1
                    })
                    }
                    type='text'
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