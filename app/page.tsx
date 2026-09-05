"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const services = [
  ["01", "CRM tizimlari", "Lead, sotuv va jamoa ishini yagona aqlli tizimda boshqaring.", "crm"],
  ["02", "Chatbotlar", "Telegram va Instagram orqali 24/7 ishlaydigan savdo yordamchingiz.", "chat"],
  ["03", "Mobil ilovalar", "Android va iOS uchun tezkor, qulay va kengayishga tayyor mahsulotlar.", "mobile"],
  ["04", "Web platformalar", "Sayt, online do‘kon yoki murakkab web-ilova — biznes maqsadingiz uchun.", "web"],
  ["05", "Avtomatlashtirish", "Takroriy jarayonlarni API va integratsiyalar bilan tezlashtiramiz.", "flow"],
  ["06", "AI yechimlar", "AI yordamchilar va aqlli avtomatlashtirish bilan vaqtingizni tejang.", "ai"],
];

const steps = ["Konsultatsiya", "Tahlil", "Rejalashtirish", "UI/UX dizayn", "Development", "Test & launch"];
const faqs = [
  ["Loyiha qancha vaqtda tayyor bo‘ladi?", "Muddat funksiyalar, integratsiyalar va dizayn murakkabligiga qarab belgilanadi. Konsultatsiyadan keyin aniq reja va muddatni taqdim qilamiz."],
  ["Loyiha narxi qancha?", "Har bir loyiha individual hisoblanadi. G‘oyangizni yuboring — funksiyalar va maqsadlaringizdan kelib chiqib, taxminiy byudjet tayyorlaymiz."],
  ["Ishga tushgandan keyin qo‘llab-quvvatlaysizlarmi?", "Ha. Biz mahsulotni topshirib ketmaymiz: texnik qo‘llab-quvvatlash, yangilanishlar va keyingi rivojlantirishda yoningizdamiz."],
  ["Mavjud tizimimizni integratsiya qila olasizmi?", "Ha. API mavjud bo‘lsa, CRM, to‘lov tizimlari, Telegram, Instagram va boshqa servislarni yagona oqimga bog‘laymiz."],
];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

function ServiceIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    crm: <><rect x="3" y="4" width="18" height="16" rx="2" {...common}/><path d="M7 9h10M7 14h6" {...common}/><circle cx="17" cy="14" r="1.5" {...common}/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-9 7.35L5 21l1.7-5.1A7.5 7.5 0 1 1 20 11.5Z" {...common}/><path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" {...common}/></>,
    mobile: <><rect x="6.5" y="2.5" width="11" height="19" rx="2" {...common}/><path d="M10 5h4M11.2 18.3h1.6" {...common}/></>,
    web: <><rect x="2.5" y="4" width="19" height="16" rx="2" {...common}/><path d="M2.5 8h19M6 6h.01M8 6h.01M12 12l-2 2 2 2M15 12l2 2-2 2" {...common}/></>,
    flow: <><path d="M7 4H4v3M4.5 6.5A7.5 7.5 0 0 1 18.8 9M17 20h3v-3M19.5 17.5A7.5 7.5 0 0 1 5.2 15" {...common}/></>,
    ai: <><path d="M12 3 14 8l5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" {...common}/><path d="m18.5 15 .8 2 .8-2 2-.8-2-.8-.8-2-.8 2-2 .8 2 .8Z" {...common}/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFormError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Lead yuborilmadi");
      form.reset();
      setSent(true);
    } catch {
      setFormError("So‘rov yuborilmadi. Internet va bot sozlamalarini tekshiring.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -34px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <main>
    <section className="hero" id="top">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Moderna bosh sahifa"><span className="brand-mark">M</span><span>MODERNA<span className="brand-light">.</span></span></a>
        <div className="nav-links"><a href="#services"><span>01</span>Xizmatlar</a><a href="#process"><span>02</span>Jarayon</a><a href="#contact"><span>03</span>Aloqa</a></div>
        <a className="nav-cta" href="#contact">Bepul konsultatsiya <Arrow /></a>
      </nav>
      <div className="hero-grid shell">
        <div className="hero-copy">
          <p className="eyebrow light">IT SOLUTIONS · TOSHKENT</p>
          <h1>Biznesingizni<br /><em>texnologiya</em> bilan<br />o‘stiramiz.</h1>
          <p className="hero-text">Moderna Digital Agency — bizneslar uchun CRM, chatbot, mobil ilova, web platforma va avtomatlashtirish yechimlarini yaratadigan IT kompaniya.</p>
          <div className="hero-actions"><a className="button button-cream" href="#contact">Bepul konsultatsiya <Arrow /></a><a className="text-link light" href="#services">Xizmatlarni ko‘rish <span>↓</span></a></div>
        </div>
        <div className="hero-art" aria-label="Moderna Digital Agency logo"><div className="hero-grid-lines"/><div className="hero-plane plane-a"/><div className="hero-plane plane-b"/><div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/><div className="logo-frame"><Image src="/moderna-logo.jpeg" alt="Moderna Digital Agency logosi" width={640} height={640} priority /></div><div className="orbit-track track-one"><div className="orbit-tag"><ServiceIcon name="web"/><span>WEBSITE</span></div></div><div className="orbit-track track-two"><div className="orbit-tag"><ServiceIcon name="mobile"/><span>MOBILE APP</span></div></div><div className="orbit-track track-three"><div className="orbit-tag"><ServiceIcon name="crm"/><span>CRM</span></div></div><div className="orbit-track track-four"><div className="orbit-tag"><ServiceIcon name="ai"/><span>AI SYSTEMS</span></div></div><div className="orbit-track track-five"><div className="orbit-tag orbit-tag-small"><ServiceIcon name="chat"/><span>TELEGRAM BOT</span></div></div><div className="orbit-track track-six"><div className="orbit-tag orbit-tag-small"><ServiceIcon name="flow"/><span>AUTOMATION</span></div></div><div className="orbit-track track-seven"><div className="orbit-tag orbit-tag-small"><ServiceIcon name="web"/><span>UI / UX</span></div></div><div className="orbit-track track-eight"><div className="orbit-tag orbit-tag-small"><ServiceIcon name="crm"/><span>ANALYTICS</span></div></div></div>
      </div>
      <div className="hero-footer shell"><span>SCROLL TO EXPLORE</span><i/><span>2026 © MODERNA DIGITAL AGENCY</span></div>
    </section>

    <section className="intro shell reveal-section" id="about" data-reveal><p className="eyebrow">BIZ KIMMIZ?</p><div className="intro-content"><h2>G‘oyani<br /><em>ishlaydigan tizimga</em><br />aylantiramiz.</h2><div><p className="lead">Biz biznesdagi haqiqiy muammolarni tushunib, ular uchun sodda, tez va kengayadigan raqamli mahsulotlar quramiz.</p><a href="#contact" className="circle-link">G‘oyangizni<br />biz bilan muhokama qiling <Arrow /></a></div></div></section>

    <section className="services reveal-section" id="services" data-reveal><div className="section-halo"/><div className="shell"><div className="section-heading"><div><p className="eyebrow">XIZMATLAR</p><h2>Biznes uchun<br /><em>raqamli yechimlar.</em></h2></div><p>Sizga oddiy sayt emas, ishni yengillashtiradigan va o‘sishni tezlashtiradigan texnologiya kerak.</p></div><div className="service-grid">{services.map(([no,title,text,icon])=><article className="service-card" key={no}><div className="service-top"><span>{no}</span><b><ServiceIcon name={icon}/></b></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`${title} bo‘yicha bog‘lanish`}><Arrow /></a></article>)}</div></div></section>

    <section className="statement reveal-section" data-reveal><div className="statement-glow"/><div className="statement-inner shell"><p className="eyebrow light">MODERNA MINDSET</p><h2>Murakkab jarayonlar.<br /><em>Oddiy yechimlar.</em></h2><div className="statement-footer"><span>STRATEGY · DESIGN · CODE · GROWTH</span><span className="star">✦</span></div></div></section>

    <section className="process shell reveal-section" id="process" data-reveal><div className="process-title"><p className="eyebrow">ISH JARAYONI</p><h2>G‘oyadan<br /><em>ishga tushirishgacha.</em></h2></div><div className="step-list">{steps.map((step,index)=><article className="step" key={step}><span>0{index+1}</span><h3>{step}</h3><i>{index < steps.length-1 ? "↓" : "✦"}</i></article>)}</div></section>

    <section className="tech reveal-section" data-reveal><div className="tech-orbit"/><div className="shell tech-layout"><div><p className="eyebrow">TEXNOLOGIYALAR</p><h2>Ishonchli<br /><em>texnologik poydevor.</em></h2></div><div className="tech-cloud"><span>Next.js</span><span>React</span><span>Node.js</span><span>Python</span><span>Flutter</span><span>PostgreSQL</span><span>OpenAI</span><span>Figma</span><span>API</span><span>Cloud</span></div></div></section>

    <section className="faq shell reveal-section" data-reveal><div className="faq-title"><p className="eyebrow">FAQ</p><h2>Savollar<br /><em>paydo bo‘lishi tabiiy.</em></h2></div><div className="faq-list">{faqs.map(([question,answer],index)=><div className={`faq-item ${openFaq===index?"active":""}`} key={question}><button onClick={()=>setOpenFaq(openFaq===index?null:index)} aria-expanded={openFaq===index}><span>{question}</span><b>{openFaq===index?"−":"+"}</b></button>{openFaq===index&&<p>{answer}</p>}</div>)}</div></section>

    <section className="contact reveal-section" id="contact" data-reveal><div className="contact-aurora"/><div className="shell contact-grid"><div className="contact-copy"><p className="eyebrow light">YANGI LOYIHA</p><h2>Keyingi katta<br />g‘oya — <em>sizniki.</em></h2><p>Biznesingiz uchun qanday IT yechim kerakligini ayting. Mutaxassisimiz siz bilan bog‘lanib, bepul dastlabki konsultatsiya beradi.</p><div className="contact-meta"><span>MODERNA DIGITAL AGENCY</span><span>TOSHKENT, UZBEKISTAN</span></div></div><div className="form-card">{sent?<div className="success-message"><span>✓</span><h3>Qabul qilindi!</h3><p>Rahmat. So‘rovingiz Telegram guruhiga yuborildi.</p><button onClick={()=>setSent(false)}>Yana bir murojaat</button></div>:<form onSubmit={submitLead}><p className="form-kicker">01 / 01 · BEPUL KONSULTATSIYA</p><h3>Loyihangizni<br />boshlaymizmi?</h3><label>Ismingiz<input required name="name" placeholder="Ismingiz"/></label><label>Telefon raqamingiz<input required name="phone" inputMode="tel" placeholder="+998 90 123 45 67"/></label><label>Sizga qanday xizmat kerak?<select required name="service" defaultValue=""><option value="" disabled>Yo‘nalishni tanlang</option>{services.map(([,title])=><option key={title}>{title}</option>)}</select></label><label>Loyiha haqida qisqacha <small>(ixtiyoriy)</small><textarea name="message" placeholder="G‘oyangiz haqida yozing..." rows={2}/></label>{formError&&<p className="form-error" role="alert">{formError}</p>}<button className="button button-green" type="submit" disabled={sending}>{sending?"Yuborilmoqda...":"So‘rov yuborish"} {!sending&&<Arrow />}</button><p className="form-note">Yuborish orqali shaxsiy ma’lumotlar qayta ishlanishiga rozilik bildirasiz.</p></form>}</div></div></section>
    <footer className="footer shell"><a className="brand dark-brand" href="#top"><span className="brand-mark">M</span><span>MODERNA<span className="brand-light">.</span></span></a><p>© 2026 Moderna Digital Agency</p><a href="#top">Yuqoriga ↑</a></footer>
  </main>;
}
