import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfilefailure } from './actions';
import { signOut } from '../auth/actions'
/* funcao que requisita update do admin para o servidor */
export function* updateProfile({ payload }) {
  try {

    const  id  = payload.data[1];
    const {email,  ...rest } = payload.data[0];
    const profile = {
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `users/${id}`, profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar Perfil');
    yield put(updateProfilefailure());
  }
}

/* funcao que faz requisicao de deletar admin */
export function* profileDelete({ payload }) {

  try {

    const  id  = payload.id;

    yield call(api.delete, `users/${id}`);
    yield put(signOut());
    toast.success('Perfil deletado com sucesso!');

  } catch (error) {
    toast.error('Erro ao deletar Perfil');

  }
}

/* exporta as funcoes update e delete profile */
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/DELETE_PROFILE', profileDelete)
  ]);