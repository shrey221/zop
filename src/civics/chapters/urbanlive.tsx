// Civics Chapter 9 · Urban Livelihoods (NCERT Social and Political Life – I, pp. 76–85).
// Wording is original; the people and figures follow the textbook. Pictures are original drawings.
import { useState } from "react";
import { ExploreLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import { CompareLab, Figure } from "../kit";

/* Stop 1 · working on the street */
function StreetArt() {
  return (
    <g>
      <rect width="520" height="280" fill="#ffe8c2" />
      <rect y="0" width="520" height="120" fill="#cfe6f7" />
      {[20, 120, 230, 340, 440].map((x, i) => (
        <rect key={x} x={x} y={30 + (i % 2) * 14} width="80" height={96 - (i % 2) * 14} fill={["#d6c2a8", "#e0b8a0", "#c9d2dc", "#e6d2a8", "#d0c0d8"][i]} />
      ))}
      <rect y="120" width="520" height="40" fill="#cfc6b6" />
      <rect y="160" width="520" height="120" fill="#6b6b78" />
      <path d="M0 220 H520" stroke="#fff" strokeWidth="2" strokeDasharray="14 10" />
      {/* stalls on the pavement */}
      <rect x="20" y="126" width="70" height="26" rx="4" fill="#8a5a2b" />
      <text x="26" y="146" fontSize="16">🍅🥕🥒</text>
      <rect x="100" y="126" width="62" height="26" rx="4" fill="#a8475a" />
      <text x="106" y="146" fontSize="16">🌹🌼</text>
      <text x="190" y="150" fontSize="22">📰</text>
      <Figure x={200} y={160} s={0.6} shirt="#7fb8ff" />
      <text x="250" y="116" fontSize="24">🌳</text>
      <text x="262" y="152" fontSize="16">👞</text>
      <Figure x={280} y={160} s={0.55} shirt="#c58bff" />
      <text x="320" y="152" fontSize="16">💈</text>
      <Figure x={345} y={160} s={0.6} shirt="#ffd257" />
      {/* a pushcart and a cycle trolley on the road */}
      <rect x="60" y="182" width="70" height="24" rx="4" fill="#ff9b7a" />
      <circle cx="74" cy="210" r="7" fill="#2b2a30" />
      <circle cx="116" cy="210" r="7" fill="#2b2a30" />
      <text x="70" y="200" fontSize="12">🧴📦</text>
      <text x="200" y="210" fontSize="26">🚲</text>
      <text x="228" y="200" fontSize="14">🥬</text>
      {/* rickshaws waiting in a row */}
      <text x="380" y="250" fontSize="26">🛺🛺🛺</text>
      <text x="420" y="196" fontSize="22">🚌</text>
    </g>
  );
}
function OnTheStreet({ discover }: SimProps) {
  return (
    <ExploreLab
      viewBox="0 0 520 280"
      art={<StreetArt />}
      intro="Early morning in a big city, and the main street is already buzzing. Tap each person working on the street."
      spots={[
        { id: "veg", label: "Vegetable vendor", x: 55, y: 132, text: "She arranges tomatoes, carrots and cucumbers in baskets so people can see what she's selling." },
        { id: "flower", label: "Flower stall", x: 130, y: 132, text: "A colourful stall selling all kinds of flowers." },
        { id: "news", label: "Newspaper seller", x: 200, y: 112, text: "A small crowd gathers around him — everyone wants to read the news!" },
        { id: "cobbler", label: "Cobbler", x: 270, y: 134, text: "Under a tree, a cobbler takes his tools out of a small tin box." },
        { id: "barber", label: "Roadside barber", x: 330, y: 134, text: "He already has a customer who wants an early-morning shave." },
        { id: "cart", label: "Pushcart seller", x: 95, y: 186, text: "A woman pushes a cart with plastic bottles, boxes, hairpins and clips." },
        { id: "trolley", label: "Cycle trolley", x: 215, y: 188, text: "Someone on a cycle trolley carries vegetables to sell at people's homes." },
        { id: "rickshaw", label: "Rickshaws", x: 420, y: 238, text: "Rickshaws wait in a row for customers." },
      ]}
      groups={{ selling: ["veg", "flower", "news", "cart", "trolley"], services: ["cobbler", "barber", "rickshaw"] }}
      discover={discover}
    />
  );
}

/* Stop 2 · a day in the life of Bachchu Manjhi, cycle-rickshaw puller */
function RickshawDay({ discover }: SimProps) {
  const [trips, setTrips] = useState(12);
  const [ill, setIll] = useState(false);
  const [why, setWhy] = useState(false);
  const FARE = 7.5; // a typical trip: fares are Rs 5–10
  const SPEND = 55; // he spends Rs 50–60 a day on food and rent
  const earn = ill ? 0 : Math.round(trips * FARE);
  const save = earn - SPEND;
  return (
    <Stage
      caption={
        why
          ? "Bachchu Manjhi was a mason in a village in Bihar. His family owns no land, and masonry work there wasn't regular, so he came to the city. His wife and three children still live in the village; he visits two or three times a year."
          : ill
            ? "When he's ill, he can't pull the rickshaw — so he earns nothing that day, but still has to pay for food and rent. He is self-employed: no one pays him for days off."
            : "Each morning he waits at the bus stop and works till 8.30 in the evening, taking rides of up to 6 km. He bought an old rickshaw, paying in instalments. Move the slider to change today's trips."
      }
    >
      <svg viewBox="0 0 520 160" className="block h-auto w-full select-none">
        <rect width="520" height="160" fill={ill ? "#3a3550" : "#ffe8c2"} />
        <rect y="110" width="520" height="50" fill="#6b6b78" />
        {ill ? (
          <text x="120" y="100" fontSize="40">🤒</text>
        ) : (
          <text x={60 + Math.min(trips, 15) * 20} y="128" fontSize="40">🚲</text>
        )}
        <text x="500" y="40" fontSize="12" fontWeight="900" fill={ill ? "#fff" : "#3a2414"} textAnchor="end">
          {ill ? "No work, no pay" : `${trips} trips today`}
        </text>
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-white/50">Trips today (Rs 5–10 each)</label>
        <input
          aria-label="Trips today"
          type="range"
          min="8"
          max="14"
          value={trips}
          onChange={(e) => {
            setTrips(+e.target.value);
            setIll(false);
            discover("earn");
          }}
          className="mt-2 w-full accent-[#ffd257]"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Readout label="Earns" value={`Rs ${earn}`} />
          <Readout label="Food + rent" value={`Rs ${SPEND}`} color="#ff9b7a" />
          <Readout label="Saved for family" value={`Rs ${save}`} color={save >= 0 ? "#5fe0a0" : "#ff6b6b"} />
        </div>
        <p className="mt-2 text-[11px] font-bold text-white/40">He earns about Rs 80–100 a day. The fare per trip here is an average we chose.</p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn
          on={ill}
          onClick={() => {
            setIll(!ill);
            setWhy(false);
            discover("ill");
          }}
        >
          🤒 He falls ill
        </Btn>
        <Btn
          on={why}
          onClick={() => {
            setWhy(true);
            setIll(false);
            discover("migrate");
          }}
        >
          🏡 Why is he in the city?
        </Btn>
      </div>
    </Stage>
  );
}

/* Stop 3 · four ways of working in the city */
function FourWorkers({ discover }: SimProps) {
  return (
    <CompareLab
      discover={discover}
      intro="Compare four people who work in the city. Pick a person, then tap each question."
      people={[
        { id: "bachchu", name: "Bachchu", icon: "🚲", tag: "Rickshaw puller" },
        { id: "hv", name: "Harpreet & Vandana", icon: "👗", tag: "Showroom owners" },
        { id: "nirmala", name: "Nirmala", icon: "🧵", tag: "Factory tailor" },
        { id: "sudha", name: "Sudha", icon: "💼", tag: "Marketing manager" },
      ]}
      rows={[
        { id: "place", label: "Place of work", icon: "📍" },
        { id: "earn", label: "Earnings", icon: "💰" },
        { id: "secure", label: "Job security", icon: "🛡" },
        { id: "benefits", label: "Benefits", icon: "🎁" },
        { id: "own", label: "Own or employed", icon: "🧾" },
      ]}
      cells={{
        bachchu: {
          place: { short: "Streets", long: "He waits at the bus stop and takes customers up to 6 km around." },
          earn: { short: "Rs 80–100 a day", long: "He earns Rs 80–100 a day, spends Rs 50–60 on food and rent, and saves the rest for his family." },
          secure: { short: "None", long: "When he's ill he earns nothing. People working on the street can even be asked by the police to move." },
          benefits: { short: "None", long: "No holidays, no medical cover, no savings scheme." },
          own: { short: "Own", long: "He works on his own; no one employs him." },
        },
        hv: {
          place: { short: "Showroom", long: "A three-floor garment showroom in a busy market, in a rented building they plan to buy." },
          earn: { short: "Growing", long: "Their business has grown — they've bought a car and booked a flat nearby." },
          secure: { short: "Own business", long: "Their shop is a permanent one, licensed by the Municipal Corporation." },
          benefits: { short: "—", long: "They run their own business, so there's no employer giving benefits — they must plan, buy stock from many cities and advertise." },
          own: { short: "Own", long: "They work on their own, and employ supervisors and helpers." },
        },
        nirmala: {
          place: { short: "Factory", long: "An export garment unit making summer clothes for the USA, UK, Germany and the Netherlands." },
          earn: { short: "Rs 80 a day", long: "Rs 80 for eight hours, plus Rs 40 for working late. From December to April she works 9 a.m. to 10 p.m., six days a week." },
          secure: { short: "None", long: "By June the work is over and she'll be asked to leave — 3–4 months a year with no work. Workers who complain are asked to leave." },
          benefits: { short: "None", long: "No security or protection, even if she's treated badly." },
          own: { short: "Casual", long: "She is employed on a casual basis — only when the employer needs her." },
        },
        sudha: {
          place: { short: "Office", long: "A biscuit company's office. She supervises 50 salespersons across six regions of the city." },
          earn: { short: "Rs 30,000 a month", long: "She gets a regular salary every month." },
          secure: { short: "Permanent", long: "She's a permanent worker and can expect her job to continue for a long time." },
          benefits: { short: "Many", long: "Savings for old age, Sundays, national holidays and annual leave off, and medical cover and leave for her family." },
          own: { short: "Permanent", long: "She is employed as a regular, permanent worker." },
        },
      }}
      rules={[
        { id: "self", need: [["bachchu", "own"], ["hv", "own"]] },
        { id: "casual", need: [["nirmala", "secure"], ["nirmala", "own"]] },
        { id: "permanent", need: [["sudha", "secure"], ["sudha", "benefits"]] },
        { id: "unequal", need: [["bachchu", "earn"], ["nirmala", "earn"], ["sudha", "earn"]] },
      ]}
    />
  );
}

/* Stop 4 · permanent and casual work */
function PermanentCasual({ discover }: SimProps) {
  const items = [
    { id: "salary", label: "A regular salary every month", icon: "💵", bin: "perm", why: "Permanent workers attend the same workplace regularly and their work is clearly identified." },
    { id: "pension", label: "Part of the salary saved for old age", icon: "👵", bin: "perm" },
    { id: "leave", label: "Sundays, national holidays and annual leave", icon: "🏖", bin: "perm" },
    { id: "medical", label: "Medical expenses and paid medical leave", icon: "🏥", bin: "perm" },
    { id: "stay", label: "Not asked to leave when there's less work", icon: "🛡", bin: "perm" },
    { id: "called", label: "Called only when the employer has big orders", icon: "📞", bin: "cas", why: "Casual workers are employed only as and when needed." },
    { id: "complain", label: "Asked to leave if they complain about pay", icon: "🚪", bin: "cas" },
    { id: "gap", label: "No work for three or four months a year", icon: "📅", bin: "cas" },
    { id: "chowk", label: "Waiting at the labour chowk to be picked for the day", icon: "🧰", bin: "cas" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Is each card about a permanent job or a casual one?"
      bins={[
        { id: "perm", label: "Permanent", icon: "🏢", color: "#5fe0a0" },
        { id: "cas", label: "Casual", icon: "⏳", color: "#ffb46b" },
      ]}
      items={items}
      rules={[
        { id: "perm", when: (p) => all(p, "perm") },
        { id: "cas", when: (p) => all(p, "cas") },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "curbanlive",
  subject: "Civics",
  n: 9,
  title: "Urban Livelihoods",
  pages: "76–85",
  icon: "🏙",
  theme: { grad: "linear-gradient(135deg,#1c0f2e 0%,#7a3aa8 55%,#ff7a6b 130%)", accent: "#6b2f99", soft: "#f1e6fa", ink: "#46206b" },
  opening: "They say “the city never sleeps”! India has more than five thousand towns and many big cities. What work do people do there — and do they all have similar chances?",
  stops: [
    {
      id: "street",
      icon: "🛒",
      title: "Working on the street",
      pages: "76–79",
      wonder: {
        q: "Street vendors, cobblers and rickshaw pullers — who employs them?",
        options: [
          { id: "self", label: "No one — they work on their own" },
          { id: "govt", label: "The government" },
          { id: "company", label: "A big company" },
        ],
        answer: "self",
        reveal: "They work on their own, so they must organise their own work — what to buy, and where and how to set up.",
      },
      explore: { activity: "The main street", title: "Street explorer", how: "Tap each person working on the street.", Sim: OnTheStreet },
      discoveries: [
        { id: "selling", text: "Many people sell things on the street" },
        { id: "services", text: "Others repair things or provide services" },
      ],
      understand: [
        { title: "How many?", body: "In a survey of Ahmedabad, 12 per cent of all workers worked on the street. India has almost one crore street vendors in urban areas." },
        { title: "No security", body: "Their shops are often temporary — boards, boxes or a plastic sheet. Police can ask them to remove them any time, and some areas are closed to hawkers." },
        { title: "A right to earn", body: "Street vending is now recognised as a right to earn a living. Hawking zones have been suggested, and hawkers should be part of committees that decide about them." },
        { title: "Family work", body: "Food sold on the street is often prepared at home by the vendor's family." },
      ],
      check: [{ id: "cw1", kind: "mcq", q: "About how many street vendors work in India's urban areas?", options: ["Almost one crore", "About a hundred", "None"], answer: 0, why: "Almost one crore (ten million)." }],
      connect: [
        { icon: "🥕", title: "Talk to a vendor", body: "Ask a vegetable vendor how they organise buying, preparing and selling." },
        { icon: "🗺", title: "Hawking zones", body: "Where could hawkers work in your town without blocking traffic?" },
        { icon: "🔍", title: "Look around", body: "What services do people provide on the streets near you?" },
      ],
    },
    {
      id: "rickshaw",
      icon: "🚲",
      title: "Bachchu Manjhi's day",
      pages: "78–79",
      wonder: {
        q: "Bachchu Manjhi earns money only when he works. What happens on a day he takes off?",
        options: [
          { id: "none", label: "He earns nothing that day" },
          { id: "paid", label: "He still gets paid" },
        ],
        answer: "none",
        reveal: "He earns nothing — so he has to think twice before taking a day off.",
      },
      explore: { activity: "A cycle-rickshaw puller", title: "A day's earnings", how: "Change today's trips, see what happens when he falls ill, and find out why he came to the city.", Sim: RickshawDay },
      discoveries: [
        { id: "earn", text: "His earnings depend on how many rides he gets" },
        { id: "ill", text: "On days he's ill, he earns nothing" },
        { id: "migrate", text: "He moved from his village for work and sends money home" },
      ],
      understand: [{ title: "Living apart", body: "He shares a rented room with friends who work in a factory. His family survives on what he sends, plus his wife's occasional farm work." }],
      check: [{ id: "cw2", kind: "tf", q: "Bachchu Manjhi lives in the city with his whole family.", answer: false, why: "His wife and three children live in the village in Bihar." }],
      connect: [
        { icon: "🏘", title: "Moving for work", body: "Do you know anyone who moved to a city for work? What do they miss?" },
        { icon: "🛺", title: "Your ride", body: "Next time you take a rickshaw or auto, think about how the driver's day works." },
        { icon: "💭", title: "A day off", body: "Why does Bachchu Manjhi think twice before taking a day off?" },
      ],
    },
    {
      id: "workers",
      icon: "👥",
      title: "Four city workers",
      pages: "79–84",
      wonder: {
        q: "Nirmala works in a big garment factory. Is her job safe all year?",
        options: [
          { id: "no", label: "No — she's asked to leave when the busy season ends" },
          { id: "yes", label: "Yes, it's permanent" },
        ],
        answer: "no",
        reveal: "No. She works very long hours from December to April, but by June she'll be asked to leave.",
      },
      explore: { activity: "Market, factory, office", title: "Compare four workers", how: "Fill in the table for all four people.", Sim: FourWorkers },
      discoveries: [
        { id: "self", text: "Some people work on their own — on the street or in their own shop" },
        { id: "casual", text: "Casual workers like Nirmala have no job security" },
        { id: "permanent", text: "Permanent workers like Sudha get security and benefits" },
        { id: "unequal", text: "Earnings and security in the city are very unequal" },
      ],
      understand: [
        { title: "Licensed shops", body: "Businesspersons like Harpreet and Vandana have permanent shops licensed by the Municipal Corporation, which also decides which day the market closes." },
        { title: "Labour chowk", body: "Daily-wage labourers wait at the labour chowk to help masons, dig, lift loads and build roads. Many can't afford housing and sleep on pavements or in night shelters." },
        { title: "Call centres", body: "A new kind of city job: centralised offices answering customers' questions about goods and services like banking and ticket booking." },
      ],
      check: [{ id: "cw3", kind: "mcq", q: "Who among these is a permanent worker?", options: ["Sudha", "Nirmala", "Bachchu Manjhi"], answer: 0, why: "Sudha gets a regular salary, savings for old age, holidays and medical benefits." }],
      connect: [
        { icon: "🏪", title: "Shop owner", body: "Ask a shop owner how they plan their work and how their business has changed over twenty years." },
        { icon: "🏠", title: "Domestic workers", body: "Are housemaids also casual workers? Why? Describe one such woman's working day." },
        { icon: "🧵", title: "Long hours", body: "How would working 9 a.m. to 10 p.m. affect a person's family life?" },
      ],
    },
    {
      id: "jobs",
      icon: "🏢",
      title: "Permanent or casual?",
      pages: "82–84",
      wonder: {
        q: "Why do you think small factories employ casual workers?",
        options: [
          { id: "orders", label: "They need extra workers only when large orders come" },
          { id: "always", label: "They always need the same number of people" },
        ],
        answer: "orders",
        reveal: "Casual workers are employed when the employer has big orders or a busy season — and let go at other times.",
      },
      explore: { activity: "Regular and casual work", title: "Sort the job features", how: "Sort each feature into permanent or casual work.", Sim: PermanentCasual },
      discoveries: [
        { id: "perm", text: "Permanent jobs: regular salary, savings, holidays, medical cover" },
        { id: "cas", text: "Casual jobs: work only when needed, and no security" },
      ],
      understand: [
        { title: "Tied together", body: "So many people do so many different things in a city. They may never meet, but their work ties them together and makes up city life." },
      ],
      check: [{ id: "cw4", kind: "tf", q: "Permanent workers are asked to leave whenever the factory has less work.", answer: false, why: "That happens to casual workers; permanent workers keep their jobs." }],
      connect: [
        { icon: "🏠", title: "At home", body: "Talk to adults in your family. Is their work permanent, casual, or their own business?" },
        { icon: "📋", title: "Service map", body: "Make a table of services provided by people in a market you visit often." },
        { icon: "🌆", title: "City life", body: "Whose work did you depend on today?" },
      ],
    },
  ],
  learnt: [
    "Many city people work on the street, selling things or providing services; they work on their own and have no security.",
    "Bachchu Manjhi earns only on the days he works, and lives away from his family to earn.",
    "Businesspersons run licensed shops and employ others.",
    "Casual workers like Nirmala work only when needed; permanent workers like Sudha get a salary, security and benefits.",
    "The work of many different people ties a city together.",
  ],
  keywords: ["Livelihood", "Street vendor", "Hawking zone", "Self-employed", "Businessperson", "Casual worker", "Labour chowk", "Permanent worker", "Call centre"],
};

export default chapter;
