import * as React from 'react';

type LoaderComponent<P = {}> = Promise<React.ComponentType<P> | { default: React.ComponentType<P> }>;

type Loader<P = {}> = (() => LoaderComponent<P>) | LoaderComponent<P>;

type LazyLoader<P> = () => Promise<{ default: React.ComponentType<P> }>;

type LazyComponentProps<P> = JSX.IntrinsicAttributes &
  ((React.PropsWithoutRef<P> & React.RefAttributes<React.Component<P>>) | React.PropsWithRef<P>);

type LazyOptions = {
  loading?: React.ComponentType | (() => JSX.Element | null);
};

/**
 * lazyload utility for code splitting.
 */
export default function lazyload<P = {}>(loader: Loader<P>, options?: LazyOptions): React.ComponentType<P> {
  // invoke lazy import from loader
  const Component = React.lazy(loader as LazyLoader<P>);

  const LazyComponent = (props: LazyComponentProps<P>) => (
    <React.Suspense fallback={getFallbackComponent(options)}>
      <Component {...props} />
    </React.Suspense>
  );

  return LazyComponent as React.ComponentType<P>;
}

/**
 * Render fallback component based on given options
 */
function getFallbackComponent(options?: LazyOptions) {
  if (options) {
    const { loading: Loading } = options;

    if (Loading) {
      return <Loading />;
    }
  }

  return <div>Loading...</div>;
}
