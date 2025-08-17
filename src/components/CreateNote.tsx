import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function CreateNote() {
  return (
    <Link href="/notes/create" className="absolute bottom-10 right-10 bg-gray-900 hover:bg-gray-600 text-white font-medium p-3 rounded-full transition">
      <FaPlus />
    </Link>
  )
}