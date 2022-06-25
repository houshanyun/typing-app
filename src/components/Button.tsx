import { FC, ReactEventHandler } from 'react'

type btn = {
  content: string
  btnClass: string
  onClick: ReactEventHandler
  data?: number
}
const Button: FC<btn> = ({ content, btnClass, onClick, data }) => {
  return (
    <>
      <button className={btnClass} onClick={onClick} data-timer={data}>
        {content}
      </button>
    </>
  )
}

export default Button
