import { Box, Button, ButtonGroup, Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Select, Text, useDisclosure } from "@chakra-ui/react";
import { Paciente } from "../../../models/Paciente";
import { deletarPaciente as deletarPacienteAPI, listarTodosPacientes } from "../../../services/apiPaciente";
import { Empresa } from "../../../models/Empresa";
import { listarTodasEmpresa } from "../../../services/apiEmpresa";
import { useEffect, useState } from "react";
import styles from "./inicio.module.css";
import { ChevronDownIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import PacienteForm from "../modal/PacienteForm";


const PacienteInterface: React.FC = () => {

    const [pacienteList, setPacienteList] = useState<Paciente[]>([])
    const [pacienteAtual, setPacienteAtual] = useState<Paciente | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [pacienteExpandido, setPacienteExpandido] = useState<string | null>(null);
    const [empresaList, setEmpresaList] = useState<Empresa[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchOption, setSearchOption] = useState('option1');

    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodosPacientes();
            setPacienteList(response.data)
        }

        fetchData();

    }, [])

    useEffect(() => {
        const fetchEmpresas = async () => {
            const response = await listarTodasEmpresa();
            setEmpresaList(response.data);
        };
        fetchEmpresas();
    }, []);

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

    const getNomeEmpresa = (empresaId: string) => {
        const empresa = empresaList.find(e => e.codigo === empresaId);
        return empresa ? empresa.nomeFantasia : "Empresa não encontrada";
    }

    const pacientesFiltrados = pacienteList.filter(paciente => {
        const valorBusca = searchValue.toLowerCase();
        if (searchOption === 'option1') {
            return paciente.nome.toLowerCase().includes(valorBusca);
        }
        if (searchOption === 'option2') {
            return paciente.cpf.toLowerCase().includes(valorBusca);
        }
        if (searchOption === 'option3') {
            return paciente.contato.toLowerCase().includes(valorBusca);
        }
        if (searchOption === 'option4') {
            const empresa = empresaList.find(e => e.codigo === paciente.empresaId);
            return empresa && empresa.nomeFantasia.toLowerCase().includes(valorBusca);
        }
        return true;
    });

    return (
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh', overflowY: 'auto' }}>
            <h1 className={styles.tittle}>Pacientes</h1>

            <div className={styles.alinhamento}>               
                <Select placeholder='Opção de pesquisa' value={searchOption}  onChange={e => setSearchOption(e.target.value)} color='#989797' w='192px' bg='#464646'>
                    <option value='option1'>Nome</option>
                    <option value='option2'>CPF</option>
                    <option value='option3'>Contato</option>
                    <option value='option4'>Empresa</option>
                </Select>

                <InputGroup w='250px' ml='4'>
                    <Input placeholder="Pesquisar" value={searchValue} onChange={e => setSearchValue(e.target.value)} backgroundColor="#464646" color="white" borderRadius="md" _placeholder={{ color: '#989797' }} />
                    <InputRightElement>
                        <IconButton aria-label="Pesquisar" icon={<SearchIcon />} colorScheme="whiteAlpha" />
                    </InputRightElement>
                </InputGroup>

                <button onClick={cadastrarPaciente} className={styles.buttonCadastrar}>CADASTRAR</button>

            </div>


            <PacienteForm paciente={pacienteAtual} onClose={handleCloseModal} isOpen={isOpen} pacienteList={pacienteList}/>

            <div className={styles.boxListaPacientes}>
                <List spacing={3}>
                    { pacientesFiltrados.map(paciente => (

                        <ListItem key={paciente.codigo} className={styles.pacientes}>
                            <Flex className={styles.borda} direction="column">
                                <Flex align="center" justify="space-between">
                                    <Button
                                        className={styles.buttonSeta}
                                        rightIcon={<ChevronDownIcon />}
                                        onClick={() =>
                                            setPacienteExpandido(
                                                pacienteExpandido === paciente.codigo ? null : paciente.codigo
                                            )
                                        }
                                    />
                                    <Box w={"80"}>
                                        <Text fontSize="xl" color={"#fff"}>{paciente.nome}</Text>
                                        <Text color={"#fff"}>CPF: {paciente.cpf}</Text>
                                    </Box>
                                    <ButtonGroup>
                                        <Button colorScheme="blue" leftIcon={<EditIcon />}
                                            onClick={() => editarPaciente(paciente)}>Alterar</Button>
                                        <Button colorScheme="red" leftIcon={<DeleteIcon />}
                                            onClick={() => deletarPaciente(paciente.codigo)}>Deletar</Button>
                                    </ButtonGroup>
                                </Flex>
                                {pacienteExpandido === paciente.codigo && (
                                    <Box className={styles.detalhesPaciente} mt={3}>
                                        <Text><b>Contato:</b> {paciente.contato}</Text>
                                        <Text><b>Empresa:</b> {getNomeEmpresa(paciente.empresaId)}</Text>
                                    </Box>
                                )}
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default PacienteInterface;