import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { fetchTutorProfile } from "@/features/tutor/api/tutor.api";

import { Orb, GridOverlay } from "../components/application-status/shared";
import { orbConfig } from "../components/application-status/application-status.constants";
import type { ApplicationStatus } from "../components/application-status/application-status.constants";
import LoadingView from "../components/application-status/LoadingView";
import PendingView from "../components/application-status/PendingView";
import RejectedView from "../components/application-status/RejectedView";

const TutorApplicationStatusPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const tickRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchTutorProfile();
        const normalizedStatus =
          profile.applicationStatus?.toUpperCase() as ApplicationStatus;
        setStatus(normalizedStatus);
        setRejectionReason(profile.rejectionReason ?? null);
      } catch {
        setStatus("PENDING");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Animate tick ring only when PENDING
  useEffect(() => {
    if (status !== "PENDING") return;
    const el = tickRef.current;
    if (!el) return;
    el.style.strokeDashoffset = "283";
    el.style.transition =
      "stroke-dashoffset 0.9s cubic-bezier(0.65,0,0.35,1) 0.3s";
    requestAnimationFrame(() => {
      el.style.strokeDashoffset = "0";
    });
  }, [status]);

  useEffect(() => {
    if (user?.role === "tutor") {
      navigate("/tutor/dashboard");
    }
  }, [user?.role, navigate]);

  const firstName = user?.firstName ?? "there";
  const orbs = status ? orbConfig[status] : orbConfig.PENDING;

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      <main className="flex-1 relative">
        <Orb
          className={`w-[600px] h-[600px] ${orbs.a} top-[-200px] left-[-200px]`}
        />
        <Orb
          className={`w-[500px] h-[500px] ${orbs.b} bottom-[-100px] right-[-150px]`}
        />
        <Orb className={`w-[300px] h-[300px] ${orbs.c} top-[40%] left-[60%]`} />
        <GridOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {loading && <LoadingView />}

          {!loading && status === "PENDING" && (
            <PendingView
              firstName={firstName}
              tickRef={tickRef}
              status={status}
            />
          )}

          {!loading && status === "REJECTED" && (
            <RejectedView firstName={firstName} reason={rejectionReason} />
          )}
        </div>
      </main>
      <style>{`
        @keyframes draw-check {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0;  }
        }
      `}</style>
    </div>
  );
};

export default TutorApplicationStatusPage;