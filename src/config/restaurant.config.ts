import { RestaurantConfig } from '../types';

export const restaurantConfig: RestaurantConfig = {
  name: "Zaika Junction",
  tagline: "GOOD FOOD. GREAT MOMENTS.",
  subtitle: "Where Royal Awadhi Heritage Meets Contemporary Multi-Cuisine Artistry",
  established: "2018",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "+919876543210",
  whatsappMessage: "Hello Zaika Junction, I would like to reserve a table / order food.",
  email: "reservations@zaikajunction.com",
  address: "Plot 14, Heritage Boulevard, Civil Lines",
  city: "Lucknow, Uttar Pradesh 226001",
  mapsUrl: "https://maps.google.com/?q=Lucknow+Heritage+Boulevard",
  timings: {
    days: "Monday – Sunday",
    lunch: "12:00 PM – 4:00 PM",
    dinner: "7:00 PM – 11:30 PM",
  },
  totalFrames: 73,
  framePattern: (index: number) => `/frames/frame_${String(index).padStart(3, '0')}.webp`,

  storyBeats: [
    {
      id: "entrance",
      startPct: 0.0,
      endPct: 0.16,
      badge: "ROYAL SANCTUARY",
      title: "Step Into Timeless Elegance",
      description: "Intricately carved jaali arches bathed in warm sunbeams welcome you to an unforgettable architectural and culinary dining experience.",
      align: "center",
    },
    {
      id: "food-journey",
      startPct: 0.16,
      endPct: 0.33,
      badge: "THE GRAND FEAST",
      title: "A Symphony of Flavors",
      description: "From slow-steamed fragrant Handi Dum Biryani to sizzling crispy starters and wok-tossed Asian noodles, every plate is art.",
      align: "left",
    },
    {
      id: "spices",
      startPct: 0.33,
      endPct: 0.50,
      badge: "THE ALCHEMY OF SPICES",
      title: "Suspended in Perfection",
      description: "Whole cinnamon quills, star anise, fragrant green cardamom, ripe tomatoes, and garden-fresh herbs—the soul of authentic Indian heritage.",
      align: "right",
    },
    {
      id: "signature",
      startPct: 0.50,
      endPct: 0.67,
      badge: "SIGNATURE MASTERPIECE",
      title: "Crafted by Master Ustads",
      description: "Velvety hand-churned paneer curries, slow-cooked gravies simmered over charcoal, and delicate desserts crowned with real silver vark.",
      align: "left",
    },
    {
      id: "ambience",
      startPct: 0.67,
      endPct: 0.83,
      badge: "MEMORABLE GATHERINGS",
      title: "Warm Ambiance & Hospitality",
      description: "Lush botanical textures, glowing chandeliers, and intimate dining spaces designed for cherished conversations and family celebrations.",
      align: "center",
    },
    {
      id: "grand-finale",
      startPct: 0.83,
      endPct: 1.0,
      badge: "ZAIKA JUNCTION",
      title: "Good Food. Great Moments.",
      description: "Your royal table is ready. Experience genuine Lucknowi warmth, extraordinary multi-cuisine tastes, and moments you'll cherish forever.",
      align: "center",
    },
  ],

  specialties: [
    {
      id: "dum-biryani",
      name: "Awadhi Dum Gosht Biryani",
      subtitle: "Slow-cooked in Sealed Handi",
      description: "Long-grain aged basmati rice layered with succulent cuts, saffron milk, caramelized onions, and secret Lucknowi potli masalas.",
      price: 495,
      badge: "Chef's Signature",
      image: "/frames/frame_018.webp",
      tags: ["Slow Cooked", "Aromatic", "Royal Heritage"]
    },
    {
      id: "paneer-lababdar",
      name: "Shahi Paneer Lababdar",
      subtitle: "Rich Cashew & Tomato Velouté",
      description: "Cottage cheese cubes tossed with freshly grated ginger, crushed coriander seeds, and a velvety rich tomato-cashew reduction topped with cream.",
      price: 385,
      badge: "Guest Favorite",
      image: "/frames/frame_044.webp",
      tags: ["Mild & Creamy", "Vegetarian", "Clay Pot"]
    },
    {
      id: "crispy-wok-noodles",
      name: "Sichuan Wok Hakka Noodles",
      subtitle: "High-Flame Multi-Cuisine Wok",
      description: "Thin egg noodles tossed with shredded bell peppers, spring greens, burnt garlic, and toasted sesame in spicy umami house sauce.",
      price: 320,
      badge: "Multi-Cuisine",
      image: "/frames/frame_016.webp",
      tags: ["Smoky Wok Hei", "Crispy", "Popular"]
    },
    {
      id: "shahi-tukda",
      name: "Royal Awadhi Shahi Tukda",
      subtitle: "Crowned with Silver Vark & Pistachio",
      description: "Crispy ghee-fried bread steeped in cardamom saffron syrup, blanketed in thick rabri, sliced almonds, and edible silver vark.",
      price: 240,
      badge: "Dessert Royalty",
      image: "/frames/frame_045.webp",
      tags: ["Sweet", "Saffron", "Authentic"]
    }
  ],

  menuCategories: [
    "All",
    "Starters & Kebabs",
    "Dum Biryanis",
    "Mughlai Gravies",
    "Tandoor Breads",
    "Asian & Wok",
    "Desserts & Drinks"
  ],

  menuItems: [
    {
      id: "m1",
      name: "Awadhi Murgh Dum Biryani",
      description: "Marinated tender chicken dum-pukht cooked with saffron basmati rice, mint, and whole spices.",
      price: 420,
      category: "Dum Biryanis",
      dietary: "non-veg",
      isChefSpecial: true,
      isPopular: true,
      spiceLevel: 2
    },
    {
      id: "m2",
      name: "Subz Tarkari Handi Biryani",
      description: "Fresh garden vegetables, baby potatoes, and paneer cubes infused with saffron basmati rice.",
      price: 340,
      category: "Dum Biryanis",
      dietary: "veg",
      isPopular: true,
      spiceLevel: 1
    },
    {
      id: "m3",
      name: "Galouti Kebab Melt",
      description: "Legendary melt-in-the-mouth kebabs infused with 160 royal spices, served on mini sheermaal.",
      price: 460,
      category: "Starters & Kebabs",
      dietary: "non-veg",
      isChefSpecial: true,
      isPopular: true,
      spiceLevel: 2
    },
    {
      id: "m4",
      name: "Paneer Tikka Angara",
      description: "Smoky cottage cheese cubes steeped in hung curd, Kashmiri deggi mirch, and roasted mustard oil.",
      price: 360,
      category: "Starters & Kebabs",
      dietary: "veg",
      isPopular: true,
      spiceLevel: 2
    },
    {
      id: "m5",
      name: "Crispy Kurkure Lotus Stem",
      description: "Crunchy lotus stem tossed in honey chili glaze with toasted sesame and green scallions.",
      price: 310,
      category: "Starters & Kebabs",
      dietary: "veg",
      isPopular: true,
      spiceLevel: 2
    },
    {
      id: "m6",
      name: "Butter Chicken Nizam",
      description: "Boneless tandoori chicken cooked in velvety tomato, makhana, butter, and dried kasuri methi sauce.",
      price: 440,
      category: "Mughlai Gravies",
      dietary: "non-veg",
      isChefSpecial: true,
      isPopular: true,
      spiceLevel: 1
    },
    {
      id: "m7",
      name: "Dal Makhani Bukhara",
      description: "Black lentils slow-simmered over glowing charcoal for 24 hours with butter and fresh cream.",
      price: 330,
      category: "Mughlai Gravies",
      dietary: "veg",
      isChefSpecial: true,
      isPopular: true,
      spiceLevel: 1
    },
    {
      id: "m8",
      name: "Paneer Lababdar",
      description: "Cottage cheese tossed in fragrant onion tomato gravy, cream, and crushed coriander.",
      price: 375,
      category: "Mughlai Gravies",
      dietary: "veg",
      isPopular: true,
      spiceLevel: 2
    },
    {
      id: "m9",
      name: "Wok Tossed Hakka Noodles",
      description: "Fresh noodles wok-fired with julienned vegetables, dark soy, and toasted sesame aromatics.",
      price: 260,
      category: "Asian & Wok",
      dietary: "veg",
      isPopular: true,
      spiceLevel: 1
    },
    {
      id: "m10",
      name: "Chilli Garlic Chicken Bowl",
      description: "Crispy chicken morsels tossed in fiery garlic scallion reduction with bell peppers.",
      price: 380,
      category: "Asian & Wok",
      dietary: "non-veg",
      spiceLevel: 3
    },
    {
      id: "m11",
      name: "Tandoori Garlic Butter Naan",
      description: "Soft artisan flatbread with roasted garlic flakes, coriander, and rich melted butter.",
      price: 85,
      category: "Tandoor Breads",
      dietary: "veg",
      isPopular: true
    },
    {
      id: "m12",
      name: "Awadhi Roomali Roti",
      description: "Ultra-thin handkerchief bread hand-stretched and baked on inverted hot dome tawa.",
      price: 65,
      category: "Tandoor Breads",
      dietary: "veg"
    },
    {
      id: "m13",
      name: "Royal Shahi Tukda with Rabri",
      description: "Ghee crisped bread soaked in fragrant saffron syrup, blanketed in condensed milk rabri.",
      price: 220,
      category: "Desserts & Drinks",
      dietary: "veg",
      isChefSpecial: true,
      isPopular: true
    },
    {
      id: "m14",
      name: "Zaika Mint Mojito",
      description: "Sparkling crushed ice mocktail with crushed garden mint, zesty lime, and rock sugar.",
      price: 180,
      category: "Desserts & Drinks",
      dietary: "veg",
      isPopular: true
    },
    {
      id: "m15",
      name: "Kesar Pista Thandai",
      description: "Chilled milk infused with saffron strands, crushed pistachios, cardamom, and melon seeds.",
      price: 210,
      category: "Desserts & Drinks",
      dietary: "veg"
    }
  ],

  reviews: [
    {
      id: "r1",
      author: "Aditya Mehrotra",
      role: "Food Connoisseur & Critic",
      rating: 5,
      comment: "The cinematic 3D journey on the website was stunning, but tasting their Dum Biryani in person was genuinely transcendent. The spices speak royal history.",
      favoriteDish: "Awadhi Dum Gosht Biryani"
    },
    {
      id: "r2",
      author: "Sneha Kapoor",
      role: "Civil Lines Resident",
      rating: 5,
      comment: "Zaika Junction has elevated multi-cuisine dining in Lucknow. The Dal Bukhara and Galouti kebabs are peerless, and the staff hospitality is world-class.",
      favoriteDish: "Galouti Kebab Melt"
    },
    {
      id: "r3",
      author: "Dr. Farhan Qureshi",
      role: "Family Gathering Host",
      rating: 5,
      comment: "We hosted an intimate 25th anniversary celebration here. From the ambiance to the Shahi Tukda dessert, every moment was sheer perfection.",
      favoriteDish: "Royal Awadhi Shahi Tukda"
    }
  ]
};
