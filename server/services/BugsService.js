import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
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
    async getBugs() {
        return await dbContext.Bugs.find()
    }
    async getById(id) {
        let data = await dbContext.Bugs.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug")
        }
        return data
    }
    async getNotesByBugId(id) {
        let data = await dbContext.Notes.find({ bugId: id });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug.")
        }
        return data;
    }

    async deleteBug(stuff) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: stuff.id }, stuff, { new: true });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this list");
        }
    }

    async editBug(id, userEmail, update) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail, closed: false }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug.")
        }
        return data;
    }
}

export const bugsService = new BugsService()
