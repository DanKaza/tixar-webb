const terminalText = document.querySelector('#terminal-text');
const terminalOutput = document.querySelector('#terminal-output');
const command = 'build something real';
const output = ['✓ memilih ide', '✓ menulis kode', '✓ merilis karya'];
let index = 0;

function typeCommand() {
  if (!terminalText) return;
  if (index < command.length) {
    terminalText.textContent += command[index++];
    window.setTimeout(typeCommand, 72);
    return;
  }
  output.forEach((line, lineIndex) => {
    window.setTimeout(() => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      terminalOutput?.append(paragraph);
    }, 420 + lineIndex * 440);
  });
}

document.querySelectorAll('.faq button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.querySelector('span').textContent = open ? '+' : '−';
    answer.hidden = open;
  });
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeCommand();
else if (terminalText) terminalText.textContent = command;
