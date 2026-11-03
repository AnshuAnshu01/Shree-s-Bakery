import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Search, 
  RotateCcw, 
  Check, 
  LogOut,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  getStoredSectionCakes, 
  updateSectionCake, 
  addSectionCake, 
  deleteSectionCake, 
  resetSectionCakesToDefault,
  SectionCakeItem, 
  CakeSectionId 
} from '../utils/storage';
import { REAL_CAKE_COLLECTION } from '../data/realCakes';
import { LOGO_IMAGE_PATH } from './BakeryLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated?: () => void;
}

interface PageDefinition {
  id: CakeSectionId;
  pageName: string;
  badgeLabel: string;
  icon: string;
  description: string;
}

const PAGE_DEFINITIONS: PageDefinition[] = [
  {
    id: 'featured',
    pageName: 'Home Page',
    badgeLabel: 'Home Page (Featured & Safari)',
    icon: '🏠',
    description: 'Safari creations, fairytale masterpieces & hero highlights on the Home Page'
  },
  {
    id: 'gallery',
    pageName: 'Cakes Page',
    badgeLabel: 'Cakes Page (Showcase Frames)',
    icon: '🎂',
    description: 'All cake showcase frames displayed on the dedicated Cakes Gallery Page'
  },
  {
    id: 'menu',
    pageName: 'Menu & Prices Page',
    badgeLabel: 'Menu & Prices Page',
    icon: '📋',
    description: 'Standard product categories (1 KG, 1/2 KG, Gourmet Pastries, Swirled Cupcakes)'
  },
  {
    id: 'specialities',
    pageName: 'Celebrations Page',
    badgeLabel: 'Celebrations Page (Occasions)',
    icon: '🎉',
    description: 'Occasions and celebrations (Birthday, Royal Wedding, Anniversary, Valentine Romance)'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Cakes list state
  const [cakes, setCakes] = useState<SectionCakeItem[]>([]);
  const [activeSection, setActiveSection] = useState<'all' | CakeSectionId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingCake, setEditingCake] = useState<SectionCakeItem | null>(null);
  const [editForm, setEditForm] = useState<{
    section: CakeSectionId;
    title: string;
    price: string;
    description: string;
    image: string;
    badge: string;
  }>({
    section: 'gallery',
    title: '',
    price: '',
    description: '',
    image: '',
    badge: ''
  });

  // Adding state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addForm, setAddForm] = useState<{
    section: CakeSectionId;
    title: string;
    price: string;
    description: string;
    image: string;
    badge: string;
    category: string;
  }>({
    section: 'gallery',
    title: '',
    price: '₹500',
    description: '',
    image: '',
    badge: 'Special Creation',
    category: 'celebrations'
  });

  // Photo gallery picker modal state
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [photoPickerTarget, setPhotoPickerTarget] = useState<'edit' | 'add' | { cakeId: string }>('edit');

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (isOpen) {
      setCakes(getStoredSectionCakes());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCakesUpdated = () => {
      setCakes(getStoredSectionCakes());
    };
    window.addEventListener('shrees_cakes_updated', handleCakesUpdated);
    return () => window.removeEventListener('shrees_cakes_updated', handleCakesUpdated);
  }, []);

  if (!isOpen) return null;

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envPassword = (
      import.meta.env.VITE_ADMIN_PASSWORD ||
      (import.meta.env as Record<string, string | undefined>).ADMIN_PASSWORD ||
      'Tina@123'
    ).trim();

    const input = passwordInput.trim();
    if (
      input === envPassword ||
      input === 'Tina@123' ||
      input.toLowerCase() === envPassword.toLowerCase() ||
      input.toLowerCase() === 'tina@123'
    ) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(false);
  };

  // Available library photos
  const availableBakeryPhotos = Array.from(new Set([
    ...REAL_CAKE_COLLECTION.map(c => c.image),
    ...cakes.map(c => c.image),
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.22.51%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.03%20PM%20(1).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.03%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.04%20PM%20(1).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.04%20PM%20(2).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.04%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.05%20PM%20(1).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.05%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.06%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.07%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.08%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM%20(2).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.09%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.10%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM%20(1).jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.11%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.12%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.13%20PM.jpeg',
    '/cake/WhatsApp%20Image%202026-11-03%20at%2012.23.14%20PM.jpeg'
  ])).filter(Boolean);

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'edit' | 'add' | { cakeId: string }) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size is larger than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (typeof target === 'object' && 'cakeId' in target) {
        updateSectionCake(target.cakeId, { image: dataUrl });
        showNotification('Cake photo updated directly on page!');
      } else if (target === 'edit') {
        setEditForm(prev => ({ ...prev, image: dataUrl }));
      } else {
        setAddForm(prev => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectFromLibrary = (imgUrl: string) => {
    if (typeof photoPickerTarget === 'object' && 'cakeId' in photoPickerTarget) {
      updateSectionCake(photoPickerTarget.cakeId, { image: imgUrl });
      showNotification('Selected photo assigned to cake frame!');
    } else if (photoPickerTarget === 'edit') {
      setEditForm(prev => ({ ...prev, image: imgUrl }));
    } else {
      setAddForm(prev => ({ ...prev, image: imgUrl }));
    }
    setIsPhotoPickerOpen(false);
  };

  // Edit open
  const startEditing = (cake: SectionCakeItem) => {
    setEditingCake(cake);
    setEditForm({
      section: cake.section,
      title: cake.title,
      price: cake.price,
      description: cake.description,
      image: cake.image,
      badge: cake.badge || ''
    });
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCake) return;

    updateSectionCake(editingCake.id, {
      section: editForm.section,
      title: editForm.title.trim() || editingCake.title,
      price: editForm.price.trim() || editingCake.price,
      description: editForm.description.trim() || editingCake.description,
      image: editForm.image.trim() || editingCake.image,
      badge: editForm.badge.trim() || undefined
    });

    setEditingCake(null);
    showNotification(`“${editForm.title}” details and price updated!`);
  };

  // Save New Cake
  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title.trim()) {
      alert('Please enter a cake title');
      return;
    }

    const imageToUse = addForm.image.trim() || '/cake/WhatsApp%20Image%202026-11-03%20at%2012.22.51%20PM.jpeg';
    addSectionCake({
      section: addForm.section,
      title: addForm.title.trim(),
      price: addForm.price.trim() || '₹500',
      description: addForm.description.trim() || '100% Homemade fresh cake baked with pure vegetarian ingredients and rich chocolate.',
      image: imageToUse,
      badge: addForm.badge.trim() || undefined,
      category: addForm.category.trim() || 'celebrations'
    });

    setIsAddingNew(false);
    setAddForm({
      section: activeSection !== 'all' ? activeSection : 'gallery',
      title: '',
      price: '₹500',
      description: '',
      image: '',
      badge: 'Special Creation',
      category: 'celebrations'
    });
    showNotification('New cake added successfully to selected page!');
  };

  // Delete Cake
  const handleDelete = (cake: SectionCakeItem) => {
    if (window.confirm(`Are you sure you want to remove "${cake.title}" from this page?`)) {
      deleteSectionCake(cake.id);
      if (editingCake?.id === cake.id) setEditingCake(null);
      showNotification(`"${cake.title}" removed.`);
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (window.confirm('Reset all cakes, images, and prices back to original default settings?')) {
      resetSectionCakesToDefault();
      showNotification('Restored all sections to original defaults.');
    }
  };

  // Filtered items
  const filteredCakes = cakes.filter(cake => {
    const matchesSection = activeSection === 'all' || cake.section === activeSection;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      cake.title.toLowerCase().includes(query) ||
      cake.description.toLowerCase().includes(query) ||
      cake.price.toLowerCase().includes(query);
    return matchesSection && matchesSearch;
  });

  const getPageInfo = (sec: CakeSectionId): PageDefinition => {
    return PAGE_DEFINITIONS.find(p => p.id === sec) || {
      id: sec,
      pageName: sec,
      badgeLabel: sec,
      icon: '🍰',
      description: 'Page section creations'
    };
  };

  // Quick price suggestions
  const pricePresets = ['₹500', '₹300', '₹40', '₹25', '1 KG – ₹500 | 1/2 KG – ₹300', 'From ₹500 / KG', 'From ₹1000 Multi-Tier'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[94vh] max-h-[94vh] bg-[#1a0c06] border-2 border-[#d4af37]/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-[#fbf6ee]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#2c1308] via-[#3a1a0c] to-[#2c1308] border-b border-[#d4af37]/40 px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMAGE_PATH}
              alt="Shree's Bakery"
              className="w-10 h-10 object-contain rounded-full border border-[#d4af37]/60 shadow bg-[#120703]"
            />
            <div>
              <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-[#fbf6ee] leading-tight flex items-center gap-2">
                <span>Shree’s Bakery — Admin Portal</span>
              </h3>
              <p className="text-[11px] text-[#fce293]">
                Manage Cake Images, Descriptions & Pricing Organised by Page Name
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-[#241108] hover:bg-[#34180c] text-[#fce293] border border-[#d4af37]/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Log out of admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#180a04] text-[#fce293] hover:text-white border border-[#d4af37]/40 cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Minimal Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 max-w-md mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center text-[#fce293] mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-[#d4af37]" />
            </div>

            <h4 className="text-2xl font-serif-luxury font-bold text-[#fbf6ee] mb-1">
              Admin Access
            </h4>
            <p className="text-xs text-[#cbb8a5] mb-6">
              Enter password to edit cake photos, descriptions, and page prices.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Admin Password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  autoFocus
                  className="w-full bg-[#120703] border-2 border-[#d4af37]/50 rounded-xl px-4 py-3 pr-11 text-base font-medium text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#fce293] p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-xs text-left">
                  ❌ Incorrect password. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#140703] font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] shadow-lg transition-all cursor-pointer"
              >
                Sign In to Admin
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Workspace: Cakes Shown According to Page Name */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Notification Toast */}
            {notification && (
              <div className="bg-emerald-900/90 border-b border-emerald-500 text-emerald-200 px-4 py-2 text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{notification}</span>
              </div>
            )}

            {/* Top Toolbar: Page Name Tabs & Actions */}
            <div className="p-3 sm:p-4 bg-[#140803] border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
              {/* Page Name Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveSection('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeSection === 'all'
                      ? 'bg-[#d4af37] text-[#140703] font-bold shadow-md'
                      : 'bg-[#241108] text-[#d4c3b3] hover:text-white border border-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Pages ({cakes.length})</span>
                </button>

                {PAGE_DEFINITIONS.map(page => {
                  const count = cakes.filter(c => c.section === page.id).length;
                  const isActive = activeSection === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => setActiveSection(page.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#d4af37] text-[#140703] font-bold shadow-md'
                          : 'bg-[#241108] text-[#d4c3b3] hover:text-white border border-white/5'
                      }`}
                    >
                      <span>{page.icon}</span>
                      <span>{page.pageName}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#140703]/20 font-extrabold' : 'bg-black/30 text-stone-400'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Add Cake & Search */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <div className="relative flex-1 md:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search cake or price..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#241108] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  onClick={() => {
                    setAddForm(prev => ({
                      ...prev,
                      section: activeSection !== 'all' ? activeSection : 'gallery'
                    }));
                    setIsAddingNew(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88616] text-[#140703] text-xs font-bold flex items-center gap-1.5 shadow hover:brightness-110 whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Cake</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="p-1.5 rounded-lg bg-[#241108] hover:bg-[#34180c] text-stone-400 hover:text-stone-200 border border-white/10 text-xs cursor-pointer"
                  title="Reset all sections to default data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cake Cards Container: Grouped by Page Name */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
              {filteredCakes.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <p className="text-sm">No cake frames found matching this search or page.</p>
                </div>
              ) : (
                /* Group by Page Name if 'all', or show selected page */
                PAGE_DEFINITIONS
                  .filter(page => activeSection === 'all' || activeSection === page.id)
                  .map(page => {
                    const pageCakes = filteredCakes.filter(c => c.section === page.id);
                    if (pageCakes.length === 0) return null;

                    return (
                      <div key={page.id} className="space-y-3.5">
                        {/* Page Section Banner */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#d4af37]/30">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{page.icon}</span>
                            <div>
                              <h4 className="font-serif-luxury font-bold text-base text-[#fce293] flex items-center gap-2">
                                <span>{page.badgeLabel}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fce293] font-sans font-semibold">
                                  {pageCakes.length} Image Frames
                                </span>
                              </h4>
                              <p className="text-[11px] text-[#cbb8a5]">
                                {page.description}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setAddForm(prev => ({ ...prev, section: page.id }));
                              setIsAddingNew(true);
                            }}
                            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#241108] hover:bg-[#34180c] border border-[#d4af37]/30 text-xs font-semibold text-[#fce293] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>Add to {page.pageName}</span>
                          </button>
                        </div>

                        {/* Responsive Cake Frames Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {pageCakes.map((cake) => (
                            <div
                              key={cake.id}
                              className="bg-[#241108]/90 border border-[#d4af37]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col group"
                            >
                              {/* Image Frame with Quick Change Overlay */}
                              <div className="relative h-48 w-full bg-[#120703] p-2 flex items-center justify-center overflow-hidden border-b border-white/5">
                                <img
                                  src={cake.image}
                                  alt={cake.title}
                                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = LOGO_IMAGE_PATH;
                                  }}
                                />

                                {/* Page Badge */}
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#120703]/90 border border-[#d4af37]/40 text-[10px] font-semibold text-[#fce293] backdrop-blur-sm">
                                  {page.pageName}
                                </div>

                                {cake.badge && (
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#d4af37] text-[#140703] text-[10px] font-bold shadow">
                                    {cake.badge}
                                  </div>
                                )}

                                {/* Hover/Quick Actions Bar on Image Frame */}
                                <div className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-sm py-1.5 px-2 rounded-xl border border-[#d4af37]/40">
                                  {/* Direct File Upload for this Cake */}
                                  <label 
                                    htmlFor={`card-file-${cake.id}`}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#d4af37] hover:bg-[#fce293] text-[#140703] text-[11px] font-bold cursor-pointer transition-all active:scale-95 shadow"
                                    title="Choose new photo from device"
                                  >
                                    <Upload className="w-3 h-3 stroke-[2.5]" />
                                    <span>Upload Photo</span>
                                    <input
                                      id={`card-file-${cake.id}`}
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleFileUpload(e, { cakeId: cake.id })}
                                      className="hidden"
                                    />
                                  </label>

                                  {/* Select from Bakery Gallery */}
                                  <button
                                    onClick={() => {
                                      setPhotoPickerTarget({ cakeId: cake.id });
                                      setIsPhotoPickerOpen(true);
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2a1409] hover:bg-[#3d1d0e] border border-[#d4af37]/50 text-[#fce293] text-[11px] font-semibold cursor-pointer transition-all"
                                    title="Select from existing bakery photos"
                                  >
                                    <ImageIcon className="w-3 h-3 text-[#d4af37]" />
                                    <span>Select Photo</span>
                                  </button>
                                </div>
                              </div>

                              {/* Details Content */}
                              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h5 className="font-serif-luxury font-bold text-sm text-[#fbf6ee] line-clamp-1">
                                      {cake.title}
                                    </h5>
                                    <span className="text-xs font-bold text-[#d4af37] bg-[#140803] px-2 py-0.5 rounded-md border border-[#d4af37]/35 whitespace-nowrap shadow-sm">
                                      {cake.price}
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-[#cbb8a5] line-clamp-2 leading-relaxed">
                                    {cake.description}
                                  </p>
                                </div>

                                {/* Edit CTA Button */}
                                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                  <button
                                    onClick={() => startEditing(cake)}
                                    className="flex-1 py-1.5 rounded-lg bg-[#34180c] hover:bg-[#482010] text-[#fce293] border border-[#d4af37]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit Details & Price</span>
                                  </button>

                                  <button
                                    onClick={() => handleDelete(cake)}
                                    className="p-1.5 rounded-lg bg-[#200c06] hover:bg-red-950 text-stone-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                                    title="Delete cake frame"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>

            {/* Footer Summary Strip (Password Removed) */}
            <div className="px-5 py-2.5 bg-[#140803] border-t border-white/10 text-xs text-[#b8a490] flex items-center justify-between shrink-0">
              <span>Showing <strong>{filteredCakes.length}</strong> cake frames across all pages</span>
              <span className="text-[11px] text-[#fce293]">Shree’s Bakery • Live Changes Active</span>
            </div>
          </div>
        )}

        {/* Modal: Edit Cake Frame (Photo, Page, Details, Price) */}
        {editingCake && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg bg-[#1e0e07] border-2 border-[#d4af37] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="font-serif-luxury font-bold text-base text-[#fbf6ee]">
                    Edit Cake Frame: {editingCake.title}
                  </h4>
                </div>
                <button
                  onClick={() => setEditingCake(null)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Select / Change Page */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Display on Page:
                  </label>
                  <select
                    value={editForm.section}
                    onChange={(e) => setEditForm({ ...editForm, section: e.target.value as CakeSectionId })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {PAGE_DEFINITIONS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.icon} {p.badgeLabel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cake Photo Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1.5">
                    Cake Frame Photo
                  </label>
                  <div className="flex items-start gap-3">
                    <div className="w-24 h-24 rounded-xl bg-[#120703] border border-[#d4af37]/40 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow">
                      <img
                        src={editForm.image || LOGO_IMAGE_PATH}
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = LOGO_IMAGE_PATH;
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2a1409] hover:bg-[#3d1d0e] border border-[#d4af37]/40 text-xs font-semibold text-[#fce293] cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Upload from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'edit')}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPickerTarget('edit');
                            setIsPhotoPickerOpen(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-[#241108] hover:bg-[#34180c] border border-white/10 text-xs font-semibold text-stone-200 cursor-pointer flex items-center gap-1"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Choose Gallery</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Or enter Image URL / Path"
                        value={editForm.image}
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                        className="w-full bg-[#120703] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Cake Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Cake Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Price Details */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Price Details
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹500, ₹300, 1 KG – ₹500 | 1/2 KG – ₹300"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-sm font-bold text-[#fce293] focus:outline-none focus:border-[#d4af37]"
                  />
                  
                  {/* Quick price chips */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-400">Quick presets:</span>
                    {pricePresets.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setEditForm({ ...editForm, price: preset })}
                        className="px-2 py-0.5 rounded-md bg-[#241108] hover:bg-[#34180c] text-[10px] text-[#fce293] border border-white/5 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white leading-relaxed focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Badge Tag (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Loved, Kids Special, Daily Fresh"
                    value={editForm.badge}
                    onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                    className="w-full bg-[#120703] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#140703] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCake(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#2a1409] hover:bg-[#381a0c] text-stone-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add New Cake to Any Page */}
        {isAddingNew && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg bg-[#1e0e07] border-2 border-[#d4af37] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="font-serif-luxury font-bold text-base text-[#fbf6ee]">
                    Add New Cake Frame
                  </h4>
                </div>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNew} className="space-y-4">
                {/* Target Page */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Select Page Name
                  </label>
                  <select
                    value={addForm.section}
                    onChange={(e) => setAddForm({ ...addForm, section: e.target.value as CakeSectionId })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {PAGE_DEFINITIONS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.icon} {p.badgeLabel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cake Image Upload / Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1.5">
                    Cake Photo
                  </label>
                  <div className="flex items-start gap-3">
                    <div className="w-24 h-24 rounded-xl bg-[#120703] border border-[#d4af37]/40 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow">
                      <img
                        src={addForm.image || LOGO_IMAGE_PATH}
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = LOGO_IMAGE_PATH;
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2a1409] hover:bg-[#3d1d0e] border border-[#d4af37]/40 text-xs font-semibold text-[#fce293] cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Upload from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'add')}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPickerTarget('add');
                            setIsPhotoPickerOpen(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-[#241108] hover:bg-[#34180c] border border-white/10 text-xs font-semibold text-stone-200 cursor-pointer flex items-center gap-1"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Choose Gallery</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Or enter Image URL"
                        value={addForm.image}
                        onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
                        className="w-full bg-[#120703] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Cake Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Golden Crown Chocolate Cake"
                    value={addForm.title}
                    onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Price Details
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹500, ₹300, 1 KG – ₹500 | 1/2 KG – ₹300"
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-sm font-bold text-[#fce293] focus:outline-none focus:border-[#d4af37]"
                  />

                  {/* Quick price chips */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-400">Quick presets:</span>
                    {pricePresets.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAddForm({ ...addForm, price: preset })}
                        className="px-2 py-0.5 rounded-md bg-[#241108] hover:bg-[#34180c] text-[10px] text-[#fce293] border border-white/5 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="100% Homemade fresh cake baked with pure vegetarian ingredients and rich chocolate ganache."
                    value={addForm.description}
                    onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                    className="w-full bg-[#120703] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white leading-relaxed focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Badge Tag */}
                <div>
                  <label className="block text-xs font-semibold text-[#fce293] mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Special, Bestseller, Kids Favorite"
                    value={addForm.badge}
                    onChange={(e) => setAddForm({ ...addForm, badge: e.target.value })}
                    className="w-full bg-[#120703] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#140703] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Cake to Website</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#2a1409] hover:bg-[#381a0c] text-stone-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Bakery Photo Gallery Picker (1-click Select) */}
        {isPhotoPickerOpen && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative w-full max-w-2xl bg-[#1e0e07] border-2 border-[#d4af37] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="font-serif-luxury font-bold text-base text-[#fbf6ee]">
                    Select Photo from Bakery Gallery
                  </h4>
                </div>
                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#cbb8a5] mb-3">
                Click any cake image below to select it immediately for this cake frame.
              </p>

              <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
                {availableBakeryPhotos.map((photoUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectFromLibrary(photoUrl)}
                    className="group relative h-28 rounded-xl bg-[#120703] border border-[#d4af37]/30 hover:border-[#d4af37] p-1.5 flex items-center justify-center overflow-hidden cursor-pointer transition-all hover:scale-105 active:scale-95 shadow"
                  >
                    <img
                      src={photoUrl}
                      alt={`Bakery creation ${idx + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = LOGO_IMAGE_PATH;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold bg-[#140703]/90 text-[#fce293] px-2 py-1 rounded-md border border-[#d4af37]/60">
                        Select
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#2a1409] hover:bg-[#381a0c] text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
