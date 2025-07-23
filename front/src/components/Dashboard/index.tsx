import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFolderOpen, faStore, faDollarSign, faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

return(
    <>
        <div className={styles.alinhamentoComPags}>
    
            <div className={styles.box}>
                <div className={styles.boxLogo}>
                    <div className={styles.logo}>MaxSaúde</div>
                </div>

                <div className={styles.linha}/>

                <div className={styles.boxTexts}>
                    <Link to="/inicio" className={styles.espacamentos}>
                        <FontAwesomeIcon icon={faHouse} color="#fff" style={{ marginRight: '10px' }}/>
                        <div className={styles.texts}>Inicio</div>
                    </Link>

                    <Link to="/agendamentos" className={styles.espacamentos}>
                        <FontAwesomeIcon icon={faFolderOpen} color="#fff" style={{ marginRight: '10px' }}/>
                        <div className={styles.texts}>Agendamentos</div>
                    </Link>

                    <Link to="/valores" className={styles.espacamentos}>
                        <FontAwesomeIcon icon={faDollarSign} color="#fff" style={{ marginRight: '10px' }}/>
                        <div className={styles.texts}>Preços</div>
                    </Link>

                    <Link to="/empresas" className={styles.espacamentos} >
                        <FontAwesomeIcon icon={faStore} color="#fff" style={{ marginRight: '10px' }}/>
                        <div className={styles.texts}>Empresas</div>
                    </Link>

                    <Link to="/paciente" className={styles.espacamentos} >
                        <FontAwesomeIcon icon={faUser} color="#fff" style={{ marginRight: '10px' }}/>
                        <div className={styles.texts}>Pacientes</div>
                    </Link>
                    
                </div>

                <button className={styles.buttonDesconectar}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginRight: '10px' }}/>
                    <div>Desconectar</div>
                </button>
            </div>

            <Outlet />
        </div>
        
    </>
)

}

export default Dashboard;