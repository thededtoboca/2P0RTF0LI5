const cardsContainer = document.querySelector('.cards');
const cards = document.querySelectorAll('.card:not(.confidential)');
const confidentialCard = document.querySelector('.confidential');

cards.forEach(card => {
  card.addEventListener('click', () => {
    collapseAllExcept(card);
    if (!card.classList.contains('expanded')) {
      expandCard(card);
    }
  });
});

function expandCard(card, file = null) {
  cardsContainer.classList.add('collapsed');
  card.classList.add('expanded');

  const fileToLoad = file || card.getAttribute('data-file');
  fetch(fileToLoad)
    .then(res => res.text())
    .then(html => {
      const content = document.createElement('div');
      content.classList.add('card-content');
      content.innerHTML = html;
      card.appendChild(content);
    });
}

function collapseAllExcept(activeCard) {
  cards.forEach(card => {
    if (card !== activeCard) {
      card.classList.remove('expanded');
      const oldContent = card.querySelector('.card-content');
      if (oldContent) oldContent.remove();
    }
  });
}
