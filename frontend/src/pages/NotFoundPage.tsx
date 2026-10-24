import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Home, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-primary mb-4">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-navy font-mono mb-2">404</span>
        <h1 className="text-2xl font-bold text-navy mb-2">Page Not Found</h1>
        <p className="text-sm text-content-secondary mb-6 leading-relaxed">
          The page or scan record you requested does not exist or may have been moved.
        </p>

        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/scan">
            <Button variant="outline" size="md">
              Start a Scan
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
