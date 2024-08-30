import React, { useState } from 'react';
import { InputApp } from "@juandland/appdland-ui"
function App() {

    const [values, setValues] = useState("");
    return (
        <div className="App">
            <InputApp
                value={values}
                onChange={(val) => setValues(val)}
                type='money'
                placeholder='Ingresa Texto'
                capitalize
                style='box'
                showDecimal={false}
            />
        </div>
    );
}

export default App;
