import {  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Agendamento } from "../../../models/Agendamento";
import { alterarAgendamento, salvarAgendamento } from "../../../services/apiAgendamento";
import { Empresa } from "../../../models/Empresa";
import { listarTodasEmpresa } from "../../../services/apiEmpresa";
import { Paciente } from "../../../models/Paciente";
import { listarTodosPacientes } from "../../../services/apiPaciente";

interface AgendamentoFormProps {
    agendamento: Agendamento | null;
    isOpen: boolean;
    onClose: () => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ agendamento, isOpen, onClose }) => {

    const [empresaList, setEmpresaList] = useState<Empresa[]>([])
    const [pacienteList, setPacienteList] = useState<Paciente[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listarTodasEmpresa();
            const empresasOrdenadas = response.data.sort((a: Empresa, b: Empresa) =>
                a.nomeFantasia.localeCompare(b.nomeFantasia)
            );
            setEmpresaList(empresasOrdenadas);

            const responsePaciente = await listarTodosPacientes();
            const pacientesOrdenados = responsePaciente.data.sort((a: Paciente, b: Paciente) =>
                a.nome.localeCompare(b.nome)
            );
            setPacienteList(pacientesOrdenados);
        };
    
        fetchData();
    }, []);

    const [formData, setFormData] = useState<Omit<Agendamento, 'cpf'>>({
        nome: '',
        nomeEmpresa: '',
        tipoConsulta: '',
        data: '',
        horario: '',
    });

    const toast = useToast()

    useEffect(() => {
        if (agendamento) {
            setFormData({
                nome: agendamento.nome,
                nomeEmpresa: agendamento.nomeEmpresa,
                tipoConsulta: agendamento.tipoConsulta,
                data: agendamento.data,
                horario: agendamento.horario 
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
                            <FormLabel>Nome Paciente</FormLabel>
                            <Select
                                placeholder="Escolha um paciente"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                            >
                                {pacienteList.map((paciente) => (
                                <option key={paciente.codigo} value={paciente.codigo}>
                                    {paciente.nome} - CPF: {paciente.cpf}
                                </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl id="nomeEmpresa" mb={5}>
                            <FormLabel>Selecione a Empresa</FormLabel>
                            <Select
                                placeholder="Escolha uma empresa"
                                value={formData.nomeEmpresa}
                                onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                                required
                            >
                                {empresaList.map((empresa) => (
                                <option key={empresa.codigo} value={empresa.codigo}>
                                    {empresa.nomeFantasia} - CNPJ: {empresa.cnpj}
                                </option>
                                ))}
                            </Select>
                            </FormControl>

                        <FormControl id="tipoConsulta" mb={5}>
                            <FormLabel>Tipo da Consulta</FormLabel>
                            <Input type="text" name="tipoConsulta" value={formData.tipoConsulta} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="data" mb={5}>
                            <FormLabel>Data</FormLabel>
                            <Input type="date" name="data" value={formData.data} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="horario" mb={5}>
                            <FormLabel>Horario</FormLabel>
                            <Input type="time" name="horario" value={formData.horario} onChange={handleChangeText} required/>
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
