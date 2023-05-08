import { useState } from "react"

export const useRecord = () => {
    const [modalNewRecord, setModalNewRecord] = useState(false)

    const openModal = () => {
        setModalNewRecord(!modalNewRecord)
    }

  return {
    // *properties
    modalNewRecord,
    //* methods
    openModal
  }
}
