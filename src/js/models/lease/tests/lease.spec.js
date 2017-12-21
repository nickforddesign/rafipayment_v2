import MockDate from 'mockdate'
import Lease from '@/models/lease'

describe('Lease periods', () => {
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
    MockDate.set('9/15/2017')
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

  it('should computed current period for fixed term leases', () => {
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
})
