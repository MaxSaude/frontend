import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { Empresa } from "../../../models/Empresa";
import { useEffect, useState } from "react";
import { alterarEmpresa, salvarEmpresa } from "../../../services/apiEmpresa";

interface EmpresaFormProps {
    empresa: Empresa | null;
    isOpen: boolean;
    onClose: () => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, isOpen, onClose }) => {

    const formatCNPJ = (value: string) => {
        return value
          .replace(/\D/g, '') // remove tudo que não for número
          .replace(/^(\d{2})(\d)/, '$1.$2') // coloca o ponto depois dos 2 primeiros dígitos
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // coloca o segundo ponto
          .replace(/\.(\d{3})(\d)/, '.$1/$2') // coloca a barra
          .replace(/(\d{4})(\d)/, '$1-$2') // coloca o traço
          .slice(0, 18); // limita ao tamanho do CNPJ
      };

    const [formData, setFormData] = useState<Omit<Empresa, 'codigo'>>({
        razaoSocial: '',
        cnpj: '',
        nomeFantasia: ''
    });

    const toast = useToast()

    useEffect(() => {
        if (empresa) {
            setFormData({
                razaoSocial: empresa.razaoSocial,
                cnpj: empresa.cnpj,
                nomeFantasia: empresa.nomeFantasia 
            });
        }
    }, [empresa]);

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = name === "cnpj" ? formatCNPJ(value) : value;
    
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const validacao = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            if (empresa) {
                await alterarEmpresa(empresa.codigo, formData);
                
                toast({
                    title: "Empresa alterada com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await salvarEmpresa(formData);

                toast({
                    title: "Empresa cadastrada com sucesso!",
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
                <ModalHeader>{empresa ? 'Alterar Empresa' : 'Cadastrar Empresa'}</ModalHeader>

                <ModalCloseButton />

                <form onSubmit={validacao}>
                    <ModalBody>
                        <FormControl id="razaoSocial" mb={5}>
                            <FormLabel>Razão Social Empresa</FormLabel>
                            <Input type="text"  name="razaoSocial" value={formData.razaoSocial} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="cnpj" mb={5}>
                            <FormLabel>CNPJ Empresa</FormLabel>
                            <Input type="text" name="cnpj" value={formData.cnpj} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="nomeFantasia" mb={5}>
                            <FormLabel>Nome Fantasia Empresa</FormLabel>
                            <Input type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChangeText} required/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            {empresa ? 'Alterar' : 'Cadastrar'}
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EmpresaForm;
