'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Container, Section, Grid, GridItem, Badge, ArrowIcon } from '@/components/ui';

export function TalentListingsSection() {
  const [selectedCategory, setSelectedCategory] = useState('Software Engineers');
  const jobCategories = [
    'Software Engineers',
    'MERN Engineers',
    'Full Stack Developers',
    'Data Scientist',
    'DevOps',
  ];

  return (
    <Section style={{ background: 'var(--secondary-aaccent, #57447F)' }}>
      <Container>
        {/* Filter Buttons */}
        <div className="flex talent-category-container talent-category-scroll">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-primary'
                  : 'bg-card border border-border hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Talent Cards Grid */}
        <Grid cols={{ default: 1, md: 2, lg: 2 }} gap="md" className="talent-grid-margin">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <GridItem key={item}>
              <div className="bg-card rounded-xl talent-card-padding border border-border">
                {/* Single Container - Image, Name/Icons, and Professional Details */}
                <div className="flex items-start talent-card-content-gap">
                  {/* First Container - Avatar */}
                  <div className="flex-shrink-0">
                    <Image
                      src="/Images/Ellipse 18.png"
                      alt="Jack avatar"
                      width={64}
                      height={64}
                      className="talent-avatar rounded-full object-cover w-12 h-12 md:w-14 md:h-14 lg:w-[52px] lg:h-[52px] xl:w-[58px] xl:h-[58px] 2xl:w-16 2xl:h-16"
                    />
                  </div>
                  
                  {/* Second Container - Name/Icons and Professional Details */}
                  <div className="flex-1 min-w-0">
                    {/* First Row - Name and Icons with Profile Button */}
                    <div className="flex items-center justify-between talent-name-row-margin">
                      <div className="flex items-center">
                        <h3 className="profile-name">Jack</h3>
                        <div className="flex items-center talent-icons-wrapper">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="talent-tick-icon flex-shrink-0 w-5 h-5 md:w-6 md:h-6 lg:w-[22px] lg:h-[22px] xl:w-[25px] xl:h-[25px] 2xl:w-7 2xl:h-7"
                          >
                            <rect width="24" height="24" stroke="none" fill="#000000" opacity="0"/>
                            <g transform="matrix(0.42 0 0 0.42 12 12)">
                              <g>
                                <g transform="matrix(1 0 0 1 0 0)">
                                  <polygon 
                                    fill="rgb(66,165,245)" 
                                    fillRule="nonzero" 
                                    opacity="1"
                                    points="5.62,-21 9.05,-15.69 15.37,-15.38 15.69,-9.06 21,-5.63 18.12,0 21,5.62 15.69,9.05 15.38,15.37 9.06,15.69 5.63,21 0,18.12 -5.62,21 -9.05,15.69 -15.37,15.38 -15.69,9.06 -21,5.63 -18.12,0 -21,-5.62 -15.69,-9.05 -15.38,-15.37 -9.06,-15.69 -5.63,-21 0,-18.12 " 
                                  />
                                </g>
                                <g transform="matrix(1 0 0 1 -0.01 0.51)">
                                  <polygon 
                                    fill="rgb(255,255,255)" 
                                    fillRule="nonzero" 
                                    opacity="1"
                                    points="-2.6,6.74 -9.09,0.25 -6.97,-1.87 -2.56,2.53 7,-6.74 9.09,-4.59 " 
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                         
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="talent-linkedin-icon flex-shrink-0 w-[18px] h-[18px] md:w-5 md:h-5 lg:w-[18px] lg:h-[18px] xl:w-5 xl:h-5 2xl:w-[22px] 2xl:h-[22px]">
                            <path d="M18.745 18.7455H15.4853V13.6405C15.4853 12.4231 15.4636 10.856 13.7899 10.856C12.0922 10.856 11.8324 12.1824 11.8324 13.5518V18.7451H8.57269V8.24715H11.702V9.68181H11.7458C12.059 9.14633 12.5115 8.70582 13.0553 8.4072C13.599 8.10857 14.2135 7.96302 14.8334 7.98603C18.1373 7.98603 18.7464 10.1592 18.7464 12.9865L18.745 18.7455ZM4.89466 6.81215C4.52052 6.81222 4.15476 6.70134 3.84365 6.49353C3.53253 6.28572 3.29003 5.99032 3.1468 5.64468C3.00356 5.29904 2.96602 4.91868 3.03895 4.55171C3.11187 4.18474 3.29198 3.84764 3.55648 3.58303C3.82099 3.31842 4.15802 3.13819 4.52495 3.06514C4.89188 2.99208 5.27223 3.02947 5.61791 3.17259C5.96359 3.31571 6.25907 3.55812 6.46698 3.86917C6.67489 4.18023 6.78591 4.54595 6.78597 4.9201C6.78602 5.16852 6.73713 5.41452 6.6421 5.64405C6.54708 5.87358 6.40779 6.08215 6.23217 6.25784C6.05654 6.43353 5.84802 6.57291 5.61853 6.66802C5.38904 6.76313 5.14307 6.81211 4.89466 6.81215ZM6.52451 18.7455H3.26141V8.24715H6.52451V18.7455ZM20.3701 0.0014989H1.62341C1.19791 -0.00330301 0.787891 0.161025 0.483487 0.458372C0.179082 0.755719 0.00519297 1.16176 0 1.58727V20.4124C0.00501524 20.8381 0.178802 21.2444 0.483196 21.5421C0.787591 21.8398 1.1977 22.0044 1.62341 21.9999H20.3701C20.7967 22.0052 21.208 21.841 21.5135 21.5434C21.8191 21.2457 21.9941 20.839 22 20.4124V1.58591C21.9939 1.15956 21.8188 0.753056 21.5132 0.455715C21.2076 0.158375 20.7965 -0.00548298 20.3701 0.000140087" fill="#0A66C2"/>
                          </svg>
                        </div>
                      </div>
                      <Badge
                        variant="primary"
                        size="sm"
                        className="profile-badge whitespace-nowrap"
                      >
                        Profile
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                          <path d="M8.5 7V1M8.5 1H2.5M8.5 1L1 8.5" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Badge>
                    </div>
                    
                    {/* Second Row - Professional Details */}
                    <p className="profile-details break-words flex items-center gap-2 flex-wrap talent-professional-details-margin">
                      <span>Full Stack Developer</span>
                      <span>|</span>
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none" className="w-4 h-4 md:w-[16px] md:h-[15px] lg:w-4 lg:h-4 xl:w-[17px] xl:h-[16px] 2xl:w-[18px] 2xl:h-[17px] flex-shrink-0">
                          <path d="M15.15 4.0835H2.35C1.46634 4.0835 0.75 4.82968 0.75 5.75014V14.0834C0.75 15.0038 1.46634 15.75 2.35 15.75H15.15C16.0337 15.75 16.75 15.0038 16.75 14.0834V5.75014C16.75 4.82968 16.0337 4.0835 15.15 4.0835Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.95 15.7498V2.41664C11.95 1.97462 11.7814 1.55071 11.4814 1.23815C11.1813 0.925592 10.7743 0.75 10.35 0.75H7.14999C6.72564 0.75 6.31868 0.925592 6.01862 1.23815C5.71856 1.55071 5.54999 1.97462 5.54999 2.41664V15.7498" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>2.5 years experience</span>
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none" className="w-3.5 h-3 md:w-[14px] md:h-[10px] lg:w-3.5 lg:h-3 xl:w-[15px] xl:h-[11px] 2xl:w-4 2xl:h-3 flex-shrink-0">
                          <path d="M10.4622 9H13.0933C13.2196 9 13.3253 8.95886 13.4107 8.87657C13.496 8.79429 13.5387 8.69257 13.5387 8.57143V3.42857C13.5387 3.30686 13.496 3.20514 13.4107 3.12343C13.3253 3.04171 13.2199 3.00057 13.0942 3H10.4613C10.3357 3 10.2302 3.04114 10.1449 3.12343C10.0596 3.20571 10.0169 3.30743 10.0169 3.42857V8.57143C10.0169 8.69314 10.0596 8.79486 10.1449 8.87657C10.2302 8.95829 10.3357 8.99943 10.4613 9M10.9058 8.14286V3.85714H12.6498V8.14286H10.9058ZM5.368 9H8C8.12622 9 8.2317 8.95886 8.31644 8.87657C8.40119 8.79429 8.44385 8.69257 8.44444 8.57143V3.42857C8.44444 3.30686 8.40178 3.20514 8.31644 3.12343C8.23111 3.04171 8.12563 3.00057 8 3H5.368C5.24178 3 5.136 3.04114 5.05067 3.12343C4.96533 3.20571 4.92326 3.30743 4.92444 3.42857V8.57143C4.92444 8.69314 4.96681 8.79486 5.05156 8.87657C5.1363 8.95829 5.24207 8.99943 5.36889 9M5.81333 8.14286V3.85714H7.55556V8.14286H5.81333ZM2.46222 9H3.35111V3H2.46222V9ZM0 12V0H16V12H0ZM0.888889 11.1429H15.1111V0.857143H0.888889V11.1429Z" fill="currentColor"/>
                        </svg>
                        <span>Current CTC: ₹7.2 LPA</span>
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Third Row - Full Width Border */}
                <div className="border-b border-border "></div>
                
                {/* Skills Section */}
                <div className="flex items-center talent-skills-margin flex-wrap border-b border-border talent-skills-padding">
                  <div className="flex items-center gap-2 flex-wrap">
                    {['HTML5', 'Node.js', 'Express.js', 'JavaScript', 'MySQL', 'APIs'].map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        size="sm"
                        className="skill-badge whitespace-nowrap"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <span className="view-all-text ml-auto">View all (8)</span>
                </div>
                
                {/* Professional Summary - Scrollable Purple Area */}
                {/* Outer wrapper - handles border radius */}
                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--secondary-aaccent, #57447F)' }}>
                  {/* Inner content - handles scrolling */}
                  <div className="talent-summary-padding max-h-32 overflow-y-auto professional-summary-scroll">
                    <p className="professional-summary-text">
                      Full-Stack Developer with strong expertise in React, Node.js,
                      TypeScript, and modern backend technologies. Experienced in building
                      scalable, high-performance web applications, designing secure APIs,
                      integrating databases, and delivering seamless user experiences. Skilled in cloud deployment, version control, Agile workflows, and end-to-end testing.
                    </p>
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </Grid>

        <div className="text-center talent-button-container">
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 mx-auto talent-browse-button"
          >
            Browse more profile
            <ArrowIcon size="sm" className="talent-arrow-icon" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

