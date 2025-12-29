import AboutHero from '@/components/public/sections/about/AboutHero'
import HistorySection from '@/components/public/sections/about/HistorySection'
import LeadershipSection from '@/components/public/sections/about/LeadershipSection'
import ValuesSection from '@/components/public/sections/about/ValuesSection'
import CTASection from '@/components/public/sections/commons/CTASection'
import React from 'react'

type Props = {}

const AboutPage = (props: Props) => {
  return (
      <main>
        <AboutHero/>
        <HistorySection />
        <ValuesSection />
        <LeadershipSection />
        <CTASection />
      </main>
  )
}

export default AboutPage