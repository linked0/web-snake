import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, MinLength } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column({ nullable: false })
    @IsEmail()
    email: string

    @Column()
    @MinLength(6)
    password: string
}
