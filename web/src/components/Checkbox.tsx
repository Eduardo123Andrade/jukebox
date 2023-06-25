import React from 'react'

interface CheckboxProps {
  checked: boolean
  label: string
  onChange: () => void
  className?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  label,
  onChange,
}) => {
  return (
    <div className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label className="ml-5 text-white">{label}</label>
    </div>
  )
}
