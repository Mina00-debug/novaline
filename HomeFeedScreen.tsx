import React, { useState } from 'react';
import { MessageSquare, Image, TrendingUp, Clock, Hash, AlertTriangle, BookOpen, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomeFeedScreen() {
  const [theoriesFilter, setTheoriesFilter] = useState('hot');
  const [visualFilter, setVisualFilter] = useState('trending');

  // Mock data for theories and discussions
  const theoriesPosts = [
    {
      id: 1,
      type: 'theory',
      title: 'The Fourth Wing Theory: Violet\'s Secret Heritage',
      content: 'I think Violet might actually be related to the original dragon riders in ways we haven\'t discovered yet. The signs are all there...',
      author: 'BookTheorist47',
      timeAgo: '2h',
      upvotes: 234,
      comments: 67,
      book: 'Fourth Wing',
      chapter: 'Chapter 15',
      spoilerFree: false,
      tags: ['theory', 'violet', 'dragons']
    },
    {
      id: 2,
      type: 'discussion',
      title: 'Anyone else crying over THAT scene in Iron Flame?',
      content: 'No spoilers but you know which scene I mean. I had to put the book down for a whole day...',
      author: 'EmotionalReader',
      timeAgo: '4h',
      upvotes: 189,
      comments: 43,
      book: 'Iron Flame',
      spoilerFree: true,
      tags: ['emotional', 'iron-flame', 'discussion']
    },
    {
      id: 3,
      type: 'theory',
      title: 'ACOTAR: Rhysand\'s Real Plan Theory',
      content: 'What if everything Rhysand did was part of a bigger plan we don\'t know about yet? Evidence inside...',
      author: 'FaeTheories',
      timeAgo: '6h',
      upvotes: 156,
      comments: 89,
      book: 'ACOTAR',
      spoilerFree: false,
      tags: ['acotar', 'rhysand', 'theory']
    }
  ];

  // Mock data for visual stories
  const visualPosts = [
    {
      id: 1,
      type: 'fanart',
      title: 'Xaden and Violet from Fourth Wing',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      author: 'ArtByMaya',
      timeAgo: '1h',
      likes: 892,
      comments: 34,
      book: 'Fourth Wing',
      tags: ['fanart', 'xaden', 'violet']
    },
    {
      id: 2,
      type: 'meme',
      title: 'When you finish a book series and don\'t know what to do with your life',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      author: 'BookMemer',
      timeAgo: '3h',
      likes: 1543,
      comments: 87,
      tags: ['meme', 'relatable', 'book-life']
    },
    {
      id: 3,
      type: 'cover-reveal',
      title: 'New cover for the upcoming fantasy series!',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      author: 'Publisher_Updates',
      timeAgo: '5h',
      likes: 456,
      comments: 23,
      tags: ['cover-reveal', 'new-release', 'fantasy']
    }
  ];

  const renderTheoryPost = (post) => (
    <div key={post.id} className="bg-[#111113] rounded-xl p-4 mb-4 clean-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E60023] rounded-full flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-[#EDEDED] text-sm">{post.author}</p>
            <p className="text-[#9B9B9B] text-xs">{post.timeAgo}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="text-xs border-[#1F1F23] text-[#9B9B9B]">
            {post.book}
          </Badge>
          {!post.spoilerFree && (
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-[#E60023]" />
              <span className="text-xs text-[#E60023]">Spoilers</span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-[#EDEDED] mb-2">{post.title}</h3>
      <p className="text-[#9B9B9B] text-sm mb-3 line-clamp-2">{post.content}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs bg-[#E60023]/10 text-[#E60023] border-0">
            #{tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-[#9B9B9B] p-0 h-auto hover:text-[#E60023]">
            <TrendingUp className="h-4 w-4 mr-1" />
            {post.upvotes}
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9B9B9B] p-0 h-auto hover:text-[#E60023]">
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.comments}
          </Button>
        </div>
        {post.chapter && (
          <Badge variant="outline" className="text-xs border-[#1F1F23] text-[#9B9B9B]">
            {post.chapter}
          </Badge>
        )}
      </div>
    </div>
  );

  const renderVisualPost = (post) => (
    <div key={post.id} className="bg-[#111113] rounded-xl overflow-hidden mb-4 clean-card">
      <div className="relative">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-black/50 text-white border-0 text-xs">
            {post.type}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#E60023] rounded-full flex items-center justify-center">
              <Image className="h-3 w-3 text-white" />
            </div>
            <span className="font-medium text-[#EDEDED] text-sm">{post.author}</span>
            <span className="text-[#9B9B9B] text-xs">{post.timeAgo}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-[#EDEDED] mb-2 text-sm">{post.title}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-[#E60023]/10 text-[#E60023] border-0">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-[#9B9B9B] p-0 h-auto hover:text-[#E60023]">
              <span className="text-lg mr-1">♥</span>
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-[#9B9B9B] p-0 h-auto hover:text-[#E60023]">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
          </div>
          {post.book && (
            <Badge variant="outline" className="text-xs border-[#1F1F23] text-[#9B9B9B]">
              {post.book}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#0B0B0C] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 bg-[#0B0B0C] border-b border-[#1F1F23] safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="novaline-title text-2xl">Novaline</h1>
          <div className="w-8 h-8 bg-[#111113] rounded-full border border-[#1F1F23]"></div>
        </div>
        
        {/* Dual Feed Tabs */}
        <Tabs defaultValue="theories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#111113] rounded-xl">
            <TabsTrigger value="theories" className="rounded-lg text-sm data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Theories & Discussions
            </TabsTrigger>
            <TabsTrigger value="visual" className="rounded-lg text-sm data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <Image className="h-4 w-4 mr-2" />
              Visual Stories
            </TabsTrigger>
          </TabsList>
          
          {/* Theories Tab Content */}
          <TabsContent value="theories" className="mt-4">
            {/* Theory Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              <Select value={theoriesFilter} onValueChange={setTheoriesFilter}>
                <SelectTrigger className="w-32 h-8 text-xs bg-[#111113] border-[#1F1F23]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">🔥 Hot</SelectItem>
                  <SelectItem value="top">⭐ Top</SelectItem>
                  <SelectItem value="new">🆕 New</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap border-[#1F1F23] text-[#9B9B9B]">
                <BookOpen className="h-3 w-3 mr-1" />
                By Book
              </Button>
              
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap border-[#1F1F23] text-[#9B9B9B]">
                <Hash className="h-3 w-3 mr-1" />
                By Chapter
              </Button>
              
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap border-[#1F1F23] text-[#9B9B9B]">
                <Zap className="h-3 w-3 mr-1" />
                Spoiler-Free
              </Button>
            </div>
            
            {/* Theories Feed */}
            <div className="flex-1 overflow-y-auto mobile-scroll">
              {theoriesPosts.map(renderTheoryPost)}
            </div>
          </TabsContent>
          
          {/* Visual Tab Content */}
          <TabsContent value="visual" className="mt-4">
            {/* Visual Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              <Select value={visualFilter} onValueChange={setVisualFilter}>
                <SelectTrigger className="w-32 h-8 text-xs bg-[#111113] border-[#1F1F23]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">📈 Trending</SelectItem>
                  <SelectItem value="fanart">🎨 Fan Art</SelectItem>
                  <SelectItem value="memes">😄 Memes</SelectItem>
                  <SelectItem value="covers">📚 Cover Reveals</SelectItem>
                  <SelectItem value="reels">🎬 Reels</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap border-[#1F1F23] text-[#9B9B9B]">
                <TrendingUp className="h-3 w-3 mr-1" />
                Hot Picks
              </Button>
              
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap border-[#1F1F23] text-[#9B9B9B]">
                <Clock className="h-3 w-3 mr-1" />
                Recent
              </Button>
            </div>
            
            {/* Visual Feed */}
            <div className="flex-1 overflow-y-auto mobile-scroll">
              {visualPosts.map(renderVisualPost)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}