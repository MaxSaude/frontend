import styles from "./index.module.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Dashboard = () => {

return(
    <>
        <div className={styles.box}>
            <div className={styles.boxLogo}>
                <div className={styles.logo}>MaxSaúde</div>
            </div>

            <div className={styles.linha}/>

            <div className={styles.boxTexts}>
                <div>
                    <HomeOutlinedIcon/>
                    <button className={styles.texts}>Inicio</button>
                </div>
                <button className={styles.texts}>Fianceiro</button>
                <button className={styles.texts}>Agendamentos</button>
                <button className={styles.texts}>Preços</button>
                <button className={styles.texts}>Empresas</button>
            </div>
        </div>
    </>
)

}

export default Dashboard;