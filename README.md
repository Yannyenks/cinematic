# LAND CRUISER — ANATOMY

Landing page cinématique React + Vite + GSAP/ScrollTrigger. Le scroll pilote tout : lecture
vidéo (`video.currentTime` scrubbé), reveal du titre par caractère, jauge de scan verticale,
transitions par section.

## Développement

```bash
npm install
npm run dev
```

## Assets vidéo

Le site tourne sans aucun fichier vidéo (fallback : dégradé + mot-clé géant + specs). Pour
activer le scrubbing vidéo, déposer les 8 plans Flow dans `public/video/` — voir
`public/video/README.txt` pour les noms de fichiers attendus.

## Ce qui est implémenté

- Scroll-scrubbing vidéo par section (`ScrubSection`, pin + `scrub`)
- Jauge "SCAN DEPTH" fixe à droite, pilotée par la progression globale du scroll
- Titres kinétiques : split par caractère, `rotateX` 3D + blur, stagger
- HUD discret (corner brackets, réticule, radar) + curseur croix de visée personnalisé
- Callouts avec ligne de rappel qui se dessine au scroll
- Specs en count-up (IBM Plex Mono, tabular-nums)
- `prefers-reduced-motion` : scrubbing/pin/split 3D désactivés, scroll natif
- Mobile (≤760px) : pas de pin, entrée simple au scroll, jauge et HUD allégés

## Non implémenté (nécessite des assets non fournis)

- Rotation 3D Three.js / modèle GLB du véhicule — aucun modèle 3D n'a été fourni. Le fallback
  "image sequence" décrit dans le prompt maître n'a pas non plus été câblé, faute de séquence
  d'images ; la structure du composant `ScrubSection` est prête à recevoir un `<canvas>|three
  scrubber à la place du `<video>` le jour où ces assets existent.
