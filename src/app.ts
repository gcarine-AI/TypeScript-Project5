import { configurarFormulario, renderLista } from "./userInterface/userIterface.js"

import { iniciarCategorias } from "./categorias/categorias.js"

type TipoTransacao = "receita" | "despesa";

type Categoria =
  | "Alimentação"
  | "Despesas casa"
  | "Salário"
  | "Entretenimento"
  | "Escola"
  | "Outros";

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: Categoria;
  data: Date;
}

// =============================
// STATE
// =============================

let transacoes: Transacao[] = [];
let categoriaSelecionada: Categoria | null = null;

// =============================
// HELPERS DOM (STRICT SAFE)
// =============================

function getInput(id: string): HTMLInputElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Elemento ${id} não encontrado`);
  return element as HTMLInputElement;
}

function getSelect(id: string): HTMLSelectElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Elemento ${id} não encontrado`);
  return element as HTMLSelectElement;
}

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Elemento ${selector} não encontrado`);
  return element as T;
}

// =============================
// ELEMENTOS
// =============================

const inputDescricao = getInput("descricao");
const inputValor = getInput("quantidade");
const selectTipo = getSelect("tipo-transacao");
const listaHistorico = getElement<HTMLUListElement>(".transacoes_historico");
const btnAdicionar = getElement<HTMLButtonElement>(".adiciona-historia");
const categorias = document.querySelectorAll<HTMLDivElement>(".categorias");

const valorBalanco = getElement<HTMLDivElement>("#valor_balanco");
const valorRenda = getElement<HTMLDivElement>("#valor_renda");
const valorDespesas = getElement<HTMLDivElement>("#valor_despesas");

// =============================
// CATEGORIA CLICK
// =============================

categorias.forEach((cat) => {
  cat.addEventListener("click", () => {
    categorias.forEach((c) => c.classList.remove("ativa"));
    cat.classList.add("ativa");

    const categoria = cat.dataset.categoria as Categoria | undefined;
    if (!categoria) return;

    categoriaSelecionada = categoria;
  });
});

// =============================
// EVENTO SUBMIT
// =============================

btnAdicionar.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();

  if (!categoriaSelecionada) {
    alert("Seleciona uma categoria");
    return;
  }

  const descricao = inputDescricao.value.trim();
  const valor = Number(inputValor.value);
  const tipo = selectTipo.value as TipoTransacao;

  if (!descricao || !valor || isNaN(valor)) {
    alert("Preenche todos os campos corretamente");
    return;
  }

  const novaTransacao: Transacao = {
    id: crypto.randomUUID(),
    descricao,
    valor,
    tipo,
    categoria: categoriaSelecionada,
    data: new Date(),
  };

  adicionarTransacao(novaTransacao);
  limparFormulario();
  atualizarUI();
});

// =============================
// FUNÇÕES PRINCIPAIS
// =============================

function adicionarTransacao(transacao: Transacao): void {
  transacoes.push(transacao);
}

function removerTransacao(id: string): void {
  transacoes = transacoes.filter((t) => t.id !== id);
  atualizarUI();
}

function calcularTotais(): {
  saldo: number;
  totalReceitas: number;
  totalDespesas: number;
} {
  let totalReceitas = 0;
  let totalDespesas = 0;

  transacoes.forEach((t) => {
    if (t.tipo === "receita") {
      totalReceitas += t.valor;
    } else {
      totalDespesas += t.valor;
    }
  });

  return {
    saldo: totalReceitas - totalDespesas,
    totalReceitas,
    totalDespesas,
  };
}

// =============================
// RENDER
// =============================

function atualizarUI(): void {
  listaHistorico.innerHTML = "";

  transacoes.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add("linha-transacao", t.tipo);

    li.innerHTML = `
      <span>${t.descricao}</span>
      <span>${t.tipo}</span>
      <span>${t.categoria}</span>
      <span>${t.data.toLocaleDateString()}</span>
      <span>${t.valor.toFixed(2)} €</span>
      <button class="remover">X</button>
    `;

    const btnRemover = li.querySelector<HTMLButtonElement>(".remover");
    if (btnRemover) {
      btnRemover.addEventListener("click", () => {
        removerTransacao(t.id);
      });
    }

    listaHistorico.appendChild(li);
  });

  const { saldo, totalReceitas, totalDespesas } = calcularTotais();

  valorBalanco.textContent = `${saldo.toFixed(2)} €`;
  valorRenda.textContent = `${totalReceitas.toFixed(2)} €`;
  valorDespesas.textContent = `${totalDespesas.toFixed(2)} €`;
}

// =============================
// UTIL
// =============================

function limparFormulario(): void {
  inputDescricao.value = "";
  inputValor.value = "";
  categoriaSelecionada = null;
  categorias.forEach((c) => c.classList.remove("ativa"));
}
