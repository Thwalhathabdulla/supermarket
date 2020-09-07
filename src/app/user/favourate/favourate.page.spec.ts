import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavouratePage } from './favourate.page';

describe('FavouratePage', () => {
  let component: FavouratePage;
  let fixture: ComponentFixture<FavouratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
