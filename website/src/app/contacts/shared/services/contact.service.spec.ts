import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';


describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], // Configures the TestBed to use HttpClientTestingModule
      providers: [ ContactService ]
    });
  });

  describe('getContacts', () => {

    let contactService: ContactService;
      
    // Assigns a reference to the HttpTestingController for interacting with the HttpClientTestingModule  
    let httpTestingController: HttpTestingController;
    let mockContact: any;

    beforeEach(() => {
      contactService = TestBed.get(ContactService);
      httpTestingController = TestBed.get(HttpTestingController);
      mockContact = { id: 100, name: 'Erin Dee', email: 'edee@example.com' };
    });

    it('should GET a list of contacts', () => {

        //Exercises the contactService method that makes a call to the server, 
        // which emits an observable later, so is not evaluated on this line
        contactService.getContacts().subscribe((contacts) => {
            console.log('result >>>>>>>', JSON.stringify(contacts));
            expect(contacts[0]).toEqual(mockContact);
        });
        

        const request = httpTestingController.expectOne('app/contacts');
        // Causes the httpTestingController to emit the value being flushed
        request.flush([mockContact]);

        // Verifies there are no outstanding requests
        httpTestingController.verify();
    });
  });
});
