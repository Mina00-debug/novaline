import React, { useState } from 'react';
import { X, MessageSquare, Image, ShoppingBag, AlertTriangle, BookOpen, Tag, Camera, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostCreationModal({ isOpen, onClose }: PostCreationModalProps) {
  const [mode, setMode] = useState<'post' | 'listing'>('post');
  const [postType, setPostType] = useState<'discussion' | 'visual'>('discussion');
  const [listingType, setListingType] = useState<'swap' | 'indie' | 'merch'>('swap');
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');

  if (!isOpen) return null;

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Submitting:', { mode, postType, listingType, title, content, tags, selectedBook, price, condition, hasSpoilers });
    onClose();
    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
    setSelectedBook('');
    setPrice('');
    setCondition('');
    setHasSpoilers(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0B0C] border border-[#1F1F23] rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1F1F23]">
          <h2 className="font-semibold text-[#EDEDED]">Create New</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="p-0">
            <X className="h-5 w-5 text-[#9B9B9B]" />
          </Button>
        </div>

        {/* Mode Selection */}
        <div className="p-4 border-b border-[#1F1F23]">
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'post' | 'listing')}>
            <TabsList className="grid w-full grid-cols-2 bg-[#111113] rounded-xl">
              <TabsTrigger value="post" className="rounded-lg text-sm data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Create Post
              </TabsTrigger>
              <TabsTrigger value="listing" className="rounded-lg text-sm data-[state=active]:bg-[#E60023] data-[state=active]:text-white">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Create Listing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {mode === 'post' ? (
            <div className="space-y-4">
              {/* Post Type Selection */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Post Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={postType === 'discussion' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPostType('discussion')}
                    className={`justify-start ${
                      postType === 'discussion' 
                        ? 'bg-[#E60023] text-white' 
                        : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussion
                  </Button>
                  <Button
                    variant={postType === 'visual' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPostType('visual')}
                    className={`justify-start ${
                      postType === 'visual' 
                        ? 'bg-[#E60023] text-white' 
                        : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
                    }`}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Visual Media
                  </Button>
                </div>
              </div>

              {/* Book/Fandom Selection */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Book/Series</label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger className="bg-[#111113] border-[#1F1F23] text-[#EDEDED]">
                    <SelectValue placeholder="Select a book or series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fourth-wing">Fourth Wing</SelectItem>
                    <SelectItem value="iron-flame">Iron Flame</SelectItem>
                    <SelectItem value="acotar">A Court of Thorns and Roses</SelectItem>
                    <SelectItem value="throne-of-glass">Throne of Glass</SelectItem>
                    <SelectItem value="crescent-city">Crescent City</SelectItem>
                    <SelectItem value="general">General Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your theory or discussion topic?"
                  className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">
                  {postType === 'discussion' ? 'Description' : 'Caption'}
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={postType === 'discussion' 
                    ? "Share your theory, thoughts, or start a discussion..." 
                    : "Add a caption to your visual content..."}
                  className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B] min-h-[100px] resize-none"
                />
              </div>

              {/* Visual Media Upload */}
              {postType === 'visual' && (
                <div>
                  <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Media</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="border-[#1F1F23] text-[#9B9B9B] bg-[#111113] justify-start">
                      <Image className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#1F1F23] text-[#9B9B9B] bg-[#111113] justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#1F1F23] text-[#9B9B9B] bg-[#111113] justify-start">
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                  </div>
                </div>
              )}

              {/* Spoiler Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#E60023]" />
                  <label className="text-sm font-medium text-[#EDEDED]">Contains Spoilers</label>
                </div>
                <Switch checked={hasSpoilers} onCheckedChange={setHasSpoilers} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Listing Type Selection */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Listing Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={listingType === 'swap' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setListingType('swap')}
                    className={`justify-center text-xs ${
                      listingType === 'swap' 
                        ? 'bg-[#E60023] text-white' 
                        : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
                    }`}
                  >
                    Book Swap
                  </Button>
                  <Button
                    variant={listingType === 'indie' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setListingType('indie')}
                    className={`justify-center text-xs ${
                      listingType === 'indie' 
                        ? 'bg-[#E60023] text-white' 
                        : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
                    }`}
                  >
                    Indie Book
                  </Button>
                  <Button
                    variant={listingType === 'merch' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setListingType('merch')}
                    className={`justify-center text-xs ${
                      listingType === 'merch' 
                        ? 'bg-[#E60023] text-white' 
                        : 'border-[#1F1F23] text-[#9B9B9B] bg-[#111113]'
                    }`}
                  >
                    Merch Item
                  </Button>
                </div>
              </div>

              {/* Item Title */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">
                  {listingType === 'swap' ? 'Book Title' : listingType === 'indie' ? 'Book Title' : 'Item Name'}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={listingType === 'swap' || listingType === 'indie' 
                    ? "Enter the book title" 
                    : "What are you selling?"}
                  className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">
                  {listingType === 'swap' ? 'Trade Value (Optional)' : 'Price'}
                </label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={listingType === 'swap' ? "$0.00 or trade only" : "$0.00"}
                  className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B]"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Condition</label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="bg-[#111113] border-[#1F1F23] text-[#EDEDED]">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="very-good">Very Good</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="acceptable">Acceptable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Description</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your item, any damage, what you're looking to trade for..."
                  className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B] min-h-[100px] resize-none"
                />
              </div>

              {/* Photos */}
              <div>
                <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Photos</label>
                <Button variant="outline" className="w-full border-[#1F1F23] text-[#9B9B9B] bg-[#111113] justify-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photos
                </Button>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-4">
            <label className="text-sm font-medium text-[#EDEDED] mb-2 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-[#111113] border-[#1F1F23] text-[#EDEDED] placeholder:text-[#9B9B9B] text-sm"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} size="sm" className="bg-[#E60023] text-white">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[#E60023]/10 text-[#E60023] border-0 text-xs cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  #{tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F1F23] flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1 border-[#1F1F23] text-[#9B9B9B] bg-[#111113]">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-[#E60023] text-white">
            {mode === 'post' ? 'Post' : 'List Item'}
          </Button>
        </div>
      </div>
    </div>
  );
}