import { useState } from "react";
import useApi from "../services/useApi";
import { TagType } from "../types";

const TagEditor = (props: { handleTagCreated: () => void }) => {
  const api = useApi();
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    try {
      await api.post<TagType>("/tags", {
        name,
      });
      setName("");
      props.handleTagCreated();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="absolute flex flex-col bg-gray-100 top-full right-0 z-20 w-40 border-primary border-2 rounded-xl p-2">
      <label className="pb-2">
        <input
          className="ad-editor-text-field !border-none"
          type="text"
          value={name}
          placeholder="Nouveau tag"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="button" onClick={handleSubmit}>
        Créer mon tag
      </button>
    </div>
  );
};

export default TagEditor;
