import type Transação from "../interfaces/transacao.js";



import { getTransacoes, addTransacao, removeTransacao } from "../state/state.js"
import { calcularSaldo, calcularReceitas, calcularDespesas } from "../Operations/transactions.js";
import { getCategoriaSelecionada } from "../categorias/categorias.js";
import { updateTransacao } from "../state/state.js";



   const CONTAINER = document.querySelector<HTMLDivElement>(".transacoes_historico");

   const balancoTotal = document.querySelector<HTMLDivElement>("#valor_balanco")
   const rendaTotal = document.querySelector<HTMLDivElement>("#valor_renda")
   const despesasTotal = document.querySelector<HTMLDivElement>("#valor_despesas")
   const infoDespesas = document.querySelector<HTMLDivElement>("#info_despesas")


   const form = document.querySelector<HTMLFormElement>(".form-container")
   const descricaoInput = document.querySelector<HTMLInputElement>("#descricao")
   const valorInput = document.querySelector<HTMLInputElement>("#quantidade")
   const tipoSelect = document.querySelector<HTMLSelectElement>("#tipo-transacao")

   const botaoAdicionar = document.querySelector<HTMLButtonElement>(".adiciona-historia");

    let idEdicao: string | null  = null;

   export function renderLista(): void {
    if (!CONTAINER) return

    const transacoes: Transação [] = getTransacoes();

    CONTAINER.innerHTML = "";

    transacoes.forEach(transac => {
        const linha = document.createElement("div");
        linha.classList.add("linha-transacao");
        linha.classList.add(transac.tipo === "receita" ? "receita" : "despesa");

        linha.innerHTML = ` 
            <span>${transac.descricao}</span>
            <span>${transac.tipo}</span>
            <span>${transac.categoria ?? "Sem categoria"}</span>
            <span>${transac.data}</span>
            <span>${formatarMoeda(transac.valor)}</span>
        `;

        const editButton = document.createElement("button");
        editButton.classList.add("editar");
        editButton.innerHTML = "&#9998";


        editButton.addEventListener("click", () => {
            carregarFormularioEdicao(transac);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("remover");
        deleteButton.innerText = "x";

        deleteButton.addEventListener("click", function() {
            if(confirm("Deseja realmente remover esta transação?")) {
            removeTransacao(transac.id);
            renderLista();
            } 
        });

    
        linha.appendChild(editButton);
        linha.appendChild(deleteButton);
        CONTAINER.appendChild(linha)

    });

    actualizarCards(transacoes)
   }

   function carregarFormularioEdicao (transac: Transação) : void{

    if (!descricaoInput) {
        return 
    }

    if (!valorInput) {
        return 
    }

    if (!tipoSelect) {
        return
    }


    descricaoInput.value = transac.descricao;
    valorInput.value = transac.valor.toString();
    tipoSelect.value = transac.tipo;

   

    idEdicao = transac.id;

    if (!botaoAdicionar) {
        return
    }
    botaoAdicionar.innerText = "Guardar alteração";
   }

   function calcularVariacaoPercentual(atual: number, anterior:number) {
    if (anterior === 0) return 0;
   

    return ((atual - anterior) / anterior) * 100;
}




   export function actualizarCards (transacoes: Transação []): void {
    const saldo = calcularSaldo(transacoes);

    if (!balancoTotal) {
        return
    }

    if (!rendaTotal) {
        return
    }

    if (!despesasTotal) {
        return
    }

    balancoTotal.innerText = formatarMoeda(saldo)
    rendaTotal.innerText = formatarMoeda(calcularReceitas(transacoes))
    despesasTotal.innerText = formatarMoeda(calcularDespesas(transacoes))

    balancoTotal.classList.remove("positivo", "negativo")

    if (saldo > 0) {
        balancoTotal.classList.add("positivo")
    } else if (saldo < 0) {
        balancoTotal.classList.add("negativo")
    }
    
    const despesasAtuais = calcularDespesas(transacoes);
    const despesasAnteriores = 2000;
    const variacao = calcularVariacaoPercentual(despesasAtuais, despesasAnteriores);

    if (!infoDespesas) return;

    if (variacao < 0) {
        infoDespesas.innerText = `${variacao.toFixed(1)}% redução`;
    } else {
        infoDespesas.innerText = `+${variacao.toFixed(1)}% aumento`;
    }
}
   

   export function configurarFormulario(): void {
    if (!botaoAdicionar) return;
    if (!form) return;
      botaoAdicionar.addEventListener("click", adicionarTransacaoFormulario);

      form.addEventListener("submit", event => {
        event.preventDefault()
     
    });
   }

      function adicionarTransacaoFormulario(){
        if (!descricaoInput || !valorInput || !tipoSelect ) return;
    
        const descricao = descricaoInput.value.trim();
        const valor = parseFloat(valorInput.value);
        const tipo = tipoSelect.value;
           if (tipo !== "receita" && tipo !== "despesa") {
            return;
        }

        const categoria = getCategoriaSelecionada();


        if (!descricao || isNaN(valor) || valor < 0 || !categoria) {
            mostrarErroFormulario();
            return;
        }


        if (idEdicao !== null) {


            updateTransacao(idEdicao, {
                descricao,
                valor,
                tipo,
                categoria,
                data: new Date().toLocaleDateString("pt-PT")
            });

        if (!botaoAdicionar) {
            return
        }
        idEdicao = null;
        botaoAdicionar.innerText = "Adicionar ao histórico";
        } else {
            const novaTransacao: Transação = {
            id: Date.now().toString(),
            descricao,
            valor,
            tipo,
            categoria: categoria|| "Outros",
            data: new Date().toLocaleDateString("pt-PT", { day: '2-digit', month: '2-digit', year: 'numeric' })
            
        };
            addTransacao(novaTransacao);
        }



       // addTransacao(novaTransacao)
        limparFormulario()
        renderLista()
    }

function mostrarErroFormulario(): void {
    const form = document.querySelector<HTMLDivElement>(".nova-transacao");

    if (!form) return

    form.classList.add("erro");

    setTimeout(() => {
        form.classList.remove("erro");
    }, 400);

    setTimeout (() => {
        alert ("Preencha todos os campos corretamente!")
    }, 350);
    
}

function limparFormulario(): void {
    if (!descricaoInput || !valorInput || !tipoSelect) return
    descricaoInput.value = "";
    valorInput.value = "";
    tipoSelect.value = "receita";

    document.querySelectorAll(".categorias").forEach(b => b.classList.remove("ativa"));
}




function formatarMoeda(valor: number) : string {
    return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

  
    

        
 




