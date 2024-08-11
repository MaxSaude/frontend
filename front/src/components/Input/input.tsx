import React from 'react';

import {ChangeEvent, useState} from 'react'
import {FormControl, FormHelperText, FormLabel, Input} from '@chakra-ui/react'
import { ViewIcon, AddIcon, WarningIcon, ViewOffIcon } from '@chakra-ui/icons'



interface IInput{
    label: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<any>) => void;
    name?: string;
    value?: string;
    error?: string;
}

const InputDefault = ({ label, placeholder, onChange, name, value, error }: IInput) => {


    return(
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input id={name}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type="text" />
        </FormControl>
    )
}

const PasswordInput = ({ label, placeholder, name, onChange, value, error }: IInput) => {
    const [isShowing, setIsShowing] = useState(false);
  
    const handleShow = () => setIsShowing(!isShowing);
  
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
                <Input display={'flex'} flexDirection={'row'} id={name}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={isShowing ? "text" : "password"} />
                    {isShowing ? <ViewIcon onClick={handleShow} /> : <ViewOffIcon onClick={handleShow} />}
        </FormControl>
          
    );
  };


export { InputDefault, PasswordInput}