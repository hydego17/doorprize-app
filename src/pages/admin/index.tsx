import { lazyload } from '@/utils';
import Spinner from '@/components/spinner';

const AdminPage = lazyload(() => import('./admin'), {
  loading: () => <Spinner fullScreen size='md' />,
});
export default AdminPage;
