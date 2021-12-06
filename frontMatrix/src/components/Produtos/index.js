import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Container } from '../Produtos/styles';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditarProduto from '../EditarProduto/index';
import api from '../../services/api'

export default function Produtos() {
  const theadTable = ["codigo", "descriçao", "preco", "tipoEmbalagem", "quantidadeEmbalagem(Un)", "peso(kg)"];
  const [produtos, setProdutos] = useState([]);
  const [produtoEditar, setProdutoEditar] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function carregaProdutos() {
      const response = await api.get('produtos');
      setProdutos(response.data)
    }
    carregaProdutos();
  }, []);

  function editarProduto( produto ) {
    setProdutoEditar(produto)
    setEdit(true)
  }

  async function  excluirProduto( codigo ) {
    try{
    await api.delete(`produto/${codigo}`)
    toast.success("Deletado com sucesso")
    }catch(error) {
      toast.error("Erro ao deletar produto")
    }
    window.location.reload(true);
  }

  return (
    <Container>
      {edit == false ?
      <div>
      <div style={{ textAlign: "center" }}><h1>Produtos Cadastrados</h1></div>
      <Table responsive>
        <thead>
          <tr>
            {theadTable.map((campo, index) => (
              <th key={index}>{campo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr>
              <td key="1">{produto.codigo}</td>
              <td key="2">{produto.descricao}</td>
              <td key="3"> {produto.preco}</td>
              <td key="4"> {produto.tipoEmbalagem === "1" ? "Unidade" :
                produto.tipoEmbalagem === "2" ? "Pack" :
                produto.tipoEmbalagem === "3" ? "Caixa" :
                toast.error(`Produto com o codigo ${produto.codigo} nao possui tipo de Embalagem!!!`)}</td>
              <td key="5"> {produto.quantidadeEmbalagem}</td>
              <td key="6"> {produto.peso}</td>
              <td key="7"> <button onClick={() => editarProduto(produto)}><FaEdit/></button> </td>
              <td key="8"> <button onClick={() => excluirProduto(produto.codigo)}><FaTrashAlt /></button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      : <EditarProduto produto={produtoEditar} /> }
    </Container>

  );

}