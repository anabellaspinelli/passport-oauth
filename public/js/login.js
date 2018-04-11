window.onload = () => {
  setupGroupScopesButton(document.getElementById('read'));
  setupGroupScopesButton(document.getElementById('write'));
  setupGroupScopesButton(document.getElementById('all'));
  setupGroupScopesButton(document.getElementById('clear'));
};

const setupGroupScopesButton = (() => {
  const checkboxes = Array.from(document.getElementsByTagName('input'));

  function setupGroupScopesButton(button) {
    button.addEventListener('click', e => {
      checkboxes.forEach(checkbox => {
        if (button.id === 'all') return (checkbox.checked = true);
        if (button.id === 'clear') return (checkbox.checked = false);

        return (checkbox.checked = checkbox.name.includes(button.id));
      });
    });
  }

  return setupGroupScopesButton;
})();
