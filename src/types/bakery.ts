export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface CakeProduct {
  id: string;
  name: string;
  category: 'Birthday' | 'Wedding' | 'Anniversary' | 'Valentines' | 'Custom' | 'Pastry' | 'Cupcake';
  priceText: string;
  basePrice: number;
  weightOptions: string[];
  description: string;
  imageUrl: string;
  tag?: string;
  isPopular?: boolean;
}

export interface CustomOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  cakeType: string;
  occasion: string;
  flavor: string;
  weightSize: string;
  quantity: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  budget: string;
  customInstructions: string;
  referenceImageUrl?: string;
  status: OrderStatus;
  totalEstimate: number;
  threeDConfig?: {
    tiers: number;
    icingColor: string;
    topper: string;
  };
}

export interface Studio3DConfig {
  tiers: number;
  icingColor: string;
  icingName: string;
  tierFlavor: string;
  topping: 'strawberries' | 'gold-leaf' | 'rosettes' | 'candle' | 'sparkler' | 'couple';
  lightingPreset: 'warm-bakery' | 'studio-luxury' | 'candlelight' | 'sunset-glow' | 'party-neon';
  shadowsEnabled: boolean;
  explodedView: number; // 0 to 1
  rotationSpeed: number;
  lightElevation: number; // Y angle
  lightAzimuth: number; // XZ angle
}
