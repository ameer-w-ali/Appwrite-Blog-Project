import { useId, forwardRef } from 'react'

function Select({
  label,
  options,
  className = '',
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-neutral-50 duration-200 border border-neutral-200 w-full ${className}`}>
        {options?.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Select)