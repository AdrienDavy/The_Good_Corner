import { useEffect, useState } from "react";
import useApi from "../services/useApi";
import "./AdEditor.css";
import DropdownCheckbox from "../components/DropdownCheckbox";
import { AdType, CategoryType, TagType } from "../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AdEditor = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id && Number(params.id);
  const [ad, setAd] = useState<AdType | null>(null);
  const locationPathname = useLocation();
  const api = useApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [owner, setOwner] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tagIds, setTagIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        {
          const result = await api.get<CategoryType[]>("/categories");
          setCategories(result.data);
          // if (result.data.length !== 0) {
          //   setCategoryId(result.data[0].id);
          // }
        }
        {
          const result = await api.get<TagType[]>("/tags");
          setTags(result.data);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchCategories();
  }, [api]);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        if (id) {
          const result = await api.get<AdType>(`/ads/${id}`);
          setAd(result.data);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };
    fetchAd();
  }, [api, id]);

  useEffect(() => {
    if (ad && locationPathname.pathname.includes("edit")) {
      setTitle(ad.title);
      setDescription(ad.description);
      setPrice(ad.price);
      setLocation(ad.location);
      setPicture(ad.picture);
      setOwner(ad.owner);
      setCategoryId(ad.category.id);
      if (ad.tags) {
        setTagIds(ad.tags.map((tag) => tag.id));
      }
    }
  }, [ad, locationPathname]);

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
        await api.put<AdType>(`/ads/${Number(ad.id)}`, {
          title,
          description,
          price,
          location,
          picture,
          owner,
          category: categoryId ? { id: categoryId } : null,
          tags: tagIds.map((id) => ({ id })),
        });
        navigate(`/ads/${ad.id}`, { replace: true });
      } else {
        const result = await api.post<AdType>("/ads", {
          title,
          description,
          price,
          location,
          picture,
          owner,
          category: categoryId ? { id: categoryId } : null,
          tags: tagIds.map((id) => ({ id })),
        });
        console.log("CREATED");
        navigate(`/ads/${result.data.id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="ad-editor-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        <input
          className="ad-editor-text-field"
          type="text"
          value={title}
          placeholder="Titre de l'annonce"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <textarea
          className="ad-editor-text-field"
          value={description}
          placeholder="Description de l'annonce"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        <input
          className="ad-editor-text-field"
          type="number"
          value={price}
          placeholder="Prix"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>
      <label>
        <input
          className="ad-editor-text-field"
          type="text"
          value={location}
          placeholder="Localisation"
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        <input
          className="ad-editor-text-field"
          type="text"
          value={picture}
          placeholder="Url de l'image"
          onChange={(e) => setPicture(e.target.value)}
        />
      </label>
      <label>
        <input
          className="ad-editor-text-field"
          type="mail"
          value={owner}
          placeholder="johndoe@mail.com"
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>

      <DropdownCheckbox
        idValue={categoryId}
        setIdValue={setCategoryId}
        datas={categories}
        dataIds={null}
        setDataIds={null}
        selectionWord="Catégorie"
        simpleDropdown={true}
        setCategories={setCategories}
        setTags={setTags}
      />

      <DropdownCheckbox
        idValue={null}
        setIdValue={null}
        datas={tags}
        dataIds={tagIds}
        setDataIds={setTagIds}
        selectionWord="tags"
        simpleDropdown={false}
        setCategories={setCategories}
        setTags={setTags}
      />

      <button className="button" onClick={handleSubmit}>
        {ad ? "Modifier mon annonce" : "Créer une annonce"}
      </button>
    </form>
  );
};

export default AdEditor;
