import CategoryEditor from "../components/CategoryEditor";
import TagEditor from "../components/TagEditor";

const Create = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <CategoryEditor />
      </div>
      <div>
        <TagEditor />
      </div>
    </div>
  );
};

export default Create;
