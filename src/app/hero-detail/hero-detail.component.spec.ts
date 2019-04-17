import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';
import { FormsModule } from '@angular/forms';

describe(`HeroDetailsComponent `, () => {
let fixture: ComponentFixture<HeroDetailComponent>;
let mockActivatedRoute, mockHeroService, mockLocation;
    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap : { get: () => '3'}}
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute },
                {provide: HeroService, useValue: mockHeroService },
                {provide: Location, useValue: mockLocation },
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'superDude', strength: 100}));
    });


    it(`should render Hero name in h2 tag`, () => {
        // Arrange
        fixture.detectChanges();
        // Act
        // Assert
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    it(`should call updateHero when save is called`, fakeAsync( () => {
            // Arrange
            mockHeroService.updateHero.and.returnValue(of({}));
            fixture.detectChanges();
            // Act
            fixture.componentInstance.save();
            // Assert
            tick(250);
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            // setTimeout(() => {
            //     expect(mockHeroService.updateHero).toHaveBeenCalled();
            //     done();
            // }, 300);
    }));
});
