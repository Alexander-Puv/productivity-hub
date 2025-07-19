
interface NavbarNoteProps {
  note: INotes | null
  isChosen: boolean
  onClick?: (note: string) => void
  isEditing?: boolean
  inputValue?: string
  setInputValue?: React.Dispatch<React.SetStateAction<string>>
  onBlur?: () => void
}

const NavbarNote = ({ note, isChosen, onClick, isEditing, inputValue, setInputValue, onBlur }: NavbarNoteProps) => {
  if (isEditing) {
    return (
      <div className='bg-primary text-primary-foreground'>
        <input
          autoFocus
          className="flex w-full bg-transparent px-2 py-1 border-none outline-none"
          value={inputValue}
          onChange={e => setInputValue && setInputValue(e.target.value)}
          onBlur={onBlur}
          onKeyDown={e => e.key === 'Enter' && onBlur && onBlur()}
        />
      </div>
    )
  }

  return <div
    className={`cursor-pointer transition-all hover:bg-accent ${isChosen && 'bg-accent'}`}
    onClick={() => onClick && note && onClick(note.id)}
  >
    <p className="px-2 py-1 truncate">{note?.title || note?.content || 'Empty note'}</p>
  </div>
}

export default NavbarNote