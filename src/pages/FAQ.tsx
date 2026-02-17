import Footer from "@/components/Footer";

const faqs = [
  {
    q: "What do I get for subscribing?",
    a: "Subscribers receive full access to our project archives, early releases of all creative assets, and a seat in our quarterly strategy workshops. You also get a dedicated digital badge indicating your support tier within our community platforms.",
  },
  {
    q: "Where does the money go?",
    a: "60% of all subscription revenue goes directly to the artists and developers currently under contract. 20% is allocated to infrastructure and software costs, and the remaining 20% is held in a community fund for future independent grants.",
  },
  {
    q: "How can I get involved?",
    a: "Beyond financial support, you can participate by joining our Discord server and contributing to open-source project branches. We host weekly feedback sessions where subscribers can vote on the studio's next creative direction.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "No. You can cancel your subscription at any time with a single click in your account settings. We do not offer refunds for partial months, but your access will remain active until the end of your current billing period.",
  },
  {
    q: "What happens to my data?",
    a: "We collect only the essential information needed to process payments and provide access. We never sell your data to third parties. Your email is used strictly for account notifications and our internal studio newsletter.",
  },
  {
    q: "Can I upgrade my tier later?",
    a: "Yes, you can upgrade or downgrade at any time. Changes are prorated, so you will only be charged the difference for the remainder of your billing cycle when moving to a higher tier.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          Frequently Asked
        </h1>
        <h1 className="font-serif text-3xl md:text-4xl italic mb-6">
          Questions
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Total transparency about our subscription model and how Resonant Forge Studios operates.
          No fine print, just direct answers.
        </p>
      </section>

      {/* Questions */}
      <section className="px-6 max-w-2xl mx-auto pb-16">
        {faqs.map((faq, i) => (
          <div key={i} className="py-8 border-t border-border">
            <h3 className="faq-question mb-4">{faq.q}</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">{faq.a}</p>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="px-6 max-w-2xl mx-auto pb-20">
        <div className="bg-secondary rounded-lg p-8">
          <h3 className="font-serif text-xl font-semibold mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            If you couldn't find the answer you were looking for, our team is happy to help you
            directly.
          </p>
          <button className="text-copper text-sm font-medium hover:underline transition-colors">
            Contact Support →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
