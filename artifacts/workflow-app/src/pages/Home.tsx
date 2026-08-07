import { ArrowDown, ArrowRight, Bookmark, ChevronDown, Filter, Search, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { BusinessCard } from '@/components/BusinessCard';
import { CompassMark } from '@/components/CompassMark';
import { businesses, categories, type BusinessCategory } from '@/data/businesses';

type HomeProps = {
  savedIds: string[];
  onToggleSaved: (id: string) => void;
};

export default function Home({ savedIds, onToggleSaved }: HomeProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | BusinessCategory>('All');
  const [sort, setSort] = useState<'recommended' | 'rating' | 'name'>('recommended');
  const [openNow, setOpenNow] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#saved') setShowSavedOnly(true);
    if (window.location.hash === '#explore') document.getElementById('explore')?.scrollIntoView();
  }, []);

  const filteredBusinesses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = businesses.filter((business) => {
      const matchesQuery = !normalizedQuery || [business.name, business.category, business.neighborhood, business.description, ...business.tags].join(' ').toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'All' || business.category === category;
      const matchesOpen = !openNow || business.openNow;
      const matchesSaved = !showSavedOnly || savedIds.includes(business.id);
      return matchesQuery && matchesCategory && matchesOpen && matchesSaved;
    });
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, openNow, query, savedIds, showSavedOnly, sort]);

  const visibleBusinesses = showAll ? filteredBusinesses : filteredBusinesses.slice(0, 6);

  return (
    <main className="home-page">
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A field guide to the city</p>
          <h1>Find your<br /><em>next favorite</em><br />place.</h1>
          <p className="hero__lede">Thoughtful recommendations for the neighborhood businesses that make a city feel like home.</p>
          <a href="#explore" className="hero__scroll" data-testid="link-scroll-explore"><span>Start exploring</span><ArrowDown size={16} /></a>
        </div>
        <div className="hero__art" aria-label="Illustration of a city map">
          <div className="map-ring map-ring--one" /><div className="map-ring map-ring--two" />
          <div className="map-line map-line--one" /><div className="map-line map-line--two" /><div className="map-line map-line--three" />
          <span className="map-label map-label--one">MISSION</span><span className="map-label map-label--two">BERNAL</span><span className="map-label map-label--three">POTRERO</span>
          <div className="map-pin"><CompassMark /><span>you are<br /><strong>here</strong></span></div>
          <span className="hero__art-note">good places,<br /><em>close by</em></span>
          <span className="hero__coordinates">37°46' N<br />122°25' W</span>
        </div>
      </section>

      <section className="intro-strip" id="about">
        <div className="shell intro-strip__inner">
          <span className="intro-strip__number">01</span>
          <p>Not a list. <em>A point of view.</em></p>
          <p className="intro-strip__detail">We look for the places with a little more character, a little more care, and a reason to return.</p>
          <Sparkles size={22} strokeWidth={1.5} />
        </div>
      </section>

      <section className="explore-section shell" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> The shortlist</p>
            <h2>Places worth<br /><em>the detour.</em></h2>
          </div>
          <p className="section-heading__aside">A considered collection of independent spots, from early coffee to late dinners.</p>
        </div>

        <div className="explore-toolbar">
          <label className="search-field">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, neighborhood, or mood..." aria-label="Search businesses" data-testid="input-search-businesses" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" data-testid="button-clear-search">×</button>}
          </label>
          <div className="filter-tabs" role="tablist" aria-label="Business categories">
            {categories.map((item) => <button key={item} type="button" className={category === item ? 'filter-tab filter-tab--active' : 'filter-tab'} onClick={() => setCategory(item)} role="tab" aria-selected={category === item} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}
          </div>
          <div className="toolbar-options">
            <label className="check-option"><input type="checkbox" checked={openNow} onChange={(event) => setOpenNow(event.target.checked)} data-testid="input-open-now" /><span>Open now</span></label>
            <button type="button" className={showSavedOnly ? 'saved-filter saved-filter--active' : 'saved-filter'} onClick={() => setShowSavedOnly((value) => !value)} data-testid="button-filter-saved"><Bookmark size={15} fill={showSavedOnly ? 'currentColor' : 'none'} /> Saved</button>
            <label className="sort-field"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Sort businesses" data-testid="select-sort"><option value="recommended">Recommended</option><option value="rating">Highest rated</option><option value="name">Name A–Z</option></select><ChevronDown size={14} /></label>
          </div>
        </div>

        {showSavedOnly && <div className="saved-banner"><Bookmark size={17} fill="currentColor" /><span>Showing your saved places</span><button type="button" onClick={() => setShowSavedOnly(false)} data-testid="button-clear-saved-filter">Clear filter</button></div>}

        {visibleBusinesses.length > 0 ? (
          <div className="business-grid">
            {visibleBusinesses.map((business, index) => <BusinessCard key={business.id} business={business} isSaved={savedIds.includes(business.id)} onToggleSaved={onToggleSaved} featured={index === 0 && !query && category === 'All'} />)}
          </div>
        ) : (
          <div className="empty-state"><span className="empty-state__mark"><Filter size={22} /></span><h3>No places found</h3><p>Try a different neighborhood, category, or search term.</p><button type="button" onClick={() => { setQuery(''); setCategory('All'); setOpenNow(false); setShowSavedOnly(false); }} data-testid="button-reset-filters">Reset filters</button></div>
        )}
        {filteredBusinesses.length > 6 && <button type="button" className="load-more" onClick={() => setShowAll((value) => !value)} data-testid="button-load-more">{showAll ? 'Show less' : 'View all places'} <ArrowRight size={16} /></button>}
      </section>

      <section className="saved-section shell" id="saved">
        <div className="saved-section__card">
          <div className="saved-section__copy">
            <span className="saved-section__icon"><Bookmark size={19} fill="currentColor" /></span>
            <p className="eyebrow">Your collection</p>
            <h2>Keep the good<br /><em>ones close.</em></h2>
            <p>Save places as you explore. Your little black book, always in your pocket.</p>
            <button type="button" onClick={() => { setShowSavedOnly(true); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }} data-testid="button-view-saved">View saved places <ArrowRight size={16} /></button>
          </div>
          <div className="saved-section__visual"><div className="saved-note"><span>PLACES TO GO</span><strong>{String(savedIds.length).padStart(2, '0')}</strong><small>saved so far</small></div><div className="saved-doodle saved-doodle--one" /><div className="saved-doodle saved-doodle--two" /></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <Link href="/" className="brand brand--footer" data-testid="link-footer-brand"><CompassMark compact /><span>compass</span></Link>
          <p>Made for wandering with intention.</p>
          <span className="font-mono-ui">SF / 2024</span>
        </div>
      </footer>
    </main>
  );
}