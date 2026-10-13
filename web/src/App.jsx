import { useEffect, useState } from "react";

const CDN = "https://iprorwxhliijlm5q.leadongcdn.com/cloud/";
const img = (p) => CDN + p;
const RED = "#dd0517";
const DARK = "#1a1a1a";
const WRAP = { maxWidth: 1200, margin: "0 auto", padding: "0 20px" };

const NAV = [
  ["Home", "/"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Support", "/support"],
  ["News", "/news"],
  ["Contact Us", "/contact"],
];

const CATEGORIES = ["Off Road Accessories", "Trailer Parts", "Rigging Hardware", "Marine Hardware", "OEM/ODM"];

const POPULAR = [
  ["Aluminum Alloy Adjustable Drop Hitch", "opBplKoiRllSqikknmllj/kediaojietuochebei6-320-320.jpg"],
  ["Tri-Ball Trailer Hitch Mount with 360° Swivel Tow Shackle", "omBplKoiRllSqiirorlpi/zhutu8-320-320.jpg"],
  ["Alloy Steel Sleeve Style Lock Specially", "okBplKoiRllSqinllrloj/Trailer-Coupler-Lock-320-320.jpg"],
  ["Pintle Hook with Hitch Ball", "ooBplKoiRllSqimionlij/hutougouB-320-320.jpg"],
  ["Off Road 4×4 Extreme Complete Recovery Kit", "okBplKoiRllSmipplkllk/Kinetic-Recovery-Tow-Rope0-320-320.png"],
  ["Forged 10T/12T Snatch Block", "opBplKoiRljSmkqqmklok/forging-snatch-block-320-320.jpg"],
  ["Shackle Hitch Receiver 2'' Tow Hitch Slider", "oqBplKoiRllSmikjqqljj/zhutu2-320-320.jpg"],
  ["Heavy Duty Recovery Boards with Replaceable Metal Studs", "oiBplKoiRllSpiorkkllj/sharp-tip4-320-320.jpg"],
];

const CAT_ICONS = [
  ["Shackle", "opBplKoiRllSojjrlilqi/xiekou-640-640.png"],
  ["Snatch Block", "ojBplKoiRllSojjroilmj/hualun-640-640.png"],
  ["Adjustable Hitch Ball Mount", "olBplKoiRllSojjrqilri/kediaojietuochebei-640-640.png"],
  ["Traction Board", "omBplKoiRllSojjrqilni/tuokunban-640-640.png"],
  ["Kinetic Rope", "oqBplKoiRllSojjrqilki/tuochesheng-640-640.png"],
  ["Trailer Hitch Mount", "opBplKoiRllSojjrqilli/tuochezhuangzhi-640-640.png"],
  ["Soft Shackle", "onBplKoiRllSojjrqilii/ruanxiekou-640-640.png"],
  ["Tow Strap", "ooBplKoiRllSojjrqilji/tuochedai-640-640.png"],
];

const PRODUCTS = {
  "Off Road Accessories": [
    ["4x4 Off Road Black Painted Forged D Ring Shackle", "oiBplKoiRljSoklojmlqk/d-ring-bow-shackle.jpg"],
    ["Full Braided Sleeve Soft Shackle", "oqBplKoiRliSknmpjplmk/weibiaoti.jpg"],
    ["Heavy Duty Off-road Recovery Kinetic Rope", "onBplKoiRllSoimqlqlnk/zhutu2.jpg"],
    ["2026 New Design Forging Snatch Block", "ojBplKoiRllSojqjpilrj/1.png"],
    ["Heavy Duty Farm Jack High Lift Jack for 4x4 Off Road Vehicle Recovery", "ooBplKoiRllSpiqriolqj/H31322caf6b7146778fcd841fd44ba5158-jpg_720x720q50.jpg"],
    ["Heavy Duty Forged Split Shackle for 4x4 Vehicle Recovery", "ojBplKoiRllSojpjpilmk/1.png"],
  ],
  "Trailer Parts": [
    ["Pair of 1000 LB Trailer Stabilizer Adjustable Telescoping Swing Down Jack", "okBplKoiRllSpijipqlrj/20250530_181135_160.jpg"],
    ["8000Lbs 15\" Lift Trailer Jack Heavy-Duty Square Welded-on Tongue Jack", "oiBplKoiRllSpijiqolrj/20250530_180117_116.jpg"],
    ["70148 10\" Lift Swing Back Trailer Jack with Single Wheel", "oqBplKoiRllSpijikqlmj/20250530_180714_145.jpg"],
    ["Adjustable Eye Assembly", "okBplKoiRllSqijlqrloj/zhutu1.jpg"],
    ["Hand Winch with Polyester Strap and Hook", "olBplKoiRllSqirjnilji/shoudongjiaopan5.jpg"],
    ["Hitch Step Anti Slip", "oqBplKoiRllSqiijrqlki/zhutu1.jpg"],
  ],
  "Rigging Hardware": [
    ["G70 Chain Assemblies With Grab Hook And Clevis Pear Link", "mnBqlKoiRlpSjmqrpjop/2368-fuben.jpg"],
    ["Australian Medium Link Chain", "mrBqlKoiRlpSipnjmpom/huaban.jpg"],
    ["Grade 70 Triangle Ring Chain Sling with Eye Grab Hook", "mpBqlKoiRlpSjmorkioq/2391.jpg"],
    ["Grade 70 Transport Chain With Grab Hooks", "orBplKoiRliSknikqmlmk/transport-chain.jpg"],
    ["G80 Black Oiled Alloy Steel Lifting Chain", "omBplKoiRliSonrmoollj/Link-Chains-with-High-Strength.jpg"],
    ["US NACM G70 Transport Trailer Safety Chain", "mjBqlKoiRlmSrokmorop/HTB1ZFjkXwfHK1Jjy1zbq6yhRFXal.jpg"],
  ],
  "Marine Hardware": [
    ["Outdoor Folding Ring Spiral Ground Anchor", "mqBqlKoiRlmSqniklmop/1.jpg"],
    ["4\" 6\" 8\" Nylon Boat Kayak Cleat", "ojBplKoiRllSpiqrjqlij/nylon-cleat.jpg"],
    ["Yacht Boat 304/316 Stainless Steel Bruce Anchor", "mrBqlKoiRlpSpqqoilom/QQtupian20170911154144.jpg"],
    ["Portable Galvanized Carbon Steel Danforth Anchor for Boat", "mkBqlKoiRlpSipjrnroq/ddd3.jpg"],
    ["High Quality Galvanized Steel Type C Folding Anchor", "mqBqlKoiRlpSrppmmoom/1.jpg"],
  ],
  "OEM/ODM": [
    ["Precision Forging Steel Trailer Towing Eyes", "opBplKoiRliSrrpnjplji/forged-long-shank-rod-rings.jpg"],
    ["Precision Forging Carbon Steel Jaw", "omBplKoiRliSrrpnnqlii/forging-machined-parts.jpg"],
    ["Forging CNC Machining Trailer Spindle Trailer Axle Parts", "opBplKoiRliSrrpnmolqj/trailer-axle-accessory.jpg"],
    ["ISO Certified OEM Die Forging Manufacturer", "omBplKoiRliSrrpnnmlmj/jixieduanzaopeijian-mechanical-forging-accessories.png"],
    ["OEM Forging Plate Forging Parts", "olBplKoiRliSrrpnopllj/forgging-factory.jpg"],
  ],
};

const STATS = [
  ["19", "", "19 years of industry experience"],
  ["5000", "+", "Serve 5000+ customers"],
  ["80", "", "Design & invention patents"],
  ["60", "", "More than 60 new products per year"],
  ["30", "%", "Annual market growth rate above 30%"],
  ["24", "", "24 hours online service"],
];

const QC = [
  ["Professional Production", "The professional workers and advanced facility can make the quality more refined with high productivity, the bulk production can save single piece cost.", "opBplKoiRljSmjknoolkj/Tensile-Test.png"],
  ["Quality Control Process", "We will never stop to pursue the better quality with scientific management methods to meet customers quality requirements.", "onBplKoiRljSmjknloljj/Data-Recording.png"],
  ["Professional Service", "We pay high attention to customers feedback. We will do the best to give satisfied solution within 24-48 hours if have quality problem.", "olBplKoiRljSikooqiloj/222.jpg"],
  ["Delivery On Time", "For regular parts, we always have stock and for customized parts, from make mold to bulk production, normally 30-40 days.", "omBplKoiRljSikooqilii/111.jpg"],
];

const REVIEWS = [
  ["Yahya", "onBplKoiRljSjkmmjilnj/Yahya-200-200.png", "The service is so nice, price is also good, the product itself came in the right time and quality is good."],
  ["Gygnus", "omBplKoiRljSjkpmkqlkj/Gygnus-200-200.png", "Helpful, professional, good quality! Will purchase again."],
  ["Venus", "oiBplKoiRljSjkpmrqlpk/Venus-200-200.png", "Thinkwell very professional, and the products looks good. We sales very well in our market. Will reback soon!"],
  ["Anthony", "onBplKoiRljSjkpmjolij/Anthony-200-200.png", "Excellent company to trade with product exceeded expectations and delivery time was exceptional. We are satisfied with Thinkwell quality and service."],
];

const NEWS = [
  ["September 21, 2026", "Invitation Letter for The 140th Canton Fair of ThinkWell", "opBplKoiRllSomoillppk/wenzhangsuolvetu-yingwen.png", "Sincerely invite you to visit Qingdao Thinkwell Hardware & Machinery Co., Ltd. at the 140th China Import and Export Fair (Canton Fair). We will showcase our latest products and look forward to face-to-face communication."],
  ["August 13, 2026", "Dual-ball Adjustable Hitch Mount: Combining Two Balls into One, The Flexible Tow", "ojBplKoiRllSmponompmn/wenzhangsuolvetu.png", "The dual-ball adjustable hitch mount integrates two commonly used specifications of ball heads onto the same arm, making towing preparation more efficient and convenient."],
  ["August 12, 2026", "AFM Disabler: Bringing The V8 Engine Back To Its Purest Form", "oqBplKoiRllSmpklnopjk/wenzhangsuolvetu.png", "If you own a GM or Chrysler V8, you may have seen \"V4 mode\" activate at highway speed as the engine shuts down half its cylinders to save fuel."],
];

const BANNERS = [
  "oqBplKoiRllSqqonqrpnk/yingwen1.png",
  "onBplKoiRllSrmnqppppl/banner.jpg",
  "ojBplKoiRljSmjljnilnj/3e89c665-f49b-47e3-9660-e4295b3280b7.jpg",
  "olBplKoiRljSmjljrrlki/41b620e7-558a-4d94-ae87-04bbe986f8b4.jpg",
  "lrBqlKoiRlmSrmpprjop/banner1.jpg",
];

function usePath() {
  const get = () => window.location.hash.slice(1) || "/";
  const [path, setPath] = useState(get);
  useEffect(() => {
    const on = () => { setPath(get()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return path;
}

const H2 = ({ children, light }) => (
  <h2 style={{ margin: 0, textAlign: "center", fontFamily: "Oswald, Arial, sans-serif", fontSize: 34, textTransform: "uppercase", color: light ? "#fff" : DARK }}>
    {children}
    <span style={{ display: "block", width: 60, height: 3, background: RED, margin: "12px auto 0" }} />
  </h2>
);
const Btn = ({ href, children }) => (
  <a href={href} style={{ alignSelf: "center", background: RED, color: "#fff", padding: "12px 28px", borderRadius: 3, textDecoration: "none", fontWeight: 600, letterSpacing: 0.5 }}>{children}</a>
);
const Section = ({ children, bg = "#fff" }) => (
  <section style={{ background: bg, padding: "64px 0" }}>
    <div style={{ ...WRAP, display: "flex", flexDirection: "column", gap: 32 }}>{children}</div>
  </section>
);
const Card = ({ name, src }) => (
  <a href="#/products" style={{ background: "#fff", border: "1px solid #eee", textDecoration: "none", color: "#333", display: "flex", flexDirection: "column" }}>
    <img src={img(src)} alt={name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
    <span style={{ padding: 12, fontSize: 14, lineHeight: 1.4 }}>{name}</span>
  </a>
);
const Grid = ({ children, min = 240 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 20 }}>{children}</div>
);
const PageHead = ({ title }) => (
  <div style={{ background: "#222", color: "#fff", padding: "48px 0" }}>
    <div style={WRAP}>
      <div style={{ fontSize: 13, color: "#aaa" }}><a href="#/" style={{ color: "#aaa" }}>Home</a> » {title}</div>
      <h1 style={{ margin: "8px 0 0", fontFamily: "Oswald, Arial, sans-serif", fontSize: 40 }}>{title}</h1>
    </div>
  </div>
);

function Header({ path }) {
  return (
    <header>
      <div style={{ background: DARK, color: "#ccc", fontSize: 13, padding: "8px 0" }}>
        <div style={{ ...WRAP, display: "flex", gap: 24 }}>
          <span>E-Mail: <a href="mailto:info@chinathinkwell.com" style={{ color: "#fff" }}>info@chinathinkwell.com</a></span>
          <span>Tel: +86-532-66968791</span>
        </div>
      </div>
      <div style={{ ...WRAP, display: "flex", alignItems: "center", gap: 24, padding: "16px 20px", flexWrap: "wrap" }}>
        <a href="#/"><img src={img("mpBqlKoiRlpSiqnnijoq/7.png")} alt="ThinkWell" style={{ height: 56 }} /></a>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <strong style={{ fontSize: 18, color: DARK }}>Qingdao Thinkwell Hardware & Machinery Co., Ltd.</strong>
          <span style={{ fontSize: 13, color: "#666" }}>Professional Manufacturer in Forging Parts, Offroad Recovery Gear Accessories since 2011.</span>
        </div>
      </div>
      <nav style={{ background: RED, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ ...WRAP, display: "flex", flexWrap: "wrap" }}>
          {NAV.map(([label, to]) => (
            <a key={to} href={"#" + to} style={{ color: "#fff", textDecoration: "none", padding: "14px 22px", fontWeight: 600, textTransform: "uppercase", fontSize: 14, background: path === to ? "#a7000e" : "transparent" }}>{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Banner() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % BANNERS.length), 5000); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: "relative", background: "#000" }}>
      <img src={img(BANNERS[i])} alt="Off road trailer accessories" style={{ width: "100%", display: "block", maxHeight: 620, objectFit: "cover" }} />
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
        {BANNERS.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} style={{ width: 12, height: 12, borderRadius: 6, border: 0, cursor: "pointer", background: k === i ? RED : "rgba(255,255,255,.6)" }} />
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Banner />
      <Section>
        <H2>Popular Products Trailer</H2>
        <p style={{ margin: 0, textAlign: "center", color: "#555", lineHeight: 1.7 }}>These offroad accessories are Thinkwell regular items and most of them can send you samples free of charge. Such as Shackle, Snatch Block, Hitch Receiver, Hitch Tightener, and so on. We can do customized logos and customized packing according to requirements. We have established good business relations with lots of famous brands because of good quality and professional service.</p>
        <Grid>{POPULAR.map(([n, s]) => <Card key={n} name={n} src={s} />)}</Grid>
        <Btn href="#/products">More Trailer Products</Btn>
      </Section>
      <Section bg="#f5f5f5">
        <H2>Who We Are</H2>
        <AboutText />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {STATS.map(([n, s, t]) => (
            <div key={t} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "Oswald, Arial, sans-serif", fontSize: 44, color: RED }}>{n}{s}</span>
              <span style={{ fontSize: 14, color: "#555" }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <H2>Product Categories</H2>
        <p style={{ margin: 0, textAlign: "center", color: "#555", lineHeight: 1.7 }}>Thinkwell has dealt with this for over 19 years and we are an ISO certified factory. We mainly deal in Off-road and Trailer Parts, Rigging Hardware, Pole Line Hardware, Off-road Accessories, Customized Forged Parts, and so on.</p>
        <Grid min={200}>{CAT_ICONS.map(([n, s]) => <Card key={n} name={n} src={s} />)}</Grid>
        <Btn href="#/products">Discover More 4×4 Off-Road Products</Btn>
      </Section>
      <QualitySection />
      <Section>
        <H2>Customer Evaluation</H2>
        <p style={{ margin: 0, textAlign: "center", color: "#555" }}>Customer satisfaction is our biggest impetus!</p>
        <Grid>
          {REVIEWS.map(([n, s, t]) => (
            <div key={n} style={{ background: "#f7f7f7", padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
              <img src={img(s)} alt={n} style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover" }} />
              <strong>{n}</strong>
              <p style={{ margin: 0, color: "#555", fontSize: 14, lineHeight: 1.6 }}>{t}</p>
            </div>
          ))}
        </Grid>
      </Section>
      <NewsSection />
    </>
  );
}

const AboutText = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "#555", lineHeight: 1.7 }}>
    <p style={{ margin: 0 }}>Thinkwell stands as a leading specialized manufacturer of 4×4 off-road parts & trailer accessories in China since 2011. We are certified by the ISO9001 Quality Management System; core products have obtained certifications from SGS, CE, and Australian Standard ADR, complying with the standards of European, American, and Australian markets. We have built a strong reputation for innovation, durability, and performance.</p>
    <p style={{ margin: 0 }}>With an 8,000 m² modern factory integrating R&D, production, and sales, we offer OEM/ODM solutions with competitive pricing, reliable supply chains and 24×7 after-sales service. Backed by international certifications, we combine innovation with superior performance, dedicated to providing cost-effective products and solutions to customers worldwide.</p>
  </div>
);

function QualitySection() {
  return (
    <Section bg="#222">
      <H2 light>Quality Control</H2>
      <p style={{ margin: 0, textAlign: "center", color: "#ccc", lineHeight: 1.7 }}>Quality and credit are the life of Thinkwell. We have a 100T Strength Tensile Machine, Hardness Testing Machine, Salt Spraying Machine, and other inspection tools to ensure the quality meets standard and client requirements. SGS, TUV, and other third-party quality inspections are acceptable.</p>
      <Grid>
        {QC.map(([t, d, s]) => (
          <div key={t} style={{ background: "#fff", display: "flex", flexDirection: "column" }}>
            <img src={img(s)} alt={t} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <strong style={{ color: DARK }}>{t}</strong>
              <span style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{d}</span>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  );
}

function NewsSection({ title = "Our News" }) {
  return (
    <Section bg="#f5f5f5">
      <H2>{title}</H2>
      <Grid min={300}>
        {NEWS.map(([d, t, s, x]) => (
          <article key={t} style={{ background: "#fff", display: "flex", flexDirection: "column" }}>
            <img src={img(s)} alt={t} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 13, color: RED }}>{d}</span>
              <strong style={{ color: DARK, lineHeight: 1.4 }}>{t}</strong>
              <p style={{ margin: 0, fontSize: 14, color: "#555", lineHeight: 1.6 }}>{x}</p>
            </div>
          </article>
        ))}
      </Grid>
    </Section>
  );
}

function Products() {
  const [cat, setCat] = useState(CATEGORIES[0]);
  return (
    <>
      <PageHead title="Products" />
      <Section>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "10px 20px", border: `1px solid ${RED}`, cursor: "pointer", fontWeight: 600, background: c === cat ? RED : "#fff", color: c === cat ? "#fff" : RED }}>{c}</button>
          ))}
        </div>
        <Grid>{PRODUCTS[cat].map(([n, s]) => <Card key={n} name={n} src={s} />)}</Grid>
      </Section>
    </>
  );
}

function About() {
  const why = [
    ["Full-chain one stop service", "\"Design-Produce-E-Commerce\" expert."],
    ["Industry and trade integration", "Streamlined processes – competitive pricing."],
    ["Global export experience", "Products exported to high-end markets such as America, Europe and Australia."],
    ["End-to-end service", "From demand matching to after-sales support, a one-stop, worry-free experience."],
    ["E-commerce specialist", "Incubated 10+ cross-border e-commerce companies from 0 to 1, and 30+ long-term partners."],
    ["Flexible supply chain", "Small-batch, quick-turnaround orders; customized packaging acceptable."],
    ["19+ years expertise", "Long-term development and a demonstrated 30% annual performance growth."],
    ["Young & dynamic team", "Fast response, customer-first – positive, sincere, and pragmatic."],
  ];
  const adv = [
    ["Technology-Driven Innovation", "Dedicated 5-member R&D team with full-cycle capabilities from design to mass production. Advanced processes including forging, stamping, precision casting, CNC machining, welding, and assembly."],
    ["Internationally Certified Quality & Testing", "ISO 9001 certified with SGS, CE, and Australian ADR compliance. Rigorous testing via laser scanners, 100T tensile testers, hardness testers, and salt spray chambers."],
    ["Reliable Delivery & Customization", "50+ expert team ensuring on-time delivery and zero-defect quality. OEM/ODM support from 3D prototyping to mass production."],
    ["Service Ecosystem", "Full-process B2B support, e-commerce ready assets (white-background images, multilingual manuals, certification packages), and 20,000+ SKUs on hand."],
  ];
  return (
    <>
      <PageHead title="ThinkWell Manufacturer" />
      <Section>
        <H2>Qingdao Thinkwell Hardware & Machinery Co., Ltd.</H2>
        <AboutText />
      </Section>
      <Section bg="#f5f5f5">
        <H2>Why Choose ThinkWell</H2>
        <Grid>
          {why.map(([t, d], k) => (
            <div key={t} style={{ background: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "Oswald, Arial, sans-serif", fontSize: 28, color: RED }}>0{k + 1}</span>
              <strong>{t}</strong>
              <span style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{d}</span>
            </div>
          ))}
        </Grid>
      </Section>
      <Section>
        <H2>ThinkWell Core Advantages</H2>
        <Grid min={260}>
          {adv.map(([t, d]) => (
            <div key={t} style={{ borderTop: `3px solid ${RED}`, padding: 20, background: "#f7f7f7", display: "flex", flexDirection: "column", gap: 8 }}>
              <strong>{t}</strong>
              <span style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{d}</span>
            </div>
          ))}
        </Grid>
      </Section>
    </>
  );
}

const Support = () => (<><PageHead title="Quality Control" /><QualitySection /></>);
const News = () => (<><PageHead title="News" /><NewsSection title="Latest News" /></>);

function InquiryForm() {
  const [sent, setSent] = useState(false);
  const field = { padding: 12, border: "1px solid #ccc", fontSize: 14, fontFamily: "inherit" };
  if (sent) return <p style={{ margin: 0, color: "#2e7d32", fontWeight: 600 }}>Thank you! We will reply within 24 hours.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <strong>Please fill in your request</strong>
      <input required placeholder="Name *" style={field} />
      <input required type="email" placeholder="Email *" style={field} />
      <textarea required rows={5} placeholder="Message *" style={field} />
      <button style={{ alignSelf: "flex-start", background: RED, color: "#fff", border: 0, padding: "12px 32px", fontWeight: 600, cursor: "pointer" }}>Submit</button>
    </form>
  );
}

function Contact() {
  return (
    <>
      <PageHead title="Contact Us" />
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
          <InquiryForm />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, color: "#444", lineHeight: 1.6 }}>
            <strong style={{ fontSize: 22, color: DARK }}>Contact Thinkwell</strong>
            <span>No. 19, Third Ring Road, Jimo District, Qingdao City, Shandong Province, China</span>
            <span>+86-532-66968781<br />+86-532-66968791<br />+86 15315329369</span>
            <span><a href="mailto:info@chinathinkwell.com">info@chinathinkwell.com</a><br /><a href="mailto:victor@chinathinkwell.com">victor@chinathinkwell.com</a></span>
            <span>WhatsApp: <a href="https://api.whatsapp.com/send?phone=8615953297946">8615953297946</a></span>
          </div>
        </div>
      </Section>
    </>
  );
}

function Footer() {
  const link = { color: "#bbb", textDecoration: "none" };
  return (
    <footer style={{ background: "#111", color: "#bbb", fontSize: 14 }}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, padding: "48px 20px" }}>
        <img src={img("mrBqlKoiRlpSpjnqkpom/logo2.png")} alt="THINK WELL" style={{ maxWidth: 180 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ color: "#fff" }}>Quick Links</strong>
          {NAV.map(([l, t]) => <a key={t} href={"#" + t} style={link}>{l}</a>)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.6 }}>
          <strong style={{ color: "#fff" }}>Contact</strong>
          <span>Call Us: +86-0532-66968791</span>
          <span>Email: info@chinathinkwell.com<br />victor@chinathinkwell.com</span>
          <span>No. 19, Third Ring Road, Jimo District, Qingdao City, Shandong Province, China</span>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #333", padding: 16, textAlign: "center", fontSize: 13 }}>Copyrights 2022 Qingdao Thinkwell Hardware & Machinery Co., Ltd. All rights reserved.</div>
    </footer>
  );
}

const PAGES = { "/": Home, "/products": Products, "/about": About, "/support": Support, "/news": News, "/contact": Contact };

export default function App() {
  const path = usePath();
  const Page = PAGES[path] || Home;
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#333" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:500&display=swap" />
      <Header path={path} />
      <main><Page /></main>
      <Footer />
    </div>
  );
}
