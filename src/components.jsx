import React, { useEffect, useRef, useId, useState } from "react";
import {
  PawPrint,
  Heart,
  ArrowUpRight,
  X,
  Menu,
  ArrowRight,
} from "lucide-react";
import { useApp } from "./context";
export function Button({ children, href, secondary = false, ...props }) {
  const cls = `button ${secondary ? "secondary" : ""} ${props.className || ""}`;
  return href ? (
    <a {...props} className={cls} href={href}>
      {children}
    </a>
  ) : (
    <button type="button" {...props} className={cls}>
      {children}
    </button>
  );
}
export function Header({ route }) {
  const { user, logout, saved } = useApp();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => setOpen(false), [route]);
  return (
    <>
      <div className="announcement">
        A little love can change a whole life.{" "}
        <a href="#/pets">
          Find your companion <ArrowRight size={13} />
        </a>
      </div>
      <header className="header" onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          menuRef.current?.focus();
        }
      }}>
        <a className="brand" href="#/">
          <span className="brand-icon">
            <PawPrint />
          </span>
          pet heaven<span className="brand-dot">.</span>
        </a>
        <button
          className="icon mobile-menu"
          ref={menuRef}
          aria-controls="main-navigation"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-navigation" className={open ? "open" : ""} aria-label="Main navigation"
          onClick={() => setOpen(false)}>
          {[
            ["/", "Home"],
            ["/pets", "Find a pet"],
            ["/about", "Our story"],
            ["/care", "Pet care"],
            ["/contact", "Contact"],
          ].map(([path, label]) => (
            <a
              key={path}
              href={"#" + path}
              aria-current={route === path ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a className="mobile-link" href="#/saved">Saved pets ({saved.length})</a>
          <a className="mobile-link" href="#/community">Community</a>
          <a className="mobile-link" href="#/release">Rehome a pet</a>
          {!user && <a className="mobile-link" href="#/login">Log in</a>}
        </nav>
        <div className="header-actions">
          <a
            className="icon"
            href="#/saved"
            aria-label={`Saved pets (${saved.length})`}
          >
            <Heart size={20} />
            {saved.length > 0 && <small>{saved.length}</small>}
          </a>
          {user ? (
            <>
              <span className="user-name">Hi, {user.name.split(" ")[0]}</span>
              <button className="text-button" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <a className="login" href="#/login">
              Log in
            </a>
          )}
          <Button href={user ? "#/pets" : "#/signup"}>
            {user ? "Find a friend" : "Join our family"}
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <a className="brand" href="#/">
            <PawPrint />
            pet heaven.
          </a>
          <p>
            Every pet deserves a place to belong.
            <br />
            Let’s help them find it.
          </p>
        </div>
        <div>
          <h4>Find your way</h4>
          <a href="#/pets">Meet our pets</a>
          <a href="#/saved">Saved pets</a>
          <a href="#/about">Our mission & facilities</a>
          <a href="#/release">Rehome a pet</a>
        </div>
        <div>
          <h4>Here to help</h4>
          <a href="#/care">Care guides</a>
          <a href="#/community">Our community</a>
          <a href="#/contact">Get in touch</a>
        </div>
        <div>
          <h4>A home starts with you.</h4>
          <p>
            Become a member and
            <br />
            be part of their next chapter.
          </p>
          <a href="#/signup">Join the community ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pet Heaven · Student demonstration</span>
        <span>Lim EnLe · UOW 1036488 · ISIT207</span>
        <a href="#/credits">Credits & privacy</a>
      </div>
    </footer>
  );
}
export function SectionTitle({ eyebrow, title, children, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
export function PetCard({ pet, onOpen }) {
  const { saved, toggleSaved } = useApp();
  return (
    <article className="pet-card">
      <div className="pet-image">
        <button
          className="image-button"
          onClick={() => onOpen(pet)}
          aria-label={`Meet ${pet.name}`}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/${pet.id}.jpg`}
            alt={`${pet.name}, ${pet.breed}`}
            loading="lazy"
          />
        </button>
        <span className="availability">
          <i />
          Ready for a home
        </span>
        <button
          className={`save icon ${saved.includes(pet.id) ? "is-saved" : ""}`}
          aria-label={`${saved.includes(pet.id) ? "Unsave" : "Save"} ${pet.name}`}
          aria-pressed={saved.includes(pet.id)}
          onClick={() => toggleSaved(pet.id)}
        >
          <Heart
            size={19}
            fill={saved.includes(pet.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="pet-info">
        <div className="pet-title">
          <h3>{pet.name}</h3>
          <span>{pet.sex === "Male" ? "♂" : "♀"}</span>
        </div>
        <p>
          {pet.breed} <span>·</span> {pet.age}{" "}
          {pet.age === 1 ? "year" : "years"} old
        </p>
        <div className="pet-bottom">
          <span className="tag">{pet.tag}</span>
          <button
            className="round-arrow"
            onClick={() => onOpen(pet)}
            aria-label={`View ${pet.name} profile`}
          >
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
export function Modal({ title, children, onClose }) {
  const ref = useRef();
  const id = useId();
  useEffect(() => {
    const el = ref.current;
    const previous = document.activeElement;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onCancel={onClose}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const controls = ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]');
        const first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="modal-close icon"
        onClick={onClose}
        aria-label="Close dialog"
      >
        <X />
      </button>
      <h2 id={id} className="sr-only">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
export function PetModal({ pet, onClose }) {
  return (
    <Modal title={`Meet ${pet.name}`} onClose={onClose}>
      <div className="pet-detail">
        <img src={`${import.meta.env.BASE_URL}images/${pet.id}.jpg`} alt={`${pet.name}, ${pet.breed}`} />
        <div className="detail-copy">
          <span className="tag">Available for adoption</span>
          <h2>Hello, I’m {pet.name}.</h2>
          <p>{pet.description}</p>
          <dl>
            {[
              ["Age", pet.age + " years"],
              ["Gender", pet.sex],
              ["Size", pet.size],
              ["Energy", pet.energy],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <h3>My ideal home</h3>
          <p>{pet.home}</p>
          <p className="fine">
            Photo and profile are illustrative. Staff assess suitability and
            confirm health history before placement.
          </p>
          <Button href={`#/adopt/${pet.id}`} onClick={onClose}>
            Apply to adopt {pet.name}
            <Heart size={17} />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export function Field({ field, value, onChange, error }) {
  const id = useId();
  const common = {
    id,
    name: field.name,
    value: value ?? "",
    onChange: (e) => onChange(field.name, e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? id + "-error" : undefined,
    required: field.required,
  };
  return (
    <div className={`field ${field.wide ? "wide" : ""}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required && <span aria-hidden="true"> *</span>}
      </label>
      {field.options ? (
        <select {...common}>
          <option value="">Select an option</option>
          {field.options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea {...common} rows={4} maxLength={1500} />
      ) : (
        <input
          {...common}
          type={field.type || "text"}
          placeholder={field.placeholder || ""}
          min={field.min}
          max={field.max}
          step={field.step}
          autoComplete={field.autoComplete}
          maxLength={field.type === "password" ? 128 : 200}
        />
      )}
      {error && (
        <small id={id + "-error"} className="error">
          {error}
        </small>
      )}
    </div>
  );
}
