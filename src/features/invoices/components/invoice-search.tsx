import { useState, useEffect, useRef } from "react"
import { useDebounce } from "../../../hooks/useDebounce"

type Props = {
  value: string
  onChange: (search: string) => void
}

export default function InvoiceSearch({ value: externalValue, onChange }: Props) {
  const [value, setValue] = useState(externalValue)
  const debouncedSearch = useDebounce(value, 400)
  const isMounted = useRef(false)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    onChangeRef.current(debouncedSearch)
  }, [debouncedSearch])

  return (
    <input
      type="text"
      placeholder="Search invoice..."
      className="border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
      value={value}
      onChange={(e) => setValue(e.target.value)}/>
  )
}