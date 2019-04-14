import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe(`HeroService`, () => {
    let mockMessageServices;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    beforeEach(() => {
        mockMessageServices = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageServices},
            ],
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });
   describe(`getHero`, () => {


       it(`should call get with the correct Url`, () => {
           // Arrange
           
           // Act
           service.getHero(4).subscribe();
           // Assert

           const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id: 4, name: 'SuperDude', strength: 100});
            httpTestingController.verify();
       });
   });
});
