import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import imagemManha from "./Sun-Fog--Streamline-Solar.png";
import imagemTarde from "./Cloud-Sun-4--Streamline-Solar.png";
import { Agendamento } from "../../../models/Agendamento";
import { Box, Button, ButtonGroup, Flex, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import AgendamentoForm from "../modal/AgendamentoForm";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deletarAgendamento as deletarAgendamentoAPI, listarTodosAgendamento } from "../../../services/apiAgendamento";

const AgendamentosInterface: React.FC = () => {

    const [agendamentoList, setAgendamentoList] = useState<Agendamento[]>([])
    const [agendamentoAtual, setAgendamentoAtual] = useState<Agendamento | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();
    
        useEffect(() =>{
    
            const fetchData = async () => {
                const response = await listarTodosAgendamento();
                setAgendamentoList(response.data)
            }
    
            fetchData();
    
        }, [])
    
        const cadastrarAgendamento = () =>{
            setAgendamentoAtual(null)
            onOpen()
        }
    
        const deletarAgendamento = async (cpf: string)=>{
    
            const confirmDelete = window.confirm("Você tem certeza que deseja excluir este agendamento?");
            
            if (confirmDelete) {
                try {
                    await deletarAgendamentoAPI(cpf)
                    setAgendamentoList(agendamentoList.filter(agendamento => agendamento.cpf != cpf))
    
                    alert("Excluido com sucesso !")
    
                } catch (error) {
                    alert("Agendamento Possui ligação com outro tabela, não pode excluir !")
                }
            }
        }
    
        const handleCloseModal=()=>{
            onClose()
            setAgendamentoAtual(null)
        }
    
        const editarAgendamento = (agendamento : Agendamento) =>{
            setAgendamentoAtual(agendamento)
            onOpen()
        }

    return(
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh' }}>
            <div className={styles.tittle}>Agendamentos</div>
                
            <div className={styles.alinhamentoCalenButt}>
                <div>calendario</div>

                <button className={styles.buttonAgendamento} style={{ marginLeft: '100px'}} onClick={cadastrarAgendamento}>NOVO AGENDAMENTO</button>
            </div>
            
            <AgendamentoForm agendamento={agendamentoAtual} onClose={handleCloseModal} isOpen={isOpen}/>

            <div className={styles.boxListaAgendamentos}>
                <div className={styles.alinhamentoIconTitlleaAgend}>
                    <img src={imagemManha} width={30} />
                    <div className={styles.tittleListaAgendamen}>Manhã</div>
                </div>

                <div className={styles.alinhamentoSubtittleAgenda}>
                    <div>Horário</div>
                    <div>Empresa / Cliente</div>
                    <div>Exame</div>
                </div>

                <List spacing={3}>
                    { agendamentoList.map(agendamento => (

                        <ListItem key={agendamento.cpf} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                                as={Flex} justifyContent='space-between'  className={styles.empresas}>

                            <Box w={"80"} className={styles.alinhamentoInformacoes}>   
                                <Text fontSize="xl" color={"#fff"}>08:00</Text>   

                                <div className={styles.infEmpresaNome}>
                                    <Text fontSize="18px" style={{width: "280px"}}>{agendamento.nomeEmpresa}</Text>

                                    <Text style={{ margin: "0 5px" }}>/</Text> 

                                    <Text style={{marginLeft: "10px", width: "200px"}}> {agendamento.nome}</Text>
                                </div>

                                <Text color={"#fff"} style={{marginLeft: "90px"}}>{agendamento.tipoConsulta}</Text>
                            </Box> 
                            
                            <ButtonGroup>
                                <Button colorScheme="blue" leftIcon={<EditIcon/>}
                                    onClick={() => editarAgendamento(agendamento)}>Alterar</Button>
                                    
                                <Button colorScheme="red" leftIcon={<DeleteIcon/>}
                                onClick={() =>  deletarAgendamento(agendamento.cpf)}>Deletar</Button>
                            </ButtonGroup>

                        </ListItem>
                    ))}
                </List>
            </div>

            <div className={styles.boxListaAgendamentos}>
                <div className={styles.alinhamentoIconTitlleaAgend}>
                    <img src={imagemTarde} width={30} />
                    <div className={styles.tittleListaAgendamen}>Tarde</div>
                </div>

                <div className={styles.alinhamentoSubtittleAgenda}>
                    <div>Horário</div>
                    <div>Empresa/Cliente</div>
                    <div>Processo</div>
                    <div>Exame</div>
                </div>
            </div>
        </div>
    )
}

export default AgendamentosInterface;