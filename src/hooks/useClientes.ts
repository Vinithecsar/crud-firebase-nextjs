import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/config";

export default function useClientes() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const { tabelaVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  //useEffect(obterTodos, []);

  // function obterTodos() {
  //   repo.obterTodos().then((clientes) => {
  //     setClientes(clientes);
  //     exibirTabela();
  //   });
  // }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario();
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente);
    //obterTodos();
    exibirTabela();
  }
  function novoCliente() {
    setCliente(Cliente.vazio());
    exibirFormulario();
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente);
    //obterTodos();
    exibirTabela();
  }

  onSnapshot(collection(db, "clientes"), (snapshot) => {
    const clientes: Cliente[] = [];
    snapshot.docs.map((doc) =>
      clientes.push(new Cliente(doc.data().nome, doc.data().idade, doc.id)),
    );
    setClientes(clientes);
  });

  // onSnapshot(queryPedidos, snapshot => {
  //   setArrayTodosPedidos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  // });

  return {
    tabelaVisivel,
    exibirTabela,
    cliente,
    clientes,
    salvarCliente,
    novoCliente,
    excluirCliente,
    selecionarCliente,
    //obterTodos,
  };
}
