const POKEMONS = [
  {
    name: 'Pikachu',
    avatar: '../assets/pikachu.png',
    type: 'electric',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 274,
    attacks: [
      {
        name: "thunder jolt",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "electro ball",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "volt tackle",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "thunder crack",
        maxDamage: 160,
        minDamage: 130,
        maxCount: 2,
      }
    ],
  },
  {
    name: 'Charmander',
    avatar: '../assets/charmander.png',
    type: 'fire',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 282,
    attacks: [
      {
        name: "ember",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "flamethrower",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "burning tail",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "fire spin",
        maxDamage: 130,
        minDamage: 110,
        maxCount: 2,
      }
    ],
  },
  {
    name: 'Bulbasaur',
    avatar: '../assets/bulbasaur.png',
    type: 'fire',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 294,
    attacks: [
      {
        name: "tackle",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "vine whip",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "razor leaf",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "solar beam",
        maxDamage: 130,
        minDamage: 110,
        maxCount: 2,
      }
    ],
  },
  {
    name: 'Squirtle',
    avatar: '../assets/squirtle.png',
    type: 'water',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 292,
    attacks: [
      {
        name: "bubble",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "water gun",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "shell attack",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "hydro pump",
        maxDamage: 130,
        minDamage: 110,
        maxCount: 2,
      }
    ],
  },
  {
    name: 'Pidgey',
    avatar: '../assets/pidgey.png',
    type: 'air',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 284,
    attacks: [
      {
        name: "Air Slash",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "Razor Wind",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "Heat Wave",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "Sky Attack",
        maxDamage: 130,
        minDamage: 110,
        maxCount: 2,
      }
    ],
  },
  {
    name: 'Mew',
    avatar: '../assets/mew.png',
    type: 'air',
    weakness: ['fighting', 'water', 'some'],
    resistence: ['steel'],
    defaultHP: 404,
    attacks: [
      {
        name: "Pound",
        maxDamage: 40,
        minDamage: 20,
        maxCount: 100,
      },
      {
        name: "Ancient Power",
        maxDamage: 60,
        minDamage: 45,
        maxCount: 6,
      },
      {
        name: "Aura Sphere",
        maxDamage: 75,
        minDamage: 60,
        maxCount: 4,
      },
      {
        name: "Psychic",
        maxDamage: 130,
        minDamage: 110,
        maxCount: 2,
      }
    ],
  }
];

export default POKEMONS;