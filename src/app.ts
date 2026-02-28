import { configurarFormulario, renderLista } from "./userInterface/userIterface.js"

import { iniciarCategorias } from "./categorias/categorias.js"

configurarFormulario();
renderLista();

iniciarCategorias();

const data = document.querySelector(".calendario") as HTMLElement;

if (!data) {
    throw new Error("Elemento de data não encontrado");
};

data.innerHTML = new Date().toLocaleDateString() 




