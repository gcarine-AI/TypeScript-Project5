// =============================
// STATE
// =============================
let transacoes = [];
let categoriaSelecionada = null;
// =============================
// HELPERS DOM (STRICT SAFE)
// =============================
function getInput(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`Elemento ${id} não encontrado`);
    return element;
}
function getSelect(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`Elemento ${id} não encontrado`);
    return element;
}
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Elemento ${selector} não encontrado`);
    return element;
}
// =============================
// ELEMENTOS
// =============================
const inputDescricao = getInput("descricao");
const inputValor = getInput("quantidade");
const selectTipo = getSelect("tipo-transacao");
const listaHistorico = getElement(".transacoes_historico");
const btnAdicionar = getElement(".adiciona-historia");
const categorias = document.querySelectorAll(".categorias");
const valorBalanco = getElement("#valor_balanco");
const valorRenda = getElement("#valor_renda");
const valorDespesas = getElement("#valor_despesas");
// =============================
// CATEGORIA CLICK
// =============================
categorias.forEach((cat) => {
    cat.addEventListener("click", () => {
        categorias.forEach((c) => c.classList.remove("ativa"));
        cat.classList.add("ativa");
        const categoria = cat.dataset.categoria;
        if (!categoria)
            return;
        categoriaSelecionada = categoria;
    });
});
// =============================
// EVENTO SUBMIT
// =============================
btnAdicionar.addEventListener("click", (e) => {
    e.preventDefault();
    if (!categoriaSelecionada) {
        alert("Seleciona uma categoria");
        return;
    }
    const descricao = inputDescricao.value.trim();
    const valor = Number(inputValor.value);
    const tipo = selectTipo.value;
    if (!descricao || !valor || isNaN(valor)) {
        alert("Preenche todos os campos corretamente");
        return;
    }
    const novaTransacao = {
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
function adicionarTransacao(transacao) {
    transacoes.push(transacao);
}
function removerTransacao(id) {
    transacoes = transacoes.filter((t) => t.id !== id);
    atualizarUI();
}
function calcularTotais() {
    let totalReceitas = 0;
    let totalDespesas = 0;
    transacoes.forEach((t) => {
        if (t.tipo === "receita") {
            totalReceitas += t.valor;
        }
        else {
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
function atualizarUI() {
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
        const btnRemover = li.querySelector(".remover");
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
function limparFormulario() {
    inputDescricao.value = "";
    inputValor.value = "";
    categoriaSelecionada = null;
    categorias.forEach((c) => c.classList.remove("ativa"));
}
export {};
//# sourceMappingURL=app.js.map