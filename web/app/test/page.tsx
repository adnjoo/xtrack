import Login from '@/components/Login';
import Register from '@/components/Register';

export default function Page() {
  return (
    <div>
      <h1 className='mt-12'>Test Page</h1>
      <div className='my-24'>
        Login
        <Login />
      </div>
      <div className='my-24'>
        Register
        <Register />
      </div>
    </div>
  );
}
