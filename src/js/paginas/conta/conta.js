import './conta.css';
import listaDeLivros from '../../dadosMockados/dados.js'
import { entrar, sair, usuarioAtual } from '../../sessao/sessao.js'

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[caractere])
}

function publicacoesDoUsuario(idUsuario) {
  return listaDeLivros.filter(livro => livro.publicadorId === idUsuario)
}

function renderizarLogin(app) {
  app.innerHTML = `
    <section class="conta">
      <header class="conta__cabecalho">
        <h1>Minha conta</h1>
        <p class="conta__subtitulo">Entre para consultar suas publicações de livros.</p>
      </header>

      <form id="form-login" class="conta__formulario">
        <label class="conta__campo" for="email">
          E-mail
          <input id="email" name="email" type="email" autocomplete="email" required>
        </label>

        <label class="conta__campo" for="senha">
          Senha
          <input id="senha" name="senha" type="password" autocomplete="current-password" required>
        </label>

        <p class="conta__ajuda">
          Acesso de demonstração: lucas@trocalivros.com · senha 1234
        </p>
        <p id="erro-login" class="conta__erro" aria-live="polite"></p>
        <button class="conta__botao" type="submit">Entrar</button>
      </form>
    </section>`

  document.getElementById('form-login').addEventListener('submit', evento => {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    const usuario = entrar(dados.get('email').trim(), dados.get('senha'))

    if (!usuario) {
      document.getElementById('erro-login').textContent = 'E-mail ou senha inválidos.'
      return
    }

    renderizarConta(app)
  })
}

function renderizarConta(app) {
  const usuario = usuarioAtual()
  if (!usuario) {
    renderizarLogin(app)
    return
  }

  const publicacoes = publicacoesDoUsuario(usuario.id)

  app.innerHTML = `
    <section class="conta">
      <header class="conta__cabecalho">
        <h1>Minha conta</h1>
        <p class="conta__subtitulo">Seus dados e os livros que você disponibilizou para troca.</p>
      </header>

      <section class="conta__painel">
        <h2>${escaparHTML(usuario.nome)}</h2>
        <p class="conta__email">${escaparHTML(usuario.email)}</p>
        <button id="btn-sair" class="conta__botao conta__botao--sair" type="button">Sair</button>
      </section>

      <section class="conta__publicacoes">
        <h2>Meus livros para troca</h2>
        ${publicacoes.length === 0
          ? '<p class="conta__vazio">Você ainda não publicou livros para troca.</p>'
          : `<div class="conta__lista">
              ${publicacoes.map(livro => `
                <a class="conta__item" href="#detalhe?id=${encodeURIComponent(livro.id)}">
                  <strong>${escaparHTML(livro.titulo)}</strong>
                  <span class="conta__detalhe-livro">
                    ${escaparHTML(livro.disciplina)} · ${escaparHTML(livro.conservacao)} · edição ${escaparHTML(livro.ano)}
                  </span>
                </a>`).join('')}
             </div>`}
      </section>
    </section>`

  document.getElementById('btn-sair').addEventListener('click', () => {
    sair()
    renderizarLogin(app)
  })
}

function conta(app) {
  renderizarConta(app)
}

export default {
  url: '#conta',
  label: 'conta',
  icon: 'circle-user-round',
  pagina: conta
}

/*
 * Arquivo original recebido da branch desatualizada, mantido integralmente
 * como comentário para registrar a versão comercial substituída. A tela ativa
 * acima usa o catálogo e os campos de livros do projeto atual.
 *
 * import listaDeProdutos from '../dadosMockados/dados.js'
 * import { entrar, sair, usuarioAtual } from '../sessao/sessao.js'
 *
 * function publicacoesDoUsuario(idUsuario) {
 *   return listaDeProdutos.filter(produto =>
 *     produto.usuarioId === idUsuario || produto.publicadorId === idUsuario
 *   )
 * }
 *
 * function renderizarLogin(app) {
 *   app.innerHTML = `
 *     <section class="conta">
 *       <header class="conta__cabecalho">
 *         <h1>Minha conta</h1>
 *         <p class="conta__subtitulo">Entre para consultar suas publicações.</p>
 *       </header>
 *
 *       <form id="form-login" class="conta__formulario">
 *         <label class="conta__campo" for="email">
 *           E-mail
 *           <input id="email" name="email" type="email" autocomplete="email" required>
 *         </label>
 *
 *         <label class="conta__campo" for="senha">
 *           Senha
 *           <input id="senha" name="senha" type="password" autocomplete="current-password" required>
 *         </label>
 *
 *         <p id="erro-login" class="conta__erro" aria-live="polite"></p>
 *         <button class="conta__botao" type="submit">Entrar</button>
 *       </form>
 *     </section>`
 *
 *   document.getElementById('form-login').addEventListener('submit', evento => {
 *     evento.preventDefault()
 *     const dados = new FormData(evento.currentTarget)
 *     const usuario = entrar(dados.get('email').trim(), dados.get('senha'))
 *
 *     if (!usuario) {
 *       document.getElementById('erro-login').textContent = 'E-mail ou senha inválidos.'
 *       return
 *     }
 *
 *     renderizarConta(app)
 *   })
 * }
 *
 * function renderizarConta(app) {
 *   const usuario = usuarioAtual()
 *   if (!usuario) {
 *     renderizarLogin(app)
 *     return
 *   }
 *
 *   const publicacoes = publicacoesDoUsuario(usuario.id)
 *
 *   app.innerHTML = `
 *     <section class="conta">
 *       <header class="conta__cabecalho">
 *         <h1>Minha conta</h1>
 *         <p class="conta__subtitulo">Dados do usuário e publicações enviadas.</p>
 *       </header>
 *
 *       <section class="conta__painel">
 *         <h2>${usuario.nome}</h2>
 *         <p class="conta__email">${usuario.email}</p>
 *         <button id="btn-sair" class="conta__botao conta__botao--sair" type="button">Sair</button>
 *       </section>
 *
 *       <section class="conta__publicacoes">
 *         <h2>Minhas publicações</h2>
 *         ${publicacoes.length === 0
 *           ? '<p class="conta__vazio">Você ainda não possui publicações.</p>'
 *           : `<div class="conta__lista">
 *               ${publicacoes.map(produto => `
 *                 <article class="conta__item">
 *                   <strong>${produto.nome}</strong>
 *                   <span class="conta__preco">R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</span>
 *                 </article>`).join('')}
 *              </div>`}
 *       </section>
 *     </section>`
 *
 *   document.getElementById('btn-sair').addEventListener('click', () => {
 *     sair()
 *     renderizarLogin(app)
 *   })
 * }
 *
 * function conta(app) {
 *   renderizarConta(app)
 * }
 *
 * export default {
 *   url: '#conta',
 *   label: 'conta',
 *   icon: 'circle-user-round',
 *   pagina: conta
 * }
 */
