export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  habitat: string;
  medicinalUses: string[];
  funFacts: string[];
  imageUrl: string;
  distribution: string[];
}

const plants: Plant[] = [
  {
    id: 1,
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    category: "Medicinal",
    description: "Tulsi is a sacred plant in Hindu tradition. It's a bushy shrub that grows to about 1-2 feet tall with aromatic leaves.",
    habitat: "Found throughout India in homes, temples, and gardens",
    medicinalUses: [
      "Treats respiratory disorders",
      "Reduces stress and anxiety",
      "Lowers blood sugar levels",
      "Supports immune system"
    ],
    funFacts: [
      "Often worshipped in the morning and evening by Hindus",
      "Known as 'The Queen of Herbs' in Ayurveda",
      "Has three main varieties: Rama, Krishna, and Vana Tulsi"
    ],
    imageUrl: "/assets/plants/tulsi.jpg",
    distribution: ["Throughout India", "South and Southeast Asia"]
  },
  {
    id: 2,
    name: "Neem",
    scientificName: "Azadirachta indica",
    category: "Medicinal",
    description: "Neem is a fast-growing tree known for its bitter leaves and medicinal properties. It can grow up to 15-20 meters tall.",
    habitat: "Grows in tropical and semi-tropical regions",
    medicinalUses: [
      "Natural antiseptic and antibacterial",
      "Treats skin disorders",
      "Dental care",
      "Natural pesticide"
    ],
    funFacts: [
      "Called 'Nature's Drugstore' due to its numerous medicinal properties",
      "Can survive drought and poor soil conditions",
      "Seeds contain oil used in soaps and cosmetics"
    ],
    imageUrl: "/assets/plants/neem.jpg",
    distribution: ["Throughout India", "Myanmar", "Bangladesh"]
  },
  {
    id: 3,
    name: "Banyan Tree",
    scientificName: "Ficus benghalensis",
    category: "Sacred",
    description: "The Banyan is a fig tree known for its aerial roots that grow into thick woody trunks. It's India's national tree.",
    habitat: "Tropical regions with adequate water supply",
    medicinalUses: [
      "Treats diabetes",
      "Reduces inflammation",
      "Helps with digestive disorders",
      "Used for treating skin conditions"
    ],
    funFacts: [
      "Can cover vast areas - the largest Banyan tree covers about 4 acres",
      "Considered sacred in Hinduism, Buddhism and Jainism",
      "Can live for several hundred years"
    ],
    imageUrl: "/assets/plants/banyan.jpg",
    distribution: ["Throughout India", "Pakistan", "Sri Lanka"]
  },
  {
    id: 4,
    name: "Indian Lotus",
    scientificName: "Nelumbo nucifera",
    category: "Aquatic",
    description: "The Indian Lotus is an aquatic plant with circular leaves and stunning pink or white flowers that float on water.",
    habitat: "Lakes, ponds and wetlands across India",
    medicinalUses: [
      "Seeds used to treat digestive disorders",
      "Stem extract helps control bleeding",
      "Leaves used for treating fever",
      "Rhizomes have anti-diabetic properties"
    ],
    funFacts: [
      "India's national flower",
      "Symbol of purity, beauty, and enlightenment",
      "Lotus seeds can remain viable for hundreds of years"
    ],
    imageUrl: "/assets/plants/lotus.jpg",
    distribution: ["Throughout India", "East Asia", "Australia"]
  },
  {
    id: 5,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "Medicinal",
    description: "Ashwagandha is a short perennial shrub with small green flowers and red berries. Its roots have a strong horse-like odor.",
    habitat: "Dry regions of India, particularly in Madhya Pradesh, Rajasthan, and Gujarat",
    medicinalUses: [
      "Reduces stress and anxiety",
      "Boosts energy and improves concentration",
      "Strengthens immune system",
      "Improves sleep quality"
    ],
    funFacts: [
      "Name means 'smell of horse' in Sanskrit, referring to both its odor and strength-giving properties",
      "Called 'Indian Ginseng' though not related to true ginseng",
      "Used in Ayurvedic medicine for over 3,000 years"
    ],
    imageUrl: "/assets/plants/ashwagandha.jpg",
    distribution: ["North and Central India", "Parts of Africa"]
  },
  {
    id: 6,
    name: "Sandalwood",
    scientificName: "Santalum album",
    category: "Aromatic",
    description: "Sandalwood is a parasitic tree known for its distinctive fragrant heartwood. It grows slowly and can reach 9 meters in height.",
    habitat: "Deccan Plateau, particularly in Karnataka and Tamil Nadu",
    medicinalUses: [
      "Treats skin conditions",
      "Cooling agent for rashes and burns",
      "Helps with anxiety and insomnia",
      "Used in aromatherapy"
    ],
    funFacts: [
      "One of the most expensive woods in the world",
      "Trees must be at least 30 years old before harvesting for their fragrant heartwood",
      "Endangered due to over-exploitation and illegal harvesting"
    ],
    imageUrl: "/assets/plants/sandalwood.jpg",
    distribution: ["Southern India", "Indonesia", "Australia"]
  },
  {
    id: 7,
    name: "Bamboo",
    scientificName: "Bambusoideae (various species)",
    category: "Grass",
    description: "Bamboo is a fast-growing woody grass with hollow stems that can grow to tremendous heights in just a few months.",
    habitat: "Throughout India, especially in Northeast regions",
    medicinalUses: [
      "Young shoots have anti-inflammatory properties",
      "Silica-rich extract strengthens hair and nails",
      "Leaf tea helps with respiratory issues",
      "Traditional remedy for joint pain"
    ],
    funFacts: [
      "Can grow up to 91 cm in a single day, making it one of the fastest-growing plants",
      "Flowers only once in its lifetime, with all plants of a species flowering simultaneously",
      "Stronger tensile strength than steel when compared weight for weight"
    ],
    imageUrl: "/assets/plants/bamboo.jpg",
    distribution: ["Northeast India", "Across South and Southeast Asia"]
  },
  {
    id: 8,
    name: "Indian Blackberry (Jamun)",
    scientificName: "Syzygium cumini",
    category: "Fruit",
    description: "Jamun is an evergreen tropical tree with purple-black berries that have a sweet-sour taste and stain the tongue purple.",
    habitat: "Throughout India, especially in coastal regions",
    medicinalUses: [
      "Seeds and fruit help control diabetes",
      "Treats digestive disorders",
      "Bark has astringent properties",
      "Helps with blood purification"
    ],
    funFacts: [
      "Fruits ripen during the monsoon season",
      "Wood is water resistant and used for railway sleepers",
      "A single tree can produce up to 100 kg of fruit per season"
    ],
    imageUrl: "/assets/plants/jamun.jpg",
    distribution: ["Throughout India", "Bangladesh", "Nepal", "Pakistan"]
  },
  {
    id: 9,
    name: "Marigold",
    scientificName: "Tagetes erecta",
    category: "Ornamental",
    description: "Marigold plants have bright yellow, orange, or red flowers with a distinctive scent. They are widely used in religious ceremonies.",
    habitat: "Cultivated throughout India",
    medicinalUses: [
      "Treats skin conditions",
      "Helps with eye inflammation",
      "Used for wound healing",
      "Natural insect repellent"
    ],
    funFacts: [
      "Essential in many Indian religious ceremonies and festivals",
      "Used to make 'flower carpets' during Onam festival in Kerala",
      "Natural dye source for textiles"
    ],
    imageUrl: "/assets/plants/marigold.jpg",
    distribution: ["Cultivated throughout India", "Native to Mexico and Central America"]
  },
  {
    id: 10,
    name: "Peepal Tree",
    scientificName: "Ficus religiosa",
    category: "Sacred",
    description: "The Peepal or Sacred Fig has heart-shaped leaves with distinctive extended tips. It's a large deciduous tree that can grow very old.",
    habitat: "Throughout India, often near temples and sacred sites",
    medicinalUses: [
      "Treats respiratory disorders",
      "Helps with digestive issues",
      "Bark used for skin diseases",
      "Leaves have anti-diabetic properties"
    ],
    funFacts: [
      "Buddha attained enlightenment under a Peepal tree",
      "Believed to be inhabited by the Trinity of Gods - Brahma, Vishnu, and Shiva",
      "Releases oxygen even at night, unlike most other plants"
    ],
    imageUrl: "/assets/plants/peepal.jpg",
    distribution: ["Throughout India", "Southeast Asia", "Parts of China"]
  }
];

export default plants; 