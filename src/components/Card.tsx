import { NoteProps } from "@/types/notes";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function Card({ id, title, content, isPublic }: NoteProps) {
  return (
    <div className="w-72 bg-white rounded-b-lg border-t-8 border-gray-900 rounded-t-2xl px-4 py-5 flex flex-col justify-around shadow-md">
      <p className="text-lg font-bold font-sans">{title}</p>
      <span className="text-gray-400 text-sm">{isPublic ? 'Public' : 'Private'}</span>
      <div className="py-3">
        <p className="text-gray-600 text-sm">
          {content ?? 'No content'}
        </p>
      </div>
      <div className="flex justify-end">
        <div className="text-sm flex gap-2">
          <Link href={`/notes/${id}`} className="bg-gray-900 text-white px-2 flex gap-1 items-center rounded hover:bg-gray-600 transition-colors ease-in-out">
            <MdOpenInNew className="h-full text-lg " />
            <span className="txt-lg">Read More</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
