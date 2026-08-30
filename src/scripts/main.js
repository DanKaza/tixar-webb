document.querySelectorAll('.faq button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.querySelector('span').textContent = open ? '+' : '−';
    answer.hidden = open;
  });
});
