export default function getSteps(user, leases) {
  const steps = []

  if (user.password === false) {
    steps.push({
      name: 'set-password',
      value: false
    })
  }

  leases.map(lease => {
    steps.push({
      name: 'show-lease',
      value: false,
      lease
    })

    const me = lease.tenants.find(tenant => {
      return tenant.id === user.id
    })

    lease.periods.map(period => {
      const my_period = me.periods.find(my_period => {
        return my_period.id === period.id
      })
      steps.push({
        name: 'period',
        value: my_period,
        period,
        lease
      })
    })

    steps.push({
      name: 'autopay',
      value: me.autopay,
      lease
    })
  })

  steps.push({
    name: 'dwolla',
    value: user.payment.primary_funding_source
  })

  return steps
}
