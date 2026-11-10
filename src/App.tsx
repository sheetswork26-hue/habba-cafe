import { LazyMotion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import BeanOfWeek from './components/BeanOfWeek'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Hours from './components/Hours'
import Footer from './components/Footer'
import CartButton from './components/CartButton'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'

// محرّك الأنيميشن بيتحمّل بعد أول رسم عشان مايتقّلش الـ bundle الأساسي
const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  return (
    // reducedMotion="user" بيلغي حركات الإزاحة لو المستخدم مفعّل prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <CartProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-accent-ink"
        >
          تخطَّ إلى المحتوى
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Menu />
          <BeanOfWeek />
          <Gallery />
          <Testimonials />
          <Reservation />
          <Hours />
        </main>
        <Footer />
        <CartButton />
        <CartDrawer />
        </CartProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
