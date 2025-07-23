import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { Agendamento } from "../../models/Agendamento";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import imagemManha from '../../assets/imagemManha.png';
import imagemTarde from "../../assets/imagemTarde.png";
import { Empresa } from "../../models/Empresa";
import { Paciente } from "../../models/Paciente";
import { listarTodosAgendamento } from "../../services/apiAgendamento";
import { listarTodosPacientes } from "../../services/apiPaciente";
import { listarTodasEmpresa } from "../../services/apiEmpresa";

const Home = () => {
    const [agendamentoList, setAgendamentoList] = useState<Agendamento[]>([]);
      const [empresas, setEmpresas] = useState<Empresa[]>([]);
      const [pacientes, setPacientes] = useState<Paciente[]>([]);

    const compararHorarios = (horario: string, limite: string) => {
    const [hora, minuto] = horario.split(":").map(Number);
    const [limiteHora, limiteMinuto] = limite.split(":").map(Number);
    
    const horaTotal = hora * 60 + minuto;  
    const limiteTotal = limiteHora * 60 + limiteMinuto;  
    
    return horaTotal < limiteTotal;
  };

  const [dataSelecionada, setDataSelecionada] = useState(() => {
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  return hoje.toISOString().split("T")[0];
  });

  useEffect(() => {
      const fetchData = async () => {
        if (!dataSelecionada) return;
    
        try {
          const response = await listarTodosAgendamento();
          const agendamentosFiltrados = response.data.filter(
            (agendamento) => agendamento.data === dataSelecionada
          );
    
          const agendamentosOrdenados = agendamentosFiltrados.sort((a, b) =>
            a.horario.localeCompare(b.horario)
          );
    
          setAgendamentoList(agendamentosOrdenados);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error);
        }
      };
          fetchData();
  }, [dataSelecionada]);

  useEffect(() => {
      const buscarEmpresas = async () => {
        try {
          const response = await listarTodasEmpresa();
          setEmpresas(response.data); 
        } catch (error) {
          console.error("Erro ao buscar empresas:", error);
        }
      };
    
      buscarEmpresas();
  
      const buscarPacientes = async () => {
        try {
          const response = await listarTodosPacientes();
          setPacientes(response.data); 
        } catch (error) {
          console.error("Erro ao buscar pacientes:", error);
        }
      };
  
      buscarPacientes();
    }, []);
    

    return(
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '100vh', overflowY: 'auto'}}>
      <div className={styles.tittle}>Agendamentos do dia</div>

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
                <div>Empresa / Paciente</div>
                <div>Exame</div>
                </div>

                <List spacing={3}>
                  {agendamentoList .filter(agendamento => compararHorarios(agendamento.horario, "12:00")) .map(agendamento => {
                      const empresa = empresas.find(e => e.codigo === agendamento.nomeEmpresa);
                      const paciente = pacientes.find(e => e.codigo === agendamento.nome);

                      return (
                        <ListItem key={agendamento.cpf} p={5} shadow="md" borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between"  className={styles.empresas}>
                          <Box w={"80"} className={styles.alinhamentoInformacoes}>
                            <Text fontSize="17" color={"#fff"}>
                              {agendamento.horario}
                            </Text>

                            <div className={styles.infEmpresaNome}>
                              <Text fontSize="18px" flex="1" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                {empresa?.razaoSocial || "Empresa não encontrada"}
                              </Text>

                              <Text style={{ margin: "0 5px" }}>/</Text>

                              <Text style={{ marginLeft: "10px", width: "150px" }}>
                                {paciente?.nome || "Paciente não encontrado"}
                              </Text>
                            </div>
                            
                          </Box>

                          <Text className={styles.alinhamentoBoxExame} style={{ marginRight: '240px' }}>{agendamento.tipoConsulta}</Text>
                        </ListItem>
                      );
                    })}
                </List>
            </div>
        )}

            <div className={styles.boxListaAgendamentos}>
              <div className={styles.alinhamentoIconTitlleaHorarAgend}>
              <div className={styles.tittleListaAgendamen}>
                  <img src={imagemTarde} width={30} />
                  <div style={{ marginLeft: '5px' }}>Tarde</div>
              </div>

              <div className={styles.tittleListaAgendamen} style={{ marginRight: '10px' }}> 13:30h-18h </div>
              </div>

              <div className={styles.alinhamentoSubtittleAgenda}>
              <div>Horário</div>
              <div>Empresa / Paciente</div>
              <div>Exame</div>
              </div>

              <List spacing={3}>  
                {agendamentoList.filter(agendamento => !compararHorarios(agendamento.horario, "13:30")).map(agendamento => {
                  const empresa = empresas.find(e => e.codigo === agendamento.nomeEmpresa);
                  const paciente = pacientes.find(e => e.codigo === agendamento.nome);

                  return (
                    <ListItem key={agendamento.cpf} p={5} shadow="md" borderWidth="1px" borderRadius="md" as={Flex} justifyContent="space-between" className={styles.empresas}>
                      <Box w={"80"} className={styles.alinhamentoInformacoes}>
                        <Text fontSize="17" color={"#fff"}> {agendamento.horario} </Text>

                        <div className={styles.infEmpresaNome}>
                          <Text fontSize="18px" flex="1" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                            {empresa?.razaoSocial || "Empresa não encontrada"}
                          </Text>

                          <Text style={{ margin: "0 5px" }}>/</Text>

                          <Text style={{ marginLeft: "10px", width: "150px" }}>
                            {paciente?.nome || "Paciente não encontrado"}
                          </Text>
                        </div>

                        <Text className={styles.alinhamentoBoxExame}>{agendamento.tipoConsulta}</Text>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </div>
    </>
    )}
    </div>
    )
}

export default Home