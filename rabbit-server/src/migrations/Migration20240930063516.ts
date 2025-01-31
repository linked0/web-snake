import { Migration } from '@mikro-orm/migrations';

export class Migration20240930063516 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "actor" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "username" text not null);');
    this.addSql('alter table "actor" add constraint "actor_username_unique" unique ("username");');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'2024-09-30 06:30:21.070422+00\', "updated_at" timestamptz(0) not null default \'2024-09-30 06:30:21.070422+00\', "username" text not null default null, "password" text not null default null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('drop table if exists "actor" cascade;');
  }

}
