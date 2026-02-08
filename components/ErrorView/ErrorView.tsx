import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { ErrorViewProps } from './types';
import type { ReactNode } from 'react';


const ErrorView = ({ onRetry, secondaryButtonText = 'Go Home', primaryButtonText = 'Retry' }: ErrorViewProps): ReactNode => {
  const navigate = useNavigate();

  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-gray-700 h-[calc(100vh-4rem)]">
      <Typography variant="h5" className="mb-2!">
        Something went wrong
      </Typography>
      <Typography variant="body1" className="mb-4! text-gray-500">
        We're sorry, but something unexpected happened. Please try again.
      </Typography>
      <div className="flex gap-3">
        <Button variant="outlined" onClick={() => navigate('/')}>
          {secondaryButtonText}
        </Button>
        <Button variant="contained" onClick={handleRetry}>
          {primaryButtonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorView;
