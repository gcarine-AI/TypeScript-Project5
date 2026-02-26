import type Transação from "../interfaces/transacao.js"

export function calcularSaldo(transacoes: Transação []): number {
    return transacoes.reduce((acumulador, transac) => {
        if (transac.tipo === "receita"){
             return acumulador + transac.valor
        } else {
            return acumulador - transac.valor
        } 
    }, 0)
}

export function calcularReceitas(transacoes: Transação []): number {
    return transacoes
        .filter(transac => transac.tipo === "receita")
        .reduce((acumulador, transac) => acumulador + transac.valor, 0)
}

export function calcularDespesas(transacoes: Transação []): number {
    return transacoes
        .filter(transac => transac.tipo === "despesa")
        .reduce((acumulador, transac) => acumulador + transac.valor, 0)
}


