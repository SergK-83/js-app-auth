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
      .then(Question.renderList);
  }

  static listToHtml(questions) {
    return questions.length
      ? `<ol>${questions.map(q => {
        return `<li>
          <div>
            ${q.text}
          </div>
          <div class="mui--text-dark-secondary" style="font-size: 12px">
            ${new Date(q.date).toLocaleDateString('ru')}
            ${new Date(q.date).toLocaleTimeString('ru', {timeStyle: 'short'})}
          </div>
          <hr>
        </li>`
      }).join('')}</ol>`
      : `<p>Нет записей</p>`;
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">У вас нет токена</p>`);
    }
    return fetch(`https://js-questions-243af-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }

        return response
          ? Object.keys(response).map(key => ({...response[key], id: key}))
          : [];
      });
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const $list = document.getElementById('questionsList');
    const html = questions.length ? questions.map(toCard).join(' ') : `<p>Нет записей</p>`;

    $list.innerHTML = html;
  }
}

function initListLocalStorage(questionList) {
  let questionsListForLocalStorage = [];

  for (let key in questionList) {
    if (questionList.hasOwnProperty(key)) {
      let question = questionList[key];
      question.id = key;
      questionsListForLocalStorage.push(question);
    }
  }

  localStorage.setItem('questions', JSON.stringify(questionsListForLocalStorage));
}

function addToLocalStorage(question) {
  const questionsList = getQuestionsFromLocalStorage();

  questionsList.push(question);
  localStorage.setItem('questions', JSON.stringify(questionsList));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
  return `
    <div class="mui--text-dark-secondary" style="font-size: 12px">
      ${new Date(question.date).toLocaleDateString('ru')}
      ${new Date(question.date).toLocaleTimeString('ru', {timeStyle: 'short'})}
    </div>
    <div>
      ${question.text}
    </div>
    <br>
  `;
}
