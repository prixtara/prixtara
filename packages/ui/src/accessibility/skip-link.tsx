import React from 'react';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
  children?: React.ReactNode;
}

/**
 * Headless SkipLink component for keyboard and screen-reader accessibility.
 *
 * Implements WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks).
 * Uses .sr-only and .focus:not-sr-only so it remains visually hidden until focused via Tab.
 */
export function SkipLink({
  targetId = 'main-content',
  children = 'Skip to main content',
  className = '',
  ...props
}: SkipLinkProps) {
  const href = targetId.startsWith('#') ? targetId : `#${targetId}`;

  return (
    <a href={href} className={`sr-only focus:not-sr-only ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
