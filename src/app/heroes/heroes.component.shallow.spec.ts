import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe(`HeroesComponent (Shallow tests)`, () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
     class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }
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
                FakeHeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });
    it(`should set Heroes correctly from the service`, () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // Act
        // Assert
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it(`should create one li for each hero`, () => {
            // Arrange
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();

            // Act
            
            // Assert
           expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});
