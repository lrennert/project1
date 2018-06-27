import {noteStore} from '../services/note-store'

export class NoteController {

    async getNotes(req, res) {
        res.json(await noteStore.all(req.query.filterBy, req.query.sortBy));
    };

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate));
    };

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.state));
    };

    async deleteNotes(req, res) {
        res.json(await noteStore.delete());
    };
}

export const noteController = new NoteController();