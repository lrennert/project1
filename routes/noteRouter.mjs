import express from 'express';
import {noteController} from '../controllers/noteController';

const router = express.Router();

router.get("/", function(req, res) {
    res.redirect("/notesOverview.html");
});

router.get("/notes", noteController.getNotes.bind(noteController));
router.get("/notes/:id", noteController.getNote.bind(noteController));
router.post("/notes", noteController.createNote.bind(noteController));
router.put("/notes", noteController.updateNote.bind(noteController));

export const noteRouter = router;