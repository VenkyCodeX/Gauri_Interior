import { useState, lazy, Suspense } from 'react'
import SplashScreen from '../components/sections/SplashScreen'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection'
import SectionDivider from '../components/ui/SectionDivider'

const ProductCategories = lazy(() => import('../components/sections/ProductCategories'))
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'))
const ServiceProcess = lazy(() => import('../components/sections/ServiceProcess'))
const BeforeAfterSection = lazy(() => import('../components/sections/BeforeAfterSection'))
const GallerySection = lazy(() => import('../components/sections/GallerySection'))
const Testimonials = lazy(() => import('../components/sections/Testimonials'))
const TrustSection = lazy(() => import('../components/sections/TrustSection'))
const ContactSection = lazy(() => import('../components/sections/ContactSection'))
const Footer = lazy(() => import('../components/layout/Footer'))

const Fallback = ({ h = 'h-screen' }) => (
  <div className={`${h} bg-[#0A0A0A] flex items-center justify-center`}>
    <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
  </div>
)

const S = ({ children, h }) => (
  <Suspense fallback={<Fallback h={h} />}>{children}</Suspense>
)

export default function Home() {
  const [splashDone, setSplashDone] = useState(() => sessionStorage.getItem('splashDone') === '1')

  return (
    <>
      <SplashScreen onComplete={() => { sessionStorage.setItem('splashDone', '1'); setSplashDone(true) }} />
      {splashDone && (
        <>
          <Navbar />
          <HeroSection />
          <SectionDivider />
          <S h="h-screen"><ProductCategories /></S>
          <SectionDivider />
          <S h="h-screen"><WhyChooseUs /></S>
          <SectionDivider />
          <S h="h-96"><ServiceProcess /></S>
          <SectionDivider />
          <S h="h-96"><BeforeAfterSection /></S>
          <SectionDivider />
          <S h="h-screen"><GallerySection /></S>
          <SectionDivider />
          <S h="h-96"><Testimonials /></S>
          <SectionDivider />
          <S h="h-96"><TrustSection /></S>
          <SectionDivider />
          <S h="h-screen"><ContactSection /></S>
          <S h="h-64"><Footer /></S>
        </>
      )}
    </>
  )
}
