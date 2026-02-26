import { save, read } from "../../storage/storage.js";
let listaTransacoes = read();
function perservar() {
    return save(listaTransacoes);
}
;
export function getTransacoes() {
    return [...listaTransacoes];
}
;
export function addTransacao(novaTransacao) {
    if (!novaTransacao || typeof novaTransacao !== "object") {
        throw new Error("Transação inválida");
    }
    listaTransacoes.push(novaTransacao);
    perservar();
}
;
export function removeTransacao(id) {
    listaTransacoes = listaTransacoes.filter(transac => transac.id !== id);
    perservar();
}
;
export function updateTransacao(id, dadosAtualizados) {
    listaTransacoes = listaTransacoes.map(transac => transac.id === id ? { ...transac, ...dadosAtualizados } : transac);
    perservar();
}
//# sourceMappingURL=state.js.map