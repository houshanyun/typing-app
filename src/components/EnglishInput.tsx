import { ChangeEventHandler, KeyboardEventHandler, LegacyRef } from "react"

type inputType = {
    checkTyping: KeyboardEventHandler<HTMLInputElement>,
    onChangeHandle: ChangeEventHandler<HTMLInputElement>,
    typing: string | undefined,
    inputRef: LegacyRef<HTMLInputElement>,
}
const EnglishInput: React.FC<inputType> = ({checkTyping, onChangeHandle, typing, inputRef}) => {
  return (
      <>
        <div className="englishInput">
          <input
            type="text"
            onKeyDown={checkTyping}
            onChange={onChangeHandle}
            value={typing}
            placeholder="請先選擇計時器時間"
            disabled={true}
            ref={inputRef}
          ></input>
        </div>
      </>
  )
}

export default EnglishInput
