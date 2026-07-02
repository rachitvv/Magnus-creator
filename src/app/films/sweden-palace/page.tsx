import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { FilmPage } from '@/components/ui/FilmPage';

export const metadata = {
  title: "Dubai's $35M Sweden Palace",
  description:
    'A cinematic tour of a $35M Dubai villa — built to feel less like a tour and more like a short film. By Magnus Creators.',
};

export default function SwedenPalacePage() {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === 'sweden-palace')!;
  const next =
    PORTFOLIO_PROJECTS[
      (PORTFOLIO_PROJECTS.findIndex((p) => p.slug === 'sweden-palace') + 1) %
        PORTFOLIO_PROJECTS.length
    ];

  return <FilmPage project={project} next={next} />;
}
