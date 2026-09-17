import type { ReactNode } from 'react';

export interface PageProps {
  id?: string;
  className?: string;
  tabIndex?: number;
  children: ReactNode;
}

/**
 * Architectural Page container.
 * Intentionally unstyled semantic <main> shell.
 */
export function Page({ id = 'main-content', tabIndex = -1, className, children }: PageProps) {
  return (
    <main id={id} tabIndex={tabIndex} className={className}>
      {children}
    </main>
  );
}

export interface SectionProps {
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Architectural Section container.
 * Intentionally unstyled semantic <section> block.
 */
export function Section({
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} className={className}>
      {children}
    </section>
  );
}

export interface ContentProps {
  label?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Architectural Content boundary.
 * Intentionally unstyled container for structured placeholder content.
 */
export function Content({ label, className, children }: ContentProps) {
  return (
    <div data-content-block={label} className={className}>
      {children}
    </div>
  );
}
