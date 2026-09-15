export const sections = [
  {
    id: 'chassis',
    eyebrow: 'Couche 01 — Structure',
    title: 'CHÂSSIS',
    video: '/video/chassis.mp4',
    transition: 'dissolve',
    lead: 'Sous la carrosserie, un châssis échelle en acier haute limite élastique encaisse la torsion du tout-terrain sans la transmettre à l’habitacle.',
    specs: [
      { label: 'Longueur hors-tout', value: '5065', unit: 'mm' },
      { label: 'Empattement', value: '2850', unit: 'mm' },
      { label: 'Garde au sol', value: '235', unit: 'mm' },
      { label: 'Angle d’attaque', value: '32', unit: '°' },
      { label: 'Angle de fuite', value: '25', unit: '°' },
      { label: 'Angle de franchissement', value: '23', unit: '°' },
    ],
    callouts: [
      { top: '16%', left: '70%', label: 'LONGERON ÉCHELLE', value: 'ACIER 590 MPa' },
      { top: '42%', left: '14%', label: 'TRAVERSE CENTRALE', value: 'RENFORT CROISÉ', flip: true },
      { top: '68%', left: '74%', label: 'POINT D’ANCRAGE', value: 'TREUIL AV.' },
    ],
  },
  {
    id: 'engine',
    eyebrow: 'Couche 02 — Groupe motopropulseur',
    title: 'MOTEUR',
    video: '/video/engine.mp4',
    transition: 'punch',
    lead: 'Un V6 bi-turbo diesel taillé pour le couple bas régime : la puissance qui tracte plutôt que celle qui s’affiche.',
    specs: [
      { label: 'Cylindrée', value: '3.3 L V6', unit: 'BI-TURBO' },
      { label: 'Puissance', value: '305', unit: 'CH', thermal: true },
      { label: 'Couple', value: '700', unit: 'NM', thermal: true },
      { label: 'Régime de couple max.', value: '1600–2600', unit: 'TR/MIN' },
    ],
    callouts: [
      { top: '18%', left: '72%', label: 'TURBO PRIMAIRE', value: 'BASSE PRESSION' },
      { top: '44%', left: '16%', label: 'COLLECTEUR ÉCHAPPEMENT', value: '≈ 850 °C', flip: true },
      { top: '70%', left: '68%', label: 'INTERCOOLER', value: 'AIR/AIR' },
    ],
  },
]
