'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button, Container, Section, Grid, GridItem, Icon, ArrowIcon } from '@/components/ui';

export function PathToOpportunitySection() {
  const [selectedCategory, setSelectedCategory] = useState('Software Engineers');
  const [activeStep, setActiveStep] = useState(1);
  const [lineProgress, setLineProgress] = useState(0);
  const [showActiveStepText, setShowActiveStepText] = useState(false);
  const activeStepRef = useRef(1);
  const isPausedRef = useRef(false);
  const stepInitialWaitRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const primaryColor = '#7F5BFF';

  const jobFilters = ['Software Engineers', 'AI/ML Engineers', 'Full Stack Developers', 'Data Scientist', 'DevOps', 'UI UX Designer'];

  // Initial mount: Set up step 1 with proper timing
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      stepInitialWaitRef.current = true;
      isPausedRef.current = true;
      
      // Wait 300ms, then show step 1 text and start line animation
      const timer = setTimeout(() => {
        setShowActiveStepText(true); // Show step 1 text
        stepInitialWaitRef.current = false;
        isPausedRef.current = false; // Start line animation
      }, 300);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    // Skip the initial mount (activeStep = 1 on mount is handled above)
    if (isInitialMountRef.current) {
      return;
    }
    
    activeStepRef.current = activeStep;
    // When step changes (step 2, 3, 4), reset line progress and trigger initial wait
    setLineProgress(0);
    setShowActiveStepText(false); // Hide text initially
    stepInitialWaitRef.current = true;
    isPausedRef.current = true;
    
    // Wait 300ms before starting line animation and showing text for the new step
    const timer = setTimeout(() => {
      setShowActiveStepText(true); // Show text after 300ms wait
      stepInitialWaitRef.current = false;
      isPausedRef.current = false; // Start line animation
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current || stepInitialWaitRef.current) {
        return;
      }

      setLineProgress((prev) => {
        const currentStep = activeStepRef.current;
        
        if (prev >= 100) {
          if (currentStep >= 4) {
            isPausedRef.current = true;
            setTimeout(() => {
              setActiveStep(1);
              activeStepRef.current = 1;
              setLineProgress(0);
              isPausedRef.current = false;
            }, 1500);
            return 100;
          }
          
          isPausedRef.current = true;
          // Wait after line completes before moving to next step
          // Extra delay between step 2 and step 3
          console.log('Line completed! Current step:', currentStep, 'Moving to step:', currentStep + 1);
          const delay = currentStep === 2 ? 4000 : 1000; // 4 seconds for step 2→3, 1 second for others
          console.log('Delay before next step:', delay, 'ms');
          setTimeout(() => {
            console.log('Moving to next step now. Previous step was:', currentStep);
            setActiveStep((current) => {
              activeStepRef.current = current + 1;
              return current + 1;
            });
            setLineProgress(0);
            isPausedRef.current = false;
          }, delay);
          
          return 100;
        }
        // Adjust increment based on current step
        // Step 2→3: very slow animation (0.25 increment = ~20 seconds)
        // Other steps: normal animation (1.5 increment = ~3.3 seconds)
        const increment = currentStep === 2 ? 0.25 : 1.5;
        const newProgress = prev + increment;
        // Log progress at key milestones (0%, 25%, 50%, 75%, 100%)
        if (Math.floor(prev / 25) !== Math.floor(newProgress / 25)) {
          console.log(`Line progress: ${Math.floor(newProgress)}% for step ${currentStep} (increment: ${increment})`);
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const timelineSteps = [
    {
      step: '1',
      title: 'Create your profile & upload your resume',
      description: 'Add your basic details, experience, and skills - then upload your resume to showcase your work. It\'s this way future employers to understand your skills clearly & quickly.',
    },
    {
      step: '2',
      title: 'Get verified',
      description: 'Once your profile is created, our team will review your information to ensure accuracy and authenticity. This helps us maintain a high-quality talent pool.',
    },
    {
      step: '3',
      title: 'Receive Interview invites',
      description: 'Based on your profile and preferences, we\'ll match you with relevant job opportunities. You\'ll receive interview invitations directly through our platform.',
    },
    {
      step: '4',
      title: 'Start working',
      description: 'Once you accept an offer, you\'re ready to start your new role! Our platform supports you through the onboarding process and beyond.',
    },
  ];

  return (
    <Section background="card">
      <Container>
        <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="path-opportunity-grid items-center">
          {/* Left Side */}
          <GridItem>
            <p className="gradient-text-kicker path-opportunity-kicker">Your Path To Success</p>
            <h2 className="path-opportunity-heading">
              A Simple Path to Your Next Opportunity
            </h2>
            <p className="body-text path-opportunity-description">
              From creating your profile to landing the job - our AI-powered process finds you the perfect talent and low-cost hiring.
            </p>
            <Link href="/signup">
              <Button className="path-opportunity-button">
                Find Job Now
                <ArrowIcon size="sm" className="path-opportunity-arrow-icon" />
              </Button>
            </Link>
          </GridItem>

          {/* Right Side - Timeline */}
          <GridItem>
            <div className="relative">
              <div className="path-opportunity-timeline">
              {timelineSteps.map((item, index) => {
                const stepNumber = index + 1;
                
                let lineFillPercentage = 0;
                // The line connects FROM this step TO the next step
                // So line at index 0 connects step 1->2, index 1 connects step 2->3, index 2 connects step 3->4
                const lineConnectsFromStep = index + 1;
                
                // Calculate line fill percentage
                // Line should be fully filled if the step it connects FROM is completed (past)
                if (lineConnectsFromStep < activeStep) {
                  lineFillPercentage = 100;
                } 
                // Line should animate if we're currently on the step it connects FROM
                // This means when activeStep = 1, line 1->2 animates
                // When activeStep = 2, line 2->3 animates
                // When activeStep = 3, line 3->4 animates
                else if (lineConnectsFromStep === activeStep) {
                  lineFillPercentage = lineProgress;
                } 
                // Line should be empty if we haven't reached the step it connects FROM yet
                else {
                  lineFillPercentage = 0;
                }
                
                // Step is active when it's the current step
                const isActive = stepNumber === activeStep;
                
                // Step is past when it's before the current step
                const isPast = stepNumber < activeStep;
                
                // Icon and text should appear together:
                // - Past steps: always visible
                // - Active step: only after 1 second wait via showActiveStepText
                // - Future steps: low opacity
                const shouldShowIcon = isPast || (isActive && showActiveStepText);
                let textOpacity = 0.1;
                if (isPast) {
                  textOpacity = 1;
                } else if (isActive && showActiveStepText) {
                  textOpacity = 1;
                }
                
                return (
                  <div key={index} className="flex path-opportunity-step-gap">
                    <div className="flex flex-col items-center relative">
                      <div 
                        className="path-opportunity-step-icon rounded-full relative z-30 flex-shrink-0 transition-all duration-500 ease-in-out border-2"
                        style={{
                          backgroundColor: shouldShowIcon ? primaryColor : '#1f2937',
                          borderColor: shouldShowIcon ? primaryColor : '#1f2937',
                          boxShadow: shouldShowIcon ? '0 0 20px rgba(127, 91, 255, 0.6)' : '0 0 0px rgba(127, 91, 255, 0)',
                        }}
                      >
                      </div>
                      {index < 3 && (
                        <div 
                          className="w-0.5 flex-shrink-0 relative z-10"
                          style={{ 
                            height: 'calc(100% + 1.5rem)',
                            marginTop: '0.5rem',
                            marginBottom: '0'
                          }}
                        >
                          <div className="absolute top-0 left-0 w-full h-full bg-border"></div>
                          <div 
                            className="absolute top-0 left-0 w-full"
                            style={{
                              height: `${lineFillPercentage}%`,
                              background: `linear-gradient(to bottom, ${primaryColor}, ${primaryColor})`,
                              transition: 'height 0.1s linear',
                              zIndex: 10,
                              opacity: lineFillPercentage > 0 ? 1 : 0
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 path-opportunity-step-content min-w-0">
                      <h3 
                        className={`step-title path-opportunity-step-title-margin transition-all duration-500 ease-in-out ${
                          isActive || isPast
                            ? '' 
                            : 'text-gray-300'
                        }`}
                        style={{
                          opacity: textOpacity,
                          transition: 'opacity 0.1s linear, color 0.5s ease-in-out'
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="step-description transition-all duration-500 ease-in-out"
                        style={{
                          opacity: textOpacity,
                          transition: 'opacity 0.1s linear'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </GridItem>
        </Grid>

        {/* Job Listings Below */}
        <div className="path-opportunity-job-section">
          <div className="flex talent-category-scroll path-opportunity-filters-container">
            {jobFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedCategory(filter)}
                className={`category-button rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === filter
                    ? 'bg-primary'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
            {[1, 2, 3].map((item) => (
              <GridItem key={item}>
                <div className="path-opportunity-job-card border border-border" style={{ borderRadius: '6px', background: 'var(--secondary-aaccent, #57447F)' }}>
                  {/* First Row: Company Logo, Content Section, and Save Icon */}
                  <div className="flex items-start path-opportunity-job-row-gap path-opportunity-job-first-row-margin">
                    {/* Company Logo Placeholder */}
                    <div className="path-opportunity-job-logo rounded-lg bg-white flex-shrink-0"></div>
                    
                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      {/* Job Title */}
                      <h3 className="job-title mb-1">Product Designer</h3>
                      
                      {/* Company Name */}
                      <p className="company-name mb-1">Sparix Global</p>
                      
                      {/* Location */}
                      <p className="location-text">Noida West (On-Site)</p>
                    </div>
                    
                    {/* Save Icon */}
                    <button className="path-opportunity-save-button flex-shrink-0">
                      <Icon size="md" className="text-gray-400 hover:text-primary path-opportunity-save-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" className="w-full h-full">
                          <path d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Icon>
                    </button>
                  </div>
                  
                  {/* Second Row: Experience and Salary */}
                  <div className="flex items-center path-opportunity-job-second-row-gap path-opportunity-job-second-row-margin">
                    {/* Experience */}
                    <div className="flex items-center gap-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none" className="w-[18px] h-[17px] flex-shrink-0">
                        <path d="M15.15 4.0835H2.35C1.46634 4.0835 0.75 4.82968 0.75 5.75014V14.0834C0.75 15.0038 1.46634 15.75 2.35 15.75H15.15C16.0337 15.75 16.75 15.0038 16.75 14.0834V5.75014C16.75 4.82968 16.0337 4.0835 15.15 4.0835Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.95 15.7498V2.41664C11.95 1.97462 11.7814 1.55071 11.4814 1.23815C11.1813 0.925592 10.7743 0.75 10.35 0.75H7.14999C6.72564 0.75 6.31868 0.925592 6.01862 1.23815C5.71856 1.55071 5.54999 1.97462 5.54999 2.41664V15.7498" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="experience-text">1-2 years experience</span>
                    </div>
                    
                    {/* Salary */}
                    <div className="flex items-center gap-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none" className="w-[16px] h-[12px] flex-shrink-0">
                        <path d="M10.4622 9H13.0933C13.2196 9 13.3253 8.95886 13.4107 8.87657C13.496 8.79429 13.5387 8.69257 13.5387 8.57143V3.42857C13.5387 3.30686 13.496 3.20514 13.4107 3.12343C13.3253 3.04171 13.2199 3.00057 13.0942 3H10.4613C10.3357 3 10.2302 3.04114 10.1449 3.12343C10.0596 3.20571 10.0169 3.30743 10.0169 3.42857V8.57143C10.0169 8.69314 10.0596 8.79486 10.1449 8.87657C10.2302 8.95829 10.3357 8.99943 10.4613 9M10.9058 8.14286V3.85714H12.6498V8.14286H10.9058ZM5.368 9H8C8.12622 9 8.2317 8.95886 8.31644 8.87657C8.40119 8.79429 8.44385 8.69257 8.44444 8.57143V3.42857C8.44444 3.30686 8.40178 3.20514 8.31644 3.12343C8.23111 3.04171 8.12563 3.00057 8 3H5.368C5.24178 3 5.136 3.04114 5.05067 3.12343C4.96533 3.20571 4.92326 3.30743 4.92444 3.42857V8.57143C4.92444 8.69314 4.96681 8.79486 5.05156 8.87657C5.1363 8.95829 5.24207 8.99943 5.36889 9M5.81333 8.14286V3.85714H7.55556V8.14286H5.81333ZM2.46222 9H3.35111V3H2.46222V9ZM0 12V0H16V12H0ZM0.888889 11.1429H15.1111V0.857143H0.888889V11.1429Z" fill="#CCCCCC"/>
                      </svg>
                      <span className="experience-text">₹7-9 LPA</span>
                    </div>
                  </div>
                  
                  {/* Third Row: Posted Date */}
                  <p className="posted-date">2 Week ago</p>
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}

