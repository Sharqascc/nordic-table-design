export type Lang = "sv" | "en";
export type Bi = Record<Lang, string>;

/* ───── GENERAL ───── */
export const info = {
  name: "Qabeli Restaurang",
  tagline: {
    sv: "Smaken av Mellanöstern i hjärtat av Stockholm",
    en: "The Taste of the Middle East in the Heart of Stockholm",
  } as Bi,
  address: "Turebergsvägen 11, 191 47 Sollentuna, Sweden",
  phone: "+46 8 122 94 00",
  email: "info@qabelirestaurant.se",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.798!2d18.0649!3d59.3345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDIwJzA0LjIiTiAxOMKwMDMnNTMuNiJF!5e0!3m2!1ssv!2sse!4v1",
  social: {
    instagram: "https://instagram.com/saffransthlm",
    facebook: "https://facebook.com/saffransthlm",
    tiktok: "https://tiktok.com/@saffransthlm",
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
    name: { sv: "Förrätter", en: "Starters" },
    items: [
      { name: { sv: "Hummus", en: "Hummus" }, description: { sv: "Krämig kikärtsröra med tahini och olivolja", en: "Creamy chickpea dip with tahini and olive oil" }, price: 79, tags: ["veg"] },
      { name: { sv: "Baba Ganoush", en: "Baba Ganoush" }, description: { sv: "Rökt auberginekräm med vitlök", en: "Smoked eggplant cream with garlic" }, price: 79, tags: ["veg"] },
      { name: { sv: "Fattoush Sallad", en: "Fattoush Salad" }, description: { sv: "Fräsch sallad med sumak och pitachips", en: "Fresh salad with sumac and pita chips" }, price: 89, tags: ["veg"] },
      { name: { sv: "Sambousek", en: "Sambousek" }, description: { sv: "Fyllda degknyten med ost och örter", en: "Filled pastries with cheese and herbs" }, price: 89, tags: ["veg"] },
      { name: { sv: "Lammkibbeh", en: "Lamb Kibbeh" }, description: { sv: "Friterade köttbullar med bulgur och pinjenötter", en: "Fried meat croquettes with bulgur and pine nuts" }, price: 99 },
    ],
  },
  {
    id: "kebab",
    name: { sv: "Kebabrätter", en: "Kebab Dishes" },
    items: [
      { name: { sv: "Adana Kebab", en: "Adana Kebab" }, description: { sv: "Kryddad lammfärskebab med ris och sallad", en: "Spiced lamb mince kebab with rice and salad" }, price: 179, tags: ["spicy"] },
      { name: { sv: "Kycklingkebab", en: "Chicken Kebab" }, description: { sv: "Marinerad kycklingkebab med vitlökssås", en: "Marinated chicken kebab with garlic sauce" }, price: 169 },
      { name: { sv: "Blandad Kebab", en: "Mixed Kebab" }, description: { sv: "Lamm, kyckling och köttfärs med tillbehör", en: "Lamb, chicken and mince with sides" }, price: 199 },
      { name: { sv: "Lammkotletter", en: "Lamb Chops" }, description: { sv: "Grillad lamm med rosmarin och vitlök", en: "Grilled lamb with rosemary and garlic" }, price: 229 },
      { name: { sv: "Koobideh", en: "Koobideh" }, description: { sv: "Persisk köttfärskebab med saffronsris", en: "Persian mince kebab with saffron rice" }, price: 189 },
    ],
  },
  {
    id: "rice",
    name: { sv: "Risrätter", en: "Rice Dishes" },
    items: [
      { name: { sv: "Zereshk Polo", en: "Zereshk Polo" }, description: { sv: "Saffronsris med berberis och kyckling", en: "Saffron rice with barberries and chicken" }, price: 179 },
      { name: { sv: "Baghali Polo", en: "Baghali Polo" }, description: { sv: "Dillris med bondbönor och lamm", en: "Dill rice with fava beans and lamb" }, price: 189 },
      { name: { sv: "Vegetarisk Biryani", en: "Vegetable Biryani" }, description: { sv: "Kryddigt ris med säsongens grönsaker", en: "Spiced rice with seasonal vegetables" }, price: 149, tags: ["veg"] },
      { name: { sv: "Lammbiryani", en: "Lamb Biryani" }, description: { sv: "Lång kokad lamm med aromatiskt ris", en: "Slow-cooked lamb with aromatic rice" }, price: 199 },
    ],
  },
  {
    id: "specials",
    name: { sv: "Specialrätter", en: "Specials" },
    items: [
      { name: { sv: "Grillad Havsabborre", en: "Grilled Sea Bass" }, description: { sv: "Hel fisk med citron och örter", en: "Whole fish with lemon and herbs" }, price: 249 },
      { name: { sv: "Ghormeh Sabzi", en: "Ghormeh Sabzi" }, description: { sv: "Persisk örtgryta med lamm", en: "Persian herb stew with lamb" }, price: 199 },
      { name: { sv: "Kockens Val", en: "Chef's Choice" }, description: { sv: "Fråga din servitör om dagens specialrätt", en: "Ask your server for today's special" }, price: 269 },
      { name: { sv: "Hela Lammläggen", en: "Whole Lamb Shank" }, description: { sv: "8-timmars brässerad lammlägg", en: "8-hour braised lamb shank" }, price: 289 },
    ],
  },
  {
    id: "kids",
    name: { sv: "Barnmeny", en: "Kids Menu" },
    items: [
      { name: { sv: "Mini Kebab", en: "Mini Kebab" }, description: { sv: "Kycklingkebab med ris och sallad", en: "Chicken kebab with rice and salad" }, price: 89 },
      { name: { sv: "Köttbullar", en: "Meatballs" }, description: { sv: "Med ris och yoghurtsås", en: "With rice and yogurt sauce" }, price: 79 },
      { name: { sv: "Falafel Kids", en: "Falafel Kids" }, description: { sv: "Tre falafler med pommes och dip", en: "Three falafel with fries and dip" }, price: 79, tags: ["veg"] },
    ],
  },
  {
    id: "drinks",
    name: { sv: "Drycker", en: "Drinks" },
    items: [
      { name: { sv: "Mango Lassi", en: "Mango Lassi" }, description: { sv: "Krämig yoghurtdrink med mango", en: "Creamy yogurt drink with mango" }, price: 59 },
      { name: { sv: "Mynta Lemonad", en: "Mint Lemonade" }, description: { sv: "Fräsch lemonad med färsk mynta", en: "Fresh lemonade with fresh mint" }, price: 55 },
      { name: { sv: "Ayran", en: "Ayran" }, description: { sv: "Traditionell yoghurtdrick", en: "Traditional yogurt drink" }, price: 45 },
      { name: { sv: "Turkiskt Te", en: "Turkish Tea" }, description: { sv: "Starkt svart te serverat i glas", en: "Strong black tea served in glass" }, price: 35 },
      { name: { sv: "Persiskt Kaffe", en: "Persian Coffee" }, description: { sv: "Kryddigt kaffe med kardemumma", en: "Spiced coffee with cardamom" }, price: 45 },
    ],
  },
  {
    id: "desserts",
    name: { sv: "Efterrätter", en: "Desserts" },
    items: [
      { name: { sv: "Baklava", en: "Baklava" }, description: { sv: "Flakverk med valnötter och honungssirap", en: "Phyllo pastry with walnuts and honey syrup" }, price: 69, tags: ["veg"] },
      { name: { sv: "Kunafa", en: "Kunafa" }, description: { sv: "Krispig ostdessert med rosenvatten", en: "Crispy cheese dessert with rose water" }, price: 79 },
      { name: { sv: "Saffranspanna Cotta", en: "Saffron Panna Cotta" }, description: { sv: "Krämig panna cotta med saffran och pistasch", en: "Creamy panna cotta with saffron and pistachio" }, price: 79, tags: ["veg"] },
      { name: { sv: "Glass Tallrik", en: "Ice Cream Plate" }, description: { sv: "Tre sorters orientalisk glass", en: "Three flavors of oriental ice cream" }, price: 65, tags: ["veg"] },
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
