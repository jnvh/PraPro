declare module 'ahp' {
class AHP {
    constructor(){

    };

    addItems(items: string[]);
    addCriterial(criterials: string[]);
    rankCriterialItem(criterial: string, ranking: (string|numer)[]);
    run();
    debug();
}
}