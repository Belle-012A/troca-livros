# Troca-de-livros

> **Projeto em construção.** Este repositório está em desenvolvimento ativo como projeto de estudos (FATEC) e ainda não representa uma versão final.

## Sobre o projeto

O Troca-de-livros é um modelo de aplicação criado com duas frentes de aprendizado em mente:

1. **Desenvolvimento web moderno** — uso de ferramentas atuais de build e um fluxo de trabalho baseado em módulos JavaScript (ES Modules), organização de código em componentes/páginas e boas práticas.
2. **Conceitos de desenvolvimento de aplicativos** — o mesmo código-fonte web é empacotado como um aplicativo mobile nativo (Android/iOS) usando o [Capacitor](https://capacitorjs.com/), permitindo estudar as diferenças entre web e mobile.

A ideia é usar um único projeto para explorar, ao mesmo tempo, o "mundo web" e o "mundo mobile", entendendo onde as duas abordagens se encontram e onde elas divergem.

## Padrão utilizado

O projeto segue uma estrutura simples de **SPA (Single Page Application) em JavaScript puro (vanilla JS)**, sem frameworks como React, Vue ou Angular. Os principais pontos do padrão são:

- **Roteamento por hash**: a navegação entre telas é controlada pelo hash da URL (`#buscar`, `#mapa`, `#enviar`, etc.), interceptado pelo evento `hashchange` em `src/js/main.js`.
- **Páginas como módulos**: cada tela vive em seu próprio arquivo dentro de `src/js/paginas/` e exporta um objeto com sua `url` e uma função `pagina()` responsável por renderizar.
- **Mapa de rotas central**: `src/js/rotas/rotas.js` reúne todas as páginas disponíveis em uma lista única, usada tanto pelo roteador quanto pela navbar.
- **Navbar dinâmica**: o componente em `src/js/navbar/navbar.js` é montado a partir do mesmo mapa de rotas, evitando duplicação entre navegação e páginas.
- **Build com Vite**: o [Vite](https://vitejs.dev/) cuida do bundling e do servidor de desenvolvimento, gerando a pasta `dist/` que o Capacitor usa como `webDir` para empacotar o app nativo.

## Como rodar o projeto

Abaixo está um passo-a-passo completo para clonar, verificar pré-requisitos, instalar dependências e rodar o projeto tanto no navegador (modo web) quanto empacotar como app nativo com Capacitor.

> Observação: estes passos foram escritos para funcionar em Linux, macOS e Windows (com WSL ou terminal compatível). Em Windows, recomenda-se usar o PowerShell ou o Windows Terminal; para desenvolvimento Android, use Android Studio e para iOS use Xcode (macOS obrigatório para iOS).

### 1) Pré-requisitos (ferramentas básicas)

- Git
  - Verifique: `git --version`
  - Instalar: https://git-scm.com/

- Node.js (recomendado: versão LTS atual — ex: 18.x ou 20.x dependendo da data)
  - Verifique: `node --version`
  - npm vem junto com Node: `npm --version`
  - Recomendo usar nvm (Node Version Manager) para instalar/gerenciar versões do Node:
    - nvm (Linux/macOS): https://github.com/nvm-sh/nvm
      - Instalar e usar LTS: `nvm install --lts && nvm use --lts`
    - nvm-windows (Windows): https://github.com/coreybutler/nvm-windows

- (Opcional, para editar código) Editor/IDE: VS Code https://code.visualstudio.com/


### 2) Clonar o repositório

Abra um terminal e execute:

```bash
# clone o repositório oficial (ajuste se usar SSH)
git clone https://github.com/Belle-012A/ki-oferta.git
cd ki-oferta
# caso queira trabalhar na branch específica usada aqui:
git checkout versao-atual
```

### 3) Verificar/instalar dependências do projeto

No diretório do projeto, rode:

```bash
# instalar dependências
npm install ou npm.cmd install no terminal do VS Code
```

Se você preferir instalar versões exatamente como travadas em lockfile (se existir), use `npm ci`.

Se houver erros de permissão em sistemas Unix, evite `sudo` no primeiro passo — prefira corrigir permissões do Node/npm ou usar nvm.

### 4) Rodar em modo desenvolvimento (navegador, com hot-reload)

```bash
npm run dev ou npm.cmd run dev no VS Code
```

- O Vite iniciará um servidor local (por padrão em http://localhost:5173). O terminal mostrará a URL exata.
- Abra a URL no navegador para ver a aplicação com hot-reload.

### 5) Gerar build de produção (gera `dist/`)

```bash
npm run build
```

- A pasta `dist/` conterá os arquivos prontos para produção.

### 6) Pré-visualizar o build em produção localmente

```bash
npm run preview
```

- Isso serve o conteúdo da pasta `dist/` em um servidor local (útil para validar o build antes de empacotar no Capacitor).

### 7) Rodar como app nativo com Capacitor (Android / iOS)

Atenção: o repositório contém dependências do Capacitor, mas talvez não tenha as pastas nativas (`android/`, `ios/`). Os passos abaixo mostram como sincronizar ou inicializar o Capacitor.

1. Gere o build web:

```bash
npm run build
```

2. Sincronize/instale o Capacitor (usar npx para não instalar globalmente):

```bash
# sincroniza web assets para os projetos nativos (se já existirem) ou inicializa o uso local
npx cap sync
```

3. Se ainda não houver projetos nativos e você quiser criar:

```bash
# Inicializa um projeto Capacitor (faça isso apenas uma vez e ajuste appId/appName conforme desejar)
# Exemplo de appId: com.example.kioferta
npx cap init "Ki-Oferta" com.example.kioferta --web-dir=dist

# Adicione Android
npx cap add android
# Ou adicione iOS (apenas em macOS)
npx cap add ios
```

4. Abrir o projeto nativo no IDE correspondente:

```bash
# Abre o Android Studio
npx cap open android
# Abre o Xcode (macOS)
npx cap open ios
```

5. A partir do Android Studio / Xcode você pode compilar e rodar em emulador ou dispositivo real.

Notas importantes sobre Capacitor:
- Certifique-se de ter `webDir` apontando para `dist` no arquivo `capacitor.config.json` (gerado pelo `npx cap init`) ou no `capacitor.config.ts` se existir.
- Se você alterar o código web, rode `npm run build` e depois `npx cap sync` (ou `npx cap copy` + `npx cap open <platform>`).

### 8) Verificações e problemas comuns

- Erro: `node: command not found` → instale o Node.js / use nvm.
- Erro de porta ocupada ao executar `npm run dev` → veja a porta no terminal ou encerre o processo que usa a porta (ex: `lsof -i :5173` / Task Manager no Windows).
- Problemas ao adicionar plataformas Capacitor → verifique se o `@capacitor/cli` está instalado (usar `npx @capacitor/cli` ou `npx cap ...`).
- Caso o projeto tenha dependências quebradas, tente remover `node_modules/` e `package-lock.json` e rodar `npm install` novamente.

### 9) Comandos úteis resumidos

- git clone & branch: `git clone https://github.com/Belle-012A/ki-oferta.git && cd ki-oferta && git checkout versao-atual`
- instalar: `npm install`
- desenvolvimento: `npm run dev` (abrir URL mostrada)
- build de produção: `npm run build`
- preview do build: `npm run preview`
- sincronizar com Capacitor: `npx cap sync`
- adicionar plataforma Android: `npx cap add android` / abrir: `npx cap open android`

## Status

Este é um projeto didático em construção. Funcionalidades, estrutura de pastas e padrões podem mudar conforme o aprendizado avança.
