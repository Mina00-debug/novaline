import React, { useState } from 'react';
import { Filter, Heart, Zap, Bookmark, Star, TrendingUp, Download, Eye, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LibraryCat } from './LibraryCat';

const mockBooks = {
  currentlyReading: [
    {
      id: 1,
      title: 'The Atlas Six',
      author: 'Olivie Blake',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      progress: 65,
      tags: ['Dark Academia', 'Magic'],
      rating: 4.5,
      hasQuit: false
    },
    {
      id: 2,
      title: 'Beach Read',
      author: 'Emily Henry',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
      progress: 30,
      tags: ['Romance', 'Contemporary'],
      rating: 4.0,
      hasQuit: false
    }
  ],
  tbr: [
    {
      id: 3,
      title: 'Red Queen',
      author: 'Victoria Aveyard',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      tags: ['Dystopian', 'YA'],
      addedDate: '2024-01-15'
    },
    {
      id: 4,
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300',
      tags: ['Mythology', 'LGBTQ+'],
      addedDate: '2024-01-20'
    }
  ],
  completed: [
    {
      id: 5,
      title: 'They Both Die at the End',
      author: 'Adam Silvera',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300',
      tags: ['YA', 'Contemporary'],
      rating: 5.0,
      completedDate: '2024-01-10'
    }
  ],
  freeBooks: [
    {
      id: 6,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      tags: ['Classic', 'Romance'],
      fileSize: '2.4 MB',
      downloads: 12549,
      format: 'PDF',
      description: 'A timeless classic exploring love, society, and first impressions in Regency England.'
    },
    {
      id: 7,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
      tags: ['Classic', 'Drama'],
      fileSize: '1.8 MB',
      downloads: 8932,
      format: 'PDF',
      description: 'A masterpiece capturing the Jazz Age and the American Dream.'
    },
    {
      id: 8,
      title: 'Alice in Wonderland',
      author: 'Lewis Carroll',
      cover: 'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=300',
      tags: ['Fantasy', 'Children'],
      fileSize: '3.1 MB',
      downloads: 15623,
      format: 'PDF',
      description: 'A whimsical journey through a magical wonderland full of curious characters.'
    },
    {
      id: 9,
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300',
      tags: ['Classic', 'Gothic'],
      fileSize: '2.7 MB',
      downloads: 6741,
      format: 'PDF',
      description: 'A dark tale of beauty, corruption, and the price of vanity.'
    },
    {
      id: 10,
      title: 'Frankenstein',
      author: 'Mary Shelley',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
      tags: ['Gothic', 'Sci-Fi'],
      fileSize: '2.2 MB',
      downloads: 9876,
      format: 'PDF',
      description: 'The original science fiction novel about creation and responsibility.'
    },
    {
      id: 11,
      title: 'Little Women',
      author: 'Louisa May Alcott',
      cover: 'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=300',
      tags: ['Classic', 'Family'],
      fileSize: '3.5 MB',
      downloads: 11234,
      format: 'PDF',
      description: 'The heartwarming story of the March sisters growing up during the Civil War.'
    }
  ]
};

export function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('currently-reading');
  const [books, setBooks] = useState(mockBooks);

  const updateBookProgress = (bookId: number, newProgress: number) => {
    setBooks(prev => ({
      ...prev,
      currentlyReading: prev.currentlyReading.map(book => 
        book.id === bookId ? { ...book, progress: newProgress, hasQuit: false } : book
      )
    }));
  };

  const quitReading = (bookId: number) => {
    setBooks(prev => ({
      ...prev,
      currentlyReading: prev.currentlyReading.map(book => 
        book.id === bookId ? { ...book, hasQuit: true } : book
      )
    }));
  };

  const downloadBook = (bookId: number, title: string) => {
    // Simulate download functionality
    alert(`Downloading "${title}" PDF...`);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-[#E60023] fill-current' : 'text-[#E0E0E0]'}`} 
          />
        ))}
        <span className="text-xs text-[#7D7D7D] ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Clean Header - Mobile Optimized */}
      <div className="bg-white border-b border-[#E0E0E0] p-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#111111] mb-1">My Library</h1>
            <p className="text-[#7D7D7D] text-sm">Track your reading journey</p>
          </div>
          <Button variant="outline" size="sm" className="border-[#E60023] text-[#E60023] hover:bg-[#E60023] hover:text-white rounded-xl touch-target">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        {/* Reading Stats - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#FAFAFA] rounded-xl p-3 text-center border border-[#E0E0E0] clean-card">
            <div className="text-lg font-bold text-[#111111] mb-1">24</div>
            <div className="text-xs text-[#7D7D7D]">This Year</div>
          </div>
          <div className="bg-[#FAFAFA] rounded-xl p-3 text-center border border-[#E0E0E0] clean-card">
            <div className="text-lg font-bold text-[#111111] mb-1">2</div>
            <div className="text-xs text-[#7D7D7D]">In Progress</div>
          </div>
          <div className="bg-[#FAFAFA] rounded-xl p-3 text-center border border-[#E0E0E0] clean-card">
            <div className="text-lg font-bold text-[#111111] mb-1">127</div>
            <div className="text-xs text-[#7D7D7D]">All Time</div>
          </div>
        </div>
      </div>

      {/* Library Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-3 mt-3 bg-[#FAFAFA] rounded-xl p-1 border border-[#E0E0E0]">
            <TabsTrigger value="currently-reading" className="text-xs text-[#7D7D7D] data-[state=active]:bg-[#E60023] data-[state=active]:text-white rounded-lg transition-all touch-target">
              Reading
            </TabsTrigger>
            <TabsTrigger value="tbr" className="text-xs text-[#7D7D7D] data-[state=active]:bg-[#E60023] data-[state=active]:text-white rounded-lg transition-all touch-target">
              To Read
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs text-[#7D7D7D] data-[state=active]:bg-[#E60023] data-[state=active]:text-white rounded-lg transition-all touch-target">
              Done
            </TabsTrigger>
            <TabsTrigger value="free-books" className="text-xs text-[#7D7D7D] data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all touch-target">
              Free
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-3 mobile-scroll">
            <TabsContent value="currently-reading" className="space-y-3 mt-0">
              {books.currentlyReading.map((book) => (
                <Card key={book.id} className="bg-white border border-[#E0E0E0] clean-shadow rounded-xl clean-card">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-[#E0E0E0]">
                        <ImageWithFallback 
                          src={book.cover} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#111111] mb-1 text-sm">{book.title}</h3>
                        <p className="text-[#7D7D7D] mb-2 text-xs">{book.author}</p>
                        
                        {/* Clean Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#7D7D7D]">Progress</span>
                            <span className="text-[#111111] font-medium">{book.progress}%</span>
                          </div>
                          <div className="w-full bg-[#FAFAFA] rounded-full h-1.5 overflow-hidden border border-[#E0E0E0]">
                            <div 
                              className="bg-[#E60023] h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {book.tags.map((tag) => (
                            <Badge key={tag} className="bg-[#FAFAFA] text-[#7D7D7D] border border-[#E0E0E0] rounded-full text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {renderStarRating(book.rating)}

                        {/* Action Buttons - Mobile Optimized */}
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            onClick={() => updateBookProgress(book.id, Math.min(100, book.progress + 10))}
                            className="bg-[#E60023] hover:bg-[#D50020] text-white rounded-lg hover:scale-105 transition-all text-xs flex-1 touch-target"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => quitReading(book.id)}
                            className="border-[#E60023] text-[#E60023] hover:bg-[#E60023] hover:text-white rounded-lg hover:scale-105 transition-all text-xs touch-target"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Cat Companion - Smaller for mobile */}
                      <div className="flex-shrink-0 opacity-75 self-start">
                        <div className="scale-75">
                          <LibraryCat 
                            bookProgress={book.progress}
                            bookTitle={book.title}
                            hasQuitReading={book.hasQuit}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tbr" className="grid grid-cols-2 gap-2 mt-0">
              {books.tbr.map((book) => (
                <Card key={book.id} className="bg-white border border-[#E0E0E0] clean-shadow rounded-xl clean-card hover:scale-[1.02] transition-transform">
                  <CardContent className="p-3">
                    <div className="aspect-[3/4] mb-3 rounded-lg overflow-hidden border border-[#E0E0E0]">
                      <ImageWithFallback 
                        src={book.cover} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-[#111111] mb-1 truncate text-sm">{book.title}</h3>
                    <p className="text-xs text-[#7D7D7D] mb-2">{book.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {book.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} className="bg-[#FAFAFA] text-[#7D7D7D] border border-[#E0E0E0] rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#7D7D7D]">Added {new Date(book.addedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                      <Bookmark className="h-3 w-3 text-[#E60023]" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="grid grid-cols-2 gap-2 mt-0">
              {books.completed.map((book) => (
                <Card key={book.id} className="bg-white border border-[#E0E0E0] clean-shadow rounded-xl clean-card">
                  <CardContent className="p-3">
                    <div className="aspect-[3/4] mb-3 rounded-lg overflow-hidden border border-[#E0E0E0]">
                      <ImageWithFallback 
                        src={book.cover} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-[#111111] mb-1 truncate text-sm">{book.title}</h3>
                    <p className="text-xs text-[#7D7D7D] mb-2">{book.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {book.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} className="bg-[#FAFAFA] text-[#7D7D7D] border border-[#E0E0E0] rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mb-2">
                      {renderStarRating(book.rating)}
                    </div>
                    
                    <div>
                      <span className="text-xs text-[#7D7D7D]">Done {new Date(book.completedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="free-books" className="grid grid-cols-1 gap-3 mt-0">
              <div className="mb-3">
                <h2 className="text-base font-semibold text-[#111111] mb-1">Free Classic Books</h2>
                <p className="text-[#7D7D7D] text-xs">Download these timeless classics for free in PDF format</p>
              </div>
              
              {books.freeBooks.map((book) => (
                <Card key={book.id} className="bg-white border border-green-500/30 clean-shadow rounded-xl clean-card hover:border-green-500/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-green-500/20">
                        <ImageWithFallback 
                          src={book.cover} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#111111] mb-1 text-sm">{book.title}</h3>
                        <p className="text-[#7D7D7D] mb-2 text-xs">{book.author}</p>
                        <p className="text-xs text-[#7D7D7D] mb-2 leading-relaxed line-clamp-2">{book.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {book.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} className="bg-green-500/20 text-green-600 border border-green-500/30 rounded-full text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* File Info */}
                        <div className="flex items-center gap-2 mb-3 text-xs text-[#7D7D7D]">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {book.downloads > 999 ? `${Math.floor(book.downloads/1000)}k` : book.downloads}
                          </span>
                          <span>{book.fileSize}</span>
                          <Badge className="bg-[#E60023]/20 text-[#E60023] border border-[#E60023]/30 text-xs">
                            {book.format}
                          </Badge>
                        </div>

                        {/* Download Button */}
                        <Button 
                          size="sm" 
                          onClick={() => downloadBook(book.id, book.title)}
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg hover:scale-105 transition-all text-xs touch-target w-full"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}