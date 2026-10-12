import Header from '../header/components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/components/Footer'

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-14'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout