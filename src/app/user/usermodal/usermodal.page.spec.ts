import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsermodalPage } from './usermodal.page';

describe('UsermodalPage', () => {
  let component: UsermodalPage;
  let fixture: ComponentFixture<UsermodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
