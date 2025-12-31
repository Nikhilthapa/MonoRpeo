// import Link from 'next/link';
// import { Button } from '@/components/ui/Button';
// import { useState, useEffect } from 'react';

// export function HowItWorksSection() {
//   const [activeIcon, setActiveIcon] = useState(0);

//   useEffect(() => {
//     const animate = () => {
//       setActiveIcon(0);
//       // Icon 1: 0s - when curve starts at icon 1
//       const timer1 = setTimeout(() => setActiveIcon(1), 300);
//       // Icon 2: 2.5s (29.4% of 8.5s) - when curve reaches icon 2 after 1s pause + 1.5s travel
//       const timer2 = setTimeout(() => setActiveIcon(2), 2500);
//       // Icon 3: 5s (58.8% of 8.5s) - when curve reaches icon 3 after 1s pause + 1.5s travel
//       const timer3 = setTimeout(() => setActiveIcon(3), 4000);
//       // Icon 4: 7.5s (88.2% of 8.5s) - when curve reaches icon 4 after 1s pause + 1.5s travel
//       const timer4 = setTimeout(() => setActiveIcon(4), 6500);

//       return () => {
//         clearTimeout(timer1);
//         clearTimeout(timer2);
//         clearTimeout(timer3);
//         clearTimeout(timer4);
//       };
//     };

//     // Initial animation
//     const cleanup1 = animate();

//     // Loop animation every 8.5 seconds
//     const interval = setInterval(() => {
//       cleanup1();
//       animate();
//     }, 8500);

//     return () => {
//       cleanup1();
//       clearInterval(interval);
//     };
//   }, []);
//   const steps = [
//     {
//       step: '1',
//       title: (
//         <>
//           Tell us what you're <br /> looking for
//         </>
//       ),
//       description: (<>
//       Share your role, requirements, and expectations.<br />
//       We analyze your needs to ensure you get <br/>perfectly matched talent.</>),
//       icon: (
//         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
//           <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
//           <circle cx="12" cy="12" r="2" fill="currentColor"/>
//           <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2"/>
//           <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
//           <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2"/>
//           <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
//         </svg>
//       ),
//       position: 'top-left',
//       iconPosition: { top: '65%', left: '25%' },
//     },
//     {
//       step: '2',
//       title: 'Explore curated, pre-vetted talent',
//       description: 'Get handpicked candidates that match your criteria. Every profile is verified, skilled, and ready to contribute.',
//       icon: (
//         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
//           <circle cx="11" cy="9" r="2" fill="currentColor"/>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 11v3" stroke="currentColor" fill="none"/>
//         </svg>
//       ),
//       position: 'bottom-center',
//       iconPosition: { top: '40%', left: '50%' },
//     },
//     {
//       step: '3',
//       title: 'Interview effortlessly',
//       description: 'Choose the talent that fits your goals. We streamline interviews so your hiring journey stays smooth and fast.',
//       icon: (
//         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//       ),
//       position: 'top-right',
//       iconPosition: { top: '60%', left: '75%' },
//     },
//     {
//       step: '4',
//       title: 'Hire with full confidence',
//       description: 'Once you select your candidate, we guide the onboarding process and ensure everything starts on the right foot.',
//       icon: (
//         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       position: 'bottom-right',
//       iconPosition: { top: '40%', left: '75%' },
//     },
//   ];

//   return (
//     <section className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20 bg-card/30 sm:pb-24 lg:pb-5">
//       {/* Thin vertical blue line on the left */}
//       <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#3b82f6' }}></div>
      
//       <div className="max-w-7xl mx-auto relative">
//         <p className="text-center mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#835fff' }}>
//           Clarity <span style={{ color: '#a27cff' }}>At</span> <span style={{ color: '#b796ff' }}>Every</span> <span style={{ color: '#c6b5f0' }}>Step</span>
//         </p>
//         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 px-2 leading-tight text-white">
//           Hire Smarter in 4 Simple Steps
//         </h2>
//         <p className="text-center text-gray-300 mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-4">
//           Find the right talent without the noise. Our streamlined process connects you with vetted, high-quality candidates quickly, clearly, and efficiently.
//         </p>

//         {/* 4-Step Process with Wavy Line */}
//         <div className="relative mb-8 sm:mb-12" style={{ minHeight: '500px', height: '600px' }}>
//           {/* Wavy connecting line - SVG with smooth wavy path from CurvedLine.svg */}
//           <svg 
//             className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
//             style={{ zIndex: 1, transform: 'scale(0.78) translateY(28%) translateX(-2%)', transformOrigin: 'center center' }}
//             viewBox="0 0 1306 369"
//             preserveAspectRatio="none"
//           >
//             {/* Base grey path from CurvedLine.svg */}
//             <path
//               d="M0.28656 364.441C39.2866 368.941 125.887 367.941 160.287 327.941C203.287 277.941 378.287 -21.0593 555.787 52.4408C733.287 125.941 786.787 503.941 935.287 233.941C970.287 190.941 1005.69 155.241 1045.69 125.241C1085.69 95.241 1130.69 72.441 1180.69 58.441C1230.69 44.441 1275.29 48.4408 1304.29 52.4408"
//               fill="none"
//               stroke="#9ca3af"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//             />
//             {/* Animated colored path */}
//             <path
//               d="M0.28656 364.441C39.2866 368.941 125.887 367.941 160.287 327.941C203.287 277.941 378.287 -21.0593 555.787 52.4408C733.287 125.941 786.787 503.941 935.287 233.941C970.287 190.941 1005.69 155.241 1045.69 125.241C1085.69 95.241 1130.69 72.441 1180.69 58.441C1230.69 44.441 1275.29 48.4408 1304.29 52.4408"
//               fill="none"
//               stroke="#5e40bf"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeDasharray="2000"
//               strokeDashoffset="2000"
//               style={{
//                 animation: 'drawPath 8.5s ease-in-out infinite',
//               }}
//             />
//           </svg>
//           <style dangerouslySetInnerHTML={{
//             __html: `
//               @keyframes drawPath {
//                 0% {
//                   stroke-dashoffset: 2000;
//                 }
//                 11.8% {
//                   stroke-dashoffset: 2000;
//                 }
//                 29.4% {
//                   stroke-dashoffset: 1400;
//                 }
//                 29.4% {
//                   stroke-dashoffset: 1400;
//                 }
//                 41.2% {
//                   stroke-dashoffset: 1400;
//                 }
//                 58.8% {
//                   stroke-dashoffset: 800;
//                 }
//                 58.8% {
//                   stroke-dashoffset: 800;
//                 }
//                 70.6% {
//                   stroke-dashoffset: 800;
//                 }
//                 88.2% {
//                   stroke-dashoffset: 200;
//                 }
//                 88.2% {
//                   stroke-dashoffset: 200;
//                 }
//                 100% {
//                   stroke-dashoffset: 200;
//                 }
//               }
//             `
//           }} />

//           {/* Step 1 - Top Left */}
//           <div className="absolute top-6 sm:top-12 md:top-16 left-2 sm:left-[2%] md:left-[3%] w-[48%] sm:w-[42%] md:w-[40%] text-left" style={{ zIndex: 2 }}>
//             <div className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none transition-colors duration-500" style={{ color: activeIcon >= 1 ? '#5e40bf' : 'rgba(107, 114, 128, 0.4)' }}>
//               {steps[0].step}
//             </div>
//             <h3 className="step-title mb-2 sm:mb-3">{steps[0].title}</h3>
//             <p className="text-xs sm:text-sm text-gray-400 leading-relaxed -ml-1 sm:-ml-2">{steps[0].description}</p>
//           </div>

//           {/* Step 2 - Bottom Center */}
//           <div className="absolute -bottom-40 sm:-bottom-32 md:-bottom-32 left-1/2 transform -translate-x-1/2 -ml-10 sm:-ml-24 md:-ml-40 w-[60%] sm:w-[42%] md:w-[40%] text-center" style={{ zIndex: 2 }}>
//             <div className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none transition-colors duration-500" style={{ color: activeIcon >= 2 ? '#5e40bf' : 'rgba(107, 114, 128, 0.4)' }}>
//               {steps[1].step}
//             </div>
//             <h3 className="step-title mb-2 sm:mb-3">{steps[1].title}</h3>
//             <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{steps[1].description}</p>
//           </div>

//           {/* Step 3 - Top Right */}
//           <div className="absolute top-2 sm:top-4 md:top-6 right-0 sm:right-[12%] md:right-[18%] w-[48%] sm:w-[38%] md:w-[32%] text-center" style={{ zIndex: 2 }}>
//             <div className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none transition-colors duration-500" style={{ color: activeIcon >= 3 ? '#5e40bf' : 'rgba(107, 114, 128, 0.4)' }}>
//               {steps[2].step}
//             </div>
//             <h3 className="step-title mb-2 sm:mb-3">{steps[2].title}</h3>
//             <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{steps[2].description}</p>
//           </div>

//           {/* Step 4 - Bottom Right */}
//           <div className="absolute -bottom-40 sm:-bottom-32 md:-bottom-32 right-0 sm:right-[2%] md:right-[4%] w-[48%] sm:w-[38%] md:w-[32%] text-right" style={{ zIndex: 2 }}>
//             <div className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none transition-colors duration-500" style={{ color: activeIcon >= 4 ? '#5e40bf' : 'rgba(107, 114, 128, 0.4)' }}>
//               {steps[3].step}
//             </div>
//             <h3 className="step-title mb-2 sm:mb-3">{steps[3].title}</h3>
//             <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{steps[3].description}</p>
//           </div>

//           {/* Icons on the wavy line - positioned above the line */}
//           <div className="absolute hidden sm:block" style={{ top: '109%', left: '14%', zIndex: 3, transform: 'translate(-50%, -50%)' }}>
//             <div 
//               className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-500" 
//               style={{ 
//                 backgroundColor: activeIcon >= 1 ? '#5e40bf' : '#1f2937', 
//                 borderColor: activeIcon >= 1 ? '#5e40bf' : '#1f2937' 
//               }}
//             >
//               {steps[0].icon}
//             </div>
//           </div>
//           <div className="absolute hidden sm:block" style={{ top: '42%', left: '38%', zIndex: 3, transform: 'translate(-50%, -50%)' }}>
//             <div 
//               className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-500" 
//               style={{ 
//                 backgroundColor: activeIcon >= 2 ? '#5e40bf' : '#1f2937', 
//                 borderColor: activeIcon >= 2 ? '#5e40bf' : '#1f2937' 
//               }}
//             >
//               {steps[1].icon}
//             </div>
//           </div>
//           <div className="absolute hidden sm:block" style={{ top: '88%', left: '64%', zIndex: 3, transform: 'translate(-50%, -50%)' }}>
//             <div 
//               className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-500" 
//               style={{ 
//                 backgroundColor: activeIcon >= 3 ? '#5e40bf' : '#1f2937', 
//                 borderColor: activeIcon >= 3 ? '#5e40bf' : '#1f2937' 
//               }}
//             >
//               {steps[2].icon}
//             </div>
//           </div>
//           <div className="absolute hidden sm:block" style={{ top: '42%', left: '86%', zIndex: 3, transform: 'translate(-50%, -50%)' }}>
//             <div 
//               className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-500" 
//               style={{ 
//                 backgroundColor: activeIcon >= 4 ? '#5e40bf' : '#1f2937', 
//                 borderColor: activeIcon >= 4 ? '#5e40bf' : '#1f2937' 
//               }}
//             >
//               {steps[3].icon}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Layout - Stacked */}
//         <div className="block sm:hidden space-y-8 mb-8">
//           {steps.map((item, index) => (
//             <div key={index} className="text-center relative">
//               <div className="flex flex-col items-center">
//                 <div className="text-5xl font-bold mb-3" style={{ color: 'rgba(107, 114, 128, 0.3)' }}>{item.step}</div>
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#1f2937' }}>
//                   {item.icon}
//                 </div>
//                 <h3 className="step-title mb-2">{item.title}</h3>
//                 <p className="text-sm text-gray-400">{item.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center px-4 mt-40 sm:mt-60">
//           <Link href="/signup">
//             <Button className="flex items-center justify-center gap-2 mx-auto w-full sm:w-auto text-sm sm:text-base">
//               Build Your Team
//               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from 'next/link';
import { Button, ArrowIcon, Section } from '@/components/ui';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HowItWorksSection() {
  const [activeIcon, setActiveIcon] = useState(0);
  const primaryColor = '#7F5BFF';

  useEffect(() => {
    const animate = () => {
      setActiveIcon(0);
      // Icon 1: 11.8% of 8.5s = ~1.0s - when line reaches icon 1
      const timer1 = setTimeout(() => setActiveIcon(1), 1000);
      // Icon 2: 29.4% of 8.5s = ~2.5s - when line reaches icon 2
      const timer2 = setTimeout(() => setActiveIcon(2), 2500);
      // Icon 3: 58.8% of 8.5s = ~5.0s - when line reaches icon 3
      const timer3 = setTimeout(() => setActiveIcon(3), 5000);
      // Icon 4: 88.2% of 8.5s = ~7.5s - when line reaches icon 4
      const timer4 = setTimeout(() => setActiveIcon(4), 7500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    };

    const cleanup1 = animate();
    const interval = setInterval(() => {
      cleanup1();
      animate();
    }, 8500);

    return () => {
      cleanup1();
      clearInterval(interval);
    };
  }, []);

  const steps = [
    {
      step: '1',
      title: (
        <>
          Tell us what you're <br /> looking for
        </>
      ),
      description: (<>
      Share your role, requirements, and expectations.<br />
      We analyze your needs to ensure you get <br/>perfectly matched talent.</>),
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
          <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      position: 'top-left',
      iconPosition: { top: '65%', left: '25%' },
    },
    {
      step: '2',
      title: 'Explore curated, pre-vetted talent',
      description: 'Get handpicked candidates that match your criteria. Every profile is verified, skilled, and ready to contribute.',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
          <circle cx="11" cy="9" r="2" fill="currentColor"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 11v3" stroke="currentColor" fill="none"/>
        </svg>
      ),
      position: 'bottom-center',
      iconPosition: { top: '40%', left: '50%' },
    },
    {
      step: '3',
      title: 'Interview effortlessly',
      description: 'Choose the talent that fits your goals. We streamline interviews so your hiring journey stays smooth and fast.',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      position: 'top-right',
      iconPosition: { top: '60%', left: '75%' },
    },
    {
      step: '4',
      title: 'Hire with full confidence',
      description: 'Once you select your candidate, we guide the onboarding process and ensure everything starts on the right foot.',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      position: 'bottom-right',
      iconPosition: { top: '40%', left: '75%' },
    },
  ];

  // Icon animation variants
  const iconContainerVariants = {
    inactive: {
      scale: 1,
    },
    active: {
      scale: 1.1,
    },
  };

  const iconBackgroundVariants = {
    inactive: {
      backgroundColor: '#1f2937',
      borderColor: '#1f2937',
      boxShadow: '0 0 0px rgba(127, 91, 255, 0)',
    },
    active: {
      backgroundColor: primaryColor,
      borderColor: primaryColor,
      boxShadow: '0 0 20px rgba(127, 91, 255, 0.6)',
    },
  };

  // Number animation variants
  const numberVariants = {
    inactive: {
      color: 'rgba(107, 114, 128, 0.4)',
      scale: 1,
    },
    active: {
      color: primaryColor,
      scale: 1.05,
      textShadow: '0 0 20px rgba(127, 91, 255, 0.5)',
    },
  };


  return (
    <Section className="hidden sm:block">
      <div className="max-w-7xl mx-auto relative">
        <p className="text-center mb-3 sm:mb-4 text-sm sm:text-base gradient-text-kicker mx-auto">
          Clarity At Every Step
        </p>
        <h2 className="section-heading text-center px-2">
          Hire Smarter in 4 Simple Steps
        </h2>
        <p className="body-text text-center mb-[60px] max-w-2xl mx-auto px-4">
          Find the right talent without the noise. Our streamlined process connects you with vetted, high-quality candidates quickly, clearly, and efficiently.
        </p>

        <div className="relative mb-8 sm:mb-12" style={{ minHeight: '500px', height: '600px' }}>
          {/* Wavy connecting line with blur effect */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
            style={{ 
              zIndex: 1, 
              transform: 'scale(0.78) translateY(28%) translateX(-2%)', 
              transformOrigin: 'center center',
              filter: 'blur(0.5px)', // Subtle blur on the line itself
            }}
            viewBox="0 0 1306 369"
            preserveAspectRatio="none"
          >
            {/* Base grey path */}
            <path
              d="M0.28656 364.441C39.2866 368.941 125.887 367.941 160.287 327.941C203.287 277.941 378.287 -21.0593 555.787 52.4408C733.287 125.941 786.787 503.941 935.287 233.941C970.287 190.941 1005.69 155.241 1045.69 125.241C1085.69 95.241 1130.69 72.441 1180.69 58.441C1230.69 44.441 1275.29 48.4408 1304.29 52.4408"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Animated colored path */}
            <motion.path
              d="M0.28656 364.441C39.2866 368.941 125.887 367.941 160.287 327.941C203.287 277.941 378.287 -21.0593 555.787 52.4408C733.287 125.941 786.787 503.941 935.287 233.941C970.287 190.941 1005.69 155.241 1045.69 125.241C1085.69 95.241 1130.69 72.441 1180.69 58.441C1230.69 44.441 1275.29 48.4408 1304.29 52.4408"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="2000"
              initial={{ strokeDashoffset: 2000 }}
              animate={{
                strokeDashoffset: [2000, 2000, 1400, 1400, 800, 800, 200, 200],
              }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.118, 0.294, 0.412, 0.588, 0.706, 0.882, 1],
              }}
            />
          </svg>

          {/* Blur overlay layer for glow effect */}
          <div 
            className="absolute inset-0 hidden sm:block pointer-events-none"
            style={{
              zIndex: 1.5,
              backdropFilter: 'blur(23.7px)',
              WebkitBackdropFilter: 'blur(23.7px)',
              maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)',
            }}
          />

          {/* Step 1 - Top Left */}
          <div className="absolute top-6 sm:top-12 md:top-16 left-2 sm:left-[2%] md:left-[3%] w-[48%] sm:w-[42%] md:w-[40%] text-left" style={{ zIndex: 2 }}>
            <motion.div 
              className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none"
              variants={numberVariants}
              animate={activeIcon >= 1 ? 'active' : 'inactive'}
            >
              {steps[0].step}
            </motion.div>
            <h3 className="step-title mb-2 sm:mb-3">{steps[0].title}</h3>
            <p className="step-description -ml-1 sm:-ml-2">{steps[0].description}</p>
          </div>

          {/* Step 2 - Bottom Center */}
          <div className="absolute -bottom-40 sm:-bottom-32 md:-bottom-32 left-1/2 transform -translate-x-1/2 -ml-10 sm:-ml-24 md:-ml-40 w-[60%] sm:w-[42%] md:w-[40%] text-center" style={{ zIndex: 2 }}>
            <motion.div 
              className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none"
              variants={numberVariants}
              animate={activeIcon >= 2 ? 'active' : 'inactive'}
            >
              {steps[1].step}
            </motion.div>
            <h3 className="step-title mb-2 sm:mb-3">{steps[1].title}</h3>
            <p className="step-description">{steps[1].description}</p>
          </div>

          {/* Step 3 - Top Right */}
          <div className="absolute top-2 sm:top-4 md:top-6 right-0 sm:right-[12%] md:right-[18%] w-[48%] sm:w-[38%] md:w-[32%] text-center" style={{ zIndex: 2 }}>
            <motion.div 
              className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none"
              variants={numberVariants}
              animate={activeIcon >= 3 ? 'active' : 'inactive'}
            >
              {steps[2].step}
            </motion.div>
            <h3 className="step-title mb-2 sm:mb-3">{steps[2].title}</h3>
            <p className="step-description">{steps[2].description}</p>
          </div>

          {/* Step 4 - Bottom Right */}
          <div className="absolute -bottom-40 sm:-bottom-32 md:-bottom-32 right-0 sm:right-[2%] md:right-[4%] w-[48%] sm:w-[38%] md:w-[32%] text-right" style={{ zIndex: 2 }}>
            <motion.div 
              className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 leading-none"
              variants={numberVariants}
              animate={activeIcon >= 4 ? 'active' : 'inactive'}
            >
              {steps[3].step}
            </motion.div>
            <h3 className="step-title mb-2 sm:mb-3">{steps[3].title}</h3>
            <p className="step-description">{steps[3].description}</p>
          </div>

          {/* Icons with Framer Motion animations */}
          <motion.div 
            className="absolute hidden sm:block" 
            style={{ top: '105%', left: '10.3%', zIndex: 3, transform: 'translate(-50%, -50%)' }}
            variants={iconContainerVariants}
            animate={activeIcon >= 1 ? 'active' : 'inactive'}
          >
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2"
              variants={iconBackgroundVariants}
              animate={activeIcon >= 1 ? 'active' : 'inactive'}
              style={{
                backdropFilter: 'blur(23.7px)',
                WebkitBackdropFilter: 'blur(23.7px)',
              }}
            >
              {steps[0].icon}
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute hidden sm:block" 
            style={{ top: '38%', left: '36%', zIndex: 3, transform: 'translate(-50%, -50%)' }}
            variants={iconContainerVariants}
            animate={activeIcon >= 2 ? 'active' : 'inactive'}
          >
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2"
              variants={iconBackgroundVariants}
              animate={activeIcon >= 2 ? 'active' : 'inactive'}
              style={{
                backdropFilter: 'blur(23.7px)',
                WebkitBackdropFilter: 'blur(23.7px)',
              }}
            >
              {steps[1].icon}
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute hidden sm:block" 
            style={{ top: '85%', left: '62%', zIndex: 3, transform: 'translate(-50%, -50%)' }}
            variants={iconContainerVariants}
            animate={activeIcon >= 3 ? 'active' : 'inactive'}
          >
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2"
              variants={iconBackgroundVariants}
              animate={activeIcon >= 3 ? 'active' : 'inactive'}
              style={{
                backdropFilter: 'blur(23.7px)',
                WebkitBackdropFilter: 'blur(23.7px)',
              }}
            >
              {steps[2].icon}
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute hidden sm:block" 
            style={{ top: '39%', left: '85%', zIndex: 3, transform: 'translate(-50%, -50%)' }}
            variants={iconContainerVariants}
            animate={activeIcon >= 4 ? 'active' : 'inactive'}
          >
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2"
              variants={iconBackgroundVariants}
              animate={activeIcon >= 4 ? 'active' : 'inactive'}
              style={{
                backdropFilter: 'blur(23.7px)',
                WebkitBackdropFilter: 'blur(23.7px)',
              }}
            >
              {steps[3].icon}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="block sm:hidden space-y-8 mb-8">
          {steps.map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-3" style={{ color: 'rgba(107, 114, 128, 0.3)' }}>{item.step}</div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#1f2937' }}>
                  {item.icon}
                </div>
                <h3 className="step-title mb-2">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center px-4 mt-40 sm:mt-60">
          <Link href="/login">
            <Button className="flex items-center justify-center gap-2 mx-auto w-full sm:w-auto text-sm sm:text-base">
              Build Your Team
              <ArrowIcon />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
