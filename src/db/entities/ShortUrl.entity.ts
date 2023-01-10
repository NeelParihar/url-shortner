import { Column, Entity, getRepository, PrimaryColumn, Repository, CreateDateColumn,UpdateDateColumn } from 'typeorm'

@Entity()
export class ShortUrl {
    @PrimaryColumn({ length: '6', type: 'varchar' })
    shortCode!: string

    @Column({ type: 'text' })
    longUrl!: string

    @Column({ type: 'int', default: 0 })
    clicks: number = 0

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;
}

export function getShortUrlRepo(): Repository<ShortUrl> {
  return getRepository(ShortUrl)
}