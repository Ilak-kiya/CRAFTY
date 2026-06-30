// ── Mock data — swap these with real API calls from productApi.js ──

export const CATEGORIES = [
  { id: 1, name: "Home Decor",  icon: "🏡", count: 240 },
  { id: 2, name: "Jewelry",     icon: "💍", count: 185 },
  { id: 3, name: "Pottery",     icon: "🏺", count: 132 },
  { id: 4, name: "Paintings",   icon: "🎨", count: 97  },
  { id: 5, name: "Gifts",       icon: "🎁", count: 310 },
  { id: 6, name: "Textiles",    icon: "🧵", count: 156 },
];

export const MOCK_PRODUCTS = [
  { productId: 1,  productName: "Hand-Thrown Terracotta Vase",   productPrice: 1850, productDescription: "Rustic wheel-thrown vase with natural earth glaze",       category: "Pottery",   seller: "Maya's Studio",   rating: 4.8, reviews: 124, tag: "Bestseller",  image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
  { productId: 2,  productName: "Macramé Wall Hanging",           productPrice: 2200, productDescription: "Bohemian knotted cotton rope art, 60cm wide",             category: "Home Decor",seller: "Knot by Priya",   rating: 4.9, reviews: 89,  tag: "New",         image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { productId: 3,  productName: "Hand-Painted Silk Scarf",        productPrice: 3400, productDescription: "Pure silk with watercolour floral motif, 90×90cm",        category: "Textiles",  seller: "ArtThread Co.",   rating: 4.7, reviews: 56,  tag: "",            image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop" },
  { productId: 4,  productName: "Sterling Silver Leaf Ring",      productPrice: 1200, productDescription: "Hand-forged 925 silver, adjustable, nature-inspired",     category: "Jewelry",   seller: "Forge & Bloom",   rating: 4.6, reviews: 203, tag: "Trending",    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" },
  { productId: 5,  productName: "Beeswax Pillar Candle Set",      productPrice: 950,  productDescription: "Set of 3 hand-dipped 100% natural beeswax candles",       category: "Home Decor",seller: "Hive & Wick",     rating: 4.5, reviews: 178, tag: "",            image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&h=400&fit=crop" },
  { productId: 6,  productName: "Watercolour Botanical Print",    productPrice: 1680, productDescription: "Original A3 botanical illustration, archival ink",        category: "Paintings", seller: "Leaf & Brush",    rating: 4.9, reviews: 44,  tag: "New",         image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop" },
  { productId: 7,  productName: "Handwoven Jute Basket",          productPrice: 780,  productDescription: "Natural jute storage basket with leather handles",        category: "Home Decor",seller: "Weave Works",     rating: 4.4, reviews: 91,  tag: "",            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
  { productId: 8,  productName: "Ceramic Tea Set (4 pcs)",        productPrice: 2850, productDescription: "Minimalist celadon glaze ceramic, food-safe",             category: "Pottery",   seller: "Clay & Form",     rating: 4.8, reviews: 67,  tag: "Bestseller",  image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop" },
];

export const ARTISANS = [
  { id: 1, name: "Maya Krishnan",  craft: "Pottery & Ceramics", location: "Jaipur",  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=80&h=80&fit=crop&crop=face", sales: "2.4k" },
  { id: 2, name: "Priya Nair",     craft: "Macramé & Textiles", location: "Kochi",   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", sales: "1.8k" },
  { id: 3, name: "Arjun Mehta",    craft: "Metalwork & Jewelry",location: "Mumbai",  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", sales: "3.1k" },
];

export const REVIEWS = [
  { id: 1, user: "Deepa S.",    rating: 5, text: "Absolutely stunning piece! The craftsmanship is beyond what I expected. Arrived beautifully packaged.", date: "2 weeks ago",   avatar: "D" },
  { id: 2, user: "Rahul M.",    rating: 4, text: "Love the quality. Slightly smaller than expected but the finish is perfect. Will order again.",       date: "1 month ago",   avatar: "R" },
  { id: 3, user: "Ananya P.",   rating: 5, text: "Gift for my mother — she cried happy tears. The artisan even included a handwritten note. 10/10.",    date: "3 weeks ago",   avatar: "A" },
];

export const PRICE_RANGES = [
  { label: "Under ₹500",       min: 0,    max: 500   },
  { label: "₹500 – ₹1,500",   min: 500,  max: 1500  },
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000  },
  { label: "Above ₹3,000",    min: 3000, max: 99999 },
];

// ── Order Tracking ──
export const ORDER_STAGES = [
  { key: "placed",      label: "Order Placed",       icon: "📋", desc: "Your order has been received"          },
  { key: "payment",     label: "Payment Confirmed",  icon: "💳", desc: "Payment verified successfully"         },
  { key: "processing",  label: "Processing",         icon: "⚙️",  desc: "Artisan is preparing your order"      },
  { key: "packed",      label: "Packed",             icon: "📦", desc: "Order packed with care"                },
  { key: "shipped",     label: "Shipped",            icon: "🚚", desc: "On its way to the courier hub"         },
  { key: "out",         label: "Out for Delivery",   icon: "🛵", desc: "Delivery partner is on the way"        },
  { key: "delivered",   label: "Delivered",          icon: "✅", desc: "Order delivered successfully"          },
];

export const MOCK_ORDERS = [
  {
    orderId: "CRF-2025-001",
    currentStage: "shipped",
    placedAt: "2025-06-10T10:30:00",
    estimatedDelivery: "2025-06-20",
    lastUpdated: "2025-06-15T14:22:00",
    canCancel: false,
    canReturn: false,
    product: {
      productId: 1,
      productName: "Hand-Thrown Terracotta Vase",
      productPrice: 1850,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop",
      category: "Pottery",
    },
    shipping: {
      name: "Deepa Sharma",
      address: "42, Rose Garden Lane",
      city: "Bengaluru",
      state: "Karnataka",
      pin: "560001",
      phone: "+91 98765 43210",
    },
    payment: { method: "UPI", id: "UPI-TXN-8842910", paidAt: "2025-06-10T10:32:00" },
    courier: { name: "BlueDart Express", trackingNo: "BD-99284710", contact: "1860-233-1234" },
    seller: { name: "Maya's Studio", contact: "maya@crafty.in", phone: "+91 88001 22334" },
    timeline: [
      { stage: "placed",     time: "2025-06-10T10:30:00", note: "Order #CRF-2025-001 created" },
      { stage: "payment",    time: "2025-06-10T10:32:00", note: "UPI payment of ₹1,850 confirmed" },
      { stage: "processing", time: "2025-06-11T09:00:00", note: "Artisan Maya started preparing your vase" },
      { stage: "packed",     time: "2025-06-13T16:45:00", note: "Securely packed in eco-friendly box" },
      { stage: "shipped",    time: "2025-06-15T14:22:00", note: "Picked up by BlueDart Express" },
    ],
  },
  {
    orderId: "CRF-2025-002",
    currentStage: "delivered",
    placedAt: "2025-06-01T08:15:00",
    estimatedDelivery: "2025-06-08",
    lastUpdated: "2025-06-07T11:30:00",
    canCancel: false,
    canReturn: true,
    product: {
      productId: 4,
      productName: "Sterling Silver Leaf Ring",
      productPrice: 1200,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
      category: "Jewelry",
    },
    shipping: {
      name: "Rahul Mehta",
      address: "8B, Sunflower Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400001",
      phone: "+91 91234 56789",
    },
    payment: { method: "Credit Card", id: "CC-TXN-44710923", paidAt: "2025-06-01T08:17:00" },
    courier: { name: "Delhivery", trackingNo: "DL-77312098", contact: "1800-120-2345" },
    seller: { name: "Forge & Bloom", contact: "forge@crafty.in", phone: "+91 77009 11223" },
    timeline: [
      { stage: "placed",     time: "2025-06-01T08:15:00", note: "Order #CRF-2025-002 created" },
      { stage: "payment",    time: "2025-06-01T08:17:00", note: "Credit Card payment of ₹2,400 confirmed" },
      { stage: "processing", time: "2025-06-02T10:00:00", note: "Arjun is hand-forging your rings" },
      { stage: "packed",     time: "2025-06-04T13:30:00", note: "Packed in premium jewellery box" },
      { stage: "shipped",    time: "2025-06-05T09:10:00", note: "Dispatched via Delhivery" },
      { stage: "out",        time: "2025-06-07T08:45:00", note: "Out for delivery in your area" },
      { stage: "delivered",  time: "2025-06-07T11:30:00", note: "Delivered. Enjoy your ring! 💍" },
    ],
  },
];

export const SELLER_ORDERS = [
  { orderId: "CRF-2025-001", customer: "Deepa Sharma",  product: "Hand-Thrown Terracotta Vase",  qty: 1, amount: 1850,  stage: "shipped",    placedAt: "2025-06-10", city: "Bengaluru" },
  { orderId: "CRF-2025-003", customer: "Ananya Pillai", product: "Macramé Wall Hanging",          qty: 1, amount: 2200,  stage: "processing", placedAt: "2025-06-14", city: "Chennai"   },
  { orderId: "CRF-2025-004", customer: "Vikram Singh",  product: "Beeswax Pillar Candle Set",    qty: 3, amount: 2850,  stage: "packed",     placedAt: "2025-06-15", city: "Delhi"     },
  { orderId: "CRF-2025-005", customer: "Meera Joshi",   product: "Handwoven Jute Basket",        qty: 2, amount: 1560,  stage: "placed",     placedAt: "2025-06-17", city: "Pune"      },
  { orderId: "CRF-2025-002", customer: "Rahul Mehta",   product: "Sterling Silver Leaf Ring",    qty: 2, amount: 2400,  stage: "delivered",  placedAt: "2025-06-01", city: "Mumbai"    },
];
