import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to make a reservation?",
    answer:
      "While walk-ins are welcome, we recommend making a reservation, especially during peak hours and weekends to ensure you get your preferred dining time.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Sunday, 11:00 AM to 10:00 PM. Last orders are taken 30 minutes before closing time.",
  },
  {
    question: "Do you cater to dietary restrictions?",
    answer:
      "Yes, we offer various options for vegetarian, vegan, and gluten-free diets. Please inform your server about any dietary restrictions or allergies.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we offer complimentary valet parking for our guests. There is also street parking available in the surrounding area.",
  },
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
