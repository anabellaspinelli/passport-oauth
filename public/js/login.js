window.onload = () => {
  setupGroupScopesButton(document.getElementById('read'))
  setupGroupScopesButton(document.getElementById('write'))
  setupGroupScopesButton(document.getElementById('all'))
  setupGroupScopesButton(document.getElementById('clear'))
  setupWebhooksDependencies(document.querySelector('[name="webhooks:read"]'))
  setupWebhooksDependencies(document.querySelector('[name="webhooks:write"]'))
}

const setupGroupScopesButton = (() => {
  const checkboxes = Array.from(document.getElementsByTagName('input'))

  function setupGroupScopesButton (button) {
    button.addEventListener('click', e => {
      checkboxes.forEach(checkbox => {
        if (button.id === 'all') return (checkbox.checked = true)
        if (button.id === 'clear') return (checkbox.checked = false)

        return (checkbox.checked = checkbox.name.includes(button.id))
      })
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

    SCOPE_DEPENDENCIES[currentDependency].forEach(
      scope => (document.querySelector([`[name="${scope}"]`]).checked = true)
    )
  })
}
