import React, { LegacyRef } from 'react'
import { ENTEXT } from '../constant/ENTEXT'
type textType = {
  textRef: LegacyRef<HTMLDivElement>
}
const EnglishText: React.FC<textType> = ({ textRef }) => {
  return (
    <>
      <div className="englishText" ref={textRef}>
        {ENTEXT.map((word: string, index: number) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </div>
    </>
  )
}

export default EnglishText
