/**
 * (site) group layout.
 *
 * This layout wraps all marketing/site pages:
 * - Home, Products, Vision, Careers, About
 *
 * Route group (site) groups these routes without adding a URL segment.
 * A separate apps/studio layout handles the Sanity Studio.
 *
 * TODO(design): Add <Header /> navigation component.
 * TODO(design): Add <Footer /> component.
 * TODO(design): Add skip-to-content landmark for accessibility.
 */
interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      {/* TODO(design): <Header /> */}
      {children}
      {/* TODO(design): <Footer /> */}
    </>
  );
}
