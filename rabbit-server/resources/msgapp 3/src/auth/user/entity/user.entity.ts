import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: false })
    email: string

    @Column()
    password: string
}