import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp, SelectApp, DatePickerApp } from "@juandland/appdland-ui"
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
            >
                <DatePickerApp 
                    {...register("datepicker")}
                    placeholder='Fecha de prueba'
                    maxToday
                />
                <InputApp
                    {
                    ...register("value", {
                        min: 5,
                        max: 10,
                        type: 'number',
                        errorEvents: {
                            onMinError: "Perrrooo"
                        },
                    })
                    }
                    type='money'
                    placeholder='Ingresa Numero'
                    style='box'
                    textAlign='left'
                    fontSize='large'
                    errorOnPlaceholder
                />
                <InputApp
                    {
                    ...register("mount", {
                        min: 5,
                        max: 10,
                        type: "number"
                    })
                    }
                    type='number'
                    placeholder='Ingresa Porcentaje'
                    style='box'
                    textAlign='left'
                    fontSize='large'
                    percentage
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('selector')}
                    options={["opcion 1", "opcion 2"]}
                    placeHolder='Test de select'
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