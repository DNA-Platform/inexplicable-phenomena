import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ On the Representation of a Large Even Integer ]]( Chen 1973 )</Title>
        <Paragraph>
            Chen Jing-run, On the representation of a larger even integer as the sum of a prime and the product of at
            most two primes, Scientia Sinica 16 (1973), 157–176; announced in Kexue Tongbao in 1966. Under copyright,
            and no address for its text was found on 10 November 2026, so it stands by its citation alone.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the best unconditional output of the sieve, every large even number the sum
            of a prime and a number with at most two prime factors, and the barrier it marks. In the two sieves
            of <Means>$[[ Two-Sided Arithmetic ]]( Arithmetic Notebook / Two-Sided Arithmetic )</Means>: "the sieving limit of
            dimension two, Jurkat and Richert's lower bound vanishing exactly at full depth, the parity phenomenon
            under both, Chen's theorem the best unconditional output", which is why the paper's axiom is sited at the
            barrier rather than beyond it.
        </Paragraph>
    </Chapter>
);
