import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb(){
        const persons = [
            { id: 11, content: 'http://schema.org', type: 'Person' , firstName: 'John', lastName: 'Smith', birthDate: new Date(1,20-1,1980)},
            { id: 12, content: 'http://schema.org', type: 'Person' , firstName: 'Hebert', lastName: 'Grönemeier', birthDate: new Date(1,20-1,1980)},
            { id: 13, content: 'http://schema.org', type: 'Person' , firstName: 'Otto', lastName: 'Waalkes', birthDate: new Date(1,20-1,1980)},
            { id: 14, content: 'http://schema.org', type: 'Person', firstName: 'Theophrastus Bombastus', lastName: 'von Hohenheim', birthDate: new Date(1,20-1,1980)},
            { id: 15, content: 'http://schema.org', type: 'Person' , firstName: 'Amelia', lastName: 'Pond', birthDate: new Date(1,20-1,1980)},
        ];
        return {persons};
    }
}