import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp, SelectApp, DatePickerApp } from "@juandland/appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";
function App() {

    const { register, validateForm, form, formValues, setForm } = useFormApp();

    useEffect(() => {
        setTimeout(() => {
            setForm("mount", "50");
        }, 2000);
    }, []);

    return (
        <div style={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
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
                    style='box'
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
                    style='box'
                    textAlign='center'
                    fontSize='large'
                    errorOnPlaceholder
                />
                <InputApp
                    {
                    ...register("mount", {
                        min: 5,
                        max: 10,
                    })
                    }
                    type='text'
                    placeholder='Ingresa Porcentaje'
                    style='box'
                    textAlign='center'
                    fontSize='large'
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('selector')}
                    options={["opcion 1", "opcion 2"]}
                    placeHolder='Test de select'
                    errorOnPlaceholder
                />
                <ButtonApp
                    validateSubmit
                    style='solid'
                    buttonStyle={{
                        backgroundColor: "white",
                        textColor: "red"
                    }}
                    icon={deleteIcon}
                >Boton</ButtonApp>


            </FormApp>
        </div>
    );
}

export default App;