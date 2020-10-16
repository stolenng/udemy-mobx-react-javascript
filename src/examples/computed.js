import {action, autorun, computed, makeObservable, observable, when} from "mobx";

class Person {
    firstName = 'Mobx';
    lastName = 'React';
    age = 15;
    dollars = 50;
    isAlive = true;

    constructor(props) {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            age: observable,
            dollars: observable,
            isAlive: observable,
            bury: action,
            setAge: action,
            euros: computed,
        });

        Object.assign(this, props);

        when(
            () => this.age > 99,
            () => this.bury()
        )
    }

    bury() {
        this.isAlive = false;
    }

    setAge(age) {
        this.age = age;
    }

    get euros() {
        console.log('Calculation Euros!');
        return this.dollars * 0.837720897;
    }

    updateFullName(name, lastName) {
        this.firstName = name;
        this.lastName = lastName;
    }

    withdraw() {
        this.dollars -= 10;
    }
}

const ourPerson = new Person({
    firstName: 'Mobx',
    lastName: 'React'
});

console.log('Before Observing - Not Cached', ourPerson.euros);
console.log('Before Observing - Not Cached', ourPerson.euros);

const dispose = autorun(() => {
    console.log(`Current Money - ${ourPerson.euros}`);
});

console.log('After Observing - Cached', ourPerson.euros);
console.log('After Observing - Cached', ourPerson.euros);
console.log('After Observing - Cached', ourPerson.euros);
console.log('After Observing - Cached', ourPerson.euros);

// computed value update right after state change(observable update) !
ourPerson.withdraw();

dispose();




