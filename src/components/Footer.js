import { FiLinkedin, FiMail } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <p>
                © 2026 Academic Management System
            </p>

            <p>
                Developed by <strong>Akshat Pawar</strong>
            </p>

            <div className="footer-links">
                <a
                    href="https://www.linkedin.com/in/akshat-pawar/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                >
                    <FiLinkedin />
                </a>

                <a
                    href="mailto:aksshatpawar5@gmail.com"
                    aria-label="Email"
                >
                    <FiMail />
                </a>

                <a
                    href="https://github.com/akshatpawar-1"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                >
                    <FaGithub />
                </a>
            </div>
        </footer>
    );
}

export default Footer;