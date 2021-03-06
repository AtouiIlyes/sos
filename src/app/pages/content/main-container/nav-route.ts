export const NAV_ROUTE: Array<any> = [
  {
    id: 2,
    idModule: 0,
    readWrite: 0,
    routeDescription: 'Demander Urgence',
    routeLink: '/urgence',
    routeModule: [1],
    routeTitle: 'Demander Urgence',
    routeIcon: 'favorite',
    divider: '0',
    hidden: false,
    submenu: [],
  },

  {
    id: 3,
    idModule: 0,
    readWrite: 0,
    routeDescription: 'Map',
    routeLink: '/map',
    routeModule: [1],
    routeTitle: 'Map',
    routeIcon: 'pin_drop',
    divider: '0',
    hidden: false,
    submenu: [],
  },
  {
    id: 3,
    idModule: 0,
    readWrite: 0,
    routeDescription: 'Fiche santé',
    routeLink: '/health-card',
    routeModule: [1],
    routeTitle: 'Fiche santé',
    routeIcon: 'description',
    divider: '0',
    hidden: false,
    submenu: [],
  },
  {
    id: 3,
    idModule: 0,
    readWrite: 0,
    routeDescription: 'Équipe',
    routeLink: '/equipe',
    routeModule: [1],
    routeTitle: 'Équipe',
    routeIcon: 'people',
    divider: '0',
    hidden: false,
    submenu: [],
  },
  {
    id: 6,
    idModule: 0,
    readWrite: 0,
    routeDescription: 'Paramétrage',
    routeLink: '',
    routeModule: 'subMenu',
    routeTitle: 'Paramétrage',
    routeIcon: 'build',
    divider: '1',
    hidden: false,
    submenu: [
      // {
      //   id: 7,
      //   idModule: 0,
      //   readWrite: 1,
      //   routeDescription: 'Types et Catégories',
      //   routeLink: '/type-category',
      //   routeModule: [0],
      //   routeTitle: 'Types et Catégories',
      //   routeIcon: '',
      //   divider: '0',
      //   submenu: [],
      // },
      {
        id: 10,
        idModule: 0,
        readWrite: 0,
        routeDescription: 'Compte',
        routeLink: '/configAccount',
        routeModule: [0],
        routeTitle: 'Compte',
        routeIcon: '',
        divider: '0',
        submenu: [],
      },
    ],
  },
];
