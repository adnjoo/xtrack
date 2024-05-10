export default function Logout() {
  return (
    <div className='mt-4'>
      <form action='/auth/signout' method='post'>
        <button
          className='block w-full rounded bg-gray-300 px-4 py-2 font-bold text-gray-800'
          type='submit'
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
