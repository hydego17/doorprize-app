import { lazyload } from '@/utils';
import FullSpinner from '@/components/full-spinner';

const HomePage = lazyload(() => import('./home'), {
  loading: () => <FullSpinner />,
});
export default HomePage;
