/* eslint-disable */
const loginForm = document.querySelector('.form-login');
const logoutBtn = document.querySelector('.logout');
const saveMealForm = document.querySelector('.save--meal__form');
const createRaportForm = document.querySelector('.create--raport-form');
const quickMenuItems = document.querySelector('.quick--menu-items');
const titleRaport = document.getElementById('title-raport');
const ingredientsRaport = document.getElementById('ingredients-raport');
const symptomsRaport = document.getElementById('symptoms-raport');
const dateRaport = document.getElementById('date-raport');
const sectionRaports = document.querySelector('.section-raports');
const chooseSymptomsBox = document.querySelector('.choose-symptoms-box');
const raportDateStart = document.getElementById('raport-date-start');
const raportDateEnd = document.getElementById('raport-date-end');

////////////////////////////////////////////////////////////
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

if (sectionRaports) {
  chooseSymptomsBox.addEventListener('click', async (e) => {
    try {
      const symptom = e.target.closest('.symptom-btn').dataset.symptom;
      const pooped = e.target.closest('.symptom-btn').dataset?.pooped;
      console.log(symptom);
      const url = `?${raportDateStart.value ? `date[gt]=${raportDateStart.value}&` : ''}${raportDateEnd.value ? `date[lt]=${raportDateEnd.value}&` : ''}${symptom ? `symptoms=${symptom}&` : ''}${pooped ? `pooped=${true}` : ''}`;
      console.log(url);

      location.assign(`myRaportsDetails${url}`);
    } catch (err) {
      if (err.message) showAlert('error', err.message);
      if (err.response) showAlert('error', err.response.data.message);
    }
  });
}

if (createRaportForm) {
  let meal;
  quickMenuItems.addEventListener('click', (e) => {
    meal = e.target.closest('.quick--menu-item');
    titleRaport.value = meal.querySelector('.menu--item-title').innerHTML;
    ingredientsRaport.value = meal.querySelector(
      '.menu--item-ingredinets',
    ).innerHTML;
  });

  createRaportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      if (!meal) throw new Error('Nie podano posiłku');
      const title = titleRaport.value;
      const ingredients = titleRaport.value;
      const symptoms = symptomsRaport.value;
      const date = dateRaport.value;
      const pooped = document.getElementById('pooped-checkbox').value;
      console.log(pooped);

      const res = await axios({
        method: 'post',
        url: '/api/v1/raports/createRaport',
        data: { title, ingredients, date, symptoms, pooped },
      });

      if (res.data.status === 'success') {
        showAlert('success', 'Dodano raport');
      }
    } catch (err) {
      if (err.message) showAlert('error', err.message);
      if (err.response) showAlert('error', err.response.data.message);
    }
  });
}

if (saveMealForm)
  saveMealForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const title = document.getElementById('title').value;
      const ingredients = document.getElementById('ingredients').value;
      const res = await axios({
        method: 'post',
        url: '/api/v1/meals/createMeal',
        data: { title, ingredients },
      });

      if (res.data.status === 'success') {
        showAlert('success', 'Dodano posiłek');
        location.assign('/');
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  });

if (logoutBtn)
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: '/api/v1/users/logout',
      });

      location.assign('/login');
    } catch (err) {
      console.log(err);
      showAlert('error', err.response.data.message);
    }
  });

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
