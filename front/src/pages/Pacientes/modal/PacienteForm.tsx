import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Empresa } from "../../../models/Empresa";
import { listarTodasEmpresa } from "../../../services/apiEmpresa";
import { Paciente } from "../../../models/Paciente";
import { alterarPaciente, salvarPaciente } from "../../../services/apiPaciente";

interface PacienteFormProps {
    paciente: Paciente | null;
    isOpen: boolean;
    onClose: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ paciente, isOpen, onClose }) => {
    const [empresaList, setEmpresaList] = useState<Empresa[]>([]);
    const [formData, setFormData] = useState<Omit<Paciente, 'codigo'>>({
        nome: '',
        empresaId: '',
        cpf: '',
        contato: '',
    });

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarTodasEmpresa();
                const empresasOrdenadas = response.data
                    .filter((empresa: Empresa) => empresa.nomeFantasia) 
                    .sort((a: Empresa, b: Empresa) => a.nomeFantasia.localeCompare(b.nomeFantasia));
                setEmpresaList(empresasOrdenadas);
            } catch (error) {
                toast({
                    title: "Erro ao carregar empresas",
                    description: "Não foi possível carregar a lista de empresas.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (paciente) {
            setFormData({
                nome: paciente.nome,
                empresaId: paciente.empresaId,
                cpf: paciente.cpf,
                contato: paciente.contato,
            });
        }
    }, [paciente]);

    // Atualiza formData ao alterar inputs
    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validação do CPF
    const validarCPF = (cpf: string): boolean => {
        
        return cpf.length === 11; 
    };

    const validacao = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validarCPF(formData.cpf)) {
            toast({
                title: "CPF inválido",
                description: "Por favor, insira um CPF válido.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            if (paciente) {
                await alterarPaciente(paciente.codigo, formData);
                toast({
                    title: "Paciente alterado com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await salvarPaciente(formData);
                toast({
                    title: "Paciente cadastrado com sucesso!",
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
                <ModalHeader>{paciente ? 'Alterar Paciente' : 'Cadastrar Paciente'}</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={validacao}>
                    <ModalBody>
                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome do Paciente</FormLabel>
                            <Input type="text" name="nome" value={formData.nome} onChange={handleChangeText} required />
                        </FormControl>

                        <FormControl id="empresaId" mb={5}>
                            <FormLabel>Selecione a Empresa</FormLabel>
                            <Select
                                name="empresaId"
                                placeholder="Escolha uma empresa"
                                value={formData.empresaId}
                                onChange={handleChangeText}
                                required
                            >
                                {empresaList.map((empresa) => (
                                    <option key={empresa.codigo} value={empresa.codigo}>
                                        {empresa.nomeFantasia} - CNPJ: {empresa.cnpj}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl id="cpf" mb={5}>
                            <FormLabel>CPF</FormLabel>
                            <Input type="text" name="cpf" value={formData.cpf} onChange={handleChangeText} required />
                        </FormControl>

                        <FormControl id="contato" mb={5}>
                            <FormLabel>Contato</FormLabel>
                            <Input type="text" name="contato" value={formData.contato} onChange={handleChangeText} required />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            {paciente ? 'Alterar' : 'Cadastrar'}
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default PacienteForm;
