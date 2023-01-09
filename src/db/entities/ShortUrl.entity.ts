import { Column, Entity, getRepository, PrimaryColumn, Repository } from 'typeorm'

@Entity()
export class ShortUrl {
    @PrimaryColumn({ length: '6', type: 'varchar' })
    shortCode!: string

    @Column({ type: 'text' })
    longUrl!: string

    @Column({ type: 'int', default: 0 })
    clicks: number = 0
}

export function getShortUrlRepo(): Repository<ShortUrl> {
  return getRepository(ShortUrl)
}