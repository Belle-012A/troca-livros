import './enviar.css';
import listaDeLivros from '../../dadosMockados/dados.js';

// O perfil fixo identifica o publicador da demonstração sem simular um login
// ou criar uma sessão. O id e o nome existem nos registros mockados atuais.
const publicadorDaDemonstracao = listaDeLivros[0];

// ANABELLE ----------------------------------------------------------------------
function normalizarTexto(valor) {
  return valor.trim().replace(/\s+/g, ' ');
}
// ATÉ AQUI ---------------------------------------------------------------------

function publicar(app) {
  app.innerHTML = `
    <section class="publicacao">
      <header class="publicacao__topo">
        <a class="publicacao__voltar" href="#produtos" aria-label="Voltar para a biblioteca">
          <i data-lucide="arrow-left"></i>
          <span>Biblioteca</span>
        </a>
        <h1>Compartilhe um livro</h1>
        <p>Conte como está o exemplar e o que gostaria de receber em troca.</p>
      </header>

      <form class="publicacao__formulario" id="form-publicacao">
        <div class="publicacao__campo">
          <label for="titulo-livro">Título do livro</label>
          <input id="titulo-livro" name="titulo" type="text"
                 minlength="3" maxlength="120" autocomplete="off" required>
        </div>

        <div class="publicacao__campo">
          <label for="autor-livro">Autor ou autora</label>
          <input id="autor-livro" name="autor" type="text"
                 maxlength="100" autocomplete="name" required>
        </div>

        <div class="publicacao__linha">
          <div class="publicacao__campo">
            <label for="disciplina-livro">Disciplina</label>
            <select id="disciplina-livro" name="disciplina" required>
              <option value="" selected disabled>Escolha uma disciplina</option>
              <option>Matemática</option>
              <option>Física</option>
              <option>Química</option>
              <option>História</option>
              <option>Literatura</option>
              <option>Biologia</option>
              <option>Outro</option>
            </select>
          </div>
          <div class="publicacao__campo">
            <label for="conservacao-livro">Conservação</label>
            <select id="conservacao-livro" name="conservacao" required>
              <option value="" selected disabled>Selecione o estado</option>
              <option>Novo</option>
              <option>Excelente</option>
              <option>Seminovo</option>
              <option>Usado</option>
            </select>
          </div>
        </div>

        <div class="publicacao__linha">
          <div class="publicacao__campo">
            <label for="ano-livro">Ano da edição</label>
            <input id="ano-livro" name="ano" type="number"
                   min="1900" max="2100" step="1" inputmode="numeric" required>
          </div>
          <div class="publicacao__campo">
            <label for="distancia-livro">Distância aproximada (m)</label>
            <input id="distancia-livro" name="distancia" type="number"
                   min="0" max="100000" step="1" value="500"
                   inputmode="numeric" required>
          </div>
        </div>

        <div class="publicacao__campo">
          <label for="bairro-livro">Bairro para combinar a troca</label>
          <input id="bairro-livro" name="bairro" type="text"
                 maxlength="80" autocomplete="address-level3" required>
        </div>

        <div class="publicacao__campo">
          <label for="descricao-livro">Descrição do exemplar</label>
          <textarea id="descricao-livro" name="descricao" rows="3"
                    maxlength="400" placeholder="Conte sobre anotações, marcações ou detalhes importantes."></textarea>
        </div>

        <div class="publicacao__campo">
          <label for="troca-livro">O que gostaria de receber?</label>
          <input id="troca-livro" name="trocaPor" type="text"
                 maxlength="120" placeholder="Ex.: um livro de Literatura">
        </div>

        <p class="publicacao__perfil">
          Publicação de demonstração por
          <strong>${publicadorDaDemonstracao.publicadorNome}</strong>.
        </p>

        <button class="publicacao__botao" type="submit">
          <i data-lucide="book-plus"></i>
          Publicar livro
        </button>
        <p class="publicacao__mensagem" id="mensagem-publicacao"
           role="status" aria-live="polite"></p>
      </form>
    </section>`;

  const formulario = document.getElementById('form-publicacao');
  formulario.addEventListener('submit', evento => {
    evento.preventDefault();

    // O navegador verifica required, minlength, limites e tipos antes de
    // disparar submit. FormData reúne os valores já aprovados pelo formulário.
    const dados = new FormData(formulario);
    const titulo = normalizarTexto(dados.get('titulo'));
    const autor = normalizarTexto(dados.get('autor'));
    const mensagem = document.getElementById('mensagem-publicacao');

    // find compara o título normalizado sem diferenciar maiúsculas nem espaços
    // repetidos. Os livros iniciais não registram autoria, então o título é a
    // chave comum disponível para também recusar repetidos da lista mockada.

  
  // ANABELLE -------------------------------------------------------------------------------------------
    const repetido = listaDeLivros.find(livro =>
      normalizarTexto(livro.titulo).toLocaleLowerCase('pt-BR') === titulo.toLocaleLowerCase('pt-BR')
    );

    if (repetido) {
      mensagem.textContent = 'Este título já está na biblioteca. Confira os dados ou abra o exemplar existente.';
      mensagem.classList.add('publicacao__mensagem--erro');
      return;
    }

// ATÉ AQUI -------------------------------------------------------------------------------------------

    // push adiciona o exemplar aos dados mockados em memória. O id seguinte
    // mantém cada registro identificável e o publicador referencia um perfil
    // válido da demonstração; não há backend nem promessa de persistência.
    const novoLivro = {
      id: Math.max(0, ...listaDeLivros.map(livro => livro.id)) + 1,
      titulo,
      autor,
      disciplina: normalizarTexto(dados.get('disciplina')),
      conservacao: normalizarTexto(dados.get('conservacao')),
      ano: Number(dados.get('ano')),
      distancia: Number(dados.get('distancia')),
      bairro: normalizarTexto(dados.get('bairro')),
      descricao: normalizarTexto(dados.get('descricao') || ''),
      trocaPor: normalizarTexto(dados.get('trocaPor') || ''),
      publicadorId: publicadorDaDemonstracao.publicadorId,
      publicadorNome: publicadorDaDemonstracao.publicadorNome,
      img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=480&q=80',
    };

    // ANABELLE -------------------------------------------------------------------------------------------
    listaDeLivros.push(novoLivro);
    // ATÉ AQUI -------------------------------------------------------------------------------------------

    mensagem.classList.remove('publicacao__mensagem--erro');
    mensagem.textContent = `“${novoLivro.titulo}” foi adicionado à biblioteca. `;
    const linkDetalhe = document.createElement('a');
    linkDetalhe.href = `#detalhe?id=${novoLivro.id}`;
    linkDetalhe.textContent = 'Ver detalhes do livro';
    mensagem.append(linkDetalhe);
    formulario.reset();
  });
}

export default {
  url: '#enviar',
  label: 'Publicar',
  icon: 'book-plus',
  pagina: publicar
};
