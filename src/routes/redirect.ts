import { Router } from 'express'
import { getShortCodeDetails } from '../controllers/shorturl.controller'
import { getShortUrlRepo } from '../db/entities/ShortUrl.entity'

const route = Router()

route.get('/:code', async(req, res) => {
  const shortCode = req.params.code

  const savedShortCode = await getShortCodeDetails(shortCode)
  if (!savedShortCode) {
    return res.send("<h1>URL Not Found</h1>")
  }
  savedShortCode.clicks++;

  await getShortUrlRepo().save(savedShortCode);

  return res.redirect(savedShortCode.longUrl)
})

export default route