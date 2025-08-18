"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface NoteProps {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  createdAt: string;
}

// function buat nge-fetch data dari API
const fetchNotes = async (): Promise<NoteProps[]> => {
  const res =  await fetch("/api/notes", {
    credentials: "include", // biar cookies ngikut
  })
  if (!res.ok) throw new Error("Failed to fetch notes");
  
  const response = await res.json();
  console.log("fetchNOtes", response.data)
  
  if (response.success && Array.isArray(response.data)) {
    return response.data;
  } else if (Array.isArray(response)) {
    return response;
  } else {
    console.error("Unexpected API response format:", response);
    return [];
  }
}

export default function NoteList() {
  const { data: notes, error, isLoading } = useQuery<NoteProps[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  })
  
  if (isLoading) return <p className="text-gray-500">Loading ...</p>
  if (error) return <p className="text-red-500">Error loading notes</p>
  
  if (!notes || notes.length === 0) return <p className="text-gray-500">No notes found</p>
  
  return (
    <ul className='flex flex-col gap-5 w-1/2'>
      {notes.map((note) => (
        <li key={"key-note-" + note.id} className='bg-gray-100 p-3'>
            <Link
                className="flex rounded gap-5 justify-between" 
                href={`/notes/${note.id}`}
            >
              <h2 className="font-semibold capitalize">{note.title}</h2>
              <p className="bg-gray-800 rounded text-white tracking-widest px-2 py-1">{note.isPublic ? "Public" : "Private"}</p>
            </Link>
          </li>
      ))}
    </ul>
  )
}