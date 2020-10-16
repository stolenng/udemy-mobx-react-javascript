import {toJS, observable, makeObservable} from "mobx";

const personInfo = {
    firstName: 'Mobx',
    lastName: 'React'
};

//normal observable without decorator
const person = observable(personInfo);

console.log(`Normal Observable`, person);

// es6 class + decorators
class Person {
    firstName = 'Mobx';
    lastName = 'React';

    constructor(props) {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
        })

        Object.assign(this, props);
    }
}

const classPerson = new Person(personInfo);

console.log(`Class With Decorator Observable`, classPerson);

console.log(`Back To Normal -> `, toJS(classPerson), toJS(person));