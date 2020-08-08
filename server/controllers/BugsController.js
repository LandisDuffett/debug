import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";

export class BugsController extends BaseController {
    constructor() {
        super("api/bugs");
        this.router
            //.get("", this.getAll)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .put('/:id', this.editBug)

        //.delete('/:id', this.deleteNoteById)
    }

    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await bugsService.create(req.body)
            return res.send(req.body);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            let data = await bugsService.getAll()
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await bugsService.getById(req.params.id)
            return res.send(data)
        } catch (err) { next(err) }

    }
    /*async getNotesByBugId(req, res, next) {
        try {
            let data = await bugsService.getNotesByBugId(req.params.bugId)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }*/
    async editBug(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await bugsService.editBug(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

}
