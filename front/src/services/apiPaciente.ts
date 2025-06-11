import axios from "axios";
import { Paciente } from "../models/Paciente";


const api = axios.create({
    baseURL: "http://localhost:3333"
})

export const listarTodosPacientes = async () => {
    return await api.get<Paciente[]>('/listarTodosPacientes');
}

export const salvarPaciente = async (data : Omit<Paciente, 'codigo'>) => {
    return await api.post('/salvarPaciente', data)
}

export const alterarPaciente = async (codigo: string, data: Omit<Paciente, 'codigo'>) => {
    return await api.put(`/alterarPaciente/${codigo}`, data)
}

export const deletarPaciente = async (codigo: string) => {
    return await api.delete(`/deletarPaciente/${codigo}`);
}

export const buscarPacienteCodigo = async (codigo: string) => {
    return await api.get<Paciente>(`/buscarPaciente/${codigo}`)
}