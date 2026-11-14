import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  PawPrint,
  Search,
  ShieldCheck,
  House,
  Users,
  Check,
  Mail,
  Leaf,
  Star,
} from "lucide-react";
import {
  Button,
  SectionTitle,
  PageIntro,
  PetCard,
  PetModal,
  Modal,
  Field,
} from "./components";
import { pets, careGuides } from "./data";
import { useApp } from "./context";
import { filterPets, validate, requestText, downloadText } from "./utils";
export function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="little-line" /> BIG HEARTS. SECOND CHANCES.
          </p>
          <h1>
            A little love.
            <br />A whole new
            <br />
            <em>beginning.</em>
          </h1>
          <p>
            Somewhere, a little soul is waiting for you.
            <br />
            Give an abandoned pet a loving home — and find
            <br className="desktop-break" /> a friend who makes yours complete.
          </p>
          <div className="hero-buttons">
            <Button href="#/pets">
              Find your best friend <ArrowUpRight size={19} />
            </Button>
            <a className="plain-link" href="#/about">
              Our story <ArrowRight size={17} />
            </a>
          </div>
          <p className="demo-caption">A fictional charity · Student demonstration · No real adoptions</p>
          <div className="hero-note">
            <span className="mini-paw">
              <PawPrint size={23} />
            </span>
            <div>
              <strong>Good hearts. Happy tails.</strong>
              <span>Adopt a companion. Change a life.</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-dog"
            src={`${import.meta.env.BASE_URL}images/buddy.jpg`}
            alt="A golden retriever looking up with a gentle expression"
            fetchPriority="high"
          />
          <div className="photo-label">
            <span>
              <i /> WAITING TO MEET YOU
            </span>
            <strong>
              Buddy <Heart size={21} />
            </strong>
            <small>3 years old · A heart of gold</small>
          </div>
          <div className="circle-note">
            a friend
            <br />
            for <em>life.</em>
            <PawPrint size={23} />
          </div>
          <div className="cat-inset">
            <img src={`${import.meta.env.BASE_URL}images/luna.jpg`} alt="A curious cat resting at home" />
            <span>Little paws. Endless love.</span>
          </div>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Heart />A second chance for every pet
        </span>
        <span>
          <ShieldCheck />
          Thoughtful, caring adoption
        </span>
        <span>
          <House />A home, not just a shelter
        </span>
      </div>
      <section className="section">
        <SectionTitle
          eyebrow="YOUR NEXT CHAPTER STARTS HERE"
          title="Meet your new favourite soul."
          action={
            <Button href="#/pets" secondary>
              Meet all our pets <ArrowUpRight size={17} />
            </Button>
          }
        >
          Different personalities. The same wish: a place to belong.
        </SectionTitle>
        <div className="pet-grid">
          {pets.slice(0, 3).map((p) => (
            <PetCard key={p.id} pet={p} onOpen={setSelected} />
          ))}
        </div>
      </section>
      <section className="story-band">
        <div className="story-photo">
          <img
            src={`${import.meta.env.BASE_URL}images/mochi.jpg`}
            alt="A cat enjoying a quiet moment"
            loading="lazy"
          />
          <span>Every small life matters.</span>
        </div>
        <div>
          <p className="eyebrow">MORE THAN A SHELTER</p>
          <h2>
            A safe place.
            <br />A fresh start.
            <br />
            <em>A forever home.</em>
          </h2>
          <p>
            Pet Heaven is built around one simple belief: no pet should be left
            behind. We offer abandoned cats and dogs care, comfort and a chance
            to begin again.
          </p>
          <p>
            From the first hello to the day they go home, our focus is on
            finding the right family for every personality.
          </p>
          <a className="plain-link" href="#/about">
            Get to know Pet Heaven <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="section">
        <SectionTitle
          eyebrow="A LITTLE GUIDANCE, A LOT OF LOVE"
          title="The journey to belonging."
        />
        <div className="steps">
          {[
            [
              "01",
              "Find your connection",
              "Browse profiles and discover a personality that fits your life.",
            ],
            [
              "02",
              "Let’s get to know you",
              "Join our community and share your home and lifestyle in an application.",
            ],
            [
              "03",
              "Start a new chapter",
              "Prepare your request for review. In the proposed service, staff would arrange a conversation and meeting.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="join-band">
        <div>
          <p className="eyebrow">THERE’S ROOM FOR ONE MORE</p>
          <h2>
            You could be their
            <br />
            favourite person.
          </h2>
        </div>
        <Button href="#/signup">
          Become a member <ArrowUpRight size={19} />
        </Button>
      </section>
      {selected && (
        <PetModal pet={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
export function Directory({ savedOnly = false }) {
  const { saved } = useApp();
  const [query, setQuery] = useState(""),
    [type, setType] = useState("All"),
    [age, setAge] = useState("All"),
    [sort, setSort] = useState("Featured"),
    [selected, setSelected] = useState(null);
  let found = filterPets(pets, { query, type, age, savedOnly, saved });
  if (sort === "Youngest first")
    found = [...found].sort((a, b) => a.age - b.age);
  if (sort === "Name A–Z")
    found = [...found].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="section directory">
      <PageIntro
        eyebrow={savedOnly ? "CLOSE TO YOUR HEART" : "FIND YOUR COMPANION"}
        title={
          savedOnly
            ? "Your saved little souls."
            : "A friend is waiting for you."
        }
      >
        Take your time. Get to know them. Every great friendship begins with a
        hello.
      </PageIntro>
      <div className="filters">
        <label className="search">
          <Search size={20} />
          <input
            aria-label="Search pets"
            placeholder="Search by name or breed…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="segmented" role="group" aria-label="Pet type">
          {["All", "Dog", "Cat"].map((t) => (
            <button
              key={t}
              aria-pressed={type === t}
              className={type === t ? "active" : ""}
              onClick={() => setType(t)}
            >
              {t === "All" ? "All pets" : t + "s"}
            </button>
          ))}
        </div>
        <label className="select-label">
          Age
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option>All</option>
            <option>Young</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>
        </label>
      </div>
      <div className="results-row">
        <span aria-live="polite">
          {found.length} {found.length === 1 ? "friend" : "friends"} waiting to
          meet you
        </span>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Featured</option>
            <option>Youngest first</option>
            <option>Name A–Z</option>
          </select>
        </label>
      </div>
      {found.length ? (
        <div className="pet-grid">
          {found.map((p) => (
            <PetCard pet={p} key={p.id} onOpen={setSelected} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <PawPrint size={40} />
          <h2>
            {savedOnly ? "No saved pets match yet." : "No little souls found."}
          </h2>
          <p>{savedOnly && saved.length === 0 ? "Tap the heart on a pet card to keep your favourites here." : "Try another search or clear your filters."}</p>
          <Button
            secondary
            onClick={() => {
              setQuery("");
              setAge("All");
              setType("All");
            }}
          >
            Clear filters
          </Button>
          {savedOnly && <Button href="#/pets">Explore pets</Button>}
        </div>
      )}
      <div className="soft-note">
        <Heart size={22} />
        <div>
          <strong>Not sure where to start?</strong>
          <p>Our care guides help you prepare for life with a new companion.</p>
        </div>
        <a href="#/care">Explore the guides ↗</a>
      </div>
      {selected && (
        <PetModal pet={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
export function About() {
  return (
    <>
      <section className="section">
        <PageIntro
          eyebrow="OUR STORY & MISSION"
          title="Second chances. Lasting love."
        >
          A caring bridge between a difficult goodbye and a hopeful new
          beginning.
        </PageIntro>
        <div className="about-split">
          <img
            src={`${import.meta.env.BASE_URL}images/daisy.jpg`}
            alt="A dog outdoors in a coastal setting"
          />
          <div>
            <h2>
              Every pet deserves
              <br />
              to feel at home.
            </h2>
            <p>
              Pet Heaven is a charity society supporting abandoned cats and
              dogs. Our purpose is to provide a safe place to recover and
              connect each pet with a suitable, committed family.
            </p>
            <p>
              We listen to owners who can no longer care for their pets,
              understand each animal’s needs and guide prospective adopters
              through a thoughtful matching process.
            </p>
            <Button href="#/pets">
              Meet our residents <ArrowUpRight size={18} />
            </Button>
          </div>
        </div>
      </section>
      <section className="section tinted">
        <SectionTitle
          eyebrow="CARE AT EVERY STEP"
          title="A place to feel safe."
        />
        <div className="info-grid">
          {[
            [
              House,
              "Comfortable living spaces",
              "Separate cat and dog areas, quiet resting corners and a predictable daily routine.",
            ],
            [
              Leaf,
              "Room to play",
              "Supervised enrichment spaces, scratching posts, toys and opportunities to explore.",
            ],
            [
              ShieldCheck,
              "Welfare first",
              "An intake assessment, access to veterinary care and careful review of each pet’s needs.",
            ],
            [
              Users,
              "Meet-and-greet space",
              "A calm space for staff to meet applicants and introduce potential companions.",
            ],
          ].map(([Icon, t, d]) => (
            <article className="info-card" key={t}>
              <Icon />
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <p className="fine">
          Facilities and operational details are proposed for this fictional
          assignment society.
        </p>
      </section>
      <section className="section">
        <SectionTitle
          eyebrow="RESPONSIBLE REHOMING"
          title="Support without judgement."
        />
        <p className="measure">
          Circumstances can change. If you need to release a pet, tell us about
          their routine, health and behaviour. A request starts a conversation;
          it does not guarantee immediate intake. Please continue caring for
          your pet until an arrangement is confirmed.
        </p>
        <Button href="#/release" secondary>
          Request rehoming support <ArrowRight size={17} />
        </Button>
      </section>
    </>
  );
}
const contactFields = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    autoComplete: "email",
  },
  {
    name: "message",
    label: "How can we help?",
    type: "textarea",
    required: true,
    minLength: 15,
    wide: true,
  },
];
export function Contact() {
  return (
    <section className="section">
      <PageIntro
        eyebrow="LET’S TALK"
        title="A caring conversation starts here."
      >
        Questions about adoption, membership or rehoming? We’re here to help you
        take the next step.
      </PageIntro>
      <div className="form-layout">
        <aside className="form-aside">
          <Mail size={32} />
          <h2>Get in touch</h2>
          <p>Adoption enquiries, rehoming support and membership questions.</p>
          <h3>Visits by appointment</h3>
          <p>
            In the proposed service, a staff member arranges a visit after
            reviewing your enquiry.
          </p>
          <div className="notice">
            Student demo: no real shelter address or staffed inbox is
            represented. Use sample details only.
          </div>
        </aside>
        <RequestForm kind="Enquiry" fields={contactFields} />
      </div>
      <div className="faq">
        <h2>A few helpful answers.</h2>
        {[
          [
            "Can I adopt immediately?",
            "No. Applications begin a review and interview process. Staff confirm suitability before any adoption.",
          ],
          [
            "Do I need to be a member?",
            "You can browse freely. Membership is required to make an adoption application.",
          ],
          [
            "Can I release a pet today?",
            "Intake is subject to staff review and capacity. Please keep caring for your pet until arrangements are confirmed.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Auth({ mode = "login", next = "/pets" }) {
  const { user, register, login } = useApp();
  const [values, setValues] = useState({}),
    [errors, setErrors] = useState({}),
    [general, setGeneral] = useState("");
  const signup = mode === "signup";
  const fields = [
    ...(signup
      ? [
          {
            name: "name",
            label: "Full name",
            required: true,
            autoComplete: "name",
          },
        ]
      : []),
    {
      name: "email",
      label: "Email address",
      type: "email",
      required: true,
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      minLength: 8,
      autoComplete: signup ? "new-password" : "current-password",
    },
    ...(signup
      ? [
          {
            name: "confirm",
            label: "Confirm password",
            type: "password",
            required: true,
          },
        ]
      : []),
  ];
  function submit(e) {
    e.preventDefault();
    const err = validate(values, fields);
    if (signup && values.password !== values.confirm)
      err.confirm = "Passwords must match.";
    if (signup && !values.consent)
      err.consent = "Please agree to the demo privacy notice.";
    setErrors(err);
    if (Object.keys(err).length) {
      setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    const issue = (signup ? register : login)(values);
    if (issue) {
      setGeneral(issue);
      return;
    }
    window.location.hash = "#" + next;
  }
  return (
    <section className="auth-page">
      <div className="auth-image">
        <img
          src={`${import.meta.env.BASE_URL}images/luna.jpg`}
          alt="A curious cat ready to meet a loving family"
        />
        <div>
          <p className="eyebrow">YOU BELONG HERE</p>
          <h2>
            Small paws.
            <br />
            Big possibilities.
          </h2>
        </div>
      </div>
      <div className="auth-content">
        <PawPrint size={34} />
        <h1>
          {user
            ? "You’re part of the family."
            : signup
              ? "Join our little family."
              : "Welcome back."}
        </h1>
        <p className="muted">
          {signup
            ? "Become a supporter and start your adoption journey."
            : "Log in to take the next step with a pet you love."}
        </p>
        {user ? (
          <Button href={"#" + next}>
            Continue <ArrowRight size={18} />
          </Button>
        ) : (
          <form noValidate onSubmit={submit}>
            <div className="notice compact">
              Demo accounts last until the page is refreshed. Use a sample email
              and a password you do not use elsewhere.
            </div>
            {general && (
              <p role="alert" className="error">
                {general}
              </p>
            )}
            {fields.map((f) => (
              <Field
                key={f.name}
                field={f}
                value={values[f.name]}
                error={errors[f.name]}
                onChange={(k, v) => {
                  setValues({ ...values, [k]: v });
                  setErrors((prev) => ({ ...prev, [k]: undefined }));
                }}
              />
            ))}
            {signup && (
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={!!values.consent}
                  onChange={(e) =>
                    setValues({ ...values, consent: e.target.checked })
                  }
                />
                I understand this is a demonstration and agree to the{" "}
                <a href="#/credits">privacy notice</a>.
              </label>
            )}
            {errors.consent && (
              <p role="alert" className="error">
                {errors.consent}
              </p>
            )}
            <Button type="submit" className="full">
              {signup ? "Create my account" : "Log in"}
              <ArrowUpRight size={18} />
            </Button>
            <p className="auth-switch">
              {signup ? "Already part of the family?" : "New to Pet Heaven?"}{" "}
              <a
                href={`#/${signup ? "login" : "signup"}?next=${encodeURIComponent(next)}`}
              >
                {signup ? "Log in" : "Join us"}
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
export function RequestForm({ kind, fields, pet }) {
  const { user } = useApp();
  const [values, setValues] = useState({
      name: user?.name || "",
      email: user?.email || "",
    }),
    [errors, setErrors] = useState({}),
    [stage, setStage] = useState("edit"),
    [recipient, setRecipient] = useState(""),
    [recipientError, setRecipientError] = useState("");
  const stageRef = useRef();
  useEffect(() => {
    if (stage !== "edit") stageRef.current?.focus();
    else stageRef.current?.querySelector("input")?.focus();
  }, [stage]);
  const text = requestText(kind, values, pet);
  function submit(e) {
    e.preventDefault();
    const err = validate(values, fields);
    if (!values.consent) err.consent = "Please confirm before continuing.";
    setErrors(err);
    if (Object.keys(err).length) {
      setTimeout(
        () => document.querySelector('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    setStage("review");
  }
  if (stage === "done")
    return (
      <div className="form-card success" ref={stageRef} tabIndex="-1" aria-label="Request prepared">
        <span className="success-icon">
          <Check />
        </span>
        <h2>Your request is prepared.</h2>
        <p>
          This demo has <strong>not sent an email</strong>. Download a copy or
          open your email app and send it to an administrator yourself.
        </p>
        <Button
          secondary
          onClick={() =>
            downloadText(text, `pet-heaven-${kind.toLowerCase()}.txt`)
          }
        >
          Download request
        </Button>
        <div className="field">
          <label htmlFor="recipient">
            Administrator’s email (supplied by you)
          </label>
          <input
            id="recipient"
            type="email"
            aria-invalid={!!recipientError}
            aria-describedby={recipientError ? "recipient-error" : undefined}
            value={recipient}
            placeholder="Enter the intended recipient"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        {recipientError && <p id="recipient-error" role="alert" className="error">{recipientError}</p>}
        <Button
          onClick={() => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.trim())) {
              setRecipientError("Enter a valid administrator email first.");
              return;
            }
            setRecipientError("");
            window.location.href = `mailto:${encodeURIComponent(recipient.trim())}?subject=${encodeURIComponent("Pet Heaven " + kind + " request")}&body=${encodeURIComponent(text)}`;
          }}
        >
          Open email draft <Mail size={17} />
        </Button>
        <p className="fine">
          Your email app must be configured. A draft is not proof of delivery.
          Requests are not stored on a server.
        </p>
        <Button secondary onClick={() => setStage("review")}>
          Back to review
        </Button>
      </div>
    );
  if (stage === "review")
    return (
      <div className="form-card" ref={stageRef} tabIndex="-1" aria-label="Review request">
        <p className="eyebrow">CHECK BEFORE YOU CONTINUE</p>
        <h2>Review your {kind.toLowerCase()} request.</h2>
        {pet && (
          <p>
            <strong>Pet: {pet.name}</strong>
          </p>
        )}
        <dl className="review-list">
          {fields.map((f) => (
            <div key={f.name}>
              <dt>{f.label}</dt>
              <dd>{values[f.name] || "Not provided"}</dd>
            </div>
          ))}
        </dl>
        <p className="notice">
          Preparing this request does not confirm adoption or intake. A staff
          review and interview would follow.
        </p>
        <div className="button-row">
          <Button secondary onClick={() => setStage("edit")}>
            Edit details
          </Button>
          <Button onClick={() => setStage("done")}>
            Prepare email request <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    );
  return (
    <form className="form-card" ref={stageRef} noValidate onSubmit={submit}>
      <p className="eyebrow">TELL US A LITTLE MORE</p>
      <h2>
        {kind === "Adoption"
          ? "Your adoption application"
          : kind === "Release"
            ? "Pet release request"
            : "Send an enquiry"}
      </h2>
      <p className="fine">
        Fields marked * are required. Use sample details for this student demo.
      </p>
      <div className="form-grid">
        {fields.map((f) => (
          <Field
            key={f.name}
            field={f}
            value={values[f.name]}
            error={errors[f.name]}
            onChange={(k, v) => {
                  setValues({ ...values, [k]: v });
                  setErrors((prev) => ({ ...prev, [k]: undefined }));
                }}
          />
        ))}
      </div>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={!!values.consent}
          onChange={(e) => setValues({ ...values, consent: e.target.checked })}
        />
        I confirm these details and understand that staff review is required.
        This is a demo and no request is automatically sent.
      </label>
      {errors.consent && (
        <p role="alert" className="error">
          {errors.consent}
        </p>
      )}
      <Button type="submit">
        Review request <ArrowRight size={18} />
      </Button>
    </form>
  );
}
export function Application({ kind, petId }) {
  const { user } = useApp();
  const pet = pets.find((p) => p.id === petId);
  if (kind === "Adoption" && !pet) return <NotFound />;
  if (kind === "Adoption" && !user)
    return (
      <section className="section">
        <PageIntro
          eyebrow={`ONE STEP CLOSER TO ${pet.name.toUpperCase()}`}
          title="Let’s make it official."
        >
          Please join our community or log in before applying. We’ll keep your
          chosen pet ready for you.
        </PageIntro>
        <div className="button-row">
          <Button
            href={`#/signup?next=${encodeURIComponent("/adopt/" + petId)}`}
          >
            Become a member
          </Button>
          <Button
            secondary
            href={`#/login?next=${encodeURIComponent("/adopt/" + petId)}`}
          >
            Log in
          </Button>
        </div>
      </section>
    );
  const common = [
    { name: "name", label: "Full name", required: true },
    { name: "email", label: "Email address", type: "email", required: true },
    { name: "phone", label: "Contact number", type: "tel", required: true },
  ];
  const fields =
    kind === "Adoption"
      ? [
          ...common,
          {
            name: "age",
            label: "Your age",
            type: "number",
            min: 21,
            max: 100,
            required: true,
          },
          {
            name: "home",
            label: "Home type",
            options: ["HDB flat", "Condominium", "Landed home", "Other"],
            required: true,
          },
          {
            name: "permission",
            label: "Household / landlord agreement",
            options: [
              "Yes, all necessary agreement obtained",
              "Still discussing",
            ],
            required: true,
          },
          {
            name: "experience",
            label: "Pet-care experience and daily routine",
            type: "textarea",
            required: true,
            minLength: 20,
            wide: true,
          },
          {
            name: "reason",
            label: `Why would your home suit ${pet.name}?`,
            type: "textarea",
            required: true,
            minLength: 20,
            wide: true,
          },
        ]
      : [
          ...common,
          { name: "petName", label: "Pet name", required: true },
          {
            name: "species",
            label: "Pet type",
            options: ["Cat", "Dog"],
            required: true,
          },
          {
            name: "petAge",
            label: "Pet age (years)",
            step: "any",
            type: "number",
            min: 0,
            max: 30,
            required: true,
          },
          {
            name: "health",
            label: "Health, vaccination and behaviour information",
            type: "textarea",
            minLength: 20,
            required: true,
            wide: true,
          },
          {
            name: "reason",
            label: "Reason for release and current care arrangements",
            type: "textarea",
            minLength: 20,
            required: true,
            wide: true,
          },
        ];
  return (
    <section className="section">
      <PageIntro
        eyebrow={kind === "Adoption" ? "A NEW CHAPTER" : "RESPONSIBLE REHOMING"}
        title={
          kind === "Adoption"
            ? `A home for ${pet.name}.`
            : "We’re here to listen."
        }
      >
        {kind === "Adoption"
          ? "Help us understand your lifestyle so we can make a thoughtful match."
          : "Tell us about your pet so we can understand their needs and discuss support."}
      </PageIntro>
      <div className="form-layout">
        <aside className="form-aside">
          {pet ? (
            <>
              <img
                className="application-photo"
                src={`${import.meta.env.BASE_URL}images/${pet.id}.jpg`}
                alt={pet.name}
              />
              <h2>{pet.name}</h2>
              <p>
                {pet.breed} · {pet.age} years · {pet.sex}
              </p>
              <p>{pet.home}</p>
            </>
          ) : (
            <>
              <House size={32} />
              <h2>A careful transition.</h2>
              <p>
                Please continue caring for your pet until staff confirm an
                intake arrangement. Do not leave an animal at a shelter without
                agreement.
              </p>
            </>
          )}
          <h3>What happens next?</h3>
          <ol>
            <li>Review and prepare your request.</li>
            <li>Email the administrator.</li>
            <li>Staff arrange an interview and discuss suitability.</li>
          </ol>
          <p className="fine">
            Proposed policy: adopters are at least 21 years old. All profiles
            and operational details are fictional.
          </p>
        </aside>
        <RequestForm kind={kind} pet={pet} fields={fields} />
      </div>
    </section>
  );
}
export function Care() {
  const [guide, setGuide] = useState(null),
    [checks, setChecks] = useState([]);
  const tasks = [
    "Everyone at home agrees to welcome a pet.",
    "I have budgeted for food, supplies and veterinary care.",
    "My home is safe and I have time for daily care.",
    "I can commit to this pet through changing circumstances.",
  ];
  return (
    <section className="section">
      <PageIntro
        eyebrow="GOOD CARE BEGINS WITH UNDERSTANDING"
        title="A little guidance. A happier life."
      >
        Simple ways to help your new companion feel safe, understood and at
        home.
      </PageIntro>
      <div className="pet-grid">
        {careGuides.map((g) => (
          <article className="guide-card" key={g.title}>
            <img src={`${import.meta.env.BASE_URL}images/${g.image}.jpg`} alt={g.title} />
            <div>
              <p className="eyebrow">{g.label}</p>
              <h2>{g.title}</h2>
              <p>{g.text}</p>
              <button className="plain-link" onClick={() => setGuide(g)}>
                Read the guide <ArrowUpRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="readiness">
        <div>
          <p className="eyebrow">BEFORE THE FIRST HELLO</p>
          <h2>Ready for a new companion?</h2>
          <p>
            Use this checklist to think through the commitment. It’s a starting
            point for a conversation, not an adoption assessment.
          </p>
          <strong aria-live="polite">
            {checks.length} of 4 things considered
          </strong>
          <progress
            value={checks.length}
            max="4"
            aria-label="Adoption readiness checklist"
          />
        </div>
        <div>
          {tasks.map((t, i) => (
            <label className="check-row" key={t}>
              <input
                type="checkbox"
                checked={checks.includes(i)}
                onChange={() =>
                  setChecks((prev) =>
                    prev.includes(i)
                      ? prev.filter((n) => n !== i)
                      : [...prev, i],
                  )
                }
              />
              {t}
            </label>
          ))}
          {checks.length === 4 && (
            <p className="positive" role="status">
              A thoughtful start! Explore our pets and talk through your
              situation with staff.
            </p>
          )}
          <Button href="#/pets">
            Meet our pets <ArrowRight size={18} />
          </Button>
        </div>
      </div>
      <p className="fine">
        General care guidance; individual health and behavioural concerns should
        be discussed with a veterinarian. Resources:{" "}
        <a
          href="https://www.aspca.org/pet-care"
          target="_blank"
          rel="noreferrer"
        >
          ASPCA Pet Care
        </a>
        .
      </p>
      {guide && (
        <Modal title={guide.title} onClose={() => setGuide(null)}>
          <div className="guide-modal">
            <p className="eyebrow">{guide.label}</p>
            <h2>{guide.title}</h2>
            <p>{guide.text}</p>
            <ol>
              {guide.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <Button onClick={() => setGuide(null)}>
              Got it <Check size={18} />
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
}
export function Community() {
  const { user, feedback, addFeedback } = useApp();
  const [v, setV] = useState({ rating: "5", text: "" }),
    [error, setError] = useState(""),
    [done, setDone] = useState(false);
  return (
    <section className="section">
      <PageIntro
        eyebrow="GOOD HEARTS, TOGETHER"
        title="A community that cares."
      >
        Share feedback about your experience with this demonstration website.
      </PageIntro>
      <div className="form-layout">
        <div>
          <h2>Member voices</h2>
          <p className="muted">
            Feedback stays in this browser. It is not published online.
          </p>
          {feedback.length ? (
            feedback.map((f) => (
              <article className="feedback-card" key={f.id}>
                <div
                  className="stars"
                  aria-label={`${f.rating} out of 5 stars`}
                >
                  {"★".repeat(Number(f.rating))}
                </div>
                <p>“{f.text}”</p>
                <strong>{f.name}</strong>
                <span className="fine"> · Demo member feedback</span>
              </article>
            ))
          ) : (
            <div className="empty">
              <Heart />
              <h3>Be the first to share.</h3>
              <p>No reviews yet. Your feedback can start the conversation.</p>
            </div>
          )}
        </div>
        <div className="form-card">
          <h2>How was your visit?</h2>
          {user ? (
            <form noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (!["1", "2", "3", "4", "5"].includes(v.rating) || v.text.trim().length < 15) {
                  setError("Choose a rating from 1 to 5 and write at least 15 characters.");
                  return;
                }
                addFeedback(v);
                setV({ rating: "5", text: "" });
                setError("");
                setDone(true);
              }}
            >
              <Field
                field={{
                  name: "rating",
                  label: "Your rating",
                  options: ["5", "4", "3", "2", "1"],
                }}
                value={v.rating}
                onChange={(k, x) => setV({ ...v, [k]: x })}
              />
              <Field
                field={{
                  name: "text",
                  label: "Your feedback",
                  type: "textarea",
                  required: true,
                }}
                value={v.text}
                onChange={(k, x) => {
                  setV({ ...v, [k]: x });
                  setDone(false);
                }}
                error={error}
              />
              <Button type="submit">
                Share feedback <Heart size={17} />
              </Button>
              {done && (
                <p role="status" className="positive">
                  Thank you! Your feedback has been saved in this browser.
                </p>
              )}
            </form>
          ) : (
            <>
              <p>Log in to leave a review as a community member.</p>
              <Button href="#/login?next=%2Fcommunity">Log in to share</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export function Credits() {
  return (
    <section className="section prose">
      <PageIntro eyebrow="A LITTLE TRANSPARENCY" title="Credits & privacy." />
      <h2>About this project</h2>
      <p>
        Pet Heaven is an ISIT207 Frontend Web Programming student demonstration
        for SIM–UOW. Name: Lim EnLe. UOW ID: 1036488. Pet names, profiles,
        availability, facilities and procedures are fictional illustrative data.
      </p>
      <h2>Your data</h2>
      <p>
        No backend, real membership or real adoption is created. Demo account
        credentials stay in memory and disappear on refresh. Saved pet IDs and
        locally submitted feedback use this browser’s localStorage. Application
        details remain in component memory until you leave the form. Email
        drafts are sent only through your own email app. Please use sample data.
      </p>
      <h2>Photography & icons</h2>
      <p>
        Real animal photographs are downloaded from Unsplash and bundled
        locally. They illustrate fictional profiles and do not establish that
        the pictured animals are available for adoption. Image source URLs are
        listed below and in photo-sources.json. Icons: Lucide, ISC licence.
      </p>
      <ul>
        {[
          ["Buddy", "1552053831-71594a27632d"],
          ["Luna", "1573865526739-10659fec78a5"],
          ["Milo", "1543466835-00a7907e9de1"],
          ["Mochi", "1514888286974-6c03e2ca1dba"],
          ["Daisy", "1587300003388-59208cc962cb"],
          ["Oliver", "1518791841217-8f162f1e1131"],
        ].map(([n, id]) => (
          <li key={n}>
            <a
              href={`https://images.unsplash.com/photo-${id}`}
              target="_blank"
              rel="noreferrer"
            >
              {n} — source photograph ↗
            </a>
          </li>
        ))}
      </ul>
      <p>
        <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
          Unsplash licence
        </a>{" "}
        ·{" "}
        <a href="https://lucide.dev/license" target="_blank" rel="noreferrer">
          Lucide licence
        </a>
      </p>
      <h2>Implementation acknowledgement</h2>
      <p>
        Prepared with assistance from OpenAI ChatGPT for design, code,
        documentation and checks. Course materials informed the component
        architecture, validation and usability approach.
      </p>
    </section>
  );
}
export function NotFound() {
  return (
    <section className="section empty">
      <PawPrint size={48} />
      <h1>This trail leads nowhere.</h1>
      <p>The page or pet could not be found.</p>
      <Button href="#/">Back home</Button>
    </section>
  );
}
