import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'textBox';
    type: string;

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}