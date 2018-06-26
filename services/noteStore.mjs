import Datastore from 'nedb-promise'

export class Note {
    constructor(title, description, importance, dueDate) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.createDate = new Date();
        this.dueDate = dueDate;
        this.state = "open";
    }
}

export class NoteStore {

    constructor(db) {
        this.db = db || new Datastore({filename: "../data/note.db", autoload: true});
    }


    async add(title, description, importance, dueDate) {
        let note = new Note(title, description, importance, dueDate);
        return await this.db.insert(note);
    }


    async update(id, title, description, importance, dueDate, state) {
        if (state !== null) {
            await this.db.update({_id: id}, {
                $set: {
                    "state": state
                }
            })
        } else {
            await this.db.update({_id: id}, {
                $set: {
                    "title": title,
                    "description": description,
                    "importance": importance,
                    "dueDate": dueDate
                }
            })
        }
        return await this.get(id);
    }


    async get(id) {
        return await this.db.findOne({_id: id});
    }


    async all(filterBy, sortBy) {

        return {notes: await this.db.cfind(getFilterTerm()).sort(getSortTerm()).exec()};

        function getFilterTerm() {
            const filterTerm = {};
            switch (filterBy) {
                case "open":
                    filterTerm.state = "open";
                    break;
                default:
                    break;
            }
            return filterTerm;
        }

        function getSortTerm() {
            const sortTerm = {};
            switch (sortBy) {
                case "importance":
                    sortTerm.importance = -1;
                    sortTerm.dueDate = 1;
                    break;
                default:
                    sortTerm.dueDate = 1;
                    sortTerm.importance = -1;
                    break;
            }
            return sortTerm;
        }
    }
}

export const noteStore = new NoteStore();