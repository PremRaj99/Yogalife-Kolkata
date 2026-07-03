import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "../../../data/homeData"; // Moved FAQdata here
import SectionWrapper from "../layout/SectionWrapper";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper 
      title="Frequently Asked Questions" 
      subtitle="Everything you need to know about our programs, therapies, and wellness center."
      className="bg-white"
    >
      <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-4">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className="font-semibold text-slate-900 pr-4">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}