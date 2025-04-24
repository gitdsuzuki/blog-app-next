'use client'

import { useState } from 'react'

const Contact: React.FC = () => {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [messageError, setMessageError] = useState<string>('')

  const body: {
    name: string,
    email: string,
    message: string,
  } = {
    name: name,
    email: email,
    message: message,
  }

  const requestOptions: {
    method: string,
    headers: {[index: string]: string},
    body: string
  } = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }

  const isValidForm = () => {

    setNameError('')
    setEmailError('')
    setMessageError('')

    let isValidName: boolean = false
    let isValidEmail: boolean = false
    let isValidMessage: boolean = false

    if (!name) setNameError('お名前は必須です。')
    else if (name.length > 30) setNameError('お名前は30文字以内で入力してください。')
    else isValidName = true
  
    if (!email) setEmailError('メールアドレスは必須です。')
    else if (!email.match(/.+@.+\..+/)) setEmailError('メールアドレスの形式が正しくありません。')
    else isValidEmail = true
  
    if (!message) setMessageError('本文は必須です。')
    else if (message.length > 500) setMessageError('本文は500文字以内で入力してください。')
    else isValidMessage = true

    return isValidName && isValidEmail && isValidMessage
  }

  const handleClear = () => {
    setName('')
    setEmail('')
    setMessage('')
    setNameError('')
    setEmailError('')
    setMessageError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidForm()) return

    setSubmitting(true)

    const response: Response = await fetch(
      'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts',
      requestOptions,
    )

    if (response.ok) {
      window.alert("送信しました")
      handleClear()
    } else {
      window.alert('通信エラーです。')
    }

    setSubmitting(false)
  }

  return (
    <div className="w-full pt-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="font-bold text-xl mb-10">問い合わせフォーム</div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="name" className="w-[240px]">お名前</label>
              <div className="w-full">
                <input id="name" type="text" className="border border-gray-300 rounded-lg p-4 w-full" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} disabled={submitting}/>
                {nameError && <div className="text-red-500">{nameError}</div>}
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="mail" className="w-[240px]">メールアドレス</label>
              <div className="w-full">
                <input id="mail" type="text" className="border border-gray-300 rounded-lg p-4 w-full" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} disabled={submitting}/>
                {emailError && <div className="text-red-500">{emailError}</div>}
              </div>
            </div>
            <div className="flex justify-between items-center mb-10">
              <label htmlFor="message" className="w-[240px]">本文</label>
              <div className="w-full">
                <textarea id="message" rows={8} className="border border-gray-300 rounded-lg p-4 w-full" value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} disabled={submitting}></textarea>
                {messageError && <div className="text-red-500">{messageError}</div>}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mr-4" disabled={submitting}>送信</button>
              <button type="button" onClick={handleClear} className="bg-gray-200 font-bold py-2 px-4 rounded-lg" disabled={submitting}>クリア</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Contact