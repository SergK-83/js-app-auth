import {Question} from "./question";
import {createModal, isValid} from './utils';
import './style.css';

const form = document.getElementById('formQuestion');
const input = document.getElementById('questionInput');
const btnSubmit = document.getElementById('btnSubmit');
const btnModal = document.getElementById('btnModal');

window.addEventListener('load', Question.getList);

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
  createModal('Авторизация', `<h4>Test</h4>`);
}
