import React, { type ReactNode } from 'react';
import ErrorView from '../ErrorView';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  // 🔹 Runs during render phase
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // 🔹 Runs after render (side-effects allowed)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error', {
      error,
      errorInfo,
    });

    // Example: send to logging service
    // logErrorToService(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback ?? <ErrorView />;
    }

    return children;
  }
}

export default ErrorBoundary;
