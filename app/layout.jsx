import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties, find dream rental property'

};
const MainLayout = ( {children}) => {
  return (
    <AuthProvider>
    <html lang="en">
        <body>
          <Navbar/>
          <main>
             {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>

    </html>
    </AuthProvider>
  )
}

export default MainLayout
