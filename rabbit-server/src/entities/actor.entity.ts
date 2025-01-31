import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// https://mikro-orm.io/docs/defining-entities
@ObjectType()
@Entity()
export default class Actor {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => Int)
  @PrimaryKey()
  id!: number;
  
  @Field(() => String)
  @Property({type: 'date', default: 'NOW()'})
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', default: 'NOW()', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({type: 'text', unique: true})
  username!: string;
}