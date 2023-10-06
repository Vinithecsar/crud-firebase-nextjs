import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    },
  };

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await updateDoc(
        doc(db, "clientes", cliente.id).withConverter(this.#conversor),
        { nome: cliente.nome, idade: cliente.idade },
      );
      return cliente;
    } else {
      const docRef = await addDoc(collection(db, "clientes"), {
        nome: cliente.nome,
        idade: cliente.idade,
      });
      const doc = await getDoc(docRef);
      const data = doc.data();
      return new Cliente(data?.nome, data?.idade, data?.id);
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    await deleteDoc(
      doc(db, "clientes", cliente.id).withConverter(this.#conversor),
    );
  }

  async obterTodos(): Promise<Cliente[]> {
    const querySnapshot = await getDocs(this.#colecao());
    const clientes: Cliente[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clientes.push(new Cliente(data.nome, data.idade, doc.id));
    });
    return clientes;
  }

  #colecao() {
    return collection(db, "clientes").withConverter(this.#conversor);
  }
}
