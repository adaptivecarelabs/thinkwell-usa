import { useEffect, useState } from "react";
import { COMPANY, CATEGORIES, PRODUCTS, NEWS, FAQS, waLink } from "./data.js";

const RED = "#a50016", DARK = "#1a1a1a", ORANGE = "#f2a52b", GRAY = "#5a5a5a", LIGHT = "#f5f5f5";

const MENU = [
  { label: "Home", href: "/index.html" },
  { label: "Products", href: "/products.html", children: CATEGORIES.map((c) => ({ label: c.name, href: `/${c.slug}.html` })) },
  { label: "About", href: "/companyprofile.html", children: [
    { label: "Company Profile", href: "/companyprofile.html" },
    { label: "Management Profile", href: "/management-profile.html" },
  ] },
  { label: "Support", href: "/Quality-Control.html", children: [
    { label: "Exhibition", href: "/thinkwell-exhibition.html" },
    { label: "Culture", href: "/culture.html" },
    { label: "Quality Control", href: "/Quality-Control.html" },
    { label: "FAQ & Service", href: "/faqlist.html" },
    { label: "Video", href: "/Video.html", children: [
      { label: "Product Video", href: "/Product-Video.html" },
      { label: "Factory Video", href: "/Factory-Video.html" },
    ] },
  ] },
  { label: "News", href: "/news.html" },
  { label: "Become a Partner", href: "/become-a-partner.html" },
  { label: "Contact Us", href: "/contactus.html" },
  { label: "Catalog", href: "/catalog.html", children: CATEGORIES.map((c) => ({ label: `${c.name} Catalog`, href: `/catalog.html#${c.slug}` })) },
];

function navigate(href) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
function A({ href, children, style, ...rest }) {
  const internal = href && href.startsWith("/");
  return (
    <a href={href} style={{ color: "inherit", textDecoration: "none", ...style }} {...rest}
      onClick={internal ? (e) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); navigate(href); } : undefined}>
      {children}
    </a>
  );
}

// Drop a photo at /public/images/products/<slug>.jpg to replace the placeholder badge.
function ProductImage({ product, height = 220 }) {
  const [ok, setOk] = useState(true);
  if (ok) return <img src={`/images/products/${product.slug}.jpg`} alt={product.name} onError={() => setOk(false)} style={{ width: "100%", height, objectFit: "contain", background: "#fff", display: "block", borderBottom: `3px solid ${ORANGE}` }} />;
  const initials = product.name.split(" ").filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  return (
    <div style={{ height, background: LIGHT, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, borderBottom: `3px solid ${ORANGE}` }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: RED, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>{initials}</div>
      <span style={{ fontSize: 12, color: GRAY, textTransform: "uppercase", letterSpacing: 1 }}>{product.category}</span>
    </div>
  );
}

function Header({ path }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <header style={{ background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.06)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ background: DARK, color: "#ddd", fontSize: 13 }}>
        <div className="wrap" style={{ display: "flex", gap: 24, padding: "8px 24px", flexWrap: "wrap" }}>
          <span>E-Mail: <a href={`mailto:${COMPANY.email}`} style={{ color: "#fff" }}>{COMPANY.email}</a></span>
          <span>Tel: <a href={COMPANY.telHref} style={{ color: "#fff" }}>{COMPANY.tel}</a></span>
        </div>
      </div>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 24, padding: "12px 24px", flexWrap: "wrap" }}>
        <A href="/index.html"><img src="/images/logo.jpeg" alt="Thinkwell USA" style={{ height: 56, display: "block" }} /></A>
        <div style={{ flex: 1, minWidth: 200, fontSize: 13, color: GRAY }}>
          <strong style={{ color: DARK }}>{COMPANY.legal}</strong><br />Off-road recovery gear, trailer parts and forged hardware
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate(`/search.html?q=${encodeURIComponent(q)}`); }} style={{ display: "flex" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." aria-label="Search"
            style={{ padding: "8px 12px", border: "1px solid #ccc", borderRight: 0, width: 200, fontSize: 14 }} />
          <button style={{ background: RED, color: "#fff", border: 0, padding: "0 16px", cursor: "pointer" }}>Search</button>
        </form>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      <nav style={{ background: RED }}>
        <ul className={`menu wrap ${open ? "open" : ""}`} onClick={(e) => e.target.closest("a") && setOpen(false)}>
          {MENU.map((m) => <MenuItem key={m.label} item={m} active={path === m.href || m.children?.some((c) => c.href === path)} />)}
        </ul>
      </nav>
    </header>
  );
}
function MenuItem({ item, active }) {
  return (
    <li className={active ? "active" : ""}>
      <A href={item.href}>{item.label}{item.children ? " ▾" : ""}</A>
      {item.children && <ul className="sub">{item.children.map((c) => <MenuItem key={c.label} item={c} />)}</ul>}
    </li>
  );
}

function Footer() {
  const [msg, setMsg] = useState("");
  return (
    <footer style={{ background: DARK, color: "#ccc", marginTop: 48 }}>
      <div className="wrap grid" style={{ padding: "40px 24px", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <img src="/images/logo.jpeg" alt="Thinkwell USA" style={{ width: 180, background: "#fff", padding: 6 }} />
          <form onSubmit={(e) => { e.preventDefault(); window.open(waLink(`Inquiry from website: ${msg}`), "_blank"); }} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <textarea required value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Please fill in your request" rows={3} style={{ padding: 8 }} />
            <button style={{ background: RED, color: "#fff", border: 0, padding: 10, cursor: "pointer" }}>Submit via WhatsApp</button>
          </form>
        </div>
        <div><h4 style={{ color: "#fff" }}>Quick Links</h4>
          {MENU.map((m) => <div key={m.label} style={{ padding: "4px 0" }}><A href={m.href}>{m.label}</A></div>)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><h4 style={{ color: "#fff", margin: "20px 0 4px" }}>Contact</h4>
          <span>Call Us: <a href={COMPANY.telHref} style={{ color: "#fff" }}>{COMPANY.tel}</a></span>
          <span>Email: <a href={`mailto:${COMPANY.email}`} style={{ color: "#fff" }}>{COMPANY.email}</a></span>
          <span>{COMPANY.address}</span>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #333", padding: 16, textAlign: "center", fontSize: 13 }}>
        Copyrights {COMPANY.year} {COMPANY.legal}. All rights reserved. <A href="/sitemap.html" style={{ color: "#fff" }}>Sitemap</A>
      </div>
      <div className="floaters">
        <a href={`mailto:${COMPANY.email}`} title="E-mail">✉</a>
        <a href={waLink("Hello Thinkwell USA")} target="_blank" rel="noreferrer" title="WhatsApp" style={{ background: "#25d366" }}>✆</a>
        <a href={COMPANY.telHref} title="Phone">☎</a>
      </div>
    </footer>
  );
}

const Section = ({ title, sub, children, bg }) => (
  <section style={{ background: bg }}>
    <div className="wrap" style={{ padding: "48px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
      {title && <div style={{ textAlign: "center" }}><h2 style={{ margin: 0, fontSize: 30, color: DARK, textTransform: "uppercase" }}>{title}</h2>
        <div style={{ width: 60, height: 3, background: RED, margin: "12px auto" }} />{sub && <p style={{ color: GRAY, maxWidth: 760, margin: "0 auto", lineHeight: 1.6 }}>{sub}</p>}</div>}
      {children}
    </div>
  </section>
);
const PageBanner = ({ title, crumb }) => (
  <div style={{ background: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(/images/warehouse-front.jpeg) center/cover`, color: "#fff" }}>
    <div className="wrap" style={{ padding: "56px 24px" }}>
      <h1 style={{ margin: 0, fontSize: 36 }}>{title}</h1>
      <div style={{ marginTop: 8, fontSize: 14 }}><A href="/index.html">Home</A>{crumb?.map(([l, h]) => <span key={l}> / <A href={h}>{l}</A></span>)} / {title}</div>
    </div>
  </div>
);
const Btn = ({ href, children, onClick }) => (
  href ? <A href={href} className="btn">{children}</A> : <button className="btn" onClick={onClick}>{children}</button>
);

function ProductCard({ p }) {
  return (
    <A href={`/${p.slug}.html`} className="card">
      <ProductImage product={p} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <strong style={{ color: DARK, lineHeight: 1.4 }}>{p.name}</strong>
        <span style={{ color: RED, fontSize: 14 }}>More &gt;&gt;</span>
      </div>
    </A>
  );
}
function CategoryCard({ c }) {
  const count = PRODUCTS.filter((p) => p.category === c.name).length;
  return (
    <A href={`/${c.slug}.html`} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, borderTop: `4px solid ${RED}` }}>
      <strong style={{ fontSize: 18, color: DARK }}>{c.name}</strong>
      <span style={{ color: GRAY, lineHeight: 1.5, fontSize: 14 }}>{c.blurb}</span>
      <span style={{ color: RED, fontSize: 14 }}>{count} products &gt;&gt;</span>
    </A>
  );
}
const Grid = ({ children, min = 240 }) => <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fill,minmax(${min}px,1fr))`, gap: 20 }}>{children}</div>;

function InquiryForm({ subject = "General inquiry", title = "Send Us an Inquiry" }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = `${subject}\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nCompany: ${f.company}\nMessage: ${f.message}`;
    window.open(waLink(text), "_blank");
  };
  return (
    <form onSubmit={submit} style={{ background: "#fff", padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,.1)", display: "flex", flexDirection: "column", gap: 12 }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
        <input required placeholder="Name *" value={f.name} onChange={set("name")} />
        <input required type="email" placeholder="Email *" value={f.email} onChange={set("email")} />
        <input placeholder="Phone / WhatsApp" value={f.phone} onChange={set("phone")} />
        <input placeholder="Company" value={f.company} onChange={set("company")} />
      </div>
      <textarea required rows={5} placeholder="Message *" value={f.message} onChange={set("message")} />
      <button className="btn" style={{ alignSelf: "flex-start" }}>Submit via WhatsApp</button>
      <small style={{ color: GRAY }}>Your inquiry opens in WhatsApp, addressed to {COMPANY.tel}.</small>
    </form>
  );
}

/* ---------- pages ---------- */
function Home() {
  const stats = [["15+", "Years of industry experience"], ["5000+", "Customers served"], ["80", "Design & invention patents"], ["60+", "New products per year"], ["30%", "Annual growth"], ["24/7", "Online service"]];
  return (<>
    <div style={{ background: `linear-gradient(90deg,rgba(0,0,0,.75),rgba(0,0,0,.2)), url(/images/warehouse-aerial.jpeg) center/cover`, color: "#fff" }}>
      <div className="wrap" style={{ padding: "110px 24px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 1200 }}>
        <span style={{ color: ORANGE, fontWeight: 700, letterSpacing: 2 }}>OFF-ROAD · TRAILER · RIGGING · MARINE</span>
        <h1 style={{ margin: 0, fontSize: 48, maxWidth: 680, lineHeight: 1.15 }}>Recovery gear & trailer hardware, stocked in California</h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 18, lineHeight: 1.6 }}>Forged parts, 4x4 recovery accessories and OEM/ODM manufacturing, shipped from our Ontario, CA warehouse.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Btn href="/products.html">View Products</Btn><Btn href="/become-a-partner.html">Become a Partner</Btn></div>
      </div>
    </div>
    <Section title="Popular Products" sub="Our best-selling recovery and towing items. Samples are available for most of them, and we can add custom logos and packaging.">
      <Grid>{PRODUCTS.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}</Grid>
      <div style={{ textAlign: "center" }}><Btn href="/products.html">More Products</Btn></div>
    </Section>
    <Section bg={LIGHT}>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 32, alignItems: "center" }}>
        <img src="/images/warehouse-front.jpeg" alt="Thinkwell USA warehouse" style={{ width: "100%", display: "block" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ color: RED, fontWeight: 700 }}>WHO WE ARE</span>
          <h2 style={{ margin: 0 }}>{COMPANY.short}</h2>
          <p style={{ color: GRAY, lineHeight: 1.7, margin: 0 }}>{COMPANY.short} supplies 4x4 off-road recovery gear, trailer accessories and forged hardware to dealers, distributors, fleets and brands across North America. We work under an ISO 9001 quality system, and our products are built to meet US, European and Australian market requirements.</p>
          <p style={{ color: GRAY, lineHeight: 1.7, margin: 0 }}>Our Ontario, California warehouse keeps stock close to you, and our engineering team can take custom parts from drawing to production.</p>
          <div><Btn href="/companyprofile.html">About Us</Btn></div>
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
        {stats.map(([n, l]) => <div key={l} style={{ textAlign: "center", background: "#fff", padding: 20 }}><div style={{ fontSize: 32, fontWeight: 800, color: RED }}>{n}</div><div style={{ color: GRAY, fontSize: 14 }}>{l}</div></div>)}
      </div>
    </Section>
    <Section title="Product Categories" sub="We cover off-road and trailer parts, rigging, marine hardware and custom forged components.">
      <Grid>{CATEGORIES.map((c) => <CategoryCard key={c.slug} c={c} />)}</Grid>
    </Section>
    <Section title="Quality Control" bg={LIGHT}><QualityBlocks /><div style={{ textAlign: "center" }}><Btn href="/Quality-Control.html">Find More Details</Btn></div></Section>
    <Section title="Our News"><NewsGrid items={NEWS} /><div style={{ textAlign: "center" }}><Btn href="/news.html">Read More News</Btn></div></Section>
    <Section bg={LIGHT}><InquiryForm /></Section>
  </>);
}
function QualityBlocks() {
  const q = [["Professional Production", "Skilled workers and modern equipment give consistent quality, and volume runs lower your unit cost."],
    ["Testing & Inspection", "Tensile, hardness and salt-spray testing check every batch. Third-party inspection is welcome."],
    ["Responsive Service", "Tell us about any quality issue and we'll respond with a solution within 24–48 hours."],
    ["On-Time Delivery", "Regular items ship from US stock. Custom parts usually take 30–40 days from tooling to bulk production."]];
  return <Grid>{q.map(([t, d]) => <div key={t} style={{ background: "#fff", padding: 24, borderLeft: `4px solid ${ORANGE}` }}><h3 style={{ marginTop: 0 }}>{t}</h3><p style={{ color: GRAY, lineHeight: 1.6, margin: 0 }}>{d}</p></div>)}</Grid>;
}
function NewsGrid({ items }) {
  return <Grid min={300}>{items.map((n) => (
    <A key={n.slug} href={`/${n.slug}.html`} className="card">
      {n.image ? <img src={n.image} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} /> : <div style={{ height: 200, background: RED, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, padding: 24, textAlign: "center" }}>{COMPANY.short} News</div>}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <small style={{ color: GRAY }}>{n.date}</small><strong style={{ color: DARK }}>{n.title}</strong>
        <span style={{ color: GRAY, fontSize: 14, lineHeight: 1.5 }}>{n.summary}</span><span style={{ color: RED }}>Read More</span>
      </div>
    </A>))}</Grid>;
}
function Sidebar() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ background: RED, color: "#fff", padding: 12, fontWeight: 700 }}>Product Categories</div>
      <A href="/products.html" className="side">All Products</A>
      {CATEGORIES.map((c) => <A key={c.slug} href={`/${c.slug}.html`} className="side">{c.name}</A>)}
    </aside>
  );
}
const WithSidebar = ({ children }) => <div className="wrap side-layout" style={{ padding: "40px 24px" }}><Sidebar /><div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>{children}</div></div>;

function Products() {
  return (<><PageBanner title="Products" /><WithSidebar>
    <Grid>{CATEGORIES.map((c) => <CategoryCard key={c.slug} c={c} />)}</Grid>
    <Grid min={220}>{PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} />)}</Grid>
  </WithSidebar></>);
}
function Category({ c }) {
  const items = PRODUCTS.filter((p) => p.category === c.name);
  return (<><PageBanner title={c.name} crumb={[["Products", "/products.html"]]} /><WithSidebar>
    <p style={{ color: GRAY, lineHeight: 1.6, margin: 0 }}>{c.blurb}</p>
    <Grid min={220}>{items.map((p) => <ProductCard key={p.slug} p={p} />)}</Grid>
  </WithSidebar></>);
}
function Product({ p }) {
  const c = CATEGORIES.find((x) => x.name === p.category);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  return (<><PageBanner title={p.name} crumb={[["Products", "/products.html"], [c.name, `/${c.slug}.html`]]} /><WithSidebar>
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
      <div className="card"><ProductImage product={p} height={340} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{p.name}</h2>
        <p style={{ color: GRAY, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
        <table style={{ borderCollapse: "collapse", fontSize: 14 }}><tbody>
          {Object.entries({ Category: p.category, ...p.specs, "Custom logo": "Available", Samples: "Available" }).map(([k, v]) =>
            <tr key={k}><td style={{ border: "1px solid #ddd", padding: 8, background: LIGHT, fontWeight: 600 }}>{k}</td><td style={{ border: "1px solid #ddd", padding: 8 }}>{v}</td></tr>)}
        </tbody></table>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a className="btn" href={waLink(`Product inquiry: ${p.name}\n${location.href}`)} target="_blank" rel="noreferrer">Inquire on WhatsApp</a>
          <a className="btn" style={{ background: DARK }} href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Inquiry: " + p.name)}`}>Email Us</a>
        </div>
      </div>
    </div>
    <InquiryForm subject={`Product inquiry: ${p.name}`} title="Product Inquiry" />
    {related.length > 0 && <><h3 style={{ margin: 0 }}>Related Products</h3><Grid min={200}>{related.map((r) => <ProductCard key={r.slug} p={r} />)}</Grid></>}
  </WithSidebar></>);
}
const Prose = ({ children }) => <div className="wrap" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", gap: 16, lineHeight: 1.7, color: "#333" }}>{children}</div>;

function About() {
  return (<><PageBanner title="Company Profile" crumb={[["About", "/companyprofile.html"]]} /><Prose>
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 32, alignItems: "center" }}>
      <div><h2>About {COMPANY.short}</h2>
        <p>{COMPANY.legal} specializes in 4x4 off-road recovery gear, trailer accessories, rigging and marine hardware, and custom forged parts.</p>
        <p>From our warehouse at {COMPANY.address}, we serve retailers, distributors, fleets and private-label brands with stock products and OEM/ODM manufacturing. Every product is made under ISO 9001 quality management and tested before shipment.</p>
        <p>We focus on dependable products, fair pricing, dependable supply and responsive after-sales support.</p></div>
      <img src="/images/warehouse-aerial.jpeg" alt="Warehouse aerial view" style={{ width: "100%" }} />
    </div>
    <img src="/images/warehouse-front.jpeg" alt="Warehouse front view" style={{ width: "100%", maxHeight: 460, objectFit: "cover" }} />
    <div><Btn href="/management-profile.html">Meet Our Management</Btn></div>
  </Prose></>);
}
function Management() {
  const team = [["Chief Operating Officer", "Coordinates sales, operations and customer service so the business runs smoothly every day."],
    ["Vice President, Operations", "Runs warehouse, logistics and supply chain so orders arrive on time and complete."],
    ["Director of Sales & Partnerships", "Leads distributor recruitment, dealer programs and key accounts."],
    ["Head of Engineering & Quality", "Oversees product development, OEM/ODM projects, testing and certification."]];
  return (<><PageBanner title="Management Profile" crumb={[["About", "/companyprofile.html"]]} /><Prose>
    <p>Our leadership team combines manufacturing experience with knowledge of the US market, so customers and partners get quality products and dependable service.</p>
    <div className="card grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32, alignItems: "center", padding: 24 }}>
      <img src="/images/team/managing-director.jpeg" alt="Managing Director, Thinkwell USA" style={{ width: "100%", maxWidth: 420, display: "block" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ color: RED, fontWeight: 700, letterSpacing: 1 }}>MANAGING DIRECTOR</span>
        <h2 style={{ margin: 0 }}>Managing Director, {COMPANY.short}</h2>
        <p style={{ margin: 0, color: GRAY }}>The Managing Director leads {COMPANY.short}'s strategy and day-to-day operations in the United States. That covers the Ontario, California warehouse, distributor and dealer partnerships, and the company's commitment to dependable products and responsive service.</p>
        <p style={{ margin: 0, color: GRAY }}>Under their leadership, {COMPANY.short} focuses on keeping stock close to customers, growing a nationwide partner network and delivering OEM/ODM projects on time.</p>
      </div>
    </div>
    <Grid>{team.map(([role, d]) => (
      <div key={role} className="card" style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: LIGHT, border: `3px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: RED }}>👤</div>
        <strong style={{ fontSize: 18 }}>Name</strong><span style={{ color: RED, fontWeight: 600 }}>{role}</span>
        <span style={{ color: GRAY, fontSize: 14 }}>{d}</span>
      </div>))}</Grid>
  </Prose></>);
}
function Partner() {
  const steps = [["1. Apply", "Fill in the application form below with your company, territory and sales channels. It goes straight to our team on WhatsApp."],
    ["2. Consultation", "A partnership manager contacts you within 2 business days to discuss your market, product mix and volume goals."],
    ["3. Agreement", "We agree on pricing tiers, territory, minimum orders and marketing support in a simple distributor agreement."],
    ["4. First Order & Onboarding", "Place your opening order and receive product training, catalogs, images and point-of-sale materials."],
    ["5. Grow Together", "Get ongoing restock priority, new-product previews and co-marketing as your sales grow."]];
  const benefits = ["Competitive tiered distributor pricing", "Stock shipped fast from Ontario, California", "Protected territories for qualified partners", "Free samples and product training", "Private label and custom packaging options", "Marketing assets: photos, specs and catalogs", "Dedicated partner account manager", "Responsive warranty and after-sales support"];
  return (<><PageBanner title="Become a Partner" /><Prose>
    <h2 style={{ margin: 0 }}>Become a {COMPANY.short} Distributor</h2>
    <p style={{ margin: 0 }}>Retail stores, online sellers, off-road shops, trailer dealers, industrial suppliers and sales agents can all apply to distribute {COMPANY.short} products. You don't need a large operation. We look for partners who know their local market and care about customer service.</p>
    <h3>Who can apply?</h3>
    <ul><li>Automotive, 4x4 and overland accessory retailers</li><li>Trailer, RV and towing equipment dealers</li><li>E-commerce and marketplace sellers</li><li>Industrial, rigging and marine supply distributors</li><li>Independent sales representatives and agents</li></ul>
    <h3>How it works</h3>
    <Grid>{steps.map(([t, d]) => <div key={t} style={{ background: LIGHT, padding: 20, borderTop: `4px solid ${RED}` }}><strong>{t}</strong><p style={{ color: GRAY, margin: "8px 0 0" }}>{d}</p></div>)}</Grid>
    <h3>Partner benefits</h3>
    <Grid min={260}>{benefits.map((b) => <div key={b} style={{ display: "flex", gap: 8 }}><span style={{ color: ORANGE, fontWeight: 800 }}>✓</span>{b}</div>)}</Grid>
    <h3>Requirements</h3>
    <ul><li>A registered business (or a plan to register one)</li><li>A physical or online sales channel</li><li>An agreed opening order and annual sales target</li><li>A commitment to our pricing and brand guidelines</li></ul>
    <InquiryForm subject="Distributor / Partner application" title="Partner Application" />
  </Prose></>);
}
function Simple({ title, crumb, children }) { return <><PageBanner title={title} crumb={crumb} /><Prose>{children}</Prose></>; }
const SUP = [["Support", "/Quality-Control.html"]];
function VideoPage({ title }) {
  return <Simple title={title} crumb={SUP}><p>Watch our products and production in action. New videos are added regularly.</p>
    <Grid min={300}>{["Recovery kit overview", "Snatch block in use", "Hitch mount installation"].map((t, i) => <VideoCard key={t} title={t} src={`/videos/${title.toLowerCase().replace(/ /g, "-")}-${i + 1}.mp4`} />)}</Grid>
    <div style={{ display: "flex", gap: 12 }}><Btn href="/Product-Video.html">Product Video</Btn><Btn href="/Factory-Video.html">Factory Video</Btn></div></Simple>;
}
// Drop MP4 files at /public/videos/<page>-<n>.mp4 (e.g. product-video-1.mp4) to replace placeholders.
function VideoCard({ title, src }) {
  const [ok, setOk] = useState(true);
  return <div className="card">{ok ? <video src={src} controls preload="metadata" onError={() => setOk(false)} style={{ width: "100%", height: 200, background: DARK, display: "block" }} /> : <div style={{ height: 200, background: DARK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>▶</div>}<div style={{ padding: 12 }}>{title}</div></div>;
}
function Contact() {
  return <Simple title="Contact Us"><div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ margin: 0 }}>{COMPANY.legal}</h2>
      <div><strong>Address:</strong> {COMPANY.address}</div>
      <div><strong>Tel / WhatsApp:</strong> <a href={COMPANY.telHref}>{COMPANY.tel}</a></div>
      <div><strong>Email:</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
      <iframe title="map" src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`} style={{ border: 0, width: "100%", height: 300 }} loading="lazy" />
    </div>
    <InquiryForm subject="Contact form" title="Get in Touch" /></div></Simple>;
}
function Search() {
  const q = new URLSearchParams(location.search).get("q") || "";
  const t = q.toLowerCase();
  const res = PRODUCTS.filter((p) => (p.name + p.category + p.desc).toLowerCase().includes(t));
  const news = NEWS.filter((n) => (n.title + n.summary).toLowerCase().includes(t));
  return <><PageBanner title={`Search: ${q}`} /><WithSidebar>
    <p style={{ margin: 0 }}>{res.length} product(s), {news.length} article(s) found.</p>
    <Grid min={220}>{res.map((p) => <ProductCard key={p.slug} p={p} />)}</Grid>
    {news.length > 0 && <NewsGrid items={news} />}
  </WithSidebar></>;
}
function Article({ n }) {
  const i = NEWS.indexOf(n);
  return <Simple title={n.title} crumb={[["News", "/news.html"]]}>
    <small style={{ color: GRAY }}>{n.date}</small>
    {n.image && <img src={n.image} alt="" style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />}
    {n.body.map((b, k) => <p key={k} style={{ margin: 0 }}>{b}</p>)}
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, borderTop: "1px solid #ddd", paddingTop: 16 }}>
      {NEWS[i - 1] ? <A href={`/${NEWS[i - 1].slug}.html`} style={{ color: RED }}>← {NEWS[i - 1].title}</A> : <span />}
      {NEWS[i + 1] && <A href={`/${NEWS[i + 1].slug}.html`} style={{ color: RED }}>{NEWS[i + 1].title} →</A>}
    </div></Simple>;
}

function route(path) {
  const s = path.replace(/^\//, "").replace(/\.html$/, "");
  const pages = {
    "": Home, index: Home, products: Products, companyprofile: About, "management-profile": Management,
    "become-a-partner": Partner, contactus: Contact, search: Search,
    news: () => <Simple title="News"><NewsGrid items={NEWS} /></Simple>,
    "Quality-Control": () => <Simple title="Quality Control" crumb={SUP}><p>Quality and reliability come first at {COMPANY.short}. Our inspection process covers raw materials, in-process checks and final testing.</p><QualityBlocks /></Simple>,
    culture: () => <Simple title="Culture" crumb={SUP}><Grid>{[["Mission", "Make dependable recovery and towing gear available to every driver and business."], ["Vision", "Be the most trusted hardware partner in North America."], ["Values", "Integrity, quality, teamwork and continuous improvement."]].map(([t, d]) => <div key={t} style={{ background: LIGHT, padding: 24 }}><h3 style={{ marginTop: 0, color: RED }}>{t}</h3>{d}</div>)}</Grid></Simple>,
    "thinkwell-exhibition": () => <Simple title="Exhibition" crumb={SUP}><p>We exhibit at major automotive aftermarket, off-road and hardware trade shows. Contact us to arrange a meeting at an upcoming event or to visit our Ontario, CA warehouse.</p><Grid><img src="/images/warehouse-front.jpeg" alt="" style={{ width: "100%" }} /><img src="/images/warehouse-aerial.jpeg" alt="" style={{ width: "100%" }} /></Grid></Simple>,
    faqlist: () => <Simple title="FAQ & Service" crumb={SUP}>{FAQS.map(([q, a]) => <details key={q} style={{ background: LIGHT, padding: 16 }}><summary style={{ fontWeight: 700, cursor: "pointer" }}>{q}</summary><p style={{ marginBottom: 0 }}>{a}</p></details>)}</Simple>,
    Video: () => <VideoPage title="Video" />, "Product-Video": () => <VideoPage title="Product Video" />, "Factory-Video": () => <VideoPage title="Factory Video" />,
    catalog: () => <Simple title="Catalog"><p>Request a full catalog for any product line. We'll send it to you on WhatsApp or by email.</p><Grid>{CATEGORIES.map((c) => <div key={c.slug} id={c.slug} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}><strong>{c.name} Catalog</strong><a className="btn" href={waLink(`Please send me the ${c.name} catalog.`)} target="_blank" rel="noreferrer">Request on WhatsApp</a><A href={`/${c.slug}.html`} style={{ color: RED }}>Browse online &gt;&gt;</A></div>)}</Grid></Simple>,
    sitemap: () => <Simple title="Sitemap">{MENU.map((m) => <div key={m.label}><A href={m.href} style={{ fontWeight: 700 }}>{m.label}</A>{m.children?.map((c) => <div key={c.label} style={{ paddingLeft: 16 }}><A href={c.href}>{c.label}</A></div>)}</div>)}<strong>Products</strong>{PRODUCTS.map((p) => <A key={p.slug} href={`/${p.slug}.html`} style={{ paddingLeft: 16 }}>{p.name}</A>)}</Simple>,
  };
  if (pages[s]) return pages[s]();
  const c = CATEGORIES.find((x) => x.slug === s); if (c) return <Category c={c} />;
  const p = PRODUCTS.find((x) => x.slug === s); if (p) return <Product p={p} />;
  const n = NEWS.find((x) => x.slug === s); if (n) return <Article n={n} />;
  return <Simple title="Page Not Found"><p>Sorry, we couldn't find that page.</p><Btn href="/index.html">Back to Home</Btn></Simple>;
}

export default function App() {
  const [loc, setLoc] = useState(location.pathname + location.search);
  useEffect(() => { const h = () => setLoc(location.pathname + location.search); window.addEventListener("popstate", h); return () => window.removeEventListener("popstate", h); }, []);
  const path = location.pathname;
  return <div key={loc}><Header path={path} /><main>{route(path)}</main><Footer /></div>;
}
