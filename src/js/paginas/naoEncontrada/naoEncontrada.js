import './naoEncontrada.css';

// ROBERTA ----------------------------------------------------------------
function naoEncontrada(app) {
  app.innerHTML = `
    <section class="nao-encontrada">
      <span class="nao-encontrada__codigo">404</span>
      <h1>Rota inexistente</h1>
      <p>A página informada não foi encontrada.</p>
      <a class="nao-encontrada__link" href="#buscar">Voltar ao início</a>
    </section>`
}
// ATÉ AQUI ----------------------------------------------------------------

export default {
  url: '#nao-encontrada',
  label: '',
  icon: '',
  pagina: naoEncontrada
}
