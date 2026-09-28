import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "@/store/store";
import { applyForTutor } from "../redux/tutor.slice";

import Stepper from "../layout/Stepper";
import Button from "../components/ui/Button";
import Navbar from "@/components/student/Navbar";
import Sidebar from "../components/sidebar/RegistrationSidebar";
import RightPanel from "../components/sidebar/RightPanel";
import Personal from "../components/Personal";
import Experience from "../components/Experience";
import Certificates from "../components/Certificates";

import { onboardingSchema } from "../schema/registration.schema";
import type { OnboardingFormData } from "../schema/registration.schema";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RegistrationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { applyLoading, applyError } = useSelector(
    (state: RootState) => state.tutor,
  );

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [savedData, setSavedData] = useLocalStorage<OnboardingFormData>(
    "onboarding",
    {
      headline: "",
      bio: "",
      experiences: [],
      education: [],
      skills: [],
      certificates: [],
      links: {
        linkedin: "",
        portfolio: "",
        github: "",
      },
    },
  );

  const [certificates, setCertificates] = useState<
    {
      url: string | null;
      key: string | null;
    }[]
  >(savedData.certificates || []);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: savedData,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const safeValue = value as Partial<OnboardingFormData>;
      setSavedData((prev) => ({
        ...prev,
        ...safeValue,
        experiences: safeValue.experiences ?? prev.experiences,
        education: safeValue.education ?? prev.education,
        skills: safeValue.skills ?? prev.skills,
        links: safeValue.links ?? prev.links,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setSavedData((prev) => ({ ...prev, certificates }));
  }, [certificates]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const validateStep = async () => {
    if (step === 1) return await trigger(["headline", "bio"]);
    if (step === 2)
      return await trigger(["experiences", "education", "skills"]);
    return true;
  };

  const next = async () => {
    setLoading(true);
    const valid = await validateStep();
    setLoading(false);
    if (!valid) return;
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const onSubmit: SubmitHandler<OnboardingFormData> = async (data) => {
    const payload = {
      bio: data.bio,
      headline: data.headline,
      education: data.education,
      certificates: certificates || [],
      experiences: data.experiences,
      skills: data.skills,
      links: {
        linkedin: data.links.linkedin || null,
        portfolio: data.links.portfolio || null,
        github: data.links.github || null,
      },
    };

    const result = await dispatch(applyForTutor(payload));

    if (applyForTutor.fulfilled.match(result)) {
      setSavedData({
        headline: "",
        bio: "",
        experiences: [],
        education: [],
        skills: [],
        certificates: [],
        links: { linkedin: "", portfolio: "", github: "" },
      });
      toast.success(
        "Application submitted successfully! We'll review it shortly.",
      );
      navigate("/tutor/application-status");
    } else {
      toast.error(
        (result.payload as string) || "Submission failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1624]">
      <Navbar />

      <div className="flex pt-16">
        <div className="w-64 flex-shrink-0">
          <Sidebar
            currentStep={step}
            completedSteps={Array.from({ length: step - 1 }, (_, i) => i + 1)}
          />
        </div>

        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <Stepper step={step} />

            {applyError && (
              <div className="mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {applyError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  {step === 1 && (
                    <Personal register={register} errors={errors} />
                  )}

                  {step === 2 && (
                    <Experience control={control} setValue={setValue} /> // ← added setValue
                  )}

                  {step === 3 && (
                    <Certificates
                      certificates={certificates}
                      onChange={(data) => setCertificates(data)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <Button type="button" onClick={back}>
                    Back
                  </Button>
                )}

                {step < 3 && (
                  <Button type="button" onClick={next} disabled={loading}>
                    {loading ? "Checking..." : "Next"}
                  </Button>
                )}

                {step === 3 && (
                  <Button type="submit" disabled={applyLoading}>
                    {applyLoading ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </main>

        <div className="w-[320px] p-6 hidden xl:block">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;