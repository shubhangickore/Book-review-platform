import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Book Review Platform. All rights reserved.
    </footer>
  );
};

export default Footer;
