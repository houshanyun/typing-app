import React, { useState, useRef } from 'react'
import Button from './components/Button'
import EnglishInput from './components/EnglishInput'
import EnglishText from './components/EnglishText'
import InputLastDisplay from './components/InputLastDisplay'
import './App.scss'

const App: React.FC = () => {
  const [typing, setTyping] = useState<string | undefined>('')
  const [startTimer, setStartTimer] = useState<number | undefined>()
  const [displayTimer, setDisplayTimer] = useState<number | undefined>()
  const [typingSpeed, setTypingSpeed] = useState<number>()
  const textRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement> | undefined) =>
    setTyping(e?.target.value)

  const checkTyping = (e: React.KeyboardEvent): void => {
    const txtList = !textRef.current
      ? undefined
      : (Array.from(textRef.current.children) as unknown as HTMLSpanElement[])
    txtList?.forEach((span, index) => {
      if (
        e.getModifierState('Control') ||
        e.getModifierState('CapsLock') ||
        e.getModifierState('OS') ||
        e.getModifierState('Alt') ||
        e.key === 'Enter'
      ) {
        return
      }
      if (span.innerHTML === e.key && index === typing?.length) {
        span.classList.add('checkBg-pass')
      } else if (index === typing!.length - 1 && e.key === 'Backspace') {
        if (span.innerHTML === ' ') span.style.backgroundColor = '#fff'
        span.classList.remove('checkBg-pass')
        span.classList.remove('checkBg-miss')
      } else if (
        span.innerHTML !== e.key &&
        index === typing?.length &&
        e.key !== 'Backspace' &&
        e.key !== 'CapsLock' &&
        e.key !== 'Tab' &&
        !e.getModifierState('Shift')
      ) {
        if (span.innerHTML === ' ') span.style.backgroundColor = '#EC407A'
        span.classList.add('checkBg-miss')
      }
    })
  }
  const timer = async (e: any) => {
    e.target.parentNode.style.display = 'none'
    let end = 5
    setStartTimer(end)
    const currentSecond = setInterval(() => {
      setStartTimer((prev) => prev! - 1)

      end -= 1
      if (end === 0) {
        clearInterval(currentSecond)
        setDisplayTimer(e.target.getAttribute('data-timer'))
        inputRef.current?.removeAttribute('disabled')
        inputRef.current?.removeAttribute('placeholder')
        inputRef.current?.focus()
        typingTimer(e.target.getAttribute('data-timer'))
      }
    }, 1000)
  }
  const typingTimer = async (t: number) => {
    let end = t
    const result = await new Promise((resolve) => {
      const currentSecond = setInterval(() => {
        setDisplayTimer((prev) => prev! - 1)
        end -= 1
        if (end === 0) {
          clearInterval(currentSecond)
          inputRef.current?.setAttribute('disabled', 'true')
          resolve(setTypingSpeed(t))
        }
      }, 1000)
    })
  }

  return (
    <>
      <div className="title">
        <h1>Typing App</h1>
      </div>
      {typingSpeed && (
        <div className="complete">
          <div className="popup">
            每秒 {Math.floor(typing!.length / typingSpeed)} 個字母
          </div>
        </div>
      )}
      <EnglishText textRef={textRef} />
      <EnglishInput
        checkTyping={checkTyping}
        onChangeHandle={onChangeHandle}
        typing={typing}
        inputRef={inputRef}
      />
      {displayTimer! > 0 && (
        <div className="displayTimer">計時 {displayTimer} 秒</div>
      )}
      {startTimer! > 0 && (
        <div className="startTimer">倒數 {startTimer} 秒</div>
      )}
      <InputLastDisplay typing={typing} />

      <div className="timer-group">
        <Button
          content="30 seconds"
          onClick={timer}
          btnClass="timer-btn"
          data={30}
        />
        <Button
          content="60 seconds"
          onClick={timer}
          btnClass="timer-btn"
          data={60}
        />
        <Button
          content="180 seconds"
          onClick={timer}
          btnClass="timer-btn"
          data={180}
        />
      </div>
      {typingSpeed && (
        <div className="reset">
          <Button
            btnClass="reset-btn"
            onClick={() => location.reload()}
            content="重新開始"
            data={undefined}
          />
        </div>
      )}
      <footer>houshanyun &copy; 2022</footer>
    </>
  )
}

export default App
