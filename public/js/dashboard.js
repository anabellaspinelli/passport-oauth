window.onload = () => {
  let buttons = Array.from(document.getElementsByTagName('button'));

  buttons.forEach(button => {
    button.addEventListener(
      'click',
      e => {
        fetch(`/typeform/${e.target.className}`, {
          method: e.target.value,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
          .then(res => res.json())
          .then(body => {
            let responseBlock = document.getElementById('response');

            responseBlock.textContent = JSON.stringify(
              body.typeformResponseBody,
              null,
              2
            );
          })
          // eslint-disable-next-line no-console
          .catch(e => console.error(e));
      },
      false
    );
  });
};
