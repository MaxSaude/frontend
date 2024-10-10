import styles from "./index.module.css";

const Agendamentos = () => {

return(
    <div  className={styles.telaFundo}>
        <h1  className={styles.tittle}>Agenda</h1>

        <div className={styles.alinhamento}>
            <div>calendario</div>
            
            <button  className={styles.buttonCadastrar}>Novo Agendamento</button>
        </div>

        <div>manha</div>

        <div>tarde</div>

    </div>
)
}

export default Agendamentos;