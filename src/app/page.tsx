import CreateNote from "@/components/CreateNote";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <CreateNote />
    </div>
  );
}
