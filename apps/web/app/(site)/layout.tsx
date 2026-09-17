import Link from 'next/link';
import { getHeaderNavigation, getFooterNavigation } from '@/lib/server';
import { routes } from '@/lib/routes';

/**
 * (site) group layout.
 *
 * Wraps all public-facing marketing routes.
 * Content-driven navigation architecture wired via NavigationRepository.
 * Visual freeze: semantic HTML structure only — no visual styling or components.
 */
interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const headerNav = await getHeaderNavigation();
  const footerSections = await getFooterNavigation();

  return (
    <>
      <header>
        <nav aria-label="Main Navigation">
          <Link href={routes.home()}>Prixtara</Link>
          <ul>
            {headerNav.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {children}

      <footer>
        <nav aria-label="Footer Navigation">
          {footerSections.map((section) => (
            <section key={section.id} aria-label={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </footer>
    </>
  );
}
