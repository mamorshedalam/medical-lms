import React from 'react';

export default function Input({
    name = "text",
    value,
    inputChange,
    placeholder = "Type Here",
    label = "Label",
    type = "text",
    isRequired = false,
    isDisabled = false,
    minValue,
    maxValue,
    areaClassNames = '',
    hintText = '',
    rows = 3,
    checked = false,
    isCapitalize = true,
    minLength,
    maxLength,
    autofocus = false
}) {
    const hasInputError = false;
    const getInputClasses = () => {
        return `shadow-sm 
      border-[1px] 
      ${hasInputError ? 'bg-red-50 border border-red-500 text-red-900' :
                'border-gray-300 text-gray-900 '}
      sm:text-sm 
      rounded-md 
      input-transition
        focus:outline-none 
      focus:ring-0
      focus:border-violet-600 
      block 
      w-full 
      p-3 
      my-2 
      ${isDisabled ? 'bg-gray-100' : 'bg-white'}
      `;
    }

    return (
        <div className={areaClassNames}>
            {type !== 'checkbox' &&
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-900 block mb-2"
                >
                    {label}{" "}
                    {isRequired && <span className="text-red-600 text-base"> * </span>}
                </label>
            }

            {type === 'textarea' &&
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    disabled={isDisabled}
                    required={isRequired}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    onChange={inputChange && ((e) => inputChange(name, e.target.value))}
                    rows={rows}
                ></textarea>
            }

            {type !== 'textarea' && type !== 'checkbox' &&
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    disabled={isDisabled}
                    required={isRequired}
                    min={minValue}
                    max={maxValue}
                    className={getInputClasses()}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    onChange={inputChange && ((e) => inputChange(name, e.target.value))}
                />
            }

            {type === 'checkbox' &&
                <div className="flex items-center">
                    <input
                        id={name}
                        type={type}
                        name={name}
                        value={value}
                        disabled={isDisabled}
                        required={isRequired}
                        className={`w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-600 focus:accent-violet-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer`}
                        placeholder={placeholder}
                        checked={checked}
                        onChange={inputChange && ((e) => inputChange(name, e.target.checked ? 1 : 0))}
                    />
                    <label
                        htmlFor={name}
                        className="text-sm font-medium text-gray-900 ml-3 cursor-pointer"
                    >
                        {label}{" "}
                        {isRequired && <span className="text-red-600 text-base"> * </span>}
                    </label>
                </div>
            }

            {hintText !== '' &&
                <p className="text-gray-500 mt-1 text-xs">{hintText}</p>
            }
        </div>
    );
}
