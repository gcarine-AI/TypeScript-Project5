export default interface TransaçãoAtualizar {
    descricao: string;
    valor: number;
    tipo: "receita" | "despesa";
    categoria: string;
    data: string;
}
