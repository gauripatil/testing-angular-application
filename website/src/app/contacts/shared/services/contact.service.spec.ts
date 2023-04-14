import {
    TestBed, inject
} from "@angular/core/testing";

import {
    ContactService
} from "./contact.service";

/**
 * Angular includes a decorator for services, @Injectable, 
 * that’s a convenient way to mark your service as a class 
 * that can serve as a provider for Angular’s dependency injection system. 
 * The decorator tells Angular that the service itself has its own dependencies that need to be resolved. 
 */


describe('ContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContactService]
        })
    })

    it('should...', inject([ContactService], (service: ContactService) => {
        expect(service).toBeTruthy();
    }));
} )