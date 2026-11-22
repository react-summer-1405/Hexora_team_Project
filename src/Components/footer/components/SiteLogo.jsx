import siteFullLogo from '../../../assets/images/Title.png'
import logo from '../../../assets/icons/Untitled-1.jpg'

const SiteLogo = () => {
  return (
    <>
        <img src={logo}  alt="" className='block xl:hidden h-full' />
        <img src={siteFullLogo} alt="" className=' w-60 xl:block hidden' />
    </>
  )
}

export default SiteLogo