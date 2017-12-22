import MockDate from 'mockdate'
import Lease from '@/models/lease'

// month to month

describe('Lease periods - m2m', () => {
  it('should get current period for m2m leases when today is the first day of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }]
    })
    MockDate.set('9/1/2017')
    expect(lease.current_period)
      .toBe(0)
  })
  it('should get current period for m2m leases when today is in the middle of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }]
    })
    MockDate.set('9/15/2017')
    expect(lease.current_period)
      .toBe(0)
  })

  it('should get current period for m2m leases when today is the last day of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }]
    })
    MockDate.set('9/30/2017')
    expect(lease.current_period)
      .toBe(0)
  })

  it('should get current period for m2m leases when today is first day of last period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }]
    })
    MockDate.set('10/1/2017')
    expect(lease.current_period)
      .toBe(1)
  })

  it('should get current period for m2m leases when today is first day of last period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }]
    })
    MockDate.set('1/1/2018')
    expect(lease.current_period)
      .toBe(1)
  })
})

// fixed term

describe('Lease periods - fixed term', () => {
  it('should get current period for fixed term leases when today is the first day of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }],
      end_date: {
        $date: '2017-11-01T00:00:00Z'
      }
    })
    MockDate.set('9/1/2017')
    expect(lease.current_period)
      .toBe(0)
  })

  it('should get current period for fixed term leases when today is in the middle of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }],
      end_date: {
        $date: '2017-11-01T00:00:00Z'
      }
    })
    MockDate.set('9/16/2017')
    expect(lease.current_period)
      .toBe(0)
  })

  it('should get current period for fixed term leases when today is the last day of first period', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }],
      end_date: {
        $date: '2017-11-01T00:00:00Z'
      }
    })
    MockDate.set('9/30/2017')
    expect(lease.current_period)
      .toBe(0)
  })

  it('should get current period for fixed term leases when today is the end date of the lease', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }],
      end_date: {
        $date: '2017-11-01T00:00:00Z'
      }
    })
    MockDate.set('11/1/2017')
    expect(lease.current_period)
      .toBe(1)
  })

  it('should no current period when today is after end_date', () => {
    const lease = new Lease({
      periods: [{
        start_date: {
          $date: '2017-09-01T00:00:00Z'
        }
      }, {
        start_date: {
          $date: '2017-10-01T00:00:00Z'
        }
      }],
      end_date: {
        $date: '2017-11-01T00:00:00Z'
      }
    })
    MockDate.set('12/1/2017')
    expect(lease.current_period)
      .toBe(undefined)
  })
})
