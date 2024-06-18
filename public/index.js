/* eslint-disable */
const loginForm = document.querySelector('.form-login');

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

if (loginForm)
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
