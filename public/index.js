/* eslint-disable */
const loginForm = document.querySelector('.form-login');

loginForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const res = await axios({
      method: 'post',
      url: '/api/v1/login',
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
