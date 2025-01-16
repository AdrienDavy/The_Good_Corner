import { Link } from "react-router-dom";
import "./AdCard.css";
import Cart from "../assets/cart.svg";
import formatDateTime from "../services/formatDateTime";

type Props = {
  ad: {
    __typename?: "Ad";
    id: string;
    picture: string;
    title: string;
    price: number;
    createdAt: string;
  };
};

const onAddToCart = () => {
  alert("Ajouté au panier !");
};

const AdCard = ({ ad }: Props) => {
  return (
    <div className="ad-card-container transition">
      <Link className="ad-card-link" to={`/ads/${ad.id}`}>
        <div className="ad-card-image-container">
          <img
            className="ad-card-image transition"
            src={ad.picture}
            alt={ad.title}
          />
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
          className="button w-full ad-card-button-hover"
          onClick={onAddToCart}
        >
          Ajouter au panier <img width={16} height={16} src={Cart} alt="" />
        </button>
      </div>
      <div className=" text-xs p-1 text-yellow-500">
        {formatDateTime(ad.createdAt)}
      </div>
    </div>
  );
};

export default AdCard;
