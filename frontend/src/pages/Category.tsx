import AdCard from "../components/AdCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { queryCategory } from "../api/QueryCategory";
import Spinner from "../loaders/Spinner";

const Category = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, loading } = useQuery(queryCategory, {
    variables: { categoryId: id ?? "" },
  });
  const category = data?.category;
  if (error) {
    return (
      <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg mt-40">
        Error : {error.message}
      </p>
    );
  }

  if (category === null) {
    return (
      <p className=" text-red-500 font-bold text-2xl bg-primary p-4 rounded-lg mt-40">
        OUPS ! Désolé rien trouvé...
      </p>
    );
  }

  if (loading && category === undefined) {
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" mt-28">
      <h1 className=" font-bold text-4xl mb-8 text-primary">
        {category?.name}
      </h1>

      <section className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  xl:grid-cols-6 gap-4">
        {category?.ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </section>
    </div>
  );
};

export default Category;
