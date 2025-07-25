// import { FontSize } from '@/lib/extentions/font-size'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Toolbar from '@radix-ui/react-toolbar'
import BulletList from '@tiptap/extension-bullet-list'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, ChevronDown, Highlighter, Italic, ListIcon, ListOrderedIcon, Type, UnderlineIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'

const fontSizes = [12, 14, 16, 18, 24, 32]
const highlighterColors = ['#fafafa', '#e11d48', '#10b981', '#2563eb', '#facc15', '#00000000']
const textColors = ['#fafafa', '#e11d48', '#10b981', '#2563eb', '#facc15']

const NoteEditor = ({ content, onUpdate }: { content?: string, onUpdate?: (html: string) => void }) => {
  const [chosenFontSize, setChosenFontSize] = useState(fontSizes[2])
  const [chosenHighlighterColor, setChosenHighlighterColor] = useState(highlighterColors[4])
  const [chosenTextColor, setChosenTextColor] = useState(textColors[0])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      FontSize,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: content || '',
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
    immediatelyRender: false
  })

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const firstChild = e.currentTarget.querySelector(':scope > *') as HTMLElement
    if (firstChild) firstChild.focus()
  }

  if (!editor) return null

  return (
    <div className="w-full h-full flex flex-col">
      <Toolbar.Root className="px-4 py-1 flex gap-2 bg-background border-b">
        <Toolbar.ToggleGroup type="multiple" className='flex items-center gap-2'>
          <ToolbarToggleItem value='Bold' onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold />
          </ToolbarToggleItem>
          <ToolbarToggleItem value='Italic' onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic />
          </ToolbarToggleItem>
          <ToolbarToggleItem value='Underline' onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon />
          </ToolbarToggleItem>
        </Toolbar.ToggleGroup>

        <Toolbar.Separator className='border-r' />
        
        <Toolbar.ToggleGroup type="multiple" className='flex items-center gap-2'>
          <div className="flex">
            <ToolbarToggleItem value='fontSize'>
              {chosenFontSize}px
              {/* <input
                type='number'
                value={chosenFontSize}
                onChange={e => setChosenFontSize(Number(e.target.value))}
                className='w-10 text-primary outline-none border-none appearance-none'
                onBlur={e => editor.chain().focus().setFontSize(e.target.value).run()}
                onKeyDown={e => e.key === 'Enter' && editor.chain().focus().setFontSize(e.currentTarget.value).run()}
              /> */}
              {/* Сделать сохранение выбраного текста и его выделение bg-accent */}
            </ToolbarToggleItem>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Toolbar.Button className='rounded-md hover:bg-accent'><ChevronDown /></Toolbar.Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="relative z-10 bg-background border rounded p-1">
                {fontSizes.map(size => (
                  <DropdownMenu.Item
                    onSelect={() => {editor.chain().focus().setFontSize(size + 'px').run(); setChosenFontSize(size)}}
                    className="px-2 py-1 rounded-md hover:bg-accent cursor-pointer"
                    key={size}
                  >
                    {size}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          
          <div className="flex">
            <ToolbarToggleItem
              value='highlighterColor'
              onClick={() => editor.chain().focus().setHighlight({ color: chosenHighlighterColor }).run()}
            >
              <Highlighter color={chosenHighlighterColor !== '#00000000' ? chosenHighlighterColor : undefined} />
            </ToolbarToggleItem>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Toolbar.Button className='rounded-md hover:bg-accent'><ChevronDown /></Toolbar.Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="relative z-10 bg-background border rounded p-1">
                {highlighterColors.map(color => (
                  <DropdownMenu.Item
                    onSelect={() => {editor.chain().focus().setHighlight({ color }).run(); setChosenHighlighterColor(color)}}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent cursor-pointer"
                    key={color}
                  >
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                    {color === '#00000000' ? 'none' : color}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          <div className="flex">
            <ToolbarToggleItem value='textColor' onClick={() => editor.chain().focus().setColor(chosenTextColor).run()}>
              <Type color={chosenTextColor} />
            </ToolbarToggleItem>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Toolbar.Button className='rounded-md hover:bg-accent'><ChevronDown /></Toolbar.Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="relative z-10 bg-background border rounded p-1">
                {textColors.map(color => (
                  <DropdownMenu.Item
                    onSelect={() => {editor.chain().focus().setColor(color).run(); setChosenTextColor(color)}}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent cursor-pointer"
                    key={color}
                  >
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                    {color}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </Toolbar.ToggleGroup>

        <Toolbar.Separator className='border-r' />

        <Toolbar.ToggleGroup type='single' className='flex items-center gap-2'>
          <ToolbarToggleItem value='left' onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft /></ToolbarToggleItem>
          <ToolbarToggleItem value='center' onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter /></ToolbarToggleItem>
          <ToolbarToggleItem value='right' onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight /></ToolbarToggleItem>
          <ToolbarToggleItem value='justify' onClick={() => editor.chain().focus().setTextAlign('justify').run()}><AlignJustify /></ToolbarToggleItem>
        </Toolbar.ToggleGroup>
        
        <Toolbar.Separator className='border-r' />

        <Toolbar.ToggleGroup type='single' className='flex items-center gap-2'>
          <ToolbarToggleItem value='bulletList' onClick={() => editor.chain().focus().toggleBulletList().run()}><ListIcon /></ToolbarToggleItem>
          <ToolbarToggleItem value='orderedList' onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrderedIcon /></ToolbarToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>

      <EditorContent
        editor={editor}
        className="
          grow p-3 overflow-y-auto *:outline-none
          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
        "
        onClick={handleEditorClick}
      />
    </div>
  )
}

const ToolbarToggleItem = ({onClick, value, children}: {onClick?: () => void, value: string, children: ReactNode}) => {
  return (
    <Toolbar.ToggleItem
      className='p-1 rounded-md hover:bg-accent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
      onClick={onClick}
      value={value}
    >
      {children}
    </Toolbar.ToggleItem>
  )
}

export default NoteEditor