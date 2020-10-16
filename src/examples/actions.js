import {action, autorun, makeObservable, observable, runInAction} from "mobx";

const waitForPromise = () => new Promise(resolve => setTimeout(resolve, 1000));

class Person {
    firstName = 'Mobx';
    lastName = 'React';

    constructor(props) {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            updateFullName: action,
            setFirstName: action,
            setLastName: action,
        })

        Object.assign(this, props);
    }


    // single batch update 2 observables
    updateFullName(name, lastName) {
        this.firstName = name;
        this.lastName = lastName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }
}
const ourPerson = new Person({
    firstName: 'Mobx',
    lastName: 'React'
});

autorun(() => {
    console.log(`person: ${ourPerson.firstName} ${ourPerson.lastName}`);
});


// will trigger 1 update
ourPerson.updateFullName('Georgy', 'Glezer');

// each 1 will trigger single update -> 2 in total
ourPerson.setFirstName('Random');
ourPerson.setLastName('Name');

runInAction(async () => {
    // this 2 below will trigger single update
    ourPerson.firstName = 'Need More Names';
    ourPerson.lastName = 'Need More Names';

    // everything after this line will trigger new batch thus will trigger another update
    await waitForPromise();

    ourPerson.firstName = 'ASync Name';
});

