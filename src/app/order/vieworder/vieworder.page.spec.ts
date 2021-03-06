import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VieworderPage } from './vieworder.page';

describe('VieworderPage', () => {
  let component: VieworderPage;
  let fixture: ComponentFixture<VieworderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieworderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VieworderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
