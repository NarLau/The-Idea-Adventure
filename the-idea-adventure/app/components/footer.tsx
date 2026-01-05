import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© 2025 The Idea Adventure</p>

        <nav className="footer-nav">
          <Link to="/project-info">About</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}