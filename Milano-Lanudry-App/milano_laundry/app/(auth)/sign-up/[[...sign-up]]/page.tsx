import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#22d3ee', // Tailwind cyan-400
            colorBackground: '#ffffff',
            colorText: '#111827', // text-gray-900
            colorInputBackground: '#f9fafb', // bg-gray-50
            colorInputText: '#111827',
            colorButtonText: '#ffffff',
          },
          elements: {
            card: 'rounded-xl shadow-2xl overflow-hidden',
            headerTitle: 'text-3xl font-extrabold text-cyan-400',
            headerSubtitle: 'text-lg text-gray-600',
            formButtonPrimary: 'bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg py-3 font-semibold transition-transform transform hover:scale-105',
          },
        }}
      />
    </div>
  )
}
