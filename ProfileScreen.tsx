import React, { useState } from 'react';
import { Settings, Grid3X3, ShoppingBag, Heart, BookOpen, Edit, MessageSquare, Image, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileScreenProps {
  onNavigateToSettings: () => void;
}

export function ProfileScreen({ onNavigateToSettings }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('posts');

  // Mock user data
  const userData = {
    name: 'Sarah Chen',
    username: '@bookworm_sarah',
    bio: 'Fantasy romance obsessed 📚 Currently reading Fourth Wing for the 3rd time ✨ Dragon rider wannabe 🐉',
    followers: 1247,
    following: 892,
    posts: 156,
    joinedDate: 'March 2023'
  };

  // Mock posts data
  const userPosts = [
    {
      id: 1,
      type: 'discussion',
      title: 'Theory: Xaden\'s real motivations in Fourth Wing',
      content: 'I think there\'s more to Xaden than meets the eye...',
      timeAgo: '2d',
      upvotes: 89,
      comments: 23,
      book: 'Fourth Wing'
    },
    {
      id: 2,
      type: 'visual',
      title: 'My Fourth Wing aesthetic board',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop',
      timeAgo: '5d',
      likes: 234,
      comments: 12,
      book: 'Fourth Wing'
    },
    {
      id: 3,
      type: 'discussion',
      title: 'ACOTAR reading order debate',
      content: 'What\'s the best order to read the ACOTAR series?',
      timeAgo: '1w',
      upvotes: 67,
      comments: 45,
      book: 'ACOTAR'
    }
  ];

  // Mock listings data
  const userListings = [
    {
      id: 1,
      type: 'swap',
      title: 'Fourth Wing (Hardcover)',
      price: 'Trade only',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      status: 'available',
      timeAgo: '3d'
    },
    {
      id: 2,
      type: 'merch',
      title: 'Dragon Rider Pin Set',
      price: '$15.99',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
      status: 'sold',
      timeAgo: '1w'
    },
    {
      id: 3,
      type: 'indie',
      title: 'The Last Phoenix (Signed Copy)',
      price: '$24.99',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=300&h=400&fit=crop',
      status: 'available',
      timeAgo: '2w'
    }
  ];

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      type: 'book',
      title: 'Iron Flame (Special Edition)',
      author: 'Rebecca Yarros',
      image: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=300&h=400&fit=crop',
      priority: 'high',
      savedFrom: 'SwapShelf'
    },
    {
      id: 2,
      type: 'merch',
      title: 'ACOTAR Night Court Mug',
      seller: 'FaeGoods',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop',
      priority: 'medium',
      savedFrom: 'Explore'
    },
    {
      id: 3,
      type: 'book',
      title: 'Throne of Glass Box Set',
      author: 'Sarah J. Maas',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      priority: 'low',
      savedFrom: 'Community'
    }
  ];

  // Mock reading interests
  const readingInterests = {
    favoriteGenres: ['Fantasy Romance', 'Epic Fantasy', 'Romantasy', 'Young Adult'],
    currentlyReading: [
      {
        title: 'Fourth Wing',
        author: 'Rebecca Yarros',
        progress: 75,
        image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop'
      }
    ],
    favoriteAuthors: ['Rebecca Yarros', 'Sarah J. Maas', 'Jennifer L. Armentrout', 'Stephanie Meyer'],
    readingGoals: {
      yearly: 52,
      completed: 34
    }
  };

  const renderPost = (post) => (
    <div key={post.id} className="bg-[#111113] rounded-lg p-3 mb-3 clean-card">
      {post.type === 'visual' ? (
        <>
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          <h3 className="font-medium text-[#EDEDED] text-sm mb-1">{post.title}</h3>
        </>
      ) : (
        <>
          <h3 className="font-medium text-[#EDEDED] text-sm mb-2">{post.title}</h3>
          <p className="text-[#9B9B9B] text-sm mb-2 line-clamp-2">{post.content}</p>
        </>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-[#9B9B9B]">
          <span>{post.timeAgo}</span>
          <Badge variant="outline" className="text-xs border-[#1F1F23]">{post.book}</Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9B9B9B]">
          {post.type === 'visual' ? (
            <span>{post.likes} likes</span>
          ) : (
            <span>{post.upvotes} upvotes</span>
          )}
          <span>{post.comments} comments</span>
        </div>
      </div>
    </div>
  );

  const renderListing = (listing) => (
    <div key={listing.id} className="bg-[#111113] rounded-lg overflow-hidden clean-card">
      <div className="relative">
        <ImageWithFallback
          src={listing.image}
          alt={listing.title}
          className="w-full h-32 object-cover"
        />
        <Badge className={`absolute top-2 right-2 text-xs border-0 ${
          listing.status === 'available' 
            ? 'bg-green-500 text-white' 
            : 'bg-[#9B9B9B] text-white'
        }`}>
          {listing.status}
        </Badge>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-[#EDEDED] text-sm mb-1">{listing.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#E60023] font-semibold text-sm">{listing.price}</span>
          <Badge variant="outline" className="text-xs border-[#1F1F23]">{listing.condition}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#9B9B9B] text-xs">{listing.timeAgo}</span>
          <Badge variant="secondary" className="text-xs bg-[#E60023]/10 text-[#E60023] border-0">
            {listing.type}
          </Badge>
        </div>
      </div>
    </div>
  );

  const renderWishlistItem = (item) => (
    <div key={item.id} className="bg-[#111113] rounded-lg p-3 clean-card">
      <div className="flex gap-3">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-16 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-medium text-[#EDEDED] text-sm mb-1">{item.title}</h3>
          {item.author && (
            <p className="text-[#9B9B9B] text-xs mb-1">{item.author}</p>
          )}
          {item.seller && (
            <p className="text-[#9B9B9B] text-xs mb-1">by {item.seller}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className={`text-xs ${
              item.priority === 'high' ? 'border-[#E60023] text-[#E60023]' :
              item.priority === 'medium' ? 'border-orange-400 text-orange-400' :
              'border-[#1F1F23] text-[#9B9B9B]'
            }`}>
              {item.priority} priority
            </Badge>
            <span className="text-xs text-[#9B9B9B]">from {item.savedFrom}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#0B0B0C] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 bg-[#0B0B0C] border-b border-[#1F1F23] safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="novaline-title text-2xl">Profile</h1>
          <Button onClick={onNavigateToSettings} variant="ghost" size="sm" className="p-2">
            <Settings className="h-5 w-5 text-[#9B9B9B]" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 bg-[#E60023] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">SC</span>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-[#EDEDED] mb-1">{userData.name}</h2>
            <p className="text-[#9B9B9B] text-sm mb-2">{userData.username}</p>
            <div className="flex gap-4 text-sm">
              <span><strong className="text-[#EDEDED]">{userData.posts}</strong> <span className="text-[#9B9B9B]">posts</span></span>
              <span><strong className="text-[#EDEDED]">{userData.followers}</strong> <span className="text-[#9B9B9B]">followers</span></span>
              <span><strong className="text-[#EDEDED]">{userData.following}</strong> <span className="text-[#9B9B9B]">following</span></span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-[#1F1F23] text-[#9B9B9B] bg-[#111113]">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        <p className="text-[#EDEDED] text-sm mb-4">{userData.bio}</p>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#111113] rounded-xl">
            <TabsTrigger value="posts" className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <Grid3X3 className="h-3 w-3 mr-1" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="listings" className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <ShoppingBag className="h-3 w-3 mr-1" />
              Listings
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <Heart className="h-3 w-3 mr-1" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="reading" className="rounded-lg text-xs data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
              <BookOpen className="h-3 w-3 mr-1" />
              Reading
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-4 py-4">
        <Tabs value={activeTab} className="w-full">
          {/* Posts & Media Tab */}
          <TabsContent value="posts" className="mt-0">
            <div className="space-y-0">
              {userPosts.map(renderPost)}
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {userListings.map(renderListing)}
            </div>
          </TabsContent>

          {/* Wishlist & Saved Items Tab */}
          <TabsContent value="wishlist" className="mt-0">
            <div className="space-y-3">
              {wishlistItems.map(renderWishlistItem)}
            </div>
          </TabsContent>

          {/* Reading Interests Tab */}
          <TabsContent value="reading" className="mt-0">
            <div className="space-y-6">
              {/* Currently Reading */}
              <div>
                <h3 className="font-semibold text-[#EDEDED] mb-3">Currently Reading</h3>
                {readingInterests.currentlyReading.map((book, index) => (
                  <div key={index} className="bg-[#111113] rounded-lg p-3 clean-card">
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-[#EDEDED] text-sm">{book.title}</h4>
                        <p className="text-[#9B9B9B] text-xs mb-2">{book.author}</p>
                        <div className="w-full bg-[#1F1F23] rounded-full h-2">
                          <div 
                            className="bg-[#E60023] h-2 rounded-full" 
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-[#9B9B9B] mt-1">{book.progress}% complete</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reading Goals */}
              <div>
                <h3 className="font-semibold text-[#EDEDED] mb-3">2024 Reading Goal</h3>
                <div className="bg-[#111113] rounded-lg p-3 clean-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#EDEDED] font-medium">{readingInterests.readingGoals.completed} of {readingInterests.readingGoals.yearly} books</span>
                    <Badge className="bg-[#E60023] text-white border-0">
                      {Math.round((readingInterests.readingGoals.completed / readingInterests.readingGoals.yearly) * 100)}%
                    </Badge>
                  </div>
                  <div className="w-full bg-[#1F1F23] rounded-full h-2">
                    <div 
                      className="bg-[#E60023] h-2 rounded-full" 
                      style={{ width: `${(readingInterests.readingGoals.completed / readingInterests.readingGoals.yearly) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Favorite Genres */}
              <div>
                <h3 className="font-semibold text-[#EDEDED] mb-3">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {readingInterests.favoriteGenres.map((genre, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#E60023]/10 text-[#E60023] border-0">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Favorite Authors */}
              <div>
                <h3 className="font-semibold text-[#EDEDED] mb-3">Favorite Authors</h3>
                <div className="space-y-2">
                  {readingInterests.favoriteAuthors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#E60023]" />
                      <span className="text-[#EDEDED] text-sm">{author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}