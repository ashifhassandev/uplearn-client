import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import type { Control, UseFormSetValue } from "react-hook-form";
import type { OnboardingFormData } from "../schema/registration.schema";

type Props = {
  control: Control<OnboardingFormData>;
  setValue: UseFormSetValue<OnboardingFormData>;
};

type ExperienceType = OnboardingFormData["experiences"][number];
type EducationType = OnboardingFormData["education"][number];

const Experience: React.FC<Props> = ({ control, setValue }) => {
  const {
    fields: expFields,
    append: addExp,
    remove: removeExp,
    update: updateExp,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: eduFields,
    append: addEdu,
    remove: removeEdu,
    update: updateEdu,
  } = useFieldArray({ control, name: "education" });

  // useWatch for all three
  const experiences = useWatch({
    control,
    name: "experiences",
  }) as ExperienceType[];
  const education = useWatch({ control, name: "education" }) as EducationType[];
  const skills = useWatch({ control, name: "skills" }) as string[];

  const [isExpModalOpen, setExpModalOpen] = useState(false);
  const [isEduModalOpen, setEduModalOpen] = useState(false);

  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);

  const [expForm, setExpForm] = useState<ExperienceType>({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  const [eduForm, setEduForm] = useState<EducationType>({
    degree: "",
    institution: "",
    year: "",
  });

  const [skillInput, setSkillInput] = useState("");

  // Experience handlers
  const openAddExp = () => {
    setEditingExpIndex(null);
    setExpForm({ role: "", company: "", duration: "", description: "" });
    setExpModalOpen(true);
  };

  const openEditExp = (index: number) => {
    setEditingExpIndex(index);
    setExpForm({ ...experiences[index] });
    setExpModalOpen(true);
  };

  const handleSaveExp = () => {
    if (!expForm.role || !expForm.company) return;
    if (editingExpIndex !== null) {
      updateExp(editingExpIndex, expForm);
    } else {
      addExp(expForm);
    }
    setExpModalOpen(false);
  };

  // Education handlers
  const openAddEdu = () => {
    setEditingEduIndex(null);
    setEduForm({ degree: "", institution: "", year: "" });
    setEduModalOpen(true);
  };

  const openEditEdu = (index: number) => {
    setEditingEduIndex(index);
    setEduForm({ ...education[index] });
    setEduModalOpen(true);
  };

  const handleSaveEdu = () => {
    if (!eduForm.degree || !eduForm.institution) return;
    if (editingEduIndex !== null) {
      updateEdu(editingEduIndex, eduForm);
    } else {
      addEdu(eduForm);
    }
    setEduModalOpen(false);
  };

  // Skills handlers — setValue instead of useFieldArray
  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const current = skills ?? [];
    setValue("skills", [...current, skillInput.trim()]);
    setSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    const current = skills ?? [];
    setValue(
      "skills",
      current.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-card-gradient rounded-2xl p-8 shadow-2xl border border-[#1F2E3F]">
        <h1 className="text-3xl font-black text-white mb-6">
          Professional Journey
        </h1>

        {/* ── EXPERIENCE ── */}
        <section className="mb-10">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Work Experience</h2>
            <button
              type="button"
              onClick={openAddExp}
              className="bg-primary px-4 py-2 rounded-lg text-white hover:scale-105 transition"
            >
              + Add
            </button>
          </div>

          <div className="space-y-4">
            {experiences?.map((exp, i) => (
              <div
                key={expFields[i]?.id || i}
                className="p-5 border border-[#1F2E3F] rounded-xl hover:bg-[#111C2E] transition"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {exp.role}
                    </p>
                    <p className="text-gray-400">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openEditExp(i)}>
                      ✏️
                    </button>
                    <button type="button" onClick={() => removeExp(i)}>
                      🗑
                    </button>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="mb-10">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Education</h2>
            <button
              type="button"
              onClick={openAddEdu}
              className="bg-primary px-4 py-2 rounded-lg text-white hover:scale-105 transition"
            >
              + Add
            </button>
          </div>

          <div className="space-y-4">
            {education?.map((edu, i) => (
              <div
                key={eduFields[i]?.id || i}
                className="p-5 border border-[#1F2E3F] rounded-xl hover:bg-[#111C2E] transition"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {edu.degree}
                    </p>
                    <p className="text-gray-400">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.year}</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openEditEdu(i)}>
                      ✏️
                    </button>
                    <button type="button" onClick={() => removeEdu(i)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills?.map((skill, i) => (
              <span
                key={i}
                className="bg-primary/20 px-3 py-1 rounded-full text-primary flex items-center gap-2"
              >
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(i)}>
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="bg-[#0E1624] border border-[#1F2E3F] px-3 py-2 rounded-lg text-white"
              placeholder="Add skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-primary px-4 py-2 rounded-lg text-white"
            >
              Add
            </button>
          </div>
        </section>
      </div>

      {/* ── EXPERIENCE MODAL ── */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 bg-[#0E1624] p-6 rounded-2xl w-[420px] border border-slate-700 shadow-xl space-y-3">
            <h2 className="text-white text-lg font-bold">
              {editingExpIndex !== null ? "Edit" : "Add"} Experience
            </h2>
            <input
              value={expForm.role}
              onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
              placeholder="Role"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <input
              value={expForm.company}
              onChange={(e) =>
                setExpForm({ ...expForm, company: e.target.value })
              }
              placeholder="Company"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <input
              value={expForm.duration}
              onChange={(e) =>
                setExpForm({ ...expForm, duration: e.target.value })
              }
              placeholder="Duration"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <textarea
              value={expForm.description}
              onChange={(e) =>
                setExpForm({ ...expForm, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={() => setExpModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveExp}
                className="bg-primary px-4 py-2 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDUCATION MODAL ── */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 bg-[#0E1624] p-6 rounded-2xl w-[420px] border border-slate-700 shadow-xl space-y-3">
            <h2 className="text-white text-lg font-bold">
              {editingEduIndex !== null ? "Edit" : "Add"} Education
            </h2>
            <input
              value={eduForm.degree}
              onChange={(e) =>
                setEduForm({ ...eduForm, degree: e.target.value })
              }
              placeholder="Degree"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <input
              value={eduForm.institution}
              onChange={(e) =>
                setEduForm({ ...eduForm, institution: e.target.value })
              }
              placeholder="Institution"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <input
              value={eduForm.year}
              onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
              placeholder="Year"
              className="w-full p-3 bg-transparent border rounded-lg text-white"
            />
            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={() => setEduModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdu}
                className="bg-primary px-4 py-2 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;