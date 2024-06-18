/* eslint-disable */
import { showAlert } from './alerts';
const loginForm = document.querySelector('.form-login');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await axios({
      method: 'post',
      url: '/api/v1/users/login',
      data: { email, password },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Zalogowano pomyślnie');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
});
