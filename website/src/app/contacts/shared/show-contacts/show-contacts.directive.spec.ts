import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowContactsDirective } from './show-contacts.directive';
import { getElement } from '../../testing';

/**
 * 
 * The getElement function is similar to the getStarElement function that you used earlier—
 * it’s a small helper function that takes in a fixture and returns the element that you want to test. 
 */

@Component({
  template: `
      <div *appShowContacts="true">
        <p>This is shown</p>
      </div>
      <div *appShowContacts="false">
        <p>This is hidden</p>
      </div>
    `
})
class TestComponent { }


describe('Directive: ShowContactsDirective', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ShowContactsDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges();
    })

    it('should be displayed when the input evaluates to true.', () => {
        const element = getElement(fixture);
        expect(element.innerText).toContain('This is shown');

    })

    it('should be hidden when the input evaluates to false.', () => {
        const element = getElement(fixture);
        expect(element.innerText).not.toContain('This is hidden');
    });

    afterEach(() => {fixture = null})
})