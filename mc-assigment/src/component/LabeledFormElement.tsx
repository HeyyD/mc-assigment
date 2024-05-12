import React from 'react'

type Props = {
  label: string,
  children: React.ReactNode
}
const LabeledFormElement = ({ label, children }: Props) => {
  return (
    <div>
      <label className="label">
        <span className="label-text-alt">{label}</span>
      </label>
      { children }
    </div>
  )
}

export default LabeledFormElement
