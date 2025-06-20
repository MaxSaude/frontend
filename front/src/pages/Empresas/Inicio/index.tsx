import { Box, Button, ButtonGroup, Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Select, Text, useDisclosure } from "@chakra-ui/react";
import { Empresa } from "../../../models/Empresa";
import { deletarEmpresa as deletarEmpresaAPI, listarTodasEmpresa } from "../../../services/apiEmpresa";
import { useEffect, useState } from "react";
import styles from "./inicio.module.css";
import { ChevronDownIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import EmpresaForm from "../modal/EmpresaForm";


const EmpresaInterface: React.FC = () => {

    const [empresaList, setEmpresaList] = useState<Empresa[]>([])
    const [empresaAtual, setEmpresaAtual] = useState<Empresa | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [searchValue, setSearchValue] = useState('');
    const [searchOption, setSearchOption] = useState('option1');
    const [empresaExpandida, setEmpresaExpandida] = useState<string | null>(null);

    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasEmpresa();
            setEmpresaList(response.data)
        }

        fetchData();

    }, [])

    const cadastrarEmpresa = () =>{
        setEmpresaAtual(null)
        onOpen()
    }

    const deletarEmpresa = async (codigo: string)=>{

        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta empresa?");
        
        if (confirmDelete) {
            try {
                await deletarEmpresaAPI(codigo)
                setEmpresaList(empresaList.filter(empresa => empresa.codigo != codigo))

                alert("Excluido com sucesso !")

            } catch (error) {
                alert("Empresa Possui ligação com outro tabela, não pode excluir !")
            }
        }
    }

    const handleCloseModal=()=>{
        onClose()
        setEmpresaAtual(null)
    }

    const editarEmpresa = (empresa : Empresa) =>{
        setEmpresaAtual(empresa)
        onOpen()
    }

    const EmpresasFiltrados = empresaList.filter(empresa => {
        const valorBusca = searchValue.toLowerCase();
        if (searchOption === 'option1') {
            return empresa.nomeFantasia.toLowerCase().includes(valorBusca);
        }
        if (searchOption === 'option2') {
            return empresa.razaoSocial.toLowerCase().includes(valorBusca);
        }
        if (searchOption === 'option3') {
            const cnpjEmpresa = empresa.cnpj.replace(/\D/g, '');
            const cnpjBusca = searchValue.replace(/\D/g, '');
            return cnpjEmpresa.includes(cnpjBusca);
        }
        
        return true;
    });

    return (
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh', overflowY: 'auto' }}>
            <h1 className={styles.tittle}>Empresas</h1>

            <div className={styles.alinhamento}>               
                <Select placeholder='Opção de pesquisa' value={searchOption}  onChange={e => setSearchOption(e.target.value)} color='#989797' w='192px' bg='#464646'>
                    <option value='option1'>Nome Fantasia</option>
                    <option value='option2'>Razão Social</option>
                    <option value='option3'>CNPJ</option>
                </Select>

                <InputGroup w='250px' ml='4'>
                    <Input placeholder="Pesquisar" value={searchValue}  onChange={e => setSearchValue(e.target.value)} backgroundColor="#464646" color="white" borderRadius="md" _placeholder={{ color: '#989797' }} />
                    <InputRightElement>
                        <IconButton aria-label="Pesquisar" icon={<SearchIcon />} colorScheme="whiteAlpha" />
                    </InputRightElement>
                </InputGroup>

                <button onClick={cadastrarEmpresa} className={styles.buttonCadastrar}>CADASTRAR</button>

            </div>


            <EmpresaForm empresa={empresaAtual} onClose={handleCloseModal} isOpen={isOpen}/>

            <div className={styles.boxListaEmpresas}>
                <List spacing={3}>
                    { EmpresasFiltrados.map(empresa => (

                        <ListItem key={empresa.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" as={Flex} justifyContent='space-between'  className={styles.empresas}>

                            <Flex direction="column">

                                <Flex align="center" justify="space-between">
                                        <Button
                                            className={styles.buttonSeta}
                                            rightIcon={<ChevronDownIcon />}
                                            onClick={() =>
                                                setEmpresaExpandida(
                                                    empresaExpandida === empresa.codigo ? null : empresa.codigo
                                                )
                                            }
                                        /> 

                                    <Box w={"80"}>
                                        <Text fontSize="xl" color={"#fff"}>{empresa.nomeFantasia}</Text>
                                        <Text color={"#fff"}>CNPJ: {empresa.cnpj}</Text>
                                    </Box> 
                                    
                                    <ButtonGroup>
                                        <Button colorScheme="blue" leftIcon={<EditIcon/>}
                                            onClick={() => editarEmpresa(empresa)}>Alterar</Button>
                                            
                                        <Button colorScheme="red" leftIcon={<DeleteIcon/>}
                                        onClick={() =>  deletarEmpresa(empresa.codigo)}>Deletar</Button>
                                    </ButtonGroup>
                                </Flex>

                                    {empresaExpandida === empresa.codigo && (
                                        <Box className={styles.detalhesEmpresa} mt={3}>
                                            <Text><b>Razão Social:</b> {empresa.razaoSocial}</Text>
                                            <Text><b>Telefone:</b> {empresa.telefone}</Text>
                                            <Text><b>Endereço:</b> {empresa.endereco}, {empresa.numero} {empresa.complemento && `- ${empresa.complemento}`}</Text>
                                            <Text><b>Bairro:</b> {empresa.bairro}</Text>
                                            <Text><b>Cidade:</b> {empresa.cidade}</Text>
                                            <Text><b>Estado:</b> {empresa.estado}</Text>
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

export default EmpresaInterface;