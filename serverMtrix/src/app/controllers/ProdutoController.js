import * as Yup from 'yup';
import Produto from '../models/Produto';


class ProdutoController {

  /**
   * Cadastra produto 
   */
  async store(req, res) {

    const schema = Yup.object().shape({
      codigo: Yup.number()
        .required(),
      descricao: Yup.string()
        .max(400)
        .required(),
      preco: Yup.number()
        .positive()
        .required(),
      tipoEmbalagem: Yup.string()
        .required(),
      quantidadeEmbalagem: Yup.number()
        .positive()
        .required(),
      peso: Yup.number()
        .positive()
        .required()

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }

    const { codigo, descricao, preco, tipoEmbalagem, quantidadeEmbalagem, peso } = req.body;

    const produtoExiste = await Produto.findOne({
      where: { codigo: codigo }
    })

    if (produtoExiste) {
      return res.status(400).json({ error: 'Ja existe produto cadastrado com o codigo ' + codigo.toString() });
    }

    if (tipoEmbalagem == "1" && quantidadeEmbalagem > 1) {
      return res.status(400).json({ error: 'So e permitido 1 embalagem para este tipo de embalagem' });
    }

    if (tipoEmbalagem != "1" && quantidadeEmbalagem <= 1) {
      return res.status(400).json({
        error: 'Para este tipo de embalagem a quantidade de embalagem deve ser maior que 1'
      });
    }

    await Produto.create(req.body);

    return res.json({
      codigo
    });
  }

  /**
  * Atualiza produto conforme o codigo passado na requisicao
  * @param {* id do usuario} req
  */
  async update(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string()
        .max(400),
      preco: Yup.number()
        .positive(),
      tipoEmbalagem: Yup.number()
        .positive(),
      quantidadeEmbalagem: Yup.number()
        .positive(),
      peso: Yup.number()
        .positive()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao falhou' });
    }

    const { tipoEmbalagem, quantidadeEmbalagem } = req.body;

    const produto = await Produto.findOne({
      where: { codigo: req.params.codigo }
    })

    const tipoEmbalagemAtual = produto.dataValues.tipoEmbalagem;
    const quantidadeEmbalagemAtual = produto.dataValues.quantidadeEmbalagem;


    if (tipoEmbalagem && quantidadeEmbalagem) {
      if (tipoEmbalagem == "1" && quantidadeEmbalagem > 1) {
        return res.status(400).json({ error: 'So e permitido 1 embalagem para este tipo de embalagem' });
      } else if (tipoEmbalagem != "1" && quantidadeEmbalagem <= 1) {
        return res.status(400).json({ error: 'Para este tipo de embalagem a quantidade de embalagem deve ser maior que 1' });
      }
    }
    if (!tipoEmbalagem && quantidadeEmbalagem) {
      if (quantidadeEmbalagem > 1 && tipoEmbalagemAtual == "1") {
        return res.status(400).json({ error: 'So e permitido 1 embalagem para o tipo de embalagem cadastrada' });
      }
      if (quantidadeEmbalagem == 1 && tipoEmbalagemAtual != "1") {
        return res.status(400).json({ error: 'Para o tipo de embalagem cadastrado a quantidade de embalagem deve ser maior que 1' });
      }
    }
    if (tipoEmbalagem && !quantidadeEmbalagem) {
      if (tipoEmbalagem == "1" && quantidadeEmbalagemAtual > 1) {
        return res.status(400).json({ error: 'A quantidade de embalagem cadastrada nao suporta este tipo de embalagem' });
      }
      if (tipoEmbalagem != "1" && quantidadeEmbalagemAtual <= 1) {
        return res.status(400).json({ error: 'A quantidade de embalagem cadastrada nao suporta este tipo de embalagem' });
      }
    }


    const {codigo } = await produto.update(req.body);

    return res.json({ codigo });
  }

  /**
   * Lista usuario unico conforme o id passado na requisicao
   * @param {* codigo do produto} req
   */
  async listaProdutoPorId(req, res) {

    const produto = await Produto.findOne({
      where: { codigo: req.params.codigo }
    })

    return res.json({
      produto
    })
  }

  /**
   * Lista todos os produtos cadastrados
   */
  async listaProdutos(req, res) {

    const produtos = await Produto.findAll({
      attributes: ['codigo', 'descricao', 'preco', 'tipoEmbalagem', 'quantidadeEmbalagem', 'peso'],
    })

    return res.json(produtos)
  }

  /**
   * Deleta produto unico conforme o id passado na requisicao
   * @param {* id do usuario} req
   */
  async deleteProduto(req, res) {
    let message = {
      mensagem: "Deletado com sucesso"
    }
    const produto = await Produto.findOne({
      where: { codigo: req.params.codigo }
    })

    await produto.destroy(req.body);
    res.json({ message })
  }

}

export default new ProdutoController();