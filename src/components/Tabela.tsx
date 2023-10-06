import Cliente from "@/core/Cliente";
import { IconeEdicao, IconeLixo } from "./Icones";

interface TabelaProps {
  clientes: Cliente[];
  clienteSelecionado?: (cliente: Cliente) => void;
  clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.clienteSelecionado || props.clienteExcluido;

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="p-4 text-left">Código</th>
        <th className="p-4 text-left">Nome</th>
        <th className="p-4 text-left">Idade</th>
        {exibirAcoes ? <th className="p-4">Ações</th> : false}
      </tr>
    );
  }

  function renderizarDados() {
    return props.clientes?.map((cliente, i) => {
      return (
        <tr
          key={cliente.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="p-4 text-left">{cliente.id}</td>
          <td className="p-4 text-left">{cliente.nome}</td>
          <td className="p-4 text-left">{cliente.idade}</td>
          {exibirAcoes ? renderizarAcoes(cliente) : false}
        </tr>
      );
    });
  }

  function renderizarAcoes(cliente: Cliente) {
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado ? (
          <button
            onClick={() => props.clienteSelecionado?.(cliente)}
            className="m-1 flex items-center justify-center rounded-full p-2 text-green-600 hover:bg-purple-50"
          >
            {IconeEdicao}
          </button>
        ) : (
          false
        )}
        {props.clienteExcluido ? (
          <button
            onClick={() => props.clienteExcluido?.(cliente)}
            className="m-1 flex items-center justify-center rounded-full p-2 text-red-500 hover:bg-purple-50"
          >
            {IconeLixo}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full overflow-hidden rounded-xl">
      <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-gray-100">
        {renderizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
