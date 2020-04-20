import a from '../images/children.png';
import b from '../images/men.png';
import c from '../images/women.png';
import d from '../images/old-man.png';
import e from '../images/manAndWoman.png';

export class Population {
    state={
        id:'',
        image:''
    }
}

const pop1 = new Population(0, a);
const pop2 = new Population(1, b);
const pop3 = new Population(2, c);
const pop4 = new Population(3, d);
const pop5 = new Population(4, e);
export const popList = [pop1, pop2, pop3, pop4, pop5]