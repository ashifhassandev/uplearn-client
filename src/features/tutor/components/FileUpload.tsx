import { useState } from "react";

type Props = {
  label: string;
  onChange: (files: FileList | null) => void;
};

const FileUpload: React.FC<Props> = ({ label, onChange }) => {
  const [drag, setDrag] = useState(false);

  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
        transition-all duration-300
        ${drag ? "border-primary bg-primary/10" : "border-border-dark"}
        hover:border-primary/50 hover:bg-[#152332]/40
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        onChange(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        multiple
        className="hidden"
        id={label}
        onChange={(e) => onChange(e.target.files)}
      />

      <label htmlFor={label} className="cursor-pointer">
        <span className="material-symbols-outlined text-3xl text-primary">
          upload
        </span>

        <p className="text-white mt-2 font-medium">
          Upload {label}
        </p>

        <p className="text-gray-400 text-xs mt-1">
          Drag & drop or click to browse
        </p>
      </label>
    </div>
  );
};

export default FileUpload;