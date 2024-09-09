import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp, SelectApp, DatePickerApp, useLoading } from "@juandland/appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";

interface formValsInt {
    datepicker: string;
    value: number;
    mount: number;
}
function App() {

    const { register, validateForm, form, formValues, setForm } = useFormApp<formValsInt>();
    const { setLoading } = useLoading();

    useEffect(() => {
        console.log(formValues);
        // setLoading(true);
    }, [formValues]);

    return (
        <div style={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#00120B"
        }}>
            <FormApp
                onSubmit={() => console.log(formValues)}
                validateForm={() => validateForm()}
                className='form-test'
            >
                <DatePickerApp
                    {...register("datepicker")}
                    placeholder='Fecha de prueba'
                    textAlign='center'
                    style='bottom-line'
                    maxToday
                />
                <InputApp
                    {
                    ...register("value", {
                        min: 5,
                        max: 10,
                        required: false,
                        type: 'number',
                        errorEvents: {
                            onMinError: "Perrrooo"
                        },
                    })
                    }
                    type='money'
                    placeholder='Ingresa Numero'
                    style={{
                        type: "box",
                        background: "transparent",
                        color: "rgba(179, 224, 203, 0.88)",
                        blurColor: "rgba(179, 224, 203, 0.5)",
                        fontSize: "large",
                        placeholderColor: "red",
                        textAlign: "center"
                    }}
                    defaultValue='5555.5'
                    errorOnPlaceholder
                />
                <InputApp
                    {
                    ...register("mount", {
                        min: 5,
                        max: 10,
                    })
                    }
                    type='percentage'
                    placeholder='Ingresa Porcentaje'
                    style={{
                        type: "box",
                        background: "transparent",
                        color: "rgba(179, 224, 203, 0.88)",
                        blurColor: "rgba(179, 224, 203, 0.5)",
                        fontSize: "large",
                        textAlign: "left"
                    }}
                    defaultValue='4'
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('selector')}
                    options={[{value: 'opcion 1', label: "OPCION"}, {value: 'opcion 2', label: "SEGUNDA"}]}
                    placeHolder='Test de select'
                    style={{
                        type: "box",
                        background: "transparent",
                        color: "rgba(179, 224, 203, 0.88)",
                        blurColor: "rgba(179, 224, 203, 0.5)",
                        textAlign: "center",
                        borderRadius: 5,
                        placeholderColor: "blue",
                        blurPlaceholderColor: "green",
                        listAnimation: true,
                        showPlaceholderOnList: true
                    }}
                    defaultValue='opcion 2'
                    errorOnPlaceholder
                />
                <ButtonApp
                    validateSubmit
                    style='border-line'
                    disabled
                // actionStyle='cancel' 
                // buttonStyle={{
                //     backgroundColor: "black",
                //     textColor: "white",
                // }}
                icon={{
                    icon: deleteIcon,
                    // invertColor: true,
                }}
                >Boton</ButtonApp>


            </FormApp>
        </div>
    );
}

export default App;