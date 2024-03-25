import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {Dispatch, JSX, SetStateAction} from 'react';

/**
 * Componente que define un conjunto de checkbox.
 * @template T El tipo de los valores que almacena el checkbox.
 * @param props Parámetros necesarios para el funcionamiento del componente.
 * @param {string} props.label El título del conjunto.
 * @param {T} props.select El valor que está seleccionado por defecto.
 * @param {Dispatch<SetStateAction<T>>} props.setSelected Hook que define el valor seleccionado.
 * @param {Array<{ value: T, label: string }>} props.values Los valores del conjunto.
 * @constructor
 */
export function CheckBoxGroupComponent<T>(
    props: {
        label: string;
        selected: T;
        setSelected: Dispatch<SetStateAction<T>>;
        values: Array<{ value: T, label: string }>;
    }
): JSX.Element {
    return (
        <FormControl className='component-container'>
            <FormLabel>{props.label}</FormLabel>
            <RadioGroup
                row
                value={props.selected}
                name='row-radio-buttons-group'
                aria-labelledby='demo-row-radio-buttons-group-label'
                onChange={(e) => props.setSelected(e.target.value as T)}
            >
                {
                    props.values.map((value) => {
                        return <FormControlLabel
                            key={value.label}
                            label={value.label}
                            value={value.value}
                            control={<Radio/>}
                        />;
                    })
                }
            </RadioGroup>
        </FormControl>
    );
}