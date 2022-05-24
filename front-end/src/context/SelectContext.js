import { createContext, useState } from "react";

export const SelectContext = createContext()

const SelectProvider = ({children}) => {
  const [selectedValue, setSelectedValue] = useState('all')
  const data = {
    selectedValue,
    setSelectedValue
  }
  return (
    <SelectContext.Provider value={data}>
    {children}
    </SelectContext.Provider>
  )
}

export default SelectProvider