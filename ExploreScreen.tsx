import React, { useState } from 'react';
import { Search, TrendingUp, Star, BookOpen, Users, ShoppingBag, Calendar, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock trending data
  const trendingBooks = [
    {
      id: 1,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
      rating: 4.8,
      trending: true,
      genre: 'Fantasy Romance'
    },
    {
      id: 2,
      title: 'Iron Flame',
      author: 'Rebecca Yarros',
      cover: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=200&h=300&fit=crop',
      rating: 4.9,
      trending: true,
      genre: 'Fantasy Romance'
    },
    {
      id: 3,
      title: 'A Court of Thorns and Roses',
      author: 'Sarah J. Maas',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop',
      rating: 4.7,
      trending: false,
      genre: 'Fantasy Romance'
    }
  ];

  const trendingTags = [
    { tag: 'fourth-wing', posts: 2.4 },
    { tag: 'book-recs', posts: 1.8 },
    { tag: 'fantasy-romance', posts: 3.2 },
    { tag: 'dragon-riders', posts: 1.1 },
    { tag: 'iron-flame', posts: 2.1 },
    { tag: 'sarah-j-maas', posts: 1.9 }
  ];

  const curatedTheories = [
    {
      id: 1,
      title: 'The Hidden Connection Between Xaden and the War',
      author: 'TheoryMaster',
      upvotes: 847,
      comments: 234,
      book: 'Fourth Wing',
      timeAgo: '3h'
    },
    {
      id: 2,
      title: 'ACOTAR 6: What Elain\'s Powers Really Mean',
      author: 'FaeTheories',
      upvotes: 692,
      comments: 189,
      book: 'ACOTAR',
      timeAgo: '6h'
    },
    {
      id: 3,
      title: 'The Real Reason Behind Iron Flame\'s Ending',
      author: 'BookDetective',
      upvotes: 534,
      comments: 156,
      book: 'Iron Flame',
      timeAgo: '1d'
    }
  ];

  const hotMerch = [
    {
      id: 1,
      name: 'Fourth Wing Dragon Pin Set',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
      seller: 'DragonMerch',
      rating: 4.9
    },
    {
      id: 2,
      name: 'ACOTAR Night Court Mug',
      price: '$18.99',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop',
      seller: 'FaeGoods',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Book Stack Aesthetic Prints',
      price: '$15.99',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      seller: 'BookArt',
      rating: 4.7
    }
  ];

  const communityHighlights = [
    {
      id: 1,
      name: 'Fourth Wing Fans',
      members: '127K',
      description: 'Everything Fourth Wing and Empyrean series',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=100&fit=crop',
      trending: true
    },
    {
      id: 2,
      name: 'Sarah J. Maas Universe',
      members: '89K',
      description: 'ACOTAR, TOG, CC discussions and theories',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      trending: true
    },
    {
      id: 3,
      name: 'Fantasy Romance Readers',
      members: '156K',
      description: 'Discover your next obsession',
      image: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=100&h=100&fit=crop',
      trending: false
    }
  ];

  return (
    <div className="h-full bg-[#0B0B0C] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 bg-[#0B0B0C] border-b border-[#1F1F23] safe-area-top">
        <h1 className="novaline-title text-2xl mb-4">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9B9B9B]" />
          <Input
            placeholder="Search posts, users, books, fandoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#111113] border-[#1F1F23] text-sm text-[#EDEDED] placeholder:text-[#9B9B9B]"
          />
        </div>
        
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
            className={`text-xs whitespace-nowrap ${
              activeFilter === 'all' 
                ? 'bg-[#E60023] text-white' 
                : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
            }`}
          >
            All
          </Button>
          <Button
            variant={activeFilter === 'posts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('posts')}
            className={`text-xs whitespace-nowrap ${
              activeFilter === 'posts' 
                ? 'bg-[#E60023] text-white' 
                : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
            }`}
          >
            Posts
          </Button>
          <Button
            variant={activeFilter === 'users' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('users')}
            className={`text-xs whitespace-nowrap ${
              activeFilter === 'users' 
                ? 'bg-[#E60023] text-white' 
                : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
            }`}
          >
            Users
          </Button>
          <Button
            variant={activeFilter === 'books' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('books')}
            className={`text-xs whitespace-nowrap ${
              activeFilter === 'books' 
                ? 'bg-[#E60023] text-white' 
                : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
            }`}
          >
            Books
          </Button>
          <Button
            variant={activeFilter === 'fandoms' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('fandoms')}
            className={`text-xs whitespace-nowrap ${
              activeFilter === 'fandoms' 
                ? 'bg-[#E60023] text-white' 
                : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
            }`}
          >
            Fandoms
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-4 py-4">
        {/* Trending Books Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#EDEDED] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#E60023]" />
              Trending Books
            </h2>
            <Button variant="ghost" size="sm" className="text-[#E60023] text-xs p-0">
              See all
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {trendingBooks.map((book) => (
              <div key={book.id} className="flex-shrink-0 w-32">
                <div className="relative">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {book.trending && (
                    <Badge className="absolute top-2 right-2 bg-[#E60023] text-white border-0 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-[#EDEDED] text-sm mt-2 line-clamp-2">{book.title}</h3>
                <p className="text-[#9B9B9B] text-xs">{book.author}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-[#9B9B9B]">{book.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tags */}
        <div className="mb-6">
          <h2 className="font-semibold text-[#EDEDED] mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#E60023]" />
            Trending Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((item, index) => (
              <Button key={index} variant="outline" size="sm" className="text-xs border-[#1F1F23] text-[#9B9B9B] bg-[#111113] hover:border-[#E60023] hover:text-[#E60023]">
                #{item.tag}
                <Badge variant="secondary" className="ml-2 text-xs bg-[#E60023]/10 text-[#E60023] border-0">
                  {item.posts}k
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* This Week's Theories */}
        <div className="mb-6">
          <h2 className="font-semibold text-[#EDEDED] mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-[#E60023]" />
            This Week's Theories
          </h2>
          <div className="space-y-3">
            {curatedTheories.map((theory) => (
              <div key={theory.id} className="bg-[#111113] rounded-lg p-3 clean-card">
                <h3 className="font-medium text-[#EDEDED] text-sm mb-1">{theory.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#9B9B9B]">
                    <span>by {theory.author}</span>
                    <span>{theory.timeAgo}</span>
                    <Badge variant="outline" className="text-xs border-[#1F1F23]">{theory.book}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9B9B9B]">
                    <span>{theory.upvotes} upvotes</span>
                    <span>{theory.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Picks in Merch */}
        <div className="mb-6">
          <h2 className="font-semibold text-[#EDEDED] mb-3 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#E60023]" />
            Hot Picks in Merch
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {hotMerch.map((item) => (
              <div key={item.id} className="bg-[#111113] rounded-lg overflow-hidden clean-card">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-[#EDEDED] text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-[#E60023] font-semibold text-sm">{item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#9B9B9B] text-xs">{item.seller}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-[#9B9B9B]">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="mb-6">
          <h2 className="font-semibold text-[#EDEDED] mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#E60023]" />
            Community Highlights
          </h2>
          <div className="space-y-3">
            {communityHighlights.map((community) => (
              <div key={community.id} className="bg-[#111113] rounded-lg p-3 clean-card">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={community.image}
                    alt={community.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[#EDEDED] text-sm">{community.name}</h3>
                      {community.trending && (
                        <Badge className="bg-[#E60023] text-white border-0 text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#9B9B9B] text-xs mb-1">{community.description}</p>
                    <span className="text-[#9B9B9B] text-xs">{community.members} members</span>
                  </div>
                  <Button size="sm" className="bg-[#E60023] text-white text-xs">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}