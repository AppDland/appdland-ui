import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp, SelectApp, DatePickerApp } from "@juandland/appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";
function App() {

    const { register, validateForm, form, formValues, setForm } = useFormApp();

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
                    textAlign='left'
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
                    type='percentage'
                    placeholder='Ingresa Porcentaje'
                    style='box'
                    textAlign='left'
                    fontSize='large'
                    defaultValue='50'
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('selector')}
                    options={["opcion 1", "opcion 2"]}
                    placeHolder='Test de select'
                    textAlign='center'
                    errorOnPlaceholder
                />
                <ButtonApp
                    validateSubmit
                    style='solid'
                    actionStyle='cancel'
                    // buttonStyle={{
                    //     backgroundColor: "black",
                    //     textColor: "white",
                    // }}
                    icon={{
                        icon: deleteIcon,
                        invertColor: true,
                    }}
                >Boton</ButtonApp>


            </FormApp>
        </div>
    );
}

export default App;