import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest, deleteProfile } from '~/store/modules/user/actions';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-amil válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string()
  .min(6, 'No mínimo 6 caracteres')
  .required('A senha é obrigatória'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function Profile() {
  /*seta cont profile com os dados armazenados do admim logado */
  const profile = useSelector(state => state.user.profile);
  /*seta useDispatch() que e uma funcao do redux*/
  const dispatch = useDispatch();

  /*deleta admin logado atraves do id*/
  function handleSubmitDelete() {
    dispatch(deleteProfile(profile.id));
  }
  /*Define token como null e faz logout */
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div>
        <Link to="/home">HOME</Link>
      </div>
      <Formik
        initialValues={{
          email: profile.email,
          oldPassword: '',
          password: '',
          confirmPassword: ''

        }}
        validationSchema={schema}
        /* funcao loga usuario */
        onSubmit={async (values ) => {

          dispatch(updateProfileRequest([values, profile.id]));
        }
        }
      >
        {({
          touched,
          errors,

        }) => (
          <Form >

            <Field name="email" placeholder="Digite seu email ou email a ser editado" />
            {errors.email && touched.email ? (<div>{errors.email}</div>) : null}

            <Field type="password" name="oldPassword" placeholder="Digite sua senha atual" />
            {errors.oldPassword && touched.oldPassword ? (<div>{errors.oldPassword}</div>) : null}

            <Field type="password" name="password" placeholder="Digite sua nova senha" />
            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}

            <Field type="password" name="confirmPassword" placeholder="Confirme sua nova senha" />
            {errors.confirmPassword && touched.confirmPassword ? (<div>{errors.confirmPassword}</div>) : null}

            <button type="submit">Atualizar perfil</button>
          </Form>
        )}
      </Formik>
      <button type="submit" onClick={handleSubmitDelete}>
        Deletar administrador
      </button>

      <button type="submit" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
}