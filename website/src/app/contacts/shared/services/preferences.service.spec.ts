import { TestBed, inject } from '@angular/core/testing';
import { BrowserStorage } from './browser-storage.service';

import { PreferencesService } from './preferences.service';

class BrowserStorageMock {
  getItem = (property: string) => ({ key: 'testProp', value: 'testValue '});
  setItem = ({ key: key, value: value }) => {};
}


describe('PreferencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesService, {
        provide: BrowserStorage, useClasss: BrowserStorageMock
      }]
    });
  });

  describe('save preferences', () => {

    it('should save a preference', inject(
      [PreferencesService, BrowserStorage],
      (service: PreferencesService, browserStorage: BrowserStorageMock) => {

        spyOn(browserStorage, 'setItem').and.callThrough();
        service.saveProperty({ key: 'myProperty', value: 'myValue' });
        expect(browserStorage.setItem).toHaveBeenCalledWith('myProperty', 'myValue');
        
      })
    )


  })
});
