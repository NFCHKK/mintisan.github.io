
# Important Programming Concepts (Even on Embedded Systems) Part V: State Machines

by [Jason Sachs](http://www.embeddedrelated.com/showarticle/723.php)




Earlier articles in this series:

- [Part I: Idempotence](http://www.embeddedrelated.com/showarticle/629.php)
- [Part II: Immutability](http://www.embeddedrelated.com/showarticle/639.php)
- [Part III: Volatility](http://www.embeddedrelated.com/showarticle/649.php)
- [Part IV: Singletons](http://www.embeddedrelated.com/showarticle/691.php)

Oh, hell, this article just had to be about state machines, didn’t it? State machines! Those damned little circles and arrows and q’s.





































## Wrap-up and Further Reading

There’s not really much else to say. State machines vary from the simplest of systems (managing an on/off actuator) to complex high-reliability systems where there might be dozens of subsystem state machines all interacting with each other in subtle ways.

In summary:

- Finite state machines are a way of describing the different discrete modes of a system, and how they transition from one state to the next based on the foreseeable input conditions.
- State machines are event-driven systems, and unlike blocking sequences of function calls, allow you to run multiple instances simultaneously.
- Architecting a state machine using a state diagram is a way to show the exact behavior of the state machine.
- Statecharts add some more powerful features to traditional state diagrams, including hierarchy and parallelism, to help organize and simplify state machines by introducing structure.
- State diagrams and statecharts are a way of visualizing the complexity of a system behavior. Use these tools to review and develop that system behavior, and keep an awareness of your system complexity. Aim for simplicity, and shun excess complexity.
- While small state machines can be hand-coded, more complex state machines are better left to more rigorous techniques like the State pattern, state machine libraries, or model-based code generation, to ensure they are implemented correctly.
- Beware of accidental state machines lurking in your application. Don’t let the source code be the specification for state machine behavior!
- Even if they’re not as glamorous as other areas of software engineering, state machines are a vital part of system design, and should never be overlooked.

### Further reading

- [“A Method for Synthesizing Sequential Circuits](https://archive.org/details/bstj34-5-1045),” George H. Mealy, Bell System Technical Journal 34: 5. September 1955.
- [“Gedanken-experiments on Sequential Machines](http://people.mokk.bme.hu/~kornai/termeszetes/moore_1956.pdf),” Edward F. Moore, pp 129 – 153, Automata Studies, Annals of Mathematical Studies, no. 34, Princeton University Press, Princeton, N. J., 1956. The diagrams at the beginning of this article are from Moore’s paper.
- “[Finite Automata and Their Decision Problems](http://www.cse.chalmers.se/~coquand/AUTOMATA/rs.pdf)”, M.O. Rabin and D Scott, IBM Journal of Research and Development, Volume 3 Issue 2, April 1959.
- “[Statecharts: A Visual Formalism for Complex Systems](http://www.wisdom.weizmann.ac.il/~dharel/SCANNED.PAPERS/Statecharts.pdf)”, David Harel, Science of Computer Programming, Volume 8 Issue 3, June 1, 1987.
- “[Statecharts in the Making: A Personal Account](http://www.wisdom.weizmann.ac.il/~dharel/papers/Statecharts.History.pdf)”, David Harel, Proceedings of the third ACM SIGPLAN conference on History of programming languages, Pages 5-1-5-43, 2007.
- “[UML Tutorial: Finite State Machines](http://www.objectmentor.com/resources/articles/umlfsm.pdf)” Robert C. Martin.
- “[Understanding State Machines](http://www.mathworks.com/videos/understanding-state-machines-what-are-they-1-of-4-90488.html)”, The MathWorks.





