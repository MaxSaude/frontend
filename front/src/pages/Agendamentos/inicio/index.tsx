import React from "react";
import styles from "./index.module.css";
import imagemManha from "./Sun-Fog--Streamline-Solar.png";
import imagemTarde from "./Cloud-Sun-4--Streamline-Solar.png";

const AgendamentosInterface: React.FC = () => {

    const [agendamentoList, setEmpresaList] = useState<Agendamento[]>([])
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

    const deletarAgendamento = async (codigo: string)=>{
    
            const confirmDelete = window.confirm("Você tem certeza que deseja excluir este agendamento?");
            
            if (confirmDelete) {
                try {
                    await deletarAgendamentoAPI(codigo)
                    setAgendamentoList(agendamentoList.filter(agendamento => agendamento.codigo != codigo))
    
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
        <div style={{ backgroundColor: '#A8A8A8', width: '100%', height: '100vh' }}>
            <div className={styles.tittle}>Agendamentos</div>
                
            <div className={styles.alinhamentoCalenButt}>
                <div>calendario</div>

                <button className={styles.buttonAgendamento} style={{ marginLeft: '100px'}} onClick={cadastrarAgendamento}>NOVO AGENDAMENTO</button>
            </div>

            <div className={styles.boxListaAgendamentos}>
                <div className={styles.alinhamentoIconTitlleaAgend}>
                    <img src={imagemManha} width={30} />
                    <div className={styles.tittleListaAgendamen}>Manhã</div>
                </div>

                <div className={styles.alinhamentoSubtittleAgenda}>
                    <div>Horário</div>
                    <div>Empresa/Cliente</div>
                    <div>Processo</div>
                    <div>Exame</div>
                </div>
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