import { useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import profileAvatar from "./profile_avatar-removebg-preview.png";
import chethanacv from "./chethana cv (1).pdf";
import "./index.css";

const serviceId = "service_t3e2caj";
const templateId = "template_bof8h2h";
const publicKey = "wqUC-fdW398zz7GD6";


function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Navbar({ theme, toggleTheme}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">
        CKC<span>.</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); closeMenu(); }} className="active">Home</a></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); closeMenu(); }}>About</a></li>
        <li><a href="#Skills" onClick={(e) => { e.preventDefault(); scrollTo("Skills"); closeMenu(); }}>Skills</a></li>
        <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); closeMenu(); }}>Portfolio</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); closeMenu(); }}>Contact</a></li>
      </ul>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme">
        <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
      </button>

      <button
        className="mobile-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}>
        <i className="fa-solid fa-bars"></i>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <p className="greeting">Hello,</p>
        <h1>
          I'm <span className="highlight">Chethana</span>
          <br />
          Software Developer
        </h1>
        <p>
          I'm a final-year Information Science & Engineering student who
          builds full-stack web applications
        </p>
        <button className="hire-btn" onClick={() => scrollTo("contact")}>
          <span>💼</span> Hire me
        </button>
      </div>

      <div className="hero-image-wrapper">
        <img
          src={profileAvatar}
          alt="Chethana"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <div className="hero-image-placeholder" style={{ display: "none" }}>
          <img src={profileAvatar} alt="Chethana" />
        </div>
      </div>
    </section>
  );
}

function About() {

  return (
    <section className="about" id="about">
      <h2 className="section-title">About <span className="highlight">Me</span></h2>
      <div className="about-content">
        <p>
          I'm a B.E. Information Science & Engineering student (CGPA 9.22),
          graduating in 2027. I build full-stack applications end to end —
          from responsive frontends to the databases and APIs behind them —
          and I care about clean, usable design as much as working code.
        </p>
        <div>          
          <h3><span className="know me"> GET TO KNOW ME </span></h3>
          <button
            className="view-cv"
            onClick={() => window.open(chethanacv, "_blank")}
          >
            <span></span> View CV
          </button>
        </div>
        <div className="about-stats">
        <div className="stat-box"><div className="stat-num">3+</div><div className="stat-label">Years Learning</div></div>
        <div className="stat-box"><div className="stat-num">9</div><div className="stat-label">CGPA at BGSIT</div></div>
        <div className="stat-box"><div className="stat-num">3</div><div className="stat-label">Projects Shipped</div></div>
       </div>
      </div>
    </section>
  );
}
function Skills() {
  const skills = [
    "Python",
    "JavaScript",
    "React.js",
    "MySQL",
    "Git & GitHub",
    "DSA",
    "Node.js",
  ];

  return (
    <section className="skills" id="Skills">
      <h2 className="section-title">My <span className="highlight">Skills</span></h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill}>
            <div className="skill-name">{skill}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Portfolio() {
  const projects = [
    {
      title: "Quick-Aid",
      desc: "First-aid web app with an interactive BLS decision tree, NLP chatbot, and hospital finder.",
      stack: "HTML/CSS/JS · MySQL",
    },
    {
      title: "Petshop Management System",
      desc: "Admin dashboard with glassmorphism UI for managing pet shop inventory and records.",
      stack: "PHP · MySQL · HTML/CSS",
    },
    {
      title: "Accident Detection System",
      desc: "Hardware-based system that detects vehicle accidents and triggers alerts.",
      stack: "Arduino · C",
    },
    {
      title: "Graphical Password Authentication",
      desc: "Login system using image-based authentication as an alternative to text passwords.",
      stack: "python · MySQL",
    },
  ];

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="section-title">My <span className="highlight">Portfolio</span></h2>
      <div className="project-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <span className="project-stack">{p.stack}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", message: "", phone: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage("EmailJS credentials are missing. Add your real service ID, template ID, and public key from the EmailJS dashboard.");
      return;
    }

        try {
      await emailjs.send(serviceId, templateId, 
        {
          first_name: form.first_name,
          last_name: form.last_name,
          reply_to: form.email,
          phone: form.phone || "Not provided",
          time: new Date().toLocaleString(),
          message: form.message,
        },
        publicKey
      );

      setStatus("sent");
      setForm({ first_name: "", last_name: "", email: "", message: "", phone: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Check your EmailJS service ID, template ID, and public key.");
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
      <p className="contact-sub">
        Looking for internship or entry-level opportunities — feel free to reach out.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="hire-btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "✉️ Send message"}
        </button>
        {status === "sent" && <p className="form-status success">Message sent — thank you!</p>}
        {status === "error" && <p className="form-status error">{errorMessage || "Something went wrong. Try again."}</p>}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Chethana. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme=== "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
