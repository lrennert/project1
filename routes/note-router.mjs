import express from 'express';
import {noteController} from '../controllers/note-controller';

const router = express.Router();

router.get("/notes", noteController.getNotes.bind(noteController));
router.get("/notes/:id", noteController.getNote.bind(noteController));
router.post("/notes", noteController.createNote.bind(noteController));
router.put("/notes/:id", noteController.updateNote.bind(noteController));
router.delete("/notes", noteController.deleteNotes.bind(noteController));

export const noteRouter = router;