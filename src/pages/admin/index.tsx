import lazyload from '@/utils/lazyload';
import FullSpinner from '@/components/full-spinner';

const AdminPage = lazyload(() => import('./admin'), {
  loading: () => <FullSpinner />,
});
export default AdminPage;
