import { Link, NavLink } from 'react-router-dom';
import { cx } from '@/utils/cx';

type NavbarProps = {
  hidden?: boolean;
};

const Navbar = ({ hidden }: NavbarProps) => {
  return (
    <header
      className='py-3 px-8 text-sm font-medium border-b justify-between'
      style={{
        display: hidden ? 'none' : 'flex',
      }}
    >
      <div className='flex items-center'>
        <Link to='/'>
          <h1 className='text-xl text-black'>Doorprize App</h1>
        </Link>
      </div>

      <div className='flex gap-2'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            cx('rounded py-2 px-4 transition hover:bg-slate-200', isActive && 'bg-slate-200')
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/admin'
          className={({ isActive }) =>
            cx('rounded  py-2 px-4 transition hover:bg-slate-200', isActive && 'bg-slate-200')
          }
        >
          Admin
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
