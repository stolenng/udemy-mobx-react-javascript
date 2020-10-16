import {action, autorun, makeObservable, observable, reaction, when} from "mobx";

class Person {
    firstName = 'Mobx';
    lastName = 'React';
    age = 15;
    isAlive = true;

    constructor(props) {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            age: observable,
            isAlive: observable,
            bury: action,
            setAge: action,
            updateFullName: action,
        })

        Object.assign(this, props);

        // when example -> this one disposed after condition is met and effect function is called
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

    updateFullName(name, lastName) {
        this.firstName = name;
        this.lastName = lastName;
    }
}

const ourPerson = new Person({
    firstName: 'Mobx',
    lastName: 'React'
});

// this reaction track every observable accessed inside it and will re run on each update of them.
const autoRunDisposer = autorun(() => {
    console.log(`${ourPerson.firstName} ${ourPerson.lastName} ${ourPerson.age} - ${ourPerson.isAlive}`);
});

const reactionDisposer = reaction(
    () => !ourPerson.isAlive,
    // the conditionValue is the result of expression function above
    (conditionValue) => console.log('RIP')
)

// ourPerson.updateFullName('Georgy', 'Glezer');

ourPerson.setAge(120);

// we will dispose them after 2 sec and we will no longer react on changes
setTimeout(() => {
    autoRunDisposer();
    reactionDisposer();
}, 2000);


