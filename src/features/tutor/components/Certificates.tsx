import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "@/store/store";
import { uploadTutorDocument } from "@/features/tutor/redux/tutor.slice";
import { fetchCertificateUrl } from "@/features/tutor/api/tutor.api";

type Certificate = {
  url: string | null;
  key: string | null;
};

type Props = {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
};

const Certificates: React.FC<Props> = ({ certificates, onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { uploadLoading } = useSelector((state: RootState) => state.tutor);

  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [viewingKey, setViewingKey] = useState<string | null>(null);

  const handleFileSelect = (selected: File) => setFile(selected);

  const handleAdd = async () => {
    if (!file) return;

    const result = await dispatch(uploadTutorDocument(file));
    if (!uploadTutorDocument.fulfilled.match(result)) return;

    const { url, key } = result.payload;
    onChange([...certificates, { url, key }]);
    setFile(null);
  };

  const handleRemove = (index: number) => {
    onChange(certificates.filter((_, i) => i !== index));
  };

  // Always use signed URL since url field is unreliable
  const handleView = async (key: string): Promise<void> => {
    try {
      setViewingKey(key);
      const signedUrl = await fetchCertificateUrl(key);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Failed to open certificate");
    } finally {
      setViewingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#152332] to-[#0E1624] rounded-2xl p-8 border border-[#1F2E3F] shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Certificates</h2>
        <p className="text-gray-400 text-sm mb-6">
          Upload your certificates (optional).
        </p>

        {/* FILE UPLOAD */}
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
            ${drag ? "border-primary bg-primary/10" : "border-[#1F2E3F]"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const dropped = e.dataTransfer.files[0];
            if (dropped) handleFileSelect(dropped);
          }}
        >
          <input
            type="file"
            id="cert-upload"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) handleFileSelect(selected);
            }}
          />
          <label htmlFor="cert-upload" className="cursor-pointer">
            <span className="material-symbols-outlined text-3xl text-primary">
              upload
            </span>
            {file ? (
              <p className="text-white mt-2">{file.name}</p>
            ) : (
              <>
                <p className="text-white mt-2">Upload Certificate</p>
                <p className="text-gray-400 text-xs">Drag & drop or click</p>
              </>
            )}
          </label>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={uploadLoading || !file}
          className="mt-4 bg-primary px-5 py-2 rounded-xl text-white disabled:opacity-50"
        >
          {uploadLoading ? "Uploading..." : "+ Add Certificate"}
        </button>

        {/* LIST */}
        {certificates.length > 0 && (
          <div className="space-y-3 mt-6">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border border-[#1F2E3F] rounded-xl bg-[#0E1624]"
              >
                <div>
                  <p className="text-white text-sm">Certificate {i + 1}</p>
                  {cert.key && (
                    <button
                      type="button"
                      onClick={() => handleView(cert.key!)}
                      disabled={viewingKey === cert.key}
                      className="text-blue-400 text-xs hover:underline inline-flex items-center gap-1 mt-1 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                      {viewingKey === cert.key ? "Opening..." : "View"}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="text-gray-500 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;