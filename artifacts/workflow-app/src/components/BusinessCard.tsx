import { ArrowUpRight, Bookmark, MapPin, Star } from 'lucide-react';
import { Link } from 'wouter';
import type { Business } from '@/data/businesses';

type BusinessCardProps = {
  business: Business;
  isSaved: boolean;
  onToggleSaved: (id: string) => void;
  featured?: boolean;
};

export function BusinessCard({ business, isSaved, onToggleSaved, featured = false }: BusinessCardProps) {
  return (
    <article className={featured ? 'business-card business-card--featured' : 'business-card'} data-testid={`card-business-${business.id}`}>
      <Link href={`/business/${business.id}`} className="business-card__image-link" data-testid={`link-business-${business.id}`}>
        <div className="business-card__image-wrap" style={{ backgroundColor: business.color }}>
          <img src={business.image} alt={`${business.name} interior`} className="business-card__image" />
          <span className="business-card__category">{business.category}</span>
          <span className="business-card__arrow"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
        </div>
      </Link>
      <div className="business-card__body">
        <div className="business-card__title-row">
          <div>
            <Link href={`/business/${business.id}`} className="business-card__name" data-testid={`link-name-${business.id}`}>{business.name}</Link>
            <p className="business-card__neighborhood"><MapPin size={13} /> {business.neighborhood}</p>
          </div>
          <button
            type="button"
            className={isSaved ? 'save-button save-button--active' : 'save-button'}
            onClick={() => onToggleSaved(business.id)}
            aria-label={isSaved ? `Remove ${business.name} from saved places` : `Save ${business.name}`}
            data-testid={`button-save-${business.id}`}
          >
            <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.8} />
          </button>
        </div>
        <p className="business-card__description">{business.description}</p>
        <div className="business-card__meta">
          <span className="rating"><Star size={13} fill="currentColor" /> {business.rating}</span>
          <span>{business.reviewCount} notes</span>
          <span className="meta-divider">·</span>
          <span>{business.price}</span>
        </div>
      </div>
    </article>
  );
}