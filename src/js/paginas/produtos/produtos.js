import './produtos.css';
import listaDeLivros from '../../dadosMockados/dados.js';
import { createIcons, icons } from 'lucide';

let ordenacaoAtual = 'distancia';

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[caractere]);
}

function obterParametrosURL() {
    const hash = window.location.hash || '';
    const partes = hash.split('?');
    if (partes.length < 2) return { termo: '', categoria: '' };
    
    const params = new URLSearchParams(partes[1]);
    return {
        termo: (params.get('q') || '').trim(),
        categoria: (params.get('cat') || '').trim()
    };
}

// GABRIELA ----------------------------------------------------------------------------------------
function filtrarLivros(termo, categoria) {
    return listaDeLivros.filter((livro) => {
        const termoBusca = termo.toLowerCase();
        const categoriaFiltro = categoria.toLowerCase();

        const bateCategoria = !categoria || livro.disciplina.toLowerCase() === categoriaFiltro;

        const bateTermo = !termo || 
            livro.titulo.toLowerCase().includes(termoBusca) ||
            (livro.autor || '').toLowerCase().includes(termoBusca) ||
            livro.disciplina.toLowerCase().includes(termoBusca) ||
            livro.conservacao.toLowerCase().includes(termoBusca);

        return bateCategoria && bateTermo;
    });
} // ATÉ AQUI ----------------------------------------------------------------------------------------

function ordenarLivros(livros, criterio) {
    const copia = [...livros];
    if (criterio === 'ano') {
        return copia.sort((a, b) => b.ano - a.ano);
    }
    return copia.sort((a, b) => a.distancia - b.distancia);
}

function produtos(app) {

    // GABRIELA ----------------------------------------------------------------------------------------
    const { termo, categoria } = obterParametrosURL();
    const livrosFiltrados = filtrarLivros(termo, categoria);
    const livrosOrdenados = ordenarLivros(livrosFiltrados, ordenacaoAtual);
    // ATÉ AQUI ----------------------------------------------------------------------------------------

    const valorInput = termo || (categoria ? categoria : '');

    app.innerHTML = `
        <div class="container-resultados">
            <section class="secao-pesquisa-topo">
                <form id="form-busca-topo" class="form-busca-topo">
                    <span class="icone-busca-topo">
                        <i data-lucide="search"></i>
                    </span>
                    <input 
                        type="text" 
                        id="input-busca-topo" 
                        class="input-busca-topo"
                        placeholder="Buscar por livro ou disciplina..."
                        aria-label="campo busca de livro"
                        value="${escaparHTML(valorInput)}"
                        autocomplete="off"
                    />
                    ${
                        valorInput 
                            ? `<button type="button" id="btn-limpar-busca-topo" class="btn-limpar-topo" title="Limpar busca">
                                 <i data-lucide="x"></i>
                               </button>`
                            : ''
                    }
                    <button type="submit" class="btn-pesquisar-topo" title="Pesquisar">
                        <i data-lucide="arrow-right"></i>
                    </button>
                </form>
            </section>

            <header class="barra-controles">
                <span class="total-registros">
                    <i data-lucide="book-open"></i>
                    ${livrosFiltrados.length} ${livrosFiltrados.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                </span>

                <div class="controle-ordenacao">
                    <label for="select-ordenacao" class="label-ordenacao">Ordenar:</label>
                    <div class="select-wrapper">
                        <select id="select-ordenacao" class="select-ordenacao" aria-label="Critério de ordenação">
                            <option value="distancia" ${ordenacaoAtual === 'distancia' ? 'selected' : ''}>Mais próximos</option>
                            <option value="ano" ${ordenacaoAtual === 'ano' ? 'selected' : ''}>Mais recentes</option>
                        </select>
                        <span class="select-icone">
                            <i data-lucide="chevron-down"></i>
                        </span>
                    </div>
                </div>
            </header>

            <main class="lista-livros" id="lista-livros-conteiner">
                ${
                    livrosFiltrados.length === 0
                        ? `
                        <div class="estado-vazio">
                            <div class="estado-vazio-icone">
                                <i data-lucide="book-open"></i>
                            </div>
                            <h2 class="estado-vazio-titulo">Nenhum livro encontrado</h2>
                            <p class="estado-vazio-texto">
                                Não encontramos exemplares para o filtro aplicado. Tente pesquisar por outro título ou matéria.
                            </p>
                            <a href="#buscar" class="btn-voltar-inicio">
                                <i data-lucide="arrow-left"></i> Fazer nova busca
                            </a>
                        </div>
                        `
                        : livrosOrdenados.map((livro) => `
                            <a href="#detalhe?id=${livro.id}" class="card-livro" title="Ver detalhes do livro">
                                <div class="card-livro-capa">
                                    <img src="${escaparHTML(livro.img)}" alt="Capa de ${escaparHTML(livro.titulo)}" loading="lazy" />
                                </div>
                                <div class="card-livro-conteudo">
                                    <span class="card-livro-disciplina">${escaparHTML(livro.disciplina)}</span>
                                    <h3 class="card-livro-titulo">${escaparHTML(livro.titulo)}</h3>
                                    <div class="card-livro-detalhes">
                                        <span class="tag-conservacao">${escaparHTML(livro.conservacao)}</span>
                                        <span>Ed. ${escaparHTML(livro.ano)}</span>
                                    </div>
                                    <div class="card-livro-rodape">
                                        <span class="card-livro-distancia">
                                            <i data-lucide="map-pin"></i> ${escaparHTML(livro.distancia)}m de você
                                        </span>
                                        <span class="card-livro-publicador">Por: ${escaparHTML(livro.publicadorNome)}</span>
                                    </div>
                                </div>
                            </a>
                        `).join('')
                }
            </main>
        </div>
    `;

    adicionarEventos(app);
    createIcons({ icons });
}

function adicionarEventos(app) {
    const formBuscaTopo = document.getElementById('form-busca-topo');
    const inputBuscaTopo = document.getElementById('input-busca-topo');
    const btnLimparTopo = document.getElementById('btn-limpar-busca-topo');
    const selectOrdenacao = document.getElementById('select-ordenacao');

    if (formBuscaTopo && inputBuscaTopo) {
        formBuscaTopo.addEventListener('submit', (e) => {
            e.preventDefault();
            const novoTermo = inputBuscaTopo.value.trim();
            if (novoTermo) {
                window.location.hash = `#produtos?q=${encodeURIComponent(novoTermo)}`;
            } else {
                window.location.hash = '#produtos';
            }
        });
    }

    if (btnLimparTopo) {
        btnLimparTopo.addEventListener('click', () => {
            window.location.hash = '#produtos';
        });
    }

    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', (e) => {
            ordenacaoAtual = e.target.value;
            produtos(app);
        });
    }
}

export default { 
    url: "#produtos",
    label: "Biblioteca",
    icon: "library",
    pagina: produtos
};