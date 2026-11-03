import { CustomOrder, CakeProduct } from '../types/bakery';
import { REAL_CAKE_COLLECTION } from '../data/realCakes';

export const BAKERY_PHONE = '8708661381';
export const BAKERY_DISPLAY_PHONE = '87086 61381';
export const BAKERY_WHATSAPP_GREETING = encodeURIComponent(
  "Hello Shree's Bakery! 🎂 I would love to order a fresh custom cake for my celebration."
);
export const BAKERY_WHATSAPP_LINK = `https://wa.me/918708661381?text=${BAKERY_WHATSAPP_GREETING}`;

export type CakeSectionId = 'menu' | 'featured' | 'specialities' | 'gallery';

export interface SectionCakeItem {
  id: string;
  section: CakeSectionId;
  title: string;
  image: string;
  price: string;
  description: string;
  category?: string;
  badge?: string;
  tagline?: string;
  serves?: string;
  flavor?: string;
}

export const INITIAL_SECTION_CAKES: SectionCakeItem[] = [
  // Menu Pricing Section
  {
    id: 'menu-1kg',
    section: 'menu',
    title: '1 KG Cake',
    price: '₹500',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.22.51%20PM.jpeg',
    tagline: '“The heart of every birthday laughter & song.”',
    serves: 'Serves 8–10 loved ones',
    description: 'Choice of Belgian Chocolate Truffle, Dutch Fudge, Black Forest, or Fresh Pineapple.',
    badge: 'Most Loved'
  },
  {
    id: 'menu-half-kg',
    section: 'menu',
    title: '1/2 KG Cake',
    price: '₹300',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.04%20PM%20(2).jpeg',
    tagline: '“Small enough for two, sweet enough forever.”',
    serves: 'Serves 4–5 people',
    description: 'Baked fresh on order with pure dairy cream and velvety sponge.',
    badge: 'Cozy Moments'
  },
  {
    id: 'menu-pastries',
    section: 'menu',
    title: 'Gourmet Pastries',
    price: '₹40',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.12%20PM.jpeg',
    tagline: '“An afternoon indulgence straight from heaven.”',
    serves: 'Single artisan slice',
    description: 'Fluffy cocoa sponge soaked in ganache, red velvet cream, or butterscotch.',
    badge: 'Daily Fresh'
  },
  {
    id: 'menu-cupcake',
    section: 'menu',
    title: 'Swirled Cup Cake',
    price: '₹25',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM%20(2).jpeg',
    tagline: '“Little swirls that bring the biggest smiles.”',
    serves: 'Single celebration piece',
    description: 'Fluffy vanilla or cocoa sponge topped with hand-piped buttercream and sprinkles.',
    badge: 'Sweet Treat'
  },

  // Featured Creations Section
  {
    id: 'feat-master',
    section: 'featured',
    title: 'Fairytale Princess & Toy Train Tunnel Cake',
    price: 'From ₹500 / KG',
    image: '/assets/aistudio/IMG-20260517-WA0016_d7ae7fea.jpg',
    tagline: "“Where fairytales meet childhood adventures—seeing a child's eyes light up is why we bake.”",
    serves: '2 KG or 3 KG Multi-Tier',
    description: 'An extraordinary custom creation featuring a majestic fairytale princess doll with shimmering butterfly wings, hand-piped rosette floral gown, and a real tunnel arch allowing a miniature toy train to travel directly through the cake! Adorned with edible chocolate cobblestones, delicate azure butterflies, and lush woodland moss.',
    badge: 'Masterpiece',
    flavor: 'Belgian Chocolate Truffle & Vanilla Berry Swirl'
  },
  {
    id: 'feat-animal-safari',
    section: 'featured',
    title: 'Little Jungle Safari King Cake',
    price: '1 KG – ₹500 | 1.5 KG – ₹750',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM.jpeg',
    tagline: '“For the little king whose sweet laughter rules the whole household.”',
    description: 'Handcrafted friendly baby lion and gentle giraffe with leafy jungle foliage, golden safari accents, and soft buttercream textures.',
    badge: 'Baby Lion & Giraffe',
    flavor: 'Alphonso Mango & Vanilla Buttercream'
  },
  {
    id: 'feat-animal-bear',
    section: 'featured',
    title: 'Woodland Honey Bear Hugs Cake',
    price: '1 KG – ₹500 | 1.5 KG – ₹750',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM%20(1).jpeg',
    tagline: '“As warm as a mother’s hug and as sweet as forest honeycomb.”',
    description: 'Adorable sculpted baby bear cub resting beside golden honey drip, edible forest mushrooms, and rustic tree bark texture.',
    badge: 'Cuddly Teddy Bear',
    flavor: 'Butterscotch Crunch Caramel'
  },
  {
    id: 'feat-animal-elephant',
    section: 'featured',
    title: 'Baby Elephant & Dreamy Clouds Cake',
    price: '1 KG – ₹500 | 2 KG – ₹1000',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.13%20PM.jpeg',
    tagline: '“Dream big, little one—the sky is full of sweet possibilities.”',
    description: 'Soft pastel sky frosting crowned with a lovable baby elephant clutching celebration balloons amidst edible fluffy white clouds.',
    badge: 'Gentle Elephant',
    flavor: 'Fresh Strawberry Rose Infusion'
  },
  {
    id: 'feat-animal-panda',
    section: 'featured',
    title: 'Playful Panda Bamboo Garden Cake',
    price: '1 KG – ₹500 | 1.5 KG – ₹750',
    image: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.14%20PM.jpeg',
    tagline: '“Finding pure, joyful magic in the gentlest childhood moments.”',
    description: 'Sweet hand-modeled panda cub snacking on green sugar bamboo shoots, surrounded by cookies and cream ganache and white chocolate leaves.',
    badge: 'Cuddly Panda',
    flavor: 'Dark Dutch Truffle & Cookies'
  },

  // Specialities / Celebrations Section (8 Celebrations - Logo-branded)
  {
    id: 'spec-birthday',
    section: 'specialities',
    title: 'Birthday Celebrations',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Another year of laughter, growth, and blowing out wishes.”',
    description: 'Customized superhero, cartoon, or elegant truffle creations baked to make your loved one feel truly special.',
    badge: 'Birthday'
  },
  {
    id: 'spec-wedding',
    section: 'specialities',
    title: 'Royal Wedding Cakes',
    price: 'From ₹1000 Multi-Tier',
    image: '/assets/bakery-logo-square.png',
    tagline: '“The sweetest beginning to a lifelong promise of devotion.”',
    description: 'Multi-tiered architectural elegance with gold foil, handcrafted roses, and bespoke flavor combinations.',
    badge: 'Royal Wedding'
  },
  {
    id: 'spec-anniversary',
    section: 'specialities',
    title: 'Anniversary Milestones',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Cherishing every year together, made sweeter with each memory.”',
    description: 'Heart-shaped red velvet cakes with romantic couple toppers and personalized celebration dates.',
    badge: 'Anniversary'
  },
  {
    id: 'spec-valentines',
    section: 'specialities',
    title: "Romance & Valentine's",
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“When words fall short, sweet chocolate speaks the heart’s language.”',
    description: 'Hand-piped scarlet rosettes, rich Belgian chocolate ganache, and edible chocolate hearts.',
    badge: 'Romance'
  },
  {
    id: 'spec-babyshower',
    section: 'specialities',
    title: 'Baby Shower & Gender Reveal',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Welcoming the sweetest miracle with gentle love & warmth.”',
    description: 'Adorable pastel teddy bears, fluffy cloud tiers, and magical color-revealing sponge centers.',
    badge: 'Baby Shower'
  },
  {
    id: 'spec-kidsparty',
    section: 'specialities',
    title: 'Kids Cartoon & Superhero Party',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Sparking pure wonder in little eyes with their favorite heroes.”',
    description: 'Action-packed superhero figurines, fairytale princess castles, and vibrant rainbow sponge layers.',
    badge: 'Kids Special'
  },
  {
    id: 'spec-success',
    section: 'specialities',
    title: 'Graduation & Career Success',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Honoring hard work, big dreams, and a bright tomorrow.”',
    description: 'Graduation cap toppers, golden book tiers, congratulatory banners, and decadent chocolate truffle.',
    badge: 'Success'
  },
  {
    id: 'spec-festivals',
    section: 'specialities',
    title: 'Festivals & Family Gatherings',
    price: 'From ₹500 / KG',
    image: '/assets/bakery-logo-square.png',
    tagline: '“Bringing the whole family together for sweet moments of tradition.”',
    description: 'Diwali, New Year, Rakhi, and holiday celebration cakes infused with pistachio, saffron, and cream.',
    badge: 'Festivals'
  },

  // Cakes Gallery Section (Loaded from real collection)
  ...REAL_CAKE_COLLECTION.map((c) => ({
    id: c.id,
    section: 'gallery' as const,
    title: c.title,
    image: c.image,
    price: c.pricing,
    description: c.description,
    category: c.category,
    tagline: c.heartLine
  }))
];

export const SECTION_CAKES_KEY = 'shrees_bakery_section_cakes_v5';

export function getStoredSectionCakes(): SectionCakeItem[] {
  try {
    const raw = localStorage.getItem(SECTION_CAKES_KEY);
    if (!raw) {
      localStorage.setItem(SECTION_CAKES_KEY, JSON.stringify(INITIAL_SECTION_CAKES));
      return INITIAL_SECTION_CAKES;
    }
    const parsed: SectionCakeItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(SECTION_CAKES_KEY, JSON.stringify(INITIAL_SECTION_CAKES));
      return INITIAL_SECTION_CAKES;
    }

    // Ensure all 8 specialities are included and use the official logo
    const initialSpecs = INITIAL_SECTION_CAKES.filter(c => c.section === 'specialities');
    let hasUpdated = false;
    let updatedList = [...parsed];

    initialSpecs.forEach(initSpec => {
      const existingIdx = updatedList.findIndex(p => p.id === initSpec.id);
      if (existingIdx === -1) {
        updatedList.push(initSpec);
        hasUpdated = true;
      } else if (updatedList[existingIdx].image !== initSpec.image) {
        updatedList[existingIdx] = { ...updatedList[existingIdx], image: initSpec.image };
        hasUpdated = true;
      }
    });

    if (hasUpdated) {
      localStorage.setItem(SECTION_CAKES_KEY, JSON.stringify(updatedList));
      return updatedList;
    }

    return parsed;
  } catch {
    return INITIAL_SECTION_CAKES;
  }
}

export function saveSectionCakes(cakes: SectionCakeItem[]): void {
  try {
    localStorage.setItem(SECTION_CAKES_KEY, JSON.stringify(cakes));
    window.dispatchEvent(new CustomEvent('shrees_cakes_updated', { detail: cakes }));
  } catch (e) {
    console.error('Failed to save cakes to localStorage', e);
  }
}

export function updateSectionCake(id: string, updates: Partial<SectionCakeItem>): void {
  const current = getStoredSectionCakes();
  const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
  saveSectionCakes(updated);
}

export function addSectionCake(cake: Omit<SectionCakeItem, 'id'>): SectionCakeItem {
  const current = getStoredSectionCakes();
  const newItem: SectionCakeItem = {
    ...cake,
    id: `cake-custom-${Date.now()}`
  };
  const updated = [newItem, ...current];
  saveSectionCakes(updated);
  return newItem;
}

export function deleteSectionCake(id: string): void {
  const current = getStoredSectionCakes();
  const updated = current.filter(item => item.id !== id);
  saveSectionCakes(updated);
}

export function resetSectionCakesToDefault(): void {
  saveSectionCakes(INITIAL_SECTION_CAKES);
}

export const INITIAL_PRODUCTS: CakeProduct[] = [
  {
    id: 'prod-1kg',
    name: '1 KG Celebration Cake',
    category: 'Birthday',
    priceText: '₹500',
    basePrice: 500,
    weightOptions: ['1 KG', '2 KG (₹1000)', '3 KG (₹1500)'],
    description: 'Baked with love, layered with silky Belgian cream and rich chocolate truffle.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.22.51%20PM.jpeg',
    tag: 'Classic',
    isPopular: true
  },
  {
    id: 'prod-half-kg',
    name: '1/2 KG Petite Delight',
    category: 'Birthday',
    priceText: '₹300',
    basePrice: 300,
    weightOptions: ['1/2 KG'],
    description: 'A cozy slice of happiness for intimate moments with those you cherish most.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.04%20PM%20(2).jpeg',
    tag: 'Favorite',
    isPopular: true
  },
  {
    id: 'prod-pastries',
    name: 'Artisan Pastry Slice',
    category: 'Pastry',
    priceText: '₹40 / slice',
    basePrice: 40,
    weightOptions: ['Single Slice (₹40)', 'Box of 4 (₹150)'],
    description: 'Velvety sponge layered with pure cocoa and fresh dairy whipping cream.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.12%20PM.jpeg',
    tag: 'Daily Fresh'
  },
  {
    id: 'prod-cupcake',
    name: 'Swirled Cupcake',
    category: 'Cupcake',
    priceText: '₹25 / pc',
    basePrice: 25,
    weightOptions: ['Single (₹25)', 'Pack of 6 (₹140)'],
    description: 'Fluffy sponge crowned with delicate buttercream swirl and festive sprinkles.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM%20(2).jpeg',
    tag: 'Sweet Bite'
  },
  {
    id: 'prod-princess',
    name: 'Fairytale Princess Cake',
    category: 'Birthday',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1.5 KG (₹750)', '2 KG (₹1000)'],
    description: 'Handcrafted floral gown with sugar rosettes and pearls for your little princess.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.03%20PM%20(1).jpeg',
    tag: 'Kids Special'
  },
  {
    id: 'prod-romantic',
    name: 'Sweetheart Rose Cake',
    category: 'Valentines',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1 KG (₹500)', '1.5 KG (₹750)'],
    description: 'Piped scarlet roses on velvety red sponge, celebrating love in every bite.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM.jpeg',
    tag: 'Romance',
    isPopular: true
  },
  {
    id: 'prod-army',
    name: 'Action Hero Army Cake',
    category: 'Custom',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1.5 KG (₹750)', '2 KG (₹1000)'],
    description: 'Camouflage frosting with commando theme crafted for bold birthday champions.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.10%20PM.jpeg',
    tag: 'Adventure'
  },
  {
    id: 'prod-name',
    name: 'Signature Monogram Cake',
    category: 'Anniversary',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1 KG (₹500)', '2 KG (₹1000)'],
    description: 'Your loved one’s name spelled in sugar with azure and sunset rosettes.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.07%20PM.jpeg',
    tag: 'Custom'
  },
  {
    id: 'prod-train-tunnel',
    name: 'Fairytale Princess & Train Tunnel Cake',
    category: 'Custom',
    priceText: 'From ₹500 / KG',
    basePrice: 500,
    weightOptions: ['2 KG (₹1000)', '3 KG Multi-Tier (₹1500)'],
    description: 'Masterpiece double-tier cake with a real moving toy train tunnel archway, winged princess doll, and sugar butterflies.',
    imageUrl: '/assets/aistudio/IMG-20260517-WA0016_d7ae7fea.jpg',
    tag: 'Masterpiece',
    isPopular: true
  },
  {
    id: 'prod-animal-safari',
    name: 'Little Jungle Safari King Cake',
    category: 'Birthday',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1 KG (₹500)', '1.5 KG (₹750)', '2 KG (₹1000)'],
    description: 'Baby lion and gentle giraffe hand-modeled sugar figurines with lush jungle leaves and gold accents.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM.jpeg',
    tag: 'Animal Theme'
  },
  {
    id: 'prod-animal-bear',
    name: 'Woodland Honey Bear Hugs Cake',
    category: 'Birthday',
    priceText: '₹500 / KG',
    basePrice: 500,
    weightOptions: ['1 KG (₹500)', '1.5 KG (₹750)'],
    description: 'Cuddly baby bear cub resting beside golden honey drip, edible forest mushrooms, and rustic tree bark.',
    imageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM%20(1).jpeg',
    tag: 'Animal Theme'
  }
];

export const INITIAL_ORDERS: CustomOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'SB-8921',
    createdAt: 'Today, 09:15 AM',
    customerName: 'Priya Sharma',
    whatsappNumber: '9876543210',
    email: 'priya.sharma@example.com',
    cakeType: 'Fairytale Princess Cake',
    occasion: 'Birthday',
    flavor: 'Belgian Chocolate Truffle',
    weightSize: '1.5 KG',
    quantity: 1,
    deliveryDate: 'Tomorrow',
    deliveryTime: '05:00 PM - 07:00 PM',
    deliveryAddress: 'Sector 14, Near City Mall',
    budget: '₹750',
    customInstructions: 'Write "Happy 5th Birthday Ananya" in gold lettering.',
    referenceImageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.03%20PM%20(1).jpeg',
    status: 'Preparing',
    totalEstimate: 750
  },
  {
    id: 'ord-102',
    orderNumber: 'SB-8922',
    createdAt: 'Today, 10:05 AM',
    customerName: 'Rohit Verma',
    whatsappNumber: '8701234567',
    cakeType: 'Sweetheart Rose Cake',
    occasion: 'Anniversary',
    flavor: 'Red Velvet with Cream Cheese',
    weightSize: '1 KG',
    quantity: 1,
    deliveryDate: 'Today',
    deliveryTime: '08:00 PM (Surprise)',
    deliveryAddress: 'Royal Palms Residency',
    budget: '₹500',
    customInstructions: 'Heart shape with red roses around border.',
    referenceImageUrl: '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM.jpeg',
    status: 'Confirmed',
    totalEstimate: 500
  }
];

const ORDERS_KEY = 'shrees_bakery_orders';
const PRODUCTS_KEY = 'shrees_bakery_products';

export function getStoredOrders(): CustomOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: CustomOrder[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to localStorage', e);
  }
}

export function getStoredProducts(): CakeProduct[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: CakeProduct[]) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
}

export function getRawWhatsAppOrderMessage(order: Partial<CustomOrder>): string {
  const photoLine = order.referenceImageUrl
    ? (order.referenceImageUrl.startsWith('http')
        ? `📸 *Reference Cake Photo Link:*\n${order.referenceImageUrl}`
        : `📸 *Reference Photo:* Customer uploaded custom design photo (attached)`)
    : '';

  const lines = [
    `🎂 *NEW CAKE ORDER - SHREE'S BAKERY* 🎂`,
    `----------------------------------------`,
    `👤 *Name:* ${order.customerName || 'Customer'}`,
    `📱 *WhatsApp:* ${order.whatsappNumber || 'N/A'}`,
    `🎉 *Occasion:* ${order.occasion || 'Celebration'}`,
    `🍰 *Cake:* ${order.cakeType || 'Custom Cake'}`,
    `🍫 *Flavor:* ${order.flavor || 'Belgian Chocolate'}`,
    `⚖️ *Size:* ${order.weightSize || '1 KG'}`,
    `📅 *Required Date:* ${order.deliveryDate || 'As discussed'}`,
    `📍 *Pick-Up / Delivery:* ${order.deliveryAddress || 'Store Pick-Up (Bakery Counter)'}`,
    `💰 *Budget:* ${order.budget || 'As per menu (1 KG: ₹500, 1/2 KG: ₹300)'}`,
    order.customInstructions ? `📝 *Message on Cake:* "${order.customInstructions}"` : '',
    photoLine,
    `----------------------------------------`,
    `✨ Baked with love at Shree's Bakery`
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildWhatsAppOrderMessage(order: Partial<CustomOrder>): string {
  return encodeURIComponent(getRawWhatsAppOrderMessage(order));
}

export function getWhatsAppDirectUrl(order: Partial<CustomOrder>): string {
  const text = buildWhatsAppOrderMessage(order);
  return `https://wa.me/918708661381?text=${text}`;
}
