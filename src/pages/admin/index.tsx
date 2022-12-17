import { lazyload } from '@/utils';
import FullSpinner from '@/components/full-spinner';

const AdminPage = lazyload(() => import('./admin'), {
  loading: () => <FullSpinner />,
});
export default AdminPage;
