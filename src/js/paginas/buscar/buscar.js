import './buscar.css';
import { createIcons, icons } from 'lucide';

function buscar(app) {
    app.innerHTML = `
        <div class="container-buscar">
            <header class="hero-secao">
                <h1 class="hero-titulo">Troca de Livros</h1>
                <p class="hero-descricao">
                    Encontre exemplares para seus estudos ou passe adiante livros que você já cursou.
                </p>
            </header>
            
            <section class="secao-busca">
                <form id="form-busca" class="grupo-input">
                    <label for="input-busca" class="icone-busca-label">
                        <i data-lucide="search" id="icone-busca"></i>
                    </label>
                    <input 
                        type="text" 
                        id="input-busca" 
                        placeholder="Buscar por livro ou disciplina..."
                        aria-label="campo busca de livro"
                        autocomplete="off"
                    />
                    <button type="submit" id="btn-busca" title="Buscar livros"> 
                        <i data-lucide="arrow-right"></i>
                    </button>
                </form>
            </section>

            <section class="categorias-busca">
                <div class="cabecalho-categorias">
                    <h2 class="titulo-categorias">Disciplinas</h2>
                </div>

                <ul class="categoria-lista">
                    <li class="lista-categoria" data-categoria="Matemática">
                        <span class="categoria-nome">Matemática</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                    <li class="lista-categoria" data-categoria="Física">
                        <span class="categoria-nome">Física</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                    <li class="lista-categoria" data-categoria="Química">
                        <span class="categoria-nome">Química</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                    <li class="lista-categoria" data-categoria="História">
                        <span class="categoria-nome">História</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                    <li class="lista-categoria" data-categoria="Literatura">
                        <span class="categoria-nome">Literatura</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                    <li class="lista-categoria" data-categoria="Biologia">
                        <span class="categoria-nome">Biologia</span>
                        <span class="categoria-seta"><i data-lucide="arrow-right"></i></span>
                    </li>
                </ul>
            </section>
        </div>
    `;

    adicionarEventos(app);
    createIcons({ icons });
}

function adicionarEventos(app) {
    const formBusca = document.getElementById("form-busca");
    const inputBusca = document.getElementById("input-busca");
    const listaCategoria = document.querySelectorAll(".lista-categoria");

    if (formBusca && inputBusca) {

        // GABRIELA ---------------------------------------------------------------------
        formBusca.addEventListener("submit", (e) => {
            e.preventDefault();
            const termo = inputBusca.value.trim();
            if (termo) {
                window.location.hash = `#produtos?q=${encodeURIComponent(termo)}`;
            } else {
                window.location.hash = "#produtos";
            }
        });
        // ATÉ AQUI ----------------------------------------------------------------------
    }

    listaCategoria.forEach((item) => {
        item.addEventListener("click", () => {
            const categoria = item.getAttribute("data-categoria") || item.textContent.trim();
            window.location.hash = `#produtos?cat=${encodeURIComponent(categoria)}`;
        });
    });
}

export default {
    url: "#buscar",
    label: "buscar",
    icon: "search",
    pagina: buscar
};
