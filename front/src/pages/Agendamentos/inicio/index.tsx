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
  const [agendamentoList, setAgendamentoList] = useState<Agendamento[]>([]);
  const [agendamentoAtual, setAgendamentoAtual] = useState<Agendamento | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataSelecionada, setDataSelecionada] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await listarTodosAgendamento();
      const agendamentosOrdenados = response.data.sort((a, b) => {
        const horarioA = a.horario.split(":").map(Number);
        const horarioB = b.horario.split(":").map(Number);
        return horarioA[0] - horarioB[0] || horarioA[1] - horarioB[1];
      });
      setAgendamentoList(agendamentosOrdenados);
    };
    fetchData();
  
    const dataHoje = new Date();
    setDataSelecionada(formatarData(dataHoje));
  }, []);
  

  const cadastrarAgendamento = () => {
    setAgendamentoAtual(null);
    onOpen();
  };

  const deletarAgendamento = async (cpf: string) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este agendamento?");
    if (confirmDelete) {
      try {
        await deletarAgendamentoAPI(cpf);
        setAgendamentoList(agendamentoList.filter(agendamento => agendamento.cpf !== cpf));
        alert("Excluido com sucesso!");

      } catch (error) {
        alert("Agendamento possui ligação com outra tabela, não pode excluir!");
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
    setAgendamentoAtual(null);
  };

  const editarAgendamento = (agendamento: Agendamento) => {
    setAgendamentoAtual(agendamento);
    onOpen();
  };

  function formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataSelecionada(event.target.value);
  };

  const compararHorarios = (horario: string, limite: string) => {
    const [hora, minuto] = horario.split(":").map(Number);
    const [limiteHora, limiteMinuto] = limite.split(":").map(Number);
    
    const horaTotal = hora * 60 + minuto;  
    const limiteTotal = limiteHora * 60 + limiteMinuto;  
    
    return horaTotal < limiteTotal;
  };

  return (
    <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh' }}>
      <div className={styles.tittle}>Agendamentos</div>

      <div className={styles.alinhamentoCalenButt}>
        <input type="date" id="data" name="data" value={dataSelecionada} onChange={handleChangeData}/>

        <button className={styles.buttonAgendamento} style={{ marginLeft: '100px' }} onClick={cadastrarAgendamento}> NOVO AGENDAMENTO </button>
      </div>

      <AgendamentoForm agendamento={agendamentoAtual} onClose={handleCloseModal} isOpen={isOpen} />

      {agendamentoList.length === 0 ? (
        <div className={styles.noAgendamentos}>
          <Text className={styles.textSemAgendamento}>Não há agendamentos para o dia selecionado</Text>
        </div>
      ) : (
        <>
        {agendamentoList.some(agendamento => compararHorarios(agendamento.horario, "12:00")) && (            
            <div className={styles.boxListaAgendamentos}>
                <div className={styles.alinhamentoIconTitlleaHorarAgend}>
                <div className={styles.tittleListaAgendamen}>
                    <img src={imagemManha} width={30} />
                    <div style={{ marginLeft: '5px' }}>Manhã</div>
                </div>

                <div className={styles.tittleListaAgendamen} style={{ marginRight: '10px' }}> 08h-12h </div>
                </div>

                <div className={styles.alinhamentoSubtittleAgenda}>
                <div>Horário</div>
                <div>Empresa / Cliente</div>
                <div>Exame</div>
                </div>

                <List spacing={3}>
                {agendamentoList.filter(agendamento => compararHorarios(agendamento.horario, "12:00")).map(agendamento => (
                    <ListItem  key={agendamento.cpf} p={5} shadow="md" borderWidth="1px" borderRadius="md" as={Flex} justifyContent="space-between" className={styles.empresas}>
                    <Box w={"80"} className={styles.alinhamentoInformacoes}>
                        <Text fontSize="17" color={"#fff"}> {agendamento.horario} </Text>

                        <div className={styles.infEmpresaNome}>
                        <Text fontSize="18px" style={{ width: "280px" }}> {agendamento.nomeEmpresa} </Text>

                        <Text style={{ margin: "0 5px" }}>/</Text>

                        <Text style={{ marginLeft: "10px", width: "200px" }}> {agendamento.nome} </Text>
                        </div>

                        <Text className={styles.alinhamentoBoxExame}>{agendamento.tipoConsulta}</Text>
                    </Box>

                    <ButtonGroup>
                        <Button colorScheme="blue" leftIcon={<EditIcon />} onClick={() => editarAgendamento(agendamento)}> Alterar </Button>

                        <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={() => deletarAgendamento(agendamento.cpf)}>  Deletar </Button>
                    </ButtonGroup>
                    </ListItem>
                ))}
                </List>
            </div>
        )}

        {agendamentoList.some(agendamento => !compararHorarios(agendamento.horario, "12:00")) && (
            <div className={styles.boxListaAgendamentos}>
                <div className={styles.alinhamentoIconTitlleaHorarAgend}>
                <div className={styles.tittleListaAgendamen}>
                    <img src={imagemTarde} width={30} />
                    <div>Tarde</div>
                </div>

                <div className={styles.tittleListaAgendamen} style={{ marginRight: '10px' }}> 13:30h-18h </div>
                </div>

                <div className={styles.alinhamentoSubtittleAgenda}>
                <div>Horário</div>
                <div>Empresa/Cliente</div>
                <div>Exame</div>
                </div>

                <List spacing={3}>
                {agendamentoList.filter(agendamento => !compararHorarios(agendamento.horario, "13:30")).map(agendamento => (
                    <ListItem  key={agendamento.cpf} p={5} shadow="md" borderWidth="1px" borderRadius="md" as={Flex} justifyContent="space-between" className={styles.empresas}>
                    <Box w={"80"} className={styles.alinhamentoInformacoes}>
                        <Text fontSize="17" color={"#fff"}> {agendamento.horario} </Text>

                        <div className={styles.infEmpresaNome}>
                        <Text fontSize="18px" style={{ width: "280px" }}> {agendamento.nomeEmpresa} </Text>

                        <Text style={{ margin: "0 5px" }}>/</Text>

                        <Text style={{ marginLeft: "10px", width: "200px" }}> {agendamento.nome} </Text>
                        </div>

                        <Text className={styles.alinhamentoBoxExame}>{agendamento.tipoConsulta}</Text>
                    </Box>

                    <ButtonGroup>
                        <Button colorScheme="blue" leftIcon={<EditIcon />} onClick={() => editarAgendamento(agendamento)}> Alterar </Button>

                        <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={() => deletarAgendamento(agendamento.cpf)}>  Deletar </Button>
                    </ButtonGroup>
                    </ListItem>
                ))}
                </List>
            </div>
        )}
    </>
    )}
    </div>
    
  );
};

export default AgendamentosInterface;
