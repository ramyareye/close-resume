import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { RESUME_VARIANTS, RESUME_VARIANT_KEYS, type ResumeVariantKey } from './resume/data'
import { ResumeView } from './resume/ResumeView'

function App() {
  const initialVariant = useMemo<ResumeVariantKey>(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = (params.get('v') ?? '').toUpperCase()
    return RESUME_VARIANT_KEYS.includes(raw as ResumeVariantKey) ? (raw as ResumeVariantKey) : 'RN'
  }, [])

  const [variantKey, setVariantKey] = useState<ResumeVariantKey>(initialVariant)
  const variant = RESUME_VARIANTS[variantKey]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('v', variantKey)
    const next = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState(null, '', next)
    document.title = `${variant.resume.basics.name} — ${variant.label}`
  }, [variantKey, variant.label, variant.resume.basics.name])

  return (
    <div className="appShell">
      <div className="appToolbar" aria-label="Resume controls">
        <div className="toolbarGroup">
          <span className="toolbarLabel">Version</span>
          <select
            className="toolbarSelect"
            value={variantKey}
            onChange={(e) => setVariantKey(e.target.value as ResumeVariantKey)}
            aria-label="Select resume version"
          >
            {RESUME_VARIANT_KEYS.map((key) => (
              <option key={key} value={key}>
                {key} — {RESUME_VARIANTS[key].label}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbarGroup">
          <button className="toolbarButton" type="button" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>

      <ResumeView resume={variant.resume} />
    </div>
  )
}

export default App
