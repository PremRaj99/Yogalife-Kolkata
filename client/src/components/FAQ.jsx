import { Accordion } from "flowbite-react";

export default function FAQ() {
  const FAQdata = [
    {
      question: "Why should I join your yoga classes?",
      answer:
        "We offer a range of yoga programs tailored to different needs and goals:<br>- General Yoga Classes: Perfect for overall health, flexibility, and stress relief.<br>- Theoretical Classes: Dive deeper into yoga philosophy and ancient wisdom.<br>- Private Sessions: Personalized one-on-one classes for individual attention.<br>- Workshops & Seminars: Explore specific topics in yoga, wellness, and healing.<br>- One-to-One Consultations: Customized guidance for your unique body and mind.<br>- Consultations: Professional advice on wellness, yoga lifestyle, and more.<br>- Teacher Training Course (TTC): For those who want to become certified yoga instructors.",
    },
    {
      question: "What is the counselling fee?",
      answer:
        "For details about our counselling or consultation fees, please reach out to us at your provided email address. We’ll be happy to guide you based on your specific needs.",
    },
    {
      question: "Do you have a certified physiotherapist?",
      answer:
        "Yes, we have an experienced and qualified physiotherapist on board to help with injury recovery, posture correction, and rehabilitation needs.",
    },
    {
      question: "Is there an Ayurvedic doctor available?",
      answer:
        "Absolutely. We collaborate with a professional Ayurveda doctor to provide holistic healing and natural health solutions based on traditional Indian medicine.",
    },
    {
      question: "Do you have a wellness clinic?",
      answer:
        "Yes, we do! Our wellness clinic integrates yoga, Ayurveda, physiotherapy, and natural therapies to support your complete well-being—body, mind, and spirit.",
    },
  ];

  return (
    <div className="max-w-xl sm:flex-1">
      <Accordion collapseAll>
        {FAQdata.map((faq, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>{faq.question}</Accordion.Title>
            <Accordion.Content>
              <p
                className="mb-2 text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
}
