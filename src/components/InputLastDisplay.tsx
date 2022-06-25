import React from "react"
type inputLast = {
    typing: string | undefined
}
const InputLastDisplay: React.FC<inputLast> = ({ typing }) => {
  return (
    <>
      {typing && (
        <div className="inputLastDisplay">
          {typing?.slice(typing?.length - 1, typing?.length)}
        </div>
      )}
    </>
  )
}

export default InputLastDisplay
