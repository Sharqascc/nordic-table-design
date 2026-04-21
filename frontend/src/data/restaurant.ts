export type Lang = "sv" | "en";
export type Bi = Record<Lang, string>;

/* ───── GENERAL ───── */
export const info = {
  name: "QABELI RESTAURANG",
  tagline: {
    sv: "Smaken av Mellanöstern i hjärtat av Stockholm",
    en: "The Taste of the Middle East in the Heart of Stockholm",
  } as Bi,
  address: "Turebergsvägen 11, 191 47 Sollentuna 24 mins",
  phone: "+46 8 129 40 00",
  email: "info@qabelirestaurant.se",
  mapEmbed:
    "https://www.google.com/maps/place/Turebergsv%C3%A4gen+11,+191+47+Sollentuna,+Sweden/@59.4292864,17.9483864,17z/data=!3m1!4b1!4m6!3m5!1s0x465f9ecfb260fb35:0x190a74eeda215ef6!8m2!3d59.4292864!4d17.9509613!16s%2Fg%2F11c1_ny48l?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
  social: {
    instagram: "https://www.instagram.com/qabeli_restaurang?igsh=MWhpNTR4NGZuM3A1Yw==",

    facebook: "https://facebook.com/saffransthlm",
    tiktok: "https://vm.tiktok.com/ZNRVDAgpC/",
  },
  hours: [
    { day: { sv: "Måndag–Torsdag", en: "Monday–Thursday" } as Bi, time: "11:00–21:00" },
    { day: { sv: "Fredag", en: "Friday" } as Bi, time: "11:00–22:00" },
    { day: { sv: "Lördag", en: "Saturday" } as Bi, time: "12:00–22:00" },
    { day: { sv: "Söndag", en: "Sunday" } as Bi, time: "12:00–20:00" },
  ],
  trustChips: {
    sv: ["Lunchbuffé", "Catering", "Halal", "Vegetariskt", "Stockholm City"],
    en: ["Lunch Buffet", "Catering", "Halal", "Vegetarian", "Stockholm City"],
  },
};

/* ───── TODAY'S HOURS (simple helper) ───── */
export function getTodayHours(): string {
  const d = new Date().getDay(); // 0=Sun
  if (d >= 1 && d <= 4) return "11:00–21:00";
  if (d === 5) return "11:00–22:00";
  if (d === 6) return "12:00–22:00";
  return "12:00–20:00";
}

/* ───── FEATURED DISHES ───── */
export interface Dish {
  name: Bi;
  description: Bi;
  price: number;
  image: string;
  category?: Bi;
  ingredients?: Bi;
  allergens?: Bi;
  calories?: number;
  servingSize?: Bi;
  preparationTime?: number; // minutes
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: number; // 0-3
}

export const featuredDishes: Dish[] = [
  {
    name: { sv: "Lammkebab Tallrik", en: "Lamb Kebab Platter" },
    description: {
      sv: "Grillad lamm med saffronsris, yoghurtsås och granatäpple",
      en: "Grilled lamb with saffron rice, yogurt sauce and pomegranate",
    },
    price: 189,
    image: "dish-1",
    category: { sv: "Kebabrätter", en: "Kebab Dishes" },
    ingredients: {
      sv: "Lammkött, basmatiris, saffran, yoghurt, granatäpple, vitlök, olivolja, örter",
      en: "Lamb meat, basmati rice, saffron, yogurt, pomegranate, garlic, olive oil, herbs",
    },
    allergens: { sv: "Laktos", en: "Lactose" },
    calories: 650,
    servingSize: { sv: "350g", en: "350g" },
    preparationTime: 25,
    isGlutenFree: true,
    spicyLevel: 1,
  },
  {
    name: { sv: "Blandad Grill", en: "Mixed Grill" },
    description: {
      sv: "Kyckling- och lammspett med grillad tomat och bröd",
      en: "Chicken and lamb skewers with grilled tomato and flatbread",
    },
    price: 229,
    image: "dish-2",
    category: { sv: "Kebabrätter", en: "Kebab Dishes" },
    ingredients: {
      sv: "Kycklingfilé, lammkött, tomat, pitabröd, spiskummin, paprika, persilja",
      en: "Chicken fillet, lamb meat, tomato, pita bread, cumin, paprika, parsley",
    },
    allergens: { sv: "Gluten", en: "Gluten" },
    calories: 720,
    servingSize: { sv: "400g", en: "400g" },
    preparationTime: 30,
    spicyLevel: 2,
  },
  {
    name: { sv: "Saffronsris med Kyckling", en: "Saffron Rice with Chicken" },
    description: {
      sv: "Gyllene basmatiris med möra kycklingbitar, torkad frukt och nötter",
      en: "Golden basmati rice with tender chicken, dried fruits and nuts",
    },
    price: 179,
    image: "dish-3",
    category: { sv: "Risrätter", en: "Rice Dishes" },
    ingredients: {
      sv: "Kycklingfilé, basmatiris, saffran, aprikoser, russin, mandel, pistasch, kardemumma",
      en: "Chicken fillet, basmati rice, saffron, apricots, raisins, almonds, pistachios, cardamom",
    },
    allergens: { sv: "Nötter", en: "Nuts" },
    calories: 580,
    servingSize: { sv: "380g", en: "380g" },
    preparationTime: 35,
    isGlutenFree: true,
    spicyLevel: 0,
  },
  {
    name: { sv: "Falafeltallrik", en: "Falafel Plate" },
    description: {
      sv: "Krispiga falafler med hummus, tahini och picklad grönsaker",
      en: "Crispy falafel with hummus, tahini and pickled vegetables",
    },
    price: 149,
    image: "dish-4",
    category: { sv: "Vegetariska Rätter", en: "Vegetarian Dishes" },
    ingredients: {
      sv: "Kikärtor, persilja, vitlök, lök, sesamfrön, tahini, paprika, gurka, rödkål",
      en: "Chickpeas, parsley, garlic, onion, sesame seeds, tahini, bell pepper, cucumber, red cabbage",
    },
    allergens: { sv: "Sesam", en: "Sesame" },
    calories: 480,
    servingSize: { sv: "320g", en: "320g" },
    preparationTime: 20,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spicyLevel: 1,
  },
  {
    name: { sv: "Grillad Havsabborre", en: "Grilled Sea Bass" },
    description: {
      sv: "Hel grillad havsabborre med citron, örter och rostade grönsaker",
      en: "Whole grilled sea bass with lemon, herbs and roasted vegetables",
    },
    price: 249,
    image: "dish-5",
    category: { sv: "Fisk & Skaldjur", en: "Fish & Seafood" },
    ingredients: {
      sv: "Havsabborre, citron, dill, timjan, sparris, paprika, zucchini, olivolja",
      en: "Sea bass, lemon, dill, thyme, asparagus, bell pepper, zucchini, olive oil",
    },
    allergens: { sv: "Fisk", en: "Fish" },
    calories: 420,
    servingSize: { sv: "450g", en: "450g" },
    preparationTime: 40,
    isGlutenFree: true,
    spicyLevel: 0,
  },
  {
    name: { sv: "Dessertfat", en: "Dessert Platter" },
    description: {
      sv: "Baklava, kunafa och pistaschglass med rosenblad",
      en: "Baklava, kunafa and pistachio ice cream with rose petals",
    },
    price: 129,
    image: "dish-6",
    category: { sv: "Efterrätter", en: "Desserts" },
    ingredients: {
      sv: "Phyllofilodeg, valnötter, honung, mozzarella, pistasch, grädde, rosenvatten",
      en: "Phyllo pastry, walnuts, honey, mozzarella, pistachios, cream, rose water",
    },
    allergens: { sv: "Nötter, Gluten, Laktos", en: "Nuts, Gluten, Lactose" },
    calories: 520,
    servingSize: { sv: "180g", en: "180g" },
    preparationTime: 15,
    isVegetarian: true,
    spicyLevel: 0,
  },
  {
    name: { sv: "Lammlägg Tajine", en: "Lamb Shank Tajine" },
    description: {
      sv: "8-timmars brässerad lammlägg med aprikoser, mandel och rotfrukter",
      en: "8-hour braised lamb shank with apricots, almonds and root vegetables",
    },
    price: 289,
    image: "dish-1",
    category: { sv: "Specialrätter", en: "Specials" },
    ingredients: {
      sv: "Lammlägg, aprikoser, mandel, morötter, palsternacka, lök, kanel, saffran, koriander",
      en: "Lamb shank, apricots, almonds, carrots, parsnip, onion, cinnamon, saffron, coriander",
    },
    allergens: { sv: "Nötter", en: "Nuts" },
    calories: 780,
    servingSize: { sv: "520g", en: "520g" },
    preparationTime: 480,
    isGlutenFree: true,
    spicyLevel: 1,
  },
  {
    name: { sv: "Lax Kebab med Dillsås", en: "Salmon Kebab with Dill Sauce" },
    description: {
      sv: "Grillad svensk lax med saffronsris, dillsås och gurksallad",
      en: "Grilled Swedish salmon with saffron rice, dill sauce and cucumber salad",
    },
    price: 219,
    image: "dish-5",
    category: { sv: "Fisk & Skaldjur", en: "Fish & Seafood" },
    ingredients: {
      sv: "Lax, dill, grädde, gurka, basmatiris, saffran, citron, vitlök",
      en: "Salmon, dill, cream, cucumber, basmati rice, saffron, lemon, garlic",
    },
    allergens: { sv: "Fisk, Laktos", en: "Fish, Lactose" },
    calories: 580,
    servingSize: { sv: "380g", en: "380g" },
    preparationTime: 25,
    isGlutenFree: true,
    spicyLevel: 0,
  },
  {
    name: { sv: "Vegetarisk Moussaka", en: "Vegetarian Moussaka" },
    description: {
      sv: "Lager av aubergine, zucchini, potatis och krämig bechamelsås",
      en: "Layers of eggplant, zucchini, potato and creamy béchamel sauce",
    },
    price: 169,
    image: "dish-4",
    category: { sv: "Vegetariska Rätter", en: "Vegetarian Dishes" },
    ingredients: {
      sv: "Aubergine, zucchini, potatis, tomat, lök, vitlök, mjölk, smör, ost, olivolja",
      en: "Eggplant, zucchini, potato, tomato, onion, garlic, milk, butter, cheese, olive oil",
    },
    allergens: { sv: "Laktos, Gluten", en: "Lactose, Gluten" },
    calories: 480,
    servingSize: { sv: "350g", en: "350g" },
    preparationTime: 55,
    isVegetarian: true,
    spicyLevel: 0,
  },
  {
    name: { sv: "Kryddad Köttfärsrulle", en: "Spiced Meatloaf Roll" },
    description: {
      sv: "Orientalisk köttfärsrulle fylld med pistasch, pinjenötter och granatäpple",
      en: "Oriental meatloaf roll filled with pistachios, pine nuts and pomegranate",
    },
    price: 199,
    image: "dish-2",
    category: { sv: "Kebabrätter", en: "Kebab Dishes" },
    ingredients: {
      sv: "Nötfärs, lammfärs, pistasch, pinjenötter, granatäpple, lök, vitlök, kanel, spiskummin",
      en: "Beef mince, lamb mince, pistachios, pine nuts, pomegranate, onion, garlic, cinnamon, cumin",
    },
    allergens: { sv: "Nötter", en: "Nuts" },
    calories: 680,
    servingSize: { sv: "320g", en: "320g" },
    preparationTime: 45,
    isGlutenFree: true,
    spicyLevel: 2,
  },
  {
    name: { sv: "Hummus Bowl med Rotfrukter", en: "Hummus Bowl with Root Vegetables" },
    description: {
      sv: "Krämig hummus toppad med rostade rotfrukter, tahini och granatäpple",
      en: "Creamy hummus topped with roasted root vegetables, tahini and pomegranate",
    },
    price: 159,
    image: "dish-4",
    category: { sv: "Vegetariska Rätter", en: "Vegetarian Dishes" },
    ingredients: {
      sv: "Kikärtor, palsternacka, morot, sötpotatis, tahini, granatäpple, olivolja, spiskummin",
      en: "Chickpeas, parsnip, carrot, sweet potato, tahini, pomegranate, olive oil, cumin",
    },
    allergens: { sv: "Sesam", en: "Sesame" },
    calories: 420,
    servingSize: { sv: "340g", en: "340g" },
    preparationTime: 30,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spicyLevel: 0,
  },
];

/* ───── MENU CATEGORIES ───── */
export interface MenuItem {
  name: Bi;
  description: Bi;
  price: number;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: Bi;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    name: { sv: "Förrätter", en: "Starters" } as Bi,
    items: [
      {
        name: { sv: "MANTU", en: "Mantu" },
        description: {
          sv: "4 st ångade dumplings",
          en: "4 steamed dumplings",
        } as Bi,
        price: 65,
      },
      {
        name: { sv: "ASHAK", en: "Ashak" },
        description: {
          sv: "4 st dumplings med purjolök",
          en: "4 dumplings with leek",
        } as Bi,
        price: 60,
      },
      {
        name: {
          sv: "SOPPA KYCKLING MED GRÖNSAKER",
          en: "Chicken soup with vegetables",
        },
        description: {
          sv: "Klar soppa med kyckling och grönsaker",
          en: "Clear soup with chicken and vegetables",
        } as Bi,
        price: 25,
      },
      {
        name: { sv: "SAMBOSA", en: "Sambosa" },
        description: {
          sv: "4 st vegetarisk, serveras med vit sås och chatni",
          en: "4 pcs vegetarian, served with white sauce and chutney",
        } as Bi,
        price: 65,
        tags: ["veg"],
      },
      {
        name: { sv: "BOLANI", en: "Bolani" },
        description: {
          sv: "1 st, kokad purjolök och potatis, serveras med chatni",
          en: "1 pc, cooked leek and potato, served with chutney",
        } as Bi,
        price: 65,
        tags: ["veg"],
      },
    ],
  },
  {
    id: "rice",
    name: { sv: "Risrätter", en: "Rice Dishes" } as Bi,
    items: [
      {
        name: { sv: "QABELI UZBEKI", en: "Qabeli Uzbeki" },
        description: {
          sv: "Afghanskt kryddat ris med morötter och russin, serveras med kött",
          en: "Afghan spiced rice with carrots and raisins, served with meat",
        } as Bi,
        price: 219,
      },
      {
        name: { sv: "QABELI", en: "Qabeli" },
        description: {
          sv: "Afghanskt kryddat ris med morötter och russin, serveras med lammlägg",
          en: "Afghan spiced rice with carrots and raisins, served with lamb shank",
        } as Bi,
        price: 189,
      },
      {
        name: { sv: "SPICE BERYANI", en: "Spice Beryani" },
        description: {
          sv: "Kryddig risrätt med smakrika rätter",
          en: "Spicy rice dish with rich flavors",
        } as Bi,
        price: 179,
      },
      {
        name: { sv: "ZERESHK PALAW", en: "Zereshk Palaw" },
        description: {
          sv: "Ris med kyckling tillagad i färska tomater och lök",
          en: "Rice with chicken cooked in fresh tomatoes and onions",
        } as Bi,
        price: 179,
      },
      {
        name: { sv: "CHALAW KEBAB", en: "Chalaw Kebab" },
        description: {
          sv: "Ris med köttfärsspett och afghansk krydda",
          en: "Rice with minced meat skewer and Afghan spices",
        } as Bi,
        price: 169,
      },
      {
        name: { sv: "KARAYI MORGH", en: "Karayi Morgh" },
        description: {
          sv: "Afghansk kycklinggryta i järnpanna med tomat, vitlök och aromatiska kryddor, serveras med bröd",
          en: "Afghan chicken stew in iron pan with tomato, garlic and aromatic spices, served with bread",
        } as Bi,
        price: 179,
      },
      {
        name: { sv: "KARAYI GOSHT", en: "Karayi Gosht" },
        description: {
          sv: "Afghansk köttgryta i järnpanna med tomat, vitlök och aromatiska kryddor, serveras med bröd",
          en: "Afghan meat stew in iron pan with tomato, garlic and aromatic spices, served with bread",
        } as Bi,
        price: 279,
      },
    ],
  },
  {
    id: "grill",
    name: { sv: "Grillrätter", en: "Grilled Dishes" } as Bi,
    items: [
      {
        name: { sv: "TIKKA KEBAB", en: "Tikka Kebab" },
        description: {
          sv: "Lamspett med afghanska kryddor, serveras med bröd, grönsaker och såser",
          en: "Lamb skewer with Afghan spices, served with bread, vegetables and sauces",
        } as Bi,
        price: 199,
      },
      {
        name: { sv: "MIX KEBAB", en: "Mix Kebab" },
        description: {
          sv: "Variation av alla grillrätter, serveras med bröd, grönsaker, såser",
          en: "Variation of all grilled dishes, served with bread, vegetables, sauces",
        } as Bi,
        price: 269,
      },
      {
        name: { sv: "CHAPLI KEBAB", en: "Chapli Kebab" },
        description: {
          sv: "Traditionell afghansk köttfärs med kryddad smak, serveras med bröd, sallad, chatni",
          en: "Traditional Afghan minced meat patty, served with bread, salad, chutney",
        } as Bi,
        price: 199,
      },
      {
        name: { sv: "SHAMI KEBAB", en: "Shami Kebab" },
        description: {
          sv: "Traditionell afghansk grillad köttfärs, serveras med bröd, sallad, chatni",
          en: "Traditional Afghan grilled minced meat, served with bread, salad, chutney",
        } as Bi,
        price: 199,
      },
      {
        name: { sv: "MORGH KEBAB", en: "Morgh Kebab" },
        description: {
          sv: "Marinerat kycklingspett med afghanska kryddor, serveras med ris eller bröd",
          en: "Marinated chicken skewer with Afghan spices, served with rice or bread",
        } as Bi,
        price: 179,
      },
    ],
  },
  {
    id: "specials",
    name: { sv: "Special meny", en: "Special Menu" } as Bi,
    items: [
      {
        name: { sv: "QABELI PREMIUM", en: "Qabeli Premium" },
        description: {
          sv: "2 st av varje kebabspett (kyckling, köttfärs, lammstek) med tre olika risrätter (Qabeli, Chalaw ris, Beryani). Serveras med 3 olika grytor, sallad och yoghurt.",
          en: "2 of each kebab skewer (chicken, minced meat, lamb steak) with three rice dishes (Qabeli, Chalaw rice, Beryani). Served with 3 stews, salad and yogurt.",
        } as Bi,
        price: 1159,
      },
      {
        name: { sv: "QABELI SPECIAL", en: "Qabeli Special" },
        description: {
          sv: "1 st av varje kebabspett (kyckling, köttfärs, lammstek) med tre olika risrätter (Qabeli, Chalaw ris, Beryani). Serveras med 3 olika grytor, sallad och yoghurt.",
          en: "1 of each kebab skewer (chicken, minced meat, lamb steak) with three rice dishes (Qabeli, Chalaw rice, Beryani). Served with 3 stews, salad and yogurt.",
        } as Bi,
        price: 759,
      },
    ],
  },
  {
    id: "desserts",
    name: { sv: "Efterrätter", en: "Desserts" } as Bi,
    items: [
      {
        name: { sv: "FRUKT CUP MIX JUICE", en: "Fruit Cup Mix Juice" },
        description: {
          sv: "Fruktmix med juice",
          en: "Mixed fruit cup with juice",
        } as Bi,
        price: 129,
        tags: ["veg"],
      },
      {
        name: { sv: "MAJOON", en: "Majoon" },
        description: {
          sv: "Bananmjölk, valnötter och dadlar",
          en: "Banana milk, walnuts and dates",
        } as Bi,
        price: 119,
      },
      {
        name: { sv: "BAGHLAWA", en: "Baghlawa" },
        description: {
          sv: "Söt bakelse med nötter",
          en: "Sweet pastry with nuts",
        } as Bi,
        price: 25,
        tags: ["veg"],
      },
      {
        name: {
          sv: "FERRENI MED PISTAGE PUDDING",
          en: "Ferreni with pistachio pudding",
        },
        description: {
          sv: "Krämig pudding med pistage",
          en: "Creamy pudding with pistachio",
        } as Bi,
        price: 29,
        tags: ["veg"],
      },
      {
          name: { sv: "SHIRYAKH", en: "Shiryakh" },
          description: {
            sv: "Afghansk glass med kardemumma, serveras med qaimaq och pistage pudding",
            en: "Afghan ice cream with cardamom, served with qaimaq and pistachio pudding",
          } as Bi,
          price: 59,
          tags: ["veg"],
      },
    ],
  },
];

/* ───── LUNCH BUFFET ───── */
export const lunchBuffet = {
  price: 139,
  hours: { sv: "Måndag–Fredag 11:00–14:00", en: "Monday–Friday 11:00–14:00" } as Bi,
  includes: {
    sv: ["Varmrätt", "Salladsbar", "Bröd & dip", "Dryck (vatten/kaffe/te)", "Dessert"],
    en: ["Hot dish", "Salad bar", "Bread & dip", "Drink (water/coffee/tea)", "Dessert"],
  },
  description: {
    sv: "Njut av vår dagliga lunchbuffé med färska rätter från vårt kök. Menyn varierar varje dag.",
    en: "Enjoy our daily lunch buffet with fresh dishes from our kitchen. The menu varies daily.",
  } as Bi,
};

/* ───── CATERING ───── */
export const cateringPackages = [
  {
    name: { sv: "Lilla Paketet", en: "Small Package" } as Bi,
    guests: "10–25",
    priceFrom: 199,
    features: {
      sv: ["3 förrätter", "2 varmrätter", "Sallad & bröd", "1 dessert"],
      en: ["3 starters", "2 main courses", "Salad & bread", "1 dessert"],
    },
  },
  {
    name: { sv: "Mellanpaketet", en: "Medium Package" } as Bi,
    guests: "25–50",
    priceFrom: 179,
    features: {
      sv: ["4 förrätter", "3 varmrätter", "Sallad & bröd", "2 desserter", "Dryck ingår"],
      en: ["4 starters", "3 main courses", "Salad & bread", "2 desserts", "Drinks included"],
    },
  },
  {
    name: { sv: "Stora Paketet", en: "Large Package" } as Bi,
    guests: "50+",
    priceFrom: 159,
    features: {
      sv: ["5 förrätter", "4 varmrätter", "Salladsbar", "3 desserter", "Dryck ingår", "Servering"],
      en: ["5 starters", "4 main courses", "Salad bar", "3 desserts", "Drinks included", "Service staff"],
    },
  },
];

/* ───── ABOUT ───── */
export const about = {
  title: { sv: "Vår Historia", en: "Our Story" } as Bi,
  text: {
    sv: "Qabeli Restaurang föddes ur en familjetradition som sträcker sig över generationer. Vår grundare, kocken Ahmad Rashidi, växte upp omgiven av aromer från sin mormorsmors kök i Mellanöstern. Efter att ha förfinat sitt hantverk i Stockholm bestämde han sig för att dela dessa smaker med Sverige. Varje rätt vi serverar bär på en historia – en blandning av orientalisk tradition och skandinavisk elegans.",
    en: "Qabeli Restaurant was born from a family tradition spanning generations. Our founder, Chef Ahmad Rashidi, grew up surrounded by the aromas of his grandmother's kitchen in the Middle East. After refining his craft in Stockholm, he decided to share these flavors with Sweden. Every dish we serve carries a story – a blend of oriental tradition and Scandinavian elegance.",
  } as Bi,
};

/* ───── REVIEWS ───── */
export const reviews = [
  {
    name: "Maria S.",
    rating: 5,
    text: { sv: "Fantastisk mat och otrolig atmosfär! Lammet var perfekt tillagat. Vi kommer definitivt tillbaka.", en: "Amazing food and incredible atmosphere! The lamb was perfectly cooked. We'll definitely be back." } as Bi,
  },
  {
    name: "Erik L.",
    rating: 5,
    text: { sv: "Bästa mellanösternmaten i Stockholm, utan tvekan. Lunchbuffén är ett måste!", en: "Best Middle Eastern food in Stockholm, without a doubt. The lunch buffet is a must!" } as Bi,
  },
  {
    name: "Anna K.",
    rating: 4,
    text: { sv: "Underbar upplevelse från start till slut. Personalen var otroligt trevlig och maten utsökt.", en: "Wonderful experience from start to finish. The staff was incredibly friendly and the food exquisite." } as Bi,
  },
  {
    name: "Johan P.",
    rating: 5,
    text: { sv: "Vi beställde catering till vår fest och allt var perfekt. Rekommenderar starkt!", en: "We ordered catering for our party and everything was perfect. Highly recommend!" } as Bi,
  },
];
