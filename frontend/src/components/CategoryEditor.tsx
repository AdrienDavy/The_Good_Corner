import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { mutationCreateCategory } from "../queries/CreateCategory";
import { CategoryType } from "../types";
import { queryCategories } from "../queries/QueryCategories";
import { toast } from "react-toastify";
import { mutationDeleteCategory } from "../queries/DeleteCategory";
import OptionSelect from "./OptionSelect";
// import useClickOutside from "../hooks/useClickOutside";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const CategoryEditor = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [fieldErrors, setFieldErrors] = useState({});

  const { data: categoriesData } = useQuery(queryCategories, { skip: !isOpen });
  const categories = categoriesData?.categories;

  const [
    doCreateCategory,
    { loading: createCatLoading, error: createCatError },
  ] = useMutation<{
    createCategory: CategoryType;
  }>(mutationCreateCategory, {
    refetchQueries: [{ query: queryCategories }],
  });

  // Log any GraphQL errors or network error that occurred

  const [doDeleteCategory, { loading: deleteCatLoading }] = useMutation<{
    deleteCategory: CategoryType;
  }>(mutationDeleteCategory, {
    refetchQueries: [{ query: queryCategories }],
    onError: (error) => handleValidationErrors(error, setFieldErrors),
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
      await doCreateCategory({
        variables: {
          data: {
            name: categoryName.trim(),
          },
        },
      });

      toast.success("Catégorie créée avec succès !", {
        className: "toast-success bg-primary",
        autoClose: 3000,
        position: "top-right",
      });

      setCategoryName("");
    } catch (err) {
      console.error("Erreur lors de la création :", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleDelete = async () => {
    try {
      if (categoryId) {
        await doDeleteCategory({
          variables: {
            id: categoryId,
          },
        });
        toast.success("Catégorie supprimée avec succès !", {
          className: "toast-success bg-primary",
          autoClose: 3000,
          position: "top-right",
        });
      } else {
        setFieldErrors(fieldErrors);
      }
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
        <div className="pb-2 bg-gray-100">
          <input
            className={`${
              fieldErrors ? "border-red-500" : "border-none"
            } w-full h-10 bg-light border-2 rounded-lg`}
            type="text"
            value={categoryName}
            placeholder="Nouvelle catégorie"
            onChange={handleChange}
          />
          {createCatError && (
            <div className="text-red-500 text-sm">Mauvaise entrée</div>
          )}
        </div>

        <button
          className="button mb-8"
          onClick={handleSubmit}
          disabled={createCatLoading}
        >
          {createCatLoading ? "Création..." : "Créer une catégorie"}
        </button>

        <OptionSelect
          options={categories}
          onSelect={(category) => setCategoryId(Number(category.id))}
          actualOption={null}
          defaultOption="Sélectionner une catégorie"
          // optionError={fieldErrors}
        />

        <button
          className="button mt-2"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          disabled={deleteCatLoading}
        >
          {deleteCatLoading ? "Suppression..." : "Supprimer une catégorie"}
        </button>
      </div>
      // </div>
    )
  );
};

export default CategoryEditor;
