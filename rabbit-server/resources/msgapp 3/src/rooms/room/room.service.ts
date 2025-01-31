import { Repository } from "typeorm";
import { Room } from "./entity/room.entity";
import { User } from '../../auth/user/entity/user.entity'
import { Message } from '../../__generated__/resolvers-types'

export class RoomService {
    constructor(public roomRepository: Repository<Room>) {}

    async addMessageToRoom(roomId: number, message: Message) {
        const queryBuilder = this.roomRepository.createQueryBuilder()
        await queryBuilder.update(Room, { 
            messages: () => `messages || '${JSON.stringify(message)}'::jsonb` })
            .where("id = :id", { id: roomId })
            .execute()

        return await this.roomRepository.findOne(
            { where: { id: roomId }, relations: ['users'] }
        )
    }

    async createRoom(participants: Array<User>, message: Message ) {
        const room = this.roomRepository.create({
            users: participants,
            messages: [message]
        })

        return await this.roomRepository.save(room)
    }
}