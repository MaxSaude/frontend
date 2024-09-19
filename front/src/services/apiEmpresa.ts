import axios from "axios";
import { Empresa } from "../models/Empresa";


const api = axios.create({
    baseURL: "http://localhost:3333"
})

export const listarTodasEmpresa = async () => {
    return await api.get<Empresa[]>('/buscarEmpresa');
}

export const salvarEmpresa = async (data : Omit<Empresa, 'codigo'>) => {
    return await api.post('/salvarEmpresa', data)
}

export const alterarEmpresa = async (codigo: string, data: Omit<Empresa, 'codigo'>) => {
    return await api.put(`/alterarEmpresa/${codigo}`, data)
}

export const deletarEmpresa = async (codigo: string) => {
    return await api.delete(`/apagarEmpresa/${codigo}`);
}

export const buscarEmpresaCodigo = async (codigo: string) => {
    return await api.get<Empresa>(`/buscarEmpresa/${codigo}`)
}