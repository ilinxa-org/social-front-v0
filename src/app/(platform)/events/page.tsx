import EventsGrid from '@/components/public/sections/events/EventsGrid'
import EventsHero from '@/components/public/sections/events/EventsHero'
import React from 'react'

const EventPage = () => {
  return (
    <main>
      <EventsHero />
      <EventsGrid />
    </main>
  )
}

export default EventPage