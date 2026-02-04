import fs from '../ref/Reza_Babaei_FS.json'
import fsf from '../ref/Reza_Babaei_FSF.json'
import rn from '../ref/Reza_Babaei_RN.json'
import type { ResumeJson } from './types'

export type ResumeVariantKey = 'RN' | 'FS' | 'FSF'

export type ResumeVariant = {
  key: ResumeVariantKey
  label: string
  resume: ResumeJson
}

export const RESUME_VARIANTS: Record<ResumeVariantKey, ResumeVariant> = {
  RN: { key: 'RN', label: 'React Native', resume: rn as ResumeJson },
  FS: { key: 'FS', label: 'Fullstack', resume: fs as ResumeJson },
  FSF: { key: 'FSF', label: 'Software (Focused)', resume: fsf as ResumeJson },
}

export const RESUME_VARIANT_KEYS: ResumeVariantKey[] = ['RN', 'FS', 'FSF']

