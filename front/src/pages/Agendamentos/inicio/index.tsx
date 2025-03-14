import React from "react";
import styles from "./index.module.css";
import imagemManha from "./Sun-Fog--Streamline-Solar.png";
import imagemTarde from "./Cloud-Sun-4--Streamline-Solar.png";

const AgendamentosInterface: React.FC = () => {

    return(
        <div style={{ backgroundColor: '#A8A8A8', width: '100%', height: '100vh' }}>
            <div className={styles.tittle}>Agendamentos</div>
                
            <div className={styles.alinhamentoCalenButt}>
                <div>calendario</div>

                <button className={styles.buttonAgendamento} style={{ marginLeft: '100px'}}>NOVO AGENDAMENTO</button>
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