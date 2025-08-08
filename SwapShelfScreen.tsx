import React, { useState } from 'react';
import { Plus, MapPin, Filter, Coins, ArrowLeftRight, ShoppingCart, Heart, Sparkles, Crown, Star, Award, Users, Store, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

// Swap Hub Data (P2P Book Swaps)
const swapHubBooks = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
    owner: { name: 'BookLover23', avatar: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150', rating: 4.8 },
    distance: '2.3 miles',
    tradeCoin: 15,
    condition: 'Like New',
    conditionRating: 5,
    tags: ['Philosophy', 'Contemporary'],
    availableUntil: '2 days left'
  },
  {
    id: 2,
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    owner: { name: 'FeyreFan', avatar: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150', rating: 4.9 },
    distance: '4.1 miles',
    tradeCoin: 12,
    condition: 'Good',
    conditionRating: 4,
    tags: ['Fae', 'Romance'],
    availableUntil: '1 week left'
  },
  {
    id: 3,
    title: 'The Atlas Six',
    author: 'Olivie Blake',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300',
    owner: { name: 'DarkAcademia', avatar: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150', rating: 4.7 },
    distance: '1.8 miles',
    tradeCoin: 18,
    condition: 'Very Good',
    conditionRating: 4,
    tags: ['Dark Academia', 'Fantasy'],
    availableUntil: '3 days left'
  }
];

// Indie Book Store Data
const indieBookStore = [
  {
    id: 1,
    title: 'Fourth Wing - Purple Dragon Edition',
    author: 'Rebecca Yarros',
    cover: 'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=300',
    seller: { 
      name: 'Mystic Books & Brew', 
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150',
      rating: 4.9,
      location: 'Portland, OR',
      isVerified: true,
      specialties: ['Limited Editions', 'Fantasy']
    },
    price: 89.99,
    originalPrice: 120.00,
    edition: 'Limited Edition',
    isSpecial: true,
    specialType: 'limited',
    stock: 3,
    features: ['Signed by Author', 'Foil Details', 'Exclusive Art'],
    condition: 'Brand New',
    tags: ['Limited Edition', 'Signed'],
    isFeatured: true
  },
  {
    id: 2,
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
    seller: { 
      name: 'Bookworm Haven', 
      logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150',
      rating: 4.8,
      location: 'Austin, TX',
      isVerified: true,
      specialties: ['Contemporary Fiction', 'Romance']
    },
    price: 45.00,
    originalPrice: 55.00,
    edition: 'First Edition',
    isSpecial: true,
    specialType: 'first-edition',
    stock: 1,
    features: ['First Edition', 'Dust Jacket', 'Near Mint'],
    condition: 'Near Mint',
    tags: ['First Edition', 'Rare'],
    isFeatured: false
  },
  {
    id: 3,
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    seller: { 
      name: 'Sage & Stories',
      logo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150',
      rating: 4.9,
      location: 'Seattle, WA',
      isVerified: true,
      specialties: ['Literary Fiction', 'Classics'],
      isFeaturedStore: true
    },
    price: 67.50,
    originalPrice: 75.00,
    edition: 'Author Signed',
    isSpecial: true,
    specialType: 'signed',
    stock: 2,
    features: ['Author Signed', 'Personalized Message', 'Premium Binding'],
    condition: 'Like New',
    tags: ['Signed Copies', 'Premium'],
    isFeatured: false
  }
];

// Merchandise Data
const merchandiseItems = [
  {
    id: 1,
    name: 'Mystic Dragon Figurine Set',
    price: 34.99,
    originalPrice: 42.99,
    seller: { 
      name: 'Enchanted Collectibles', 
      logo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150',
      rating: 4.9,
      location: 'Fantasy Realm',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
    category: 'Collectibles',
    stock: 12,
    features: ['Hand-painted', 'Set of 3', 'Display Stand'],
    description: 'Magical dragon trio for your bookshelf - perfect reading companions',
    tags: ['Dragons', 'Fantasy', 'Collectible'],
    isPopular: true,
    reviews: 89
  },
  {
    id: 2,
    name: 'Cosmic Annotation Pages',
    price: 18.99,
    seller: { 
      name: 'Stellar Stationery Co.', 
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150',
      rating: 4.7,
      location: 'Galaxy Central',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300',
    category: 'Stationery',
    stock: 25,
    features: ['50 Pages', 'Starry Design', 'Thick Paper'],
    description: 'Celestial-themed annotation pages with constellation borders',
    tags: ['Annotation', 'Notes', 'Cosmic'],
    isPopular: false,
    reviews: 156
  },
  {
    id: 3,
    name: 'Aurora Highlighter Set',
    price: 24.99,
    originalPrice: 29.99,
    seller: { 
      name: 'Rainbow Writing Co.', 
      logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150',
      rating: 4.8,
      location: 'Prism City',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1565022687441-1926c2ed13da?w=300',
    category: 'Writing Tools',
    stock: 18,
    features: ['6 Colors', 'Dual-tip', 'No Bleed'],
    description: 'Shimmering highlighters that change color in different light',
    tags: ['Highlighters', 'Rainbow', 'Magic'],
    isPopular: true,
    reviews: 234
  },
  {
    id: 4,
    name: 'Moonbeam Gel Pen Collection',
    price: 15.99,
    seller: { 
      name: 'Celestial Writing', 
      logo: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150',
      rating: 4.6,
      location: 'Lunar Station',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300',
    category: 'Writing Tools',
    stock: 22,
    features: ['10 Pens', 'Metallic Ink', 'Smooth Flow'],
    description: 'Glittery gel pens that write like stardust on paper',
    tags: ['Gel Pens', 'Metallic', 'Smooth'],
    isPopular: false,
    reviews: 178
  },
  {
    id: 5,
    name: 'Enchanted Bookmark Set',
    price: 12.99,
    seller: { 
      name: 'Mystical Markers', 
      logo: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150',
      rating: 4.9,
      location: 'Bookmark Bay',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    category: 'Accessories',
    stock: 30,
    features: ['5 Bookmarks', 'Tassel Detail', 'Magnetic'],
    description: 'Magical bookmarks with quotes that appear when you read',
    tags: ['Bookmarks', 'Quotes', 'Magnetic'],
    isPopular: true,
    reviews: 312
  },
  {
    id: 6,
    name: 'Crystal Reading Light',
    price: 39.99,
    originalPrice: 49.99,
    seller: { 
      name: 'Illuminated Reads', 
      logo: 'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=150',
      rating: 4.8,
      location: 'Crystal Caverns',
      isVerified: true
    },
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300',
    category: 'Accessories',
    stock: 8,
    features: ['LED Light', 'USB Rechargeable', 'Adjustable'],
    description: 'Magical crystal that glows with perfect reading light',
    tags: ['Reading Light', 'Crystal', 'Rechargeable'],
    isPopular: true,
    reviews: 145
  }
];

export function SwapShelfScreen() {
  const [activeTab, setActiveTab] = useState('swap-hub');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New': return 'bg-[#E60023]/10 text-[#E60023] border-[#E60023]/30';
      case 'Very Good': return 'bg-green-500/10 text-green-600 border-green-500/30';
      case 'Good': return 'bg-[#E60023]/10 text-[#E60023] border-[#E60023]/30';
      case 'Fair': return 'bg-[#9B9B9B]/10 text-[#9B9B9B] border-[#9B9B9B]/30';
      default: return 'bg-[#111113] text-[#9B9B9B] border-[#1F1F23]';
    }
  };

  const getSpecialBadge = (type: string) => {
    switch (type) {
      case 'limited': return { icon: Crown, color: 'bg-[#E60023]', text: 'Limited Edition' };
      case 'signed': return { icon: Star, color: 'bg-[#E60023]', text: 'Signed Copy' };
      case 'first-edition': return { icon: Award, color: 'bg-[#E60023]', text: 'First Edition' };
      default: return { icon: Sparkles, color: 'bg-[#111113]', text: 'Special' };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Collectibles': return 'bg-[#E60023]/20 text-[#E60023] border-[#E60023]/30';
      case 'Stationery': return 'bg-[#E60023]/20 text-[#E60023] border-[#E60023]/30';
      case 'Writing Tools': return 'bg-[#E60023]/20 text-[#E60023] border-[#E60023]/30';
      case 'Accessories': return 'bg-[#E60023]/20 text-[#E60023] border-[#E60023]/30';
      default: return 'bg-[#111113] text-[#9B9B9B] border-[#1F1F23]';
    }
  };

  const renderConditionStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? 'text-[#E60023] fill-current' : 'text-[#1F1F23]'}`} />
    ));
  };

  const renderSparkles = () => (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
          }}
          style={{
            left: `${20 + i * 25}%`,
            top: `${10 + i * 15}%`,
          }}
        >
          <Sparkles className="h-4 w-4 text-[#E60023]" />
        </motion.div>
      ))}
    </>
  );

  const renderSwapCard = (book: any) => (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="bg-[#111113] border-[#1F1F23] hover:border-[#E60023] transition-all duration-300 rounded-xl overflow-hidden clean-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative">
              <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-[#1F1F23] group-hover:border-[#E60023] transition-colors">
                <ImageWithFallback 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#E60023] text-white text-xs px-2 py-1 rounded-full font-medium clean-shadow">
                {book.availableUntil}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1 text-[#EDEDED] group-hover:text-[#E60023] transition-colors">{book.title}</h3>
              <p className="text-sm text-[#9B9B9B] mb-3">{book.author}</p>
              
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8 ring-2 ring-[#E60023]/20">
                  <AvatarImage src={book.owner.avatar} />
                  <AvatarFallback className="bg-[#E60023] text-white text-sm">{book.owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-[#EDEDED] font-medium">{book.owner.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-[#E60023] fill-current" />
                    <span className="text-xs text-[#9B9B9B]">{book.owner.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-[#E60023]" />
                <span className="text-sm text-[#9B9B9B]">{book.distance}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </Badge>
                <div className="flex gap-1">
                  {renderConditionStars(book.conditionRating)}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {book.tags.map((tag) => (
                  <Badge key={tag} className="bg-[#111113] text-[#9B9B9B] border-[#1F1F23] rounded-full px-3 py-1 text-xs hover:bg-[#E60023] hover:text-white transition-all">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E60023]">
                  <Coins className="h-4 w-4" />
                  <span className="font-medium">{book.tradeCoin} TC</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#1F1F23] text-[#9B9B9B] hover:bg-[#111113] hover:text-[#EDEDED] hover:border-[#E60023]">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-[#E60023] hover:bg-[#D50020] text-white clean-shadow hover:scale-105 transition-all">
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Swap Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderStoreCard = (book: any) => (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      {book.isSpecial && (
        <div className="absolute -top-2 -right-2 z-10">
          {(() => {
            const badge = getSpecialBadge(book.specialType);
            const Icon = badge.icon;
            return (
              <div className={`${badge.color} text-white px-3 py-1 rounded-full text-xs font-medium clean-shadow flex items-center gap-1`}>
                <Icon className="h-3 w-3" />
                {badge.text}
              </div>
            );
          })()}
        </div>
      )}
      
      <Card className="bg-[#111113] border-[#1F1F23] hover:border-[#E60023] transition-all duration-300 rounded-xl overflow-hidden clean-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative">
              <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-[#1F1F23] group-hover:border-[#E60023] transition-colors">
                <ImageWithFallback 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {book.seller.isFeaturedStore && (
                  <div className="absolute top-2 left-2 bg-[#E60023] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Featured
                  </div>
                )}
              </div>
              {renderSparkles()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1 text-[#EDEDED] group-hover:text-[#E60023] transition-colors">{book.title}</h3>
              <p className="text-sm text-[#9B9B9B] mb-3">{book.author}</p>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1F1F23]">
                  <ImageWithFallback 
                    src={book.seller.logo} 
                    alt={book.seller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[#EDEDED] font-medium">{book.seller.name}</p>
                    {book.seller.isVerified && (
                      <div className="w-4 h-4 rounded-full bg-[#E60023] flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-[#E60023] fill-current" />
                      <span className="text-xs text-[#9B9B9B]">{book.seller.rating}</span>
                    </div>
                    <span className="text-xs text-[#9B9B9B]">•</span>
                    <span className="text-xs text-[#9B9B9B]">{book.seller.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-[#EDEDED]">${book.price}</span>
                {book.originalPrice > book.price && (
                  <span className="text-sm text-[#9B9B9B] line-through">${book.originalPrice}</span>
                )}
                <Badge className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">
                  {book.stock} left
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {book.features.slice(0, 2).map((feature) => (
                  <Badge key={feature} className="bg-[#111113] text-[#9B9B9B] border-[#1F1F23] rounded-full px-3 py-1 text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#1F1F23] text-[#9B9B9B] hover:bg-[#111113] hover:text-[#EDEDED] hover:border-[#E60023]">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-[#E60023] hover:bg-[#D50020] text-white clean-shadow hover:scale-105 transition-all">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderMerchandiseCard = (item: any) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      {item.isPopular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-[#E60023] text-white px-3 py-1 rounded-full text-xs font-medium clean-shadow flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Popular
          </div>
        </div>
      )}
      
      <Card className="bg-[#111113] border-[#1F1F23] hover:border-[#E60023] transition-all duration-300 rounded-xl overflow-hidden clean-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative">
              <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-[#1F1F23] group-hover:border-[#E60023] transition-colors">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-2 left-2">
                <Badge className={`text-xs ${getCategoryColor(item.category)} backdrop-blur-sm`}>
                  {item.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1 text-[#EDEDED] group-hover:text-[#E60023] transition-colors">{item.name}</h3>
              <p className="text-sm text-[#9B9B9B] mb-3">{item.description}</p>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1F1F23]">
                  <ImageWithFallback 
                    src={item.seller.logo} 
                    alt={item.seller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[#EDEDED] font-medium">{item.seller.name}</p>
                    {item.seller.isVerified && (
                      <div className="w-4 h-4 rounded-full bg-[#E60023] flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-[#E60023] fill-current" />
                      <span className="text-xs text-[#9B9B9B]">{item.seller.rating}</span>
                    </div>
                    <span className="text-xs text-[#9B9B9B]">•</span>
                    <span className="text-xs text-[#9B9B9B]">{item.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-[#EDEDED]">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-[#9B9B9B] line-through">${item.originalPrice}</span>
                )}
                <Badge className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">
                  {item.stock} left
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.features.slice(0, 2).map((feature) => (
                  <Badge key={feature} className="bg-[#111113] text-[#9B9B9B] border-[#1F1F23] rounded-full px-3 py-1 text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="bg-[#E60023]/20 text-[#E60023] border-[#E60023]/30 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#1F1F23] text-[#9B9B9B] hover:bg-[#111113] hover:text-[#EDEDED] hover:border-[#E60023]">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-[#E60023] hover:bg-[#D50020] text-white clean-shadow hover:scale-105 transition-all">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0B0B0C]">
      {/* Clean Header - Mobile Optimized */}
      <div className="bg-[#0B0B0C] border-b border-[#1F1F23] p-3 safe-area-top">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-[#E60023] flex items-center justify-center clean-shadow">
                <Store className="h-4 w-4 text-white" />
              </div>
            </div>
            <h1 className="text-lg novaline-title">SwapShelf</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="border-[#E60023] text-[#E60023] hover:bg-[#E60023]/10 touch-target">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>

        {/* Clean Filter Panel */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#111113] p-4 rounded-xl mb-4 border border-[#1F1F23]"
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#EDEDED] mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {['Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Non-Fiction'].map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className={`text-xs rounded-full ${
                        activeFilters.includes(category)
                          ? 'bg-[#E60023] text-white border-[#E60023]'
                          : 'border-[#1F1F23] text-[#9B9B9B] hover:border-[#E60023] hover:text-[#E60023]'
                      }`}
                      onClick={() => {
                        if (activeFilters.includes(category)) {
                          setActiveFilters(prev => prev.filter(f => f !== category));
                        } else {
                          setActiveFilters(prev => [...prev, category]);
                        }
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#EDEDED] mb-2">Condition</p>
                <div className="flex flex-wrap gap-2">
                  {['Like New', 'Very Good', 'Good', 'Fair'].map((condition) => (
                    <Button
                      key={condition}
                      variant="outline"
                      size="sm"
                      className={`text-xs rounded-full ${
                        activeFilters.includes(condition)
                          ? 'bg-[#E60023] text-white border-[#E60023]'
                          : 'border-[#1F1F23] text-[#9B9B9B] hover:border-[#E60023] hover:text-[#E60023]'
                      }`}
                      onClick={() => {
                        if (activeFilters.includes(condition)) {
                          setActiveFilters(prev => prev.filter(f => f !== condition));
                        } else {
                          setActiveFilters(prev => [...prev, condition]);
                        }
                      }}
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Clean Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#111113] rounded-xl">
            <TabsTrigger 
              value="swap-hub" 
              className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white"
            >
              <ArrowLeftRight className="h-3 w-3 mr-1" />
              Swap Hub
            </TabsTrigger>
            <TabsTrigger 
              value="indie-stores" 
              className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white"
            >
              <Store className="h-3 w-3 mr-1" />
              Indie Stores
            </TabsTrigger>
            <TabsTrigger 
              value="merchandise" 
              className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white"
            >
              <Package className="h-3 w-3 mr-1" />
              Merch
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll p-3">
        <Tabs value={activeTab} className="w-full">
          {/* Swap Hub Tab */}
          <TabsContent value="swap-hub" className="mt-0 space-y-4">
            {swapHubBooks.map(renderSwapCard)}
          </TabsContent>

          {/* Indie Stores Tab */}
          <TabsContent value="indie-stores" className="mt-0 space-y-4">
            {indieBookStore.map(renderStoreCard)}
          </TabsContent>

          {/* Merchandise Tab */}
          <TabsContent value="merchandise" className="mt-0 space-y-4">
            {merchandiseItems.map(renderMerchandiseCard)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}