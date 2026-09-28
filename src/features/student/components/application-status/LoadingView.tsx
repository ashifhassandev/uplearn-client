const LoadingView = () => (
  <div className="flex flex-col items-center justify-center py-40 gap-6">
    <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    <p className="text-slate-400 text-sm">Checking your application status...</p>
  </div>
);

export default LoadingView;