import { path } from 'ramda'
import app from '@/app'

export default (funding_source) => {
  const status = path(['status'], funding_source)
  let output = false
  if (status === undefined) {
    app.alert(
      'You do not have a primary bank account. Please add a primary bank account in the payment section of your account.',
      null,
      'No Primary Bank'
    )
  } else if (status !== 'verified') {
    app.alert(
      'Your primary bank account is unverified, please follow the verification instructions in the payment section of your account.',
      null,
      'Unverified Bank Account'
    )
  } else {
    output = true
  }
  return output
}
