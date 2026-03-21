import { X } from 'lucide-react'
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Button } from './ui/Button'

interface WithModalProps extends React.HTMLAttributes<HTMLElement> {
  onCloseModal?: () => void
}

interface ModalContextType {
  opens: (val: string) => void
  close: () => void
  openWindowName: string
}

export const ModalContext = createContext<ModalContextType>({
  opens: () => {},
  openWindowName: '',
  close: () => {},
})

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = useState<string>('')
  function close() {
    setOpenName('')
  }
  const opens = setOpenName
  return (
    <ModalContext.Provider value={{ openWindowName: openName, close, opens }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<React.HtmlHTMLAttributes<HTMLElement>>
  opens: string
}) {
  const { opens } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => opens(opensWindowName) })
}

const Window = ({
  children,
  name,
}: {
  children: React.ReactElement<WithModalProps>
  name: string
}) => {
  const { openWindowName, close } = useContext(ModalContext)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (document.querySelector('[data-base-ui-focusable]')) {
        return
      }

      if (ref.current && !ref.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('click', handleClick, true)

    return () => {
      return document.removeEventListener('click', handleClick, true)
    }
  }, [close])

  if (name !== openWindowName) {
    return
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-svh z-50 backdrop-blur-md bg-primary/5 transition-all">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 rounded-2xl max-w-[min(95%,550px)] w-full"
      >
        <div className="relative">
          <Button
            className={'absolute right-12 top-3 z-40 bg-red-700/80'}
            onClick={close}
          >
            <X />
          </Button>
          <>{cloneElement(children, { onCloseModal: close })}</>
        </div>
      </div>
    </div>,

    document.body,
  )
}

Modal.Open = Open
Modal.Window = Window
