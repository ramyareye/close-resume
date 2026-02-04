export type ResumeBasics = {
  name: string
  label?: string
  email?: string
  url?: string
  linkedin?: string
  summary?: string
  location?: {
    city?: string
    region?: string
    countryCode?: string
  }
}

export type ResumeWork = {
  company: string
  position?: string
  location?: string
  startDate?: string
  endDate?: string
  highlights?: string[]
}

export type ResumeSkill = {
  name: string
  keywords?: string[]
}

export type ResumeEducation = {
  institution?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string
  courses?: string[]
}

export type ResumeJson = {
  basics: ResumeBasics
  work?: ResumeWork[]
  skills?: ResumeSkill[]
  education?: ResumeEducation[]
}

