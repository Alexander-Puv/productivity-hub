interface ITodo {
  id: string
  created_at: string
  user_id: string
  text: string
  done: boolean
}

interface INotes {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  title: string
  content: string
  folder_id: string
}

interface IFolders {
  id: string
  created_at: string
  user_id: string
  title: string
}