import { useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import "./index.css";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Navbar({ theme, toggleTheme}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        CKC<span>.</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className="active">Home</a></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a></li>
        <li><a href="#Skills" onClick={(e) => { e.preventDefault(); scrollTo("Skills"); }}>Skills</a></li>
        <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}>Portfolio</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
      </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme">
         <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"} ></i>
        </button>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars"></i>
         <span></span>
         <span></span>
         <span></span>
         </button>
      </nav>
  );
}
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <div className="hero-socials">
          <a
            className="social-pill s1"
            href="https://www.linkedin.com/in/chethana-kumari-c-847002362?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            className="social-pill s2"
            href="https://github.com/chethanakumari07"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <p className="greeting">Hello,</p>
        <h1>
          I'm 
          <h1 className="highlight">Chethana kumari C</h1>
          <h6>Software Developer</h6>
        </h1>
        <button className="hire-btn" onClick={() => scrollTo("contact")}>
        <span>�</span> Hire me
      </button>   
      </div>
          
      <div className="hero-image-wrapper">
        {/* Replace the src below with your own photo, e.g. /profile.jpg placed in the public folder */}
        <img
          src="/profile.jpg"
          alt="Chethana"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <div className="hero-image-placeholder" style={{ display: "none" }}>
          Add your photo at public/profile.jpg
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
      </div>
    </section>
  );
}
function Skills() {
  const skills = [
    "Java", "Python", "C", "PHP", "React", "Node.js",
    "Flask", "MySQL", "HTML/CSS/JS", "DSA"
  ];

  return (
    <section className="skills" id="Skills">
      <h2 className="section-title">My <span className="highlight">Skills</span></h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>{skill}</span>
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const serviceId = "service_t3e2caj";
    const templateId = "wqUC-fdW398zz7GD6";
    const public_key = "wqUC-fdW398zz7GD6";
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        }, 
        public_key
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
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
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="hire-btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "✉️ Send message"}
        </button>
        {status === "sent" && <p className="form-status success">Message sent — thank you!</p>}
        {status === "error" && <p className="form-status error">Something went wrong. Try again.</p>}
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