import Header from '../header/components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/components/Footer'
import ScrollToTop from '../common/navigation/ScrollToTop'

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-14 '>
      <ScrollToTop/>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout