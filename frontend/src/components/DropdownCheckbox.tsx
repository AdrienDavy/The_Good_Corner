import React, { useEffect, useRef, useState } from "react";
import { CategoryType, TagType } from "../types";
import CategoryEditor from "./CategoryEditor";
import useApi from "../services/useApi";
import TagEditor from "./TagEditor";

type DropdownCheckboxProps = {
  idValue: number | null;
  setIdValue: React.Dispatch<React.SetStateAction<number | null>> | null;
  datas: TagType[] | CategoryType[];
  dataIds: number[] | null;
  setDataIds: React.Dispatch<React.SetStateAction<number[]>> | null;
  selectionWord: string;
  simpleDropdown: boolean;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
};

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  idValue,
  setIdValue,
  datas,
  dataIds,
  setDataIds,
  selectionWord,
  simpleDropdown,
  setCategories,
  setTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showTagEditor, setShowTagEditor] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const api = useApi();

  const fetchCategories = async () => {
    try {
      {
        const result = await api.get<CategoryType[]>("/categories");
        setCategories(result.data);
        console.log(result.data[0]);
        // if (result.data.length !== 0) {
        //   setCategoryId(result.data[0].id);
        // }
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchTags = async () => {
    try {
      const result = await api.get<TagType[]>("/tags");
      setTags(result.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Ferme le dropdown si on clique en dehors
      }
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setShowCategoryEditor(false); // Ferme le CategoryEditor si on clique en dehors
        setShowTagEditor(false); // Ferme le TagEditor si on clique en dehors
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, editorRef]);

  const handleSingleSelect = (id: number) => {
    if (setIdValue) {
      setIdValue(id);
      setIsOpen(false); // Fermer après la sélection dans le cas du mode "select"
    }
  };

  const handleMultiSelect = (id: number) => {
    if (setDataIds && dataIds) {
      if (dataIds.includes(id)) {
        setDataIds(dataIds.filter((existingId) => existingId !== id));
      } else {
        setDataIds([...dataIds, id]);
      }
    }
  };

  const pushTags = () => {
    if (!dataIds || !datas) return null;
    const selectedTags = datas.filter((tag) => dataIds.includes(tag.id));
    return (
      <div className="mt-2">
        {selectedTags.length > 0 ? (
          <span className="text-sm font-medium">
            {selectedTags.map((tag) => tag.name).join(", ")}
          </span>
        ) : (
          <span className="text-sm italic">Aucun tag sélectionné</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <div
        className="relative w-full min-w-[40px] h-[40px] p-2 rounded-lg border-2 border-primary flex justify-center items-center gap-1 text-[12px] font-bold text-[#ffa41b] bg-white cursor-pointer transition-all duration-250 ease-in-out"
        ref={dropdownRef}
      >
        <div
          className="flex justify-between items-center p-2 cursor-pointer w-full"
          onClick={toggleDropdown}
        >
          <span>
            {simpleDropdown && idValue === null
              ? `Sélectionner une ${selectionWord}` // Pas encore sélectionné
              : simpleDropdown && idValue !== null
              ? datas.find((item) => item.id === idValue)?.name
              : `Sélectionner les ${selectionWord}`}
          </span>
          <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full border-2 border-primary rounded-md bg-white z-10 max-h-40 overflow-y-auto transition-all duration-250 ease-in-out">
            <ul>
              {!simpleDropdown && pushTags()}
              {datas
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 transition-all duration-250 ease-in-out ${
                      simpleDropdown && idValue === item.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() =>
                      simpleDropdown
                        ? handleSingleSelect(item.id)
                        : handleMultiSelect(item.id)
                    }
                  >
                    <span>{item.name}</span>

                    {!simpleDropdown && dataIds && (
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={dataIds.includes(item.id)}
                        onChange={() => handleMultiSelect(item.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          pushTags();
                        }} // Pour empêcher la fermeture du dropdown au clic sur la checkbox
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div ref={editorRef} className="relative">
        <button
          title={`${
            showCategoryEditor || showTagEditor
              ? "Fermer la fenêtre"
              : `Ajouter ${
                  simpleDropdown ? "une nouvelle catégorie" : "un nouveau tag"
                }`
          }`}
          className="ml-2"
          type="button"
          onClick={() =>
            simpleDropdown
              ? setShowCategoryEditor(!showCategoryEditor)
              : setShowTagEditor(!showTagEditor)
          }
        >
          <svg
            className={`${
              !showCategoryEditor && !showTagEditor ? "rotate-45" : "rotate-0"
            } w-6 transition-all duration-100 ease-in`}
            id="Calque_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={`${
              !showCategoryEditor && !showTagEditor ? "#ffa41b" : "#DC143C"
            }`}
          >
            <path d="M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1ZM12,21c-4.96,0-9-4.04-9-9S7.04,3,12,3s9,4.04,9,9-4.04,9-9,9Z" />
            <path d="M15.71,8.29c-.39-.39-1.02-.39-1.41,0l-2.29,2.29-2.29-2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2.29,2.29-2.29,2.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l2.29-2.29,2.29,2.29c.2.2.45.29.71.29s.51-.1.71-.29c.39-.39.39-1.02,0-1.41l-2.29-2.29,2.29-2.29c.39-.39.39-1.02,0-1.41Z" />
          </svg>
        </button>
        {simpleDropdown
          ? showCategoryEditor && (
              <div className="">
                <CategoryEditor
                  handleCategoryCreated={() => {
                    setShowCategoryEditor(false);
                    fetchCategories();
                  }}
                />
              </div>
            )
          : showTagEditor && (
              <div className="">
                <TagEditor
                  handleTagCreated={() => {
                    setShowTagEditor(false);
                    fetchTags();
                  }}
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default DropdownCheckbox;
