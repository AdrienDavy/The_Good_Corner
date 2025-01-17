import AdCard from "./AdCard";
import { useQuery } from "@apollo/client";
import { queryRecentAds } from "../api/QueryAds";
import Spinner from "../loaders/Spinner";

const RecentAds = () => {
  const { data, error, loading } = useQuery(queryRecentAds, {
    fetchPolicy: "cache-and-network",
  });
  const ads = data?.ads;
  return (
    <>
      {error && (
        <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg">
          Error : {error.message}
        </p>
      )}
      {ads === null && (
        <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg">
          OUPS ! Désolé rien trouvé...
        </p>
      )}
      <h2>Annonces récentes</h2>
      <section className=" mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        {loading && ads === undefined && (
          <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-10">
            <Spinner />
          </div>
        )}
        {ads?.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </section>
    </>
  );
};

export default RecentAds;
