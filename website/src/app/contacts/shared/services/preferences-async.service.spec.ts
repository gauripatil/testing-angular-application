// Imports asynchronous testing methods
import { TestBed, fakeAsync, flushMicrotasks, inject } from "@angular/core/testing";

import { BrowserStorageAsync } from "./browser-storage.service";
import { PreferencesAsyncService } from "./preferences-async.service";

// Mocks the asynchronous service response
class BrowserStorageAsyncMock {
    getItem = (property: string) => Promise.resolve({ key: 'testProp', value: 'testValue' });
    setItem = ({key: key, value: value}) => Promise.resolve(true);
}

describe('PreferencesAsyncService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreferencesAsyncService, {
                provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock
            }]
        })
    })

    it('should get a value', fakeAsync(inject([PreferencesAsyncService, BrowserStorageAsync],
        (services: PreferencesAsyncService, browserStorage: BrowserStorageAsync) => {
            spyOn(browserStorage, 'getItem').and.callThrough();
            let results, error;

            // Invokes the promise and assigns the results
            services.getPropertyAsync('testProp')
                .then(val => results = val)
                .catch(err => error = err);
            
            // Processes the promise microtasks
            flushMicrotasks();

            expect(results.key).toEqual('testProp');
            expect(results.value).toEqual('testValue');
            expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
            //Ensures the error value wasn’t assigned
            expect(error).toBeUndefined();
        }))
    );

    it('should throw an error if key is missing', fakeAsync(inject([PreferencesAsyncService],
        (service: PreferencesAsyncService) => {
            let result, error;
            // Calls getPropertyAsync with an invalid value
            service.getPropertyAsync('')
                // Uses the BrowserStorageAsyncMock default return value
                .then(value => result = value)

                //Catches the expected error and assigns it locally
                .catch(err => error = err);
            
            flushMicrotasks();

            // You shouldn’t get a preference value back.
            expect(result).toBeUndefined();

            // You should get an error with this error message.
            expect(error).toEqual('getPropertyAsync requires a property name');
        })))
})

/**
 * The fakeAsync test helper aids you in two ways. 
 * First, it reduces the amount of boilerplate code you need to write an async test. 
 * Second, it makes it easy to use inject to provide instances of dependencies at 
 * the point of writing a test.
 * 
 * 
 * After the main test block, you invoke flushMicrotasks 
 * (which you imported at the beginning of the test). 
 * 1. You need to call flushMicrotasks to let Angular know that it’s time to process the promises in the test.
 * 2. your Angular services don’t need to call flushMicrotasks—this is a testing-only helper that makes it easier to test asynchronous services.
 * 3. You use it here to make sure the promises resolve before checking your expected values.
 * 4. Note that by using fakeAsync, you don’t need to call Jasmine’s done to end your asynchronous test.
 * 
 * When you tested for failures with synchronous code, 
 * you had to have special handling to make sure Jasmine could anticipate that an error would be thrown. 
 * But when something goes wrong when calling a promise, the reject callback of the promise will be called with any error information, 
 * and then the catch method that resolves the promise can handle any error processing. 
 * Therefore, Jasmine doesn’t need to have any special test setup when testing for error conditions with promises.
 * 
 * SUMMARY:
 * 
 * 	1.	Angular services are a way to separate user interface code like buttons and forms from code that handles business logic and data persistence. Using services promotes writing testable code and reusability.
	2.	Angular components and services define their dependencies, which Angular then injects when they’re needed. 
        Dependency injection lets you decouple the implementation of your code from the type of work the service is supposed to perform; 
        for example, your component can load and save user preferences without having to know the storage mechanism itself.
	3.	Mocks and spies are test doubles that are nonfunctional or low-functional substitutes for the real dependencies that your application will use. 
        Mocks allow you to provide predefined responses in your tests so your tests will always generate the same results, 
        whereas spies allow you to measure how your code is executing so you can guarantee that methods are called with the correct parameters.
	4.	With asynchronous code, the value produced isn’t known until sometime after the function is called, 
        so testing it takes special setup in Jasmine. 
        Angular includes test helpers for making testing asynchronous code easier.
	5.	Common ways of dealing with asynchronous code include promises and observables. 
        Exception handling with promises requires its own type of setup and testing.
	6.	Angular’s HttpClient uses RxJS observables as its output for code that makes calls to remote servers. 
        Angular has a special test module to make it easy to test components and services that interact withHttpClient.

 */