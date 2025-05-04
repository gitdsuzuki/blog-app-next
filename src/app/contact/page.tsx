'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ContactForm {
  name: string
  email: string
  content: string
}

const Contact: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({ mode: 'onBlur'})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: ContactForm) => {

    setIsSubmitting(true)

    const response: Response = await fetch(
      'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          name: data.name,
          email: data.email,
          content: data.content,
        })
      },
    )

    if (response.ok) {
      window.alert("送信しました")
      reset()
    } else {
      window.alert('通信エラーです。')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="w-full pt-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="font-bold text-xl mb-10">
          問い合わせフォーム
        </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="name" className="w-[240px]">
                お名前
              </label>
              <div className="w-full">
                <input id="name" type="text" className="border border-gray-300 rounded-lg p-4 w-full" disabled={isSubmitting}
                  {...register("name", {
                    required: "お名前は必須です。",
                    maxLength: { value: 30, message: "お名前は30文字以内で入力してください。",
                    },})}/>
                <p className="text-red-500">{errors.name?.message as React.ReactNode}</p>
              </div>
              
            </div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="mail" className="w-[240px]">
                メールアドレス
              </label>
              <div className="w-full">
                <input id="mail" type="email" className="border border-gray-300 rounded-lg p-4 w-full" disabled={isSubmitting}
                  {...register("email", {
                    required: "メールアドレスは必須です。",
                    pattern: { value: /.+@.+\..+/, message: "メールアドレスの形式が正しくありません。",
                    },})}/>
                <p className="text-red-500">{errors.email?.message as React.ReactNode}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-10">
              <label htmlFor="message" className="w-[240px]">
                本文
              </label>
              <div className="w-full">
                <textarea id="message" rows={8} className="border border-gray-300 rounded-lg p-4 w-full" disabled={isSubmitting}
                  {...register("content", {
                    required: "本文は必須です。",
                    maxLength: { value: 500, message: "本文は500文字以内で入力してください。",
                    },})}></textarea>
                <p className="text-red-500">{errors.content?.message as React.ReactNode}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mr-4" disabled={isSubmitting}>
                送信
              </button>
              <button type="button" onClick={() => reset()} className="bg-gray-200 font-bold py-2 px-4 rounded-lg" disabled={isSubmitting}>
                クリア
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Contact