import { Link } from "react-router-dom";
import "./AdCard.css";
import Cart from "../assets/cart.svg";
import { AdType } from "../types";
import formatDateTime from "../services/formatDateTime";

type Props = {
  ad: AdType;
  onAddToCart: () => void;
};

const AdCard = ({ ad, onAddToCart }: Props) => {
  return (
    <div className="ad-card-container transition">
      <Link className="ad-card-link" to={`/ads/${ad.id}`}>
        <div className="ad-card-image-container">
          <img className="ad-card-image transition" src={ad.picture} />
        </div>
        <div className="ad-card-text">
          <div className="ad-card-title" title={ad.title}>
            {ad.title}
          </div>
          <div className="ad-card-price">{(ad.price / 100).toFixed(2)} €</div>
        </div>
      </Link>
      <div className="text-field-with-button ad-card-button-gap">
        <button
          className="button full-width ad-card-button-hover"
          onClick={onAddToCart}
        >
          Ajouter au panier <img width={16} height={16} src={Cart} alt="" />
        </button>
      </div>
      <div className="ad-card-price">{formatDateTime(ad.createdAt)}</div>
    </div>
  );
};

export default AdCard;
