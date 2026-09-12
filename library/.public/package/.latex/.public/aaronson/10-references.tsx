import { $ } from '@dna-platform/chemistry';
import { Entry, Heading, References, Section } from '@dna-platform/public';
import { $AaronsonChapter as $Chapter } from './.book';

export default class $References extends $Chapter {
    print() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
                    <Entry>{"aaronson2003: S. Aaronson. Is P versus NP formally independent? Bulletin of the EATCS, (81), October 2003."}</Entry>
                    <Entry>{"aaronson2004: S. Aaronson. Multilinear formulas and skepticism of quantum computing. In Proc. ACM STOC, pages 118–127, 2004. quant-ph/0311039, www.scottaaronson.com/papers/mlinsiam.pdf."}</Entry>
                    <Entry>{"aaronson2005: S. Aaronson. NP-complete problems and physical reality. SIGACT News, March 2005. quant-ph/0502072."}</Entry>
                    <Entry>{"aaronson2006: S. Aaronson. Oracles are subtle but not malicious. In Proc. Conference on Computational Complexity, pages 340–354, 2006. ECCC TR05-040."}</Entry>
                    <Entry>{"aaronson2008: S. Aaronson. Arithmetic natural proofs theory is sought, 2008. www.scottaaronson.com/blog/?p=336."}</Entry>
                    <Entry>{"aaronson2013: S. Aaronson. Quantum Computing Since Democritus. Cambridge University Press, 2013."}</Entry>
                    <Entry>{"aaronson2014: S. Aaronson. The scientific case for P ≠ NP, 2014. www.scottaaronson.com/blog/?p=1720."}</Entry>
                    <Entry>{"aaronson: S. Aaronson et al. The Complexity Zoo. www.complexityzoo.com."}</Entry>
                    <Entry>{"aaronson2014b: S. Aaronson, R. Impagliazzo, and D. Moshkovitz. AM with multiple Merlins. In Proc. Conference on Computational Complexity, pages 44–55, 2014. arXiv:1401.6848."}</Entry>
                    <Entry>{"aaronson2009: S. Aaronson and A. Wigderson. Algebrization: a new barrier in complexity theory. ACM Trans. on Computation Theory, 1(1), 2009. Earlier version in Proc. ACM STOC’2008."}</Entry>
                    <Entry>{"abboud2016: A. Abboud, T. D. Hansen, V. Vassilevska Williams, and R. Williams. Simulating branching programs with edit distance and friends or: a polylog shaved is a lower bound made. In Proc. ACM STOC, pages 375–388, 2016. arXiv:1511.06022."}</Entry>
                    <Entry>{"adleman1978: L. Adleman. Two theorems on random polynomial time. In Proc. IEEE FOCS, pages 75–83, 1978."}</Entry>
                    <Entry>{"adleman1997: L. Adleman, J. DeMarrais, and M.-D. Huang. Quantum computability. SIAM J. Comput., 26(5):1524–1540, 1997."}</Entry>
                    <Entry>{"agrawal2006: M. Agrawal. Determinant versus permanent. In Proceedings of the International Congress of Mathematicians, 2006."}</Entry>
                    <Entry>{"agrawal2004: M. Agrawal, N. Kayal, and N. Saxena. PRIMES is in P. Annals of Mathematics, 160(2):781– 793, 2004. Preprint released in 2002."}</Entry>
                    <Entry>{"agrawal2008: M. Agrawal and V. Vinay. Arithmetic circuits: a chasm at depth four. In Proc. IEEE FOCS, pages 67–75, 2008."}</Entry>
                    <Entry>{"ajtai1983: M. Ajtai. Σ¹₁-formulae on finite structures. Annals of Pure and Applied Logic, 24(1):1–48, 1983."}</Entry>
                    <Entry>{"ajtai2005: M. Ajtai. A non-linear time lower bound for Boolean branching programs. Theory of Computing, 1(1):149–176, 2005. Earlier version in Proc. IEEE FOCS’1999, pp. 60-70."}</Entry>
                    <Entry>{"alexeev2011: B. Alexeev, M. A. Forbes, and J. Tsimerman. Tensor rank: some lower and upper bounds. In Proc. Conference on Computational Complexity, pages 283–291, 2011."}</Entry>
                    <Entry>{"allender1999: E. Allender. The permanent requires large uniform threshold circuits. Chicago Journal of Theoretical Computer Science, 7:19, 1999."}</Entry>
                    <Entry>{"allender2008: E. Allender. Cracks in the defenses: scouting out approaches on circuit lower bounds. In Computer Science in Russia, pages 3–10, 2008."}</Entry>
                    <Entry>{"allender2009: E. Allender. A status report on the P versus NP question. Advances in Computers, 77:117– 147, 2009."}</Entry>
                    <Entry>{"allender1991: E. Allender and V. Gore. On strong separations from AC⁰. In Fundamentals of Computation Theory, pages 1–15. Springer Berlin Heidelberg, 1991."}</Entry>
                    <Entry>{"allender1994: E. Allender and V. Gore. A uniform circuit lower bound for the permanent. SIAM J. Comput., 23(5):1026–1049, 1994."}</Entry>
                    <Entry>{"allender2008b: E. Allender, L. Hellerstein, P. McCabe, T. Pitassi, and M. Saks. Minimizing disjunctive normal form formulas and AC⁰ circuits given a truth table. SIAM J. Comput., 38(1):63–84, 2008. Earlier version in Proc. IEEE Complexity’2006, pp. 237-251."}</Entry>
                    <Entry>{"allender2010: E. Allender and M. Koucký. Amplifying lower bounds by means of self-reducibility. J. of the ACM, 57(3):1–36, 2010. Earlier version in Proc. IEEE Complexity’2008, pp. 31-40."}</Entry>
                    <Entry>{"alon1987: N. Alon and R. B. Boppana. The monotone circuit complexity of Boolean functions. Combinatorica, 7(1):1–22, 1987."}</Entry>
                    <Entry>{"andreev1987: A. E. Andreev. On a method for obtaining more than quadratic effective lower bounds for the complexity of π-schemes. Moscow Univ. Math. Bull., 42:63–66, 1987. In Russian."}</Entry>
                    <Entry>{"arora2009: S. Arora and B. Barak. Complexity Theory: A Modern Approach. Cambridge University Press, 2009. Online draft at www.cs.princeton.edu/theory/complexity/."}</Entry>
                    <Entry>{"arora1992: S. Arora, R. Impagliazzo, and U. Vazirani. Relativizing versus nonrelativizing techniques: the role of local checkability. Manuscript, 1992."}</Entry>
                    <Entry>{"arora1998: S. Arora, C. Lund, R. Motwani, M. Sudan, and M. Szegedy. Proof verification and the hardness of approximation problems. J. of the ACM, 45(3):501–555, 1998. Earlier version in Proc. IEEE FOCS’1992, pp. 14-23."}</Entry>
                    <Entry>{"arora1998b: S. Arora and S. Safra. Probabilistic checking of proofs: a new characterization of NP. J. of the ACM, 45(1):70–122, 1998. Earlier version in Proc. IEEE FOCS’1992, pp. 2-13."}</Entry>
                    <Entry>{"atserias2006: A. Atserias. Distinguishing SAT from polynomial-size circuits, through black-box queries. In Proc. Conference on Computational Complexity, pages 88–95, 2006."}</Entry>
                    <Entry>{"aydnloglu2016: B. Aydınlıoğlu and E. Bach. Affine relativization: unifying the algebrization and relativization barriers. ECCC TR16-040, 2016."}</Entry>
                    <Entry>{"babai2016: L. Babai. Graph isomorphism in quasipolynomial time. In Proc. ACM STOC, pages 684–697, 2016. arXiv:1512.03547. See also correction at people.cs.uchicago.edu/~laci/update.html."}</Entry>
                    <Entry>{"babai1983: L. Babai and E. M. Luks. Canonical labeling of graphs. In Proc. ACM STOC, pages 171–183, 1983."}</Entry>
                    <Entry>{"backurs2015: A. Backurs and P. Indyk. Edit distance cannot be computed in strongly subquadratic time (unless SETH is false). In Proc. ACM STOC, pages 51–58, 2015."}</Entry>
                    <Entry>{"baker1975: T. Baker, J. Gill, and R. Solovay. Relativizations of the P=?NP question. SIAM J. Comput., 4:431–442, 1975."}</Entry>
                    <Entry>{"banerjee2012: A. Banerjee, C. Peikert, and A. Rosen. Pseudorandom functions and lattices. In Proc. of EUROCRYPT, pages 719–737, 2012."}</Entry>
                    <Entry>{"beame2001: P. Beame and T. Pitassi. Propositional proof complexity: past, present, and future. Current Trends in Theoretical Computer Science, pages 42–70, 2001."}</Entry>
                    <Entry>{"beame2003: P. Beame, M. E. Saks, X. Sun, and E. Vee. Time-space trade-off lower bounds for randomized computation of decision problems. J. of the ACM, 50(2):154–195, 2003. Earlier version in Proc. IEEE FOCS’2000, pp. 169-179."}</Entry>
                    <Entry>{"beigel1994: R. Beigel and J. Tarui. On ACC. Computational Complexity, 4:350–366, 1994. Earlier version in Proc. IEEE FOCS’1991, pp. 783-792."}</Entry>
                    <Entry>{"bendavid1992: S. Ben-David and S. Halevi. On the independence of P versus NP. Technical Report TR714, Technion, 1992."}</Entry>
                    <Entry>{"bensasson2001: E. Ben-Sasson and A. Wigderson. Short proofs are narrow - resolution made simple. J. of the ACM, 48(2):149–169, 2001. Earlier version in Proc. IEEE Complexity’1999."}</Entry>
                    <Entry>{"bennett1997: C. Bennett, E. Bernstein, G. Brassard, and U. Vazirani. Strengths and weaknesses of quantum computing. SIAM J. Comput., 26(5):1510–1523, 1997. quant-ph/9701001."}</Entry>
                    <Entry>{"bennett1981: C. H. Bennett and J. Gill. Relative to a random oracle A, Pᴬ ≠ NPᴬ ≠ coNPᴬ with probability 1. SIAM J. Comput., 10(1):96–113, 1981."}</Entry>
                    <Entry>{"bernstein1997: E. Bernstein and U. Vazirani. Quantum complexity theory. SIAM J. Comput., 26(5):1411– 1473, 1997. Earlier version in Proc. ACM STOC’1993."}</Entry>
                    <Entry>{"bini1980: D. Bini. Relations between exact and approximate bilinear algorithms. Applications. Calcolo, 17(1):87–97, 1980."}</Entry>
                    <Entry>{"bini1980b: D. Bini, G. Lotti, and F. Romani. Approximate solutions for the bilinear form computational problem. SIAM J. Comput., 9(4):692–697, 1980."}</Entry>
                    <Entry>{"blasiak2015: J. Blasiak, K. Mulmuley, and M. Sohoni. Geometric complexity theory IV: nonstandard quantum group for the Kronecker problem, volume 235 of Memoirs of the American Mathematical Society. 2015. arXiv:cs.CC/0703110."}</Entry>
                    <Entry>{"blum1997: L. Blum, F. Cucker, M. Shub, and S. Smale. Complexity and Real Computation. SpringerVerlag, 1997."}</Entry>
                    <Entry>{"blum1967: M. Blum. A machine-independent theory of the complexity of recursive functions. J. of the ACM, 14(2):322–336, 1967."}</Entry>
                    <Entry>{"bogdanov2006: A. Bogdanov and L. Trevisan. Average-case complexity. Foundations and Trends in Theoretical Computer Science, 2(1), 2006. ECCC TR06-073."}</Entry>
                    <Entry>{"bookatz2014: A. D. Bookatz. QMA-complete problems. Quantum Information and Computation, 14(5- 6):361–383, 2014. arXiv:1212.6312."}</Entry>
                    <Entry>{"boppana1987: R. B. Boppana, J. Håstad, and S. Zachos. Does co-NP have short interactive proofs? Inform. Proc. Lett., 25:127–132, 1987."}</Entry>
                    <Entry>{"brassard1979: G. Brassard. A note on the complexity of cryptography. IEEE Trans. Information Theory, 25(2):232–233, 1979."}</Entry>
                    <Entry>{"braunstein2005: A. Braunstein, M. Mézard, and R. Zecchina. Survey propagation: An algorithm for satisfiability. Random Structures and Algorithms, 27(2):201–226, 2005."}</Entry>
                    <Entry>{"braverman2009: M. Braverman. Poly-logarithmic independence fools AC⁰ circuits. In Proc. Conference on Computational Complexity, pages 3–8, 2009. ECCC TR09-011."}</Entry>
                    <Entry>{"bshouty1995: N. H. Bshouty, R. Cleve, and W. Eberly. Size-depth tradeoffs for algebraic formulae. SIAM J. Comput., 24(4):682–705, 1995. Earlier version in Proc. IEEE FOCS’1991, pp. 334-341."}</Entry>
                    <Entry>{"bshouty1996: N. H. Bshouty, R. Cleve, R. Gavaldà, S. Kannan, and C. Tamon. Oracles and queries that are sufficient for exact learning. J. Comput. Sys. Sci., 52(3):421–433, 1996."}</Entry>
                    <Entry>{"buhler1993: J. Buhler, R. Crandall, R. Ernvall, and T. Metsänkylä. Irregular primes and cyclotomic invariants to four million. Mathematics of Computation, 61(203):151–153, 1993."}</Entry>
                    <Entry>{"buhrman1998: H. Buhrman, L. Fortnow, and T. Thierauf. Nonrelativizing separations. In Proc. Conference on Computational Complexity, pages 8–12, 1998."}</Entry>
                    <Entry>{"burgisser2000: P. Bürgisser. Completeness and reduction in algebraic complexity theory. 2000. Available at math-www.uni-paderborn.de/agpb/work/habil.ps."}</Entry>
                    <Entry>{"burgisser2000b: P. Bürgisser. Cook’s versus Valiant’s hypothesis. Theoretical Comput. Sci., 235(1):71–88, 2000."}</Entry>
                    <Entry>{"burgisser2009: P. Bürgisser. On defining integers and proving arithmetic circuit lower bounds. Computational Complexity, 18(1):81–103, 2009. Earlier version in Proc. STACS’2007, pp. 133-144."}</Entry>
                    <Entry>{"burgisser2013: P. Bürgisser and C. Ikenmeyer. Deciding positivity of Littlewood-Richardson coefficients. SIAM J. Discrete Math., 27(4):1639–1681, 2013."}</Entry>
                    <Entry>{"burgisser2013b: P. Bürgisser and C. Ikenmeyer. Explicit lower bounds via geometric complexity theory. In Proc. ACM STOC, pages 141–150, 2013. arXiv:1210.8368."}</Entry>
                    <Entry>{"burgisser2016: P. Bürgisser, C. Ikenmeyer, and G. Panova. No occurrence obstructions in geometric complexity theory. In Proc. IEEE FOCS, pages 386–395, 2016. arXiv:1604.06431."}</Entry>
                    <Entry>{"buss2015: S. R. Buss and R. Williams. Limits on alternation trading proofs for time-space lower bounds. Computational Complexity, 24(3):533–600, 2015. Earlier version in Proc. IEEE Complexity’2012, pp. 181-191."}</Entry>
                    <Entry>{"cai2010: J.-Y. Cai, X. Chen, and D. Li. Quadratic lower bound for permanent vs. determinant in any characteristic. 19(1):37–56, 2010. Earlier version in Proc. ACM STOC’2008, pp. 491-498."}</Entry>
                    <Entry>{"chen2016: R. Chen, R. Santhanam, and S. Srinivasan. Average-case lower bounds and satisfiability algorithms for small threshold circuits. In Proc. Conference on Computational Complexity, number 1, 2016. ECCC TR15-191."}</Entry>
                    <Entry>{"chen2015: X. Chen and X. Deng. The circuit-input game, natural proofs, and testing circuits with data. In Proc. Innovations in Theoretical Computer Science (ITCS), pages 263–270, 2015."}</Entry>
                    <Entry>{"cobham1965: A. Cobham. The intrinsic computational difficulty of functions. In Proceedings of Logic, Methodology, and Philosophy of Science II. North Holland, 1965."}</Entry>
                    <Entry>{"cook2000: S. Cook. The P versus NP problem, 2000. Clay Math Institute official problem description. At www.claymath.org/sites/default/files/pvsnp.pdf."}</Entry>
                    <Entry>{"cook2017: S. Cook and B. Kapron. A survey of classes of primitive recursive functions, 2017 (originally 1967). ECCC TR17-001."}</Entry>
                    <Entry>{"cook1971: S. A. Cook. The complexity of theorem-proving procedures. In Proc. ACM STOC, pages 151–158, 1971."}</Entry>
                    <Entry>{"cook1972: S. A. Cook. A hierarchy for nondeterministic time complexity. In Proc. ACM STOC, pages 187–192, 1972."}</Entry>
                    <Entry>{"coppersmith1982: D. Coppersmith. Rapid multiplication of rectangular matrices. SIAM J. Comput., 11(3):467– 471, 1982."}</Entry>
                    <Entry>{"coppersmith1990: D. Coppersmith and S. Winograd. Matrix multiplication via arithmetic progressions. Journal of Symbolic Computation, 9(3):251–280, 1990. Earlier version in Proc. ACM STOC’1987."}</Entry>
                    <Entry>{"cormen2001: T. H. Cormen, C. E. Leiserson, R. L. Rivest, and C. Stein. Introduction to Algorithms (2nd edition). MIT Press, 2001."}</Entry>
                    <Entry>{"daskalakis2009: C. Daskalakis, P. W. Goldberg, and C. H. Papadimitriou. The complexity of computing a Nash equilibrium. Commun. of the ACM, 52(2):89–97, 2009. Earlier version in Proc. ACM STOC’2006."}</Entry>
                    <Entry>{"davis1962: M. Davis, G. Logemann, and D. Loveland. A machine program for theorem proving. Commun. of the ACM, 5(7):394–397, 1962."}</Entry>
                    <Entry>{"deolalikar2010: V. Deolalikar. P ≠ NP. Archived version available at www.win.tue.nl/~gwoegi/P-versusNP/Deolalikar.pdf, 2010."}</Entry>
                    <Entry>{"edmonds1965: J. Edmonds. Paths, trees, and flowers. Canadian Journal of Mathematics, 17(3):449–467, 1965."}</Entry>
                    <Entry>{"fagin1975: R. Fagin. Monadic generalized spectra. Math. Logik Grundlag. Math., 21:89–96, 1975."}</Entry>
                    <Entry>{"fagin1993: R. Fagin. Finite model theory - a personal perspective. Theoretical Comput. Sci., 116:3–31, 1993."}</Entry>
                    <Entry>{"fellows1989: M. R. Fellows. The Robertson-Seymour theorems: a survey of applications. Contemporary Mathematics, 89:1–18, 1989."}</Entry>
                    <Entry>{"fiorini2015: S. Fiorini, S. Massar, S. Pokutta, H. R. Tiwary, and R. de Wolf. Exponential lower bounds for polytopes in combinatorial optimization. J. of the ACM, 62(2):17, 2015. Earlier version in Proc. ACM STOC’2012, pp. 95-106."}</Entry>
                    <Entry>{"forbes2016: M. Forbes, M. Kumar, and R. Saptharishi. Functional lower bounds for arithmetic circuits and connections to boolean circuit complexity. In Proc. Conference on Computational Complexity, number 33, 2016. ECCC TR16-045."}</Entry>
                    <Entry>{"forbes2017: M. Forbes, A. Shpilka, and B. Lee Volk. Succinct hitting sets and barriers to proving algebraic circuits lower bounds. ECCC TR17-007, 2017."}</Entry>
                    <Entry>{"ford1962: L. R. Ford and D. R. Fulkerson. Flows in Networks. Princeton, 1962."}</Entry>
                    <Entry>{"fortnow2000: L. Fortnow. Time-space tradeoffs for satisfiability. J. Comput. Sys. Sci., 60(2):337–353, 2000. Earlier version in Proc. IEEE Complexity’1997, pp. 52-60."}</Entry>
                    <Entry>{"fortnow2009: L. Fortnow. The status of the P versus NP problem. Commun. of the ACM, 52(9):78–86, 2009."}</Entry>
                    <Entry>{"fortnow2009b: L. Fortnow. The Golden Ticket: P, NP, and the Search for the Impossible. Princeton University Press, 2009."}</Entry>
                    <Entry>{"fortnow2000b: L. Fortnow and D. van Melkebeek. Time-space tradeoffs for nondeterministic computation. In Proc. Conference on Computational Complexity, pages 2–13, 2000."}</Entry>
                    <Entry>{"fortnow2008: L. Fortnow, A. Pavan, and S. Sengupta. Proving SAT does not have small circuits with an application to the two queries problem. J. Comput. Sys. Sci., 74(3):358–363, 2008. Earlier version in Proc. IEEE Complexity’2003, pp. 347-350."}</Entry>
                    <Entry>{"fortnow1988: L. Fortnow and M. Sipser. Are there interactive protocols for co-NP languages? Inform. Proc. Lett., 28:249–251, 1988."}</Entry>
                    <Entry>{"fraenkel1981: A. Fraenkel and D. Lichtenstein. Computing a perfect strategy for n×n chess requires time exponential in n. Journal of Combinatorial Theory A, 31:199–214, 1981."}</Entry>
                    <Entry>{"friedman1971: H. Friedman. Higher set theory and mathematical practice. Annals of Mathematical Logic, 2(3):325–357, 1971."}</Entry>
                    <Entry>{"friedman1987: H. Friedman, N. Robertson, and P. Seymour. The metamathematics of the graph minor theorem. In S. Simpson, editor, Logic and Combinatorics, volume 65 of AMS Contemporary Mathematics Series, pages 229–261. 1987."}</Entry>
                    <Entry>{"friedman2016: H. M. Friedman. Large cardinals and emulations. At www.cs.nyu.edu/pipermail/fom/2016- November/020170.html, 2016."}</Entry>
                    <Entry>{"furst1984: M. Furst, J. B. Saxe, and M. Sipser. Parity, circuits, and the polynomial time hierarchy. Math. Systems Theory, 17:13–27, 1984. Earlier version in Proc. IEEE FOCS’1981, pp. 260-270."}</Entry>
                    <Entry>{"legall2014: F. Le Gall. Powers of tensors and fast matrix multiplication. In Proc. of Intl. Symposium on Algorithms and Computation (ISAAC), pages 296–303, 2014. arXiv:1401.7714."}</Entry>
                    <Entry>{"garey1979: M. R. Garey and D. S. Johnson. Computers and Intractability: A Guide to the Theory of NP-Completeness. W. H. Freeman, 1979."}</Entry>
                    <Entry>{"gasarch2002: W. Gasarch. The P=?NP poll. SIGACT News, 33(2):34–47, June 2002."}</Entry>
                    <Entry>{"gasarch2012: W. Gasarch. The second P=?NP poll. SIGACT News, 43(2):53–77, June 2012."}</Entry>
                    <Entry>{"goldreich1986: O. Goldreich, S. Goldwasser, and S. Micali. How to construct random functions. J. of the ACM, 33(4):792–807, 1986. Earlier version in Proc. IEEE FOCS’1984, pp. 464-479."}</Entry>
                    <Entry>{"goldreich1991: O. Goldreich, S. Micali, and A. Wigderson. Proofs that yield nothing but their validity or all languages in NP have zero-knowledge proof systems. J. of the ACM, 38(1):691–729, 1991."}</Entry>
                    <Entry>{"goldwasser1989: S. Goldwasser and M. Sipser. Private coins versus public coins in interactive proof systems. In Randomness and Computation, volume 5 of Advances in Computing Research. JAI Press, 1989."}</Entry>
                    <Entry>{"goodstein1944: R. Goodstein. On the restricted ordinal theorem. J. Symbolic Logic, 9:33–41, 1944."}</Entry>
                    <Entry>{"grenet2011: B. Grenet. An upper bound for the permanent versus determinant problem. www.lirmm.fr/~grenet/publis/Gre11.pdf, 2011."}</Entry>
                    <Entry>{"grigoriev1998: D. Grigoriev and M. Karpinski. An exponential lower bound for depth 3 arithmetic circuits. In Proc. ACM STOC, pages 577–582, 1998."}</Entry>
                    <Entry>{"grigoriev2000: D. Grigoriev and A. A. Razborov. Exponential lower bounds for depth 3 arithmetic circuits in algebras of functions over finite fields. Appl. Algebra Eng. Commun. Comput., 10(6):465–487, 2000. Earlier version in Proc. IEEE FOCS’1998, pp. 269-278."}</Entry>
                    <Entry>{"grochow2012: J. A. Grochow. Symmetry and equivalence relations in classical and geometric complexity theory. PhD thesis, 2012."}</Entry>
                    <Entry>{"grochow2015: J. A. Grochow. Unifying known lower bounds via Geometric Complexity Theory. Computational Complexity, 24(2):393–475, 2015. Earlier version in Proc. IEEE Complexity’2014, pp. 274-285."}</Entry>
                    <Entry>{"grochow2017: J. A. Grochow, M. Kumar, M. Saks, and S. Saraf. Towards an algebraic natural proofs barrier via polynomial identity testing. arXiv:1701.01717, 2017."}</Entry>
                    <Entry>{"grover1996: L. K. Grover. A fast quantum mechanical algorithm for database search. In Proc. ACM STOC, pages 212–219, 1996. quant-ph/9605043."}</Entry>
                    <Entry>{"gupta2013: A. Gupta, P. Kamath, N. Kayal, and R. Saptharishi. Arithmetic circuits: a chasm at depth three. In Proc. IEEE FOCS, pages 578–587, 2013."}</Entry>
                    <Entry>{"gupta2014: A. Gupta, P. Kamath, N. Kayal, and R. Saptharishi. Approaching the chasm at depth four. J. of the ACM, 61(6):1–16, 2014. Earlier version in Proc. IEEE Complexity’2013, pp. 65-73."}</Entry>
                    <Entry>{"gurvits2005: L. Gurvits. On the complexity of mixed discriminants and related problems. In Mathematical Foundations of Computer Science, pages 447–458, 2005."}</Entry>
                    <Entry>{"haken1985: A. Haken. The intractability of resolution. Theoretical Comput. Sci., 39:297–308, 1985."}</Entry>
                    <Entry>{"hartmanis1965: J. Hartmanis and R. E. Stearns. On the computational complexity of algorithms. Transactions of the American Mathematical Society, 117:285–306, 1965."}</Entry>
                    <Entry>{"hastad1987: J. Håstad. Computational Limitations for Small Depth Circuits. MIT Press, 1987."}</Entry>
                    <Entry>{"hastad1998: J. Håstad. The shrinkage exponent of De Morgan formulas is 2. SIAM J. Comput., 27(1):48– 64, 1998. Earlier version in Proc. IEEE FOCS’1993, pp. 114-123."}</Entry>
                    <Entry>{"hastad2001: J. Håstad. Some optimal inapproximability results. J. of the ACM, 48:798–859, 2001. Earlier version in Proc. ACM STOC’1997, pp. 1-10."}</Entry>
                    <Entry>{"hastad1999: J. Håstad, R. Impagliazzo, L. A. Levin, and M. Luby. A pseudorandom generator from any one-way function. SIAM J. Comput., 28(4):1364–1396, 1999."}</Entry>
                    <Entry>{"hauenstein2013: J. D. Hauenstein, C. Ikenmeyer, and J. M. Landsberg. Equations for lower bounds on border rank. Experimental Mathematics, 22(4):372–383, 2013. arXiv:1305.0779."}</Entry>
                    <Entry>{"held1962: M. Held and R. M. Karp. A dynamic programming approach to sequencing problems. Journal of the Society for Industrial and Applied Mathematics, 10(1):196–210, 1962."}</Entry>
                    <Entry>{"ikenmeyer2015: C. Ikenmeyer, K. Mulmuley, and M. Walter. On vanishing of Kronecker coefficients. arXiv:1507.02955, 2015."}</Entry>
                    <Entry>{"ikenmeyer2016: C. Ikenmeyer and G. Panova. Rectangular Kronecker coefficients and plethysms in geometric complexity theory. In Proc. IEEE FOCS, pages 396–405, 2016. arXiv:1512.03798."}</Entry>
                    <Entry>{"immerman1988: N. Immerman. Nondeterministic space is closed under complementation. SIAM J. Comput., 17(5):935–938, 1988. Earlier version in Proc. IEEE Structure in Complexity Theory, 1988."}</Entry>
                    <Entry>{"immerman1998: N. Immerman. Descriptive Complexity. Springer, 1998."}</Entry>
                    <Entry>{"impagliazzo2009: R. Impagliazzo, V. Kabanets, and A. Kolokolova. An axiomatic approach to algebrization. In Proc. ACM STOC, pages 695–704, 2009."}</Entry>
                    <Entry>{"impagliazzo2002: R. Impagliazzo, V. Kabanets, and A. Wigderson. In search of an easy witness: exponential time vs. probabilistic polynomial time. J. Comput. Sys. Sci., 65(4):672–694, 2002. Earlier version in Proc. IEEE Complexity’2001, pp. 2-12."}</Entry>
                    <Entry>{"impagliazzo1993: R. Impagliazzo and N. Nisan. The effect of random restrictions on formula size. Random Structures and Algorithms, 4(2):121–134, 1993."}</Entry>
                    <Entry>{"impagliazzo1997: R. Impagliazzo and A. Wigderson. P=BPP unless E has subexponential circuits: derandomizing the XOR Lemma. In Proc. ACM STOC, pages 220–229, 1997."}</Entry>
                    <Entry>{"jahanjou2015: H. Jahanjou, E. Miles, and E. Viola. Local reductions. In Proc. Intl. Colloquium on Automata, Languages, and Programming (ICALP), pages 749–760, 2015. arXiv:1311.3171."}</Entry>
                    <Entry>{"jerrum1982: M. Jerrum and M. Snir. Some exact complexity results for straight-line computations over semirings. J. of the ACM, 29(3):874–897, 1982."}</Entry>
                    <Entry>{"kabanets2000: V. Kabanets and J.-Y. Cai. Circuit minimization problem. In Proc. ACM STOC, pages 73–79, 2000. TR99-045."}</Entry>
                    <Entry>{"kabanets2004: V. Kabanets and R. Impagliazzo. Derandomizing polynomial identity testing means proving circuit lower bounds. Computational Complexity, 13(1-2):1–46, 2004. Earlier version in Proc. ACM STOC’2003. ECCC TR02-055."}</Entry>
                    <Entry>{"kaltofen2005: E. Kaltofen and G. Villard. On the complexity of computing determinants. Computational Complexity, 13(3-4):91–130, 2005."}</Entry>
                    <Entry>{"kane2016: D. M. Kane and R. Williams. Super-linear gate and super-quadratic wire lower bounds for depth-two and depth-three threshold circuits. In Proc. ACM STOC, pages 633–643, 2016. arXiv:1511.07860."}</Entry>
                    <Entry>{"kannan1982: R. Kannan. Circuit-size lower bounds and non-reducibility to sparse sets. Information and Control, 55:40–56, 1982. Earlier version in Proc. IEEE FOCS’1981, pp. 304-309."}</Entry>
                    <Entry>{"karchmer1990: M. Karchmer and A. Wigderson. Monotone circuits for connectivity require super-logarithmic depth. SIAM J. Comput., 3:255–265, 1990. Earlier version in Proc. ACM STOC’1988, pp. 539-550."}</Entry>
                    <Entry>{"karp1972: R. M. Karp. Reducibility among combinatorial problems. In R. E. Miller and J. W. Thatcher, editors, Complexity of Computer Computations, pages 85–103. Plenum Press, 1972."}</Entry>
                    <Entry>{"karp1982: R. M. Karp and R. J. Lipton. Turing machines that take advice. Enseign. Math., 28:191–201, 1982. Earlier version in Proc. ACM STOC’1980, pp. 302-309."}</Entry>
                    <Entry>{"kayal2012: N. Kayal. Affine projections of polynomials: extended abstract. In Proc. ACM STOC, pages 643–662, 2012."}</Entry>
                    <Entry>{"kayal2014: N. Kayal, N. Limaye, C. Saha, and S. Srinivasan. An exponential lower bound for homogeneous depth four arithmetic formulas. In Proc. IEEE FOCS, pages 61–70, 2014."}</Entry>
                    <Entry>{"kayal2014b: N. Kayal, C. Saha, and R. Saptharishi. A super-polynomial lower bound for regular arithmetic formulas. In Proc. ACM STOC, pages 146–153, 2014."}</Entry>
                    <Entry>{"kayal2016: N. Kayal, C. Saha, and S. Tavenas. An almost cubic lower bound for depth three arithmetic circuits. In Proc. Intl. Colloquium on Automata, Languages, and Programming (ICALP), number 33, 2016. ECCC TR16-006."}</Entry>
                    <Entry>{"khot2010: S. Khot. On the Unique Games Conjecture. In Proc. Conference on Computational Complexity, pages 99–121, 2010."}</Entry>
                    <Entry>{"khrapchenko1971: V. M. Khrapchenko. A method of determining lower bounds for the complexity of π schemes. Matematischi Zametki, 10:83–92, 1971. In Russian."}</Entry>
                    <Entry>{"kirby1982: L. Kirby and J. Paris. Accessible independence results for Peano arithmetic. Bulletin of the London Mathematical Society, 14:285–293, 1982."}</Entry>
                    <Entry>{"klivans2002: A. Klivans and D. van Melkebeek. Graph nonisomorphism has subexponential size proofs unless the polynomial-time hierarchy collapses. SIAM J. Comput., 31:1501–1526, 2002. Earlier version in Proc. ACM STOC’1999."}</Entry>
                    <Entry>{"knuth2014: D. E. Knuth and E. G. Daylight. Algorithmic Barriers Falling: P=NP? Lonely Scholar, 2014."}</Entry>
                    <Entry>{"knutson1999: A. Knutson and T. Tao. The honeycomb model of GLₙ(ℂ) tensor products I: proof of the saturation conjecture. J. Amer. Math. Soc., 12(4):1055–1090, 1999."}</Entry>
                    <Entry>{"koiran2011: P. Koiran. Shallow circuits with high-powered inputs. In Proc. Innovations in Theoretical Computer Science (ITCS), pages 309–320, 2011."}</Entry>
                    <Entry>{"koiran2012: P. Koiran. Arithmetic circuits: the chasm at depth four gets wider. Theor. Comput. Sci., 448:56–65, 2012."}</Entry>
                    <Entry>{"kushilevitz1997: E. Kushilevitz and N. Nisan. Communication Complexity. Cambridge, 1997."}</Entry>
                    <Entry>{"ladner1975: R. E. Ladner. On the structure of polynomial time reducibility. J. of the ACM, 22:155–171, 1975."}</Entry>
                    <Entry>{"landsberg2006: J. M. Landsberg. The border rank of the multiplication of two by two matrices is seven. J. Amer. Math. Soc., 19(2):447–459, 2006. arXiv:math/0407224."}</Entry>
                    <Entry>{"landsberg2015: J. M. Landsberg. Geometric complexity theory: an introduction for geometers. Annali dell’Universita di Ferrara, 61(1):65–117, 2015. arXiv:1305.7387."}</Entry>
                    <Entry>{"landsberg2016: J. M. Landsberg and M. Michalek. A 2n² − log(n) − 1 lower bound for the border rank of matrix multiplication. 2016. arXiv:1608.07486."}</Entry>
                    <Entry>{"landsberg2015b: J. M. Landsberg and G. Ottaviani. New lower bounds for the border rank of matrix multiplication. Theory of Computing, 11:285–298, 2015. arXiv:1112.6007."}</Entry>
                    <Entry>{"landsberg2016b: J. M. Landsberg and N. Ressayre. Permanent v. determinant: an exponential lower bound assuming symmetry. In Proc. Innovations in Theoretical Computer Science (ITCS), pages 29–35, 2016. arXiv:1508.05788."}</Entry>
                    <Entry>{"lautemann1983: C. Lautemann. BPP and the polynomial hierarchy. Inform. Proc. Lett., 17:215–217, 1983."}</Entry>
                    <Entry>{"lee2015: J. R. Lee, P. Raghavendra, and D. Steurer. Lower bounds on the size of semidefinite programming relaxations. In Proc. ACM STOC, pages 567–576, 2015."}</Entry>
                    <Entry>{"levin1973: L. A. Levin. Universal sequential search problems. Problems of Information Transmission, 9(3):115–116, 1973."}</Entry>
                    <Entry>{"levin1974: L. A. Levin. Laws of information conservation (non-growth) and aspects of the foundations of probability theory. Problems of Information Transmission, 10(3):206–210, 1974."}</Entry>
                    <Entry>{"li1992: M. Li and P. M. B. Vitányi. Average case complexity under the universal distribution equals worst-case complexity. Inform. Proc. Lett., 42(3):145–149, 1992."}</Entry>
                    <Entry>{"linial1993: N. Linial, Y. Mansour, and N. Nisan. Constant depth circuits, Fourier transform, and learnability. J. of the ACM, 40(3):607–620, 1993. Earlier version in Proc. IEEE FOCS’1989, pp. 574-579."}</Entry>
                    <Entry>{"linial1990: N. Linial and N. Nisan. Approximate inclusion-exclusion. Combinatorica, 10(4):349–365, 1990. Earlier version in Proc. ACM STOC’1990."}</Entry>
                    <Entry>{"lipton1991: R. J. Lipton. New directions in testing. In Distributed Computing and Cryptography, pages 191–202. AMS, 1991."}</Entry>
                    <Entry>{"lipton2010: R. J. Lipton. Galactic algorithms, 2010. rjlipton.wordpress.com/2010/10/23/galacticalgorithms/."}</Entry>
                    <Entry>{"lipton2014: R. J. Lipton and K. W. Regan. Practically P=NP?, 2014. rjlipton.wordpress.com/2014/02/28/practically-pnp/."}</Entry>
                    <Entry>{"lipton1999: R. J. Lipton and A. Viglas. On the complexity of SAT. In Proc. IEEE FOCS, pages 459–464, 1999."}</Entry>
                    <Entry>{"luna1973: D. Luna. Slices étales. Mémoires de la Société Mathématique de France, 33:81–105, 1973."}</Entry>
                    <Entry>{"lund1992: C. Lund, L. Fortnow, H. Karloff, and N. Nisan. Algebraic methods for interactive proof systems. J. of the ACM, 39:859–868, 1992. Earlier version in Proc. IEEE FOCS’1990, pp. 2-10."}</Entry>
                    <Entry>{"martin1975: D. A. Martin. Borel determinacy. Annals of Mathematics, 102(2):363–371, 1975."}</Entry>
                    <Entry>{"mccreight1969: E. M. McCreight and A. R. Meyer. Classes of computable functions defined by bounds on computation: preliminary report. In Proc. ACM STOC, pages 79–88, 1969."}</Entry>
                    <Entry>{"vanmelkebeek2007: D. van Melkebeek. A survey of lower bounds for satisfiability and related problems. Foundations and Trends in Theoretical Computer Science, 2:197–303, 2007. ECCC TR07-099."}</Entry>
                    <Entry>{"mignon2004: T. Mignon and N. Ressayre. A quadratic bound for the determinant and permanent problem. International Mathematics Research Notices, (79):4241–4253, 2004."}</Entry>
                    <Entry>{"miller1976: G. L. Miller. Riemann’s hypothesis and tests for primality. J. Comput. Sys. Sci., 13:300–317, 1976. Earlier version in Proc. ACM STOC’1975."}</Entry>
                    <Entry>{"moore2011: C. Moore and S. Mertens. The Nature of Computation. Oxford University Press, 2011."}</Entry>
                    <Entry>{"moran1981: S. Moran. Some results on relativized deterministic and nondeterministic time hierarchies. J. Comput. Sys. Sci., 22(1):1–8, 1981."}</Entry>
                    <Entry>{"moylett2016: D. J. Moylett, N. Linden, and A. Montanaro. Quantum speedup of the Travelling Salesman Problem for bounded-degree graphs. arXiv:1612.06203, 2016."}</Entry>
                    <Entry>{"mulmuley: K. Mulmuley. GCT publications web page. ramakrishnadas.cs.uchicago.edu."}</Entry>
                    <Entry>{"mulmuley1999: K. Mulmuley. Lower bounds in a parallel model without bit operations. SIAM J. Comput., 28(4):1460–1509, 1999."}</Entry>
                    <Entry>{"mulmuley2007: K. Mulmuley. Geometric complexity theory VII: nonstandard quantum group for the plethysm problem. Technical Report TR-2007-14, University of Chicago, 2007. arXiv:0709.0749."}</Entry>
                    <Entry>{"mulmuley2007b: K. Mulmuley. Geometric complexity theory VIII: on canonical bases for the nonstandard quantum groups. Technical Report TR-2007-15, University of Chicago, 2007. arXiv:0709.0751."}</Entry>
                    <Entry>{"mulmuley2010: K. Mulmuley. Explicit proofs and the flip. arXiv:1009.0246, 2010."}</Entry>
                    <Entry>{"mulmuley2011: K. Mulmuley. Geometric complexity theory VI: the flip via positivity. Technical report, University of Chicago, 2011. arXiv:0704.0229."}</Entry>
                    <Entry>{"mulmuley2011b: K. Mulmuley. On P vs. NP and geometric complexity theory: dedicated to Sri Ramakrishna. J. of the ACM, 58(2):5, 2011."}</Entry>
                    <Entry>{"mulmuley2012: K. Mulmuley. The GCT program toward the P vs. NP problem. Commun. of the ACM, 55(6):98–107, June 2012."}</Entry>
                    <Entry>{"mulmuley2012b: K. Mulmuley. Geometric complexity theory V: equivalence between blackbox derandomization of polynomial identity testing and derandomization of Noether’s Normalization Lemma. In Proc. IEEE FOCS, pages 629–638, 2012. Full version available at arXiv:1209.5993."}</Entry>
                    <Entry>{"mulmuley2012c: K. Mulmuley, H. Narayanan, and M. Sohoni. Geometric complexity theory III: on deciding nonvanishing of a Littlewood-Richardson coefficient. Journal of Algebraic Combinatorics, 36(1):103–110, 2012."}</Entry>
                    <Entry>{"mulmuley2001: K. Mulmuley and M. Sohoni. Geometric complexity theory I: An approach to the P vs. NP and related problems. SIAM J. Comput., 31(2):496–526, 2001."}</Entry>
                    <Entry>{"mulmuley2008: K. Mulmuley and M. Sohoni. Geometric complexity theory II: Towards explicit obstructions for embeddings among class varieties. SIAM J. Comput., 38(3):1175–1206, 2008."}</Entry>
                    <Entry>{"murray2015: C. D. Murray and R. R. Williams. On the (non) NP-hardness of computing circuit complexity. In Proc. Conference on Computational Complexity, pages 365–380, 2015."}</Entry>
                    <Entry>{"naor2004: J. Naor and M. Naor. Number-theoretic constructions of efficient pseudo-random functions. J. of the ACM, 51(2):231–262, 2004. Earlier version in Proc. IEEE FOCS’1997."}</Entry>
                    <Entry>{"nash1952: J. Nash. Some games and machines for playing them. Technical Report D-1164, Rand Corp., 1952."}</Entry>
                    <Entry>{"nash1955: J. Nash. Letter to the United States National Security Agency, 1955. Available at www.nsa.gov/public info/ files/nash letters/nash letters1.pdf."}</Entry>
                    <Entry>{"nielsen2000: M. Nielsen and I. Chuang. Quantum Computation and Quantum Information. Cambridge University Press, 2000."}</Entry>
                    <Entry>{"nisan1997: N. Nisan and A. Wigderson. Lower bounds on arithmetic circuits via partial derivatives. Computational Complexity, 6(3):217–234, 1997. Earlier version in Proc. IEEE FOCS’1995, pp. 16-25."}</Entry>
                    <Entry>{"papadimitriou1994: C. H. Papadimitriou. Computational Complexity. Addison-Wesley, 1994."}</Entry>
                    <Entry>{"paterson1993: M. Paterson and U. Zwick. Shrinkage of De Morgan formulae under restriction. Random Structures and Algorithms, 4(2):135–150, 1993."}</Entry>
                    <Entry>{"paul1983: W. J. Paul, N. Pippenger, E. Szemerédi, and W. T. Trotter. On determinism versus nondeterminism and related problems. In Proc. IEEE FOCS, pages 429–438, 1983."}</Entry>
                    <Entry>{"peikert2011: C. Peikert and B. Waters. Lossy trapdoor functions and their applications. SIAM J. Comput., 40(6):1803–1844, 2011. Earlier version in Proc. ACM STOC’2008."}</Entry>
                    <Entry>{"perelman2002: G. Perelman. The entropy formula for the Ricci flow and its geometric applications. arXiv:math/0211159, 2002."}</Entry>
                    <Entry>{"pomerance1996: C. Pomerance. A tale of two sieves. Notices of the American Mathematical Society, 43(12):1473–1485, 1996."}</Entry>
                    <Entry>{"pratt1975: V. R. Pratt. Every prime has a succinct certificate. SIAM J. Comput., 4(3):214–220, 1975."}</Entry>
                    <Entry>{"rabin1967: M. O. Rabin. Mathematical theory of automata. In Proc. Sympos. Appl. Math, volume 19, pages 153–175, 1967."}</Entry>
                    <Entry>{"rabin1980: M. O. Rabin. Probabilistic algorithm for testing primality. J. Number Theory, 12(1):128–138, 1980."}</Entry>
                    <Entry>{"raz2009: R. Raz. Multi-linear formulas for permanent and determinant are of super-polynomial size. J. of the ACM, 56(2):8, 2009. Earlier version in Proc. ACM STOC’2004, pp. 633-641. ECCC TR03-067."}</Entry>
                    <Entry>{"raz2010: R. Raz. Elusive functions and lower bounds for arithmetic circuits. Theory of Computing, 6:135–177, 2010. Earlier version in Proc. ACM STOC’2008."}</Entry>
                    <Entry>{"raz2013: R. Raz. Tensor-rank and lower bounds for arithmetic formulas. J. of the ACM, 60(6):40, 2013. Earlier version in Proc. ACM STOC’2010, pp. 659-666."}</Entry>
                    <Entry>{"raz2009b: R. Raz and A. Yehudayoff. Lower bounds and separations for constant depth multilinear circuits. Computational Complexity, 18(2):171–207, 2009. Earlier version in Proc. IEEE Complexity’2008, pp. 128-139."}</Entry>
                    <Entry>{"raz2011: R. Raz and A. Yehudayoff. Multilinear formulas, maximal-partition discrepancy and mixedsources extractors. J. Comput. Sys. Sci., 77(1):167–190, 2011. Earlier version in Proc. IEEE FOCS’2008, pp. 273-282."}</Entry>
                    <Entry>{"razborov1985: A. A. Razborov. Lower bounds for the monotone complexity of some Boolean functions. Doklady Akademii Nauk SSSR, 281(4):798–801, 1985. English translation in Soviet Math. Doklady 31:354-357, 1985."}</Entry>
                    <Entry>{"razborov1985b: A. A. Razborov. Lower bounds on monotone complexity of the logical permanent. Mathematical Notes, 37(6):485–493, 1985. Original Russian version in Matematischi Zametki."}</Entry>
                    <Entry>{"razborov1987: A. A. Razborov. Lower bounds for the size of circuits of bounded depth with basis {&, ⊕}. Mathematicheskie Zametki, 41(4):598–607, 1987. English translation in Math. Notes. Acad. Sci. USSR 41(4):333–338, 1987."}</Entry>
                    <Entry>{"razborov1995: A. A. Razborov. Unprovability of lower bounds on circuit size in certain fragments of bounded arithmetic. Izvestiya Math., 59(1):205–227, 1995."}</Entry>
                    <Entry>{"razborov1997: A. A. Razborov and S. Rudich. Natural proofs. J. Comput. Sys. Sci., 55(1):24–35, 1997. Earlier version in Proc. ACM STOC’1994, pp. 204-213."}</Entry>
                    <Entry>{"regan2002: K. W. Regan. Understanding the Mulmuley-Sohoni approach to P vs. NP. Bulletin of the EATCS, 78:86–99, 2002."}</Entry>
                    <Entry>{"rompel1990: J. Rompel. One-way functions are necessary and sufficient for secure signatures. In Proc. ACM STOC, pages 387–394, 1990."}</Entry>
                    <Entry>{"rossman2015: B. Rossman, R. A. Servedio, and L.-Y. Tan. An average-case depth hierarchy theorem for Boolean circuits. In Proc. IEEE FOCS, pages 1030–1048, 2015. ECCC TR15-065."}</Entry>
                    <Entry>{"rothvo2014: T. Rothvoß. The matching polytope has exponential extension complexity. In Proc. ACM STOC, pages 263–272, 2014."}</Entry>
                    <Entry>{"santhanam2007: R. Santhanam. Circuit lower bounds for Merlin-Arthur classes. In Proc. ACM STOC, pages 275–283, 2007."}</Entry>
                    <Entry>{"santhanam2014: R. Santhanam and R. Williams. On uniformity and circuit lower bounds. Computational Complexity, 23(2):177–205, 2014. Earlier version in Proc. IEEE Complexity’2013, pp. 15-23."}</Entry>
                    <Entry>{"saraf2014: S. Saraf. Recent progress on lower bounds for arithmetic circuits. In Proc. Conference on Computational Complexity, pages 155–160, 2014."}</Entry>
                    <Entry>{"savitch1970: W. J. Savitch. Relationships between nondeterministic and deterministic tape complexities. J. Comput. Sys. Sci., 4(2):177–192, 1970."}</Entry>
                    <Entry>{"schoning1999: U. Schöning. A probabilistic algorithm for k-SAT and constraint satisfaction problems. In Proc. IEEE FOCS, pages 410–414, 1999."}</Entry>
                    <Entry>{"schoning1998: U. Schöning and R. J. Pruim. Gems of Theoretical Computer Science. Springer, 1998."}</Entry>
                    <Entry>{"shamir1992: A. Shamir. IP=PSPACE. J. of the ACM, 39(4):869–877, 1992. Earlier version in Proc. IEEE FOCS’1990, pp. 11-15."}</Entry>
                    <Entry>{"shannon1949: C. Shannon. The synthesis of two-terminal switching circuits. Bell System Technical Journal, 28(1):59–98, 1949."}</Entry>
                    <Entry>{"shoenfield1961: J. Shoenfield. The problem of predicativity. In Y. Bar-Hillel et al., editor, Essays on the Foundations of Mathematics, pages 132–142. Hebrew University Magnes Press, 1961."}</Entry>
                    <Entry>{"shor1997: P. W. Shor. Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer. SIAM J. Comput., 26(5):1484–1509, 1997. Earlier version in Proc. IEEE FOCS’1994. quant-ph/9508027."}</Entry>
                    <Entry>{"shpilka2001: A. Shpilka and A. Wigderson. Depth-3 arithmetic circuits over fields of characteristic zero. Computational Complexity, 10(1):1–27, 2001. Earlier version in Proc. IEEE Complexity’1999."}</Entry>
                    <Entry>{"shpilka2010: A. Shpilka and A. Yehudayoff. Arithmetic circuits: a survey of recent results and open questions. Foundations and Trends in Theoretical Computer Science, 5(3-4):207–388, 2010."}</Entry>
                    <Entry>{"sipser1983: M. Sipser. A complexity theoretic approach to randomness. In Proc. ACM STOC, pages 330–335, 1983."}</Entry>
                    <Entry>{"sipser1992: M. Sipser. The history and status of the P versus NP question. In Proc. ACM STOC, pages 603–618, 1992."}</Entry>
                    <Entry>{"sipser2005: M. Sipser. Introduction to the Theory of Computation (Second Edition). Course Technology, 2005."}</Entry>
                    <Entry>{"smolensky1987: R. Smolensky. Algebraic methods in the theory of lower bounds for Boolean circuit complexity. In Proc. ACM STOC, pages 77–82, 1987."}</Entry>
                    <Entry>{"solovay1977: R. Solovay and V. Strassen. A fast Monte-Carlo test for primality. SIAM J. Comput., 6(1):84–85, 1977."}</Entry>
                    <Entry>{"spira1971: P. M. Spira. On time-hardware complexity tradeoffs for Boolean functions. In Proc. 4th Hawaii Symp. on System Sciences, pages 525–527, 1971."}</Entry>
                    <Entry>{"srinivasan2003: A. Srinivasan. On the approximability of clique and related maximization problems. J. Comput. Sys. Sci., 67(3):633–651, 2003. Earlier version in Proc. ACM STOC’2000, pp. 144- 152."}</Entry>
                    <Entry>{"stockmeyer1983: L. J. Stockmeyer. The complexity of approximate counting. In Proc. ACM STOC, pages 118–126, 1983."}</Entry>
                    <Entry>{"storer1983: J. A. Storer. On the complexity of chess. J. Comput. Sys. Sci., 27(1):77–100, 1983."}</Entry>
                    <Entry>{"stothers2010: A. J. Stothers. On the complexity of matrix multiplication. PhD thesis, 2010."}</Entry>
                    <Entry>{"strassen1969: V. Strassen. Gaussian elimination is not optimal. Numerische Mathematik, 14(13):354–356, 1969."}</Entry>
                    <Entry>{"strassen1973: V. Strassen. Vermeidung von divisionen. Journal für die Reine und Angewandte Mathematik, 264:182–202, 1973."}</Entry>
                    <Entry>{"subbotovskaya1961: B. A. Subbotovskaya. Realizations of linear functions by formulas using +, ×, −. Doklady Akademii Nauk SSSR, 136(3):553–555, 1961. In Russian."}</Entry>
                    <Entry>{"swart1986: E. R. Swart. P = NP. Technical report, University of Guelph, 1986. Revision in 1987."}</Entry>
                    <Entry>{"szelepcsenyi1988: R. Szelepcsényi. The method of forced enumeration for nondeterministic automata. Acta Informatica, 26(3):279–284, 1988."}</Entry>
                    <Entry>{"tal2014: A. Tal. Shrinkage of De Morgan formulae by spectral techniques. In Proc. IEEE FOCS, pages 551–560, 2014. ECCC TR14-048."}</Entry>
                    <Entry>{"entry1988: É. Tardos. The gap between monotone and non-monotone circuit complexity is exponential. Combinatorica, 8(1):141–142, 1988."}</Entry>
                    <Entry>{"tavenas2015: S. Tavenas. Improved bounds for reduction to depth 4 and depth 3. Inf. Comput., 240:2–11, 2015. Earlier version in Proc. MFCS’2013, pp. 813-824."}</Entry>
                    <Entry>{"toda1991: S. Toda. PP is as hard as the polynomial-time hierarchy. SIAM J. Comput., 20(5):865–877, 1991. Earlier version in Proc. IEEE FOCS’1989, pp. 514-519."}</Entry>
                    <Entry>{"trakhtenbrot1984: B. A. Trakhtenbrot. A survey of Russian approaches to perebor (brute-force search) algorithms. Annals of the History of Computing, 6(4):384–400, 1984."}</Entry>
                    <Entry>{"valiant1977: L. G. Valiant. Graph-theoretic arguments in low-level complexity. In Mathematical Foundations of Computer Science, pages 162–176, 1977."}</Entry>
                    <Entry>{"valiant1979: L. G. Valiant. Completeness classes in algebra. In Proc. ACM STOC, pages 249–261, 1979."}</Entry>
                    <Entry>{"valiant1979b: L. G. Valiant. The complexity of computing the permanent. Theoretical Comput. Sci., 8(2):189–201, 1979."}</Entry>
                    <Entry>{"valiant2006: L. G. Valiant. Accidental algorithms. In Proc. IEEE FOCS, pages 509–517, 2006."}</Entry>
                    <Entry>{"valiant1983: L. G. Valiant, S. Skyum, S. Berkowitz, and C. Rackoff. Fast parallel computation of polynomials using few processors. SIAM J. Comput., 12(4):641–644, 1983."}</Entry>
                    <Entry>{"various2011: Various authors. Deolalikar P vs NP paper (wiki page). Last modified 30 September 2011. michaelnielsen.org/polymath1/index.php?title=Deolalikar P vs NP paper."}</Entry>
                    <Entry>{"vassilevskawilliams2012: V. Vassilevska Williams. Multiplying matrices faster than Coppersmith-Winograd. In Proc. ACM STOC, pages 887–898, 2012."}</Entry>
                    <Entry>{"vinodchandran2005: N. V. Vinodchandran. A note on the circuit complexity of PP. Theor. Comput. Sci., 347:415– 418, 2005. ECCC TR04-056."}</Entry>
                    <Entry>{"wagner1974: R. Wagner and M. Fischer. The string-to-string correction problem. J. of the ACM, 21:168– 178, 1974. See en.wikipedia.org/wiki/Wagner-Fischer algorithm for independent discoveries of the same algorithm."}</Entry>
                    <Entry>{"wigderson2006: A. Wigderson. P, NP and mathematics - a computational complexity perspective. In Proceedings of the International Congress of Mathematicians 2006 (Madrid), pages 665–712. EMS Publishing House, 2007. www.math.ias.edu/~avi/PUBLICATIONS/MYPAPERS/W06/w06.pdf."}</Entry>
                    <Entry>{"wiles1995: A. Wiles. Modular elliptic curves and Fermat’s Last Theorem. Annals of Mathematics, 141(3):443–551, 1995."}</Entry>
                    <Entry>{"williams2005: R. Williams. Better time-space lower bounds for SAT and related problems. In Proc. Conference on Computational Complexity, pages 40–49, 2005."}</Entry>
                    <Entry>{"williams2008: R. Williams. Applying practice to theory. ACM SIGACT News, 39(4):37–52, 2008."}</Entry>
                    <Entry>{"williams2008b: R. Williams. Time-space tradeoffs for counting NP solutions modulo integers. Computational Complexity, 17(2):179–219, 2008. Earlier version in Proc. IEEE Complexity’2007, pp. 70-82."}</Entry>
                    <Entry>{"williams2011: R. Williams. Guest column: a casual tour around a circuit complexity bound. ACM SIGACT News, 42(3):54–76, 2011."}</Entry>
                    <Entry>{"williams2013: R. Williams. Alternation-trading proofs, linear programming, and lower bounds. ACM Trans. on Computation Theory, 5(2):6, 2013. Earlier version in Proc. STACS’2010, pp. 669-680."}</Entry>
                    <Entry>{"williams2013b: R. Williams. Improving exhaustive search implies superpolynomial lower bounds. SIAM J. Comput., 42(3):1218–1244, 2013. Earlier version in Proc. ACM STOC’2010."}</Entry>
                    <Entry>{"williams2013c: R. Williams. Natural proofs versus derandomization. In Proc. ACM STOC, pages 21–30, 2013."}</Entry>
                    <Entry>{"williams2014: R. Williams. Algorithms for circuits and circuits for algorithms: connecting the tractable and intractable. In Proceedings of the International Congress of Mathematicians, 2014."}</Entry>
                    <Entry>{"williams2014b: R. Williams. New algorithms and lower bounds for circuits with linear threshold gates. In Proc. ACM STOC, pages 194–202, 2014."}</Entry>
                    <Entry>{"williams2014c: R. Williams. Nonuniform ACC circuit lower bounds. J. of the ACM, 61(1):1–32, 2014. Earlier version in Proc. IEEE Complexity’2011."}</Entry>
                    <Entry>{"williams2016: R. Williams. Strong ETH breaks with Merlin and Arthur: short non-interactive proofs of batch evaluation. In Proc. Conference on Computational Complexity, number 2, 2016. ECCC TR16-002."}</Entry>
                    <Entry>{"wilson1985: C. B. Wilson. Relativized circuit complexity. J. Comput. Sys. Sci., 31(2):169–181, 1985."}</Entry>
                    <Entry>{"yannakakis1991: M. Yannakakis. Expressing combinatorial optimization problems by linear programs. J. Comput. Sys. Sci., 43(3):441–466, 1991. Earlier version in Proc. ACM STOC’1988, pp. 223- 228."}</Entry>
                    <Entry>{"yao1985: A. C-C. Yao. Separating the polynomial-time hierarchy by oracles (preliminary version). In Proc. IEEE FOCS, pages 1–10, 1985."}</Entry>
                    <Entry>{"yao1990: A. C-C. Yao. On ACC and threshold circuits. In Proc. IEEE FOCS, pages 619–627, 1990."}</Entry>
                </Section>
            </References>
        );
    }
}
