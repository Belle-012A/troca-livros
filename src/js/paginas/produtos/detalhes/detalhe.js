import './detalhe.css';
import listaDeLivros from '../../../dadosMockados/dados.js';
import { createIcons, icons } from 'lucide';

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[caractere]);
}

function obterIdDaURL() {
  const partesHash = (window.location.hash || '').split('?');
  const parametros = new URLSearchParams(partesHash[1] || '');
  const valorId = parametros.get('id');

  if (valorId === null || valorId.trim() === '') return null;

  const id = Number(valorId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// ANABELLE ----------------------------------------------------------------------
function detalhe(app) {
  const id = obterIdDaURL();

  // find recupera um único exemplar a partir do id recebido no link de
  // resultados. Um endereço sem id válido ou sem registro tem estado vazio
  // próprio, em vez de deixar a tela em branco ou exibir outro livro.
  const livro = id === null
    ? undefined
    : listaDeLivros.find(registro => registro.id === id); 

// ATÉ AQUI ---------------------------------------------------------------------



  if (!livro) {
    app.innerHTML = `
      <section class="detalhe">
        <a class="detalhe__voltar" href="#produtos">
          <i data-lucide="arrow-left"></i>
          <span>Voltar para a biblioteca</span>
        </a>
        <div class="detalhe__nao-encontrado" role="status">
          <i data-lucide="book-x"></i>
          <h1>Livro não encontrado</h1>
          <p>Esse exemplar não está disponível ou o endereço não contém um identificador válido.</p>
          <a class="detalhe__acao-secundaria" href="#buscar">Buscar outro livro</a>
        </div>
      </section>`;
    createIcons({ icons });
    return;
  }

  const titulo = escaparHTML(livro.titulo);
  const disciplina = escaparHTML(livro.disciplina);
  const estado = escaparHTML(livro.conservacao);
  const publicador = escaparHTML(livro.publicadorNome);
  const imagem = escaparHTML(livro.img);
  const descricao = livro.descricao
    ? escaparHTML(livro.descricao)
    : `Exemplar compartilhado por ${publicador} para que outro leitor possa aproveitá-lo.`;
  const local = livro.bairro
    ? escaparHTML(livro.bairro)
    : 'Combine o local da troca com o publicador.';
  const trocaPor = livro.trocaPor
    ? escaparHTML(livro.trocaPor)
    : 'Aberto a propostas de troca.';
  const autor = livro.autor ? escaparHTML(livro.autor) : '';

  app.innerHTML = `
    <section class="detalhe">
      <a class="detalhe__voltar" href="#produtos">
        <i data-lucide="arrow-left"></i>
        <span>Voltar para a biblioteca</span>
      </a>

      <article class="detalhe__cartao">
        <div class="detalhe__resumo">
          <div class="detalhe__capa">
            <img src="${imagem}" alt="Capa de ${titulo}" />
          </div>
          <div class="detalhe__conteudo">
            <span class="detalhe__categoria">${disciplina}</span>
            <h1>${titulo}</h1>
            ${autor ? `<p class="detalhe__autor">Por ${autor}</p>` : ''}
            <p class="detalhe__descricao">${descricao}</p>
          </div>
        </div>

        <dl class="detalhe__informacoes">
          <div class="detalhe__informacao">
            <dt>Conservação</dt>
            <dd>${estado}</dd>
          </div>
          <div class="detalhe__informacao">
            <dt>Edição</dt>
            <dd>${escaparHTML(livro.ano)}</dd>
          </div>
          <div class="detalhe__informacao">
            <dt>Distância aproximada</dt>
            <dd>${escaparHTML(livro.distancia)} m</dd>
          </div>
          <div class="detalhe__informacao">
            <dt>Local da troca</dt>
            <dd>${local}</dd>
          </div>
        </dl>

        <div class="detalhe__troca-info">
          <section class="detalhe__troca">
            <h2>O que o publicador procura</h2>
            <p>${trocaPor}</p>
          </section>

          <div class="detalhe__publicador">
            <span class="detalhe__avatar" aria-hidden="true">
              <i data-lucide="user-round"></i>
            </span>
            <p>Disponibilizado por <strong>${publicador}</strong></p>
          </div>

          <a class="detalhe__acao" href="#enviar">
            <i data-lucide="repeat-2"></i>
            <span>Publicar um livro para trocar</span>
          </a>
        </div>
      </article>
    </section>`;

  createIcons({ icons });
}

export default {
  url: '#detalhe',
  label: '',
  icon: 'book-open',
  pagina: detalhe
};
