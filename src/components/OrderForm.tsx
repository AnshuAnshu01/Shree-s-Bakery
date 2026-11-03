import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Upload, 
  X, 
  AlertCircle, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink,
  Heart,
  ChevronDown,
  Clock,
  Store,
  Share2,
  Copy,
  Loader2,
  Sparkles
} from 'lucide-react';
import { CustomOrder } from '../types/bakery';
import { 
  BAKERY_DISPLAY_PHONE, 
  saveOrders, 
  getStoredOrders, 
  getWhatsAppDirectUrl,
  getRawWhatsAppOrderMessage
} from '../utils/storage';
import {
  uploadReferenceImage,
  canShareFiles,
  shareOrderWithFile,
  copyImageToClipboard
} from '../utils/imageUpload';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';

interface OrderFormProps {
  initialValues?: {
    cakeType?: string;
    weightSize?: string;
    flavor?: string;
    budget?: string;
    threeDConfig?: {
      tiers: number;
      icingColor: string;
      topper: string;
    };
  };
  onOrderSubmitted?: (order: CustomOrder) => void;
}

export const getMinOrderDate = (): string => {
  const now = new Date();
  const currentHour = now.getHours();
  const target = new Date();
  // Same-day orders allowed only in the morning (before 11:00 AM).
  // From 11:00 AM onwards, preorder must be at least 1 day in advance (tomorrow).
  if (currentHour >= 11) {
    target.setDate(target.getDate() + 1);
  }
  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, '0');
  const day = String(target.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isMorningOrderWindow = (): boolean => {
  return new Date().getHours() < 11;
};

export const OrderForm: React.FC<OrderFormProps> = ({ initialValues, onOrderSubmitted }) => {
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [cakeType, setCakeType] = useState(initialValues?.cakeType || '1 KG Celebration Cake (₹500)');
  const [occasion, setOccasion] = useState('Birthday');
  const [flavor, setFlavor] = useState(initialValues?.flavor || 'Belgian Chocolate Truffle');
  const [weightSize, setWeightSize] = useState(initialValues?.weightSize || '1 KG (₹500)');
  const [deliveryDate, setDeliveryDate] = useState(() => getMinOrderDate());
  const [deliveryAddress, setDeliveryAddress] = useState('Store Pick-Up (Bakery Counter)');
  const [budget, setBudget] = useState(initialValues?.budget || '₹500');
  const [customInstructions, setCustomInstructions] = useState('');
  
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [copiedPhoto, setCopiedPhoto] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrder | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { isLight } = useTheme();

  React.useEffect(() => {
    if (initialValues?.cakeType) setCakeType(initialValues.cakeType);
    if (initialValues?.weightSize) setWeightSize(initialValues.weightSize);
    if (initialValues?.flavor) setFlavor(initialValues.flavor);
    if (initialValues?.budget) setBudget(initialValues.budget);
  }, [initialValues]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError('Image file size must be less than 10MB.');
      return;
    }

    setReferenceFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Background upload immediately so it's ready for WhatsApp link!
    setIsUploadingPhoto(true);
    try {
      const hosted = await uploadReferenceImage(file);
      if (hosted) {
        setUploadedUrl(hosted);
      }
    } catch (err) {
      console.warn('Background image upload notice:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
    setReferenceFile(null);
    setUploadedUrl(null);
    setIsUploadingPhoto(false);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) {
      errors.customerName = 'Please enter your name.';
    }
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number.';
    }
    const minDate = getMinOrderDate();
    if (!deliveryDate) {
      errors.deliveryDate = 'Please select your required date.';
    } else if (deliveryDate < minDate) {
      errors.deliveryDate = 'Same-day orders are only accepted in the morning before 11:00 AM. Please select tomorrow or a later date.';
    }
    if (!deliveryAddress.trim()) {
      errors.deliveryAddress = 'Please enter delivery address or keep Store Pick-Up.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let finalImageUrl = uploadedUrl;
      if (!finalImageUrl && referenceFile) {
        setIsUploadingPhoto(true);
        try {
          finalImageUrl = await uploadReferenceImage(referenceFile);
          if (finalImageUrl) setUploadedUrl(finalImageUrl);
        } catch {
          // ignore
        }
        setIsUploadingPhoto(false);
      }

      const orderNumber = `SB-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const createdAt = now.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      let estimate = 500;
      if (weightSize.includes('300') || weightSize.includes('1/2 KG')) estimate = 300;
      else if (weightSize.includes('750') || weightSize.includes('1.5 KG')) estimate = 750;
      else if (weightSize.includes('1000') || weightSize.includes('2 KG')) estimate = 1000;
      else if (weightSize.includes('1500') || weightSize.includes('3 KG')) estimate = 1500;

      const newOrder: CustomOrder = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt,
        customerName: customerName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        cakeType,
        occasion,
        flavor,
        weightSize,
        quantity: 1,
        deliveryDate,
        deliveryTime: 'Store Pick-Up',
        deliveryAddress: deliveryAddress.trim() || 'Store Pick-Up (Bakery Counter)',
        budget: budget || `₹${estimate}`,
        customInstructions: customInstructions.trim(),
        referenceImageUrl: finalImageUrl || referenceImage || undefined,
        status: 'Pending',
        totalEstimate: estimate,
        threeDConfig: initialValues?.threeDConfig
      };

      const existing = getStoredOrders();
      saveOrders([newOrder, ...existing]);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#fce293', '#e11d48']
        });
      } catch (err) {
        console.log(err);
      }

      setSubmittedOrder(newOrder);
      if (onOrderSubmitted) onOrderSubmitted(newOrder);

      // Try native smartphone share with actual photo file if supported
      if (referenceFile && canShareFiles(referenceFile)) {
        const shared = await shareOrderWithFile(
          `Cake Order #${newOrder.orderNumber} - Shree's Bakery`,
          getRawWhatsAppOrderMessage(newOrder),
          referenceFile
        );
        if (shared) return;
      }

      // Directly launch WhatsApp with pre-filled order
      const waUrl = getWhatsAppDirectUrl(newOrder);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full rounded-xl px-3.5 py-2.5 text-xs transition-colors focus:outline-none border ${
    isLight
      ? 'bg-[#f7efe4] border-[#d4af37]/60 text-[#241107] placeholder-[#8b6b55] focus:border-[#b88616] focus:bg-white'
      : 'bg-[#120703] border-[#d4af37]/30 text-white placeholder-[#786655] focus:border-[#d4af37]'
  }`;

  const labelClasses = `text-xs font-bold uppercase block mb-1 ${
    isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
  }`;

  return (
    <section id="order-section" className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between ${
      isLight ? 'bg-[#faf5ee] text-[#241107]' : 'bg-[#180903] text-[#fbf6ee]'
    }`}>
      <div className="max-w-3xl mx-auto w-full my-auto">
        {/* Section Hero Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
            isLight
              ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]'
              : 'bg-[#34180d] border-[#d4af37]/35 text-[#fce293]'
          }`}>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Dedicated Cake Booking</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-3 ${
            isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
          }`}>
            Order Your <span className="text-gold-gradient italic">Custom Cake</span>
          </h2>

          <p className={`font-script text-xl md:text-2xl mb-3 ${
            isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
          }`}>
            “Tell us your vision, and we’ll bake pure magic for your celebration.”
          </p>

          <p className={`text-xs sm:text-sm font-light max-w-lg mx-auto ${
            isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'
          }`}>
            Direct WhatsApp confirmation with our master baker at <strong>87086 61381</strong>.
          </p>
        </div>

        {submittedOrder ? (
          <div className={`border-2 border-[#d4af37] rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in-95 ${
            isLight ? 'bg-[#fffdfa] text-[#241107]' : 'bg-[#241108] text-white'
          }`}>
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#fce293] to-[#996515] shadow-lg">
                <img
                  src={LOGO_IMAGE_PATH}
                  alt="Shree's Bakery"
                  className="w-full h-full object-cover rounded-full bg-[#160703]"
                />
              </div>
            </div>
            <CheckCircle2 className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
            <h3 className={`text-2xl font-serif-luxury font-bold mb-2 ${
              isLight ? 'text-[#241107]' : 'text-white'
            }`}>
              Order Logged, {submittedOrder.customerName}!
            </h3>
            <p className={`text-xs mb-2 ${
              isLight ? 'text-[#5a341e]' : 'text-[#ded0be]'
            }`}>
              Your cake order <strong className={isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'}>#{submittedOrder.orderNumber}</strong> has opened in WhatsApp. If it didn't open automatically, tap below:
            </p>
            <p className={`text-[11px] max-w-md mx-auto mb-4 ${isLight ? 'text-[#7c4d28]' : 'text-[#a89582]'}`}>
              📅 Date: <strong>{submittedOrder.deliveryDate}</strong> • 📍 Fulfillment: <strong>{submittedOrder.deliveryAddress}</strong>
            </p>

            {/* Reference Photo Confirmation Box */}
            {(referenceImage || submittedOrder.referenceImageUrl) && (
              <div className={`max-w-md mx-auto mb-5 p-3.5 rounded-2xl border text-left flex items-center gap-3.5 shadow-sm ${
                isLight ? 'bg-[#f7efe4] border-[#d4af37]/60' : 'bg-[#180903] border-[#d4af37]/40'
              }`}>
                <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#d4af37]/60 bg-black/30">
                  <img
                    src={referenceImage || submittedOrder.referenceImageUrl}
                    alt="Reference Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className={`text-xs font-bold ${isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'}`}>
                      Reference Cake Photo Included
                    </span>
                  </div>
                  <p className={`text-[11px] leading-snug mt-0.5 ${isLight ? 'text-[#5a341e]' : 'text-[#cbb8a5]'}`}>
                    {uploadedUrl ? (
                      <>📸 Direct image preview link is included in your WhatsApp message!</>
                    ) : (
                      <>📸 Photo is attached. Tap camera/attachment 📎 in WhatsApp to share.</>
                    )}
                  </p>
                  
                  {/* Action buttons: Share Photo or Copy Photo */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {referenceFile && canShareFiles(referenceFile) && (
                      <button
                        type="button"
                        onClick={() => {
                          if (submittedOrder && referenceFile) {
                            shareOrderWithFile(
                              `Cake Order #${submittedOrder.orderNumber} - Shree's Bakery`,
                              getRawWhatsAppOrderMessage(submittedOrder),
                              referenceFile
                            );
                          }
                        }}
                        className="text-[10px] px-2.5 py-1 rounded-lg font-bold bg-[#25d366] text-[#120703] hover:brightness-105 cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Send Photo to WhatsApp</span>
                      </button>
                    )}
                    {referenceFile && (
                      <button
                        type="button"
                        onClick={async () => {
                          const ok = await copyImageToClipboard(referenceFile);
                          if (ok) {
                            setCopiedPhoto(true);
                            setTimeout(() => setCopiedPhoto(false), 2500);
                          }
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border cursor-pointer flex items-center gap-1 transition-colors ${
                          copiedPhoto
                            ? 'bg-emerald-700 text-white border-emerald-500'
                            : isLight
                            ? 'bg-white hover:bg-[#eedbc4] text-[#6b3d16] border-[#d4af37]/40'
                            : 'bg-[#2a1409] hover:bg-[#3d1d0e] text-[#fce293] border-white/10'
                        }`}
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedPhoto ? '✓ Copied to Clipboard!' : 'Copy Photo to Clipboard'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
              {referenceFile && canShareFiles(referenceFile) && (
                <button
                  type="button"
                  onClick={() => {
                    if (submittedOrder && referenceFile) {
                      shareOrderWithFile(
                        `Cake Order #${submittedOrder.orderNumber} - Shree's Bakery`,
                        getRawWhatsAppOrderMessage(submittedOrder),
                        referenceFile
                      );
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-[#120703] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Order + Photo to WhatsApp</span>
                </button>
              )}

              <a
                href={getWhatsAppDirectUrl(submittedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-[#120703] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-[#120703]" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSubmittedOrder(null)}
                className={`text-xs underline cursor-pointer ${
                  isLight ? 'text-[#8a4e0c] hover:text-[#5a341e]' : 'text-[#a89582] hover:text-[#fce293]'
                }`}
              >
                + Book Another Cake
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 ${
              isLight
                ? 'bg-[#fffdfa] border-[#d4af37]/50 shadow-[0_15px_40px_rgba(180,140,80,0.15)]'
                : 'bg-[#220e06] border-[#d4af37]/40'
            }`}
          >
            {/* Form Top Brand Header with Official Logo */}
            <div className={`flex items-center gap-3.5 pb-4 mb-4 border-b ${
              isLight ? 'border-[#d4af37]/40' : 'border-[#d4af37]/25'
            }`}>
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#fce293] to-[#996515] shadow-md flex items-center justify-center">
                  <img
                    src={LOGO_IMAGE_PATH}
                    alt="Shree's Bakery"
                    className="w-full h-full object-cover rounded-full bg-[#160703]"
                  />
                </div>
              </div>
              <div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${isLight ? 'text-[#8a4e0c]' : 'text-[#d4af37]'}`}>
                  <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
                  <span>100% Homemade • 4+ Years Experience</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-serif-luxury font-bold leading-tight ${isLight ? 'text-[#241107]' : 'text-white'}`}>
                  Custom Cake Order Form
                </h3>
                <p className={`text-[11px] ${isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'}`}>
                  Direct WhatsApp confirmation • Baker Contact: {BAKERY_DISPLAY_PHONE}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={inputClasses}
                />
                {formErrors.customerName && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.customerName}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className={inputClasses}
                />
                {formErrors.whatsappNumber && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.whatsappNumber}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className={inputClasses}
                >
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Anniversary</option>
                  <option>Valentine's Day</option>
                  <option>Baby Shower</option>
                  <option>Other Celebration</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  Weight & Price *
                </label>
                <select
                  value={weightSize}
                  onChange={(e) => setWeightSize(e.target.value)}
                  className={inputClasses}
                >
                  <option>1/2 KG (₹300)</option>
                  <option>1 KG (₹500)</option>
                  <option>1.5 KG (₹750)</option>
                  <option>2 KG (₹1000)</option>
                  <option>3 KG (₹1500)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClasses}>
                  Flavor *
                </label>
                <select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className={inputClasses}
                >
                  <option>Belgian Chocolate Truffle</option>
                  <option>Dutch Chocolate Fudge</option>
                  <option>Red Velvet with Cream Cheese</option>
                  <option>Black Forest</option>
                  <option>Butterscotch Crunch</option>
                  <option>Fresh Strawberry Cream</option>
                  <option>Royal Rasmalai</option>
                  <option>Fresh Pineapple</option>
                </select>
              </div>

              {/* Delivery / Pick-up Date & Pre-Order Policy */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className={labelClasses}>
                    Required Delivery / Pick-up Date *
                  </label>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    isMorningOrderWindow()
                      ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  }`}>
                    {isMorningOrderWindow() ? '🌅 Morning Window: Same-Day Accepted' : '📅 Pre-Order Notice: 1 Day Advance'}
                  </span>
                </div>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  min={getMinOrderDate()}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={inputClasses}
                />
                <div className={`mt-2 p-2.5 rounded-xl border flex items-start gap-2.5 ${
                  isMorningOrderWindow()
                    ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                }`}>
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    {isMorningOrderWindow()
                      ? 'Morning booking is active! You can order for today (accepted before 11:00 AM) or pre-order for any upcoming celebration.'
                      : 'Fresh homemade cakes are baked from scratch with pure ingredients! Pre-orders require at least 1 day advance notice (same-day orders are accepted only in the morning before 11:00 AM).'}
                  </p>
                </div>
                {formErrors.deliveryDate && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold">{formErrors.deliveryDate}</p>
                )}
              </div>

              {/* Fulfillment Location / Pick-Up */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className={labelClasses}>
                    Fulfillment / Pick-Up Details *
                  </label>
                  <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                    isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                  }`}>
                    <Store className="w-3.5 h-3.5" />
                    <span>Default: Pick-up from Bakery</span>
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Store Pick-Up (Bakery Counter) or your Delivery Address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className={inputClasses}
                />
                <p className={`text-[10px] mt-1 ${isLight ? 'text-[#7c4d28]' : 'text-[#a89582]'}`}>
                  Pre-set to bakery pickup. If you need local delivery to your doorstep, replace with your complete delivery address.
                </p>
                {formErrors.deliveryAddress && (
                  <p className="text-[10px] text-red-500 mt-0.5">{formErrors.deliveryAddress}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClasses}>
                  Message on Cake / Custom Wishes
                </label>
                <input
                  type="text"
                  placeholder='e.g. "Happy 5th Birthday Ananya! ♥"'
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className={inputClasses}
                />
              </div>

              {/* Reference Image Upload Frame */}
              <div className="sm:col-span-2">
                <label className={labelClasses}>
                  Reference Cake Photo (Optional - JPG, PNG, WEBP)
                </label>
                {referenceImage ? (
                  <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${
                    isLight ? 'bg-[#f7efe4] border-[#d4af37]/50' : 'bg-[#120703] border-[#d4af37]/40'
                  }`}>
                    <img src={referenceImage} alt="Ref" className="w-14 h-14 object-cover rounded-lg border border-[#d4af37]/40 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs block font-semibold truncate ${
                        isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                      }`}>
                        Reference photo attached
                      </span>
                      {isUploadingPhoto ? (
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-amber-500">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Generating instant WhatsApp preview link...</span>
                        </div>
                      ) : uploadedUrl ? (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          ✓ Direct WhatsApp preview link ready
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={removeReferenceImage}
                        className="text-[10px] text-red-500 hover:underline cursor-pointer mt-0.5 block"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                      isLight
                        ? 'border-[#d4af37]/60 hover:border-[#d4af37] bg-[#f7efe4] text-[#5a341e]'
                        : 'border-[#d4af37]/40 hover:border-[#d4af37] bg-[#120703]/50 text-[#ded0be]'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Upload className="w-5 h-5 text-[#d4af37] mx-auto mb-1" />
                    <span className="text-xs block font-medium">Upload reference cake design photo</span>
                    <span className="text-[10px] opacity-75 block mt-0.5">Will be automatically shared to WhatsApp with your order</span>
                  </div>
                )}
                {imageError && <p className="text-[10px] text-red-500 mt-1">{imageError}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#190a04] font-cinzel font-extrabold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4 fill-[#190a04]" />
              <span>{isSubmitting ? 'Submitting & Preparing Photo...' : 'Submit Order & Open WhatsApp'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Round Arrow Scrolling Down Button (Back to Top / Next) */}
      <div className="mt-12 z-20 flex flex-col items-center">
        <button
          onClick={scrollToTop}
          className={`group w-12 h-12 rounded-full border-2 border-[#d4af37] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-[#d4af37] text-[#8a4e0c] hover:text-[#140703]'
              : 'bg-[#241108]/90 hover:bg-[#d4af37] text-[#fce293] hover:text-[#180b06]'
          }`}
          aria-label="Scroll back to top"
        >
          <ChevronDown className="w-6 h-6 stroke-[2.5] transform rotate-180 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <span className={`text-[10px] uppercase font-cinzel tracking-widest mt-1.5 font-bold ${
          isLight ? 'text-[#8a4e0c]' : 'text-[#a89582]'
        }`}>
          Back to Top
        </span>
      </div>
    </section>
  );
};
