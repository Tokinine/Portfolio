<div align="center">

<img src="public/favicon.svg" alt="Toki" width="72" height="72">

# Portfolio

**Full-stack, bots & protocoles reverse-engineerés.**
*Mon portfolio en ligne : projets, stacks et contact.*

<br>

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

[Contenu](#-contenu) · [Démarrage](#-démarrage) · [Structure](#-structure) · [Déploiement](#-déploiement)

</div>

---

## ✨ Contenu

| Section | Description |
|---|---|
| **Hero** | titre animé, mains et rubans, rendu WebGL |
| **Projets** | TokiBot, JKPLM, Local Shield, LocalDownload, LocalScan : une vignette et une phrase par projet |
| **Stacks** | grille d'icônes (Bash, Chrome, Cloudflare, Discord, discord.js, Express, GitHub Actions, GitHub Pages…) |
| **Contact** | « Une idée, un projet ? » |

Animations au défilement (apparitions), navigation fluide.

## 🚀 Démarrage

```bash
npm install
npm run dev        # serveur de développement Vite
npm run build      # build de production
npm run preview    # prévisualiser le build
```

Seule dépendance de développement : **Vite**. Aucun framework.

## 📁 Structure

```text
Portfolio/
├── index.html
├── vite.config.js
├── public/              favicon
├── src/
│   ├── main.js          point d'entrée
│   ├── hero.js · gl.js · ribbons.js · mercury.js · background.js   rendu du hero
│   ├── nav.js · reveal.js                                           navigation, apparitions
│   ├── projects.js · stacks.js                                      données des sections
│   ├── runtime.js · chrome.js
│   ├── style.css
│   ├── fonts/
│   └── assets/          images des projets, icônes des stacks, mains
└── .github/workflows/deploy.yml
```

## 🧩 Déploiement

```mermaid
flowchart LR
  SRC["src/"] -- "vite build" --> DIST["dist/"]
  DIST -- "GitHub Actions<br/>deploy.yml" --> WEB(["Site en ligne"])
```

Chaque push déclenche le workflow `.github/workflows/deploy.yml`.

## 🔗 Projets présentés

| Projet | Description |
|---|---|
| **TokiBot** | bots temps réel pour JKLM.fun |
| **JKPLM** | jeu de mots multijoueur |
| **Local Shield** | bloqueur de publicités et de traqueurs |
| **LocalDownload** | détecteur de médias |
| **LocalScan** | lecteur de scans local |

---

<div align="center">
<sub>Fait par <a href="https://github.com/Tokinine">Tokinine</a></sub>
</div>
