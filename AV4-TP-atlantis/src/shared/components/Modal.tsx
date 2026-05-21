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
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-xl
          rounded-2xl
          bg-white
          shadow-xl
          overflow-hidden
          animate-[fadeIn_.2s_ease]
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
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

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}