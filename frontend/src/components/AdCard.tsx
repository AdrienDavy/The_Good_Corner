import { Link } from "react-router-dom";
import "./AdCard.css";
import Cart from "../assets/cart.svg";
import formatDateTime from "../services/formatDateTime";
import { AdsQuery } from "../gql/graphql";

const onAddToCart = () => {
  alert("Ajouté au panier !");
};

const AdCard = ({ ad }: { ad: AdsQuery["ads"][0] }) => {
  return (
    <div className="ad-card-container transition">
      <Link className="ad-card-link" to={`/ads/${ad?.id}`}>
        <div className="ad-card-image-container">
          <img
            className="ad-card-image transition"
            src={ad?.picture}
            alt={ad?.title}
          />
        </div>
        <div className="ad-card-text">
          <div className="ad-card-title" title={ad?.title}>
            {ad?.title}
          </div>
          <div className="ad-card-price">
            {ad && ad?.price.toFixed(2)} €
            {(ad?.category.name.includes("Immobilier") && "/mois") ||
              (ad?.category.name.includes("Emploi") && "/mois")}
          </div>
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
      <div className=" text-xs p-1 gap-1 text-yellow-500">
        <p className=" text-center">Auteur {ad?.owner}</p>
        {formatDateTime(ad?.createdAt)}
      </div>
    </div>
  );
};

export default AdCard;
