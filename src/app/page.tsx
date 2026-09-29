import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-96">
        <h1 className="sr-only">ByteSpace home</h1>
      </main>
      <Footer />
    </>
  )
}
