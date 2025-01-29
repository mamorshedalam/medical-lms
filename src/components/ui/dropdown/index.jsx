import React, { useState, useRef } from "react"
import * as cn from "classnames"
import { useOutsideAlerter } from "@/utils/custom-hooks"

const Dropdown = ({ className = "", options, selected = [], setSelected, placeholder = "Select Option" }) => {
  const [opened, setOpened] = useState(false)
  const [keyword, setKeyword] = useState("")
  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => setOpened(false))

  const removeItemHandler = (value) => {
    setSelected(selected.filter((item) => item !== value))
  }

  return (
    <div className={cn(["relative", className])} ref={wrapperRef}>
      <button
        type="button"
        className="flex justify-between w-full text-custom-dark text-xs bg-custom-semi-light-gray hover:border-primary border min-w-28 focus:outline-none font-semibold rounded-lg px-3 h-9 text-center items-center dark:bg-custom-gray dark:hover:bg-primary transition-all"
        onClick={() => setOpened(!opened)}
      >
        {selected && selected.length > 0 ? (
          <div className="flex gap-2 shadow-gray">
            {selected.map((item, index) => {
              const selectedOption = options.find((option) => option.value === item)
              return (
                <div key={`selected-${index}`} className="flex gap-1 border rounded-md px-2 py-1">
                  {selectedOption ? selectedOption.name : item}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeItemHandler(item)
                    }}
                    className="w-4 h-4 rounded-md text-[10px] bg-custom-gray hover:bg-black text-white transition-all"
                  >
                    X
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div
        className={cn({
          "absolute mt-1 z-10 w-full min-w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600": true,
          hidden: !opened,
        })}
      >
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              className="border outline-none px-2 py-1 w-full rounded-md font-manrope"
            />
          </li>
          {options
            .filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
            .map((option, index) => (
              <li key={`checkbox-item-${index}`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={() => {
                      const newSelected = selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                      setSelected(newSelected)
                    }}
                    checked={selected.includes(option.value)}
                    readOnly
                  />
                  <span
                    onClick={() => {
                      const newSelected = selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                      setSelected(newSelected)
                    }}
                    className="ms-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    {option.name}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
