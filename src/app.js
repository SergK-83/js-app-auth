import {Question} from "./question";
import {createModal, isValid} from './utils';
import {authWithEmailAndPassword, getAuthForm} from "./auth";
import './style.css';

const form = document.getElementById('formQuestion');
const input = document.getElementById('questionInput');
const btnSubmit = document.getElementById('btnSubmit');
const btnModal = document.getElementById('btnModal');

window.addEventListener('load', Question.renderList);

btnModal.addEventListener('click', openModal);

input.addEventListener('input', () => {
  btnSubmit.disabled = !isValid(input.value);
});

form.addEventListener('submit', submitFormHandler);

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    btnSubmit.disabled = true;

    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      btnSubmit.disabled = false;
    });
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm());
  document
    .getElementById('formAuth')
    .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
  event.preventDefault();

  const btnSubmitModal = event.target.querySelector('#btnSubmitModal');
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  btnSubmitModal.disabled = true;

  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btnSubmitModal.disabled = false);
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Ошибка', content);
  } else {
    createModal('Список вопросов', Question.listToHtml(content));
  }
}
