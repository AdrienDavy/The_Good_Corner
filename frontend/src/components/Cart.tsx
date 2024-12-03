import "./Cart.css";
import CartImg from "../assets/cart.svg";
type totalPriceType = {
  showPrice: number;
};

const Cart = ({ showPrice }: totalPriceType) => {
  return (
    <div
      className={`${
        showPrice > 0 ? "cart-active" : "cart"
      } button-primary transition flex flex-col justify-center items-center`}
    >
      <img width={28} height={28} src={CartImg} alt="" />
      <p>Prix total du panier : </p>
      <p style={{ fontWeight: "bold" }}>{(showPrice / 100).toFixed(2)} €</p>
    </div>
  );
};

export default Cart;
