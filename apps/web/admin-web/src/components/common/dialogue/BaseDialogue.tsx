'use client';

import React from 'react';
import Image from 'next/image';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface BaseDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleColor?: string;
  message: string;
  highlightedText?: string | string[];
  highlightColor?: string;
  primaryButtonText: string;
  primaryButtonColor: string;
  primaryButtonIcon?: React.ReactNode;
  onPrimaryClick: () => void;
  secondaryButtonText?: string;
  secondaryButtonColor?: string;
  onSecondaryClick?: () => void;
}

/**
 * Base reusable dialogue component
 * Provides a modal dialog with customizable title, message, buttons, and colors
 */
export function BaseDialogue({
  isOpen,
  onClose,
  title,
  titleColor = COLORS.TEXT_PRIMARY,
  message,
  highlightedText,
  highlightColor,
  primaryButtonText,
  primaryButtonColor,
  primaryButtonIcon,
  onPrimaryClick,
  secondaryButtonText = 'Cancel',
  secondaryButtonColor = COLORS.SEC_BG,
  onSecondaryClick,
}: BaseDialogueProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();

  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle secondary button click
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onClose();
    }
  };

  // Parse message to highlight specific text
  const renderMessage = () => {
    if (!highlightedText) {
      return <span>{message}</span>;
    }

    const highlightArray = Array.isArray(highlightedText) ? highlightedText : [highlightedText];
    let processedMessage = message;
    const parts: Array<{ text: string; highlight: boolean }> = [];

    // Find all highlighted text positions
    const positions: Array<{ start: number; end: number; text: string }> = [];
    highlightArray.forEach((text) => {
      const index = processedMessage.toLowerCase().indexOf(text.toLowerCase());
      if (index !== -1) {
        positions.push({
          start: index,
          end: index + text.length,
          text: processedMessage.substring(index, index + text.length),
        });
      }
    });

    // Sort positions by start index
    positions.sort((a, b) => a.start - b.start);

    // Build parts array
    let lastIndex = 0;
    positions.forEach((pos) => {
      if (pos.start > lastIndex) {
        parts.push({ text: processedMessage.substring(lastIndex, pos.start), highlight: false });
      }
      parts.push({ text: pos.text, highlight: true });
      lastIndex = pos.end;
    });

    if (lastIndex < processedMessage.length) {
      parts.push({ text: processedMessage.substring(lastIndex), highlight: false });
    }

    // If no highlights found, return original message
    if (parts.length === 0) {
      return <span>{message}</span>;
    }

    return (
      <>
        {parts.map((part, index) => (
          <span
            key={index}
            style={part.highlight ? { color: highlightColor || primaryButtonColor } : {}}
          >
            {part.text}
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem',
        }}
      >
        {/* Dialogue Box */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: COLORS.SEC_BG,
            borderRadius: '0.75rem',
            padding: isSmallMobile ? '1rem' : isMobile ? '1.25rem' : '1.5rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: `0 8px 32px ${COLORS.SHADOW_DARK}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: isSmallMobile ? '0.75rem' : '1rem',
              right: isSmallMobile ? '0.75rem' : '1rem',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: COLORS.TRANSPARENT,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.OVERLAY_10;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.TRANSPARENT;
            }}
          >
            <Image
              src="/icons/common/cross.svg"
              alt="Close"
              width={18}
              height={18}
            />
          </button>

          {/* Title */}
          <h2
            style={{
              color: titleColor,
              fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
              fontWeight: '600',
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              paddingRight: '2.5rem',
            }}
          >
            {title}
          </h2>

          {/* Message */}
          <p
            style={{
              color: COLORS.TEXT_PRIMARY,
              fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
              lineHeight: '1.5',
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {renderMessage()}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              flexDirection: isSmallMobile ? 'column' : 'row',
            }}
          >
            {/* Secondary Button */}
            <button
              onClick={handleSecondaryClick}
              style={{
                padding: isSmallMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: secondaryButtonColor,
                border: 'none',
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                fontWeight: '500',
                fontFamily: '"Space Grotesk", sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flex: isSmallMobile ? '1' : '0 0 auto',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_10;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = secondaryButtonColor;
              }}
            >
              {secondaryButtonText}
            </button>

            {/* Primary Button */}
            <button
              onClick={onPrimaryClick}
              style={{
                padding: isSmallMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: primaryButtonColor,
                border: 'none',
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                fontWeight: '500',
                fontFamily: '"Space Grotesk", sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: isSmallMobile ? '1' : '0 0 auto',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {primaryButtonIcon && (
                <span style={{ display: 'flex', alignItems: 'center' }}>{primaryButtonIcon}</span>
              )}
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

