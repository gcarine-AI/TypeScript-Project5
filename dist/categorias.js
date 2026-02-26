let categoriaSelecionada = null;
export function iniciarCategorias() {
    const botoes = document.querySelectorAll(".categorias");
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            if (categoriaSelecionada === botao.dataset.categoria) {
                botao.classList.remove("ativa");
                categoriaSelecionada = null;
                return;
            }
            botoes.forEach(b => b.classList.remove("ativa"));
            botao.classList.add("ativa");
            categoriaSelecionada = botao.dataset.categoria;
        });
    });
}
export function getCategoriaSelecionada() {
    return categoriaSelecionada ?? "Outros";
}
//# sourceMappingURL=categorias.js.map