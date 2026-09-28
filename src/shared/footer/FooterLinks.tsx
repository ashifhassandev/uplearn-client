const FooterLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

      <ul className="space-y-3">
        <li>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            Courses
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            About Us
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterLinks;