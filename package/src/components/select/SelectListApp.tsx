import React, { useEffect, useState } from 'react';
import { SelectApp } from './SelectApp';
import { SelectAppProps, SelectStyleInt } from './SelectApp.types';
import './listStyle.css';
import Delete from './Delete';

interface listValuesInt {
    value: string;
    label: string;
}

interface StyleInt extends SelectStyleInt {
    deleteIconColor: string;
}

export interface SelectAppListProps extends Omit<SelectAppProps, 'onChange' | 'value' | 'options' | 'preventDefault' | 'validator' | 'style'> {
    value: string[];
    onChange: (value: string[]) => void;
    options: listValuesInt[];
    style?: StyleInt;
}

export const SelectListApp = ({ placeholder = 'Selecciona', style, ...props }: SelectAppListProps) => {

    const [innerVal, setInnerVal] = useState<string[]>([]);

    const handleAdd = (val: string) => {
        props.onChange([...props.value, val]);
    }

    const handleDelete = (val: string) => {
        const values = props.value.filter((value) => value !== val);
        props.onChange(values);
    }

    useEffect(() => {
        const values = props.options.filter((option) => props.value.includes(option.value)).map((option) => option.label);
        setInnerVal(values);
    }, [props.value]);

    return (
        <div>
            <SelectApp
                {...props}
                value=''
                onChange={handleAdd}
                preventDefault
                placeholder={placeholder}
                validator={false}
                style={style}
            />
            <div className='appdland-ui-selectlistapp-list-container'>
                {
                    innerVal.map((val, index) => (
                        <Element
                            key={index}
                            val={val}
                            onClick={handleDelete}
                            style={style}
                        />
                    ))
                }
            </div>
        </div>
    )
}

interface ElementInt {
    val: string;
    onClick: (val: string) => void;
    style?: StyleInt;
}

const Element = ({ val, onClick, style }: ElementInt) => (
    <div
        className='appdland-ui-selectlistapp-element'
        style={{
            backgroundColor: style?.backgroundColor
                ? style.backgroundColor
                : 'lightgray'
        }}
    >
        <p style={{ color: style?.color }}>{val}</p>
        <div onClick={() => onClick(val)} className='appdland-ui-selectlistapp-element-delete'>
            <Delete
                color={style?.deleteIconColor}
            />
        </div>
    </div>
)