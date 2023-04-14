import { PhoneNumberPipe } from "./phone-number.pipe";


describe('PhoneNumberPipe Pipe Test', () => {
    let phoneNumber: PhoneNumberPipe = null;

    beforeEach(() => {
        phoneNumber = new PhoneNumberPipe();
    })

    describe('default behavior', () => {
        it('should transform the string or number into the default phone format', () => {
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
            const expectedResult = '(703) 555-0123';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })


        it('hould not display anything if the length is not 10 digits', () => {
            const testInputPhoneNumber = '703555012';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
            const expectedResult = '';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })
    })

    describe('phone number format tests', () => {
        it('should format the phone number using the dots format', () => {
            const format = 'dots'
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '703.555.0123';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })

        it('should format the phone number using the dots format', () => {
            const format = 'default'
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '(703) 555-0123';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })

        it('should format the phone number using the dots format', () => {
            const format = 'hyphens'
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '703-555-0123';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })

        it('should format the phone number using the default format if unrecognized format is entered', () => {
            const format = 'gibberish'
            const testInputPhoneNumber = '7035550123';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
            const expectedResult = '(703) 555-0123';
            expect(transformedPhoneNumber).toBe(expectedResult);
        })
    })

    describe('country code parameter tests', () => {
        it('should add respective country code', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'default';
            const countryCode = 'us';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
            const expectedResult = '+1 (703) 555-0123';
        })

        it('should not add anything if the country code is unrecongized', () => {
            const testInputPhoneNumber = '7035550123';
            const format = 'default';
            const countryCode = 'zz';
            const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
            const expectedResult = '(703) 555-0123';
        })
    });



    afterEach(() => { phoneNumber = null });
});

/**
 * Because pipes only take in a value as input, transform that value, and then return transformed input, 
 * testing them is straightforward. 
 * That’s because they’re pure functions, which means they have no side effects. 
 * 
 * Side effects are changes that occur outside a function after that function is executed. 
 * A common side effect is the changing of a global variable.
 * 
 * When you’re testing pipes, you’re mainly testing the transform method that’s included in every pipe. 
 * The transform method is what takes in the different parameters you want to manipulate, 
 * performs the manipulation, and then returns the changed values.
 * 
 */