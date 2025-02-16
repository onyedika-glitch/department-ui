import Departments from '../app/pages/Departments';
import Login from './pages/login';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <Departments />
      <Login />
    </div>
  );
}

