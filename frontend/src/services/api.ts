import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Category {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    categories: Category[];
}

export const api = {
    getNotes: async (archived: boolean = false, categoryId?: number) => {
        let url = `${API_URL}/notes?archived=${archived}`;
        if (categoryId) {
            url += `&category=${categoryId}`;
        }
        const response = await axios.get<Note[]>(url);
        return response.data;
    },
    createNote: async (title: string, content: string, categories: Partial<Category>[] = []) => {
        const response = await axios.post<Note>(`${API_URL}/notes`, { title, content, categories });
        return response.data;
    },
    updateNote: async (id: number, data: Partial<Note> & { categories?: Partial<Category>[] }) => {
        const response = await axios.patch<Note>(`${API_URL}/notes/${id}`, data);
        return response.data;
    },
    deleteNote: async (id: number) => {
        await axios.delete(`${API_URL}/notes/${id}`);
    },

    // Categories
    getCategories: async () => {
        const response = await axios.get<Category[]>(`${API_URL}/categories`);
        return response.data;
    },
    createCategory: async (name: string) => {
        const response = await axios.post<Category>(`${API_URL}/categories`, { name });
        return response.data;
    },
    deleteCategory: async (id: number) => {
        await axios.delete(`${API_URL}/categories/${id}`);
    }
};
