import { Router } from 'express'
import { createSpecificShortCode, getShortCodeDetails, createRandomShortCode } from '../controllers/shorturl.controller'

const route = Router()

route.get('/:code/stats', async(req, res) => {
  const shortCode = req.params.code
  // validate <= 6 char
  if (shortCode.length > 6) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid short Code, too long!',
    })
  }
  const savedShortCode = await getShortCodeDetails(shortCode)
  if (!savedShortCode) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid short code. Not found',
    })
  }

  return res.status(200).json({
    status: 'success',
    data: {...savedShortCode, shortUrl:process.env.HOST + '/' + savedShortCode.shortCode},
  })
})

route.post('/submit', async(req, res) => {
  const longUrl = req.body.url

  const savedShortCode = await createRandomShortCode(longUrl)

  return res.status(201).json({
    status: 'success',
    data: {...savedShortCode, shortUrl:process.env.HOST + '/' + savedShortCode.shortCode},
  })
})

route.put('/submit/:code', async(req, res) => {
  const shortCode = req.params.code
  const longUrl = req.body.url

  let savedShortCode

  try {
    savedShortCode = await createSpecificShortCode(shortCode, longUrl)
  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(201).json({
    status: 'success',
    data: savedShortCode,
  })
})

export default route