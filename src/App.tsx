import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Send, ShoppingBag, Menu, Search, Instagram, Twitter, Facebook, ArrowRight, Star, ShieldCheck, Leaf, Droplets, ChevronRight, ArrowLeft, Play, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from './products';
import heroImg from './hero.png';

interface CartItem extends Product {
  quantity: number;
  selectedVariant: string;
}

type View = 'landing' | 'shop' | 'detail' | 'story';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product, variant: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedVariant === variant 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedVariant: variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, variant: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedVariant === variant)));
  };

  const updateQuantity = (id: string, variant: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedVariant === variant) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = () => {
    const orderDetails = cart.map(item => 
      `${item.name} (${item.selectedVariant}) x ${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');
    const message = `*New Order from Glowkart*\n\nItems:\n${orderDetails}\n\n*Total Amount: ₹${cartTotal}*\n\nPlease confirm my order.`;
    const targetNumber = whatsappNumber || '910000000000';
    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-clay selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-olive/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button className="p-2 lg:hidden"><Menu className="w-6 h-6" /></button>
              <h1 onClick={() => setView('landing')} className="text-3xl font-serif tracking-tight text-brand-olive cursor-pointer">Glowkart</h1>
            </div>
            
            <div className="hidden lg:flex items-center space-x-10 text-[11px] font-medium uppercase tracking-[0.2em]">
              <button onClick={() => setView('landing')} className={`hover:text-brand-clay transition-colors ${view === 'landing' ? 'text-brand-clay' : 'text-brand-ink/60'}`}>Home</button>
              <button onClick={() => setView('shop')} className={`hover:text-brand-clay transition-colors ${view === 'shop' ? 'text-brand-clay' : 'text-brand-ink/60'}`}>Shop All</button>
              <button onClick={() => setView('story')} className={`hover:text-brand-clay transition-colors ${view === 'story' ? 'text-brand-clay' : 'text-brand-ink/60'}`}>Our Story</button>
              <button className="text-brand-ink/60 hover:text-brand-clay transition-colors">Journal</button>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 text-brand-ink/60 hover:text-brand-ink transition-colors"><Search className="w-5 h-5" /></button>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-brand-ink/60 hover:text-brand-ink transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-clay text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingView onShopNow={() => setView('shop')} onProductClick={openDetail} />
            </motion.div>
          )}
          {view === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ShopView categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} products={filteredProducts} onProductClick={openDetail} onAddToCart={addToCart} />
            </motion.div>
          )}
          {view === 'detail' && selectedProduct && (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DetailView product={selectedProduct} onBack={() => setView('shop')} onAddToCart={addToCart} />
            </motion.div>
          )}
          {view === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StoryView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-brand-cream flex flex-col">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-serif">Search</h2>
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-brand-olive/5 rounded-full transition-colors"><X className="w-8 h-8" /></button>
              </div>
              <div className="relative mb-12">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="What are you looking for?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-brand-olive/20 py-6 text-3xl font-serif focus:border-brand-olive outline-none transition-all placeholder:text-brand-ink/20"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-brand-olive/40" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.slice(0, 4).map(p => (
                  <div key={p.id} onClick={() => { setIsSearchOpen(false); openDetail(p); }}>
                    <ProductCard product={p} onClick={() => {}} onAddToCart={() => {}} />
                  </div>
                ))}
              </div>
              
              {searchQuery && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-serif italic text-2xl text-brand-ink/40">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl font-serif text-brand-cream mb-8">Glowkart</h2>
              <p className="max-w-md mb-10 text-lg leading-relaxed font-serif italic">"Nature's wisdom, bottled for your radiance."</p>
              <div className="flex gap-6">
                <Instagram className="w-5 h-5 cursor-pointer hover:text-brand-cream transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-brand-cream transition-colors" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-brand-cream transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-cream mb-8">Shop</h4>
              <ul className="space-y-4 text-sm">
                {categories.slice(1).map(c => <li key={c} onClick={() => {setSelectedCategory(c); setView('shop'); window.scrollTo(0,0);}} className="hover:text-brand-cream cursor-pointer transition-colors">{c}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-cream mb-8">Newsletter</h4>
              <p className="text-sm mb-6">Join our circle for exclusive rituals and early access.</p>
              <div className="flex border-b border-brand-cream/20 pb-3">
                <input type="email" placeholder="Email Address" className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-brand-cream/30" />
                <button className="p-1"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-brand-cream/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em]">
            <p>© 2026 Glowkart Skincare. All rights reserved.</p>
            <div className="flex gap-8"><span>Privacy</span><span>Terms</span><span>Shipping</span></div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar (unchanged logic, simplified for brevity) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-50 shadow-2xl flex flex-col">
              <div className="p-8 border-b border-brand-olive/10 flex justify-between items-center">
                <h3 className="text-3xl font-serif">Your Kart</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-brand-olive/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-brand-ink/30">
                    <ShoppingBag className="w-16 h-16 mb-6 opacity-10" />
                    <p className="font-serif italic text-xl">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-6">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-serif text-xl leading-tight">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id, item.selectedVariant)} className="text-brand-ink/30 hover:text-red-500"><X className="w-4 h-4" /></button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-clay mb-4">{item.selectedVariant}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-brand-olive/20 rounded-full px-3 py-1 bg-white">
                            <button onClick={() => updateQuantity(item.id, item.selectedVariant, -1)} className="p-1"><Minus className="w-3 h-3" /></button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.selectedVariant, 1)} className="p-1"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="font-serif text-lg">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-8 bg-white border-t border-brand-olive/10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40">Estimated Total</span>
                    <span className="text-3xl font-serif">₹{cartTotal}</span>
                  </div>
                  <div className="mb-8">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 mb-3">WhatsApp Number</label>
                    <input type="text" placeholder="e.g. 919876543210" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="w-full bg-brand-cream border border-brand-olive/10 rounded-2xl px-5 py-4 text-sm focus:ring-1 focus:ring-brand-olive outline-none transition-all" />
                  </div>
                  <button onClick={placeOrder} className="w-full bg-brand-olive text-brand-cream py-5 rounded-2xl font-medium flex items-center justify-center gap-4 hover:bg-brand-ink transition-all active:scale-[0.98] uppercase text-[10px] tracking-[0.3em]">
                    Complete Order via WhatsApp <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingView({ onShopNow, onProductClick }: { onShopNow: () => void, onProductClick: (p: Product) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-block text-brand-cream text-[10px] uppercase tracking-[0.4em] mb-6 bg-brand-olive/40 backdrop-blur-md px-4 py-2 rounded-full">New Collection 2026</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-serif text-brand-cream leading-[0.9] mb-8">Reveal Your Natural Glow</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-brand-cream/80 text-lg md:text-xl mb-10 font-serif italic max-w-lg mx-auto md:mx-0">Ethically sourced, botanically infused skincare designed to honor your skin's unique journey.</motion.p>
            <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} onClick={onShopNow} className="group flex items-center gap-4 bg-brand-cream text-brand-ink px-10 py-5 rounded-full font-medium hover:bg-white transition-all hover:gap-6 uppercase text-[10px] tracking-[0.3em] mx-auto md:mx-0">Explore Shop <ArrowRight className="w-4 h-4" /></motion.button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800" alt="Philosophy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl hidden md:block border-8 border-white">
                <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400" alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div>
              <span className="text-brand-clay text-[10px] uppercase tracking-[0.4em] mb-6 block">Our Philosophy</span>
              <h3 className="text-5xl font-serif mb-8 leading-tight">Grounded in Nature, Perfected by Science.</h3>
              <p className="text-brand-ink/70 text-lg leading-relaxed mb-8 font-serif italic">"We believe that true beauty is a reflection of health. Our mission is to provide you with the tools to nurture your skin with the same care you give your soul."</p>
              <div className="space-y-6">
                {[
                  { title: "Ethical Sourcing", desc: "We partner with local farmers to ensure every ingredient is harvested with respect." },
                  { title: "Zero Waste Goal", desc: "Our packaging is 100% recyclable, moving towards a circular economy." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-olive"><Leaf className="w-5 h-5" /></div>
                    <div>
                      <h5 className="font-serif text-lg mb-1">{item.title}</h5>
                      <p className="text-sm text-brand-ink/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-brand-clay text-[10px] uppercase tracking-[0.4em] mb-4 block">Curated Selection</span>
            <h3 className="text-5xl font-serif">The Best Sellers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map(p => (
              <div key={p.id}>
                <ProductCard product={p} onClick={() => onProductClick(p)} onAddToCart={() => onProductClick(p)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kart Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-5xl font-serif mb-8">Morning Kart</h3>
              <p className="text-brand-ink/70 text-lg mb-10 leading-relaxed">Discover how our community incorporates Glowkart into their daily lives. It's more than skincare; it's a moment of peace.</p>
              <button onClick={onShopNow} className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-semibold border-b border-brand-ink pb-2 hover:gap-6 transition-all">Shop the Kart <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600" alt="Kart 1" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600" alt="Kart 2" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-6">
                <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600" alt="Kart 3" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" alt="Kart 4" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-brand-olive text-brand-cream text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative">
          <Quote className="w-16 h-16 text-brand-clay/20 absolute -top-12 left-1/2 -translate-x-1/2" />
          <h3 className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">"Glowkart has completely transformed my morning routine. My skin has never felt more alive or looked more radiant. Truly a gift from nature."</h3>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">— Elena R., Verified Customer</p>
        </div>
      </section>
    </div>
  );
}

function StoryView() {
  return (
    <div className="py-20 bg-brand-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <span className="text-brand-clay text-[10px] uppercase tracking-[0.4em] mb-6 block">Our Story</span>
          <h2 className="text-6xl font-serif mb-8">Born from the Earth.</h2>
          <p className="text-xl font-serif italic text-brand-ink/70">Founded in 2024, Glowkart was created with a single vision: to bridge the gap between ancient botanical wisdom and modern dermatological science.</p>
        </header>
        
        <div className="space-y-20">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200" alt="Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-2xl font-serif mb-6">The Beginning</h4>
              <p className="text-brand-ink/70 leading-relaxed">It all started in a small kitchen in the hills, where our founder, Sarah, began experimenting with cold-pressed oils and wild-harvested herbs. She saw a need for skincare that wasn't just effective, but also kind—to our bodies and the planet.</p>
            </div>
            <div>
              <h4 className="text-2xl font-serif mb-6">Our Promise</h4>
              <p className="text-brand-ink/70 leading-relaxed">Today, Glowkart is a community of skin enthusiasts, scientists, and nature lovers. We promise to never compromise on quality, to always be transparent about our ingredients, and to continue our journey towards a more sustainable future.</p>
            </div>
          </div>
          
          <div className="bg-brand-olive text-brand-cream p-12 rounded-3xl text-center">
            <h4 className="text-3xl font-serif mb-6">Join the Kart</h4>
            <p className="mb-8 opacity-80">We're just getting started. Be a part of our journey towards radiant, healthy skin.</p>
            <div className="flex justify-center gap-6">
              <button className="bg-brand-cream text-brand-olive px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopView({ categories, selectedCategory, onCategoryChange, products, onProductClick, onAddToCart }: { 
  categories: string[], 
  selectedCategory: string, 
  onCategoryChange: (c: string) => void, 
  products: Product[],
  onProductClick: (p: Product) => void,
  onAddToCart: (p: Product, v: string) => void
}) {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20 text-center">
          <h2 className="text-6xl font-serif mb-8">The Apothecary</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button key={cat} onClick={() => onCategoryChange(cat)} className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all ${selectedCategory === cat ? 'bg-brand-olive text-brand-cream' : 'bg-white text-brand-ink/60 hover:bg-brand-olive/5'}`}>{cat}</button>
            ))}
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map(p => (
            <div key={p.id}>
              <ProductCard product={p} onClick={() => onProductClick(p)} onAddToCart={() => onProductClick(p)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailView({ product, onBack, onAddToCart }: { product: Product, onBack: () => void, onAddToCart: (p: Product, v: string) => void }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 hover:text-brand-ink mb-12 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Shop</button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-brand-clay text-[10px] uppercase tracking-[0.3em] mb-4">{product.category}</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{product.name}</h2>
            <p className="text-3xl font-serif mb-8 text-brand-olive">₹{product.price}</p>
            <p className="text-brand-ink/70 leading-relaxed mb-10 text-lg font-serif italic">{product.fullDescription}</p>
            
            <div className="mb-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 mb-4">Select Variant</h4>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(v => (
                  <button key={v} onClick={() => setSelectedVariant(v)} className={`px-6 py-3 rounded-xl text-xs transition-all border ${selectedVariant === v ? 'bg-brand-olive border-brand-olive text-brand-cream' : 'bg-white border-brand-olive/10 text-brand-ink/60 hover:border-brand-olive/30'}`}>{v}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <div className="flex items-center border border-brand-olive/20 rounded-2xl px-4 py-2 bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => {for(let i=0; i<qty; i++) onAddToCart(product, selectedVariant);}} className="flex-grow bg-brand-olive text-brand-cream py-4 rounded-2xl font-medium uppercase text-[10px] tracking-[0.3em] hover:bg-brand-ink transition-all active:scale-[0.98]">Add to Kart</button>
            </div>

            <div className="space-y-8 border-t border-brand-olive/10 pt-10">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 mb-3">Key Benefits</h5>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {product.benefits.map((b, i) => <li key={i} className="flex items-center gap-2 text-sm text-brand-ink/70"><ChevronRight className="w-3 h-3 text-brand-clay" /> {b}</li>)}
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 mb-3">How to Use</h5>
                <p className="text-sm text-brand-ink/70 leading-relaxed">{product.howToUse}</p>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 mb-3">Ingredients</h5>
                <p className="text-xs text-brand-ink/50 leading-relaxed">{product.ingredients.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick, onAddToCart }: { product: Product, onClick: () => void, onAddToCart: () => void }) {
  return (
    <motion.div layout className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/10 transition-colors" />
        <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button onClick={(e) => {e.stopPropagation(); onAddToCart();}} className="w-full bg-white/90 backdrop-blur py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-ink hover:bg-brand-olive hover:text-white transition-all shadow-lg">View Details</button>
        </div>
      </div>
      <div className="flex justify-between items-start px-2">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-brand-clay mb-2">{product.category}</p>
          <h4 className="text-xl font-serif leading-tight group-hover:text-brand-clay transition-colors">{product.name}</h4>
        </div>
        <p className="font-serif text-xl">₹{product.price}</p>
      </div>
    </motion.div>
  );
}
