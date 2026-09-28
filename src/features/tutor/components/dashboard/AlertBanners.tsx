interface Alert {
  icon: string;
  message: string;
  containerClass: string;
}

const alerts: Alert[] = [
  {
    icon: "timer",
    message: 'Your session "Advanced React Patterns" is starting in 15 minutes.',
    containerClass: "bg-blue-900/50 border border-blue-600 text-blue-200",
  },
  {
    icon: "check_circle",
    message: "Your payout of ₹25,000 has been processed successfully.",
    containerClass: "bg-primary/20 border border-primary text-primary-200",
  },
];

const AlertBanners = (): React.JSX.Element => {
  return (
    <div className="space-y-4 mb-8">
      {alerts.map((alert: Alert) => (
        <div
          key={alert.icon}
          className={`${alert.containerClass} px-4 py-3 rounded-xl relative flex items-center gap-4`}
          role="alert"
        >
          <span className="material-symbols-outlined">{alert.icon}</span>
          <span className="block sm:inline">{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertBanners;