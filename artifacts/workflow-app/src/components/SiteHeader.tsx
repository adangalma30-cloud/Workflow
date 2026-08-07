import { Bookmark, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CompassMark } from '@/components/CompassMark';

type SiteHeaderProps = { savedCount: number; onSavedClick?: () => void };

export function SiteHeader({ savedCount, onSavedClick }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const goHome = (hash?: string) => {
    setMenuOpen(false);
    setLocation(hash ? `/${hash}` : '/');
  };

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="brand" data-testid="link-brand">
          <CompassMark compact />
          <span>compass</span>
        </Link>
        <nav className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'} aria-label="Main navigation">
          <button type="button" onClick={() => goHome('#explore')} data-testid="button-nav-explore">Explore</button>
          <button type="button" onClick={() => { onSavedClick?.(); goHome('#saved'); }} data-testid="button-nav-saved">
            Saved places <span className="saved-count">{savedCount}</span>
          </button>
          <button type="button" onClick={() => goHome('#about')} data-testid="button-nav-about">About Compass</button>
        </nav>
        <div className="site-header__actions">
          <button type="button" className="header-icon" onClick={() => goHome('#explore')} aria-label="Search places" data-testid="button-header-search"><Search size={19} /></button>
          <button type="button" className="header-saved" onClick={() => { onSavedClick?.(); goHome('#saved'); }} data-testid="button-header-saved">
            <Bookmark size={17} fill={savedCount ? 'currentColor' : 'none'} /> <span>{savedCount}</span>
          </button>
          <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}