import React from 'react';
import type { Note } from '../services/api';
import { ArchiveBoxIcon, TrashIcon, ArrowUturnLeftIcon, PencilIcon, TagIcon } from '@heroicons/react/24/outline';

interface NoteCardProps {
    note: Note;
    onArchive: (note: Note) => void;
    onDelete: (id: number) => void;
    onEdit: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onArchive, onDelete, onEdit }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:ring-blue-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 whitespace-pre-wrap mb-4 line-clamp-4 flex-grow">{note.content}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {note.categories?.map(cat => (
                    <span key={cat.id} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1">
                        <TagIcon className="w-3 h-3" />
                        {cat.name}
                    </span>
                ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
                <button
                    onClick={() => onEdit(note)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onArchive(note)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                    title={note.isArchived ? "Unarchive" : "Archive"}
                >
                    {note.isArchived ? <ArrowUturnLeftIcon className="w-5 h-5" /> : <ArchiveBoxIcon className="w-5 h-5" />}
                </button>
                <button
                    onClick={() => onDelete(note.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="text-xs text-gray-300 mt-2 text-right">
                Last edited: {new Date(note.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
};
