import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { FilmPage } from '@/components/ui/FilmPage';

export const metadata = {
  title: 'Terra Solis by Tomorrowland',
  description:
    'A vibrant lifestyle film for Tomorrowland\'s desert destination. Cinematic energy and architecture by Magnus Creators.',
};

export default function TerraSolisPage() {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === 'terra-solis')!;
  const next =
    PORTFOLIO_PROJECTS[(PORTFOLIO_PROJECTS.findIndex((p) => p.slug === 'terra-solis') + 1) %
      PORTFOLIO_PROJECTS.length];

  return <FilmPage project={project} next={next} />;
}
