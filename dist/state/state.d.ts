import type Transação from "../interfaces/transacao.js";
import TransaçãoAtualizar from "../interfaces/transacaoAtualizar.js";
export declare function getTransacoes(): Transação[];
export declare function addTransacao(novaTransacao: Transação): void;
export declare function removeTransacao(id: string): void;
export declare function updateTransacao(id: string, dadosAtualizados: TransaçãoAtualizar): void;
//# sourceMappingURL=state.d.ts.map