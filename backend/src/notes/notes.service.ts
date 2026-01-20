import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) { }

  create(createNoteDto: CreateNoteDto) {
    // Cascade is enabled in entity, so passing categories object should work
    const note = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(note);
  }

  findAll(isArchived?: boolean, categoryId?: number) {
    const where: any = {};
    if (isArchived !== undefined) {
      where.isArchived = isArchived;
    }
    if (categoryId !== undefined) {
      where.categories = { id: categoryId };
    }

    return this.notesRepository.find({
      where,
      relations: ['categories'],
      order: { updatedAt: 'DESC' }
    });
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['categories']
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    // We need to preload to handle partial updates correctly with relations if needed
    // But repository.save with id works for full update of relations if cascade.
    // However, for partial update, it's safer to fetch first.

    // Actually, to update many-to-many, we usually need to save the entity with the new list of categories.
    const note = await this.notesRepository.preload({
      id: id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    return this.notesRepository.remove(note);
  }
}
