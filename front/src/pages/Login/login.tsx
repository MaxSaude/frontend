import {  useNavigate } from "react-router-dom"
import DefaultButton from "../../components/DefaultButton/DefaultButton"
import { InputDefault, PasswordInput } from "../../components/Input/input"
import { Box, Flex, flexbox, Text } from "@chakra-ui/react"


const Login = () => {
    const navigate = useNavigate();

    const validation = () => {
        console.log('pai ta dentro')

        navigate('/')
    }

    return(

        <Box  w="100%" display={"flex"} justifyContent={"center"} alignItems={"center"}   >

            

            <Flex boxShadow='0px 0px 24px #22CA96' borderRadius='15' textColor={"#fff"} p={"5"} bgColor={'#2E2F36'} w="400px" h="400" justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Text fontSize='30' textColor='#fff' fontWeight='bold'>MaxSaúde</Text>
                <Box w="100%" m={'5'}>

                    <InputDefault label="Usuário"  placeholder="Nome"   />
                </Box>

                <Box w='100%' m={'5'}>

                    <PasswordInput label="Senha" placeholder="Senha"/>
                </Box>

                <DefaultButton onClick={validation} color="#22CA96" text="Entrar" />  

            </Flex>

        </Box>
    )
}

export default Login