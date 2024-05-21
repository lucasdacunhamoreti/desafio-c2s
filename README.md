# Desafio C2S
> Aplicação feita em React Native utilizando expo para visualização de usuários utilizando a biblioteca `randomuser`.
> Este projeto foi desenvolvido como parte de um teste técnico, com foco em apresentar habilidades em React Native e na integração com APIs externas.
> 
## 💻 Projeto

Este projeto tem como objetivo listar usuários utilizando dados da API Random User. Na tela principal, é exibida uma lista de usuários que é carregada incrementalmente ao rolar para o final da página. Cada card de usuário exibe informações básicas, como foto, nome, gênero e data de nascimento.

## 💻 Funcionalidades

- Listagem de Usuários: A tela principal exibe uma lista de usuários, carregando mais 20 usuários ao atingir o final da página.
- Informações do Usuário no Card: Cada card exibe a foto, nome, gênero e data de nascimento do usuário.
- Filtro de Pesquisa: Pesquisa por nome e sobrenome.
- Filtro por Gênero: Botão para filtrar usuários por gênero (masculino, feminino).
- Modal com Detalhes do Usuário: Ao clicar em um card, um modal é aberto com informações detalhadas do usuário, incluindo:
- Imagem
- Nome completo
- Email
- Gênero
- Data de nascimento
- Telefone
- Nacionalidade
- Endereço
- ID (Número de identificação)
- Splash Screen: Logo especificada no teste é exibida como tela de carregamento inicial.

## 🚀 Tecnologias utilizadas
> Este projeto foi desenvolvido com as seguintes tecnologias:

- React Native: Para a construção da interface do usuário.
- Expo: Para simplificar o desenvolvimento e a execução do projeto.
- AsyncStorage: Para armazenamento em cache dos dados da primeira página, melhorando a experiência do usuário ao reabrir o aplicativo.
- Random User API: Para obtenção dos dados dos usuários.

## 📌 Como Executar o Projeto

Clone o repositório:
```bash
git clone git@github.com:lucasdacunhamoreti/desafio-c2s.git
```

Acesse a pasta do projeto:
```bash
cd desafio-c2s
```

Instale as dependências do projeto:
```bash
npm install
```

Execute a aplicação:
```bash
npm start
```

Para abrir o aplicativo é necessário ter o aplicativo `Expo Go` instalado, nele você poderá escanear o QR Code para abrir o aplicativo.

## 📌 Melhorias futuras

- Paginação Avançada: Implementar paginação mais robusta para melhorar a performance e a experiência do usuário.
- Teste Unitário: Adicionar testes unitários para garantir a qualidade do código.
- Melhorias na UI/UX: Refinar a interface do usuário e a experiência de uso com base no feedback dos usuários.
- Internacionalização: Adicionar suporte a múltiplos idiomas.

