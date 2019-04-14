import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
    it('Should display weak if strength is 5', () => {
        const pipe = new StrengthPipe();

        expect(pipe.transform(5)).toEqual('5 (weak)');
    });

    it('Should display weak if strength is 5', () => {
        const pipe = new StrengthPipe();

        expect(pipe.transform(10)).toEqual('10 (strong)');
    });

    it('Should display weak if strength is 5', () => {
        const pipe = new StrengthPipe();

        expect(pipe.transform(20)).toEqual('20 (unbelievable)');
    });
});
