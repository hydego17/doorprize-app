import { lazyload } from '@/utils/lazyload';
import Spinner from '@/components/spinner';

const HomePage = lazyload(() => import('./home'), {
  loading: () => <Spinner fullScreen size='md' />,
});
export default HomePage;
