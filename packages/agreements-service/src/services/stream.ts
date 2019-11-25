import got from 'got'
import { HttpPlugin } from '../utils/http-plugin'
import { createConnection } from 'ilp-protocol-stream'

const ILP_UPLINK_URL = process.env.ILP_UPLINK_URL || 'https://localhost:3001'

export type SPSPResponse = {
  destinationAccount: string;
  sharedSecret: string;
}

export const Pay = async (agreementId: string, amount: string, authToken: string, destinationAccount: string, sharedSecret: string): Promise<any> => {
  try {
    // Build the URL
    const URL = ILP_UPLINK_URL + `/agreements/${agreementId}/ilp`
    const plugin = new HttpPlugin(URL, authToken)
    const connection = await createConnection({
      plugin,
      destinationAccount,
      sharedSecret: Buffer.from(sharedSecret, 'base64')
    })

    const stream = connection.createStream()

    await stream.sendTotal(amount)
    await stream.end()
  } catch (e) {
    throw new Error('')
  }
}

export const queryPaymentPointer = async (paymentPointer: string): Promise<SPSPResponse> => {
  const endpoint = new URL(paymentPointer.startsWith('$')
    ? 'https://' + paymentPointer.substring(1)
    : paymentPointer)

  endpoint.pathname = endpoint.pathname === '/'
    ? '/.well-known/pay'
    : endpoint.pathname

  const response = await got(endpoint.href, {
    json: true,
    headers: {accept: 'application/spsp4+json, application/spsp+json'}
  })

  if (response.statusCode !== 200) {
    throw new Error('got error response from spsp payment pointer.' +
      ' endpoint="' + endpoint.href + '"' +
      ' status=' + response.statusCode +
      ' message="' + (await response.body.toString()) + '"')
  }

  const json = await response.body

  return {
    destinationAccount: json.destination_account,
    sharedSecret: json.shared_secret
  }
}