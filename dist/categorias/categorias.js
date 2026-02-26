let categoriaSelecionada = null;
export function iniciarCategorias() {
    const botoes = document.querySelectorAll(".categorias");
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;
            if (!categoria) {
                return;
            }
            if (categoriaSelecionada === categoria) {
                botao.classList.remove("ativa");
                categoriaSelecionada = null;
                return;
            }
            botoes.forEach(b => b.classList.remove("ativa"));
            botao.classList.add("ativa");
            categoriaSelecionada = categoria;
        });
    });
}
export function getCategoriaSelecionada() {
    return categoriaSelecionada !== null && categoriaSelecionada !== void 0 ? categoriaSelecionada : "Outros";
}
//# sourceMappingURL=categorias.js.map