export const COMPANY = {
  short: "Thinkwell USA",
  legal: "Thinkwell USA Hardware & Machinery Co., Ltd",
  email: "info.thinkwell@gmail.com",
  tel: "+1 949-432-6206",
  telHref: "tel:+19494326206",
  whatsapp: "19494326206",
  address: "3002 Inland Empire Boulevard, Ontario, California, 91764",
  year: 2026,
};

export const waLink = (text) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

export const slugify = (s) =>
  s.replace(/[×*]/g, "x").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const CATEGORIES = [
  { name: "Off Road Accessories", blurb: "Recovery gear built for 4x4 trucks, SUVs and overland rigs: shackles, snatch blocks, kinetic ropes, traction boards and complete recovery kits." },
  { name: "Trailer Parts", blurb: "Hitch mounts, receivers, couplers, jacks and safety chain for light- and heavy-duty towing." },
  { name: "Rigging Hardware", blurb: "Load-rated chain, hooks, sleeves, sockets and ground anchors for lifting and securing." },
  { name: "Marine Hardware", blurb: "Boat anchors, cleats and corrosion-resistant fittings for docks, yachts and kayaks." },
  { name: "OEM/ODM", blurb: "Custom forged and machined parts made to your drawing, logo and packaging requirements." },
].map((c) => ({ ...c, slug: slugify(c.name) }));

const P = (name, category, desc, specs = {}) => ({ name, category, desc, specs, slug: slugify(name) });

export const PRODUCTS = [
  P("Aluminum Alloy Adjustable Drop Hitch", "Trailer Parts", "Lightweight aluminum drop hitch with adjustable height so the trailer rides level behind lifted or lowered trucks.", { Material: "Aluminum alloy", Receiver: "2 in.", Finish: "Anodized" }),
  P("Tri-Ball Trailer Hitch Mount with 360° Swivel Tow Shackle", "Trailer Parts", "Three common ball sizes on one mount plus a swivel shackle point, so one hitch handles most trailers.", { Balls: "1-7/8, 2, 2-5/16 in.", Receiver: "2 in." }),
  P("Alloy Steel Sleeve Style Coupler Lock", "Trailer Parts", "Hardened sleeve lock that keeps an unattended trailer coupler from being hitched up.", { Material: "Alloy steel" }),
  P("Pintle Hook with Hitch Ball", "Trailer Parts", "Combination pintle hook and ball for job sites that tow both lunette-ring and ball-coupler trailers.", { Material: "Forged steel" }),
  P("Shackle Hitch Receiver 2'' Tow Hitch Slider", "Off Road Accessories", "Bolt-in receiver that adds a secure shackle recovery point to any 2 in. hitch.", { Receiver: "2 in.", Pin: "5/8 in." }),
  P("Forged 10T/12T Snatch Block", "Off Road Accessories", "Forged-steel pulley block that doubles winch pulling power or changes pull direction.", { WLL: "10T / 12T", Material: "Forged steel" }),
  P("Off Road 4x4 Extreme Complete Recovery Kit", "Off Road Accessories", "Everything for a self-recovery in one bag: kinetic rope, soft shackles, tree saver, snatch block and gloves.", { Includes: "7 pieces" }),
  P("Heavy Duty Recovery Boards with Replaceable Metal Studs", "Off Road Accessories", "Traction boards with replaceable metal studs for grip in sand, mud and snow.", { Material: "Reinforced nylon" }),
  P("4x4 Off Road Black Painted Forged D Ring Shackle", "Off Road Accessories", "Forged D-ring shackle with black powder coat and a screw pin, for recovery points and winch lines.", { Size: "3/4 in.", WLL: "4.75T" }),
  P("Full Braided Sleeve Soft Shackle", "Off Road Accessories", "Synthetic soft shackle with a full abrasion sleeve. Lighter and safer than steel.", { Material: "UHMWPE" }),
  P("Heavy Duty Off-road Recovery Kinetic Rope", "Off Road Accessories", "Double-braided nylon rope that stretches and stores energy for smooth snatch recoveries.", { Material: "Nylon 66" }),
  P("Heavy Duty Farm Jack High Lift Jack", "Off Road Accessories", "Multi-purpose high lift jack for lifting, winching and clamping on and off the trail.", { Capacity: "7,000 lb" }),
  P("8000Lbs 15'' Lift Trailer Jack", "Trailer Parts", "Square weld-on tongue jack with adjustable drop leg for heavy RV and equipment trailers.", { Capacity: "8,000 lb", Lift: "15 in." }),
  P("Hand Winch with Polyester Strap and Hook", "Trailer Parts", "Geared hand winch for loading boats and small equipment onto trailers.", { Strap: "Polyester" }),
  P("Hitch Step Anti Slip", "Trailer Parts", "Receiver-mounted step with an anti-slip tread for easier access to the truck bed and roof.", { Receiver: "2 in." }),
  P("G70 Chain Assemblies With Grab Hook And Clevis Pear Link", "Rigging Hardware", "Grade 70 transport chain assembly for load securement.", { Grade: "G70" }),
  P("G80 Black Oiled Alloy Steel Lifting Chain", "Rigging Hardware", "Heat-treated grade 80 alloy chain for overhead lifting slings.", { Grade: "G80" }),
  P("Crimps Aluminum Duplex Sleeves for Wire Rope Cable", "Rigging Hardware", "Aluminum duplex sleeves for making secure wire rope loops.", { Material: "Aluminum" }),
  P("Earth Ground Anchor with Auger", "Rigging Hardware", "Screw-in auger anchor for guy wires, tents, sheds and fencing.", { Finish: "Hot-dip galvanized" }),
  P("Portable Galvanized Carbon Steel Danforth Anchor for Boat", "Marine Hardware", "Fluke-style anchor that holds well in sand and mud and stows flat.", { Finish: "Galvanized" }),
  P("Yacht Boat 304/316 Stainless Steel Bruce Anchor", "Marine Hardware", "Claw-style stainless anchor that sets quickly in most seabeds.", { Material: "304 / 316 stainless" }),
  P("4'' 6'' 8'' Nylon Boat Kayak Cleat", "Marine Hardware", "UV-resistant nylon cleats for kayaks, docks and small boats.", { Sizes: "4, 6, 8 in." }),
  P("Precision Forging Steel Trailer Towing Eyes", "OEM/ODM", "Custom forged towing eyes made to your drawing and load spec.", { Process: "Closed-die forging" }),
  P("ISO Certified OEM Die Forging Manufacturer", "OEM/ODM", "Die forging, CNC machining and finishing for custom steel parts, from prototype to production.", { Process: "Forging + CNC" }),
];

export const NEWS = [
  { title: "Thinkwell USA Opens Ontario, California Warehouse", date: "October 1, 2026", image: "/images/warehouse-aerial.jpeg",
    summary: "Our new Inland Empire distribution center lets us ship recovery gear and trailer parts to US customers faster.",
    body: [
      "Thinkwell USA now runs a warehouse at 3002 Inland Empire Boulevard in Ontario, California. The site keeps our most popular off-road and trailer products in stock for quick domestic shipping.",
      "Being close to the ports of Los Angeles and Long Beach and the major Southern California freight routes lets us cut lead times for dealers, distributors and fleet buyers across the United States.",
      "Customers can visit by appointment to see products in person, pick up orders or talk through custom OEM projects with our team.",
    ] },
  { title: "How to Choose the Right Recovery Shackle", date: "September 18, 2026",
    summary: "Steel or soft? Bow or D-ring? A practical guide to choosing shackles for off-road recovery.",
    body: [
      "Shackles are the link between your recovery strap and the vehicle, so getting the right one matters. Start with the working load limit (WLL): it should match or exceed the rest of your recovery system.",
      "Forged steel D-ring and bow shackles last a long time and are cheap, but they are heavy and can be dangerous if something fails. Synthetic soft shackles weigh much less and store less energy, which makes them a popular choice for kinetic recoveries.",
      "Whichever type you use, inspect it before every recovery, never side-load a steel shackle past its rating, and replace any part that shows cracks, deformation or worn fibers.",
    ] },
  { title: "Dual-Ball Hitch Mounts: One Arm, More Trailers", date: "August 20, 2026",
    summary: "Why adjustable multi-ball hitch mounts are becoming standard equipment for people who tow more than one kind of trailer.",
    body: [
      "Many households and businesses tow several trailers with different coupler sizes. A dual- or tri-ball adjustable mount puts the common ball sizes on one arm, so you don't have to swap hardware.",
      "Adjustable drop and rise also keeps the trailer level, which improves braking, tire wear and handling. Aluminum versions weigh less while keeping the strength needed for everyday towing.",
      "Ask our team which configuration fits your towing capacity and receiver size.",
    ] },
].map((n) => ({ ...n, slug: slugify(n.title) }));

export const FAQS = [
  ["What is your minimum order quantity?", "Many stock items have no minimum. Custom OEM parts usually start from a small trial batch. Contact us for details."],
  ["Can I get samples?", "Yes. We provide samples of most regular items so you can check quality before ordering."],
  ["Do you offer custom logos and packaging?", "Yes. We offer laser-etched or cast logos, custom colors and retail-ready packaging."],
  ["How long is delivery?", "Stock items usually ship from our Ontario, CA warehouse within a few business days. Custom tooling and production typically take 30–40 days."],
  ["What certifications do your products have?", "Our products are made under an ISO 9001 quality system, and third-party inspection is welcome."],
];
