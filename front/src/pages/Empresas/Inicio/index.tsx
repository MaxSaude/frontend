import { useDisclosure } from "@chakra-ui/react";
import { Empresa } from "../../../models/Empresa";
import { deletarEmpresa, listarTodasEmpresa } from "../../../services/apiEmpresa";
import { useEffect, useState } from "react";

const EmpresaInterface: React.FC = () => {

    const [empresaList, setIesList] = useState<Empresa[]>([])
    const [empresaAtual, setEmpresaAtual] = useState<Empresa | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasEmpresa();
            setIesList(response.data)
        }

        fetchData();

    }, [])

    const cadastrarEmpresa = () =>{
        setEmpresaAtual(null)
        onOpen()
    }

    const deletarEmpresa = async (codigo: string)=>{
        
        try {

            await deletarEmpresa(codigo)
            setIesList(empresaList.filter(empresa => empresa.codigo != codigo))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("Empresa Possui ligação com outro tabela, não pode excluir !")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setEmpresaAtual(null)
    }

    const editarEmpresa = (empresa : Empresa) =>{
        setEmpresaAtual(empresa)
        onOpen()
    }

    return (
        <div>
            <div>Tela Empresas</div>
            <button onClick={cadastrarEmpresa}>Cadastar</button>
        </div>
    )
}

export default EmpresaInterface;