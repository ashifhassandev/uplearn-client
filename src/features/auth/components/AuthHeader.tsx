interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
  <div className="text-center mb-8">
    <h1 className="font-bold text-3xl md:text-4xl tracking-tight text-white">
      {title}
    </h1>
    <p className="mt-3 text-slate-400">{subtitle}</p>
  </div>
);

export default AuthHeader;