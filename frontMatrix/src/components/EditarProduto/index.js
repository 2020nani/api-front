import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Conteudo } from './styles'
import { Field, Form, Formik } from 'formik';
import api from '../../services/api';
import history from '../../services/history';


const schema = Yup.object().shape({
  descricao: Yup.string()
    .min(10, "Descrição deve conter no minimo 10 caracteres")
    .max(400, "Descrição deve conter no maximo 400 caracteres")
    .required("Descrição e um campo requerido"),
  preco: Yup.number()
    .positive("Somente numero positivo")
    .required("Preco e um campo requerido"),
  tipoEmbalagem: Yup.string()
    .equals(["1", "2", "3"], "Valores do enum vao de 1 a 3")
    .required("tipo da embalegem e um campo requerido"),
  quantidadeEmbalagem: Yup.number()
    .positive("Apenas numeros acima de 0")
    .required("quantia da Embalagem e um campo requerido"),
  peso: Yup.number()
    .positive("Apenas numeros acima de 0")
    .required("Peso e um campo requerido"),
});

export default function EditarProduto(props) {
  const {produto} = props;
  return (

    <Container>
      <Conteudo>
        <h1>Editar Produto</h1>
        <Formik
          initialValues={{
            descricao: produto.descricao,
            preco: produto.preco,
            tipoEmbalagem: produto.tipoEmbalagem,
            quantidadeEmbalagem: produto.quantidadeEmbalagem,
            peso: produto.peso
          }}
          validationSchema={schema}
          
          onSubmit={async (values) => {
         
            try{
              await api.put(`produto/${produto.codigo}`, values);
              toast.success("Produto atualizado com sucesso");
              history.push("/")
            }catch(error) {
              toast.error("Favor verificar os dados passados no cadastro")
            }
             
          }
          }
        >
          {({
            touched,
            errors,

          }) => (
            <Form >

              <Field name="descricao" placeholder="Digite a descricao do produto" />
              {errors.descricao && touched.descricao ? (<div>{errors.descricao}</div>) : null}

              <Field name="preco" placeholder="Digite o preco do produto" />
              {errors.preco && touched.preco ? (<div>{errors.preco}</div>) : null}

              <Field name="tipoEmbalagem" placeholder="Digite o tipo deste produto" />
              {errors.tipoEmbalagem && touched.tipoEmbalagem ? (<div>{errors.tipoEmbalagem}</div>) : null}

              <Field name="quantidadeEmbalagem" placeholder="Digite a quantia do produto" />
              {errors.quantidadeEmbalagem && touched.quantidadeEmbalagem ? (<div>{errors.quantidadeEmbalagem}</div>) : null}

              <Field name="peso" placeholder="Digite o peso do produto" />
              {errors.peso && touched.peso ? (<div>{errors.peso}</div>) : null}


              <button type="submit">Atualizar Produto</button>

            </Form>
          )}
        </Formik>
      </Conteudo>
    </Container>
  );

}