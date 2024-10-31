import Logo from './logo'

const Footer = () => {
  return (<>
    <footer className='bg-slate-800 text-white w-full py-1'>
      <div className=' flex flex-col items-center'>
        <div className='text-2xl'><Logo /></div>
        <div>Created with 💖 by Syeda Hoorain Ali</div>
      </div>
    </footer>
  </>)
}

export default Footer