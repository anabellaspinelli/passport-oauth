window.onload = () => {
  const allCheckboxes = Array.from(document.getElementsByTagName('input'));
  let categorizedCheckboxes = {};

  ['read', 'write', 'all'].forEach(right => {
    //categorize checkboxes
    if (right !== 'all') {
      categorizedCheckboxes[right] = allCheckboxes.filter(checkbox =>
        checkbox.name.includes(right)
      );
    }

    //add event listeners to group buttons
    document.getElementById(right).addEventListener('click', e => {
      if (right === 'all') {
        return allCheckboxes.forEach(checkbox => (checkbox.checked = true));
      }

      categorizedCheckboxes[right].forEach(
        checkbox => (checkbox.checked = true)
      );

      const otherRight = Object.keys(categorizedCheckboxes).filter(
        key => key !== right
      );

      categorizedCheckboxes[otherRight].forEach(
        checkbox => (checkbox.checked = false)
      );
    });
  });
};
