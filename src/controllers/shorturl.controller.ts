import { getShortUrlRepo, ShortUrl } from '../db/entities/ShortUrl.entity'
var { customAlphabet } =  require('nanoid')

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

export async function getShortCodeDetails(shortCode: string): Promise<ShortUrl | undefined> {
    const savedEntity = await getShortUrlRepo().findOne(shortCode, { select: ['shortCode', 'longUrl', 'clicks', 'createdAt', 'updatedAt'] })
    return savedEntity
}

export async function createRandomShortCode(longUrl: string): Promise<ShortUrl> {

  const randomShortCode = nanoid()

  // if the shortcode exists
  if (await getShortCodeDetails(randomShortCode)) {
    return await createRandomShortCode(longUrl)
  }

  return await createSpecificShortCode(randomShortCode, longUrl)
}

export async function createSpecificShortCode(shortCode: string, longUrl: string): Promise<ShortUrl> {
  const newEntity = new ShortUrl()

  // check if shortCode is less than 4 chars in length
  if (shortCode.length < 4) {
    throw new Error('ShortCode is too short')
  }

  newEntity.shortCode = shortCode
  newEntity.longUrl = longUrl

  if(await getShortCodeDetails(shortCode)){
    throw new Error('ShortCode is already in use')
  }

  const savedEntity = await getShortUrlRepo().save(newEntity)
  return savedEntity
}