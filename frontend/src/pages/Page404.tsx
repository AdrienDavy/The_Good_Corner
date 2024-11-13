import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      Oups, la page que vous cherchez n'existe pas.
      <Link to="/">Retourner à l'accueil</Link>
    </div>
  );
};

export default Page404;
