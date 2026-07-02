import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { FilmPage } from '@/components/ui/FilmPage';

export const metadata = {
  title: 'Myriad — It Fills Up!',
  description:
    'A bold brand film for Myriad in Dubai — student living captured as cinematic energy. Directed and produced by Magnus Creators.',
};

export default function MyriadPage() {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === 'myriad')!;
  const next =
    PORTFOLIO_PROJECTS[(PORTFOLIO_PROJECTS.findIndex((p) => p.slug === 'myriad') + 1) %
      PORTFOLIO_PROJECTS.length];

  return <FilmPage project={project} next={next} />;
}
