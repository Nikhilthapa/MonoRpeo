'use client';

import { InfoCard } from './InfoCard';
import { ActionButton } from '@/components/common/ActionButton';
import { FileIcon } from '@/components/icons/FileIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Document {
  name: string;
  url?: string;
}

interface SubmittedDocumentsCardProps {
  documents: Document[];
  onViewDocument?: (documentName: string) => void;
}

export function SubmittedDocumentsCard({
  documents,
  onViewDocument,
}: SubmittedDocumentsCardProps) {
  const { isSmallMobile, isMobile } = useMediaQuery();

  return (
    <InfoCard>
      {/* Custom title with icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <FileIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Submitted Documents
        </h3>
      </div>

      {/* Grid layout for documents */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem',
        }}
      >
        {documents.map((doc, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              gridColumn: !isMobile && index === 2 ? '1 / -1' : 'auto',
            }}
          >
            <span
              style={{
                color: COLORS.TEXT_SECONDARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                wordBreak: 'break-word',
              }}
            >
              {doc.name}
            </span>
            <ActionButton
              text="View Document"
              icon={<FileIcon size={14} style={{ filter: 'brightness(0) invert(1)' }} />}
              onClick={() => onViewDocument?.(doc.name)}
              background={COLORS.PRIMARY}
              hoverBackground={COLORS.PRIMARY_DARK}
              color={COLORS.TEXT_PRIMARY}
              style={{
                width: '100%',
              }}
            />
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

