import { createIcons, icons } from 'lucide';
import { mapaderotas, naoEncontrada } from './rotas/rotas.js'
import { navbar } from './navbar/navbar.js'

const app = document.getElementById("app")
navbar(mapaderotas)

// ROBERTA ----------------------------------------------------------------
function renderizarPagina() {
    const hashCompleto = window.location.hash || '#buscar'
    const rotaBase = hashCompleto.split('?')[0]
    
    const rota = mapaderotas.find(tela => tela.url === rotaBase)
    console.log(rota)
    if (rota) {
        rota.pagina(app)
    } else {
        naoEncontrada.pagina(app)
    }
}
// ATÉ AQUI ----------------------------------------------------------------

window.addEventListener("hashchange", ()=>{
    renderizarPagina()
})
renderizarPagina()
createIcons({ icons });
