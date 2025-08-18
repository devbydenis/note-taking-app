import Card from "@/components/Card";
import CreateNote from "@/components/CreateNote";
import Navbar from "@/components/Navbar";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query"
import NoteListTimeLine from "@/components/NoteListTimeLine";

async function getNoteListTimeLine() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes`, {
    cache: "no-store", // biar selalu fresh
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch note list timeline");
  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({   // prefetch data di server
    queryKey: ["noteListTimeLine"],
    queryFn: getNoteListTimeLine,
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='h-screen flex flex-col'>
        <Navbar />
        <NoteListTimeLine />
        <CreateNote />
      </div>
    </HydrationBoundary>
  );
}
