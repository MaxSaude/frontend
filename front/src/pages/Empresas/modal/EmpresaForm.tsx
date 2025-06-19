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
        nomeFantasia: '',
        telefone: '',
        cidade: '',
        bairro: '',
        estado: '',
        endereco: '',
        numero: '',
        complemento: '',
    });

    const toast = useToast()

    useEffect(() => {
        if (empresa) {
            setFormData({
                razaoSocial: empresa.razaoSocial,
                cnpj: empresa.cnpj,
                nomeFantasia: empresa.nomeFantasia,
                telefone: empresa.telefone,
                cidade: empresa.cidade,
                bairro: empresa.bairro,
                estado: empresa.estado,
                endereco: empresa.endereco,
                numero: empresa.numero,
                complemento: empresa.complemento,
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

            <ModalContent maxW="800px">
                <ModalHeader>{empresa ? 'Alterar Empresa' : 'Cadastrar Empresa'}</ModalHeader>

                <ModalCloseButton />

                <form onSubmit={validacao}>
                    <ModalBody>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <FormControl id="razaoSocial" mb={5}>
                                <FormLabel>Razão Social Empresa</FormLabel>
                                <Input type="text" placeholder="Ex: Empresa LTDA" name="razaoSocial" value={formData.razaoSocial} onChange={handleChangeText} required/>
                            </FormControl>

                            <FormControl id="nomeFantasia" mb={5}>
                                <FormLabel>Nome Fantasia Empresa</FormLabel>
                                <Input type="text" placeholder="Ex: Empresa" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChangeText} required/>
                            </FormControl>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <FormControl id="cnpj" mb={5}>
                                <FormLabel>CNPJ</FormLabel>
                                <Input type="text" placeholder="Ex: 00.000.000/0000-00" name="cnpj" value={formData.cnpj} onChange={handleChangeText} required/>
                            </FormControl>

                            <FormControl id="telefone" mb={5}>
                                <FormLabel>Telefone</FormLabel>
                                <Input type="text" placeholder="Ex: (00) 00000-0000" name="telefone" value={formData.telefone} onChange={handleChangeText} required/>
                            </FormControl>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <FormControl id="estado" mb={5}>
                                <FormLabel>Estado</FormLabel>
                                <Input type="text" placeholder="Ex: PR" name="estado" value={formData.estado} onChange={handleChangeText} required/>
                            </FormControl>

                            <FormControl id="cidade" mb={5}>
                                <FormLabel>Cidade</FormLabel>
                                <Input type="text" placeholder="Ex: Francisco Beltrão" name="cidade" value={formData.cidade} onChange={handleChangeText} required/>
                            </FormControl>

                            <FormControl id="bairro" mb={5}>
                                <FormLabel>Bairro</FormLabel>
                                <Input type="text" placeholder="Ex: Centro" name="bairro" value={formData.bairro} onChange={handleChangeText} required/>
                            </FormControl>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <FormControl id="endereco" mb={5}>
                                <FormLabel>Endereço</FormLabel>
                                <Input type="text" placeholder="Ex: Rua das Flores" name="endereco" value={formData.endereco} onChange={handleChangeText} required/>
                            </FormControl>

                            <FormControl id="numero" mb={5}>
                                <FormLabel>Número</FormLabel>
                                <Input type="text" placeholder="Ex: 00" name="numero" value={formData.numero} onChange={handleChangeText} required/>
                            </FormControl>
                        </div>

                        <FormControl id="complemento" mb={5}>
                            <FormLabel>Complemento</FormLabel>
                            <Input type="text" placeholder="Ex: Sala 5, Bloco B" name="complemento" value={formData.complemento} onChange={handleChangeText} />
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
