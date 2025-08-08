import React, { useState } from 'react';
import { Home, Search, Store, User, Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { HomeFeedScreen } from './components/HomeFeedScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { SwapShelfScreen } from './components/SwapShelfScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PostCreationModal } from './components/PostCreationModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [showPostModal, setShowPostModal] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeFeedScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'shop':
        return <SwapShelfScreen />;
      case 'profile':
        return <ProfileScreen onNavigateToSettings={() => setActiveScreen('settings')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setActiveScreen('profile')} />;
      default:
        return <HomeFeedScreen />;
    }
  };

  const shouldShowBottomNav = activeScreen !== 'settings';
  const shouldShowFAB = activeScreen !== 'settings';

  return (
    <div className="w-full max-w-[393px] h-screen max-h-[852px] mx-auto bg-[#0B0B0C] flex flex-col relative overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Floating Action Button - Mobile Optimized */}
      {shouldShowFAB && (
        <Button
          onClick={() => setShowPostModal(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-[#E60023] hover:bg-[#D50020] clean-shadow z-50 border-0 transition-all duration-300 hover:scale-105 pulse-clean"
          size="sm"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      )}

      {/* Bottom Navigation - Mobile Optimized */}
      {shouldShowBottomNav && (
        <div className="bg-[#0B0B0C]/95 backdrop-blur-xl border-t border-[#1F1F23] px-2 py-2 safe-area-bottom">
          <div className="flex justify-between items-center w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                activeScreen === 'home' 
                  ? 'bg-[#E60023] text-white clean-shadow' 
                  : 'text-[#9B9B9B] hover:text-[#EDEDED] hover:bg-[#111113]'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="text-xs font-medium">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveScreen('explore')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                activeScreen === 'explore' 
                  ? 'bg-[#E60023] text-white clean-shadow' 
                  : 'text-[#9B9B9B] hover:text-[#EDEDED] hover:bg-[#111113]'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="text-xs font-medium">Explore</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveScreen('shop')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                activeScreen === 'shop' 
                  ? 'bg-[#E60023] text-white clean-shadow' 
                  : 'text-[#9B9B9B] hover:text-[#EDEDED] hover:bg-[#111113]'
              }`}
            >
              <Store className="h-4 w-4" />
              <span className="text-xs font-medium">Shop</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveScreen('profile')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                activeScreen === 'profile' 
                  ? 'bg-[#E60023] text-white clean-shadow' 
                  : 'text-[#9B9B9B] hover:text-[#EDEDED] hover:bg-[#111113]'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-xs font-medium">Profile</span>
            </Button>
          </div>
        </div>
      )}

      {/* Post Creation Modal */}
      <PostCreationModal 
        isOpen={showPostModal} 
        onClose={() => setShowPostModal(false)} 
      />
    </div>
  );
}