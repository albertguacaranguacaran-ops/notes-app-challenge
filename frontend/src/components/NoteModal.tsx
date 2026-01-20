import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Note, Category } from '../services/api';
import { PlusIcon } from '@heroicons/react/24/outline';

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

    // New category state
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

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

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const newCat = await api.createCategory(newCategoryName);
            // We assume parent component will refresh categories or we can just add it locally
            // But since we can't update parent state easily from here without callback, 
            // and we passed allCategories as prop, we depend on parent.
            // Ideally onSave should handle creating, but let's keep it simple:
            // We'll just verify current flow. To make it smooth, maybe we need a callback for onCategoryCreate
            // For now, let's just alert strictly or better: add to selected locally and hope parent refreshes on next fetch
            // Actually, let's trigger a collection refresh via a prop if possible, but simplest is just:
            // User adds category -> We call API -> We toggle it as selected (using the returned ID) -> We rely on parent to update the list later?
            // No, we need it in the list now. 
            // Let's just create it and force select it, but it won't show in the list unless we add it to allCategories?
            // I'll skip implementing 'Create Category inside Modal' for now unless simple.
            // I'll stick to 'Select existing'.
            // Wait, requirement: "As a user, I want to be able to add/remove categories to notes."
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">
                        {noteToEdit ? 'Edit Note' : 'Create Note'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter note title..."
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                            placeholder="Start typing..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${selectedCategories.find(c => c.id === cat.id)
                                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        {allCategories.length === 0 && (
                            <p className="text-xs text-gray-400 italic">No categories available. Create one in the sidebar.</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                        >
                            {noteToEdit ? 'Save Changes' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
