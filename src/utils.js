export function isValid(value) {
  return value.length >= 10;
}

export function createModal(title, content) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const html = `
    <h3>${title}</h3>
    <div>${content}</div>
  `;

  modal.innerHTML = html;

  mui.overlay('on', modal);
}
