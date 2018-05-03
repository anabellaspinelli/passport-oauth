window.onload = () => {
  setupGroupScopesButton(document.getElementById('read'))
  setupGroupScopesButton(document.getElementById('write'))
  setupGroupScopesButton(document.getElementById('all'))
  setupGroupScopesButton(document.getElementById('clear'))
  setupWebhooksDependencies(document.querySelector('[name="webhooks:read"]'))
  setupWebhooksDependencies(document.querySelector('[name="webhooks:write"]'))
  enableCheck(document.querySelector('[name="accounts:read"]'))
}

const setupGroupScopesButton = (() => {
  const checkboxes = Array.from(document.getElementsByTagName('input'))

  function setupGroupScopesButton (button) {
    button.addEventListener('click', e => {
      checkboxes.forEach(checkbox => {
        if (button.id === 'all') return (checkbox.checked = true)
        if (button.id === 'clear') return (checkbox.checked = false)

        checkbox.checked = checkbox.name.includes(button.id)
      })
      enableCheck(document.querySelector('[name="accounts:read"]'))
    })
  }

  return setupGroupScopesButton
})()

const setupWebhooksDependencies = checkbox => {
  const SCOPE_DEPENDENCIES = {
    read: ['webhooks:write', 'forms:write'],
    write: ['forms:read']
  }

  checkbox.addEventListener('click', e => {
    const currentDependency = Object.keys(SCOPE_DEPENDENCIES).find(dependency =>
      checkbox.name.includes(dependency)
    )

    if (checkbox.checked) {
      // don't change other checkboxes if you're just disabling one
      SCOPE_DEPENDENCIES[currentDependency].forEach(
        scope => (document.querySelector([`[name="${scope}"]`]).checked = true)
      )
    }
  })
}

const enableCheck = checkbox => {
  checkbox.checked = true
}
