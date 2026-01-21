import { Toaster } from 'sonner'

// Style see css https://github.com/emilkowalski/sonner/blob/main/src/styles.css
export default function WrapToaster() {
  return (
    <Toaster
      theme="light" // dark
      position="top-center"
      richColors
      toastOptions={{
        style: {
          borderRadius: '8px',
        },
      }}
    />
  )
}
