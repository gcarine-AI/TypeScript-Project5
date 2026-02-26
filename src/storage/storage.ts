import type Transação from "../interfaces/transacao.js"

const CHAVE_TRANSACOES = "ChaveTransacoes"

export function save (transacoes:Transação[]):void {
   if (!Array.isArray(transacoes)) {
      throw new Error ("Espera-se um array de transações")
   }

   const convertJson = JSON.stringify(transacoes)
   localStorage.setItem(CHAVE_TRANSACOES, convertJson)
}   
   

export function read () {
   const lerTransacoes = (localStorage.getItem(CHAVE_TRANSACOES))
   if (lerTransacoes !== null) {
      return JSON.parse(lerTransacoes) as Transação []
   } else { 
      return []
   }
} 


