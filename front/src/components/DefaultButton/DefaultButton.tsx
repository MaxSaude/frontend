import { Button, ButtonGroup } from '@chakra-ui/react'
import { ChangeEvent } from 'react';


interface DFButton {
    text: string;
    color?: string;
    onClick?: (e: ChangeEvent<any>) => void;

}

const DefaultButton = ({text, color, onClick}: DFButton) => {


    return(
        <Button onClick={onClick}  fontSize='18' fontWeight='bold' w='100' h='30' textColor={'#fff'}  bgColor={color} variant='solid'>
            {text}
        </Button>
    )
}

export default DefaultButton