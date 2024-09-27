import { Box, Button, ButtonGroup, Flex, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { Empresa } from "../../../models/Empresa";
import { deletarEmpresa as deletarEmpresaAPI, listarTodasEmpresa } from "../../../services/apiEmpresa";
import { useEffect, useState } from "react";
import styles from "./inicio.module.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EmpresaForm from "../modal/EmpresaForm";


const EmpresaInterface: React.FC = () => {

    const [empresaList, setEmpresaList] = useState<Empresa[]>([])
    const [empresaAtual, setEmpresaAtual] = useState<Empresa | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


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

    return (
        <div style={{backgroundColor:'#A8A8A8', height: "100vh"}}>
            <h1 className={styles.tittle}>Empresas</h1>
            <button onClick={cadastrarEmpresa}>Cadastar</button>

            { isOpen && <EmpresaForm empresa={empresaAtual} onClose={handleCloseModal} />}

            <div className={styles.boxListaEmpresas}>
                <List spacing={3}>
                    { empresaList.map(empresa => (

                        <ListItem key={empresa.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                                as={Flex} justifyContent='space-between'  className={styles.empresas}>

                            <Box w={"80"}>      
                                <Text fontSize="xl" color={"#fff"}>{empresa.nomeFantasia}</Text>
                                <Text color={"#fff"}>CNPJ: {empresa.cnpj}</Text>
                            </Box> 
                            
                            <ButtonGroup>
                                <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>}
                                    onClick={() => editarEmpresa(empresa)}>Alterar</Button>
                                    
                                <Button colorScheme="red"  leftIcon={<DeleteIcon/>}
                                onClick={() =>  deletarEmpresa(empresa.codigo)}>Deletar</Button>
                            </ButtonGroup>

                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default EmpresaInterface;