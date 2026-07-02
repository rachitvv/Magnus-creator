import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { FilmPage } from '@/components/ui/FilmPage';

export const metadata = {
  title: 'Adagio Premium The Palm',
  description:
    'An opulent brand film for Adagio Premium on the Palm Jumeirah. Cinematic hospitality storytelling by Magnus Creators.',
};

export default function AdagioPage() {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === 'adagio-premium-the-palm')!;
  const next =
    PORTFOLIO_PROJECTS[
      (PORTFOLIO_PROJECTS.findIndex((p) => p.slug === 'adagio-premium-the-palm') + 1) %
        PORTFOLIO_PROJECTS.length
    ];

  return <FilmPage project={project} next={next} />;
}
