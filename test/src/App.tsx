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


    return (
        <div style={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}>
            <FormApp
                onSubmit={() => console.log(formValues)}
                validateForm={() => validateForm()}
                className='form-test'
            >
                <DatePickerApp
                    {...register("datepicker")}
                    placeholder='Fecha de prueba'
                    maxToday
                    errorBelowDate
                    errorMessage='error de prueba'
                />
                <InputApp
                    {...register("texto")}
                    type='text'
                    style={{
                        type: "bottom-line",
                        textAlign: "center"
                    }}
                    placeholder='Texto'
                // capitalize
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
                        type: "bottom-line",
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
                        type: "bottom-line",
                        textAlign: "center"
                    }}
                    defaultValue='4'
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('select')}
                    options={['Nequi', 'Transferencia Argentina', 'opcion3']}
                    placeholder='Envías muchos pesos'
                    style={{
                        type: "outline",
                        textAlign: "right",
                        placeholderColor: "#004E77",
                        blurPlaceholderColor: "#004E77",
                        color: "#004E77",
                        blurColor: "#004E77",
                        arrowColor: "#004E77",
                        showPlaceHolderOnFocus: false
                    }}
                    optionsStyle={{
                        showPlaceholderOnList: true,
                        scrollThumbColor: "#004E77",
                        maxItems: 3
                    }}
                    errorBelowSelect
                />
                <ButtonApp
                    validateSubmit
                    style={{
                        type: "solid",
                        backgroundColor: "blue",
                        borderColor: "red",
                        textColor: "white"
                    }}
                // actionStyle='cancel' 
                // icon={{
                //     icon: deleteIcon,
                //     // invertColor: true,
                // }}
                >Boton</ButtonApp>


            </FormApp>
        </div>
    );
}

export default App;