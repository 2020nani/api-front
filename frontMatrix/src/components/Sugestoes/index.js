import React from 'react';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { Container, Conteudo } from './styles'


const schema = Yup.object().shape({
  emal: Yup.string()
    .email("Digite email valido")
    .required("Email e um campo requerido"),
  sugestao: Yup.string()
    .min(20, "Descrição deve conter no minimo 20 caracteres")
    .max(4000, "Descrição deve conter no maximo 400 caracteres")
    .required("Descrição e um campo requerido")
});

export default function Sugestoes(props) {

  const { setRoute } = props

  return (

    <Container>
      <Conteudo>
        <h1>Informe seus dados e nos envie sua sugestao</h1>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sugestao">
            <Form.Label>Sugestao</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
        <button onClick={() => setRoute("home")}></button>
      </Conteudo>
    </Container>
  );

}