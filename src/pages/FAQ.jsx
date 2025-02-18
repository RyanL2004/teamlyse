import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export default function FAQ() {
    return (
      <section className="max-w-5xl mx-auto pt-20 pb-20 px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Have a question about our AI Meeting Companions? We’re here to help you understand how our tool enhances your meetings, ensures security, and adapts to your workflow.
          </p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              What is the AI Meeting Companion?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400">
              Our AI Meeting Companion is a state-of-the-art tool designed to transform your meetings. It offers real-time transcription, generates concise summaries, and delivers interactive insights—all through a friendly, customizable AI pet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">
              How does it enhance my meetings?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400">
              By transcribing conversations live, extracting key points, and suggesting actionable items, our companion helps you stay focused and productive. It even offers creative ideas to steer discussions in meaningful directions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">
              Is my meeting data secure?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400">
              Absolutely. We implement enterprise-grade security protocols and robust encryption to ensure that your meeting data remains confidential and protected at all times.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              Which platforms does it integrate with?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400">
              Our solution integrates seamlessly with popular meeting platforms such as Zoom, Microsoft Teams, and Google Meet, making it easy to incorporate into your existing workflow.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">
              Can I customize the AI companion?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400">
              Yes, you can personalize your AI pet’s appearance, personality, and interactive responses. This flexibility ensures your meeting experience is not only efficient but also uniquely engaging and aligned with your brand.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    );
  }
  