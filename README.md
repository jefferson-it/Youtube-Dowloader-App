# YouTube Content Downloader (Mobile)

> **Projeto Acadêmico — Faculdade de Ciências Educacionais de Capim Grosso (FCG)**

Aplicativo mobile Full-Stack desenvolvido para pesquisa e download de conteúdos do YouTube, criado como atividade avaliativa proposta pelo **Prof. Clarisvaldo**. O projeto opta por uma abordagem totalmente personalizada, em vez de ferramentas low-code, visando aprofundar o aprendizado técnico e garantir maior controle sobre a arquitetura.

---

## Funcionalidades

O aplicativo permite ao usuário interagir diretamente com a API do YouTube por meio de uma API própria, oferecendo:

* 🔍 **Pesquisa de Vídeos** – Busca de conteúdo utilizando palavras-chave.
* 📹 **Download de Vídeo (MP4)** – Extração do vídeo no formato MP4.
* 🎵 **Download de Áudio (MP3)** – Conversão direta para áudio.
* 🖼️ **Download de Thumbnail** – Obtenção da imagem de capa do vídeo.

---

## 🛠️ Tecnologias Utilizadas

O sistema foi dividido em duas partes principais: **Backend (API)** e **Frontend (Mobile)**.

### **Backend**

* **Node.js** – Ambiente de execução JavaScript.
* **Express** – Estrutura para criação de rotas RESTful.
* **yt-search** – Motor de busca para localizar vídeos no YouTube.
* **Render** – Plataforma utilizada para hospedagem e deploy da API.

### **Frontend**

* **React Native** – Framework para desenvolvimento mobile multiplataforma.
* **Expo Go** – Ferramenta para execução, testes e empacotamento do aplicativo.

---

## Documentação da API

A API está disponível publicamente em:

```
https://youtube-dowloader-app.onrender.com
```

### **Endpoints Disponíveis**

| Endpoint            | Método | Descrição                   | Parâmetros (Query) | Exemplo              |
| ------------------- | :----: | --------------------------- | ------------------ | -------------------- |
| `/api/yt`           |  `GET` | Pesquisa vídeos no YouTube. | `q` (obrigatório)  | `?q=Educação Física` |
| `/api/yt/mp3`       |  `GET` | Download do áudio (MP3).    | `url` ou `id`      | `?id=4Qw0ycjUPcE`    |
| `/api/yt/mp4`       |  `GET` | Download do vídeo (MP4).    | `url` ou `id`      | `?id=4Qw0ycjUPcE`    |
| `/api/yt/thumbnail` |  `GET` | Download da thumbnail.      | `url` ou `id`      | `?id=4Qw0ycjUPcE`    |

---

## Equipe e Responsabilidades

| Integrante                      | Função               | Principais Atividades                                                                                               |
| ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Jefferson Silva de Souza**    | Backend & Integração | Desenvolvimento da API, criação de endpoints de download, estruturação do servidor e deploy na Render.              |
| **Otavio Neto Cerqueira Silva** | Frontend & UI/UX     | Desenvolvimento da interface com React Native/Expo, criação das telas de navegação, busca e exibição dos conteúdos. |

---

## Linha do Tempo do Desenvolvimento

* **26/11/2025** — Início do desenvolvimento do backend e prototipação da interface.
* **01/12/2025** — Integração completa entre frontend e backend, deploy do servidor e geração do APK final.

---

## Licença

Projeto desenvolvido exclusivamente para fins educacionais.

---

**Capim Grosso — BA, 2025**
