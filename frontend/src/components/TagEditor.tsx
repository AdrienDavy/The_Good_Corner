import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { mutationCreateTag } from "../queries/CreateTag";
import { TagType } from "../types";
import { queryTags } from "../queries/QueryTags";
import { toast } from "react-toastify";
import { mutationDeleteTag } from "../queries/DeleteTag";
import OptionSelect from "./OptionSelect";
// import useClickOutside from "../hooks/useClickOutside";

const TagEditor = () => {
  const [tagId, setTagId] = useState<number | null>(null);
  const [tagName, setTagName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { data: tagsData } = useQuery(queryTags, { skip: !isOpen });
  const tags = tagsData?.tags;

  const [doCreateTag, { error: createTagError, loading: createTagLoading }] =
    useMutation<{
      createTag: TagType;
    }>(mutationCreateTag, {
      refetchQueries: [{ query: queryTags }],
    });
  const [doDeleteTag, { error: deleteCatError, loading: deleteCatLoading }] =
    useMutation<{
      deleteTag: TagType;
    }>(mutationDeleteTag, {
      refetchQueries: [{ query: queryTags }],
    });

  // const ModalRef = useRef(null);
  // useClickOutside(
  //   ModalRef,
  //   () => setIsOpen(false),
  //   isOpen,
  //   300 // Durée de l'animation
  // );

  const handleSubmit = async () => {
    try {
      await doCreateTag({
        variables: {
          data: {
            name: tagName,
          },
        },
      });

      toast.success("Tag créé avec succès !", {
        className: "toast-success bg-primary",
        autoClose: 3000,
        position: "top-right",
      });
      setTagName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await doDeleteTag({
        variables: {
          id: tagId,
        },
      });

      toast.success("Tag supprimé avec succès !", {
        className: "toast-success bg-primary",
        autoClose: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    isOpen && (
      // <div className="fixed w-full h-full top-0 left-0 backdrop-blur-[2px] bg-gradient-to-br from-[rgba(242,225,183,0.2)] to-[rgba(228,202,135,0.4)] ">
      <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-yellow-400">
        <div className="z-50 w-full h-full flex justify-end pb-2">
          <svg
            onClick={() => setIsOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className=" cursor-pointer w-6 h-6 text-primary hover:text-primaryHover"
          >
            <path d="M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1ZM12,21c-4.96,0-9-4.04-9-9S7.04,3,12,3s9,4.04,9,9-4.04,9-9,9Z" />
            <path d="M15.71,8.29c-.39-.39-1.02-.39-1.41,0l-2.29,2.29-2.29-2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2.29,2.29-2.29,2.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l2.29-2.29,2.29,2.29c.2.2.45.29.71.29s.51-.1.71-.29c.39-.39.39-1.02,0-1.41l-2.29-2.29,2.29-2.29c.39-.39.39-1.02,0-1.41Z" />
          </svg>
        </div>
        <label className="pb-2 bg-gray-100">
          <input
            className="ad-editor-text-field !border-none"
            type="text"
            value={tagName}
            placeholder="Nouveau tag"
            onChange={(e) => setTagName(e.target.value)}
          />
        </label>
        <button
          className="button mb-8"
          onClick={handleSubmit}
          disabled={createTagLoading}
        >
          {createTagLoading ? "Création..." : "Créer un tag"}
        </button>
        {createTagError && (
          <p className="text-red-500 py-2">Erreur : {createTagError.message}</p>
        )}
        <OptionSelect
          options={tags ?? []}
          onSelect={(tag) => setTagId(Number(tag.id))}
          actualOption={null}
          defaultOption="Sélectionner un tag"
        />
        <button
          className="button mt-2"
          onClick={handleDelete}
          disabled={deleteCatLoading}
        >
          {deleteCatLoading ? "Suppression..." : "Supprimer une tag"}
        </button>
        {deleteCatError && (
          <p className="text-red-500 py-2">Erreur : {deleteCatError.message}</p>
        )}
      </div>
      // </div>
    )
  );
};

export default TagEditor;
