interface BotaoProps {
  cor?: "green" | "blue" | "gray";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  const color = props.cor ?? "gray";
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md bg-gradient-to-r from-${color}-400 to-${color}-700 px-4 py-2 text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
}
