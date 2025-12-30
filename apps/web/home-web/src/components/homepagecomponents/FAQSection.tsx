'use client';

import { useState } from 'react';
import { Section, Container, Icon, Button, ArrowIcon } from '@/components/ui';

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How Does The Platform Match Me With The Right Talent Or Job?',
      answer: 'Our AI-powered matching algorithm analyzes your skills, experience, and preferences to connect you with the most relevant opportunities.',
    },
    {
      question: 'Are The Candidates And Companies Verified?',
      answer: 'Yes! All candidates and companies go through a verification process to ensure authenticity and quality.',
    },
    {
      question: 'Is It Free To Create A Profile Or Post A Job?',
      answer: 'Yes! Creating a profile is completely free for job seekers. Employers can post jobs with our flexible pricing plans.',
    },
    {
      question: 'How Long Does It Take To Start Receiving Matches?',
      answer: 'Most users start receiving relevant matches within 24-48 hours of completing their profile.',
    },
  ];

  return (
    <Section id="faq" background="card" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <Container maxWidth="7xl">
        <p className="gradient-text-kicker faq-kicker mb-1">In Case You're Wondering</p>
        <h2 className="faq-heading mb-3">
          Frequently Asked Questions
        </h2>
        <p className="faq-description">
          Everything you need to know about getting started, hiring, and using our platform - all in one place.
        </p>
        <div className="space-y-3 sm:space-y-4 mb-[50px]" style={{ marginTop: '60px' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-transparent overflow-hidden"
              style={{ borderBottom: '1px solid var(--second-white-colour, #FFF)' }}
            >
              <button
                className="w-full py-3 sm:py-4 mb-2 flex items-center justify-between text-left transition-colors touch-manipulation faq-item-button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold text-white pr-4 text-sm sm:text-base">{faq.question}</span>
                <Icon
                  size="md"
                  className={`text-white transition-transform flex-shrink-0 ${
                    openFaq === index ? 'rotate-45' : ''
                  }`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Icon>
              </button>
              {openFaq === index && (
                <div className=" pb-3 sm:pb-4">
                  <p className="faq-answer text-[#CCCCCC] pt-3 sm:pt-2">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center px-4">
          <Button className="mx-auto w-full sm:w-auto" style={{ background: 'transparent' }}>
            Load More FAQs
            <ArrowIcon size="sm" className="sm:w-5 sm:h-5" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

