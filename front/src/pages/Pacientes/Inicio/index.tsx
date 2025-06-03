import { Box, Button, ButtonGroup, Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Select, Text, useDisclosure } from "@chakra-ui/react";
import { Paciente } from "../../../models/Paciente";
import { deletarPaciente as deletarPacienteAPI, listarTodosPacientes } from "../../../services/apiPaciente";
import { useEffect, useState } from "react";
import styles from "./inicio.module.css";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import PacienteForm from "../modal/PacienteForm";


const PacienteInterface: React.FC = () => {

    const [pacienteList, setPacienteList] = useState<Paciente[]>([])
    const [pacienteAtual, setPacienteAtual] = useState<Paciente | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodosPacientes();
            setPacienteList(response.data)
        }

        fetchData();

    }, [])

    const cadastrarPaciente = () =>{
        setPacienteAtual(null)
        onOpen()
    }

    const deletarPaciente = async (codigo: string)=>{

        const confirmDelete = window.confirm("Você tem certeza que deseja excluir este paciente?");
        
        if (confirmDelete) {
            try {
                await deletarPacienteAPI(codigo)
                setPacienteList(pacienteList.filter(paciente => paciente.codigo != codigo))

                alert("Excluído com sucesso!")

            } catch (error) {
                alert("Paciente possui ligação com outra tabela, não pode excluir!")
            }
        }
    }

    const handleCloseModal=()=>{
        onClose()
        setPacienteAtual(null)
    }

    const editarPaciente = (paciente : Paciente) =>{
        setPacienteAtual(paciente)
        onOpen()
    }

    return (
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh', overflowY: 'auto' }}>
            <h1 className={styles.tittle}>Pacientes</h1>

            <div className={styles.alinhamento}>               
                <Select placeholder='Opção de pesquisa' color='#989797' w='192px' bg='#464646'>
                    <option value='option1'>Nome</option>
                    <option value='option2'>CPF</option>
                    <option value='option3'>Contato</option>
                    <option value='option4'>Empresa</option>
                </Select>

                <InputGroup w='250px' ml='4'>
                    <Input placeholder="Pesquisar" backgroundColor="#464646" color="white" borderRadius="md" _placeholder={{ color: '#989797' }} />
                    <InputRightElement>
                        <IconButton aria-label="Pesquisar" icon={<SearchIcon />} colorScheme="whiteAlpha" />
                    </InputRightElement>
                </InputGroup>

                <button onClick={cadastrarPaciente} className={styles.buttonCadastrar}>CADASTRAR</button>

            </div>


            <PacienteForm paciente={pacienteAtual} onClose={handleCloseModal} isOpen={isOpen}/>

            <div className={styles.boxListaPacientes}>
                <List spacing={3}>
                    { pacienteList.map(paciente => (

                        <ListItem key={paciente.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                                as={Flex} justifyContent='space-between'  className={styles.pacientes}>

                            <Box w={"80"}>      
                                <Text fontSize="xl" color={"#fff"}>{paciente.nome}</Text>
                                <Text color={"#fff"}>CPF: {paciente.cpf}</Text>
                            </Box> 
                            
                            <ButtonGroup>
                                <Button colorScheme="blue" leftIcon={<EditIcon/>}
                                    onClick={() => editarPaciente(paciente)}>Alterar</Button>
                                    
                                <Button colorScheme="red" leftIcon={<DeleteIcon/>}
                                onClick={() =>  deletarPaciente(paciente.codigo)}>Deletar</Button>
                            </ButtonGroup>

                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default PacienteInterface;