import { Component } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from
    '@angular/core/testing';
import { constants } from './favorite-icon.constants';
import { FavoriteIconDirective } from './favorite-icon.directive';
import { getStarElement, doClassesMatch } from '../../testing';


/**
 * To test a directive, you need to create a host component that uses it. 
 * Your host component has a different <i> element for each test case. 
 */
@Component({
  template: `
      <i [appFavoriteIcon]="true"></i>
      <i [appFavoriteIcon]="false"></i>
      <i [appFavoriteIcon]="true" [color]="'blue'"></i>
      <i [appFavoriteIcon]="true" [color]="'cat'"></i>
    `
})
class TestComponent { }

describe('Directive: FavoriteIconDirective', () => {
    let fixture: ComponentFixture<any>;
    const expectedSolidStarList = constants.classes.SOLID_STAR_STYLE_LIST;
    const expectedOutlineStarList = constants.classes.OUTLINE_STAR_STYLE_LIST;

    /**
     * In the first line of the beforeEach method, you declare a variable called testModuleMetadata. 
     * This variable implements the TestModuleMetadata interface, 
     * which you use to provide test metadata to configure the TestBed. 
     * In the previous chapter, you used test metadata itself to configure TestBed. 
     * The difference this time is that you’ve created a separate variable to contain that data. 
     * In doing so, you’ve passed an object that conforms to the TestModuleMetadata 
     * interface to the configureTestingModule method that configures TestBed.
     * After you configure TestBed, you use the createComponent method from
     * TestBed to return an instance of a ComponentFixture. 
     * Finally, you call fixture.detectChanges() to invoke change detection and 
     * render updated data whenever an event occurs, such as click or mouseenter.
     */
    beforeEach(() => {
        // Declares the testModuleMetadata to contain the information needed to configure TestBed
        const testModuleMetadata: TestModuleMetadata = {
        declarations: [FavoriteIconDirective, TestComponent]
        };
        // Configures TestBed using the testModuleMetadata variable
        fixture = TestBed.configureTestingModule(testModuleMetadata)
            .createComponent(TestComponent);
        //Uses TestBed.createComponent to create a component fixture to use with your tests

        // Uses detectChanges to initiate change detection
        fixture.detectChanges();
    });

    describe('when favorite icon is set to true', () => {
        let starElement = null;

        /**
         * Notice that in the line after beforeEach you declare
         *  a constant named defaultTrueElementIndex and set it to 0.
         *  You may recall that earlier, when you created TestComponent, 
         * the template contained four different sets of HTML tags for the different test cases.
         *  The different elements are stored in an array. 
         *  You’re testing the first element in fixture for this set of tests,
         *  so you use the 0 index to retrieve it from the array. 
         * Recall that using TestComponent creates the class fixture.
         * To get starElement from fixture, you use a helper method called getStarElement.
         *  All the getStarElement method does is extract a child element from fixture
         */
        beforeEach(() => {
            const defaultTrueElementIndex = 0;
            starElement = getStarElement(fixture, defaultTrueElementIndex);
        });

        it('should display a solid gold star after the page loads', () => {
            expect(starElement.style.color).toBe('gold');
            expect(doClassesMatch(starElement.classList, expectedSolidStarList)).toBeTruthy();
        });

        it('should display a solid gold star if the user rolls over the star', () => {
            const event = new Event('mouseenter');
            starElement.dispatchEvent(event);

            expect(starElement.style.color).toBe('gold');
            expect(doClassesMatch(starElement.classList, expectedSolidStarList)).toBeTruthy();
        });

        it('should display a black outline of a star after the user clicks on the star', () => {
            const event = new Event('click');
            starElement.dispatchEvent(event);

            expect(starElement.style.color).toBe('black');
            expect(doClassesMatch(starElement.classList, expectedOutlineStarList)).toBeTruthy();
        });
    });

    afterEach(() => { fixture = null; });
});