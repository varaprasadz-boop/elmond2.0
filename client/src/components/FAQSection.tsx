import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I need experience?",
    answer: "No prior experience is required for most beginner courses. Each course clearly indicates the prerequisite knowledge needed, so you can choose courses that match your current skill level.",
  },
  {
    question: "What skills do I need?",
    answer: "Skills required vary by course. Most courses only require basic computer literacy and internet access. Specific technical requirements are listed in each course description.",
  },
  {
    question: "How do they work?",
    answer: "Our courses are fully online and self-paced. You'll have access to video lessons, downloadable resources, practice tests, and assignments. Learn at your own convenience with lifetime access to course materials.",
  },
  {
    question: "Can I get a certificate?",
    answer: "Yes! Upon successful completion of a course, you'll receive a verified certificate that you can share on your LinkedIn profile and resume.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            How Can We Help You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to commonly asked questions about our courses and platform
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left" data-testid={`button-faq-${index}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
