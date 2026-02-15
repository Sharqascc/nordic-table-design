import type { Lang } from "@/data/restaurant";

const t = {
  sv: {
    nav: {
      home: "Hem",
      menu: "Meny",
      lunch: "Lunch",
      catering: "Catering",
      about: "Om oss",
      gallery: "Galleri",
      reviews: "Omdömen",
      contact: "Kontakt",
      book: "Boka bord",
    },
    hero: {
      cta1: "Boka bord",
      cta2: "Se menyn",
      openToday: "Öppet idag",
    },
    featured: {
      title: "Signatur­rätter",
      subtitle: "Upptäck våra mest älskade rätter, skapade med passion och de finaste ingredienserna",
      price: "kr",
    },
    menu: {
      title: "Vår Meny",
      subtitle: "Autentiska smaker från Mellanöstern med skandinavisk elegans",
      downloadPdf: "Ladda ner meny (PDF)",
    },
    lunch: {
      title: "Lunchbuffé",
      subtitle: "En generös buffé med dagsfärska rätter",
      price: "kr/person",
      includes: "Ingår i priset",
    },
    catering: {
      title: "Catering",
      subtitle: "Låt oss ta hand om maten till ert event",
      from: "från",
      perPerson: "kr/person",
      guests: "gäster",
      request: "Skicka förfrågan",
    },
    about: {
      chefTitle: "Kock & Grundare",
    },
    gallery: {
      title: "Galleri",
      subtitle: "En smakresa genom vårt kök",
    },
    reviews: {
      title: "Vad våra gäster säger",
      subtitle: "Äkta omdömen från våra gäster",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Vi ser fram emot att välkomna dig",
      hours: "Öppettider",
      address: "Adress",
      phone: "Telefon",
      email: "E-post",
      directions: "Vägbeskrivning",
    },
    booking: {
      title: "Boka Bord",
      subtitle: "Reservera ditt bord hos oss",
      name: "Namn",
      email: "E-post",
      phone: "Telefon",
      date: "Datum",
      time: "Tid",
      guests: "Antal gäster",
      message: "Meddelande (valfritt)",
      submit: "Bekräfta bokning",
      success: "Tack för din bokning!",
      successMsg: "Vi har mottagit din förfrågan och återkommer med en bekräftelse snart.",
    },
    footer: {
      privacy: "Integritetspolicy",
      cookies: "Cookiepolicy",
      rights: "Alla rättigheter förbehållna",
    },
    tags: {
      veg: "Vegetarisk",
      spicy: "Stark",
    },
    backToTop: "Till toppen",
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      lunch: "Lunch",
      catering: "Catering",
      about: "About",
      gallery: "Gallery",
      reviews: "Reviews",
      contact: "Contact",
      book: "Book a Table",
    },
    hero: {
      cta1: "Book a Table",
      cta2: "View Menu",
      openToday: "Open today",
    },
    featured: {
      title: "Signature Dishes",
      subtitle: "Discover our most beloved dishes, crafted with passion and the finest ingredients",
      price: "SEK",
    },
    menu: {
      title: "Our Menu",
      subtitle: "Authentic Middle Eastern flavors with Scandinavian elegance",
      downloadPdf: "Download Menu (PDF)",
    },
    lunch: {
      title: "Lunch Buffet",
      subtitle: "A generous buffet with fresh daily dishes",
      price: "SEK/person",
      includes: "Included",
    },
    catering: {
      title: "Catering",
      subtitle: "Let us handle the food for your event",
      from: "from",
      perPerson: "SEK/person",
      guests: "guests",
      request: "Send Request",
    },
    about: {
      chefTitle: "Chef & Founder",
    },
    gallery: {
      title: "Gallery",
      subtitle: "A culinary journey through our kitchen",
    },
    reviews: {
      title: "What Our Guests Say",
      subtitle: "Genuine reviews from our guests",
    },
    contact: {
      title: "Contact",
      subtitle: "We look forward to welcoming you",
      hours: "Opening Hours",
      address: "Address",
      phone: "Phone",
      email: "Email",
      directions: "Get Directions",
    },
    booking: {
      title: "Book a Table",
      subtitle: "Reserve your table with us",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Date",
      time: "Time",
      guests: "Number of guests",
      message: "Message (optional)",
      submit: "Confirm Booking",
      success: "Thank you for your booking!",
      successMsg: "We have received your request and will confirm shortly.",
    },
    footer: {
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      rights: "All rights reserved",
    },
    tags: {
      veg: "Vegetarian",
      spicy: "Spicy",
    },
    backToTop: "Back to top",
  },
} as const;

export type Translations = typeof t.sv;

export function getTranslations(lang: Lang): Translations {
  return t[lang] as Translations;
}
