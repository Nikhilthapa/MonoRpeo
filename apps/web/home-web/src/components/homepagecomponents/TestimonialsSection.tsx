'use client';

import Image from 'next/image';
import { Button, ArrowIcon, Section } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Head of Talent, Northwind Studio',
      quote: 'The built-in workflow and applicant tracking finally gave our hiring team clarity. Everyone uses the same pipeline, and nothing slips through the cracks.',
      image: '/Images/Ellipse 7.png',
    },
    {
      name: 'Michael Chen',
      role: 'CTO, TechFlow Solutions',
      quote: 'HireNova transformed our hiring process. We found exceptional talent in days, not weeks. The platform is intuitive and the candidates are top-tier.',
      image: '/Images/Ellipse 7.png',
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Engineering, CloudScale Inc',
      quote: 'The quality of candidates through HireNova is unmatched. Every profile is verified and ready to contribute from day one. Highly recommended!',
      image: '/Images/Ellipse 7.png',
    },
    {
      name: 'David Thompson',
      role: 'Founder, StartupHub',
      quote: 'As a growing startup, we needed fast, reliable hiring. HireNova delivered exactly that. The streamlined process saved us countless hours.',
      image: '/Images/Ellipse 7.png',
    },
    {
      name: 'Lisa Anderson',
      role: 'HR Director, GlobalTech',
      quote: 'The best hiring platform we\'ve used. The matching algorithm is spot-on, and the support team is incredibly responsive. Game changer!',
      image: '/Images/Ellipse 7.png',
    },
  ];

  // Auto-rotate testimonials in infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        return nextIndex;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const leftContentVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
    },
    visible: { 
      opacity: 1, 
      x: 0,
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  return (
    <Section>
      <div className="testimonials-container" ref={ref}>
        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Side - Content */}
          <motion.div 
            className="testimonials-left testimonials-left-mobile"
            variants={leftContentVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
            <motion.div
              variants={buttonVariants}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <Button className="testimonials-button testimonials-button-desktop">
                See More
                <ArrowIcon />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Testimonial Cards Carousel - Desktop Only */}
          <div className="testimonials-right relative hidden lg:block" style={{ minHeight: '600px', width: '100%' }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {testimonials.map((testimonial, index) => {
                // Calculate position for diagonal layout - circular flow
                const position = (index - activeIndex + testimonials.length) % testimonials.length;
                
                // Only render 3 cards at a time (previous, current, next)
                if (position > 2) return null;

                // Calculate diagonal positioning - exact match from image
                // Top card: highest and furthest right
                // Middle card: below and to the left of top card (with purple bar)
                // Bottom card: below and to the left of middle card
                const getCardStyle = () => {
                  // All cards aligned to right side with equal width
                  const baseStyle = {
                    position: 'absolute' as const,
                    right: '40px',
                    width: 'calc(100% - 80px)',
                    maxWidth: '600px',
                  };

                  if (position === 0) {
                    // Position 0: Top card - aligned to right like center
                    return {
                      ...baseStyle,
                      top: '0px',
                      zIndex: 10,
                    };
                  } else if (position === 1) {
                    // Position 1: Middle (active, highlighted with purple bar)
                    return {
                      ...baseStyle,
                      top: '180px',
                      zIndex: 20,
                    };
                  } else {
                    // Position 2: Bottom card - aligned to right like center
                    return {
                      ...baseStyle,
                      top: '360px',
                      zIndex: 10,
                    };
                  }
                };

                const isActive = position === 1;
                const cardStyle = getCardStyle();
                
                // Calculate animation based on transition direction
                // Cards flow: bottom (position 2) → middle (position 1) → top (position 0) → wraps to bottom
                const getInitialPosition = () => {
                  if (position === 0) {
                    // Coming from middle position (position 1) - moves up and right
                    return { x: -40, y: 180, scale: 0.9, opacity: 0 };
                  } else if (position === 1) {
                    // Coming from bottom position (position 2) - moves up and left
                    return { x: 40, y: 180, scale: 0.85, opacity: 0 };
                  } else {
                    // Coming from top position (position 0) - wraps around from top
                    return { x: -80, y: -360, scale: 0.85, opacity: 0 };
                  }
                };

                const getExitPosition = () => {
                  if (position === 0) {
                    // Exiting top card - moves further up and right
                    return { x: -80, y: -360, scale: 0.7, opacity: 0 };
                  } else if (position === 1) {
                    // Exiting middle card - moves up and right
                    return { x: -40, y: -180, scale: 0.7, opacity: 0 };
                  } else {
                    // Exiting bottom card - moves down and left
                    return { x: 80, y: 360, scale: 0.7, opacity: 0 };
                  }
                };

                const initialPos = getInitialPosition();
                const exitPos = getExitPosition();

                return (
                  <motion.div
                    key={`${testimonial.name}-${activeIndex}-${position}`}
                    className={`testimonial-card relative ${isActive ? 'testimonial-card-active' : 'testimonial-card-inactive'}`}
                    initial={initialPos}
                    animate={{ 
                      opacity: isActive ? 1 : 0.6, 
                      x: 0,
                      y: 0,
                      scale: position === 1 ? 1 : 0.85,
                    }}
                    exit={exitPos}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={cardStyle}
                    whileHover={{ 
                      scale: isActive ? 1.02 : 0.9,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Active Indicator - Purple Bar (thick vertical bar on left edge) - Only for middle card */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
                        style={{ backgroundColor: 'var(--primary-colour, #7F5BFF)' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    )}
                    
                    {/* Inactive cards - Dimmed appearance */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none" />
                    )}

                    {/* Quote Icon */}
                    <motion.div 
                      className={`testimonial-quote-icon ${!isActive ? 'testimonial-quote-icon-inactive' : ''}`}
                      initial={{ opacity: 0, rotate: -10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none">
                        <path d="M5.71552 2.28621L6.85862 0H4.57241C2.04616 0 0 3.18926 0 5.71552V13.7172H8.00172V5.71552H3.42931C3.42931 2.28621 5.71552 2.28621 5.71552 2.28621ZM13.7172 5.71552C13.7172 2.28621 16.0034 2.28621 16.0034 2.28621L17.1466 0H14.8603C12.3341 0 10.2879 3.18926 10.2879 5.71552V13.7172H18.2897V5.71552H13.7172Z" fill={isActive ? 'var(--primary-colour, #7F5BFF)' : 'rgba(255, 255, 255, 0.4)'}/>
                      </svg>
                    </motion.div>
                    
                    <div className="testimonial-card-content">
                      {/* Avatar */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <Image 
                          src={testimonial.image} 
                          alt={`${testimonial.name} avatar`} 
                          width={80}
                          height={80}
                          className="testimonial-avatar object-cover"
                        />
                      </motion.div>
                      
                      {/* Text Content */}
                      <motion.div 
                        className="testimonial-text-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <p className="testimonial-name">{testimonial.name}</p>
                        <p className="testimonials-role -mt-2 break-words">{testimonial.role}</p>
                        <p className="testimonial-quote">{testimonial.quote}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile Carousel - Visible only on mobile */}
          <div className="testimonials-right relative block lg:hidden w-full">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="testimonial-card relative w-full">
                    {/* Active Indicator - Purple Bar (thick vertical bar on left edge) */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
                      style={{ backgroundColor: 'var(--primary-colour, #7F5BFF)' }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />

                    {/* Quote Icon */}
                    <motion.div 
                      className="testimonial-quote-icon"
                      initial={{ opacity: 0, rotate: -10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none">
                        <path d="M5.71552 2.28621L6.85862 0H4.57241C2.04616 0 0 3.18926 0 5.71552V13.7172H8.00172V5.71552H3.42931C3.42931 2.28621 5.71552 2.28621 5.71552 2.28621ZM13.7172 5.71552C13.7172 2.28621 16.0034 2.28621 16.0034 2.28621L17.1466 0H14.8603C12.3341 0 10.2879 3.18926 10.2879 5.71552V13.7172H18.2897V5.71552H13.7172Z" fill="var(--primary-colour, #7F5BFF)"/>
                      </svg>
                    </motion.div>
                    
                    <div className="testimonial-card-content">
                      {/* Avatar */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Image 
                          src={testimonials[activeIndex].image} 
                          alt={`${testimonials[activeIndex].name} avatar`} 
                          width={80}
                          height={80}
                          className="testimonial-avatar object-cover"
                        />
                      </motion.div>
                      
                      {/* Text Content */}
                      <motion.div 
                        className="testimonial-text-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className="testimonial-name">{testimonials[activeIndex].name}</p>
                        <p className="testimonials-role -mt-2 break-words">{testimonials[activeIndex].role}</p>
                        <p className="testimonial-quote">{testimonials[activeIndex].quote}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Button - Shown on mobile only, below testimonials */}
          <motion.div 
            className="testimonials-button-mobile"
            variants={buttonVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <Button className="testimonials-button">
              See More
              <ArrowIcon />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

