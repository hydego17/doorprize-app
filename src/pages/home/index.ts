import lazyload from '@/utils/lazyload';

const HomePage = lazyload(() => import('./home'));
export default HomePage;
