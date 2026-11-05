import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import EmptyState from "./EmptyState";

interface SectionBoundaryProps {
  fallback: ReactNode;
  errorMessage: string;
  children: ReactNode;
}

const SectionBoundary = ({
  fallback,
  errorMessage,
  children,
}: SectionBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallback={<EmptyState>{errorMessage}</EmptyState>}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default SectionBoundary;
