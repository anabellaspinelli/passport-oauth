window.onload = () => {
  const checkboxes = Array.from(document.getElementsByTagName('input'));

  ['read', 'write'].forEach(right => {
    document.getElementById(right).addEventListener('click', e => {
      checkboxes.forEach(checkbox => {
        checkbox.checked = checkbox.name.includes(right);
      });
    });
  });

  document.getElementById('all').addEventListener('click', e => {
    checkboxes.forEach(checkbox => (checkbox.checked = true));
  });
};
