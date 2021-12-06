import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Conteudo } from './styles'
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '~/assets/LOGO.png';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-amil válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Conteudo>
      <Link to="/"> <img src={logo} width="300px" alt="Code7" /> </Link>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={schema}

          onSubmit={async (values) => {
            const { email, password } = values;

            dispatch(signUpRequest(email, password));

          }
          }
        >
          {({
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form >

              <Field name="email" placeholder="Digite seu email" />
              {errors.email && touched.email ? (<div>{errors.email}</div>) : null}

              <Field name="password" placeholder="Digite sua senha" />
              {errors.password && touched.password ? (<div>{errors.password}</div>) : null}

              <button type="submit">{'Cadastrar'}</button>

            </Form>
          )}
        </Formik>
      </Conteudo>
    </Container>
  );
}