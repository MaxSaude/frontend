import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFolderOpen, faStore, faDollarSign, faCoins, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

const Dashboard = () => {

return(
    <>
        <div className={styles.box}>
            <div className={styles.boxLogo}>
                <div className={styles.logo}>MaxSaúde</div>
            </div>

            <div className={styles.linha}/>

            <div className={styles.boxTexts}>
                <button className={styles.espacamentos}>
                    <FontAwesomeIcon icon={faHouse} color="#fff" style={{ marginRight: '10px' }}/>
                    <div className={styles.texts}>Inicio</div>
                </button>

                <button className={styles.espacamentos}>
                <FontAwesomeIcon icon={faCoins} color="#fff" style={{ marginRight: '10px' }}/>  
                    <div className={styles.texts}>Financeiro</div>
                </button>

                <button className={styles.espacamentos}>
                    <FontAwesomeIcon icon={faFolderOpen} color="#fff" style={{ marginRight: '10px' }}/>
                    <div className={styles.texts}>Agendamentos</div>
                </button>

                <button className={styles.espacamentos}>
                    <FontAwesomeIcon icon={faDollarSign} color="#fff" style={{ marginRight: '10px' }}/>
                    <div className={styles.texts}>Preços</div>
                </button>

                <button className={styles.espacamentos}>
                    <FontAwesomeIcon icon={faStore} color="#fff" style={{ marginRight: '10px' }}/>
                    <div className={styles.texts}>Empresas</div>
                </button>
            </div>

            <button className={styles.buttonDesconectar}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginRight: '10px' }}/>
                <div>Desconectar</div>
            </button>
        </div>
    </>
)

}

export default Dashboard;