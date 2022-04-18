import { DbDBZ } from '../db/DbDBZ.js'
import { BadRequest } from '../utils/Errors.js'

class CharactersService {
    async editHero(newHero) {
       const originalHero = await this.getHeroById(newHero.id)
       originalHero.name = newHero.name || originalHero.name
       originalHero.age = newHero.age || originalHero.age
       originalHero.from_earth = newHero.from_earth || originalHero.from_earth
       originalHero.alien = newHero.alien || originalHero.alien
       originalHero.SSJ = newHero.SSJ || originalHero.SSJ
       return originalHero
    }
    async deleteHero(HeroToDeleteId) {
        const heroToDelete = await this.getHeroById(HeroToDeleteId)
        DbDBZ.heroes = DbDBZ.heroes.filter(h => h.id !== HeroToDeleteId)
        return heroToDelete
    }
    async createHero(heroToMake) {
        DbDBZ.heroes.push(heroToMake)
        return DbDBZ.heroes
    }
    async getHeroById(heroId) {
        const foundHero = DbDBZ.heroes.find(h => h.id === heroId)
        if (!heroId) {
            throw new BadRequest('Unable to find that Z-fighter')
        }
        return foundHero
    }
    async getAllHeroes() {
        return DbDBZ.heroes
    }



}

export const characterService = new CharactersService()