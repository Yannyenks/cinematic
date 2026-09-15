# LAND CRUISER — ANATOMY
### Dossier créatif : landing page cinématique + prompts vidéo Flow + master prompt Claude Code

---

## 1. Positionnement créatif

**Concept :** pas une landing page produit, une **dissection**. Le visiteur descelle le véhicule couche par couche — carrosserie, châssis, groupe motopropulseur, transmission 4x4, habitacle, électronique — comme une planche d'anatomie technique. On est plus proche d'un laboratoire d'ingénierie militaire que d'une brochure automobile : scan-lines, glow bleu-cyan de "vision augmentée", callouts avec lignes de rappel, specs en chiffres bruts.

Pour dépasser Toyota/Land Rover/Mercedes en ligne (qui restent sur des heros shots + galerie), le site doit avoir **un seul dispositif signature** : l'écorché scroll-driven qui expose littéralement le véhicule pièce par pièce, avec une jauge de "profondeur de scan" fixe à l'écran.

### Design tokens

**Couleurs**
- `#0A0D10` — noir industriel (fond, pas un noir neutre générique — légère teinte bleu-acier)
- `#E8EBED` — blanc titane (texte principal)
- `#3FA9C7` — cyan-scan (glow des lignes de scan, callouts actifs, halo des pièces exposées)
- `#8B8F94` — gris acier (texte secondaire, specs inactives)
- `#B5652D` — cuivre-oxydé (accent chaleur : moteur, échappement, freinage — jamais décoratif, toujours lié à une pièce thermique)
- `#1C2226` — panneau gris-ardoise (cartes de specs, fond des callouts)

**Typographie**
- Titres : **Space Grotesk** (géométrique, technique, pas un serif éditorial — cohérent avec l'univers ingénierie)
- Specs/callouts/labels de pièces : **IBM Plex Mono** — justifié ici car le contenu EST un relevé technique (cotes, couples, angles), pas une déco
- Corps de texte : **Inter**, 16-18px, line-height 1.6

**Layout**
- Grille asymétrique 12 colonnes, le véhicule toujours décalé (jamais centré) pour laisser respirer les callouts
- Une colonne fixe à droite = "scan depth gauge" (jauge verticale 0-100%, la position de scroll)
- Pas de cards arrondies façon SaaS — bordures nettes 1px, coins vifs, comme un plan technique

**Principe directeur**
Un seul moment fort orchestré par section (le "unveil" de la pièce), tout le reste au repos. Pas de fade-in généralisé sur chaque bloc.

---

## 2. Prompts vidéo — Flow (Veo)

Chaque prompt est calibré pour un plan unique de 8s (durée native Veo), en 16:9, à assembler en post-prod si besoin de plans plus longs. Ambiance constante : nuit, studio noir mat, un seul point de lumière dur + le glow cyan diégétique du scan.

**1 — Hero, reveal carrosserie**
> Cinematic studio shot, matte black Toyota Land Cruiser parked on a reflective obsidian floor in near-total darkness. A single hard rim light sweeps slowly across the body from left to right, revealing the silhouette panel by panel. Thin cyan scan-lines travel vertically across the surface as the light passes, as if the car is being digitally measured. Camera: slow low-angle dolly-in, shallow depth of field. No dialogue, only the low hum of a scanning tone. Photorealistic, 8s, 16:9.

**2 — Châssis, transparence**
> Extreme close-up on the Land Cruiser's front quarter, the metal body dissolving into a translucent X-ray-style wireframe revealing the ladder-frame chassis underneath, glowing faint cyan. Camera holds static as the dissolve happens in real time, welds and frame rails becoming visible with soft blueprint glow. Dust particles drift through the light beam. Ultra-detailed, technical, cold lighting, 8s, 16:9.

**3 — Groupe motopropulseur, coupe**
> Macro cinematic shot of a diesel engine block emerging from black fog, lit by a warm copper rim light against the surrounding cold cyan environment. Camera slowly orbits the block as heat-haze shimmer rises off the exhaust manifold, pistons and turbo housing catching sharp specular highlights. Slow, deliberate motion, no cuts, industrial sound design (distant metallic resonance). 8s, 16:9.

**4 — Système 4x4 / suspension**
> Underside tracking shot gliding beneath the Land Cruiser as it crosses rocky terrain in slow motion, showing the front differential and suspension arms articulating over a boulder, dust kicked up in dramatic backlight. Camera moves parallel to the ground, low and fast, catching sparks of light off the drive shaft. Desert dusk lighting, warm rim light against cool shadow. 8s, 16:9.

**5 — Habitacle, matières**
> Interior macro sequence: camera glides across stitched leather seams, a knurled metal drive-mode dial rotating under fingertip, then rising to a soft-focus reveal of the digital instrument cluster igniting to life in cyan light. Extremely shallow depth of field, tactile, quiet luxury within a rugged shell. Warm ambient cabin light against black backdrop. 8s, 16:9.

**6 — Terrain, franchissement**
> Wide cinematic tracking shot of the Land Cruiser crossing a shallow river at dusk, water splitting around the wheel arches in slow motion, mist rising, mountains silhouetted behind. Camera pans smoothly at wheel height, then cranes up to a wide establishing view as the vehicle exits the water onto rock. Golden hour rim light, deep shadow detail. 8s, 16:9.

**7 — Roue / pneu, détail**
> Extreme macro orbit around a single wheel, tire tread flexing over gravel in ultra slow motion, brake caliper glowing faint copper from heat, cyan scan-line sweeping once across the rim revealing internal structure (hub, bearing) in translucent overlay. Cold studio light, single hard shadow. 8s, 16:9.

**8 — Signature finale / logo**
> The fully assembled Land Cruiser stands complete in the black studio, all scan-lines and wireframe overlays fading out simultaneously as full-color lighting restores across the body in one continuous sweep. Camera pulls back slowly to a wide symmetrical shot. The vehicle sits in silence, fully revealed. Final beat, no motion, minimal sound swell. 8s, 16:9.

**Notes de production**
- Toujours préciser *"no on-screen text, no logos"* dans le prompt Flow — vous les ajouterez en post-prod pour garder le contrôle typographique.
- Générez chaque plan en 2-3 variantes (seed différente) et gardez la meilleure trajectoire de caméra pour le montage scroll-synchronisé.

---

## 3. Master prompt — Claude Code

```
Construis une landing page one-page ultra-cinématique intitulée "LAND CRUISER — ANATOMY",
en React + Vite (ou Next.js), avec GSAP + ScrollTrigger pour l'orchestration du scroll et
Three.js pour la rotation 3D du véhicule (si un modèle GLB est fourni) ou, à défaut, une
séquence d'images (image sequence scrubbing) pilotée par le scroll pour simuler la rotation.
\
CONCEPT : le visiteur "scanne" le véhicule couche par couche en scrollant — carrosserie,
châssis, groupe motopropulseur, transmission 4x4, habitacle, électronique. Chaque section
est un "unveil" : la pièce précédente devient translucide/wireframe pendant que la suivante
se révèle en pleine matière, avec des callouts techniques reliés par des lignes de rappel
(leader lines) aux cotes précises.

DESIGN TOKENS (à respecter strictement, ne pas dévier vers un style SaaS générique) :
- Fond : #0A0D10 (noir industriel, jamais #000 ou #111 plats)
- Texte principal : #E8EBED / secondaire : #8B8F94
- Accent scan/actif : #3FA9C7 (cyan) — utilisé UNIQUEMENT sur les éléments interactifs/actifs
- Accent thermique : #B5652D (cuivre) — UNIQUEMENT sur moteur/freinage/échappement
- Panneaux : #1C2226, bordures 1px nettes, zéro border-radius > 2px
- Titres : Space Grotesk ; specs/callouts : IBM Plex Mono ; corps : Inter

STRUCTURE DES SECTIONS (scroll vertical, hauteur totale ~700-800vh) :
1. HERO — véhicule en pleine obscurité, un seul rim light balaie la carrosserie au scroll
   initial, scan-lines cyan qui traversent la surface, titre "ANATOMY" en per-letter reveal
2. CHÂSSIS — la carrosserie devient translucide, le châssis échelle apparaît en wireframe
   glow, callouts avec cotes (longueur, garde au sol, angles d'attaque/de sortie)
3. GROUPE MOTOPROPULSEUR — coupe du bloc moteur, callouts cylindrée/couple/puissance en
   IBM Plex Mono, accent cuivre sur les zones thermiques
4. TRANSMISSION 4X4 — vue de dessous stylisée, différentiels et arbres de transmission
   qui s'articulent au scroll (parallax multi-couches)
5. HABITACLE — macro matières (cuir, métal brossé), le cluster numérique s'allume en cyan
6. TERRAIN — plan large franchissement (rivière/rochers), section "respiration" avec peu
   de texte, sert de pause cinématique avant le retour aux specs
7. TECHNOLOGIE / ADAS — grille de capacités (radar, caméras, aides à la conduite), disposée
   en schéma technique autour d'une silhouette du véhicule
8. SIGNATURE FINALE — reconstitution complète du véhicule (fin du scan), CTA unique
   "Configurer" / "Réserver un essai", jauge de scan à 100%

DISPOSITIF SIGNATURE OBLIGATOIRE :
Une jauge verticale fixe à droite de l'écran (colonne dédiée, ~60px) affichant "SCAN DEPTH
0—100%" qui se remplit avec la progression du scroll, avec un repère lumineux cyan qui suit
la position exacte. C'est l'élément qui doit rendre le site immédiatement reconnaissable —
ne pas le remplacer par une simple progress bar horizontale générique.

INTERACTIONS :
- Curseur personnalisé en croix de visée (cross-hair) avec cotes live (x/y) façon logiciel
  de CAO, pas un cercle décoratif
- Callouts qui apparaissent avec une ligne de rappel qui se dessine (stroke-dashoffset
  animation), pas un simple fade-in
- Aucune card arrondie, aucun dégradé décoratif, aucun badge "01/02/03" sauf si la séquence
  EST réellement les étapes du scan (ce qui est le cas ici — donc autorisé)

VIDÉOS : les 8 plans Flow listés plus haut sont destinés respectivement aux sections
HERO, CHÂSSIS, MOTEUR, 4X4, HABITACLE, TERRAIN, ROUE (insert dans TECHNOLOGIE ou GALERIE),
SIGNATURE. Prévoir un composant <video> en fond de section, muet, autoplay, loop, avec un
poster frame en attendant le chargement, et un fallback image statique si la vidéo échoue.

CONTRAINTES TECHNIQUES :
- Performance : lazy-load des vidéos hors-viewport, compression agressive (WebM + MP4
  fallback), pas plus de 2 vidéos chargées simultanément
- Responsive : sur mobile, remplacer le scroll-scrubbing 3D/vidéo par une séquence
  d'images statiques allégée, garder la jauge de scan (verticale, plus fine)
- Accessibilité : respecter prefers-reduced-motion (désactiver les scan-lines et le
  scrubbing, garder un simple fade entre sections), focus visible clavier sur le CTA
- Aucun texte "Lorem ipsum" — rédige un texte de specs plausible et cohérent en français
  pour chaque section (couple moteur, garde au sol, angles, aides à la conduite)

Construis le site section par section, en commençant par le HERO + la jauge de scan
(le dispositif signature), avant d'enchaîner sur les sections suivantes.
```

---

**À faire ensuite :** générer les 8 plans sur Flow, les recadrer en boucle silencieuse (webm, ~3-5 Mo max par plan), puis lancer le master prompt dans Claude Code avec les fichiers vidéo dans `/public/video/`.
