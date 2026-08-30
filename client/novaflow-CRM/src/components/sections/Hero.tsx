import Container from '../common/Container'
import Button from '../ui/Buttons'
import ProductPreview from './ProductPreview'

export default function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mx-auto max-w-2xl">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">Built for modern teams</span>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight mt-6'>Run your business with clarity.</h1>
          <p className='text-lg text-slate-600 mt-8'>Manage your workflow, customers, and team from one powerful workspace.</p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-center">
            <Button className="w-full md:w-auto">
              Get Started
            </Button>

            <Button
              variant="secondary"
              className="w-full md:w-auto"
            >
              View Features
            </Button>
          </div>
        </div>

        <ProductPreview className='mt-16' />
      </Container>
    </section>
  )
}
