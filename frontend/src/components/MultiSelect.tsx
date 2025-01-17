import React, { useRef, useState } from "react";
import { TagType } from "../types";
import { useQuery } from "@apollo/client";
import { queryTags } from "../api/QueryTags";
import useClickOutside from "../hooks/useClickOutside";

type MultiSelectProps = {
  dataIds: number[] | null;
  setDataIds: React.Dispatch<React.SetStateAction<number[]>> | null;
  tagsData: TagType[] | undefined;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  dataIds,
  setDataIds,
  tagsData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [tagItem, setTagItem] = useState("");
  console.log(tagItem);

  const isAnimating = useClickOutside(
    dropdownRef,
    () => setIsOpen(false),
    isOpen,
    400 // Durée de l'animation
  );

  const { data: tagsDataFromQuery } = useQuery(queryTags);
  const tags = tagsDataFromQuery?.tags || tagsData;

  const toggleDropdown = () => setIsOpen(!isOpen);

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
    if (!dataIds || !tags) return null;
    const selectedTags = tags.filter((tag) => dataIds.includes(Number(tag.id)));
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
    <div className="flex items-center w-full" ref={dropdownRef}>
      <div
        className="relative w-full min-w-[40px] h-[40px] p-2 rounded-lg border-2 border-primary flex justify-center items-center gap-1 text-[12px] font-bold text-[#ffa41b] bg-white cursor-pointer transition-all duration-250 ease-in-out"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center p-2 w-full">
          <span>Sélectionner les tags</span>
          <span
            className={`${
              isOpen ? " rotate-180" : " rotate-0"
            } duration-300 ml-2 ease-in-out`}
          >
            ▼
          </span>
        </div>

        {(isOpen || isAnimating) && (
          <div
            className={`${
              isAnimating ? " opacity-0 h-20" : "opacity-100 h-60"
            }  absolute top-full left-0 overflow-y-scroll w-full border-2 border-primary rounded-md bg-white z-10 duration-300 ease-in-out`}
          >
            <ul onClick={(e) => e.stopPropagation()}>
              <input
                className=" focus:bg-gray-100  focus:border-primary w-full shadow-2xl  text-primary p-2 overflow-y-scroll top-full flex-col flex justify-start bg-light custom-scrollbar transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Rechercher un tag..."
                value={tagItem}
                onChange={(e) => setTagItem(e.target.value)}
              />

              <div>
                <h2>Tags sélectionnés :</h2>
                {pushTags()}
              </div>

              {[...(tagsData ?? [])]
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((tag) => tag.name.includes(tagItem))
                .map((tag) => (
                  <li
                    key={tag.id}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                      dataIds?.includes(tag.id) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleMultiSelect(tag.id)}
                  >
                    <span>{tag.name}</span>
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      checked={dataIds?.includes(tag.id)}
                      onChange={() => handleMultiSelect(tag.id)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
