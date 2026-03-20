import roseImg from './rose.png';
import scrubImg from './scrub.png';
import sunscreenImg from './sunscreen.png';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  variants: string[];
  ingredients: string[];
  howToUse: string;
  benefits: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Glow Hair Serum',
    category: 'Hair Care',
    description: 'Infused with argan oil and vitamin E for frizz-free, shiny hair.',
    fullDescription: 'Our Silk Glow Hair Serum is a lightweight, non-greasy formula designed to transform dull, frizzy hair into a silky masterpiece. Enriched with pure Moroccan Argan Oil and Vitamin E, it provides an instant shine while protecting your hair from heat damage and environmental pollutants.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    variants: ['30ml', '50ml'],
    ingredients: ['Argan Oil', 'Vitamin E', 'Cyclopentasiloxane', 'Dimethicone'],
    howToUse: 'Apply 2-3 drops to damp or dry hair, focusing on the mid-lengths to ends. Do not rinse.',
    benefits: ['Instant Frizz Control', 'Heat Protection', 'High-Gloss Finish', 'Non-Greasy Formula']
  },
  {
    id: '2',
    name: 'Hydra-Dew Moisturizer',
    category: 'Face Care',
    description: 'Lightweight gel-cream with hyaluronic acid for 24h hydration.',
    fullDescription: 'Experience the ultimate hydration with Hydra-Dew. This innovative gel-cream formula sinks into the skin instantly, delivering a burst of Hyaluronic Acid and Ceramide NP. It strengthens the skin barrier and locks in moisture for a plump, dewy complexion that lasts all day.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    variants: ['Normal Skin', 'Oily Skin'],
    ingredients: ['Hyaluronic Acid', 'Ceramides', 'Aloe Vera', 'Glycerin'],
    howToUse: 'Massage onto clean, dry face and neck morning and night.',
    benefits: ['24-Hour Hydration', 'Plumps Fine Lines', 'Strengthens Skin Barrier', 'Cooling Sensation']
  },
  {
    id: '3',
    name: 'Botanical Repair Shampoo',
    category: 'Hair Care',
    description: 'Sulfate-free formula to strengthen and nourish damaged hair.',
    fullDescription: 'Gently cleanse while repairing damaged strands with our Botanical Repair Shampoo. Formulated without harsh sulfates, it uses plant-derived cleansers and a unique protein complex to rebuild hair bonds from the inside out.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=800',
    variants: ['250ml', '500ml'],
    ingredients: ['Quinoa Protein', 'Coconut Oil', 'Green Tea Extract', 'Panthenol'],
    howToUse: 'Massage into wet hair, lather, and rinse thoroughly. Follow with conditioner.',
    benefits: ['Bond-Building Technology', 'Sulfate-Free', 'Color Safe', 'Deep Nourishment']
  },
  {
    id: '4',
    name: 'Vitamin C Brightening Face Wash',
    category: 'Face Care',
    description: 'Gently cleanses and brightens skin tone with natural extracts.',
    fullDescription: 'Wake up your skin with a burst of Vitamin C. This refreshing cleanser removes impurities and excess oil while targeting dullness and uneven skin tone. Natural fruit enzymes provide a gentle exfoliation for a healthy-looking glow.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    variants: ['100ml', '200ml'],
    ingredients: ['Vitamin C', 'Papaya Enzyme', 'Licorice Root', 'Orange Peel Oil'],
    howToUse: 'Lather a small amount in wet hands and massage onto face. Rinse with lukewarm water.',
    benefits: ['Brightens Dull Skin', 'Gentle Exfoliation', 'Antioxidant Protection', 'Refreshing Citrus Scent']
  },
  {
    id: '5',
    name: 'Midnight Recovery Face Oil',
    category: 'Face Care',
    description: 'A potent blend of essential oils to restore skin overnight.',
    fullDescription: 'Transform your skin while you sleep. Our Midnight Recovery Face Oil is a luxurious blend of botanical oils that mimic the skin\'s natural lipids. It works with your skin\'s nightly recovery process to reveal a smoother, more radiant complexion by morning.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    variants: ['Standard 30ml'],
    ingredients: ['Rosehip Oil', 'Squalane', 'Lavender Oil', 'Evening Primrose Oil'],
    howToUse: 'Apply 2-3 drops to clean skin before your moisturizer at night.',
    benefits: ['Overnight Repair', 'Improves Elasticity', 'Deeply Hydrating', 'Calming Aroma']
  },
  {
    id: '6',
    name: 'Mineral Sunscreen SPF 50',
    category: 'Sun Care',
    description: 'Non-greasy, broad-spectrum protection with a matte finish.',
    fullDescription: 'Protect your skin without the white cast. Our Mineral Sunscreen uses non-nano Zinc Oxide to provide powerful broad-spectrum protection against UVA and UVB rays. The lightweight, tinted formula blends seamlessly into all skin tones.',
    price: 550,
    image: sunscreenImg,
    variants: ['Tinted', 'Untinted'],
    ingredients: ['Zinc Oxide', 'Niacinamide', 'Green Tea', 'Vitamin E'],
    howToUse: 'Apply liberally 15 minutes before sun exposure. Reapply every 2 hours.',
    benefits: ['SPF 50 Protection', 'No White Cast', 'Reef Safe', 'Matte Finish']
  },
  {
    id: '7',
    name: 'Charcoal Detox Mask',
    category: 'Face Care',
    description: 'Deeply cleanses pores and removes impurities for clear skin.',
    fullDescription: 'Draw out toxins and impurities with the power of Activated Charcoal. This deep-cleansing mask acts like a magnet for dirt and oil, leaving your pores refined and your skin feeling incredibly clean and smooth.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800',
    variants: ['Single Pack', 'Value Pack'],
    ingredients: ['Activated Charcoal', 'Kaolin Clay', 'Tea Tree Oil', 'Salicylic Acid'],
    howToUse: 'Apply an even layer to clean skin. Leave for 10-15 minutes until dry. Rinse with warm water.',
    benefits: ['Pore Minimizing', 'Oil Control', 'Deep Cleansing', 'Prevents Breakouts']
  },
  {
    id: '8',
    name: 'Rose Water Toning Mist',
    category: 'Face Care',
    description: 'Refreshing facial mist to balance and hydrate skin on the go.',
    fullDescription: 'A pure, steam-distilled rose water mist that instantly refreshes and hydrates. Perfect for setting makeup, balancing skin pH after cleansing, or providing a quick pick-me-up throughout the day.',
    price: 350,
    image: roseImg,
    variants: ['100ml'],
    ingredients: ['Pure Rose Water', 'Witch Hazel', 'Glycerin', 'Rose Geranium Oil'],
    howToUse: 'Mist onto face and neck whenever skin feels dry or tight.',
    benefits: ['Balances pH', 'Soothes Redness', 'Instant Hydration', 'Natural Fragrance']
  },
  {
    id: '9',
    name: 'Sea Salt Texturizing Spray',
    category: 'Hair Care',
    description: 'Effortless beachy waves with volume and a matte finish.',
    fullDescription: 'Get that just-off-the-beach look any day of the year. Our Sea Salt Spray adds volume, texture, and a light hold without the crunch. Infused with seaweed extract to keep hair hydrated.',
    price: 425,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
    variants: ['150ml'],
    ingredients: ['Dead Sea Salt', 'Seaweed Extract', 'Aloe Vera', 'Magnesium Sulfate'],
    howToUse: 'Spray onto damp or dry hair. Scrunch with hands and air dry or blow dry with a diffuser.',
    benefits: ['Natural Texture', 'Added Volume', 'Matte Finish', 'Hydrating Formula']
  },
  {
    id: '10',
    name: 'Bakuchiol Retinol Alternative',
    category: 'Face Care',
    description: 'Plant-based serum to target fine lines and wrinkles.',
    fullDescription: 'All the benefits of retinol without the irritation. Bakuchiol is a natural, plant-derived alternative that helps smooth fine lines, improve skin texture, and boost collagen production. Safe for sensitive skin and daytime use.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    variants: ['30ml'],
    ingredients: ['Bakuchiol', 'Squalane', 'Rosehip Oil', 'Vitamin E'],
    howToUse: 'Apply 3-4 drops to clean skin morning or night. Follow with moisturizer.',
    benefits: ['Anti-Aging', 'Gentle on Skin', 'Improves Texture', 'Vegan Formula']
  },
  {
    id: '11',
    name: 'Exfoliating Coffee Scrub',
    category: 'Body Care',
    description: 'Invigorating body scrub to smooth and firm skin.',
    fullDescription: 'Wake up your skin with the power of caffeine. Our Coffee Scrub uses organic Arabica grounds to buff away dead skin cells, while cold-pressed oils leave your body feeling incredibly soft and hydrated.',
    price: 350,
    image: scrubImg,
    variants: ['200g'],
    ingredients: ['Arabica Coffee Grounds', 'Coconut Oil', 'Brown Sugar', 'Sea Salt'],
    howToUse: 'Massage onto wet skin in circular motions. Leave for 2 minutes, then rinse.',
    benefits: ['Smooths Skin', 'Boosts Circulation', 'Deeply Hydrating', 'Natural Exfoliation']
  },
  {
    id: '12',
    name: 'Soothing Aloe After-Sun Gel',
    category: 'Sun Care',
    description: 'Instant cooling relief for sun-exposed or irritated skin.',
    fullDescription: 'Calm and cool your skin after a day in the sun. Our pure Aloe Vera gel is enriched with Cucumber extract and Peppermint oil to provide immediate relief from redness and heat while preventing peeling.',
    price: 275,
    image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800',
    variants: ['150ml', '300ml'],
    ingredients: ['Aloe Vera Juice', 'Cucumber Extract', 'Peppermint Oil', 'Panthenol'],
    howToUse: 'Apply generously to affected areas as needed.',
    benefits: ['Instant Cooling', 'Soothes Redness', 'Prevents Peeling', 'Non-Sticky']
  }
];
