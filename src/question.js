export class Question {
  static create(question) {
    return fetch('https://js-questions-243af-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const $list = document.getElementById('questionsList');
    const html = questions.length ? questions.map(toCard).join(' ') : `<p>Нет записей</p>`;

    $list.innerHTML = html;
  }
}

function addToLocalStorage(question) {
  const questionsList = getQuestionsFromLocalStorage();

  questionsList.push(question);
  localStorage.setItem('questions', JSON.stringify(questionsList));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse( localStorage.getItem('questions') || '[]');
}

function toCard(question) {
  return 11;
}
