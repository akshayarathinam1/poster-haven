import { Product, Category, Testimonial, Review } from "./types";

// ============================================================
// MOCK PRODUCTS
// Using Unsplash URLs for realistic poster images
// ============================================================

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "p001",
        name: "Golden Hour Geometry",
        slug: "golden-hour-geometry",
        artistName: "Aria Solano",
        category: "abstract",
        description:
            "A captivating exploration of geometric forms bathed in warm golden light. This piece invites the viewer into a meditative space where sharp angles meet soft gradients, creating a perfect balance between order and organic flow. Printed on premium matte paper with archival inks.",
        shortDescription: "Warm geometric abstraction in gold and amber tones.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        ],
        tags: ["geometric", "warm", "golden", "modern"],
        variants: [
            { size: "A4", finish: "matte", price: 799, stock: 15 },
            { size: "A3", finish: "matte", price: 1199, originalPrice: 1499, stock: 8 },
            { size: "A2", finish: "matte", price: 1899, stock: 5 },
            { size: "A3", finish: "glossy", price: 1299, stock: 10 },
        ],
        basePrice: 799,
        originalPrice: 1499,
        rating: 4.8,
        reviewCount: 124,
        isFeatured: true,
        isNew: false,
        isBestseller: true,
        isSale: true,
        colors: ["#e8c547", "#c9831a", "#2d1b0e"],
        dimensions: "Various",
    },
    {
        id: "p002",
        name: "Tokyo Neon Nights",
        slug: "tokyo-neon-nights",
        artistName: "Kenji Murakami",
        category: "cityscape",
        description:
            "Shot at 2AM on a rain-soaked street in Shinjuku, this photograph captures the electric energy of Tokyo after dark. Reflections of neon kanji signs dance on wet asphalt, creating a dreamlike tableau of modern Japan. A must-have for lovers of urban photography and East Asian aesthetics.",
        shortDescription: "Rain-soaked neon reflections in Shinjuku, Tokyo.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        ],
        tags: ["tokyo", "neon", "nightlife", "urban", "japan"],
        variants: [
            { size: "A4", finish: "glossy", price: 899, stock: 20 },
            { size: "A3", finish: "glossy", price: 1499, stock: 12 },
            { size: "A2", finish: "glossy", price: 2299, stock: 6 },
            { size: "70x100", finish: "canvas", price: 3499, stock: 3 },
        ],
        basePrice: 899,
        rating: 4.9,
        reviewCount: 287,
        isFeatured: true,
        isNew: false,
        isBestseller: true,
        isSale: false,
        colors: ["#e8547c", "#4a7de8", "#1a0830"],
        dimensions: "Various",
    },
    {
        id: "p003",
        name: "Minimal Waves",
        slug: "minimal-waves",
        artistName: "Lena Hoffman",
        category: "minimalist",
        description:
            "Clean lines. Quiet beauty. This minimalist masterpiece distills the ocean wave into its purest geometric essence. Three undulating curves on an off-white background — a piece that brings calm to any space and complements both modern and Scandinavian interiors.",
        shortDescription: "Elegant minimalist wave lines on clean background.",
        image: "https://images.unsplash.com/photo-1473655587843-eda8944061e8?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1473655587843-eda8944061e8?w=800&q=80",
        ],
        tags: ["minimal", "wave", "ocean", "calm", "scandinavian"],
        variants: [
            { size: "A4", finish: "matte", price: 649, stock: 30 },
            { size: "A3", finish: "matte", price: 999, stock: 25 },
            { size: "A2", finish: "matte", price: 1599, stock: 15 },
            { size: "50x70", finish: "matte", price: 1799, originalPrice: 2199, stock: 8 },
        ],
        basePrice: 649,
        originalPrice: 2199,
        rating: 4.7,
        reviewCount: 89,
        isFeatured: false,
        isNew: true,
        isBestseller: false,
        isSale: true,
        colors: ["#2b6cb0", "#f5f0e8", "#718096"],
        dimensions: "Various",
    },
    {
        id: "p004",
        name: "Psychedelic Bloom",
        slug: "psychedelic-bloom",
        artistName: "Maya Chen",
        category: "pop-art",
        description:
            "Inspired by the electric art movements of the 1960s, this bold print explodes with color and pattern. Concentric rings of vivid hues radiate from a central floret, creating an almost hypnotic visual experience. Perfect for adding a pop of personality to any wall.",
        shortDescription: "Bold psychedelic floral in vibrant, hypnotic colors.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
        ],
        tags: ["psychedelic", "colorful", "floral", "pop", "retro"],
        variants: [
            { size: "A3", finish: "glossy", price: 1099, stock: 20 },
            { size: "A2", finish: "glossy", price: 1799, stock: 10 },
            { size: "A1", finish: "glossy", price: 2799, stock: 5 },
        ],
        basePrice: 1099,
        rating: 4.6,
        reviewCount: 56,
        isFeatured: false,
        isNew: true,
        isBestseller: false,
        isSale: false,
        colors: ["#e85447", "#e8c547", "#47c5a8", "#7b4ae8"],
        dimensions: "Various",
    },
    {
        id: "p005",
        name: "Forest Whisper",
        slug: "forest-whisper",
        artistName: "Thomas Birch",
        category: "nature",
        description:
            "Misty morning light filters through ancient pine trees, casting ethereal shafts of gold into a sea of green. This breathtaking nature photograph transports you to a quiet forest glade where time stands still. Printed on premium satin paper for rich, deep tones.",
        shortDescription: "Misty forest sunrays through ancient pine trees.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
        ],
        tags: ["forest", "nature", "misty", "trees", "green"],
        variants: [
            { size: "A4", finish: "satin", price: 849, stock: 18 },
            { size: "A3", finish: "satin", price: 1349, stock: 12 },
            { size: "A2", finish: "satin", price: 2099, stock: 7 },
            { size: "70x100", finish: "canvas", price: 3799, stock: 4 },
        ],
        basePrice: 849,
        rating: 4.9,
        reviewCount: 203,
        isFeatured: true,
        isNew: false,
        isBestseller: true,
        isSale: false,
        colors: ["#276749", "#1a4731", "#f0e6c8"],
        dimensions: "Various",
    },
    {
        id: "p006",
        name: "Bauhaus Composition No. 7",
        slug: "bauhaus-composition-7",
        artistName: "Studio Kern",
        category: "abstract",
        description:
            "A contemporary tribute to the legendary Bauhaus movement. Primary colors arranged in bold geometric configurations against a stark white ground. Each element is precisely positioned to create maximum visual tension and harmony — a timeless statement for the modern home.",
        shortDescription: "Bold Bauhaus-inspired primary colors and geometry.",
        image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
        ],
        tags: ["bauhaus", "geometric", "primary-colors", "german", "design"],
        variants: [
            { size: "A4", finish: "matte", price: 749, stock: 22 },
            { size: "A3", finish: "matte", price: 1149, stock: 15 },
            { size: "A2", finish: "matte", price: 1849, originalPrice: 2299, stock: 9 },
            { size: "50x70", finish: "matte", price: 1999, stock: 6 },
        ],
        basePrice: 749,
        originalPrice: 2299,
        rating: 4.7,
        reviewCount: 142,
        isFeatured: false,
        isNew: false,
        isBestseller: true,
        isSale: true,
        colors: ["#e3001b", "#004f9e", "#ffd900", "#1a1a1a"],
        dimensions: "Various",
    },
    {
        id: "p007",
        name: "Lunar Portrait",
        slug: "lunar-portrait",
        artistName: "Aria Solano",
        category: "photography",
        description:
            "A hyperrealistic close-up of the lunar surface shot through a professional grade telescope. Every crater, ridge and valley is rendered with astonishing clarity. This stunning astrophotograph makes the moon feel close enough to touch — a cosmic treasure for any wall.",
        shortDescription: "Hyperrealistic close-up moon surface in stunning detail.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
        ],
        tags: ["moon", "space", "astrophotography", "lunar", "cosmic"],
        variants: [
            { size: "A3", finish: "matte", price: 1299, stock: 14 },
            { size: "A2", finish: "matte", price: 1999, stock: 8 },
            { size: "A1", finish: "matte", price: 3199, stock: 3 },
            { size: "70x100", finish: "canvas", price: 4299, stock: 2 },
        ],
        basePrice: 1299,
        rating: 4.8,
        reviewCount: 167,
        isFeatured: true,
        isNew: false,
        isBestseller: false,
        isSale: false,
        colors: ["#d0cec8", "#5a5245", "#0d0d0d"],
        dimensions: "Various",
    },
    {
        id: "p008",
        name: "Café de Paris",
        slug: "cafe-de-paris",
        artistName: "Pierre Dubois",
        category: "vintage",
        description:
            "Evoke the golden age of Parisian café culture with this beautifully crafted vintage-style print. Inspired by 1920s travel posters, this piece features warm sepia tones, hand-lettered typography, and charming Art Deco ornamental details. Magnifique!",
        shortDescription: "Art Deco vintage travel poster of Parisian café life.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        ],
        tags: ["paris", "vintage", "cafe", "art-deco", "travel"],
        variants: [
            { size: "A4", finish: "matte", price: 699, stock: 25 },
            { size: "A3", finish: "matte", price: 1099, stock: 18 },
            { size: "50x70", finish: "matte", price: 1699, stock: 10 },
        ],
        basePrice: 699,
        rating: 4.6,
        reviewCount: 98,
        isFeatured: false,
        isNew: false,
        isBestseller: false,
        isSale: false,
        colors: ["#c9831a", "#5a3010", "#f5e6c8"],
        dimensions: "Various",
    },
    {
        id: "p009",
        name: "Ocean Depth",
        slug: "ocean-depth",
        artistName: "Lena Hoffman",
        category: "photography",
        description:
            "Plunge into the aquamarine depths of the Indian Ocean in this stunning underwater photograph. A solitary sea turtle glides gracefully beneath dappled shafts of sunlight filtering down from the surface. Peaceful. Majestic. Otherworldly.",
        shortDescription: "Majestic sea turtle in crystal clear Indian Ocean depths.",
        image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
        ],
        tags: ["ocean", "turtle", "underwater", "nature", "blue"],
        variants: [
            { size: "A4", finish: "glossy", price: 899, stock: 16 },
            { size: "A3", finish: "glossy", price: 1399, originalPrice: 1699, stock: 11 },
            { size: "A2", finish: "glossy", price: 2199, stock: 6 },
        ],
        basePrice: 899,
        originalPrice: 1699,
        rating: 4.9,
        reviewCount: 214,
        isFeatured: false,
        isNew: false,
        isBestseller: true,
        isSale: true,
        colors: ["#0077b6", "#023e8a", "#90e0ef"],
        dimensions: "Various",
    },
    {
        id: "p010",
        name: "City Grid",
        slug: "city-grid",
        artistName: "Studio Kern",
        category: "cityscape",
        description:
            "Shot directly above New York City at golden hour, this breathtaking aerial photograph transforms the Manhattan grid into a luminous lattice of light and shadow. Thousands of windows glow amber as the sun sets over the Hudson. An iconic image for the urban dreamer.",
        shortDescription: "Aerial golden-hour view of Manhattan's glowing grid.",
        image: "https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=800&q=80",
        ],
        tags: ["new-york", "aerial", "cityscape", "golden-hour", "urban"],
        variants: [
            { size: "A3", finish: "glossy", price: 1199, stock: 20 },
            { size: "A2", finish: "glossy", price: 1899, stock: 10 },
            { size: "A1", finish: "glossy", price: 2999, stock: 4 },
            { size: "70x100", finish: "canvas", price: 4199, stock: 2 },
        ],
        basePrice: 1199,
        rating: 4.7,
        reviewCount: 156,
        isFeatured: true,
        isNew: false,
        isBestseller: false,
        isSale: false,
        colors: ["#e8a547", "#1a1a2e", "#f5f0e8"],
        dimensions: "Various",
    },
    {
        id: "p011",
        name: "Typographic Soul",
        slug: "typographic-soul",
        artistName: "Maya Chen",
        category: "typography",
        description:
            "Words arranged as art. This typographic poster weaves inspiring words and phrases into a stunning visual composition. Each letter is hand-chosen and placed to create a layered, textured effect that rewards close inspection. A conversation piece that speaks to the soul.",
        shortDescription: "Layered typographic art poster — words as visual poetry.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        tags: ["typography", "words", "quotes", "black-white", "art"],
        variants: [
            { size: "A4", finish: "matte", price: 599, stock: 30 },
            { size: "A3", finish: "matte", price: 949, stock: 22 },
            { size: "A2", finish: "matte", price: 1549, stock: 12 },
        ],
        basePrice: 599,
        rating: 4.5,
        reviewCount: 73,
        isFeatured: false,
        isNew: true,
        isBestseller: false,
        isSale: false,
        colors: ["#1a1a1a", "#f5f0e8", "#5a5245"],
        dimensions: "Various",
    },
    {
        id: "p012",
        name: "Sahara Dusk",
        slug: "sahara-dusk",
        artistName: "Thomas Birch",
        category: "nature",
        description:
            "The Sahara at twilight — nature's most spectacular and harsh landscape transformed into a tableau of burning sienna, deep violet and golden sand. Camel silhouettes march across undulating dunes as the sun surrenders to the horizon. Pure, untamed beauty.",
        shortDescription: "Camel silhouettes against a blazing Sahara sunset.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        ],
        tags: ["desert", "sahara", "sunset", "camels", "africa"],
        variants: [
            { size: "A4", finish: "satin", price: 949, stock: 14 },
            { size: "A3", finish: "satin", price: 1499, stock: 9 },
            { size: "A2", finish: "satin", price: 2399, originalPrice: 2899, stock: 5 },
            { size: "70x100", finish: "canvas", price: 3999, stock: 2 },
        ],
        basePrice: 949,
        originalPrice: 2899,
        rating: 4.8,
        reviewCount: 189,
        isFeatured: false,
        isNew: false,
        isBestseller: true,
        isSale: true,
        colors: ["#c9551a", "#7b3810", "#f5c878"],
        dimensions: "Various",
    },
];

// ============================================================
// MOCK CATEGORIES
// ============================================================

export const MOCK_CATEGORIES: Category[] = [
    {
        id: "abstract",
        name: "Abstract",
        description: "Bold forms, colors, and textures that transcend the literal.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80",
        productCount: 24,
    },
    {
        id: "photography",
        name: "Photography",
        description: "World-class photography printed with museum-grade precision.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
        productCount: 38,
    },
    {
        id: "minimalist",
        name: "Minimalist",
        description: "Clean lines and quiet beauty. Less is always more.",
        image: "https://images.unsplash.com/photo-1473655587843-eda8944061e8?w=400&q=80",
        productCount: 19,
    },
    {
        id: "vintage",
        name: "Vintage",
        description: "Nostalgic prints inspired by golden eras of design.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
        productCount: 15,
    },
    {
        id: "nature",
        name: "Nature",
        description: "Bring the wild, untamed beauty of nature indoors.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
        productCount: 31,
    },
    {
        id: "cityscape",
        name: "Cityscape",
        description: "The pulse and poetry of the world's most iconic cities.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80",
        productCount: 22,
    },
];

// ============================================================
// MOCK TESTIMONIALS
// ============================================================

export const MOCK_TESTIMONIALS: Testimonial[] = [
    {
        id: "t001",
        author: "Priya Sharma",
        role: "Interior Designer, Mumbai",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        comment:
            "I've ordered from Poster Haven three times now. The print quality is absolutely exceptional — colours are vibrant, blacks are deep, and the paper stock feels genuinely premium. My clients always ask where I source my art.",
        rating: 5,
    },
    {
        id: "t002",
        author: "Rahul Mehta",
        role: "Architect, Bangalore",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        comment:
            "Finally a poster store that understands art direction. The curation is superb, the ordering process is seamless, and delivery was faster than expected. The Tokyo Neon Nights print is the centrepiece of my living room.",
        rating: 5,
    },
    {
        id: "t003",
        author: "Ananya Reddy",
        role: "Marketing Director, Hyderabad",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        comment:
            "Gifted the Forest Whisper canvas print to my boss for his office. The reaction was priceless. The packaging was immaculate and the canvas arrived in perfect condition. Will definitely order again.",
        rating: 5,
    },
    {
        id: "t004",
        author: "Vikram Singh",
        role: "Photographer, Delhi",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        comment:
            "As a professional photographer, I'm extremely picky about print quality. Poster Haven's satin finish prints are the best I've seen at this price point. The colour accuracy is remarkable.",
        rating: 5,
    },
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: "r001",
        productId: "p001",
        author: "Sneha K.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
        rating: 5,
        title: "Absolutely stunning!",
        comment: "The gold tones are even more beautiful in person. Perfect for my home office. The matte finish is exactly what I needed to avoid glare.",
        date: "2025-01-15",
        verified: true,
    },
    {
        id: "r002",
        productId: "p001",
        author: "Rohan M.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
        rating: 5,
        title: "Great quality, fast shipping",
        comment: "Ordered the A2 size and it arrived in 3 days. Packaging was top-notch. The print itself is exceptional.",
        date: "2025-02-03",
        verified: true,
    },
    {
        id: "r003",
        productId: "p001",
        author: "Divya P.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80",
        rating: 4,
        title: "Love the design",
        comment: "Beautiful print. Only minor quibble is it took a day longer than expected, but the final result was worth the wait.",
        date: "2025-02-20",
        verified: true,
    },
];

// ============================================================
// UTILITY HELPERS
// ============================================================

export function getProductBySlug(slug: string): Product | undefined {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
    return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
    return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export function getBestsellerProducts(): Product[] {
    return MOCK_PRODUCTS.filter((p) => p.isBestseller);
}

export function getNewProducts(): Product[] {
    return MOCK_PRODUCTS.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
    return MOCK_PRODUCTS.filter((p) => p.isSale);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    return MOCK_PRODUCTS.filter(
        (p) => p.id !== product.id && p.category === product.category
    ).slice(0, limit);
}

export function formatPrice(price: number): string {
    return `₹${price.toLocaleString("en-IN")}`;
}

// ============================================================
// MOCK ORDERS
// ============================================================

import { Order } from "./types";

export const MOCK_ORDERS: Order[] = [
    {
        id: "ORD-7294-XJ",
        createdAt: "2025-02-24T14:30:00Z",
        status: "delivered",
        items: [
            {
                product: MOCK_PRODUCTS[0], // Golden Hour Geometry
                variant: MOCK_PRODUCTS[0].variants[1], // A3 Matte
                quantity: 1,
            },
            {
                product: MOCK_PRODUCTS[4], // Forest Whisper
                variant: MOCK_PRODUCTS[4].variants[0], // A4 Satin
                quantity: 1,
            }
        ],
        shippingAddress: {
            fullName: "Aditya Verma",
            email: "aditya.v@example.com",
            phone: "+91 98765 43210",
            address: "Flat 402, Skyline Residency, HSR Layout",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560102",
            country: "India",
        },
        subtotal: 2048,
        shippingCost: 0,
        discount: 204.8,
        total: 1843.2,
        paymentMethod: "Credit Card (Visa)",
        estimatedDelivery: "2025-02-27",
    },
    {
        id: "ORD-8105-LK",
        createdAt: "2025-03-01T09:15:00Z",
        status: "processing",
        items: [
            {
                product: MOCK_PRODUCTS[1], // Tokyo Neon Nights
                variant: MOCK_PRODUCTS[1].variants[2], // A2 Glossy
                quantity: 1,
            }
        ],
        shippingAddress: {
            fullName: "Aditya Verma",
            email: "aditya.v@example.com",
            phone: "+91 98765 43210",
            address: "Flat 402, Skyline Residency, HSR Layout",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560102",
            country: "India",
        },
        subtotal: 2299,
        shippingCost: 0,
        discount: 0,
        total: 2299,
        paymentMethod: "UPI (Google Pay)",
        estimatedDelivery: "2025-03-05",
    },
    {
        id: "ORD-3341-WQ",
        createdAt: "2025-01-12T11:45:00Z",
        status: "delivered",
        items: [
            {
                product: MOCK_PRODUCTS[2], // Minimal Waves
                variant: MOCK_PRODUCTS[2].variants[0], // A4 Matte
                quantity: 2,
            }
        ],
        shippingAddress: {
            fullName: "Aditya Verma",
            email: "aditya.v@example.com",
            phone: "+91 98765 43210",
            address: "Flat 402, Skyline Residency, HSR Layout",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560102",
            country: "India",
        },
        subtotal: 1298,
        shippingCost: 99,
        discount: 0,
        total: 1397,
        paymentMethod: "Net Banking",
        estimatedDelivery: "2025-01-16",
    }
];

