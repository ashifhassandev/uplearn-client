import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { OnboardingFormData } from "../schema/registration.schema";

type Props = {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
};

const Personal: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* ✅ GRADIENT CARD */}
      <div className="bg-gradient-to-br from-[#152332] to-[#0E1624] rounded-2xl p-8 md:p-12 border border-[#1F2E3F] shadow-2xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Professional Profile
          </h2>
          <p className="text-gray-400 text-sm">
            Tell us a bit about your professional background and where students
            can find your work.
          </p>
        </div>

        <div className="space-y-8">
          {/* Headline */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Professional Headline
            </label>
            <input
              {...register("headline")}
              className="w-full bg-[#0E1624] text-white border border-[#1F2E3F] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 transition-all"
              placeholder="e.g., Senior Software Engineer at TechCorp"
            />
            {errors.headline && (
              <p className="text-red-400 text-xs">{errors.headline.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Short Bio</label>
            <textarea
              {...register("bio")}
              rows={4}
              maxLength={500}
              className="w-full bg-[#0E1624] text-white border border-[#1F2E3F] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 transition-all"
              placeholder="Briefly describe your expertise and teaching philosophy..."
            />
            <p className="text-xs text-gray-500 text-right">
              Max 500 characters
            </p>
            {errors.bio && (
              <p className="text-red-400 text-xs">{errors.bio.message}</p>
            )}
          </div>

          {/* URLs */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Portfolio */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                Website / Portfolio URL
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  language
                </span>
                <input
                  {...register("links.portfolio")}
                  type="url"
                  className="w-full bg-[#0E1624] text-white border border-[#1F2E3F] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 pl-12 pr-6 transition-all"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  link
                </span>
                <input
                  {...register("links.linkedin")}
                  type="url"
                  className="w-full bg-[#0E1624] text-white border border-[#1F2E3F] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 pl-12 pr-6 transition-all"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* GitHub */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-slate-300">
                GitHub Profile URL
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  code
                </span>
                <input
                  {...register("links.github")}
                  type="url"
                  className="w-full bg-[#0E1624] text-white border border-[#1F2E3F] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 pl-12 pr-6 transition-all"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;