import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-fade-in">
      {children}
    </div>
  );
}
