import axios from "axios";
import { Agendamento } from "../models/Agendamento";


const api = axios.create({
    baseURL: "http://localhost:3333"
})

export const listarTodosAgendamento = async () => {
    return await api.get<Agendamento[]>('/listarTodosAgendamento');
}

export const salvarAgendamento = async (data : Omit<Agendamento, 'cpf'>) => {
    return await api.post('/salvarAgendamento', data)
}

export const alterarAgendamento = async (cpf: string, data: Omit<Agendamento, 'cpf'>) => {
    return await api.put(`/alterarAgendamento/${cpf}`, data)
}

export const deletarAgendamento = async (cpf: string) => {
    return await api.delete(`/deletarAgendamento/${cpf}`);
}

export const buscarAgendamentoCpf = async (cpf: string) => {
    return await api.get<Agendamento>(`/buscarAgendamento/${cpf}`)
}