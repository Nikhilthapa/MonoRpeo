import Image from 'next/image';
import { Button, ArrowIcon, Section } from '@/components/ui';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Head of Talent, Northwind Studio',
      quote: 'The built-in workflow and applicant tracking finally gave our hiring team clarity. Everyone uses the same pipeline, and nothing slips through the cracks.',
      image: '/Images/Ellipse 7.png',
    },
  ];

  return (
    <Section>
      <div className="testimonials-container">
        <div className="testimonials-grid">
          {/* Left Side - Content */}
          <div className="testimonials-left testimonials-left-mobile">
            <p className="gradient-text-kicker testimonials-kicker">
              Where Impact Speaks For Itself
            </p>
            <h2 className="section-heading mb-[10px]">
              Loved by teams and talent worldwide.
            </h2>
            <p className="body-text testimonials-description">
              Real stories from people who use our platform to hire faster and get hired smarter.
            </p>
            {/* Button - Hidden on mobile, shown on desktop */}
            <Button className="testimonials-button testimonials-button-desktop">
              See More
              <ArrowIcon />
            </Button>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="testimonials-right">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card relative ${
                  index === 0 
                    ? 'z-10' 
                    : index === 1 
                    ? 'z-20 testimonial-card-spacing' 
                    : 'z-10 testimonial-card-spacing-2'
                }`}
              >
                {/* Quote Icon */}
                <div className="testimonial-quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none">
                    <path d="M5.71552 2.28621L6.85862 0H4.57241C2.04616 0 0 3.18926 0 5.71552V13.7172H8.00172V5.71552H3.42931C3.42931 2.28621 5.71552 2.28621 5.71552 2.28621ZM13.7172 5.71552C13.7172 2.28621 16.0034 2.28621 16.0034 2.28621L17.1466 0H14.8603C12.3341 0 10.2879 3.18926 10.2879 5.71552V13.7172H18.2897V5.71552H13.7172Z" fill="var(--primary-colour, #7F5BFF)"/>
                  </svg>
                </div>
                
                <div className="testimonial-card-content">
                  {/* Avatar */}
                  <Image 
                    src={testimonial.image} 
                    alt={`${testimonial.name} avatar`} 
                    width={80}
                    height={80}
                    className="testimonial-avatar object-cover"
                  />
                  
                  {/* Text Content */}
                  <div className="testimonial-text-content">
                    <p className="testimonial-name ">{testimonial.name}</p>
                    <p className="testimonials-role -mt-2 break-words">{testimonial.role}</p>
                    <p className="testimonial-quote ">{testimonial.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button - Shown on mobile only, below testimonials */}
          <div className="testimonials-button-mobile">
            <Button className="testimonials-button">
              See More
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

