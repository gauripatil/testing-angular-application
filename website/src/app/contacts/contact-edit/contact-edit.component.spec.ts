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
import { AppMaterialModule } from '../app.material.module';
import { ContactEditComponent } from './contact-edit.component';

import '../../../material-app-theme.scss';

describe('Contact EditComponent Test', () => {
    let fixture: ComponentFixture<ContactEditComponent>;
    let component: ContactEditComponent;
    let rootElement: DebugElement;

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
});

// A test fake is an object you use in a test to substitute for the real thing. 
// A mock is a fake that simulates the real object and keeps track of when it’s called and what arguments it receives.
// A stub is a simple fake with no logic, and it always returns the same value.
 
