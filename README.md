# LAND CRUISER — ANATOMY

Landing page cinématique React + Vite + GSAP/ScrollTrigger. Le scroll pilote tout : lecture
vidéo (`video.currentTime` scrubbé), reveal du titre par caractère, jauge de scan verticale,
transitions par section.

4 sections, chacune adossée à un vrai plan vidéo : HERO → CHÂSSIS → MOTEUR → SIGNATURE.

## Développement

```bash
npm install
npm run dev
```

## Assets vidéo

Les 4 clips sont dans `public/video/`, réencodés 720p/faststart (voir
`public/video/README.txt` pour la commande ffmpeg et les noms attendus). Le site tourne
aussi sans vidéo (fallback dégradé + mot-clé géant + specs) si un fichier venait à manquer.

## Ce qui est implémenté

- Scroll-scrubbing vidéo par section (`ScrubSection`, pin + `scrub`), chargement paresseux
  par section (`useNearViewport`) — une vidéo ne se télécharge que quand sa section approche
- Jauge "SCAN DEPTH" fixe à droite, pilotée par la progression globale du scroll
- Navigation par points (`SectionNav`) à côté de la jauge, section active mise en évidence,
  clic pour scroller
- Titres kinétiques : split par caractère, `rotateX` 3D + blur, stagger
- Faisceau de scan qui balaie chaque section à l'entrée, glitch RGB-split + désaturation à
  la sortie, vignette et grain de pellicule animé sur l'ensemble du site
- HUD (corner brackets, ticks latéraux, réticule pulsé, radar) + curseur croix de visée
  personnalisé avec lerp et état hover sur les éléments interactifs
- Callouts avec ligne de rappel qui se dessine au scroll
- Specs en count-up (IBM Plex Mono, tabular-nums)
- Loader avec séquence de statut ("CALIBRAGE OPTIQUE"...) avant le premier scroll
- `prefers-reduced-motion` : scrubbing/pin/split 3D désactivés, scroll natif
- Mobile (≤760px) : pas de pin, entrée simple au scroll, jauge et HUD allégés

## Non implémenté (nécessite des assets non fournis)

- Rotation 3D Three.js / modèle GLB du véhicule — aucun modèle 3D n'a été fourni. Le fallback
  "image sequence" décrit dans le prompt maître n'a pas non plus été câblé, faute de séquence
  d'images ; la structure du composant `ScrubSection` est prête à recevoir un `<canvas>`/three
  scrubber à la place du `<video>` le jour où ces assets existent.
- Les sections 4x4, habitacle, terrain et technologie du brief d'origine ont été retirées
  faute de plan vidéo généré pour elles — voir `public/video/README.txt` pour les ré-ajouter.
