import { portfolioData } from '../data/portfolioData'
import emailjs from '@emailjs/browser'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type FormValues = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = { name: '', email: '', message: '' }

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Your name must be at least 2 characters.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'

  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length < 10) errors.message = 'Your message must be at least 10 characters.'
  return errors
}

export function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  const [isError, setIsError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setStatus('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateForm(values)
    setErrors(validationErrors)
    setStatus('')
    setIsError(false)
    if (Object.keys(validationErrors).length > 0) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      setIsError(true)
      setStatus('Email service is not configured yet. Please try again later.')
      return
    }

    setIsSubmitting(true)
    try {
      await emailjs.send(serviceId, templateId, { name: values.name.trim(), email: values.email.trim(), message: values.message.trim(), to_email: portfolioData.email, reply_to: values.email.trim(), from_name: values.name.trim(), from_email: values.email.trim() }, { publicKey })
      setValues(initialValues)
      setStatus('Thank you! Your message has been sent successfully.')
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setIsError(true)
      setStatus('Something went wrong while sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section" id="contact" style={{ position: 'relative' }}>
      <div className="container contact-grid">
        <div>
          <span className="section-number">08</span>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.2 }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Let's make<br /><em>something useful.</em></h2>
            <p>Have an opportunity, idea, or just want to say hello? My inbox is open.</p>
            <div className="contact-links">
              <a href={`mailto:${portfolioData.email}`}>{portfolioData.email} <span aria-hidden="true">↗</span></a>
              <a href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={portfolioData.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>
        </div>

        {!shouldReduceMotion && (
          <motion.svg 
            width="100" height="100" viewBox="0 0 100 100" 
            style={{ position: 'absolute', top: '100px', right: '10%', opacity: 0.4, pointerEvents: 'none' }}
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}
          >
            <motion.circle cx="10" cy="10" r="2" fill="var(--pale-mint)" variants={{ hidden: { cx: -20, cy: -20, opacity: 0 }, visible: { cx: 50, cy: 50, opacity: 1 } }} transition={{ duration: 1.5, ease: "easeInOut" }} />
            <motion.circle cx="90" cy="10" r="2" fill="var(--warm-grey)" variants={{ hidden: { cx: 120, cy: -20, opacity: 0 }, visible: { cx: 50, cy: 50, opacity: 1 } }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }} />
            <motion.circle cx="50" cy="90" r="2" fill="var(--bone)" variants={{ hidden: { cx: 50, cy: 120, opacity: 0 }, visible: { cx: 50, cy: 50, opacity: 1 } }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} />
            
            <motion.line x1="50" y1="50" x2="50" y2="50" stroke="var(--pale-mint)" strokeWidth="1" variants={{ hidden: { x1: -20, y1: -20 }, visible: { x1: 50, y1: 50 } }} transition={{ duration: 1.5, ease: "easeInOut" }} />
            <motion.line x1="50" y1="50" x2="50" y2="50" stroke="var(--warm-grey)" strokeWidth="1" variants={{ hidden: { x1: 120, y1: -20 }, visible: { x1: 50, y1: 50 } }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }} />
            <motion.line x1="50" y1="50" x2="50" y2="50" stroke="var(--bone)" strokeWidth="1" variants={{ hidden: { x1: 50, y1: 120 }, visible: { x1: 50, y1: 50 } }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} />
          </motion.svg>
        )}

        <motion.form 
          className="contact-form" onSubmit={handleSubmit} noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label htmlFor="name">Your name
            <input id="name" name="name" type="text" placeholder="Your name" value={values.name} onChange={handleChange} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <span id="name-error" role="alert">{errors.name}</span>}
          </label>
          <label htmlFor="email">Email address
            <input id="email" name="email" type="email" placeholder="your.email@example.com" value={values.email} onChange={handleChange} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <span id="email-error" role="alert">{errors.email}</span>}
          </label>
          <label htmlFor="message">Message
            <textarea id="message" name="message" rows={4} placeholder="Tell me a little about your opportunity..." value={values.message} onChange={handleChange} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            {errors.message && <span id="message-error" role="alert">{errors.message}</span>}
          </label>
          {status && <p className={isError ? 'contact-status contact-status-error' : 'contact-status'} role="status" aria-live="polite">{status}</p>}
          <button className="button button-quiet" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}