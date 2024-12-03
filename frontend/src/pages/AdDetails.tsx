import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdType } from "../types";
import formatDateTime from "../services/formatDateTime";
import { useMutation, useQuery } from "@apollo/client";
import { queryAd } from "../queries/QueryAd";
import { mutationDeleteAd } from "../queries/DeleteAd";
import { toast } from "react-toastify";
import Spinner from "../loaders/Spinner";

const AdDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, loading, error } = useQuery<{ ad: AdType }>(queryAd, {
    variables: { id },
  });

  const ad = data?.ad;

  const [doDeleteAd, { loading: deleteAdLoading }] = useMutation<{
    deleteAd: AdType;
  }>(mutationDeleteAd);

  const handleDelete = async () => {
    try {
      if (!ad?.id) {
        console.error("Ad ID is undefined");
        return;
      }

      await doDeleteAd({
        variables: {
          id: ad.id, // Passe l'ID de l'annonce à supprimer
        },
      });

      console.log("Ad deleted");
      toast.success("Offre supprimée avec succès !", {
        className: "toast-success bg-primary",
        autoClose: 3000,
        position: "top-right",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleUpdate = async () => {
    navigate(`/ads/${id}/edit`);
  };

  if (error) {
    return (
      <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg mt-40">
        Error : {error.message}
      </p>
    );
  }

  if (ad === null) {
    return (
      <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg mt-40">
        OUPS ! Désolé rien trouvé...
      </p>
    );
  }

  if (loading && ad === undefined) {
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-10 mt-20">
      <div className="relative flex h-[60dvh] bg-gray-500 rounded-lg overflow-hidden">
        <div className=" h-full">
          <img
            src={ad?.picture}
            alt={ad?.title}
            className=" h-full object-cover"
          />
        </div>
        <div className=" p-8 text-white">
          <div className=" flex flex-col justify-between h-full">
            <h2 className=" text-2xl font-bold">
              {ad?.title} <br />
              <span>
                <Link
                  to={`/categories/${ad?.category.id}`}
                  className=" text-sm text-secondary hover:text-primary duration-300"
                >
                  {ad?.category.name}
                </Link>
              </span>
            </h2>
            <div className="flex flex-col justify-center items-center">
              <p className=" flex justify-center items-center w-full">
                {ad?.description}
              </p>
              <p className=" text-center">By {ad?.owner}</p>
              <p className=" text-center">{formatDateTime(ad?.createdAt)}</p>
              <p className=" text-center">{ad?.location}</p>
            </div>
            <ul className=" flex gap-1">
              {ad?.tags?.map((tag) => (
                <li
                  className=" text-xs bg-slate-600 py-1 px-2 w-fit rounded-lg text-primary font-bold"
                  key={tag.id}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
            <h3 className=" text-center w-full">{ad?.price} €</h3>

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
              {deleteAdLoading && <p>Suppression...</p>}
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
