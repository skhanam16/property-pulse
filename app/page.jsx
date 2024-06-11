
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
// import connectDB from '@/config/database';

const HomePage = () => {
  // await connectDB();
  // console.log(process.env.MONGODB_URI);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  
  )
}

export default HomePage
