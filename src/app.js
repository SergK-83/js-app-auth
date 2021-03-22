import {Question} from "./question";
import {isValid} from './utils';
import './style.css';

const form = document.getElementById('formQuestion');
const input = document.getElementById('questionInput');
const btnSubmit = document.getElementById('btnSubmit');

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

    console.log('Question', question);

    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      btnSubmit.disabled = false;
    });
  }
}
