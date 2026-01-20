import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Note } from '../../notes/entities/note.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Note, (note) => note.categories)
    notes: Note[];
}
