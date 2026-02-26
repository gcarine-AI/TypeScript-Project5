

let categoriaSelecionada: string | null = null;

export function iniciarCategorias(): void {

    const botoes = document.querySelectorAll<HTMLButtonElement>(".categorias");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;
            if (!categoria) {
                return
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

export function getCategoriaSelecionada(): string {
    return categoriaSelecionada ?? "Outros";
}
