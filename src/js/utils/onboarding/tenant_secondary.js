export default function getSteps(user, leases) {
  let steps = []

  if (user.password === false) {
    steps.push({
      name: 'set-password',
      value: false
    })
  }

  leases.map(lease => {
    const me = lease.tenants.find(tenant => {
      return tenant.id === user.id
    })

    let lease_set = true
    let periods_to_set = []

    lease.periods.map(period => {
      const my_period = me.periods.find(my_period => {
        return my_period.id === period.id
      })

      if (!my_period) {
        lease_set = false
        periods_to_set.push({
          name: 'period',
          value: my_period,
          period,
          lease
        })
      }
    })

    if (!lease_set) {
      steps.push({
        name: 'show-lease',
        value: false,
        lease
      })
      steps = steps.concat(periods_to_set)
      steps.push({
        name: 'autopay',
        value: me.autopay,
        lease
      })
    }
  })

  return steps
}
