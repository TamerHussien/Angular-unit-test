import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe(`HeroesComponent (Deep tests)`, () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 1, name: 'Wonderful Woman', strength: 24},
            {id: 1, name: 'BatMan', strength: 15}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],

            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it(`should  render each hero as a HeroComponent`, () => {
            // Arrange
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            // Act run ngOninit
            fixture.detectChanges();

            // Assert
            const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
            expect(heroComponentDEs.length).toBe(3);
            for (let index = 0; index < heroComponentDEs.length; index++) {
                expect(heroComponentDEs[index].componentInstance.hero).toEqual(HEROES[index]);

            }
            // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
    });

    it(`should call heroService.delete when the hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act run ngOninit
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            // Assert
            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });
});
