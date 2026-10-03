import { Contact } from '../components/Contact'
import { PageTransition } from './PageTransition'

export function ContactPage() {
  return (
    <PageTransition>
      <div style={{ paddingTop: '100px' }}>
        <Contact />
      </div>
    </PageTransition>
  )
}
