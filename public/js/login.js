window.onload = () => {
  let allChecks = Array.from(document.getElementsByTagName('input'));
  let readChecks = allChecks.filter(checkbox => checkbox.name.includes('read'));
  let writeChecks = allChecks.filter(checkbox =>
    checkbox.name.includes('write')
  );

  document.getElementById('all').addEventListener('click', e => {
    allChecks.forEach(checkbox => (checkbox.checked = true));
  });

  document.getElementById('read').addEventListener('click', e => {
    readChecks.forEach(checkbox => (checkbox.checked = true));
    writeChecks.forEach(checkbox => (checkbox.checked = false));
  });

  document.getElementById('write').addEventListener('click', e => {
    writeChecks.forEach(checkbox => (checkbox.checked = true));
    readChecks.forEach(checkbox => (checkbox.checked = false));
  });
};
