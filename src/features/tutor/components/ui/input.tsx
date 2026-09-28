type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ label, error, ...props }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          fontSize: 12,
          color: "#24A163",
          fontWeight: 600,
          marginBottom: 4,
          display: "block",
        }}
      >
        {label}
      </label>

      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: error ? "1px solid red" : "1px solid #1F2E3F",
          background: "#0b121e",
          color: "#fff",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;