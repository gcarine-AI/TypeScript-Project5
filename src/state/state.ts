import {save, read} from "../storage/storage.js"
import type Transação from "../interfaces/transacao.js";
import TransaçãoAtualizar from "../interfaces/transacaoAtualizar.js";

let listaTransacoes: Transação[] = read();

function perservar (): void {
   return save(listaTransacoes)
};

export function getTransacoes (): Transação[] {
   return [...listaTransacoes]
};

export function addTransacao (novaTransacao: Transação) : void {
   if (!novaTransacao || typeof novaTransacao !== "object") {
    throw new Error("Transação inválida")
}
   listaTransacoes.push(novaTransacao)
   perservar()

};


export function removeTransacao (id: string) : void {
   listaTransacoes = listaTransacoes.filter(transac => transac.id !== id)
   perservar()

};

export function updateTransacao (id: string, dadosAtualizados: TransaçãoAtualizar) : void {
    listaTransacoes = listaTransacoes.map(transac =>
        transac.id === id ? { ...transac, ...dadosAtualizados } : transac
    )
    perservar()
}


