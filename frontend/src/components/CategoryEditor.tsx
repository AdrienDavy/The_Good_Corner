import { useState } from "react";
import useApi from "../services/useApi";
import { CategoryType } from "../types";

const CategoryEditor = (props: { handleCategoryCreated: () => void }) => {
  const api = useApi();
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    try {
      await api.post<CategoryType>("/categories", {
        name,
      });
      setName("");
      props.handleCategoryCreated();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="absolute flex flex-col bg-gray-100 top-full right-0 z-20 w-40 border-primary border-2 rounded-xl p-2">
      <label className="pb-2 bg-gray-100">
        <input
          className="ad-editor-text-field !border-none"
          type="text"
          value={name}
          placeholder="Nouvelle catégorie"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="button" onClick={handleSubmit}>
        Créer ma catégorie
      </button>
    </div>
  );
};

export default CategoryEditor;
