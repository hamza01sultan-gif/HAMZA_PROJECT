import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const navLinks = [
  { href: '#about', label: 'نبذة عني' },
  { href: '#education', label: 'التعليم' },
  { href: '#achievements', label: 'الإنجازات' },
  { href: '#skills', label: 'المهارات' },
  { href: '#volunteer', label: 'التطوع' },
  { href: '#gallery', label: 'المعرض' },
  { href: '#journey', label: 'رحلتي' },
];

const Header: React.FC<HeaderProps> = ({ isAdmin, onLoginClick, onLogoutClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Handles smooth scrolling to a section when a navigation link is clicked.
   * This provides a fluid user experience and prevents default anchor behavior
   * which can cause issues like page reloads or incorrect navigation in an iframe.
   * @param e - The mouse event from clicking the anchor tag.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent the browser's default behavior for anchor links (jumping to the section).
    e.preventDefault();
    
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    // Extract the element ID from the href attribute.
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    // If the target element exists, scroll to it smoothly.
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
      // Update the URL hash in the address bar without triggering a page navigation.
      // This ensures the URL is shareable and reflects the current view.
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    }
    
    // If the mobile menu is open, close it after clicking a link.
    if (isMenuOpen) {
      closeMenu();
    }
  };


  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#about" onClick={handleNavClick} className="text-2xl font-bold text-teal-600 cursor-pointer">ملف إنجاز حمزه 🧠✨</a>
          
          <nav className="hidden md:flex items-center space-x-reverse space-x-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={handleNavClick} className="text-slate-600 hover:text-teal-600 transition-colors font-medium cursor-pointer">{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center">
            {isAdmin ? (
              <button onClick={onLogoutClick} className="hidden md:flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                <LogOut className="ml-2 h-5 w-5" />
                تسجيل الخروج
              </button>
            ) : (
              <button onClick={onLoginClick} className="hidden md:flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                <LogIn className="ml-2 h-5 w-5" />
                دخول المسؤول
              </button>
            )}
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-700">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white absolute top-20 right-0 left-0 shadow-lg`}>
        <nav className="flex flex-col items-center p-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={handleNavClick} className="py-3 text-lg text-slate-600 hover:text-teal-600 transition-colors w-full text-center cursor-pointer">{link.label}</a>
          ))}
          <div className="mt-4 w-full px-4">
            {isAdmin ? (
                <button onClick={() => { onLogoutClick(); closeMenu(); }} className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    <LogOut className="ml-2 h-5 w-5" />
                    تسجيل الخروج
                </button>
                ) : (
                <button onClick={() => { onLoginClick(); closeMenu(); }} className="flex items-center justify-center w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                    <LogIn className="ml-2 h-5 w-5" />
                    دخول المسؤول
                </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;