/**
 * Architecture placeholder component.
 *
 * This is a minimal structural placeholder for the component library.
 * DO NOT add visual styles, design tokens, or layout decisions here.
 *
 * TODO(design): Replace with production components during the design phase.
 *
 * Architecture rules for this package:
 *   - All components must be composable — prefer small, focused components
 *   - Use cn() from @prixtara/utils for className composition
 *   - Keep data-fetching outside of components — receive data via props
 *   - Add 'use client' only when the component uses browser APIs or hooks
 */
import type { ReactNode } from 'react';
import { cn } from '@prixtara/utils';

interface PlaceholderProps {
  /** Optional label for development identification */
  label?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Development placeholder.
 * Used to mark regions where components will be built in the design phase.
 * Renders its children if provided; otherwise shows the label.
 */
export function Placeholder({ label, children, className }: PlaceholderProps): ReactNode {
  if (children) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div
      className={cn(className)}
      data-placeholder={label ?? 'component-placeholder'}
      aria-label={label}
    />
  );
}
