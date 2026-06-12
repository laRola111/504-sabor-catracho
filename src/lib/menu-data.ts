// Updated: Menu data configuration and assets
export type Language = 'es' | 'en';


export interface BilingualText {
  es: string;
  en: string;
}

export interface MenuItem {
  id: string;
  name: BilingualText;
  description?: BilingualText;
  price?: number | null;
  priceNote?: BilingualText;
  image?: string;
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  name: BilingualText;
  subtitle?: BilingualText;
  badge?: BilingualText;
  items: MenuItem[];
  theme?: 'light' | 'dark' | 'teal';
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'desayunos',
    name: { es: 'Desayunos', en: 'Breakfast' },
    subtitle: {
      es: 'Todos los desayunos incluyen deliciosos acompañamientos tradicionales',
      en: 'All breakfasts include delicious traditional sides'
    },
    theme: 'light',
    items: [
      {
        id: 'desayuno-completo-salchicha',
        name: { es: 'Desayuno Completo con Salchicha', en: 'Complete Sausage Breakfast' },
        description: {
          es: 'Plátano, frijoles, huevo, salchicha, crema, aguacate y 1 baleada',
          en: 'Plantain, beans, egg, sausage, cream, avocado and 1 baleada'
        },
        price: 16,
        image: '/images/desayuno-completo.webp',
        featured: true,
      },
      {
        id: 'desayuno-sencillo',
        name: { es: 'Desayuno Sencillo', en: 'Simple Breakfast' },
        description: {
          es: 'Plátano, frijoles y crema',
          en: 'Plantain, beans and cream'
        },
        price: 12,
        image: '/images/desayuno-sencillo.webp',
      },
      {
        id: 'desayuno-chuleta',
        name: { es: 'Desayuno con Chuleta', en: 'Pork Chop Breakfast' },
        description: {
          es: 'Guineo, frijoles, huevo, crema, queso, chuleta y 1 baleada',
          en: 'Banana, beans, egg, cream, cheese, pork chop and 1 baleada'
        },
        price: 16,
      },
      {
        id: 'desayuno-supremo',
        name: { es: 'Desayuno Supremo', en: 'Supreme Breakfast' },
        description: {
          es: 'Guineo, frijoles, queso, crema, salchicha, 1 baleada. Elección: carne a la plancha o pechuga',
          en: 'Banana, beans, cheese, cream, sausage, 1 baleada. Choice: grilled steak or chicken breast'
        },
        price: 17,
        priceNote: { es: 'Carne o Pechuga', en: 'Steak or Chicken' },
        image: '/images/desayuno-completo-con-pechuga.webp',
        featured: true,
      },
      {
        id: 'alitas',
        name: { es: 'Alitas', en: 'Chicken Wings' },
        description: {
          es: 'Búfalo Picante Medio • Búfalo Picante • Ajo Parmesano • Pimienta Limón',
          en: 'Buffalo Medium • Red Hot Buffalo • Garlic Parmesan • Lemon Pepper'
        },
        price: 12,
        image: '/images/alitas.webp',
      },
    ],
  },
  {
    id: 'baleadas',
    name: { es: 'Baleadas', en: 'Baleadas' },
    subtitle: {
      es: 'Nuestras famosas tortillas de harina hechas a mano',
      en: 'Our famous traditional handmade flour tortillas'
    },
    theme: 'dark',
    items: [
      {
        id: 'baleada-sencilla',
        name: { es: 'Baleada Sencilla', en: 'Simple Baleada' },
        description: {
          es: 'Frijoles, queso, crema',
          en: 'Beans, cheese, cream'
        },
        price: 4,
      },
      {
        id: 'baleada-huevo-aguacate',
        name: { es: 'Baleada con Huevo y Aguacate', en: 'Egg & Avocado Baleada' },
        description: {
          es: 'Frijoles, queso, crema, huevo y aguacate',
          en: 'Beans, cheese, cream, egg and avocado'
        },
        price: 6,
      },
      {
        id: 'baleada-chorizo',
        name: { es: 'Baleada con Chorizo', en: 'Chorizo Baleada' },
        description: {
          es: 'Frijoles, chorizo con huevo, queso y crema',
          en: 'Beans, chorizo with egg, cheese and cream'
        },
        price: 6,
      },
      {
        id: 'baleada-especial',
        name: { es: 'Baleada Especial', en: 'Special Baleada' },
        description: {
          es: 'Frijoles, carne asada, queso, crema y aguacate',
          en: 'Beans, grilled steak, cheese, cream and avocado'
        },
        price: 7,
        featured: true,
      },
    ],
  },
  {
    id: 'tajadas',
    name: { es: 'Tajadas a Elección', en: 'Choice of Fried Plantains' },
    subtitle: {
      es: 'Plátano frito acompañando tu plato favorito',
      en: 'Fried plantain alongside your favorite dish'
    },
    theme: 'light',
    items: [
      {
        id: 'pollo-tajadas-pechuga',
        name: { es: 'Pollo con Tajadas', en: 'Fried Chicken with Plantains' },
        description: { es: 'Pechuga o Ala', en: 'Breast or Wing' },
        price: 17,
        image: '/images/pechuga-o-ala-con-tajadas.webp',
      },
      {
        id: 'pollo-tajadas-pierna',
        name: { es: 'Pollo con Tajadas', en: 'Fried Chicken with Plantains' },
        description: { es: 'Pierna y Muslo', en: 'Leg and Thigh' },
        price: 15,
        image: '/images/pierna-y-pernil-con-tajadas.webp',
      },
      {
        id: 'chuleta-tajadas',
        name: { es: 'Chuleta con Tajadas', en: 'Pork Chop with Plantains' },
        description: { es: 'Chuleta de cerdo frita con tajadas de plátano', en: 'Fried pork chop with plantain slices' },
        price: 16,
        image: '/images/cguleta-con-tajadas.webp',
      },
      {
        id: 'carne-molida-tajadas',
        name: { es: 'Carne Molida con Tajadas', en: 'Ground Beef with Plantains' },
        description: { es: 'Carne molida sazonada con tajadas fritas', en: 'Seasoned ground beef with fried plantains' },
        price: 15,
        image: '/images/carne-molida-con-tajadas.webp',
      },
      {
        id: 'pechuga-plancha-tajadas',
        name: { es: 'Pechuga a la Plancha con Tajadas', en: 'Grilled Chicken Breast with Plantains' },
        description: { es: 'Pechuga a la plancha con tajadas fritas', en: 'Grilled chicken breast with fried plantains' },
        price: 17,
        image: '/images/pechuga-a-la-plancha-con-tajadas.webp',
      },
      {
        id: 'carne-tajadas',
        name: { es: 'Carne con Tajadas', en: 'Steak with Plantains' },
        description: { es: 'Carne a la plancha con tajadas fritas', en: 'Grilled steak with fried plantains' },
        price: 17,
        image: '/images/carne-con-tajadas.webp',
        featured: true,
      },
    ],
  },
  {
    id: 'mariscos-carnes',
    name: { es: 'Mariscos y Carnes', en: 'Seafood & Meats' },
    theme: 'teal',
    items: [
      {
        id: 'filete-pescado',
        name: { es: 'Filete de Pescado', en: 'Fish Fillet' },
        description: { es: 'Filete de pescado fresco al estilo hondureño', en: 'Fresh fish fillet Honduran style' },
        price: 17,
        image: '/images/filete-de-pezcado.webp',
      },
      {
        id: 'costillitas',
        name: { es: 'Costillitas', en: 'Ribs' },
        description: { es: 'Costillitas de cerdo sazonadas y asadas', en: 'Seasoned and roasted pork ribs' },
        price: 17,
        image: '/images/costillas.webp',
      },
      {
        id: 'mojarra',
        name: { es: 'Mojarra', en: 'Tilapia' },
        description: { es: 'Mojarra entera frita al estilo tradicional', en: 'Whole fried tilapia traditional style' },
        price: 18,
        image: '/images/mojarra.webp',
        featured: true,
      },
      {
        id: 'chuleta-plancha',
        name: { es: 'Chuleta a la Plancha', en: 'Grilled Pork Chop' },
        description: { es: 'Con arroz y ensalada', en: 'With rice and salad' },
        price: 17,
        image: '/images/chuleta-a-la-plancha-con-arroz-y-ensalada.webp',
      },
    ],
  },
  {
    id: 'sopas',
    name: { es: 'Sopas y Caldos', en: 'Soups and Broths' },
    subtitle: {
      es: 'Sopas tradicionales hondureñas preparadas con amor',
      en: 'Traditional Honduran soups lovingly prepared'
    },
    badge: { es: 'SÓLO DOMINGOS', en: 'SUNDAYS ONLY' },
    theme: 'light',
    items: [
      {
        id: 'sopa-pescado-camarones',
        name: { es: 'Sopa de Pescado con Camarones', en: 'Fish & Shrimp Soup' },
        description: { es: 'Sopa tradicional de pescado con camarones', en: 'Traditional fish soup with shrimp' },
        price: null,
        image: '/images/sopa-de-pezcado-y-jaibas.webp',
      },
      {
        id: 'sopa-jaiba-camarones',
        name: { es: 'Sopa de Jaiba con Camarones', en: 'Crab & Shrimp Soup' },
        description: { es: 'Sopa de jaiba con camarones frescos', en: 'Crab soup with fresh shrimp' },
        price: null,
        image: '/images/sopa-de-jaibas-con-camarones.webp',
      },
      {
        id: 'sopa-frijoles-costilla',
        name: { es: 'Sopa de Frijoles con Costilla', en: 'Bean & Rib Soup' },
        description: { es: 'Sopa espesa de frijoles con costilla de res', en: 'Thick bean soup with beef rib' },
        price: null,
        image: '/images/sopa-de-frijoles-con-costilla.webp',
      },
      {
        id: 'sopa-mondongo',
        name: { es: 'Sopa de Mondongo', en: 'Tripe Soup' },
        description: { es: 'Mondongo tradicional hondureño', en: 'Traditional Honduran tripe soup' },
        price: null,
        image: '/images/sopa-de-mondongo.webp',
      },
      {
        id: 'sopa-gallina',
        name: { es: 'Sopa de Gallina', en: 'Hen Soup' },
        description: { es: 'Sopa de gallina criolla con verduras frescas', en: 'Creole hen soup with fresh vegetables' },
        price: null,
        image: '/images/sopa-de-gallina.webp',
      },
      {
        id: 'sopa-costilla-res',
        name: { es: 'Sopa de Costilla de Res', en: 'Beef Rib Soup' },
        description: { es: 'Caldo de costilla de res con verduras', en: 'Beef rib broth with vegetables' },
        price: null,
        image: '/images/sopa-de-costilla-de-res.webp',
      },
    ],
  },
  {
    id: 'bebidas',
    name: { es: 'Bebidas', en: 'Drinks' },
    subtitle: {
      es: 'Jugos naturales frescos y bebidas tradicionales',
      en: 'Fresh natural juices and traditional drinks'
    },
    theme: 'light',
    items: [
      {
        id: 'horchata-morro',
        name: { es: 'Horchata de Morro', en: 'Horchata de Morro' },
        description: { es: 'Bebida tradicional hondureña de semilla de morro', en: 'Traditional Honduran morro seed drink' },
        price: 6,
        image: '/images/jugos.webp',
        featured: true,
      },
      {
        id: 'jugo-maranon',
        name: { es: 'Natural de Marañón', en: 'Cashew Fresh Juice' },
        description: { es: 'Jugo natural fresco de marañón', en: 'Fresh natural cashew juice' },
        price: 6,
        image: '/images/jugos.webp',
      },
      {
        id: 'jugo-tamarindo',
        name: { es: 'Natural de Tamarindo', en: 'Tamarind Fresh Juice' },
        description: { es: 'Jugo natural fresco de tamarindo', en: 'Fresh natural tamarind juice' },
        price: 6,
        image: '/images/jugos.webp',
      },
      {
        id: 'jugo-fresa-limon',
        name: { es: 'Natural de Fresa y Limón', en: 'Strawberry & Lime Fresh Juice' },
        description: { es: 'Jugo natural fresco de fresa con limón', en: 'Fresh natural strawberry & lime juice' },
        price: 6,
        image: '/images/jugos.webp',
      },
      {
        id: 'jugo-nance',
        name: { es: 'Natural de Nance', en: 'Nance Fresh Juice' },
        description: { es: 'Jugo natural fresco de nance', en: 'Fresh natural nance juice' },
        price: 6,
        image: '/images/jugos.webp',
      },
      {
        id: 'sodas',
        name: { es: 'Sodas y Aguas', en: 'Sodas & Water' },
        description: {
          es: "Coca-Cola, Sprite, Fanta, Mirinda, Tropical, AMP, Natura's",
          en: "Coca-Cola, Sprite, Fanta, Mirinda, Tropical, AMP, Natura's"
        },
        price: null,
        priceNote: { es: 'Consultar precio', en: 'Ask for price' },
        image: '/images/refrescos.webp',
      },
    ],
  },
];
