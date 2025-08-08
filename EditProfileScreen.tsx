import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Video, 
  Image as ImageIcon, 
  Settings, 
  Edit3, 
  Plus, 
  X, 
  Upload, 
  BookOpen,
  Sparkles,
  Music,
  Filter,
  Scissors,
  Type,
  Palette,
  Save,
  Eye,
  EyeOff,
  Globe,
  Users,
  Lock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface EditProfileScreenProps {
  onBack: () => void;
}

export function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showReelCreator, setShowReelCreator] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: 'Jane Doe',
    username: 'janedoe_reads',
    bio: 'Avid reader • Book reviewer • Always seeking new stories',
    website: 'janereadsbooks.com',
    isPrivate: false,
    allowMessages: true,
    showActivity: true,
    showFavoriteGenres: true
  });

  const [reelData, setReelData] = useState({
    title: '',
    description: '',
    selectedMusic: null,
    selectedFilter: 'none',
    duration: 15
  });

  const recentPhotos = [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150',
    'https://images.unsplash.com/photo-1618329541374-82b9e7e6dfbe?w=150',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150'
  ];

  const musicOptions = [
    { id: 1, title: 'Enchanted Forest', artist: 'Mystic Sounds', duration: '2:45' },
    { id: 2, title: 'Starlight Reading', artist: 'Cosmic Beats', duration: '3:12' },
    { id: 3, title: 'Page Turner', artist: 'Bookish Vibes', duration: '2:28' },
    { id: 4, title: 'Literary Dreams', artist: 'Novel Notes', duration: '3:05' }
  ];

  const filterOptions = [
    { id: 'none', name: 'Original', preview: 'bg-gradient-to-r from-[#1e1b2e] to-[#2d1b69]' },
    { id: 'cosmic', name: 'Cosmic', preview: 'bg-gradient-to-r from-[#418579] to-[#8b5cf6]' },
    { id: 'mystical', name: 'Mystical', preview: 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]' },
    { id: 'stellar', name: 'Stellar', preview: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]' },
    { id: 'aurora', name: 'Aurora', preview: 'bg-gradient-to-r from-[#10b981] to-[#418579]' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log('Saving profile:', profileData);
    onBack();
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-[#418579]/30 shadow-xl electric-glow">
                <AvatarImage src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center" />
                <AvatarFallback className="bg-gradient-to-r from-[#418579] to-[#8b5cf6] text-white text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#418579] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#a855f7] text-white shadow-lg electric-glow"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#f8fafc] mb-1">Profile Photo</h3>
              <p className="text-sm text-[#c2c2d6] mb-3">Choose a profile picture that represents you</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-[#483d8b] text-[#c2c2d6] hover:bg-[#2d1b69] hover:text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button size="sm" variant="outline" className="border-[#483d8b] text-[#c2c2d6] hover:bg-[#2d1b69] hover:text-white">
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-medium text-[#f8fafc] mb-4">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-[#c2c2d6]">Display Name</Label>
            <Input
              id="displayName"
              value={profileData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#c2c2d6]">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#c2c2d6]">@</span>
              <Input
                id="username"
                value={profileData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579] pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-[#c2c2d6]">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579] min-h-[80px]"
              placeholder="Tell people about yourself..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-[#c2c2d6]">Website</Label>
            <Input
              id="website"
              value={profileData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579]"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-medium text-[#f8fafc] mb-4">Privacy & Visibility</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#418579] to-[#8b5cf6] flex items-center justify-center electric-glow">
                {profileData.isPrivate ? <Lock className="h-5 w-5 text-white" /> : <Globe className="h-5 w-5 text-white" />}
              </div>
              <div>
                <p className="font-medium text-[#f8fafc]">Private Account</p>
                <p className="text-sm text-[#c2c2d6]">Only followers can see your posts</p>
              </div>
            </div>
            <Switch
              checked={profileData.isPrivate}
              onCheckedChange={(checked) => handleInputChange('isPrivate', checked)}
              className="data-[state=checked]:bg-[#418579]"
            />
          </div>

          <Separator className="bg-[#483d8b]/30" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] flex items-center justify-center mystic-glow">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-[#f8fafc]">Allow Messages</p>
                <p className="text-sm text-[#c2c2d6]">Let others send you direct messages</p>
              </div>
            </div>
            <Switch
              checked={profileData.allowMessages}
              onCheckedChange={(checked) => handleInputChange('allowMessages', checked)}
              className="data-[state=checked]:bg-[#418579]"
            />
          </div>

          <Separator className="bg-[#483d8b]/30" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] flex items-center justify-center stellar-glow">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-[#f8fafc]">Show Activity</p>
                <p className="text-sm text-[#c2c2d6]">Display when you're online</p>
              </div>
            </div>
            <Switch
              checked={profileData.showActivity}
              onCheckedChange={(checked) => handleInputChange('showActivity', checked)}
              className="data-[state=checked]:bg-[#418579]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      {/* Content Creation Options */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowReelCreator(true)}
        >
          <Card className="bg-gradient-to-r from-[#418579] to-[#8b5cf6] border-0 rounded-2xl cosmic-card cursor-pointer overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium text-white mb-1">Create Reel</h3>
              <p className="text-xs text-white/80">Share book reviews & moments</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] border-0 rounded-2xl cosmic-card cursor-pointer overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium text-white mb-1">Photo Post</h3>
              <p className="text-xs text-white/80">Share your latest read</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Photos */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#f8fafc]">Recent Photos</h3>
            <Button size="sm" variant="outline" className="border-[#483d8b] text-[#c2c2d6] hover:bg-[#2d1b69] hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recentPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-[#483d8b]/30 hover:border-[#418579]/30 transition-colors group cursor-pointer">
                <ImageWithFallback
                  src={photo}
                  alt={`Recent photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Edit3 className="h-3 w-3 text-white" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Stats */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <h3 className="font-medium text-[#f8fafc] mb-4">Content Performance</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#418579] mb-1">127</div>
              <div className="text-sm text-[#c2c2d6]">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8b5cf6] mb-1">2.3k</div>
              <div className="text-sm text-[#c2c2d6]">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fbbf24] mb-1">45</div>
              <div className="text-sm text-[#c2c2d6]">Reels</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReelCreator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Video Preview Area */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <div className="aspect-[9/16] bg-gradient-to-br from-[#2d1b69] to-[#0a0012] rounded-2xl border border-[#483d8b]/30 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#418579] to-[#8b5cf6] flex items-center justify-center mx-auto mb-4 electric-glow">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-medium text-[#f8fafc] mb-2">Create Your Book Reel</h3>
              <p className="text-sm text-[#c2c2d6] mb-4">Share your favorite book moments</p>
              <Button className="bg-gradient-to-r from-[#418579] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#a855f7] text-white rounded-xl">
                <Camera className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </div>
            
            {/* Floating sparkles */}
            {Array.from({ length: 5 }, (_, i) => (
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
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${15 + i * 20}%`,
                }}
              >
                <Sparkles className="h-4 w-4 text-[#418579] cosmic-sparkle" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reel Details */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-medium text-[#f8fafc]">Reel Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="reelTitle" className="text-[#c2c2d6]">Title</Label>
            <Input
              id="reelTitle"
              value={reelData.title}
              onChange={(e) => setReelData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579]"
              placeholder="Give your reel a catchy title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reelDescription" className="text-[#c2c2d6]">Description</Label>
            <Textarea
              id="reelDescription"
              value={reelData.description}
              onChange={(e) => setReelData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-[#2d1b69]/50 border-[#483d8b]/50 text-[#f8fafc] focus:border-[#418579] focus:ring-[#418579] min-h-[80px]"
              placeholder="Describe your reel... #BookTok #Reading #BookReview"
            />
          </div>
        </CardContent>
      </Card>

      {/* Music Selection */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#f97316] flex items-center justify-center nebula-glow">
              <Music className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-medium text-[#f8fafc]">Add Music</h3>
          </div>
          
          <div className="space-y-3">
            {musicOptions.map((music) => (
              <div
                key={music.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#2d1b69]/30 border border-[#483d8b]/30 hover:border-[#418579]/30 transition-colors cursor-pointer"
                onClick={() => setReelData(prev => ({ ...prev, selectedMusic: music.id }))}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  reelData.selectedMusic === music.id 
                    ? 'bg-gradient-to-r from-[#418579] to-[#8b5cf6] electric-glow' 
                    : 'bg-[#483d8b]/50'
                }`}>
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#f8fafc]">{music.title}</p>
                  <p className="text-sm text-[#c2c2d6]">{music.artist} • {music.duration}</p>
                </div>
                {reelData.selectedMusic === music.id && (
                  <div className="w-5 h-5 rounded-full bg-[#418579] flex items-center justify-center electric-glow">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] flex items-center justify-center stellar-glow">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-medium text-[#f8fafc]">Filters</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {filterOptions.map((filter) => (
              <div
                key={filter.id}
                className={`aspect-square rounded-xl ${filter.preview} border-2 cursor-pointer transition-all ${
                  reelData.selectedFilter === filter.id 
                    ? 'border-[#418579] electric-glow' 
                    : 'border-[#483d8b]/30 hover:border-[#418579]/50'
                }`}
                onClick={() => setReelData(prev => ({ ...prev, selectedFilter: filter.id }))}
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  <Palette className="h-6 w-6 mb-2" />
                  <span className="text-xs font-medium">{filter.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editing Tools */}
      <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 rounded-2xl cosmic-card">
        <CardContent className="p-6">
          <h3 className="font-medium text-[#f8fafc] mb-4">Editing Tools</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#2d1b69]/50 border border-[#483d8b]/30 hover:bg-[#418579]/20 hover:border-[#418579]/50 text-[#c2c2d6] hover:text-white">
              <Scissors className="h-5 w-5" />
              <span className="text-xs">Trim</span>
            </Button>
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#2d1b69]/50 border border-[#483d8b]/30 hover:bg-[#418579]/20 hover:border-[#418579]/50 text-[#c2c2d6] hover:text-white">
              <Type className="h-5 w-5" />
              <span className="text-xs">Text</span>
            </Button>
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#2d1b69]/50 border border-[#483d8b]/30 hover:bg-[#418579]/20 hover:border-[#418579]/50 text-[#c2c2d6] hover:text-white">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs">Effects</span>
            </Button>
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#2d1b69]/50 border border-[#483d8b]/30 hover:bg-[#418579]/20 hover:border-[#418579]/50 text-[#c2c2d6] hover:text-white">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Books</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0a0012] via-[#1e1b2e] to-[#2d1b69]">
      {/* Header */}
      <div className="bg-[#0a0012]/95 backdrop-blur-xl border-b border-[#418579]/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={showReelCreator ? () => setShowReelCreator(false) : onBack}
              className="text-[#c2c2d6] hover:text-white hover:bg-[#483d8b]/50 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-[#f8fafc]">
              {showReelCreator ? 'Create Reel' : 'Edit Profile'}
            </h1>
          </div>
          
          {!showReelCreator ? (
            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#418579] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#a855f7] text-white rounded-xl px-6 shadow-lg electric-glow"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-[#418579] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#a855f7] text-white rounded-xl px-6 shadow-lg electric-glow"
            >
              <Upload className="h-4 w-4 mr-2" />
              Post
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {showReelCreator ? (
            <motion.div
              key="reel-creator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderReelCreator()}
            </motion.div>
          ) : (
            <motion.div
              key="edit-profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1e1b2e]/80 border border-[#483d8b]/30 rounded-2xl p-1 mb-6">
                  <TabsTrigger 
                    value="profile"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#418579] data-[state=active]:to-[#8b5cf6] data-[state=active]:text-white text-[#c2c2d6] transition-all"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#418579] data-[state=active]:to-[#8b5cf6] data-[state=active]:text-white text-[#c2c2d6] transition-all"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-0">
                  {renderProfileTab()}
                </TabsContent>

                <TabsContent value="content" className="mt-0">
                  {renderContentTab()}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}