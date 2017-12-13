export default function getSteps(user, leases) {
  const steps = []

  if (user.password === false) {
    steps.push({
      name: 'set-password',
      value: false
    })
  }

  return steps
}
