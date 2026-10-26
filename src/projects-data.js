import tokibot from './assets/projects/tokibot.webp'
import syllabomb from './assets/projects/syllabomb.webp'
import localshield from './assets/projects/localshield.webp'
import mediasniffer from './assets/projects/mediasniffer.webp'
import localscan from './assets/projects/localscan.webp'
import tokibotHd from './assets/projects/hd/tokibot.webp'
import syllabombHd from './assets/projects/hd/syllabomb.webp'
import localshieldHd from './assets/projects/hd/localshield.webp'
import mediasnifferHd from './assets/projects/hd/mediasniffer.webp'

// demo : capture faite avec des données de démonstration ; hd : capture plein format [src, largeur, hauteur]
export const projects=[
  {
    slug:'tokibot',name:'TokiBot',line:'Bots temps réel pour JKLM.fun',img:tokibot,
    type:'Écosystème de bots',hd:[tokibotHd,2400,1343],
    lede:'Jouer, modérer et administrer des rooms JKLM.fun depuis un seul dépôt, lancé par une seule commande.',
    role:'Conception et développement',status:'Dépôt privé',
    overview:[
      'TokiBot réunit tout ce qu’il faut pour jouer, modérer et administrer des rooms JKLM.fun : un bot BombParty, un bot PopSauce, un serveur de dictionnaires, un panel d’administration et un bot Discord.',
      'Les bots parlent le protocole WebSocket du jeu. Le code commun (commandes, traductions, notifications, chemins, lecture de l’environnement) vit dans un dossier partagé, et une seule commande lance l’ensemble, sous PM2 en production.'
    ],
    features:[
      ['Bot BombParty','Connexion à la room, jeu, commandes, anti-spam, protection contre les raids et statistiques.'],
      ['Bot PopSauce','Réponses aux questions, commandes, traductions et base de joueurs.'],
      ['Serveur de dictionnaires','API HTTP de dictionnaires et de syllabes interrogée par les bots.'],
      ['Panel d’administration','API HTTP et interface web pour piloter tout l’écosystème.'],
      ['Bot Discord','Commandes relayées vers le panel et notifications de bannissement par webhooks.'],
      ['Modération','Blacklist, motifs interdits et protection de room, couverts par des tests.']
    ],
    stats:[['28 367','parties jouées','cumul des participations BombParty'],['901 h','de jeu','temps passé en partie par les joueurs'],['732','joueurs suivis','674 BombParty, 58 PopSauce'],['75 744','questions PopSauce','connues du bot, en trois langues']],
    flow:[['Discord','Commandes des modérateurs'],['discord-bot','Relais vers le panel'],['panel :9999','API HTTP + interface web'],['Bots BombParty et PopSauce','WebSocket vers les rooms'],['dict-server :7777','Dictionnaires et syllabes'],['JKLM.fun','Les parties en cours']],
    stack:['nodejs','javascript','discordjs','cheerio','pm2']
  },
  {
    slug:'syllabomb',name:'SyllaBomb',line:'Jeux de mots multijoueur',img:syllabomb,
    type:'Jeu multijoueur temps réel',hd:[syllabombHd,2400,1500],
    lede:'Une syllabe est imposée : trouve un mot valide avant la fin du timer, ou perds une vie. Jusqu’à huit joueurs, en quatre langues.',
    role:'Conception et développement',status:'En ligne',link:['jkplm.vercel.app','https://jkplm.vercel.app'],
    overview:[
      'SyllaBomb mélange l’esprit de JKLM.fun et de wordbomb.io. À chaque tour, une syllabe s’affiche au centre de la bombe ; le joueur tape un mot du dictionnaire qui la contient avant la fin du compte à rebours. Un mot ne sert qu’une fois par partie, le dernier survivant gagne.',
      'Le frontend est fait de pages statiques sans framework ni build, hébergées sur Vercel. Le serveur Node.js, Express et Socket.IO tourne sur Render et garde les salles en mémoire ; Supabase gère les comptes Discord, les profils et les statistiques.'
    ],
    features:[
      ['Tours de dix secondes','Urgence visuelle et sonore sous trois secondes, de deux à huit joueurs, jouable seul.'],
      ['Paliers de rareté','La syllabe est tirée selon le nombre de mots qui la contiennent : plus le palier est bas, plus c’est dur.'],
      ['Mode Completion','Trouver tous les mots d’une syllabe ; chaque mot relance le timer.'],
      ['Mode Train','Rejouer les syllabes sur lesquelles on a déjà perdu une vie.'],
      ['Quatre langues','Français, anglais, espagnol et italien, avec définitions indexées.'],
      ['Comptes et sécurité','Connexion Discord via Supabase, vérification Cloudflare Turnstile, en-têtes de sécurité.']
    ],
    flow:[['Navigateur','Pages statiques, sans build'],['Vercel','Accueil, salle, profil'],['Socket.IO','Temps réel'],['Render','Serveur Node.js et Express'],['Data','Dictionnaires, définitions, index'],['Supabase','Auth Discord, profils, statistiques']],
    stack:['nodejs','express','socketio','supabase','discord','cloudflare','vercel','render','javascript']
  },
  {
    slug:'local-shield',name:'Local Shield',line:'Bloqueur de pubs et traqueurs',img:localshield,
    type:'Extension Chrome',hd:[localshieldHd,2400,1500],demo:true,
    lede:'Bloque publicités, traqueurs et pop-ups. Les règles sont dans l’extension, le filtrage est fait par le navigateur, aucune télémétrie.',
    role:'Conception et développement',status:'Dépôt privé',
    overview:[
      'Un bloqueur moderne ne devrait pas dépendre d’un serveur. Local Shield embarque ses listes, laisse le navigateur filtrer via declarativeNetRequest, et son seul accès réseau, la mise à jour périodique des listes, est désactivable.',
      'Deux content scripts se partagent le travail : l’un dans le monde de la page pour surcharger window.open, l’autre dans le monde isolé pour parler au service worker. Une seule fonction décide des exceptions par site, si bien que le popup, le stockage et les scripts injectés voient la même vérité.'
    ],
    features:[
      ['Filtrage réseau','Blocage déclaratif sur une grande base de domaines publicitaires et de traqueurs, plus des règles de motifs.'],
      ['Cosmétique','Masquage CSS et procédural des éléments publicitaires, sélecteurs de type uBlock Origin.'],
      ['Scriptlets','Moteur compatible uBlock Origin et AdGuard contre les scripts anti-adblock.'],
      ['Pop-ups','Garde window.open, anti pop-under, anti-chaînes de redirections.'],
      ['Cookies et permissions','Refus automatique des bannières connues, demandes intrusives neutralisées.'],
      ['Testé','Tests unitaires, tests Python de la chaîne de build et tests e2e dans un vrai Chrome.']
    ],
    flow:[['Service worker','Règles statiques et dynamiques'],['Règles DNR','Filtrage par le navigateur'],['Monde MAIN','content-main.js et scriptlets'],['Monde isolé','content-bridge.js'],['Popup','Statut et réglages'],['Dashboard','Statistiques par site']],
    stack:['chrome','javascript','python']
  },
  {
    slug:'mediasniffer',name:'MediaSniffer',line:'Détecteur de médias',img:mediasniffer,
    type:'Extension Chrome',hd:[mediasnifferHd,2400,1500],demo:true,
    lede:'Détecte et télécharge les médias d’une page : vidéo, audio, images, flux HLS et DASH. Tout se passe dans le navigateur.',
    role:'Conception et développement',status:'Dépôt privé',
    overview:[
      'MediaSniffer observe les requêtes réseau de chaque onglet et reconnaît un média par son Content-Type ou par l’extension de son URL. Le popup liste ce qui a été trouvé, classé par type, prêt à être téléchargé.',
      'Pour un fichier direct, le téléchargement passe par chrome.downloads. Pour un flux HLS ou DASH, l’extension lit le manifeste, récupère les segments un par un et les assemble, avec une barre de progression.'
    ],
    features:[
      ['Détection automatique','Médias chargés par la page, onglet par onglet, iframes comprises.'],
      ['Vidéo, audio, images','mp4, webm, mov, mkv, mp3, m4a, flac, jpg, webp, avif ; les images de moins de 30 Ko sont filtrées.'],
      ['HLS et DASH','Playlists .m3u8 et manifestes .mpd analysés puis assemblés segment par segment.'],
      ['Diagnostic','Copie du diagnostic en un clic, notifications de fin de téléchargement.']
    ],
    flow:[['Page web','Requêtes réseau'],['Service worker','Détection par Content-Type ou extension'],['Liste par onglet','mediaByTab'],['Popup','GET_MEDIA, téléchargement'],['Downloader','Parseurs m3u8 et mpd'],['chrome.downloads','Fichier final']],
    stack:['chrome','javascript']
  },
  {
    slug:'localscan',name:'LocalScan',line:'Lecteur de scans local',img:localscan,
    type:'Lecteur de scans',hd:[localscan,720,720],
    lede:'Une bibliothèque de scans locale : reprendre la lecture où on l’a laissée, filtrer par avancement, lire chapitre par chapitre.',
    role:'Conception et développement',status:'Dépôt privé',
    overview:[
      'LocalScan présente une collection de scans stockée sur la machine comme une vraie bibliothèque : une série mise en avant, la lecture en cours, puis toutes les séries avec leur progression.'
    ],
    features:[
      ['Reprise de lecture','La progression de chaque série est mémorisée.'],
      ['Filtres','Séries en cours, pas commencées ou terminées.'],
      ['Chapitres','Lecture chapitre par chapitre, avec compteur de chapitres lus.']
    ],
    flow:[],
    stack:[]
  }
]

export const projectUrl=p=>`projet.html?p=${p.slug}`
