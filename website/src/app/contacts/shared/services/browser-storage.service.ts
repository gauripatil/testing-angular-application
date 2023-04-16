import { Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { PreferencesService } from "./preferences.service";

@Injectable()
export class BrowserStorage {
  getItem: (property: string) => string | object;
  setItem: (property: string, value: string | object) => void;
}



/**
 * pretend you have the information by creating a fake service called BrowserStorage 
 * to let you avoid relying on any specific kind of storage. 
 * That way, you can keep writing PreferencesService without having to solve the storage problem.
 * 
 * 
 * To use this technique, you’ll create a simple service that 
 * doesn’t implement any logic—the service only exists to provide a token and a simple storage interface.
 * 
 * In this listing, you’ll create a stub, 
 * which is a barebones class that defines its properties and methods but doesn’t contain any logic. 
 * 
 * why is this a class instead of a TypeScript interface? 
 * As mentioned earlier in this chapter, Angular uses tokens for resolving dependencies. 
 * 
 * TypeScript interfaces don’t get translated into JavaScript, so there’s no way for Angular to resolve the token. 
 * To tell Angular what to inject, you’ll need to create a class that fills in like it’s an interface.
 * 
 * You can use this stub to create a BrowserStorageMock for your test. 
 * A mock is an object that substitutes for a real service. 
 * 
 * To clarify, the stub represents the storage service that you haven’t written yet,
 * even though you know what methods you want to call. 
 * The mock is an object you use only within the unit test that provides canned responses within the test.
 * With your mock, you’ll define the getItem and setItem methods. 
 * Later, you’ll use the mock in the unit test as a substitute for the real service.
 * 
 * Within individual unit tests, you’ll use spies. 
 * A spy is a function that invisibly wraps a method and lets you control what values it returns or monitor how it was called. 
 * A test uses a spy to measure if a method was called, how many times it was called, and with what arguments.
 * 
 * By using the token from BrowserStorage and supplying the same methods, 
 * you can use your mock for unit testing instead of relying on the real implementation. 
 * You only need to configure TestBed to use BrowserStorageMock 
 * whenever a service calls for BrowserStorage as a dependency.
 * 
 * 
 * 
 */