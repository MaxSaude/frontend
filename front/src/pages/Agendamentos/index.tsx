import React from "react";
import styles from "./index.module.css";
const AgendamentosInterface: React.FC = () => {

    return(
        <div>
            <h1 className={styles.tittle}>Agendamentos</h1>

            <div className={styles.alinhamentoCalenAgend}>
                <div>calendario</div>

                <button className={styles.buttonAgendamento}>NOVO AGENDAMENTO</button>
            </div>
        </div>
    )
}

export default AgendamentosInterface;