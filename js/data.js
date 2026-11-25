// Catálogo de ejemplo de Miga & Azúcar (marca ficticia para un proyecto concepto).
// price: número en MXN, o null si el producto es solo por cotización.
window.SITE = {
  categories: [
    { id: 'todos', name: 'Todos' },
    { id: 'cheesecakes', name: 'Cheesecakes y tartas' },
    { id: 'galletas', name: 'Galletas y brownies' },
    { id: 'panques', name: 'Panqués' },
    { id: 'pasteles', name: 'Pasteles' },
    { id: 'temporada', name: 'Temporada' }
  ],
  products: [
    {
      handle: 'cheesecake-de-pistache',
      name: 'Cheesecake de pistache',
      price: 680,
      category: 'cheesecakes',
      image: 'assets/img/cheesecake-pistache.jpg',
      description: 'Cremoso, con base de galleta y cubierta de crema de pistache tostado. Rinde 10 porciones aprox.'
    },
    {
      handle: 'cheesecake-de-caramelo',
      name: 'Cheesecake de caramelo',
      price: 650,
      category: 'cheesecakes',
      image: 'assets/img/cheesecake-caramelo.jpg',
      description: 'Con caramelo de la casa y migas de galleta caramelizada. Rinde 10 porciones aprox.'
    },
    {
      handle: 'panque-de-naranja-y-almendra',
      name: 'Panqué de naranja y almendra',
      price: 275,
      category: 'panques',
      image: 'assets/img/panque-naranja.jpg',
      description: 'Esponjoso, con harina de almendra y glaseado de naranja.',
      options: { name: 'Sabor', values: ['Naranja', 'Limón'] }
    },
    {
      handle: 'pastel-domo',
      name: 'Pastel domo',
      price: null,
      category: 'pasteles',
      image: 'assets/img/pastel-domo.jpg',
      description: 'Pastel en forma de domo, decorado con flores secas o fruta de temporada. Tamaño mediano o grande. Pide tu cotización.'
    },
    {
      handle: 'pastel-decorado',
      name: 'Pastel decorado',
      price: null,
      category: 'pasteles',
      image: 'assets/img/pastel-decorado.jpg',
      description: 'Para cumpleaños, bodas, bautizos y aniversarios. Diseñado a tu medida, con el sabor y relleno que elijas. Pide tu cotización.'
    },
    {
      handle: 'pastel-con-flores',
      name: 'Pastel con flores naturales',
      price: null,
      category: 'pasteles',
      image: 'assets/img/pastel-flores.jpg',
      description: 'Decorado con flores naturales de temporada. Tamaño mediano, grande o especial. Pide tu cotización.'
    }
  ]
};
