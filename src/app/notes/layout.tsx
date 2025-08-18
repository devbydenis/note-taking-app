import Navbar from "@/components/Navbar";

export default function LayoutNotes({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}