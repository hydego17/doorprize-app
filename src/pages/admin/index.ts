import lazyload from '@/utils/lazyload';

const AdminPage = lazyload(() => import('./admin'));
export default AdminPage;
