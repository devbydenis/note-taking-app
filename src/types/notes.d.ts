import { ParamValue } from "next/dist/server/request/params"
import { is } from "zod/v4/locales"

type CreateNoteForm = z.infer<typeof createNoteSchema>

interface CreateNoteBody {
  title: string
  content: string
  isPublic?: boolean
}

interface UpdateNoteBody {
  title?: string
  content?: string
  isPublic?: boolean
}

interface NoteProps {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  data?: {
    data: {
      id: number;
      title: string;
      content: string;
      isPublic: boolean;
      // createdAt: string;
    }[]
  };
  userId?: number;
  user?: {
    id: number;
    username: string;
  }
}

interface DetailNoteProps extends NoteProps {
  comments: {
    id: number;
    user: string;
    content: string;
  }[];
  user: {
    id: number;
    username: string;
  }
}

interface EditNoteProps {
  id: ParamValue
  title: string
  content: string
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}