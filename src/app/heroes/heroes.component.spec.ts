import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe(`description`, () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 1, name: 'Wonderful Woman', strength: 24},
            {id: 1, name: 'BatMan', strength: 15}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });
    describe('delete', () => {
        it(`should remove the indicated hero from the heroes list`, () => {
                // Arrange
                mockHeroService.deleteHero.and.returnValue(of(true));
                component.heroes = HEROES;
                // Act
                component.delete(HEROES[2]);
                // Assert
                expect(component.heroes.length).toBe(2);
        });

        it(`should call deleteHero with the correct value`, () => {
               // Arrange
               mockHeroService.deleteHero.and.returnValue(of(true));
               component.heroes = HEROES;
               // Act
               component.delete(HEROES[2]);
               // Assert
               expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});
