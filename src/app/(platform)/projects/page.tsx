"use client";
import ProjectsGrid from '@/components/public/sections/projects/ProjectsGrid'
import ProjectsHero from '@/components/public/sections/projects/ProjectsHero'
import React from 'react'

const ProjectsPage = () => {
  return (
      <main>
        <ProjectsHero />
        <ProjectsGrid />
      </main>
  )
}

export default ProjectsPage