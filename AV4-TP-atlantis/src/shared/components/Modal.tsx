interface ModalProps {
  aberto: boolean;
  titulo: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  aberto,
  titulo,
  onClose,
  children,
}: ModalProps) {
  if (!aberto) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        overflow-y-auto
        p-4
      "
    >
      <div
        className="
          min-h-screen
          flex justify-center
          items-start
          py-10
        "
      >
        <div
          className="
            w-full max-w-2xl
            rounded-2xl
            bg-white
            shadow-xl
            animate-[fadeIn_.2s_ease]
            max-h-[90vh]
            flex flex-col
          "
        >
          <div
            className="
              flex items-center justify-between
              px-6 py-4
              border-b border-slate-100
              flex-shrink-0
            "
          >
            <h2 className="text-lg font-semibold text-slate-800">
              {titulo}
            </h2>

            <button
              onClick={onClose}
              className="
                w-9 h-9 rounded-lg
                hover:bg-slate-100
                transition
              "
            >
              ✕
            </button>
          </div>

          <div
            className="
              p-6
              overflow-y-auto
              flex-1
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}