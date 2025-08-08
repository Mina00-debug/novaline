import React, { useState } from 'react';
import { ArrowLeft, Upload, Eye, EyeOff, TrendingUp, DollarSign, Image, Bomb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const theoryTags = ['Spoilers', 'Tropes', 'Plot Twist', 'Character Analysis', 'Foreshadowing', 'Easter Eggs', 'Red Herrings', 'Ship Theory'];

export function BookNukeScreen({ onBack }: { onBack: () => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState('free');
  const [bookName, setBookName] = useState('');
  const [nukeTitle, setNukeTitle] = useState('');
  const [theory, setTheory] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0012] via-[#1e1b2e] to-[#2d1b69]">
      {/* Header */}
      <div className="bg-[#0a0012]/95 backdrop-blur-xl border-b border-[#00d4ff]/20 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-[#c2c2d6] hover:text-[#f8fafc] hover:bg-[#2d1b69]/50 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#ef4444] flex items-center justify-center shadow-lg nebula-glow">
              <Bomb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-medium bg-gradient-to-r from-[#ec4899] to-[#ef4444] bg-clip-text text-transparent">Drop a Nuke 💣</h1>
              <p className="text-sm text-[#c2c2d6]">Share your wildest book theories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Book Name */}
        <div>
          <Label className="text-[#f8fafc] mb-2 block">Book Name</Label>
          <Input 
            placeholder="Which book is about to get nuked?"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="bg-[#2d1b69]/60 border-[#483d8b]/50 text-[#f8fafc] placeholder-[#c2c2d6] rounded-xl focus:border-[#00d4ff]/60 focus:electric-glow"
          />
        </div>

        {/* Nuke Title */}
        <div>
          <Label className="text-[#f8fafc] mb-2 block">Nuke Title</Label>
          <Input 
            placeholder="Give your theory a conspiracy-worthy title..."
            value={nukeTitle}
            onChange={(e) => setNukeTitle(e.target.value)}
            className="bg-[#2d1b69]/60 border-[#483d8b]/50 text-[#f8fafc] placeholder-[#c2c2d6] rounded-xl focus:border-[#00d4ff]/60 focus:electric-glow"
          />
        </div>

        {/* Theory Content */}
        <div>
          <Label className="text-[#f8fafc] mb-2 block">Theory</Label>
          <Textarea 
            placeholder="Connect the dots... What's your evidence? What are you theorizing? Spill the tea! ☕"
            value={theory}
            onChange={(e) => setTheory(e.target.value)}
            rows={6}
            className="bg-[#2d1b69]/60 border-[#483d8b]/50 text-[#f8fafc] placeholder-[#c2c2d6] resize-none rounded-xl focus:border-[#00d4ff]/60 focus:electric-glow"
          />
        </div>

        {/* Tags */}
        <div>
          <Label className="text-[#f8fafc] mb-3 block">Tags</Label>
          <div className="flex flex-wrap gap-2">
            {theoryTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-[#ec4899] to-[#ef4444] text-white border-transparent shadow-lg nebula-glow'
                    : 'border-[#483d8b]/50 text-[#c2c2d6] hover:bg-[#2d1b69]/50 hover:border-[#00d4ff]/30 hover:text-[#f8fafc]'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 cosmic-card">
          <CardContent className="p-4">
            <Label className="text-[#f8fafc] mb-3 block">Evidence & Red Strings</Label>
            <div className="border-2 border-dashed border-[#00d4ff]/30 rounded-xl p-6 text-center hover:border-[#00d4ff]/50 transition-colors">
              <Upload className="h-8 w-8 text-[#00d4ff] mx-auto mb-2 electric-glow" />
              <p className="text-[#c2c2d6] text-sm mb-2">Upload screenshots, charts, or conspiracy boards</p>
              <Button variant="outline" size="sm" className="border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:electric-glow">
                <Image className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visibility Settings */}
        <Card className="bg-[#1e1b2e]/80 backdrop-blur-sm border-[#483d8b]/30 cosmic-card">
          <CardContent className="p-4 space-y-4">
            <Label className="text-[#f8fafc]">Visibility & Access</Label>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-[#10b981] aurora-glow" />
                  <Label className="text-sm text-[#f8fafc]">Free Access</Label>
                </div>
                <Switch 
                  checked={visibility === 'free'} 
                  onCheckedChange={() => setVisibility('free')}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00d4ff] data-[state=checked]:to-[#8b5cf6]"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-[#fbbf24] stellar-glow" />
                  <Label className="text-sm text-[#f8fafc]">Early Access (Followers)</Label>
                </div>
                <Switch 
                  checked={visibility === 'early'} 
                  onCheckedChange={() => setVisibility('early')}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00d4ff] data-[state=checked]:to-[#8b5cf6]"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <EyeOff className="h-4 w-4 text-[#ef4444]" />
                  <Label className="text-sm text-[#f8fafc]">Private (Just Me)</Label>
                </div>
                <Switch 
                  checked={visibility === 'private'} 
                  onCheckedChange={() => setVisibility('private')}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00d4ff] data-[state=checked]:to-[#8b5cf6]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            className="flex-1 bg-gradient-to-r from-[#ec4899] to-[#ef4444] hover:from-[#be185d] hover:to-[#dc2626] text-white shadow-lg nebula-glow hover:scale-105 transition-all"
            disabled={!bookName || !nukeTitle || !theory}
          >
            💣 Drop the Nuke
          </Button>
          <Button variant="outline" className="border-[#fbbf24]/50 text-[#fbbf24] hover:bg-[#fbbf24]/10 hover:stellar-glow">
            <DollarSign className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-[#c2c2d6]">
            By posting, you agree that your theory might blow readers' minds 🤯
          </p>
        </div>
      </div>
    </div>
  );
}