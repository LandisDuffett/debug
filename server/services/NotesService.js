import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
    async create(rawData) {
        let data = await dbContext.Notes.create(rawData)
        return data
    }
    /*async findAll(query = {}) {
        let values = await dbContext.Values.find(query).populate(
            "creator",
            "name picture"
        );
        return values;
    }
    async findById(id) {
        let value = await dbContext.Values.findById(id);
        if (!value) {
            throw new BadRequest("Invalid Id");
        }
        return value;
    }*/
    async delete(id) {
        let data = await dbContext.Notes.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this list");
        }
    }

    async deleteNotesByBugId(id) {
        let data = await dbContext.Notes.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this task");
        }
    }
    async getNotes() {
        return await dbContext.Notes.find()
    }
}


export const notesService = new NotesService()
