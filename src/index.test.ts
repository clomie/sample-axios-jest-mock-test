import { AxiosAdapter } from 'axios'

jest.mock('./mock', () => jest.fn())

import mock from './mock'
const axiosMockAdapter = (mock as unknown) as jest.Mock<
  ReturnType<AxiosAdapter>,
  Parameters<AxiosAdapter>
>

import { createFoo } from './index'

describe('createFoo test', () => {
  beforeEach(() => {
    axiosMockAdapter.mockClear()
  })

  it('send form request and receive response', async () => {
    const request = {
      name: 'hogefuga'
    }
    const response = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: {
        id: 1,
        name: 'hogefuga'
      }
    }

    axiosMockAdapter.mockResolvedValueOnce(response)

    const result = await createFoo(request)
    const callArgs = axiosMockAdapter.mock.calls[0]

    expect(callArgs[0].url).toBe('https://api.example.com/v2/foo')
    expect(callArgs[0].headers).toHaveProperty(
      'Content-Type',
      'application/x-www-form-urlencoded'
    )
    expect(callArgs[0].data).toBe('name=hogefuga')

    expect(result).toStrictEqual({ id: 1, name: 'hogefuga' })
  })
})
