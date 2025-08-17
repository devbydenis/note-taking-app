export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-transparent animate-spin" aria-hidden="true" />
        <p className="text-sm text-gray-600" role="status" aria-live="polite">
          Loading …
        </p>
      </div>
    </div>
  )
}