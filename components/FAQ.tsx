import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I earn points?",
    answer:
      "You earn points on every purchase you make. The amount of points earned depends on the total value of your purchase.",
  },
  {
    question: "When do my points expire?",
    answer:
      "Points are valid for 12 months from the date of purchase. Make sure to redeem them before they expire!",
  },
  {
    question: "How can I redeem my points?",
    answer:
      "You can redeem your points for rewards in our online store or at any of our physical locations. Just present your loyalty card or app at checkout.",
  },
  {
    question: "Is there a membership fee?",
    answer:
      "No, joining our loyalty program is completely free. Start earning rewards today without any cost!",
  },
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
