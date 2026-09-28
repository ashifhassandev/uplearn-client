type Props = {
  step: number;
};

const steps = ["Personal", "Experience", "Qualification"];

const Stepper: React.FC<Props> = ({ step }) => {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      {steps.map((label, i) => (
        <div key={i}>
          <span
            style={{
              fontWeight: "bold",
              color: step === i + 1 ? "#24A163" : "#888",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;