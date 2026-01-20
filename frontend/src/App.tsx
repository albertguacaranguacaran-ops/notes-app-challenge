import { useState, useEffect } from 'react';
import { api, Note, Category } from './services/api';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import { PlusIcon, ArchiveBoxIcon, DocumentTextIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isArchivedView, setIsArchivedView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  const fetchNotes = async () => {
    try {
      const data = await api.getNotes(isArchivedView, selectedCategory);
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [isArchivedView, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (title: string, content: string, noteCategories: Category[]) => {
    try {
      // Map full category objects to Partial<Category> as expected by API
      const catsForApi = noteCategories.map(c => ({ id: c.id }));

      if (editingNote) {
        await api.updateNote(editingNote.id, { title, content, categories: catsForApi });
      } else {
        await api.createNote(title, content, catsForApi);
      }
      fetchNotes();
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  const handleArchive = async (note: Note) => {
    try {
      await api.updateNote(note.id, { isArchived: !note.isArchived });
      fetchNotes();
    } catch (error) {
      console.error('Failed to archive note', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Failed to delete note', error);
      }
    }
  };

  const handleCreateCategory = async () => {
    const name = prompt("Enter category name:");
    if (name) {
      await api.createCategory(name);
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this category?')) {
      await api.deleteCategory(id);
      if (selectedCategory === id) setSelectedCategory(undefined);
      fetchCategories();
      fetchNotes();
    }
  }

  const openValidModal = (note?: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col overflow-y-auto z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Notes
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-6">
          <div className="space-y-2">
            <button
              onClick={() => { setIsArchivedView(false); setSelectedCategory(undefined); }}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                !isArchivedView && !selectedCategory ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <DocumentTextIcon className="w-5 h-5" />
              My Notes
            </button>

            <button
              onClick={() => { setIsArchivedView(true); setSelectedCategory(undefined); }}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isArchivedView ? "bg-amber-50 text-amber-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <ArchiveBoxIcon className="w-5 h-5" />
              Archived
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center px-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</h3>
              <button onClick={handleCreateCategory} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setIsArchivedView(false); }}
                  className={clsx(
                    "w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-all text-sm group",
                    selectedCategory === cat.id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-4 h-4 opacity-70" />
                    <span className="truncate max-w-[120px]">{cat.name}</span>
                  </div>
                  <div
                    onClick={(e) => handleDeleteCategory(cat.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {isArchivedView ? 'Archived Notes' : (selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'My Notes')}
              {selectedCategory && (
                <span className="text-sm font-normal bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                  Category Filter
                </span>
              )}
            </h2>
            <p className="text-gray-500 mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} found
            </p>
          </div>

          {!isArchivedView && (
            <button
              onClick={() => openValidModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              New Note
            </button>
          )}
        </header>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              {isArchivedView ? <ArchiveBoxIcon className="w-8 h-8" /> : <DocumentTextIcon className="w-8 h-8" />}
            </div>
            <p className="text-lg font-medium">No notes found {selectedCategory && 'in this category'}</p>
            {!isArchivedView && !selectedCategory && <p className="text-sm">Create your first note to get started!</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onArchive={handleArchive}
                onDelete={handleDelete}
                onEdit={openValidModal}
              />
            ))}
          </div>
        )}

        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          noteToEdit={editingNote}
          allCategories={categories}
        />
      </main>
    </div>
  );
}

export default App;
