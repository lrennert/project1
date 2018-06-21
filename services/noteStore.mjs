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
        this.db = db || new Datastore({filename: "./data/note.db", autoload: true});
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
        return await this.db.cfindOne({_id: id});
    }

    async all(filterBy, orderBy) {

        return await this.db.cfind(getFilterTerm()).sort(getSortTerm()).exec();

        function getFilterTerm() {
            switch (filterBy) {
                case "state":
                    return "{state: 'open'}";
                default:
                    return "{}";
            }
        }

        function getSortTerm() {
            switch (orderBy) {
                case "importance":
                    return "{importance: -1, dueDate: 1}";
                default:
                    return "{dueDate: 1, importance: -1}";
            }
        }
    }

}

export const noteStore = new NoteStore();