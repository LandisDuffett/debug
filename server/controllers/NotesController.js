import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {
    constructor() {
        super("api/notes");
        this.router
            //.get("", this.getAll)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.deleteNoteById)
            .get('', this.getNotes)

    }
    /*async getAll(req, res, next) {
        try {
            return res.send(["value1", "value2"]);
        } catch (error) {
            next(error);
        }
    }*/
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await notesService.create(req.body)
            return res.send(req.body);
        } catch (error) {
            next(error);
        }
    }

    async deleteNoteById(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            await notesService.delete(req.params.id)
            return res.send("deleted note")
        } catch (error) {
            next(error)
        }
    }
    async getNotes(req, res, next) {
        try {
            let data = await notesService.getNotes()
            return res.send(data)
        }
        catch (err) { next(err) }
    }

}
