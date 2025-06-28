import styles from "./inicio.module.css";
import imgExame from "../../../assets/imgExame.png";
import imgPlano from "../../../assets/imgPlano.png";

const ValoresInterface: React.FC = () => {

    return (
        <div>
            <h1 className={styles.tittle}>Valores</h1>

            <div className={styles.containerExame}>
                <img src={imgExame} className={styles.imgExame}/>

                <div className={styles.valoresExames}>
                    <div className={styles.subTittle}>Exames</div>

                    <div className={styles.tamanhoExames}>
                        <div className={styles.alinhamentoExames}>
                            <div>Consulta Admissional</div>
                            <div>R$50,00</div>
                            
                        </div>

                        <div className={styles.linha}/>

                        <div className={styles.alinhamentoExames}>
                            <div>Consulta Demissional</div>
                            <div>R$50,00</div>
                        </div>

                        <div className={styles.linha}/>

                        <div className={styles.alinhamentoExames}>
                            <div>Consulta Periódico</div>
                            <div>R$50,00</div>
                        </div>

                        <div className={styles.linha}/>

                        <div className={styles.alinhamentoExames}>
                            <div>Consulta Visão</div>
                            <div>R$120,00</div>
                        </div>

                        <div className={styles.linha}/>

                        <div className={styles.alinhamentoExames}>
                            <div>Consulta Toxicológico</div>
                            <div>R$150,00</div>
                        </div>

                        <div className={styles.linha}/>

                    </div>
                </div>
            </div>

            <div className={styles.containerExame}>
                <img src={imgPlano} className={styles.imgExame}/>

                <div className={styles.valoresExames}>
                    <div className={styles.subTittle}>Plano Empresarial Mensal</div>

                    <div className={styles.PlanoMensal}>                        
                        <div className={styles.textsPlano}>Todos os Exames Inclusos</div>

                        <div className={styles.linha}/>

                        <div className={styles.textsPlano}>R$580,00</div>                        
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ValoresInterface;