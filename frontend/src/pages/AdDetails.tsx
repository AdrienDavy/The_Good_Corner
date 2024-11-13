import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../services/useApi";
import "./AdDetails.css";
import { AdType } from "../types";
import formatDateTime from "../services/formatDateTime";

const AdDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const api = useApi();
  const [ad, setAd] = useState<AdType | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const result = await api.get<AdType>(`/ads/${id}`);
        setAd(result.data);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };
    fetchAd();
  }, [api, id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/ads/${id}`).then(() => {
        setAd(null);
        navigate("/", { replace: true });
        console.log("Ad deleted");
      });
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleUpdate = async () => {
    navigate(`/ads/${id}/edit`);
  };

  if (!ad) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    // <div className="ad-details">
    //   <div className="ad-details-image-container">
    //     <img src={ad.picture} alt={ad.title} className="ad-details-image" />
    //   </div>
    //   <h1>{ad.title}</h1>
    //   <h2>
    //     <Link to={`/categories/${ad.category.id}`}>
    //       Catégorie :{ad.category.name}
    //     </Link>
    //   </h2>
    //   <div className="ad-details-info">
    //     <p className="ad-details-price">Prix: ${ad.price}</p>
    //     <p>
    //       <strong>Localisation:</strong> {ad.location}
    //     </p>
    //     <p>
    //       <strong>Auteur:</strong> {ad.owner}
    //     </p>
    //     <p>
    //       <strong>Description:</strong> {ad.description}
    //     </p>
    //     <p>{formatDateTime(ad.createdAt)}</p>
    //   </div>

    //   <div>
    //     Tags:
    //     <ul>
    //       {ad.tags?.map((tag) => (
    //         <li key={tag.id}>{tag.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="flex flex-col m-auto justify-center">
    //     <button
    //       className="button mb-2 ad-card-button-hover"
    //       onClick={handleDelete}
    //     >
    //       Supprimer l'offre
    //     </button>
    //     <button className="button ad-card-button-hover" onClick={handleUpdate}>
    //       Modifier l'offre
    //     </button>
    //   </div>
    // </div>

    <div className="flex w-full items-center justify-center p-10 mt-20">
      <div className="relative flex h-[60dvh] bg-gray-500 rounded-lg overflow-hidden">
        <div className=" h-full">
          <img
            src={ad.picture}
            alt={ad.title}
            className=" h-full object-cover"
          />
        </div>
        <div className=" p-8 text-white">
          <div className=" flex flex-col justify-between h-full">
            <h2 className=" text-2xl font-bold">
              {ad.title} <br />
              <span>
                <Link to={`/categories/${ad.category.id}`}>
                  {ad.category.name}
                </Link>
              </span>
            </h2>
            <div className="flex flex-col justify-center items-center">
              <p className=" flex justify-center items-center w-full">
                {ad.description}
              </p>
              <p className=" text-center">By {ad.owner}</p>
              <p className=" text-center">{formatDateTime(ad.createdAt)}</p>
              <p className=" text-center">{ad.location}</p>
            </div>
            <ul>
              {ad.tags?.map((tag) => (
                <li
                  className=" text-xs bg-slate-600 p-1 w-fit rounded-lg text-white font-bold"
                  key={tag.id}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
            <h3 className=" text-center w-full">{ad.price} €</h3>

            <div className="flex flex-col w-full">
              <button className="button mb-2 ad-card-button-hover">
                Buy Now
              </button>
              <button
                className="button mb-2 ad-card-button-hover "
                onClick={handleDelete}
              >
                Supprimer l'offre
              </button>
              <button
                className="button ad-card-button-hover"
                onClick={handleUpdate}
              >
                Modifier l'offre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
