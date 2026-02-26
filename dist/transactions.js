import { Transação } from "../transactions.js";

export function calcularSaldo(transacoes) {
    return transacoes.reduce((acumulador, transac) => {
        if (transac.tipo === "receita") {
            return acumulador + transac.valor;
        }
        else {
            return acumulador - transac.valor;
        }
    }, 0);
}
export function calcularReceitas(transacoes) {
    return transacoes
        .filter(transac => transac.tipo === "receita")
        .reduce((acumulador, transac) => acumulador + transac.valor, 0);
}
export function calcularDespesas(transacoes) {
    return transacoes
        .filter(transac => transac.tipo === "despesa")
        .reduce((acumulador, transac) => acumulador + transac.valor, 0);
}
//# sourceMappingURL=transactions.js.map