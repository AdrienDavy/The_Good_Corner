import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import "./RecentAds.css";
import Cart from "./Cart";
import useApi from "../services/useApi";
import { AdType } from "../types";

const RecentAds = () => {
  const api = useApi();
  const [totalPrice, setTotalPrice] = useState(0);
  const [ads, setAds] = useState<AdType[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await api.get<AdType[]>("/ads");
        setAds(result.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetch();
  }, [api]);

  if (!ads) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
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

export default RecentAds;
