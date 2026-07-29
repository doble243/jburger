export interface StoreStatus {
  isOpen: boolean;
  label: string;
  sublabel: string;
}

export function getStoreStatus(): StoreStatus {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 4 = Thursday, 5 = Friday, 6 = Saturday
  const hours = now.getHours();

  // Abierto Jueves (4), Viernes (5), Sábado (6), Domingo (0) de 20:00 a 00:00
  const openDays = [4, 5, 6, 0];
  const isOpen = openDays.includes(day) && hours >= 20 && hours < 24;

  if (isOpen) {
    return {
      isOpen: true,
      label: '🟢 ABIERTO · DELIVERY',
      sublabel: 'Te llevamos la smash recién hecha a donde estés',
    };
  }

  // Frases ingeniosas cuando la cocina está cerrada fuera del horario de atención
  const closedPhrases = [
    {
      label: '🔥 Calentando planchas',
      sublabel: 'Abrimos Jueves a Domingo de 20:00 a 00:00 hs',
    },
    {
      label: '👨‍🍳 Afilando espátulas',
      sublabel: 'Las smash más picantes vuelven Jueves a Domingo a las 20:00 hs',
    },
    {
      label: '⏳ Preparando el smash perfecto',
      sublabel: 'Cocinamos con todo de Jueves a Domingo de 20:00 a 00:00 hs',
    },
  ];

  const phraseIndex = (day + hours) % closedPhrases.length;
  const phrase = closedPhrases[phraseIndex];

  return {
    isOpen: false,
    label: phrase.label,
    sublabel: phrase.sublabel,
  };
}
