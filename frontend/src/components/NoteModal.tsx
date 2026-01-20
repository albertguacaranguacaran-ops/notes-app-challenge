import React, { useState, useEffect } from 'react';
import type { Note, Category } from '../services/api';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, content: string, categories: Category[]) => void;
    noteToEdit?: Note;
    allCategories: Category[];
}

export const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave, noteToEdit, allCategories }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setSelectedCategories(noteToEdit.categories || []);
        } else {
            setTitle('');
            setContent('');
            setSelectedCategories([]);
        }
    }, [noteToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(title, content, selectedCategories);
        onClose();
    };

    const toggleCategory = (category: Category) => {
        if (selectedCategories.find(c => c.id === category.id)) {
            setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col ring-1 ring-gray-900/5">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {noteToEdit ? 'Edit Note' : 'Create Note'}
                    </h2>
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="sr-only">Close</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                            placeholder="e.g., Project Ideas"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-400"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex justify-between items-center">
                            <span>Categories</span>
                            {allCategories.length === 0 && <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded-full">No categories created yet</span>}
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                            {allCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategories.find(c => c.id === cat.id)
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                        >
                            {noteToEdit ? 'Save Changes' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
