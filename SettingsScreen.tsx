import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Globe, 
  Bell, 
  Mail, 
  Tag,
  Shield, 
  Eye, 
  Activity,
  Palette, 
  BookOpen,
  ShoppingBag, 
  Crown, 
  Heart,
  HelpCircle, 
  MessageCircle, 
  FileText,
  Info, 
  LogOut,
  UserPlus,
  Users,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SettingsScreenProps {
  onBack: () => void;
}

const settingsCategories = [
  {
    title: 'Account',
    icon: User,
    items: [
      { icon: User, label: 'Profile', description: 'Edit your profile information', hasChevron: true },
      { icon: Lock, label: 'Password', description: 'Change your password', hasChevron: true },
      { icon: Globe, label: 'Language', description: 'English', hasChevron: true }
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { icon: Bell, label: 'Push Notifications', description: 'Get notified about new content', hasSwitch: true, enabled: true },
      { icon: Mail, label: 'Email', description: 'Weekly reading updates', hasSwitch: true, enabled: false },
      { icon: Tag, label: 'Vibe Tags', description: 'Notifications for your favorite genres', hasChevron: true }
    ]
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    items: [
      { icon: Users, label: 'Blocked Users', description: '3 blocked accounts', hasChevron: true },
      { icon: Eye, label: 'Visibility', description: 'Who can see your activity', hasChevron: true },
      { icon: Activity, label: 'Login Activity', description: 'Recent sign-ins', hasChevron: true }
    ]
  },
  {
    title: 'App Preferences',
    icon: Palette,
    items: [
      { icon: Moon, label: 'Theme', description: 'Dark mode', hasSwitch: true, enabled: true },
      { icon: BookOpen, label: 'Book Genres', description: 'Customize your feed preferences', hasChevron: true }
    ]
  },
  {
    title: 'Store Settings',
    icon: ShoppingBag,
    items: [
      { icon: ShoppingBag, label: 'Purchase History', description: 'View your orders', hasChevron: true },
      { icon: Crown, label: 'VIP Access', description: 'Manage your premium benefits', hasChevron: true, hasVip: true },
      { icon: Heart, label: 'Wishlist', description: '12 items saved', hasChevron: true }
    ]
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    items: [
      { icon: FileText, label: 'Report', description: 'Report a problem', hasChevron: true },
      { icon: MessageCircle, label: 'Contact', description: 'Get in touch with us', hasChevron: true },
      { icon: HelpCircle, label: 'FAQs', description: 'Frequently asked questions', hasChevron: true }
    ]
  },
  {
    title: 'About',
    icon: Info,
    items: [
      { icon: FileText, label: 'Terms', description: 'Terms of Service', hasChevron: true },
      { icon: Info, label: 'Version Info', description: 'Novaline v2.4.1', hasChevron: true }
    ]
  }
];

const accountActions = [
  { icon: LogOut, label: 'Log Out', description: 'Sign out of your account', color: 'text-[#E60023]' },
  { icon: UserPlus, label: 'Add Another Account', description: 'Connect additional accounts', color: 'text-[#E60023]' },
  { icon: Users, label: 'Switch Accounts', description: 'Switch between your accounts', color: 'text-[#E60023]' }
];

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    'Push Notifications': true,
    'Email': false,
    'Theme': true
  });

  const handleToggle = (label: string) => {
    setToggleStates(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const renderSettingItem = (item: any, categoryTitle: string) => (
    <div key={item.label} className="flex items-center justify-between p-4 hover:bg-[#111113] rounded-xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-xl bg-[#111113] flex items-center justify-center group-hover:bg-[#E60023]/10 transition-all border border-[#1F1F23]">
          <item.icon className="h-5 w-5 text-[#9B9B9B] group-hover:text-[#E60023] transition-colors" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#EDEDED]">{item.label}</span>
            {item.hasVip && (
              <Badge className="bg-[#E60023] text-white text-xs px-2 py-1 rounded-full">
                VIP
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#9B9B9B] mt-1">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {item.hasSwitch && (
          <Switch 
            checked={toggleStates[item.label]} 
            onCheckedChange={() => handleToggle(item.label)}
            className="data-[state=checked]:bg-[#E60023]"
          />
        )}
        {item.hasChevron && (
          <ChevronRight className="h-5 w-5 text-[#9B9B9B] group-hover:text-[#E60023] transition-colors" />
        )}
      </div>
    </div>
  );

  const renderAccountAction = (action: any) => (
    <div key={action.label} className="flex items-center justify-between p-4 hover:bg-[#111113] rounded-xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#111113] flex items-center justify-center group-hover:bg-[#111113] transition-all border border-[#1F1F23]">
          <action.icon className={`h-5 w-5 ${action.color} transition-colors`} />
        </div>
        <div>
          <span className={`font-medium ${action.color}`}>{action.label}</span>
          <p className="text-sm text-[#9B9B9B] mt-1">{action.description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-[#9B9B9B] group-hover:text-[#E60023] transition-colors" />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0B0B0C]">
      {/* Header */}
      <div className="bg-[#0B0B0C] border-b border-[#1F1F23] p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-[#9B9B9B] hover:text-[#EDEDED] hover:bg-[#111113] rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-[#EDEDED]">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {settingsCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={category.title} className="bg-[#111113] border border-[#1F1F23] rounded-2xl clean-card">
              <CardContent className="p-0">
                {/* Category Header */}
                <div className="p-4 border-b border-[#1F1F23]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E60023] flex items-center justify-center">
                      <CategoryIcon className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="font-semibold text-[#EDEDED]">{category.title}</h2>
                  </div>
                </div>
                
                {/* Category Items */}
                <div className="divide-y divide-[#1F1F23]">
                  {category.items.map((item) => renderSettingItem(item, category.title))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Account Actions */}
        <Card className="bg-[#111113] border border-[#1F1F23] rounded-2xl clean-card">
          <CardContent className="p-0">
            {/* Account Actions Header */}
            <div className="p-4 border-b border-[#1F1F23]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E60023] flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h2 className="font-semibold text-[#EDEDED]">Account Management</h2>
              </div>
            </div>
            
            {/* Account Action Items */}
            <div className="divide-y divide-[#1F1F23]">
              {accountActions.map(renderAccountAction)}
            </div>
          </CardContent>
        </Card>

        {/* App Info Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-[#9B9B9B] mb-2">Made with ✨ for book lovers</p>
          <p className="text-xs text-[#9B9B9B]">© 2024 Novaline. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}