# 📱 YouTube Content Downloader (Mobile)

> **Projeto Acadêmico - Faculdade de Ciências Educacionais de Capim Grosso (FCG)**

Este projeto consiste em uma aplicação móvel completa (Full-Stack) para pesquisa e download de conteúdos do YouTube. [cite_start]Foi desenvolvido como atividade avaliativa solicitada pelo Prof. Clarisvaldo, optando-se por uma abordagem de desenvolvimento customizado em detrimento de plataformas low-code (AppSheets) para garantir maior controle arquitetural e aprendizado técnico[cite: 2, 7, 14, 15, 16].

---

## 🚀 Funcionalidades

O aplicativo permite ao usuário interagir com a API do YouTube para realizar as seguintes ações:

* [cite_start]🔍 **Pesquisa de Vídeos:** Busca de conteúdo utilizando palavras-chave[cite: 20].
* [cite_start]📹 **Download de Vídeo:** Extração e download no formato **MP4**[cite: 21].
* [cite_start]🎵 **Download de Áudio:** Conversão e download no formato **MP3**[cite: 21].
* [cite_start]🖼️ **Download de Capa:** Extração da miniatura (Thumbnail) do vídeo[cite: 22].

---

## 🛠️ Tecnologias Utilizadas

[cite_start]O projeto foi dividido em duas frentes principais: Backend (API) e Frontend (Mobile)[cite: 17, 44].

### Backend
* [cite_start]**Node.js**: Ambiente de execução JavaScript[cite: 17].
* **Express**: (Inferido pela estrutura RESTful).
* [cite_start]**yt-search**: Biblioteca utilizada para o motor de busca dos vídeos[cite: 28].
* [cite_start]**Render**: Plataforma de hospedagem e deploy da API[cite: 29].

### Frontend
* **React Native**: Framework para desenvolvimento móvel.
* [cite_start]**Expo Go**: Plataforma para execução e testes da interface gráfica[cite: 17, 32].

---

## 🔗 Documentação da API

[cite_start]A API foi desenvolvida seguindo o padrão RESTful e está hospedada publicamente em: `https://youtube-dowloader-app.onrender.com`[cite: 25, 29].

| Endpoint | Método | Descrição | Parâmetros (Query) | Exemplo |
| :--- | :---: | :--- | :--- | :--- |
| `/api/yt` | `GET` | Pesquisa vídeos no YouTube. | `q` (Obrigatório) | `?q=Educação Física` |
| `/api/yt/mp3` | `GET` | Baixa o áudio do vídeo. | `url` ou `id` | `?id=4Qw0ycjUPcE` |
| `/api/yt/mp4` | `GET` | Baixa o vídeo completo. | `url` ou `id` | `?id=4Qw0ycjUPcE` |
| `/api/yt/thumbnail`| `GET` | Baixa a imagem de capa. | `url` ou `id` | `?id=4Qw0ycjUPcE` |

[cite_start]*Tabela baseada nos dados do relatório técnico[cite: 28].*

---

## 👥 Autores e Responsabilidades

O projeto foi executado de forma colaborativa, com divisão clara de responsabilidades:

| Integrante | Função | Responsabilidades |
| :--- | :--- | :--- |
| **Jefferson Silva De Souza** | *Backend & Integração* | [cite_start]Desenvolvimento da API em Node.js, configuração de rotas, endpoints de download e integração final entre cliente e servidor (Deploy)[cite: 9, 25, 39]. |
| **Otavio Neto Cerqueira Silva** | *Frontend & UI/UX* | [cite_start]Desenvolvimento da interface gráfica utilizando Expo/React Native, criação do Menu Inicial, Página de Resultados e Visualização[cite: 10, 32]. |

---

## 📅 Histórico de Desenvolvimento

* [cite_start]**26/11/2025:** Início do desenvolvimento do Servidor Backend e da Interface Gráfica[cite: 24, 31].
* [cite_start]**01/12/2025:** Integração entre Frontend e Backend, deploy na Render.com e geração do APK final[cite: 38, 41].

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

---
[cite_start]*Local: Capim Grosso/BA - 2025 [cite: 5, 12]*

***
