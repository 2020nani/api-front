import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Conteudo } from './styles'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/LOGO.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória').min(6, 'No mínimo 6 caracteres'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  return (
    <Container>

      <Conteudo>
        <img src={logo} width="300px" alt="Code7" />

        <Formik
          initialValues={{
            email: '',
            password: '',

          }}
          validationSchema={schema}
          /* funcao loga usuario */
          onSubmit={async (values, actions) => {
            const { email, password } = values;

            dispatch(signInRequest(email, password));
          }
          }
        >
          {({
            touched,
            errors,

          }) => (
            <Form >

              <Field name="email" placeholder="Digite seu email" />
              {errors.email && touched.email ? (<div>{errors.email}</div>) : null}

              <Field type="password" name="password" placeholder="Digite sua senha" />
              {errors.password && touched.password ? (<div>{errors.password}</div>) : null}


              <button type="submit">{loading ? 'Carregando..' : 'Acessar'}</button>
              <Link to="/cadastro">Criar conta gratuita</Link>


            </Form>
          )}
        </Formik>
      </Conteudo>
    </Container>
  );
}