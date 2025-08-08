import React, { useState } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = ['Featured', 'Stationery', 'Tabs', 'Pens', 'Reader Kits', 'Fan Merch'];

const mockProducts = {
  featured: [
    {
      id: 1,
      name: 'Cozy Reading Candle Set',
      price: 24.99,
      seller: 'BookNook Co.',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300',
      rating: 4.8,
      reviews: 156,
      description: 'Hand-poured soy candles in literary scents'
    },
    {
      id: 2,
      name: 'Vintage Book Nook Diorama',
      price: 89.99,
      seller: 'Miniature Magic',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
      rating: 4.9,
      reviews: 89,
      description: 'DIY library scene for your bookshelf'
    }
  ],
  stationery: [
    {
      id: 3,
      name: 'Literary Quote Sticky Notes',
      price: 12.99,
      seller: 'Quote Crafts',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300',
      rating: 4.6,
      reviews: 234,
      description: 'Beautiful quotes on adhesive notes'
    },
    {
      id: 4,
      name: 'Book Tracker Journal',
      price: 18.99,
      seller: 'Reading Essentials',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
      rating: 4.7,
      reviews: 178,
      description: 'Track your reading journey in style'
    }
  ],
  tabs: [
    {
      id: 5,
      name: 'Character Emotion Tabs',
      price: 8.99,
      seller: 'BookMark Boutique',
      image: 'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=300',
      rating: 4.5,
      reviews: 312,
      description: 'Express your feelings while reading'
    }
  ],
  pens: [
    {
      id: 6,
      name: 'Annotation Pen Set',
      price: 15.99,
      seller: 'Write On',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300',
      rating: 4.4,
      reviews: 98,
      description: 'Perfect for margin notes and highlights'
    }
  ],
  readerKits: [
    {
      id: 7,
      name: 'Ultimate Reader Survival Kit',
      price: 45.99,
      seller: 'BookLover Essentials',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
      rating: 4.8,
      reviews: 156,
      description: 'Everything you need for the perfect reading session'
    }
  ],
  fanMerch: [
    {
      id: 8,
      name: 'Bookish Tote Bag Collection',
      price: 22.99,
      seller: 'Literary Threads',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      rating: 4.6,
      reviews: 267,
      description: 'Show off your reading pride'
    }
  ]
};

export function AnnotationStationScreen() {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [cartCount, setCartCount] = useState(3);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-[#FFB02E] fill-current' : 'text-[#EAEAEA]'}`} 
          />
        ))}
        <span className="text-xs text-[#7D7D7D] ml-1">({rating})</span>
      </div>
    );
  };

  const renderProductCard = (product: any) => (
    <Card key={product.id} className="bg-white border border-[#EAEAEA] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 clean-card">
      <CardContent className="p-0">
        <div className="aspect-square rounded-t-lg overflow-hidden relative">
          <ImageWithFallback 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 border border-[#EAEAEA]">
            {renderStars(product.rating)}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-1 text-sm line-clamp-2 text-[#1A1A1A]">{product.name}</h3>
          <p className="text-xs text-[#7D7D7D] mb-2">{product.seller}</p>
          <p className="text-xs text-[#7D7D7D] mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium text-[#4B6BFB]">${product.price}</span>
            <span className="text-xs text-[#7D7D7D]">{product.reviews} reviews</span>
          </div>
          
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-[#4B6BFB] to-[#FFB02E] hover:from-[#3B5BEB] hover:to-[#EFA01E] text-white clean-shadow"
            onClick={() => setCartCount(cartCount + 1)}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const getCurrentProducts = () => {
    switch (activeCategory) {
      case 'featured': return mockProducts.featured;
      case 'stationery': return mockProducts.stationery;
      case 'tabs': return mockProducts.tabs;
      case 'pens': return mockProducts.pens;
      case 'readerKits': return mockProducts.readerKits;
      case 'fanMerch': return mockProducts.fanMerch;
      default: return mockProducts.featured;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#EAEAEA] p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl bg-gradient-to-r from-[#4B6BFB] to-[#FFB02E] bg-clip-text text-transparent">Annotation Station</h1>
            <p className="text-sm text-[#7D7D7D]">Your cozy bookish marketplace</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-[#4B6BFB] text-[#4B6BFB] hover:bg-[#4B6BFB] hover:text-white">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" className="relative bg-gradient-to-r from-[#4B6BFB] to-[#FFB02E] hover:from-[#3B5BEB] hover:to-[#EFA01E]">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#FFB02E] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category.toLowerCase().replace(' ', '') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.toLowerCase().replace(' ', ''))}
              className={`whitespace-nowrap ${
                activeCategory === category.toLowerCase().replace(' ', '') 
                  ? 'bg-gradient-to-r from-[#4B6BFB] to-[#FFB02E] text-white' 
                  : 'border-[#4B6BFB] text-[#4B6BFB] hover:bg-[#4B6BFB]/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {getCurrentProducts().map(renderProductCard)}
        </div>

        {/* Empty State for categories with no products */}
        {getCurrentProducts().length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Coming Soon!</h3>
            <p className="text-sm text-[#7D7D7D]">We're curating amazing products for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}