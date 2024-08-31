import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp } from "@juandland/appdland-ui"
function App() {

    const [values, setValues] = useState("");

    useEffect(() => {
        console.log(values);
    }, [values]);
    return (
        <div style={{
            backgroundColor: "red",
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <form
                onSubmit={(e) =>{
                    e.preventDefault();
                    console.log("submited")
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
                    onClick={() => {
                        console.log("clicked")
                    }}
                />
            </form>

        </div>
    );
}

export default App;