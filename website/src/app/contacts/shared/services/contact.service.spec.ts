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


/**
 * NOTES:
 * 1. The HttpClientTestingModule removes the need for manually blocking calls 
 * from HttpClient trying to reach a server. 
 * The HttpTestingController lets you interact with its testing module to verify that
 * calls are being attempted and to supply canned responses.
 * 
 * 2. Unlike the other asynchronous tests in this section, for tests involving HttpClient, 
 * you don’t need to wrap the test function with fakeAsync or use a done callback. 
 * For these tests, the asynchronous observable behavior is simulated without 
 * you having to add anything to your tests.
 * 
 * 3. you call getContacts on contactService, which defines an observable of contacts as its return value. 
 * This syntax looks similar to how promises are tested, but instead of using then, 
 * you use subscribe. 
 * One important difference between promises and observables is that 
 * observable callbacks are called whenever new values are emitted from an observable, 
 * whereas promises are only resolved once.
 * 
 * Since contactService interacts with the server, you’ll verify the service makes a
 * call to the api/contacts endpoint, and you’ll use the returned request object 
 * to send a response by calling flush with a predefined object, the mockContact. 
 * Each method in your service (for example, getContacts, setContacts) 
 * needs to set up the unit test differently for different types of server responses. 
 * The response from a GET request will be different from that of a POST, for example.
 * 
 * 
 * 
 * After each test, you’ll also check the instance of HttpTestingController to 
 * verify no connections to the backend are pending or unresolved. 
 * If any are, the test will show an error. 
 * As you can see, testing HttpClient using Angular’s test helpers saves you a lot of work.
 * 
 * IMP NOTE:
 * NOTE Although you’re creating a fake server response, 
 * this technique exposes one of the difficulties of writing these types of tests: 
 * you still have a hidden dependency on the server itself. 
 * You’re trusting that the server response will match what your code does. 
 * One way to deal with this thorny situation is to write a contract for the service 
 * using a specification language, such as OpenAPI, and use those specifications as 
 * an input for your unit tests. 
 * That goes beyond the scope of this chapter, but it’s worth looking into 
 * if you’re writing code to access web services.
 */