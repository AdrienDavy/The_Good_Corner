import { useEffect, useState } from "react";
import "./AdEditor.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OptionSelect from "../components/OptionSelect";
import ButtonTriggerModal from "../components/ButtonTriggerModal";
import CategoryEditor from "../components/CategoryEditor";
import { useMutation, useQuery } from "@apollo/client";
import { queryCategories } from "../queries/QueryCategories";
import { queryAd } from "../queries/QueryAd";
import { queryTags } from "../queries/QueryTags";
import { mutationCreateAd } from "../queries/CreateAd";
import { mutationUpdateAd } from "../queries/UpdateAd";
import MultiSelect from "../components/MultiSelect";
import TagEditor from "../components/TagEditor";
import { toast } from "react-toastify";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const AdEditor = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id && Number(params.id);
  const locationPathname = useLocation();
  const isEditPage = locationPathname.pathname.includes("edit");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [owner, setOwner] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tagIds, setTagIds] = useState<number[]>([]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // --------------------------------QUERIES------------------------------------------

  const { data: categoriesData } = useQuery(queryCategories);
  const categories = categoriesData?.categories;

  const { data: tagsData } = useQuery(queryTags);
  const tags = tagsData?.tags ?? undefined;

  const { data: adData } = useQuery(queryAd, {
    variables: { id: id ? id.toString() : "" },
    skip: !id,
  });
  const ad = adData?.ad;

  const [doCreateAd, { loading: createLoading }] = useMutation(
    mutationCreateAd,
    {
      refetchQueries: [queryAd],
      onError: (error) => handleValidationErrors(error, setFieldErrors),
    }
  );

  const [doUpdateAd, { loading: updateLoading }] = useMutation(
    mutationUpdateAd,
    { refetchQueries: [queryAd] }
  );

  // ----------------------------------------------------------------------------------

  useEffect(() => {
    if (ad && isEditPage) {
      setTitle(ad.title);
      setDescription(ad.description ?? "");
      setPrice(ad.price);
      setLocation(ad.location);
      setPicture(ad.picture);
      setOwner(ad.owner);
      setCategoryId(ad.category ? Number(ad.category.id) : null);
      const tagsIds: number[] = [];
      for (const tag of ad.tags) {
        tagsIds.push(Number(tag.id));
      }
      setTagIds(tagsIds);
    }
  }, [ad, isEditPage]);

  useEffect(() => {
    if (locationPathname.pathname === "/ads/new") {
      setTitle("");
      setDescription("");
      setPrice(0);
      setLocation("");
      setPicture("");
      setOwner("");
      setCategoryId(null);
      setTagIds([]);
    }
  }, [locationPathname]);

  const handleSubmit = async () => {
    try {
      if (ad) {
        const { data } = await doUpdateAd({
          variables: {
            id: ad.id,
            data: {
              title,
              description,
              price,
              location,
              picture,
              owner,
              category: categoryId ? { id: categoryId.toString() } : null,
              tags: tagIds.map((id) => ({ id: id.toString() })),
            },
          },
        });
        toast.success("Offre modifiée avec succès !", {
          className: "toast-success bg-primary",
          autoClose: 3000,
          position: "top-right",
        });
        if (data?.updateAd) {
          navigate(`/ads/${data.updateAd.id}`, { replace: true });
        }
      } else {
        if (fieldErrors && title === "") {
          setFieldErrors(() => ({
            title: `${fieldErrors.title}`,
          }));
        }
        if (!categoryId) {
          setFieldErrors(() => ({
            category: "Une catégorie doit être sélectionnée.",
          }));
          setTimeout(() => {
            setFieldErrors(() => ({
              category: "",
            }));
          }, 2000);
          return; // On arrête la soumission si `categoryId` est manquant
        }
        const { data } = await doCreateAd({
          variables: {
            data: {
              title,
              description,
              price,
              location,
              picture,
              owner,
              category: { id: categoryId.toString() },
              tags: tagIds.map((id) => ({ id: id.toString() })),
            },
          },
        });
        toast.success("Offre crée avec succès !", {
          className: "toast-success bg-primary",
          autoClose: 3000,
          position: "top-right",
        });
        navigate(`/ads/${data?.createAd.id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className=" bg-light p-8 rounded-lg flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className=" w-full">
        <input
          className={`w-full py-2 px-1 border-2 rounded-lg ${
            fieldErrors.title ? "border-red-500" : "border-primary"
          }`}
          type="text"
          value={title}
          placeholder="Titre de l'annonce"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      {fieldErrors.title && (
        <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
      )}

      <label className=" w-full">
        <textarea
          className=" w-full py-2 px-1 border-2 border-primary rounded-lg "
          value={description}
          placeholder="Description de l'annonce"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className=" w-full">
        <input
          className=" w-full py-2 px-1 border-2 border-primary rounded-lg "
          type="number"
          value={price}
          placeholder="Prix"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>
      <label className=" w-full">
        <input
          className=" w-full py-2 px-1 border-2 border-primary rounded-lg "
          type="text"
          value={location}
          placeholder="Localisation"
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label className=" w-full">
        <input
          className=" w-full py-2 px-1 border-2 border-primary rounded-lg "
          type="text"
          value={picture}
          placeholder="Url de l'image"
          onChange={(e) => setPicture(e.target.value)}
        />
      </label>
      <label className=" w-full">
        <input
          className=" w-full py-2 px-1 border-2 border-primary rounded-lg "
          type="mail"
          value={owner}
          placeholder="johndoe@mail.com"
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>
      <div className="flex">
        <OptionSelect
          options={categories}
          onSelect={(category) => setCategoryId(Number(category.id))}
          actualOption={isEditPage && ad?.category ? ad.category : null}
          defaultOption="Séléctionner une catégorie"
        />

        <ButtonTriggerModal id="modalCategory" title="Ajouter une catégorie">
          <CategoryEditor />
        </ButtonTriggerModal>
      </div>
      {fieldErrors.category && !categoryId && (
        <p className="text-red-500 text-sm">{fieldErrors.category}</p>
      )}
      <div className="flex">
        <MultiSelect
          dataIds={tagIds}
          setDataIds={setTagIds}
          tagsData={tags?.map(tag => ({ ...tag, id: Number(tag.id) }))}
        />
        <ButtonTriggerModal id="modalTag" title="Ajouter un tag">
          <TagEditor />
        </ButtonTriggerModal>
      </div>
      <button className="button" onClick={handleSubmit}>
        {ad
          ? `${updateLoading ? "Modification..." : "Modifier l'annonce"}`
          : `${createLoading ? "Création..." : "Créer une annonce"}`}
      </button>
    </form>
  );
};

export default AdEditor;
