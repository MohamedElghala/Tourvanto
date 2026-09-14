// =========================================================================
// Tourvanto - Initial High-Converting Tours Catalog with Competitor-Grade Features
// Includes: Urgency badges (Viator style), Reviews with Nationalities, and Itineraries
// =========================================================================

const initialTours = [
  {
    id: "tour-1",
    category: "safari",
    rating: 4.9,
    reviewsCount: 342,
    durationHours: 6,
    priceEUR: 35,
    featured: true,
    likelyToSellOut: true,
    badgeOfExcellence: true,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "Mega Desert Quad Bike Safari, Bedouin Village & BBQ Dinner with Stargazing",
      de: "Mega Wüsten-Quad-Safari, Beduinendorf & BBQ-Abendessen mit Sternenbeobachtung",
      ru: "Мега-сафари на квадроциклах по пустыне, деревня бедуинов, барбекю и звезды",
      fr: "Super Safari en Quad dans le Désert, Village Bédouin & Dîner Barbecue aux Étoiles",
      it: "Mega Safari in Quad nel Deserto, Villaggio Beduino & Cena BBQ sotto le Stelle"
    },
    descriptions: {
      en: "Conquer the golden desert dunes on a high-powered quad bike, visit an authentic Bedouin settlement, ride camels, and enjoy an open oriental barbecue dinner under a sky full of stars.",
      de: "Bezwingen Sie die goldenen Sanddünen auf einem kraftvollen Quad, besuchen Sie ein authentisches Beduinendorf, reiten Sie auf Kamelen und genießen Sie ein orientalisches Barbecue-Abendessen unter dem Sternenhimmel.",
      ru: "Покорите песчаные дюны на мощном квадроцикле, посетите аутентичную бедуинскую деревню, покатайтесь на верблюдах и насладитесь восточным ужином-барбекю под звездным небом.",
      fr: "Partez à la conquête des dunes dorées en quad puissant, visitez un village bédouin traditionnel, faites une balade à dos de chameau et savourez un dîner barbecue oriental sous les étoiles.",
      it: "Conquista le dune dorate del deserto su un potente quad, visita un autentico villaggio beduino, cavalca i cammelli e goditi una cena barbecue orientale sotto il cielo stellato."
    },
    itinerary: [
      { time: "14:00", title: "Hotel Pickup", desc: "Air-conditioned modern van pickup from your hotel lobby." },
      { time: "15:00", title: "Quad Driving Tutorial & Desert Rush", desc: "Professional safety briefing followed by 45km of thrilling dune riding." },
      { time: "17:00", title: "Bedouin Settlement & Camel Ride", desc: "Taste herbal Bedouin tea, learn ancient bread baking and ride camels." },
      { time: "18:30", title: "Open Buffet BBQ & Folklore Show", desc: "Enjoy grilled meats, fresh salads, and Tanoura dancing performances." },
      { time: "20:00", title: "Return to Hotel", desc: "Comfortable drive back to your resort." }
    ],
    included: [
      "Round-trip hotel transfers in air-conditioned vehicle",
      "Quad bike with helmet and safety gear",
      "Camel ride and Bedouin herbal tea",
      "Open buffet BBQ dinner with soft drinks and water",
      "Live oriental show (Tanoura dance, fire show)"
    ],
    excluded: [
      "Head scarf (shemagh) & protective sunglasses (available for purchase)",
      "Personal tips and photography souvenirs"
    ],
    reviews: [
      { author: "Maximilian K.", country: "🇩🇪 Germany", rating: 5, date: "September 2026", text: "Unglaubliche Erfahrung! Die Quads waren in top Zustand und der Sonnenuntergang in der Wüste war magisch. Barzahlung bei Abholung hat super geklappt!" },
      { author: "Olga S.", country: "🇷🇺 Russia", rating: 5, date: "August 2026", text: "Отличная организация, забрали вовремя из отеля. Бедуинский чай и шоу просто супер! Очень удобно, что заплатили наличными на месте." }
    ]
  },
  {
    id: "tour-2",
    category: "sea",
    rating: 4.95,
    reviewsCount: 489,
    durationHours: 8,
    priceEUR: 45,
    featured: true,
    likelyToSellOut: true,
    badgeOfExcellence: true,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "VIP Red Sea Yacht Cruise: Dolphin House, 2 Snorkeling Stops & Seafood Lunch",
      de: "VIP Rotes Meer Yachtkreuzfahrt: Delfinhaus, 2 Schnorchelstopps & Meeresfrüchte-Mittagessen",
      ru: "VIP морская прогулка на яхте: Дом дельфинов, снорклинг на рифах и обед с морепродуктами",
      fr: "Croisière VIP en Yacht sur la Mer Rouge : Baie des Dauphins, Snorkeling & Déjeuner Fruits de Mer",
      it: "Crociera VIP in Yacht sul Mar Rosso: Dolphin House, Snorkeling & Pranzo a base di Pesce"
    },
    descriptions: {
      en: "Sail aboard a luxury 3-deck yacht into the crystal-clear Red Sea. Swim alongside wild dolphins, explore vibrant coral reefs teeming with exotic marine life, and savor a fresh seafood lunch.",
      de: "Segeln Sie auf einer luxuriösen 3-Deck-Yacht durch das kristallklare Rote Meer. Schwimmen Sie neben wilden Delfinen, erkunden Sie farbenfrohe Korallenriffe und genießen Sie ein frisches Meeresfrüchte-Mittagessen.",
      ru: "Отправьтесь в круиз на роскошной трехпалубной яхте по прозрачным водам Красного моря. Поплавайте рядом с дикими дельфинами, исследуйте коралловые рифы и отведайте свежие морепродукты.",
      fr: "Naviguez à bord d'un yacht de luxe sur la mer Rouge. Nagez près des dauphins sauvages, explorez les récifs coralliens multicolores et dégustez un somptueux buffet de fruits de mer.",
      it: "Naviga a bordo di un lussuoso yacht a 3 ponti nel Mar Rosso. Nuota accanto ai delfini liberi, esplora barriere coralline mozzafiato e gusta un delizioso pranzo a base di pesce fresco."
    },
    itinerary: [
      { time: "08:00", title: "Hotel Transfer to Marina", desc: "Private pickup and boarding the VIP yacht." },
      { time: "09:30", title: "Dolphin Reef Encounter", desc: "Cruise towards the famous Dolphin House with high chance of dolphin sightings." },
      { time: "11:30", title: "First Coral Reef Snorkeling Stop", desc: "Guided snorkeling with certified dive instructors." },
      { time: "13:00", title: "Open Seafood Buffet Lunch", desc: "Freshly prepared shrimps, calamari, grilled fish, pasta, and fresh fruits." },
      { time: "14:30", title: "Second Snorkeling Stop & Banana Boat", desc: "Explore shallow coral gardens plus exciting water sports fun." },
      { time: "16:30", title: "Marina Arrival & Hotel Transfer", desc: "Return to your hotel with golden hour views." }
    ],
    included: [
      "Hotel round-trip transfers",
      "High-end snorkel mask, snorkel, and life jacket",
      "Full buffet seafood and grilled chicken lunch",
      "Unlimited coffee, tea, soft drinks, and mineral water all day",
      "Water sports fun rides (Banana boat and sofa tube)",
      "Marine national park entrance fees"
    ],
    excluded: [
      "Underwater camera hire (optional)",
      "Personal gratuities"
    ],
    reviews: [
      { author: "Sophie B.", country: "🇬🇧 United Kingdom", rating: 5, date: "September 2026", text: "We saw a family of five dolphins swimming right next to the boat! The seafood lunch was delicious, and the crew was exceptionally kind." },
      { author: "Lucas M.", country: "🇫🇷 France", rating: 5, date: "August 2026", text: "Yacht très propre, équipage aux petits soins. Les coraux sont magnifiques. Réservation facile via WhatsApp !" }
    ]
  },
  {
    id: "tour-3",
    category: "culture",
    rating: 4.98,
    reviewsCount: 275,
    durationHours: 14,
    priceEUR: 85,
    featured: true,
    likelyToSellOut: false,
    badgeOfExcellence: true,
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "Luxor & Valley of the Kings Full-Day Excursion with Karnak Temple & Nile Boat",
      de: "Luxor & Tal der Könige Ganztagesausflug mit Karnak-Tempel & Nilboot",
      ru: "Луксор и Долина Царей: храм Карнак, храм Хатшепсут, Колоссы Мемнона и лодка по Нилу",
      fr: "Journée Complète à Louxor & Vallée des Rois avec Temple de Karnak et Bateau sur le Nil",
      it: "Tour di un Giorno a Luxor & Valle dei Re con Tempio di Karnak e Barca sul Nilo"
    },
    descriptions: {
      en: "Step into the greatest open-air museum on Earth. Explore the monumental Karnak Temple, cross the Nile by traditional boat, and enter the royal tombs inside the Valley of the Kings with an Egyptologist guide.",
      de: "Betreten Sie das größte Freilichtmuseum der Erde. Bestaunen Sie den monumentalen Karnak-Tempel, überqueren Sie den Nil im Motorboot und besichtigen Sie die Königsgräber im Tal der Könige mit einem Ägyptologen.",
      ru: "Посетите величайший музей под открытым небом на планете. Увидите грандиозный Карнакский храм, пересеките Нил на традиционной лодке и спуститесь в царские гробницы Долины Царей.",
      fr: "Entrez dans le plus grand musée à ciel ouvert au monde. Explorez le colossal temple de Karnak, traversez le Nil en bateau traditionnel et découvrez les tombes royales de la Vallée des Rois avec un égyptologue.",
      it: "Entra nel più grande museo a cielo aperto del mondo. Ammira il colossale Tempio di Karnak, attraversa il Nilo in barca ed esplora le tombe reali nella Valle dei Re con una guida egittologa."
    },
    itinerary: [
      { time: "05:00", title: "Early Hotel Pickup", desc: "Private modern air-conditioned vehicle departure." },
      { time: "09:30", title: "Karnak Temple Complex", desc: "Walk through the Great Hypostyle Hall with 134 towering stone columns." },
      { time: "12:30", title: "Nile Boat Crossing & Riverside Lunch", desc: "Relaxing Nile boat ride followed by delicious Egyptian lunch on the West Bank." },
      { time: "14:00", title: "Valley of the Kings", desc: "Enter 3 magnificent ancient pharaoh tombs with original vivid wall paintings." },
      { time: "15:30", title: "Queen Hatshepsut Temple & Colossi of Memnon", desc: "Marvel at the terraced temple built directly into the towering limestone cliffs." },
      { time: "19:30", title: "Return to Hotel", desc: "Arrival back at your resort." }
    ],
    included: [
      "Hotel pickup & drop-off in deluxe air-conditioned transport",
      "Licensed expert Egyptologist tour guide speaking your language",
      "All admission tickets to Karnak Temple and Valley of the Kings (3 tombs)",
      "Traditional boat crossing over the River Nile",
      "Delicious lunch at a selected authentic restaurant"
    ],
    excluded: [
      "Entry to King Tutankhamun tomb (optional ticket on-site)",
      "Beverages during lunch"
    ],
    reviews: [
      { author: "Matteo R.", country: "🇮🇹 Italy", rating: 5, date: "September 2026", text: "La nostra guida Ahmed parlava un italiano impeccabile e conosceva ogni singolo geroglifico. Un viaggio nel tempo indimenticabile." }
    ]
  },
  {
    id: "tour-4",
    category: "culture",
    rating: 4.97,
    reviewsCount: 198,
    durationHours: 16,
    priceEUR: 95,
    featured: true,
    likelyToSellOut: true,
    badgeOfExcellence: true,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "Cairo & Giza Pyramids VIP Tour with Sphinx & Grand Egyptian Museum",
      de: "Kairo & Gizeh Pyramiden VIP-Tour mit Sphinx & Neuem Großen Ägyptischen Museum",
      ru: "Каир и Пирамиды Гизы: Сфинкс, плато Гиза и Новый Большой Египетский Музей (GEM)",
      fr: "Le Caire & Pyramides de Gizeh VIP avec Sphinx et Grand Musée Égyptien",
      it: "Il Cairo & Piramidi di Giza VIP con Sfinge e Nuovo Grande Museo Egizio"
    },
    descriptions: {
      en: "Stand before the last remaining wonder of the ancient world. Gaze upon the Great Pyramid of Khufu, meet the enigmatic Sphinx, and discover thousands of treasures inside the world's largest museum.",
      de: "Stehen Sie vor dem letzten erhaltenen Weltwunder der Antike. Bestaunen Sie die Cheops-Pyramide, die rätselhafte Sphinx und unschätzbare Schätze im neuen Grand Egyptian Museum.",
      ru: "Прикоснитесь к последнему из уцелевших чудес древнего мира. Величественные пирамиды Хеопса, загадочный Сфинкс и шедевры древности в новом Большом Египетском Музее.",
      fr: "Rendez-vous devant la dernière merveille du monde antique encore debout. Admirez la grande pyramide de Khéops, le Sphinx et les trésors millénaires du nouveau Grand Musée.",
      it: "Ammira l'ultima meraviglia del mondo antico ancora esistente. Visita la Grande Piramide di Cheope, l'enigmatica Sfinge e i tesori dorati del nuovo Grand Egyptian Museum."
    },
    itinerary: [
      { time: "04:30", title: "Hotel Departure", desc: "Comfortable highway ride in luxury coach or private limousine." },
      { time: "09:30", title: "Giza Plateau & The Great Pyramids", desc: "Visit Khufu, Khafre, Menkaure pyramids with panoramic photo stop." },
      { time: "11:30", title: "The Great Sphinx & Valley Temple", desc: "Stand face to face with the legendary guardian of the pyramids." },
      { time: "13:00", title: "Panoramic Lunch", desc: "Enjoy an oriental lunch with spectacular views." },
      { time: "14:30", title: "Grand Egyptian Museum (GEM)", desc: "Guided tour through the grand architectural hall and royal artifact galleries." },
      { time: "21:00", title: "Hotel Drop-off", desc: "Safe return to your accommodation." }
    ],
    included: [
      "Door-to-door hotel transport in air-conditioned vehicle",
      "Certified multilingual Egyptologist guide",
      "Official entry tickets to Giza Pyramids area and Sphinx",
      "Full lunch at a selected quality restaurant"
    ],
    excluded: [
      "Entry ticket inside the burial chambers of the Great Pyramid (optional)",
      "Drinks during lunch"
    ],
    reviews: [
      { author: "Hans & Helga W.", country: "🇩🇪 Germany", rating: 5, date: "September 2026", text: "Das neue Museum ist der absolute Wahnsinn! Privater Minibus war sehr bequem. 10 von 10 Sternen für Tourvanto!" }
    ]
  },
  {
    id: "tour-5",
    category: "adventure",
    rating: 4.92,
    reviewsCount: 310,
    durationHours: 7,
    priceEUR: 40,
    featured: false,
    likelyToSellOut: true,
    badgeOfExcellence: false,
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "Orange Bay Island Caribbean Beach Day with Snorkeling & Water Games",
      de: "Orange Bay Insel 'Karibik-Strandtag' mit Schnorcheln & Wassersport",
      ru: "Остров Оранж Бэй (Египетские Мальдивы): белый пляж, снорклинг и обед",
      fr: "Journée Plage Caraïbe à Orange Bay Island avec Snorkeling & Sports Nautiques",
      it: "Spiaggia Caraibica di Orange Bay con Snorkeling e Sport Acquatici"
    },
    descriptions: {
      en: "Experience the 'Egyptian Maldives'! Relax on the powdery white sands of Orange Bay Island, swing in the turquoise shallow waters, and snorkel at vibrant coral gardens.",
      de: "Erleben Sie die 'ägyptischen Malediven'! Entspannen Sie am schneeweißen Sandstrand von Orange Bay, schaukeln Sie im seichten Wasser und schnorcheln Sie an bunten Riffen.",
      ru: "Насладитесь 'египетскими Мальдивами'! Белоснежный песок острова Оранж Бэй, лазурное мелководье, качели в море и великолепный снорклинг на коралловых рифах.",
      fr: "Découvrez les 'Maldives d'Égypte' ! Détendez-vous sur le sable blanc immaculé d'Orange Bay, profitez des balançoires dans l'eau turquoise et faites du snorkeling.",
      it: "Vivi le 'Maldive d'Egitto'! Rilassati sulla sabbia bianca finissima di Orange Bay, dondolati sulle altalene in acqua e fai snorkeling tra coralli spettacolari."
    },
    itinerary: [
      { time: "08:30", title: "Marina Departure", desc: "Boarding the cruise boat." },
      { time: "10:00", title: "Orange Bay Island Stay (2 Hours)", desc: "Free time for sunbathing, swimming, and iconic photography." },
      { time: "12:30", title: "Onboard Buffet Lunch", desc: "Freshly cooked hot lunch and cold drinks." },
      { time: "14:00", title: "Guided Snorkeling Session", desc: "Discover untouched marine ecosystems." },
      { time: "16:00", title: "Return to Port", desc: "Transfer back to hotel." }
    ],
    included: [
      "Hotel round-trip transport",
      "Orange Bay island entrance ticket (2 hours)",
      "Snorkeling gear (mask, snorkel, fins)",
      "Lunch buffet with soft drinks and bottled water"
    ],
    excluded: [
      "Island bar cocktails / personal purchases"
    ],
    reviews: [
      { author: "Elena V.", country: "🇷🇺 Russia", rating: 5, date: "July 2026", text: "Нереально красивый цвет воды, фото получились как из журнала! Обед на корабле вкусный." }
    ]
  },
  {
    id: "tour-6",
    category: "transfers",
    rating: 5.0,
    reviewsCount: 154,
    durationHours: 1,
    priceEUR: 25,
    featured: false,
    likelyToSellOut: false,
    badgeOfExcellence: true,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80"
    ],
    titles: {
      en: "VIP Private Airport Transfer (Airport ⇄ Hotel) with Flight Tracking & Meet & Greet",
      de: "VIP Privater Flughafentransfer (Flughafen ⇄ Hotel) mit Flugverfolgung & Empfang",
      ru: "VIP Индивидуальный трансфер (Аэропорт ⇄ Отель) с отслеживанием рейса и встречей с табличкой",
      fr: "Transfert Privé VIP Aéroport ⇄ Hôtel avec Suivi de Vol et Accueil Personnalisé",
      it: "Transfer Privato VIP Aeroporto ⇄ Hotel con Monitoraggio Volo e Accoglienza"
    },
    descriptions: {
      en: "Skip the taxi queues and hassle. Enjoy an exclusive, comfortable private transfer in a modern air-conditioned vehicle. Your driver will meet you with a nameboard at arrivals.",
      de: "Keine Warteschlangen und kein Verhandeln am Flughafen. Genießen Sie einen exklusiven privaten Transfer im modernen Fahrzeug mit persönlichem Empfang.",
      ru: "Забудьте об очередях и спорах с таксистами. Комфортный индивидуальный трансфер на новом автомобиле с кондиционером. Водитель встретит вас с именной табличкой.",
      fr: "Évitez les files d'attente de taxis. Profitez d'un transfert privé exclusif dans un véhicule récent climatisé avec accueil personnalisé dès votre sortie du terminal.",
      it: "Evita le code dei taxi e le contrattazioni. Goditi un comodo transfer privato in veicolo moderno con autista che ti aspetta con un cartello con il tuo nome."
    },
    itinerary: [
      { time: "00:00", title: "Flight Tracking", desc: "We monitor your flight status for early arrivals or delays." },
      { time: "00:15", title: "Meet & Greet at Terminal", desc: "Professional driver waiting with your personalized nameplate." },
      { time: "00:30", title: "Direct Hotel Drop-off", desc: "Smooth, air-conditioned ride straight to your resort reception." }
    ],
    included: [
      "Private vehicle (Mercedes Van / Sedan) exclusively for your party",
      "Professional English/German speaking chauffeur",
      "Free flight delay waiting time up to 90 minutes",
      "Luggage handling assistance and bottled water inside car",
      "Airport parking and highway toll fees"
    ],
    excluded: [
      "Driver tip (discretionary)"
    ],
    reviews: [
      { author: "Michael T.", country: "🇬🇧 United Kingdom", rating: 5, date: "August 2026", text: "Flight was delayed 45 minutes but the driver was waiting with a smile and cold water. Very clean Mercedes van." }
    ]
  }
];
