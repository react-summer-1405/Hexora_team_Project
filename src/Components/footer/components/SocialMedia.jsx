import instagram from '../../../assets/icons/footer/instagram.svg'
import telegram from '../../../assets/icons/footer/telegram.svg'
import youtube from '../../../assets/icons/footer/youtube.svg'
import twitter from '../../../assets/icons/footer/twitter.svg'
const SocialMedia = () => {

const socialMediaIcons = [
  { name: 'twitter', icon: twitter },
  { name: 'youtube', icon: youtube },
  { name: 'telegram', icon: telegram },
  { name: 'instagram', icon: instagram },
]
  return (
    <div className='flex gap-6 min-w-42.4 order-2  lg:order-1 cursor-pointer dark:invert'>
        {socialMediaIcons.map((media , index)=> <img src={media.icon} key={index} title={media.name}/>)}


    </div>
  )
}

export default SocialMedia