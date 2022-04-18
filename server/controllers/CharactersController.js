import { characterService } from '../services/CharactersService.js'
import BaseController from '../utils/BaseController.js'

export class CharactersController extends BaseController {
    constructor() {
        super('api/heroes')
        this.router
            .get('', this.getAllHeroes)
            .get('/:id', this.getHeroesById)
            .post('', this.createHero)
            .delete('/:id', this.deleteHero)
            .put('/:id', this.editHero)
    }



    async getAllHeroes(req, res, next) {
        try {
            const heroes = await characterService.getAllHeroes()
            res.send(heroes)
        } catch (error) {
            next(error)
        }
    }
    async getHeroesById(req, res, next) {
        try {
            const heroId = req.params.id
            const foundHero = await characterService.getHeroById(heroId)
            res.send(foundHero)
        }
        catch (error) {
            next(error)
        }
    }
    async createHero(req, res, next) {
        try {
            const heroToMake = req.body
            const createdHero = await characterService.createHero(heroToMake)
            res.send(createdHero)
        }
        catch (error) {
            next(error)
        }
    }
    async deleteHero(req, res, next) {
        try {
            const HeroToDeleteId = req.params.id
            const deletedHero = await characterService.deleteHero(HeroToDeleteId)
            res.send(deletedHero)
        } catch (error) {
            next(error)
        }
    }
    async editHero(req, res, next) {
        try {
            req.body.id = req.params.id
            const editedHero = await characterService.editHero(req.body)
            res.send(editedHero)
        } catch (error) {
            next(error)
        }
    }
}