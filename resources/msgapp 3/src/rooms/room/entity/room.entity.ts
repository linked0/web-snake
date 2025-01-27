import { Message } from '../../../__generated__/resolvers-types'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { User } from '../../../auth/user/entity/user.entity'

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => User)
    @JoinTable()
    @Column('jsonb', { nullable: false })
    users: User[]

    @Column('jsonb', { nullable: false })
    messages: Message[]
}