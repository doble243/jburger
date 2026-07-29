import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import { cn } from '../utils/cn';

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'mask';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'span' | 'section' | 'li';
}

const hiddenByVariant: Record<RevealVariant, string> = {
  up: 'opacity-0 translate-y-10',
  down: 'opacity-0 -translate-y-8',
  left: 'opacity-0 -translate-x-10',
  right: 'opacity-0 translate-x-10',
  zoom: 'opacity-0 scale-[0.94]',
  blur: 'opacity-0 translate-y-6 blur-[10px]',
  mask: 'opacity-0 translate-y-[110%]',
};

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 900,
  className,
  as = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={cn(
        'will-change-transform [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!blur-0',
        visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0' : hiddenByVariant[variant],
        className
      )}
      style={{
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Revela texto línea por línea con efecto máscara (clip). */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <span ref={ref} className={cn('block', className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span
            className={cn(
              'block will-change-transform [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:!transform-none motion-reduce:!opacity-100',
              visible ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0',
              lineClassName
            )}
            style={{
              transitionProperty: 'transform, opacity',
              transitionDuration: '1000ms',
              transitionDelay: `${delay + i * 120}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
