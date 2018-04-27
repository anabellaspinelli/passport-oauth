window.onload = () => {
  let userAlerted = false
  let buttons = Array.from(document.getElementsByTagName('button'))

  buttons.forEach(button => {
    button.addEventListener(
      'click',
      e => {
        let responseBlock = document.getElementById('response')

        if (!userAlerted && button.value.includes('POST')) {
          window.alert(
            'This will actually WRITE stuff into your account, handle with care. \n\nYou have been alerted... I mean warned! ;)'
          )
          userAlerted = true
        }

        responseBlock.textContent = ''

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
            responseBlock.textContent = JSON.stringify(
              body.typeformResponseBody,
              null,
              2
            )
          })
          // eslint-disable-next-line no-console
          .catch(e => console.error(e))
      },
      false
    )
  })
}
