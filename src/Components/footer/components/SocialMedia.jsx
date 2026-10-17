import instagram from '../../../assets/icons/footer/instagram.svg'
import telegram from '../../../assets/icons/footer/telegram.svg'
import youtube from '../../../assets/icons/footer/youtube.svg'
import twitter from '../../../assets/icons/footer/twitter.svg'
const SocialMedia = () => {

  const  socialMediaIcons = [twitter,youtube,telegram,instagram]

  return (
    <div className='flex gap-6 min-w-42.4 order-2  lg:order-1'>
        {socialMediaIcons.map((icon)=> <img src={icon}/>)}


    </div>
  )
}

export default SocialMedia