import buscar from '../paginas/buscar/buscar.js'
import produtos from '../paginas/produtos/produtos.js'
import enviar from '../paginas/publicar/enviar.js'
import detalhe from '../paginas/produtos/detalhes/detalhe.js'
import mapa from '../paginas/mapa/mapa.js'
import favorito from '../paginas/favorito/favorito.js'
import conta from '../paginas/conta/conta.js'
import naoEncontrada from '../paginas/naoEncontrada/naoEncontrada.js'

const mapaderotas = [
    buscar,
    produtos,
    detalhe,
    mapa,
    enviar,
    favorito,
    conta
]

export { mapaderotas, naoEncontrada }