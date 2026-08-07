import { ArrowLeft, ArrowUpRight, Bookmark, Check, Clock3, ExternalLink, MapPin, Phone, Share2, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { businesses } from '@/data/businesses';
import { BusinessCard } from '@/components/BusinessCard';

type BusinessDetailProps = { savedIds: string[]; onToggleSaved: (id: string) => void };

export default function BusinessDetail({ savedIds, onToggleSaved }: BusinessDetailProps) {
  const [, params] = useRoute('/business/:id');
  const business = businesses.find((item) => item.id === params?.id);
  const [shared, setShared] = useState(false);

  if (!business) {
    return <main className="detail-missing"><h1>That place wandered off.</h1><Link href="/" data-testid="link-back-home">Back to the guide</Link></main>;
  }

  const isSaved = savedIds.includes(business.id);
  const related = businesses.filter((item) => item.id !== business.id && (item.category === business.category || item.neighborhood === business.neighborhood)).slice(0, 2);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: business.name, text: business.editorialNote, url });
    else { await navigator.clipboard?.writeText(url); setShared(true); window.setTimeout(() => setShared(false), 2200); }
  };

  return (
    <main className="detail-page">
      <section className="detail-hero shell">
        <Link href="/" className="back-link" data-testid="link-back-guide"><ArrowLeft size={16} /> Back to the guide</Link>
        <div className="detail-hero__image" style={{ backgroundColor: business.color }}><img src={business.image} alt={`${business.name} interior`} /><span className="detail-hero__stamp">COMPASS<br /><small>FIELD NOTE</small></span></div>
        <div className="detail-hero__content">
          <p className="eyebrow"><span className="eyebrow-line" /> {business.category} · {business.neighborhood}</p>
          <h1>{business.name}</h1>
          <p className="detail-hero__note">“{business.editorialNote}”</p>
          <div className="detail-actions">
            <button type="button" className={isSaved ? 'action-button action-button--saved' : 'action-button'} onClick={() => onToggleSaved(business.id)} data-testid="button-detail-save"><Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved to your list' : 'Save place'}</button>
            <button type="button" className="action-button action-button--quiet" onClick={share} data-testid="button-detail-share">{shared ? <Check size={17} /> : <Share2 size={17} />} {shared ? 'Link copied' : 'Share'}</button>
          </div>
        </div>
      </section>

      <section className="detail-info shell">
        <div className="detail-info__main">
          <h2>Why we like it</h2>
          <p className="detail-description">{business.description}</p>
          <div className="detail-tags">{business.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="detail-rule" />
          <div className="detail-rating"><strong>{business.rating}</strong><span><Star size={17} fill="currentColor" /> rating</span><small>Based on {business.reviewCount} local notes</small></div>
        </div>
        <aside className="detail-facts">
          <div className="fact"><MapPin size={18} /><div><span>Find it at</span><strong>{business.address}</strong><button type="button" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(business.address)}`, '_blank')} data-testid="button-open-map">Open in maps <ArrowUpRight size={13} /></button></div></div>
          <div className="fact"><Clock3 size={18} /><div><span>Hours</span><strong>{business.hours}</strong><em className={business.openNow ? 'open-status' : 'closed-status'}>{business.openNow ? 'Open today' : 'Closed today'}</em></div></div>
          <div className="fact"><Phone size={18} /><div><span>Contact</span><strong>{business.phone}</strong><button type="button" onClick={() => window.location.href = `tel:${business.phone}`} data-testid="button-call-business">Call business</button></div></div>
          <div className="fact"><ExternalLink size={18} /><div><span>On the web</span><strong>{business.website}</strong><button type="button" onClick={() => window.open(`https://${business.website}`, '_blank')} data-testid="button-open-website">Visit website <ArrowUpRight size={13} /></button></div></div>
        </aside>
      </section>

      {related.length > 0 && <section className="related-section shell"><div className="section-heading section-heading--small"><div><p className="eyebrow"><span className="eyebrow-line" /> Keep wandering</p><h2>More around<br /><em>the corner.</em></h2></div><Link href="/" className="text-link" data-testid="link-see-all-places">See all places <ArrowUpRight size={15} /></Link></div><div className="business-grid business-grid--related">{related.map((item) => <BusinessCard key={item.id} business={item} isSaved={savedIds.includes(item.id)} onToggleSaved={onToggleSaved} />)}</div></section>}
    </main>
  );
}