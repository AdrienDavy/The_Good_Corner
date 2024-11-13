import { useEffect, useState } from "react";
import useApi from "../services/useApi";
import AdCard from "../components/AdCard";
import Cart from "../components/Cart";
import { useParams } from "react-router-dom";
import { CategoryType } from "../types";

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const api = useApi();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await api.get<CategoryType>(`/categories/${id}`);
        setCategory(result.data);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };
    fetchCategory();
  }, [api, id]);

  if (!category) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <div>
        <h1 style={{ paddingBottom: "2rem" }}>{category.name}</h1>
      </div>
      <section className="recent-ads">
        {category.ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            onAddToCart={() => setTotalPrice(totalPrice + ad.price)}
          />
        ))}
        {totalPrice >= 0 && <Cart showPrice={totalPrice} />}
      </section>
    </>
  );
};

export default Category;
