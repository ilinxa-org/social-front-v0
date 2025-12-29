import ContactFAQ from '@/components/public/sections/contact/ContactFAQ'
import ContactHero from '@/components/public/sections/contact/ContactHero'
import ContactInfo from '@/components/public/sections/contact/ContactInfo'
import React from 'react'

const ContactPage = () => {
  return (
     <main>
        <ContactHero />
        

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-5">
              {/* <ContactForm /> */}
                  <div className="space-y-8 h-full">

      <div className="bg-card h-full rounded-2xl p-8 border border-border/50 shadow-lg">
      </div>
      </div>
              <ContactInfo />
            </div>
          </div>
        </section>

        <ContactFAQ />
      </main>
  )
}

export default ContactPage