import {AHP} from 'ahp';

function startAhp (factors: string[], rankings: (string|number)[]) {
    const ahp = new AHP();
    ahp.addItems(factors);
    ahp.addCriterial(['risk']);
    const analytics = ahp.debug();
}



