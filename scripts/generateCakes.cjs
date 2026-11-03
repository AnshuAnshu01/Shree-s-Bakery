const fs = require('fs');
const path = require('path');

const cakeDir = path.join(__dirname, '..', 'public', 'cake');
const files = fs.readdirSync(cakeDir).filter(f => !f.startsWith('.'));

const titles = [
  'Royal Golden Crown Birthday Cake',
  'Enchanted Fairytale Princess Castle',
  'Cascading Floral Rose Romance Cake',
  'Velvet Red Heart Anniversary Cake',
  'Action Superhero Birthday Champion',
  'Belgian Double Chocolate Ganache',
  'Two-Tier Grand Anniversary Milestone',
  'Butterscotch Golden Caramel Crunch',
  'Jungle Safari Animal Kingdom Cake',
  'Pretty In Pink Rosette Ribbon Cake',
  'Little Angel Baby Shower Celebration',
  'Sky Blue Cloud & Star Fantasy Cake',
  'Dutch Truffle Chocolate Drip Royale',
  'Unicorn Rainbow Pastel Magic Cake',
  'Floral Garden Semi-Naked Cake',
  'Classic Black Forest Cherry Delight',
  'Golden Pearl Milestone Celebration',
  'Cute Cartoon Character Kids Special',
  'Cream Cheese Velvet Bliss Cake',
  'Royal Cardamom Rasmalai Cake',
  'Sparkling Gems & Macaron Fantasy',
  'Midnight Chocolate Silk Indulgence',
  'Little Prince Royal Blue Celebration',
  'Strawberry Cream Cloud Cake',
  'Butterfly Garden Pastel Cake',
  'Ferrero Hazelnut Decadence Cake',
  'Sweet Heartbeat Valentine Surprise',
  'Mickey & Friends Cartoon Joy Cake',
  'Vintage Piped Victorian Lambeth Cake',
  'Pineapple Sunshine Tropical Cream',
  'Golden 1st Birthday Milestone Cake',
  'Love Blossom Custom Anniversary Cake',
  'Chocolate KitKat & Gems Loaded Cake',
  'Pastel Ombre Rosette Cascade',
  'Soccer Champion Sports Birthday Cake',
  'Silver & Gold Elegant Wedding Tier',
  'Fluffy Vanilla Snowdrop Rosette Cake',
  'Dark Belgian Truffle Luxury Sphere',
  'Barbie Doll Floral Gown Creation',
  'Honey Almond Crunchy Buttercream',
  'Rainbow Layer Fiesta Birthday Cake',
  'Modern Minimalist Luxe Drip Cake',
  'Artisan Piped Lavender Dream Cake',
  'Custom Photo Celebration Cake'
];

const heartLines = [
  '“Handcrafted with pure love, baked to make your big day unforgettable.”',
  '“Every layer baked from scratch in our home kitchen, just for you.”',
  '“Pure vegetarian joy, melted Belgian chocolate, and pure dairy cream.”',
  '“Bespoke cake artistry tailored to your child’s greatest dream.”',
  '“Celebrating love, milestones, and family memories in every slice.”',
  '“100% homemade freshness — never frozen, always baked to order.”'
];

const cakes = files.map((file, idx) => {
  const title = titles[idx % titles.length] + (idx >= titles.length ? ` #${idx + 1}` : '');
  const heartLine = heartLines[idx % heartLines.length];
  
  let category = 'celebrations';
  const t = title.toLowerCase();
  if (t.includes('princess') || t.includes('superhero') || t.includes('safari') || t.includes('unicorn') || t.includes('cartoon') || t.includes('barbie') || t.includes('prince') || t.includes('mickey') || t.includes('soccer') || t.includes('baby') || t.includes('angel')) {
    category = 'kids';
  } else if (t.includes('romance') || t.includes('heart') || t.includes('anniversary') || t.includes('wedding') || t.includes('valentine') || t.includes('love')) {
    category = 'romance';
  } else if (t.includes('chocolate') || t.includes('truffle') || t.includes('black forest') || t.includes('ferrero') || t.includes('ganache') || t.includes('drip')) {
    category = 'classics';
  }

  const isMultiTier = title.includes('Tier') || title.includes('Castle') || title.includes('Wedding');
  const pricing = isMultiTier ? '1.5 KG – ₹750 | 2 KG – ₹1000' : '1 KG – ₹500 | 1/2 KG – ₹300';
  
  return {
    id: `cake-${idx + 1}`,
    title,
    image: `/cake/${encodeURIComponent(file)}`,
    category,
    pricing,
    heartLine,
    description: '100% Homemade fresh cake baked with pure vegetarian ingredients, rich imported cocoa, and velvety dairy cream. Fully customizable with your name, photo, and favorite flavors.'
  };
});

const content = `export interface RealCakeItem {
  id: string;
  title: string;
  image: string;
  category: string;
  pricing: string;
  heartLine: string;
  description: string;
}

export const REAL_CAKE_COLLECTION: RealCakeItem[] = ${JSON.stringify(cakes, null, 2)};
`;

const destPath = path.join(__dirname, '..', 'src', 'data', 'realCakes.ts');
fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.writeFileSync(destPath, content, 'utf8');
console.log(`Successfully generated src/data/realCakes.ts with ${cakes.length} cakes`);
