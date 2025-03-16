import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Agendamento } from "../../../models/Agendamento";
import { alterarAgendamento, salvarAgendamento } from "../../../services/apiAgendamento";

interface AgendamentoFormProps {
    agendamento: Agendamento | null;
    isOpen: boolean;
    onClose: () => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ agendamento, isOpen, onClose }) => {

    const [formData, setFormData] = useState<Omit<Agendamento, 'cpf'>>({
        nome: '',
        nomeEmpresa: '',
        tipoConsulta: ''
    });

    const toast = useToast()

    useEffect(() => {
        if (agendamento) {
            setFormData({
                nome: agendamento.nome,
                nomeEmpresa: agendamento.nomeEmpresa,
                tipoConsulta: agendamento.tipoConsulta 
            });
        }
    }, [agendamento]);

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    const validacao = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            if (agendamento) {
                await alterarAgendamento(agendamento.cpf, formData);
                
                toast({
                    title: "Agendamento alterado com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await salvarAgendamento(formData);

                toast({
                    title: "Agendamento cadastrado com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            onClose();
            
            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (error) {
            toast({
                title: "Ocorreu um erro",
                description: "Não foi possível realizar a operação.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>{agendamento ? 'Alterar Agendamento' : 'Cadastrar Agendamento'}</ModalHeader>

                <ModalCloseButton />

                <form onSubmit={validacao}>
                    <ModalBody>
                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome pessoa</FormLabel>
                            <Input type="text"  name="nome" value={formData.nome} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="nomeEmpresa" mb={5}>
                            <FormLabel>Nome da Empresa</FormLabel>
                            <Input type="text" name="nomeEmpresa" value={formData.nomeEmpresa} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="nomeEmpresa" mb={5}>
                            <FormLabel>Tipo da Consulta</FormLabel>
                            <Input type="text" name="tipoConsulta" value={formData.tipoConsulta} onChange={handleChangeText} required/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            {agendamento ? 'Alterar' : 'Cadastrar'}
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AgendamentoForm;
