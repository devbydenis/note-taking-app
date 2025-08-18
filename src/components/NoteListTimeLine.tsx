"use client"

import { NoteProps } from "@/types/notes";
import { useQuery, HydrationBoundary } from "@tanstack/react-query";
import Loader from "./Loader";
import Card from "./Card";

interface ApiResponse {
  success: boolean;
  data: NoteProps[];
}

const getNoteListTimeLine = async (): Promise<ApiResponse> => {
  const res = await fetch("api/notes", {
    credentials: "include"
  })
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export default function NoteListTimeLine() {
  const { data: responseData, error, isLoading } = useQuery({
    queryKey: ["noteListTimeLine"],
    queryFn: getNoteListTimeLine
  }) 
  
  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading notes</p>
  
  const notes = responseData?.data || []
  
  return (
    <div>
      <h2>Notes</h2>
      <ul className="w-3/4 mx-auto flex flex-wrap gap-20 items-center justify-center p-5">
        {notes.map((note: NoteProps) => (
          note.isPublic &&
          <li key={note.id}>
            <Card id={note.id} title={note.title} content={note.content} isPublic={note.isPublic} />
          </li>
        ))}
      </ul>
    </div>
  );
}