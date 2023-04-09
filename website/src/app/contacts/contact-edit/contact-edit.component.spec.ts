// Shallow tests let you test components one level deep, 
// ignoring any child elements that the element may contain;
// you can test the parent component in isolation.

import { DebugElement } from "@angular/core";
// DebugElement will debug the elements you select.
// You can use DebugElement to inspect an element during testing. 
// You can think of it as the native HTMLElement with 
// additional methods and properties that can be useful for debugging elements.

import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
/**
 * ComponentFixture - use it to create a fixture that you then can use for debugging.
 * fakeAsync - Using fakeAsync ensure that all asynchronous tasks are completed before executing the assertions. 
 * TestBed - use this class to set up and configure your tests. 
 * tick - When using fakeAsync, you can use tick to simulate the passage of time. It accepts one parameter, which is the number of milliseconds to move time forward. 
 *         If you don’t provide a parameter, tick defaults to zero milliseconds.
 */

import { By } from "@angular/platform-browser";
// By -  use to select DOM elements. 

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
// use the NoopAnimationsModule class to mock animations, which allows tests to run quickly without waiting for the animations to finish.

import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
// BrowserDynamicTestingModule is a module that helps bootstrap the browser to be used for testing.

import { RouterTestingModule } from '@angular/router/testing';
// use RouterTestingModule to test routing


// angular nontesting module statement
import { FormsModule } from '@angular/forms';

// remaining dependency statements
import { Contact, ContactService, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent } from
  '../shared';
import { AppMaterialModule } from '../../app.material.module';
import { ContactEditComponent } from './contact-edit.component';

import '../../../material-app-theme.scss';

describe('Contact EditComponent Test', () => {
    let fixture: ComponentFixture<ContactEditComponent>;
    let component: ContactEditComponent;
    let rootElement: DebugElement;

    
    // A test fake is an object you use in a test to substitute for the real thing. 
    // A mock is a fake that simulates the real object and keeps track of when it’s called and what arguments it receives.
    // A stub is a simple fake with no logic, and it always returns the same value.

    const contactServiceStub = {
        contact: {
            id: 1,
            name: 'john'
        },

        save : async function (contact: Contact) {
            component.contact = contact
        },

        getContact: async function () {
            component.contact = this.contact;
            return this.contact;
        },

        updateContact: async function (contact: Contact) {
            component.contact = contact;
        }
    }

    // beforeEach sets up your TestBed configuration
    beforeEach(() => { 
        TestBed.configureTestingModule({
            declarations: [ContactEditComponent, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
            imports: [
                AppMaterialModule,
                FormsModule,
                NoopAnimationsModule,
                RouterTestingModule
            ],
            providers: [{
                provide: ContactService,
                useValue: contactServiceStub
            }]
        })

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
            }
        })
    });

    beforeEach(() => {
        // fixture variable stores the component-like object from the TestBed.createComponent method that you can use for debugging and testing
        fixture = TestBed.createComponent(ContactEditComponent);

        // component variable holds a component that you get from your fixture using the componentInstance property
        component = fixture.componentInstance;

        // detectChanges method triggers a change-detection cycle for the component; 
        // you need to call it after initializing a component or changing a data - bound property value. 
        // After calling detectChanges, the updates to your component will be rendered in the DOM.
        fixture.detectChanges();

        // 
        rootElement = fixture.debugElement;
    });

    describe('saveContact() test ', () => {
        it('should display contact name after contact set', fakeAsync(() => {
            // The contact object you’ll save
            const contact = {
                id: 1,
                name: 'lorace'
            }

            // Sets isLoading to false to hide the progress bar
            component.isLoading = false;

            // Saves the contact object
            component.saveContact(contact);

            // Uses the detectChanges method to trigger change detection
            fixture.detectChanges();

            // Gets the nameInput form field
            const nameInput = rootElement.query(By.css('.contact-name'));

            // Simulates the passage of time using tick
            tick();

            // Checks to see if the name property has been set correctly
            expect(nameInput.nativeElement.value).toBe('lorace');
        }));

    });

    describe('loadContact() test ', () => {
        it('should load contact', fakeAsync(() => {
            // Sets isLoading to false to hide the progress bar
            component.isLoading = false;

            // load the contact
            component.loadContact();

            // Uses the detectChanges method to trigger change detection 
            fixture.detectChanges();

            // Gets the nameInput form field
            const nameInput = rootElement.query(By.css('.contact-name'));

            // Simulates the passage of time using tick
            tick();

            // Checks to see if the name property has been set correctly
            expect(nameInput.nativeElement.value).toBe('john');
        }))
    })
});

 
