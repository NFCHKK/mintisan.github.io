
[TOC]

# [How Do Bipolar Transistors Work?](http://amasci.com/amateur/trshort.html)

©2003 [William J. Beaty](http://amasci.com/me.html)

## EXCESSIVELY SHORT VERSION

A transistor is essentially a diode. In diodes, the rate of charge flow is determined by the height of the potential barrier at the junction. It's voltage controlled: place the right polarity of voltage across the diode terminals to turn it on. But a transistor a very weird diode: if you turn it on with 0.7V placed across two terminals here, then the main diode current goes through a totally different terminal over there! Vbe determines Ic (as well as Ib.) When Bell Labs had an informal contest to name their new invention, one engineer pointed out that it acts like a resistor, but a resistor where the input voltage is transferred across the device to control the resulting current. A "Transfer Resistor" or "Trans-sistor."


## LONGER, MORE DETAILED SHORT VERSION...

Seen from outside, Bipolar Transistors look like current amplifiers. Engineers and technicians can treat transistors as if they are current amplifiers. That's fine as long as we're view the transistor like a sealed 3-wire component: a small black box. But inside, transistors are actually voltage amplifiers. (Most non-physics books get this wrong.) In fact, transistors are like diodes: they're voltage-controlled insulators. [Those who disagree can start by investigating the physics behind the Ebers-Moll and Gummel-Poon models, or by referring to Horowitz & Hill's book THE ART OF ELECTRONICS, or even see what author [W. Win Hill himself says when people insist that BJTs are "current controlled."](http://en.wikipedia.org/wiki/Talk:Bipolar_junction_transistor/Archive_1#Winfield_Hills_Response) Here's some [more Win Hill on CR4 forum](http://cr4.globalspec.com/comment/720033/Re-Voltage-vs-Current), and even [more](http://cr4.globalspec.com/comment/720374/Re-Voltage-vs-Current). And his [textbook AOE](http://books.google.com/books?id=bkOMDgwFA28C&printsec=frontcover#v=onepage&q&f=false), partial preview on google books.

Overall, bipolar transistors act like a thin layer of insulator. The thickness of the insulating layer can be electrically altered in order to control electric current. It's like closing a switch: if we make the insulator between the switch contacts thin enough, the transistor turns "on." Make it slightly thicker, and the transistor turns partially on.

A bipolar transistor is like three hunks of silicon in a row. Usually it's NPN; two hunks of n-type separated by a hunk of p-type. Doped silicon is a good conductor. At the places where the n-type silicon is touching the p-type, a very thin layer of insulator spontaneously appears. Because the three hunks of silicon are normally separated by these insulating layers, an unpowered transistor starts out in the "turned off" state.

In the three hunks of silicon, the center region is called the "Base." One of the side regions is called the "Emitter." By applying a small voltage between Base and Emitter, we can make the thin layer of insulator become even thinner. If it's thin enough, it stops insulating, and some charges flow across it. (Imagine bringing two wires closer and closer until the electrons start jumping across the microscopic gap.)

The transistor's Base/Emitter voltage controls the insulator thickness. This insulator then controls the whole transistor. A large Base/Emitter voltage will shrink the insulating region and turn the transistor on. A smaller voltage can turn the transistor half-way on, and this gives us linear amplifying action rather than just purely on-off switching.

But a transistor is not a simple diode! Exactly. There's a the third hunk of silicon (the hunk called the "Collector.") And another insulating layer appears between Base and Collector. Since it doesn't block the charges coming from the Base, is it even an insulator? It acts just like an insulating vacuum; it doesn't block charges, but it's insulating because it contains no charges of its own. However, the Base-Collector insulator layer does keep the other sections from seeing any effects of the large power supply voltage placed between Collector and Base. Whether the Collector voltage is low or high, we get the same amperage through that insulating layer. Therefore the Base acts as if it is being shielded from the Collector. Yet charges flow right through the insulating region, going from Emitter through Base and into Collector. Therefore the Collector acts as if it's NOT insulated from the Base. Which is it? Both!

Why do transistors act as amplifiers? That's simple to explain: all valves are amplifiers. Water valves, air valves, and vacuum tubes are amplifiers. Carbon microphones are amplifiers (paired with a loudspeaker, the carbon microphone was the first audio amp, and was placed in long distance telephone lines. Thomas Edison made big bucks!) It takes very little energy to open or close a valve, yet this tiny energy controls huge pressures and huge flows. A transistor is like a valve, a valve where a tiny change in voltage can open or close the large valve by different amounts. A small amount of "signal" energy causes the transistor to control the large current which is pumped by a battery. The shape of the output waveform is the same as the shape of the input waveform. We usually say that the signal has been "amplified," when really it has been created from the battery's energy. And if battery voltage stays the same, then any changes in charge flow are changes in the output energy flow. Wattage. Small watts in, big watts out. That's what amplifiers are all about. But any valve can do this.

Most transistors are Silicon, and Silicon junctions "turn on" at around 0.4V to 0.8V. Place half a volt on the Base of a transistor and the transistor barely starts turning on.

But why do so many books say "Transistors Amplify Current?" Because it's an incredibly useful rule of thumb. It's part of a mental model which treats transistors as black boxes. The base current can be used to determine the BE voltage, and the BE voltage then sets the collector current's value. As long as we don't look inside the black box, we can pretend that the charges injected into the base are directly affecting the collector current. But some misguided authors go farther, they try to use current-amplification to explain the stuff inside the box. Those authors are ignoring the role played by the Emitter depletion layer, and ignoring the role played by Vbe. They are confused by the leakage current going through the Base wire. Yes, the Base/Emitter voltage controls the thickness of the insulating region and thus controls the main transistor current. But also a tiny bit of charge leaks through the Base connection. It SEEMS like this leakage can directly collide against the collector's flowing charges.

It just so happens that the tiny leakage current in the Base connection is proportional to the transistor's main Emitter/Collector current. (This makes perfect sense, since both the Base leakage current and the main Emitter/Collector current are controlled by the insulator thickness, which is set by the Base/Emitter voltage.) ...so it SEEMS as though the Collector current is directly controlled by the Base current. You can even simplify things by pretending that this is true. But in reality, Base current communicates with Collector current via changes in Base-Emitter voltage. It's the Base/Emitter voltage which runs things. You'll never understand "transistor action" and the simple physics inside the box if you think that Base current directly controls the Collector current. It doesn't. The control is there, of course, but it's one stage separated.

A bipolar transistor has a voltage-controlled input, while it's output is a variable control system which creates a constant current. It's vaguely like a resistor, but where the voltage in one place creates a current in a second place ...yet the voltage in that second place does not affect the output current. Change the collector voltage, and the collector current remains relatively constant. It's not like a transformer where volts and current are swapped, and where wattage stays the same. In transistors, the effects of voltage are TRANSFERRED to another separate path in the circuitry. "Transfer Resistor." Transistor.

ALSO:
- [How capacitors REALLY work](http://amasci.com/amateur/cap1.html)
- [How electricity really works](http://amasci.com/ele-edu.html) articles index



## [How Do Transistors Work?](http://amasci.com/amateur/transis.html)

**NO, HOW DO THEY REALLY WORK?**

©1995 [William Beaty, BSEE]((http://amasci.com/me.html))

Most technician textbooks do a very poor job of explaining the details of transistors' internal workings. First they assume that the Base current is somehow controlling the Collector current, then they try to explain how one current can affect another. These explanations invariably fail because Bipolar transistors, like FETs, are voltage-controlled devices. One current doesn't affect another. Instead, the Base-Emitter voltage controls the thickness of an insulating "depletion layer" which lies in the path of both the Base current and the larger Collector current.

**NOTE**: This article delves into bipolar transistor internal operation: it's the physicist's viewpoint; not the engineer's or technician's. While solving design problems, engineers must model the transistor as a current amplifier, or as a transconductance device, or as a charge-controlled current source. If you want to understand a transistor circuit, then the black-box model is what we use. But be warned, because if our goal instead is to "open the hood" and see what's really going on inside, those useful black-box models can derail our understanding.

---------
 
>"The difference between a conviction and a prejudice is that you can explain a conviction without getting angry." - anon

When I first became interested in electronics as a kid, I sat down and figured out how bipolar transistors work.
Well, sort of.

I read many articles which explained the "Common Base" amplifier. Common-base is the setup which was used by the inventors of the transistor. In those explanations, the Base is a grounded piece of Germanium and the input signal is applied to the Emitter. Since common-base amplifiers are rarely used in transistor circuitry, I ended up having to dream up my own explanation. I based it upon the little bits I already knew about the Common Emitter configuration. Common Emitter is the one where the Emitter is grounded, the Base is the input, and where the output is taken across a resistor connected to the Collector. My home-made explanation sort of worked, but I wasn't satisfied. I was full of niggling doubts. And why the hell were the textbooks using Common Base to introduce transistors to the newbies? It just didn't make any sense.

When I went into engineering school, I found it extremely odd that there were still no good explanations of bipolar transistors. Sure, there were detailed mathematical treatments. Just multiply the Base current by "hfe" to obtain the Collector current. Or, treat the transistor as a two-port network with a system of equations inside. [Ebers-Moll](http://hyperphysics.phy-astr.gsu.edu/hbase/solids/trans2.html#c2) and all that. But these were similar to black-box circuits, and none of them said HOW a transistor works, how can a small current have any effect on a larger one???? And nobody else seemed curious. Everyone else in the class seemed to think that to memorize the equations was the same as learning concepts and gaining understanding of the device. ([R. Feynman](http://amasci.com/feynman.html) calls this the Euclidean or "Greek viewpoint;" the love of mathematics, as opposed to the physicists' "[Babylonian viewpoint](https://www.google.com/search?q=babylonian+feynman)" where concepts are far more important than equations.) I'm a total Babylonian. For me, math is useless at the start, equations are like those black box Spice programs which might work great, but they don't tell you any details of what's happening inside a device in the real world. I can learn the math, but that just means I can run a "mental spice program" without needing any computer, and I still don't know how transistors work. First tell me what "Transistor Action" is all about. Show me animated pictures, use analogies. Only after I've attained a visual and gut-level understanding of something, only then is the math useful to me for refining it and adding all the details. However, for me the math alone is not a genuine explanation. Math is just a tool or a recipe, a crutch for those who want nothing except the final numerical result, and it certainly does not confer expert knowledge.

Now many years have passed and I think I see the problem...

Traditional transistor explanations basically **suck**.

The ones I see in high school textbooks and hobby magazines are terrible. They're full of errors and contradictions. They misuse the word "current" as if it were a substance that flows. They don't explain insulators properly. And they try to prove that the base current can have a direct effect on the collector current. Textbooks for engineers spend their time deriving equations which will end up in software simulations, but still they don't sit down and describe what's happening in a direct clear fashion. And then there's all those authors who use Common-base amplifiers to introduce transistors to newbies. Are they just fools who follow a tradition only because it's traditional? Why don't they ever make efforts to improve the explanations? Were they written in stone by god? Well, if nobody but me thinks the explanation is open to improvements, then I'd better put my money where my mouth is. (And if I'm right, then it should be very easy to write a vastly improved explanation.)

Below are my ideas on how transistors *really work*. They're **not** based on the traditional explanations found widely in technician's texts and hobbyist magazines. Instead they're based on engineering textbooks: semiconductor physics and the details behind the Ebers-Moll model. I'm translating the usual math models into a verbal/intuitive version. As you'll soon see, several new concepts are required. It might be easier for you to just memorize the equations rather than to imagine what really goes on inside. But if you DO manage to decode my explanations and crude ASCII artwork, I think you'll be in the elite minority who really understands transistors. I've found that even most working engineers have no good mental picture of bipolar transistor operation. So, if you attain a clear understanding of transistors, you'll surpass many of the experts.

------------
 
Voltage-driven charge-flows

First of all, you must abandon the idea that current travels in transistors or flows inside of wires. Yes, you heard me right. [Current does not flow](http://amasci.com/miscon/whyhard1.html#cur). Electric current never flows, since an electric current is not a stuff. Electric current is a flow of something else. (Ask yourself this: what's the stuff that flows in a river, is it called "current?" Or is it called "water?")

> Since a current is a flow of charge, the common expression "flow of current" should be avoided, since literally it means "flow of flow of charge." - MODERN COLLEGE PHYSICS, Richards, Sears, Wehr, Zemanski

So what flows inside of wires?

The stuff that moves within wires is not named Electric Current. Intead it is called Electric Charge. It's the [charge](http://amasci.com/elect/charge1.html) that flows, never the current. The motion of charges can vanish, and the motion can appear. But the motion itself doesn't flow along, it's the charges which flow. And in rivers (or in plumbing,) it's the water that flows, not the "current." Analogy: we cannot understand plumbing until we stop assuming that the pipes are empty, while also believing in a magical stuff called "current." We must learn that pipes are already full; that "water" flows inside them. The same is true with circuits. Wires are not filled with "flow of Current," they are pre-filled with charge. Charge which can move. Electric charge is real stuff; it's carried by physical particles, and it can move around with a real velocity and a real direction. Charge behaves much like a "stuff," like a gas or liquid. But electric current is different from charge: charge is like a stuff, but current is not a stuff. If we experiment with concepts; if we try deciding to ignore "current," and instead go and carefully examine the behavior of the moving charges in great detail, we can burn off the clouds of fog that block our understanding of electronics.

Second: the charges found within conductors do not push themselves along, but instead they're pushed by "potential difference;" they're pushed by the voltage-fields within the conductive material. Charges are not squirted out of the power supply as if the power supply was some sort of water tank. If you imagine that the charges leave through the negative terminal of the power supply; and if you think that the charges then spread throughout the hollow pipes of the circuit, then you've made a fundamental mistake. If you think that the charges are provided by the power supply, then you've made a fundamental mistake. Wires do not act like "empty electron-pipes." A power supply does not provide any electrons. Power supplies certainly create currents, or they cause currents, but remember, we're removing that word "current." To create a flow of charges, a power supply does not inject any charges into the wires. The power supply is only a pump. A pump can supply a pumping pressure. Pumps never supply the water being pumped.

Third: have you discovered the big 'secret' of visualizing electric circuits?

**ALL CONDUCTORS ARE ALREADY FULL OF CHARGE**

Wires and silicon ...both behave like pre-filled water pipes or water tanks. The "water" is the vast population of movable charged particles of the conductor. Electric circuits are based on the "full pipes analogy." This simple idea is usually obscured by the phrases "flow of current," or "power supplies send out current." We end up thinking that wires are like hollow pipes. We end up visualizing a mysterious substance called Current which flows through them. Nope. (Once we get rid of that word "current," we can discover fairly stunning insights into simple circuits, eh?) 


If circuits are like plumbing, then none of the "pipes" of a circuit are ever empty. This idea is extremely important, and without it we cannot understand semiconductors ...or even conductors! Metals contain a vast quantity of movable electrons which forms a sort of "electric fluid" within the metal. A simple hunk of copper is like a water tank! Physicists call this fluid by the name "electron sea of metals," or "the ocean of charge." Semiconductors are always full of this movable "charge-stuff." The movable charge is in there even when a transistor is sitting on the shelf and disconnected from everything. When a voltage is applied across a piece of silicon, those charges already within the material are driven into motion. Also note that the charge within wires is ...uncharged. Every movable electron has a positive proton nearby, so even though the metal contains a vast sea of charge, there is no net charge on average. Wires contain "uncharged" charge. Better call it "cancelled charge." Yet even though the electrons are cancelled by the nearby protons, the electrons can still flow among the protons. Cancelled charge can still move around, so it's possible to have flows of charge in an uncharged metal.

OK, since the "pipes" are already full of "liquid," then in order to understand circuitry, we should NOT trace out the path starting at the terminals of the power supply. Instead, we can start with any component on the schematic. If a voltage is applied across that component, then the charges within that component will start to flow. Let's modify the old "flashlight explanation" which we all were taught in grade school. Here's the corrected version:

**AN ACCURATE FLASHLIGHT EXPLANATION**:

Wires are full of vast amounts of movable electric charge (all conductors are!) If you connect some wires into a solid ring, you form an "electric circuit" which contains a movable conveyor-belt made of charges within the metal circle. Next we cut this ring in a couple of places and we insert a battery and a light bulb into the cuts. The battery acts as a charge pump, while the light bulb offers friction. The battery pushes the wires' long row of charges forward, then all the charges flow, then the bulb lights up. Let's follow them.

The charges start out inside the light bulb filament. (No, not inside the battery. We start at the bulb.) The charges are forced to flow along through the filament. Then they flow out into the first wire and move along to the battery's first terminal. (At the same time more charges enter the filament through its other end.) The battery pumps the charges through itself and back out again. The charges leave the second battery terminal, then they flow through the second wire to the bulb. They wind up back inside the light bulb filament. At the same time, the charges in other parts of the circuit are doing the same thing. It's like a solid belt made out of charges. The battery acts as a drive- wheel which is moving the belt. The wires behave as if they hide a conveyor belt inside. The light bulb acts like "friction;" it gets hot when its own natural charges are forced to flow along. The battery speeds up the entire belt, while the friction of the light bulb slows it down again. And so the belt runs constantly, and the light bulb gets hot.

>The truth will set you free ...but first it will piss you off!      -anon

Brief review:

1.THE STUFF THAT FLOWS THROUGH CONDUCTORS IS CALLED CHARGE. ("CURRENT" DOESN'T FLOW.)
2.THE CHARGE INSIDE CONDUCTORS IS SWEPT ALONG BY VOLTAGE FIELDS.
3.ALL WIRES ARE "PRE-FILLED" WITH A VAST AMOUNT OF MOVABLE CHARGE
4.BATTERIES AND POWER SUPPLIES ARE CHARGE-PUMPS.
5.LIGHT BULBS AND RESISTORS BOTH ACT "FRICTIONALLY."

One last thing: The difference between a conductor and an insulator is simple: conductors are like pre-filled water pipes, while insulators are like pipes choked with ice. Both contain the "electric stuff;" conductors and insulators both are full of electrically charged particles. But the "stuff" inside an insulator can't move. When we apply a pressure-difference along a water pipe, the water flows. But with an empty pipe, there's nothing there, so the flow does not occur. And with an ice-choked pipe, the stuff is trapped and doesn't budge. (In other words, voltage causes charge-flow in conductors, but it can't cause charge-flow in insulators because the charges are either missing, or immobilized.) Many intro textbooks get their definitions wrong. They define a conductor as something through which charges can flow, and insulators supposedly block charges. Nope. Air and vacuum don't block charges, yet air and vacuum are good insulators! In fact, a conductor is something that contains movable charges, while an insulator is something that lacks them. (If a book gets this foundational idea wrong, then most of its later explanations are like buildings built on a pile of garbage, and they tend to collapse.) 

------------

One more last thing before diving into transistors. Silicon is very different than metal. Metals are full of movable charges... but so is doped silicon. How are they different? Sure, there's that matter of the "band gap," and the difference between electrons versus holes, but that's not the important thing. The important difference is quite simple: metals have vast quantities of movable charge, but silicon has far less. For example in copper, every single copper atom donates one movable electron to the "sea of charge." Copper's "electric fluid" is very dense; it's just as dense as the copper metal. But in doped silicon, only one in every billion atoms donates a movable charge. Silicon is like a big empty space with an occasional wandering charge. In silicon, you can sweep all the charges out of the material by using a few volts of potential, while in a metal it would take billions of volts to accomplish the same thing. Or in other words:

6.THE CHARGE INSIDE OF SEMICONDUCTORS IS LIKE A COMPRESSIBLE GAS, WHILE THE CHARGE INSIDE OF METALS IS LIKE A DENSE AND INCOMPRESSIBLE LIQUID.

------------

Sweeping away the charges in a material is the same as converting that material from a conductor to an insulator. If silicon is like a rubber hose, then it's a hose which contains compressible gas. We can easily squeeze it shut and stop the flow. But if copper is also like a rubber hose, then instead, it's like a hose full of iron slugs. You can squeeze and squeeze, but you can't smash them out of the way. But with air hoses and with silicon conductors, even a small sideways pressure can pinch the pathway shut and stop the flow. 

-----------
 
OK, let's look at the way that transistors are usually explained.
To turn on an NPN transistor, a voltage is applied across the base and emitter terminals. This causes electrons in the Base wire to move away from the transistor itself and flow out towards the power supply. This in turn yanks electrons out of the P-type base region, leaving 'holes' behind, and the 'holes' act like positive charges which are pushed in the opposite direction from the direction of electron current. What SEEMS to happen is that the base wire injects positive charges into the base region. It spews holes. It injects charge.

(Note that I'm describing charge flow here, not positive-charge "conventional current.")

               |
         ______|______
        |             |
        | COLLECTOR N |
        |_____________|                       ELECTRONS ARE PULLED FROM THE
        |             |  ----->               BASE REGION AND INTO THE WIRE,
        | BASE      P |______________         WHICH CREATES POSITIVE "HOLES"
        |_____________|              |  +     WHICH SPEW OUT INTO THE BASE
        |             |          ____|____    REGION.
        | EMITTER  N  |            _____
        |_____________|          _________
               |                   _____
               |_____________________|  -

That's part of the conventional explanation. Why is all of this important to transistor operation? **It's not!** The base current is not important to transistor operation. It's just a byproduct of the REAL operation, which involves an insulating layer called the Depletion Region. By focusing attention on the current in the Base lead, most authors go up a dead end in their explanations. To avoid this fate, we must start out by ignoring the base current. Instead we look elsewhere for understanding. See the diagram below.

               |
         ______|______
        |             |          \
        | COLLECTOR   |          |
        |             |           > full of wandering electrons
        |  n-doped    |          |
        |_____________|          /
        |             |              \
        | BASE        |              |
        |             |--             > full of wandering "holes"
        |  p-doped    |              |
        |_____________|              /
        |             |      \
        | EMITTER     |      |
        |             |       > full of wandering electrons
        |  n-doped    |      |
        |_____________|      /
               |
               |

The Depletion Region is an insulating layer existing between the base region and the emitter region. Why is it there? It exists because the Base region is p-doped silicon; the insulating layer appears because p-type silicon is full of naturally-occurring movable "holes," and because the p-type silicon is touching n-type silicon.

               |
         ______|______
        |             |
        | COLLECTOR N |
        |_____________|
        |             |
        | BASE      P |--
        |_____________|
         _____________    <-- insulating "depletion layer"
        |             |
        | EMITTER  N  |
        |_____________|
               |
               |

The Depletion layer appears when electrons fall into holes. The p-type silicon has electrons too, but they act like the closely-packed beads of an abacus, and the "holes" are like gaps in the rows of beads. Move one bead, and a hole has moved the other way. Touch the p-type silicon against the n-type, and lone wandering electrons from the n-type silicon will fall into the holes. Also, holes in the p-type's Base region can flow out among the movable electrons from the N-type Emitter region and many swallow electrons and are cancelled. Holes eat electrons, and this leaves a thin region between N and P sections which lacks movable charges.

**Remember**: a conductor is not a substance which allows charges to pass. (Don't forget #3 above!) Actually a conductor is any substance which contains charges which are movable. Anything that lacks movable charges is an insulator. Inside the depletion layer, all the opposite charges have fallen together and vanished. The gaps in the abacus beads are gone, so no beads can move anymore. It's packed solid with immobile charges, so the silicon has turned into an insulator. When there's no voltage applied across the base/emitter terminals, this insulating layer grows fairly thick, and the transistor acts like a switch which has been turned off.

I like to visualize that a transistor's silicon as normally like a shiny silver conductor (sort of like metal) ...except for that insulating layer between the P and N regions which acts more like a layer of insulating glass. Silicon is like a metal which can become glass!

               |
         ______|______
        |             |              \
        | COLLECTOR N |              |
        |_____________|               >  Shiny silver conductive
        |             |              |
        | BASE      P |--            /
        |_____________|
         _____________    <-- Glasslike insulating "depletion layer"
        |             |          \
        | EMITTER  N  |           >  Shiny silver conductive
        |_____________|          /
               |
               |

Whenever voltage is applied between base and emitter, this insulating layer changes thickness. If (+)voltage is applied to the p-type (to the base wire,) while a (-) voltage polarity is applied to the n-type, (to the emitter wire,) then electrons in the n-type are pushed towards the holes in the p-type. The insulating layer becomes so thin that the clouds of electrons and holes start meeting and combining. A current therefore exists in the base/emitter circuit. But this current is not important to transistor action. What's important to notice is that the *VOLTAGE* across the base/emitter has caused the insulating Depletion Layer to become so thin that the charges can now flow across it. It's as if the transistor contains a layer of glass whose thickness can be varied when we alter a Base-Emitter voltage. The layer becomes thinner when BE voltage is increased. This happens because the voltage pushes the holes and the electrons towards each other, reducing the size of the empty insulating region between the clouds of holes and electrons, and allowing the stragglers to jump across the insulator. The depletion layer is a voltage-controlled switch which "closes" when the right polarity of voltage is applied. It is also a proportional switch, since a small voltage can close it only partially. For silicon material, charges first start jumping across whenever the voltage is around 0.3V. Raise the voltage to 0.7V and the current gets very high. (That's for silicon. Other materials have different turn-on voltages.) The larger the voltage, the thinner the insulating layer, so the higher the current in the entire transistor. By applying the right voltage, we can thicken or thin the depletion layer as desired, creating an open, closed, or partially open switch.

See what's happening here? The transistor is not controlled by current. Instead it is controlled by the base/emitter voltage.

7.THE P-TYPE AND N-TYPE ARE CONDUCTORS BECAUSE THEY CONTAIN MOVABLE CHARGES.
8.A LAYER OF INSULATING MATERIAL APPEARS WHEREVER P-TYPE AND N-TYPE TOUCH.
9.THE INSULATING LAYER CAN BE MADE THIN BY APPLYING A VOLTAGE.

```
               |
         ______|______
        |             |
        | COLLECTOR N |
        |_____________|
        |             |  ---->
        | BASE      P |______________
        |=============|              |  +     With a small voltage applied,
        |             |          ____|____    the depletion layer gets thin,
        | EMITTER  N  |            _____      charges start crossing it,
        |_____________|          _________    and a small current appears.
               |                   _____      The "switch" is only partly
               |_____________________|  -     closed!
                          <----- 
```

OK, on to [PART TWO ](http://amasci.com/amateur/transis2.html)
Also see: [short version of article](http://amasci.com/amateur/trshort.html)
and the [version Espanol](http://otro-geek-mas.blogspot.com/2008/08/como-funcionan-realmente-los.html).

-------- 

PS
The transistor was invented around 1923, by physicist Dr. J. Edgar Lilienfeld, the father of the modern electrolytic capacitor. WHAT?!!! But everyone knows that it was invented at Bell Labs in 1947. Nope. The original transistor was a 1920s thin-film device deposited on glass. The base region was a clever idea: crack a piece of glass, put it back together with metal foil clamped in the crack, then slice off the extra foil to make a flat surface that goes: glass, metal, glass. Deposit a thin layer of semiconductor and heat the device, and the thin metal line will "dope" that part of the semiconductor layer. Simple! Dr. Lilienfeld also built MOSFETs using the natural oxide layer found on aluminum plates. He also built a working transistor radio and showed it around to various companies. It was ignored, possibly because he didn't have a solid theory to explain how his invention worked, but more probably because it was "impossible;" weird and new. Some hobbyist should try making a home-built transistor. [New 2006 info: R. G. Arns says that Bret Crawford built sucessful Lilienfeld transistors in 1991 as his MS Physics Thesis. Joel Ross did it again in 1995 with more stable versions. And more amazing: William Shockley and G. L. Pearson did so in 1948, publishing in Physical Review for July 15 1948, but they concealed the fact that it was Lilienfeld's device they were demonstrating!]

Lilienfeld's patent numbers are:

- [1,745,175](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,745,175.WKU.&OS=PN/1,745,175&RS=PN/1,745,175) Method and Apparatus for Controlling Electric Currents
- [1,877,140](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,877,140.WKU.&OS=PN/1,877,140&RS=PN/1,877,140) Amplifier for Electric Current
- [1,900,018](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,900,018.WKU.&OS=PN/1,900,018&RS=PN/1,900,018) Device for Controlling Electric Current

[Click on IMAGES button to view them.]

These patents caused Bardeen, Brattain, and Shockley some grief, and caused the US Patent Office to disallow the Bell Labs FET patents in later years.
Also:

- R. G. Arns ["The other transistor: early history of the MOSFET." (.pdf) ](http://ieeexplore.ieee.org/search/srchabstract.jsp?arnumber=730824&isnumber=15787&punumber=2222&k2dockey=730824@ieejrns&query=%28%28arns%29%3Cin%3Eau+%29&pos=3&access=no)Engineering Science and Education Journal 7 (5): 233-240 (1988)
- IEEE Spectrum: [How Europe Missed the Transistor](http://www.spectrum.ieee.org/semiconductors/devices/how-europe-missed-the-transistor) (independantly invented "transistron")
- T. L. Thomas, Twenty Lost Years of Solid State Physics, Analog (magazine) March 1965


PPS

It is possible to make a transistor using Galena (lead sulfide, PbS). Silvery hunks of Galena are often available from rock shops and science museum stores. You can even make your own by melting sulfur and lead powder over a flame. Look up keywords such as "cat's whisker diode" and "crystal radio" to find out more.

The trick to making a transistor is to use a hyper-clean, freshly-cleaved crystal face, to sharpen your cat's-whisker contacts by dissolving the tips using electrolysis, and then to put the tips within 0.05mm of each other (or preferably within 0.01mm). Obviously the latter is the hardest part. Better use a microscope! The authors of the following article found that the base/emitter junction was critical: it HAD to act as a good rectifier. The base/collector junction wasn't as important. They got some power gain, but their beta was in the single digits. [Others](http://ourworld.compuserve.com/homepages/Andrew_Wylie/homemade.HTM) have mentioned that if you break open a 1N34 glass diode to expose the Germanium chip, you can make a crude transistor with a similar procedure. Old Germanium audio power transistors probably do the same, while giving much larger semiconductor area on which to play.

Crystal Triode Action in Lead Sulphide, P. C. Banbury, H.A. Gebbie, C. A. Hogarth, pp78-86. SEMI-CONDUCTING MATERIALS, Conference proceedings, H.K. Henisch (ed), 1951 Butterworth's scientific publications LTD 1951.


## how transistor works, an alternate viewpoint

©1995 [William J. Beaty, BSEE](http://amasci.com/me.html)

>Physics? That's where you find new insights on things people have been thinking about for a long time. If you don't have two or three separate approaches to explaining something, then you don't really understand it.
OK, everything we know is wrong, and transistors aren't really "current amplifiers." <grin> Instead the base voltage is the important thing, not the base current.

             |
       ______|______
      |             |
      | COLLECTOR N |
      |_____________|
      |             |  ---->            With a small voltage applied,
      | BASE      P |____________       the depletion layer gets thin,
      |=============|            |  +   charges start crossing it, and
      |             |        ____|____  a small flow of charge appears
      | EMITTER  N  |          _____    in the battery circuit.  The
      |_____________|        _________  "switch" is only partly closed!
             |                 _____   
             |___________________|  -     
                        <----- 

The changing thickness of the insulating depletion layer switches the transistor on and off. And since base voltage is what changes the thickness, we can ignore the current in the base wire. But wait a minute, which flow of charge is being switched on and off? Ah, we have another entire circuit to add to our diagram. We connect another battery across the entire transistor, between emitter and collector. Let's use a common 9-volt battery.

```   
                    <------
             _______________________
            |                       |
            |                       |
            |                 ______|______
            |                |             |
  Collector |                | COLLECTOR N |
  Battery   |   +            |_____________|
        ____|____            |             |______________
          _____              | BASE      P |              |  
        _________            |=============|              |  +    
          _____   9V         |             |          ____|____ 
        _________            | EMITTER  N  |            _____    Base
          _____              |_____________|          _________  Battery
        _________                   |                   _____     .5V
          _____                     |                     |  -
            |   -                   |_____________________|
            |_______________________|

                    ------->
```


So the Base Battery turns on the transistor's "switch", and this lets the 9-volt Collector-Battery drive a large flow of charge vertically through the entire thing.

What use then is the "collector's" silicon? Won't the voltage from the collector battery override control from the base? And why have three silicon segments at all? Won't the second Depletion Layer turn everything off? And why not just connect the top wire to the Base section directly?

The answers are in the last of these questions. If we got rid of the collector, we'd accidentally connect the two batteries together, since silicon is a good conductor. We'd end up with a diode instead (see below.) The batteries would fight each other, and the diode would just act like a short circuit between the two batteries.

```
                                      IT'S ALL SHORTED OUT, IT
                                      GETS HOT AND SMOKES
             _____________________      __________________            
            |                     |    |                  |
  Collector |                     |    |                  |
  Battery   |   +             ____|____|___               |
        ____|____            |             |              |
          _____              | BASE      P |              |  
        _________            |=============|              |  +    
          _____   9V         |             |          ____|____ 
        _________            | EMITTER  N  |            _____    Base
          _____              |_____________|          _________  Battery
        _________                   |                   _____     .5V
          _____                     | IT'S A PN DIODE     |  -
            |   -                   |                     |
            |_______________________|_____________________|

```

Obviously the collector is required. Obviously the collector segment does something really strange!

Notice that the collector battery is applying a (+) polarity to the collector, but the collector is n-type silicon. Isn't this backwards? Won't there be a whole second Depletion Layer forming between collector and base? YES! And since we're using a 9-volt battery to pull the movable holes in the p-type away from the electrons in the n-type, this depletion layer will be a thick one. It should act like a turned-off switch, eh? It does... and yet it doesn't. I personally think this is the strangest part of transistor action, and it took me a good while before my brain stopped rejecting the weirdness so I could "see" it all happening at once.

```
            <------
             _______________________
            |                       |
            |                       |
            |                 ______|______
            |                |             |
  Collector |                | COLLECTOR N |
  Battery   |   +            |_____________| thick depletion layer
            |                 _____________
        ____|____            |             |______________
          _____              | BASE      P |              |  
        _________            |=============|              |  +    
          _____   9V         |             |          ____|____ 
        _________            | EMITTER  N  |            _____    Base
          _____              |_____________|          _________  Battery
        _________                   |                   _____     .5V
          _____                     |                     |  -
            |   -                   |_____________________|
            |_______________________|

                    ------->
```

OK, this new depletion layer keeps the Collector Battery from affecting the rest of the transistor. If we increase the voltage of that 9V battery, the insulating layer between Base and Collector segments just gets thicker, and the Base/Emitter segments below the Collector never feel the voltage-force from that battery. Yes, the "upper surface" of the Base segment in the upper depletion zone does feel the force from the 9V battery, but the rest of the circuit does not. (It's like waving a highly-charged balloon near a flashlight's circuit. Nothing happens to the charge flow in the flashlight.)

**HOWEVER!**

Because the Base battery has already thinned out the insulating emitter depletion layer, this means that swarms of movable electrons can pour from the Emitter and upwards into the Base segment. Only a few will actually flow upwards into the Base, since it would cause a traffic jam if the Base wire wasn't able to immediately suck those electrons out again. (Or more accurately, if the electrons in the Base don't leave again, and aren't cancelled by holes, then any extra electrons would cause the Base segment to become negatively charged, which would repel any more electrons coming upwards from the Emitter. See, a traffic jam.

So now we have a sparse cloud of a few electrons entering the p-type silicon of the Base section from below, and some of those electrons wander upwards into the "upper surface" of the Base segment. What happens? They're suddenly exposed to the attraction of the 9V battery positive voltage.

The upper depletion region doesn't act so much like a hunk of insulating glass, instead it acts like an insulating air gap. It's only insulating if there are no movable charges present. It doesn't block the flow of charges, but if no charges exist there, the voltage cannot create a charge flow.

PS, Don't forget, there were always plenty of holes already in the Base segment, but any holes which dare to wander upwards out of the Base segment will be pushed back down by the positive polarity of the 9V battery. (That's what makes the depletion zone act like an insulator in the first place: it repels holes back down into the P, and repels electrons back up into the N Collector segment.) Imagine that the Collector segment is conductive metal. The Base segment is also like a metal, and the depletion region between them is like an empty space. Next, "static electricity" happens!

We've electrically charged the Collector segment to positive 9 volts. Stick some rice-crispies in the empty gap, and if they're negatively charged they'll be sucked upwards. Well, the few wandering electrons in the Base segment act just like negatively charged objects, and if they should wander up to the surface of the base layer ...up they'll go. They'll be sucked across the gap into the Collector and then forced to go around the rest of the collector circuit. This can only happen if they get to the "upper surface" of the Base segment. When they were down within the Base segment, the Base acted like a conductive metal shield, and the wandering electrons didn't "see" the strong attractive field coming from the Collector segment.

Some electrons are yanked upwards and go missing from the Base. But this relieves the "traffic jam!" The Base region loses some electrons upwards. As soon as the positively charged Collector has yanked some electrons out of the Base segment, more electrons can finally pour in from below... which gives us more wandering electrons to be yanked upwards, and so on. A fairly huge vertical charge flow appears.

The "traffic jam effect," as well as the valve-action of the thin depletion zone between base and emitter, these team up to control the main vertical current through the whole transistor. Any electron which wanders across the very thin Emitter depletion zone can also wander across the thin Base segment and end up becoming part of the big flow of charge in the Collector Battery circuit. The Base Battery voltage controls the width of the thin depletion zone, and this controls the amount of electrons pouring up into the collector. The Collector's 9V battery provides the "suction" that drives the main vertical current. But if we change the collector's battery voltage, the vertical flow of charge does not change. Doesn't change? It's because the collector battery only attracts what electrons it's given by the Base segment. It can't alter the collector current. This is an interesting situation known as a "constant current power supply."

Note that it's important to make the Base segment be fairly thin so we maximize the "traffic jam" effect (and minimize the number of charges that unnecessarily leak out of the Base wire.) We're relying on the natural ability of electrons to wander across the Base section all by themselves. No voltage is pushing them in that direction. The Base Battery is pulling them slowly sideways towards the Base wire. The Collector battery can't start yanking on them at all, not until they reach the "upper surface" of the Base segment.

>If you make people think they're thinking, they'll love you. But if you really make them think, they'll hate you     - Don Marquis

Whew. All the stuff above is a very large chunk to swallow. Don't be suprised if it takes your brain awhile to connect all the puzzle-pieces together. It took me ages to see all of this (and it only happened years after I took the two semesters of engineering school exclusively focused on the Ebers-Moll mathematical model describing this entire subject.) The voltage-control viewpoint shown by the [Ebers-Moll](http://www.google.com/search?q=transistor+ebers-moll) explanation does appear widely in textbooks, but it certainly isn't widely learned. If it had been learned, then people wouldn't get angry when they hear that transistors are voltage-controlled; that the collector current is proportional to the voltage across the base-emitter junction.

We'd better recap:

10.THE TRANSISTOR CAN ACT LIKE A SWITCH (OR LIKE A PARTIALLY-ON SWITCH.)
11.CONNECT A POWER SUPPLY OR BATTERY FROM COLLECTOR TO EMITTER IN ORDER TO CREATE A BIG FLOW OF CHARGE (BUT WHY?)
12.THERE'S ANOTHER DEPLETION ZONE BETWEEN COLLECTOR AND BASE.
13.THIS NEW DEPLETION ZONE ACTS LIKE AN INSULATING AIR GAP.
14.ANY ELECTRONS WHICH RANDOMLY WANDER ALL THE WAY ACROSS THE BASE ARE GRABBED BY THE COLLECTOR; THEY'RE FORCEDACROSS THE UPPER DEPLETION ZONE.
15.THE BASE DEPLETION ZONE CONTROLS THE COLLECTOR BATTERY CURRENT. BUT CHANGES IN THE COLLECTOR VOLTAGE HAVE LITTLE EFFECT.

If we crank up the Base Battery voltage, the emitter's depletion layer thins, the "switch" is fully on, and a very large flow of charge might appear in the collector circuit. Uh oh. The transistor (as a switch) is trying to short out the collector battery. So lets have it switch something. Give it a light bulb in series.  

```
                    ________    Light
                   /        \   Bulb
        |    ________/\/\/\________
        |   |                      |
        |   |      \________/      |
        v   |                      |
            |                      |
            |                ______|______
            |               |             |
  Collector |               | COLLECTOR N |     Thick depletion
  Battery   |   +           |_____________|     layer with electrons
            |                _____________  <-- passing through
        ____|____           |             |______________
          _____             | BASE      P |              |  
        _________           |=============|              |  +    
          _____   9V        |             |          ____|____ 
        _________           | EMITTER  N  |            _____    Base
          _____             |_____________|          _________  Battery
        _________                  |                   _____     .7V
          _____                    |                     |  -
            |   -                  |_____________________|
            |______________________|

                    ------>
```

And finally we take one last look at the flow of charge in the base wire. Even though it's really the *voltage* between base and emitter which controls the transistor, we don't ignore the base-wire's current entirely. It has an important use. Just by coincidence, the tiny base/emitter current is proportional to the large collector/emitter current. So if we know the value of flowing charge in the base wire, we can multiply its value by this "Current Gain" factor, and then figure out just what the charge-flow in the Collector wire should be. The transistor ACTS as if it is amplifying current. But it's really using a small change in *voltage* to create a large change in current. (It's more than just coincidence that the charge flowing in the Base and Collector are proportional. In fact, both flows are controlled by the Base/Emitter voltage, which controls the thickness of the Emitter's depletion layer.) The Collector current is large because the Emitter's thin depletion layer lets huge amounts of electrons escape up into the Collector region. The current in the Base wire is small because only a few electrons are needed in order to change the BE voltage and the thickness of the Emitter's depletion zone.

A voltage in one place controls a flow of charge in another. This fact even determines the name of the entire device. Changing a voltage causes a change in current, so the device behaves somewhat like a resistor. But the voltage that controls the current is on an entirely different wire. It's as if the effects of the voltage are transferred from the Base side of the circuit to the Collector side. Transfer resistor. Transistor.

16.BASE VOLTAGE CONTROLS COLLECTOR CURRENT.
17.PURE LUCK?: THE BASE LEAKAGE IS PROPORTIONAL TO COLLECTOR CURRENT.
18.TRANSISTORS ARE **NOT** CURRENT AMPLIFIERS. BUT IT CERTAINLY SIMPLIFIES THINGS IF WE PRETEND THAT THEY ARE.

So, was this explanation too big and nasty? It certainly would be easier if all the textbook authors themselves had a better idea of how transistors work. It would be easier if they stopped telling people that transistors "amplify current." And it certainly would be easier if I get off my butt and create some animations to illustrate the above text!

---------

PS
The transistor was invented around 1923, by physicist Dr. J. Edgar Lilienfeld, the father of the modern electrolytic capacitor. WHAT?!!! But everyone knows that it was invented at Bell Labs in 1945. Nope. The original transistor was a 1920s thin-film device deposited on glass. The base region was a clever idea: crack a piece of glass, put it back together with metal foil clamped in the crack, then slice off the extra foil to make a flat surface that goes: glass, metal, glass. Deposit a thin layer of semiconductor and heat the device, and the thin metal line will "dope" that part of the semiconductor layer. Simple! Dr. Lillienfeld apparently had a multi-transistor radio which he was showing around to investors. But Dr. Lillienfeld unfortunately didn't have a solid theory to explain how his invention worked, so it was ignored. Some hobbyist should try making a home-built Lilienfeld transistor.

Lilienfeld's patent numbers are:

- [1,745,175](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,745,175.WKU.&OS=PN/1,745,175&RS=PN/1,745,175) Method and Apparatus for Controlling Electric Currents
- [1,877,140](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,877,140.WKU.&OS=PN/1,877,140&RS=PN/1,877,140) Amplifier for Electric Current
- [1,900,018](http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=/netahtml/srchnum.htm&r=1&f=G&l=50&s1=1,900,018.WKU.&OS=PN/1,900,018&RS=PN/1,900,018) Device for Controlling Electric Current

[Click on IMAGES button to view them.]

These patents caused Bardeen, Brattain, and Shockley some grief, and caused the US Patent Office to disallow the Bell Labs FET patents in later years.

PPS
It's possible to make a transistor using Galena (lead sulfide, PbS). Galena is often available from rock shops and science museum stores. You can even make your own by melting sulfur and lead powder over a flame. Look up keywords such as "cat's whisker diode" and "crystal radio" to find out more.

The trick to making a transistor is to use a freshly-cleaved crystal face, to sharpen your cat's-whisker contacts by dissolving the tips using electrolysis, and then to put the tips within 0.05mm of each other (or preferrably within 0.01mm). Obviously the latter is the hardest part. Better use a microscope! The authors of the following article found that the base/emitter junction was critical: it HAD to behave as a good rectifier. The base/collector junction wasn't as important. They got some power gain, but their beta was in the single digits. [Others](http://web.archive.org/web/20070601000000*/http://ourworld.compuserve.com/homepages/Andrew_Wylie/homemade.HTM) have mentioned that if you break open a 1N34 glass diode to expose the Germanium chip, you can make a crude transistor with a similar procedure.

> Crystal Triode Action in Lead Sulphide, P. C. Banbury, H.A. Gebbie, C. A. Hogarth, pp78-86. SEMI-CONDUCTING MATERIALS, Conference proceedings, H.K. Henisch (ed), 1951 Butterworth's scientific publications LTD 1951.

PPPS
WHAT ARE TRANSISTORS USED FOR? Ah, that's a whole 'nother article. But here's one example. Computers are made out of processors and memory. Processors are made out of "state machines" and "data selectors," while memory is made out of data selectors and the flipflops that store the individual bits. State machines in turn are are made out of data selectors, and data selectors are made out of nand-gates or nor-gates. Memory flipflops are made out of nand-gates or nor-gates. Everything is made out of Nand or Nor gates. And... nand-gates and nor-gates are made out of transistors.

So... computers are entirely made out of transistors. If computers are like animals, then animals are made of tissues, which are made of cells, which are made of organelles, which are made of proteins, which are made of molecules, which are made of atoms. Yet an animal is entirely made of atoms, and everything else is just interesting patterns in those atoms. Digital electronics has similar levels of complexity and organization, and in digital electronics, the transistor is the "atom." The transistor looks too simple though. It looks uninteresting. Ah, but when you have clusters of transistors hooked together in various ways, then you'll learn all the fascinating things you can do with them.

PPPPPPPS
People often ask: is a transistor an amplifier, or is it some sort of valve? The answer is yes. The answer is yes because all valves are amplifiers. How much energy does it take to open a water faucet? Now think about the large amount of work the flowing water can perform. A nicely made faucet could be opened and closed with the force from just one finger, but connect the output to a water turbine, and it can do work at a rate of many horsepower. The energy of your finger motion is multiplied by tens of thousands of times. Yet it's the distant power supply; the city water pumps, which actually do the work. Transistors behave in much the same way. Connect a transistor to a power supply, and you've got a crude amplifier.

PPPPPPPPPPPS
This article apparently has triggered extensive debates if not flamewars on multiple hobbyist forums, newsgroups, and WP. It's as if many people see Ic=hfe*Ib as holy scripture, while the Shockley equation Ic=Is(e^Vbe/Vt) is Dark Heresy which must be kept from the delicate ears of children. The cause of controversy is fairly obvious: at early stages we're all taught that BJTs are current-controlled devices, and only in later engineering physics courses is this claim held up to the harsh spotlight of critical questioning. Also, the current-control viewpoint works just fine as long as we give it lip service and then turn around and use Spice programs, or as long as we never look too closely at details of the inner workings of the physics. This situation leads most people to firmly decide that Ic really is affected by Ib, and not by Vbe. (Or perhaps they believe that, in diodes, the Vf diode drop is caused by the current?) I note that these debates all seem to feature typical flaws:

1. Primary is a sort of backwards reasoning: first we take a stance for (or against) current control. Then we hotly defend that stance against all comers while cherry-picking the supporting evidence and ridiculing all contrary evidence. But that's not reason. That's religion or politics. It's how pseudoscientists operate. Science is the very opposite: in science, first we try like hell to avoid rigid preconceptions and emotional biases. We take no stand for or against. Then we honestly ask which side of any debate is actually right: ask whether transistors really are controlled by voltage or by current. And then we take the answers seriously, without desperately twisting facts to avoid losing face in public, without breaking sweat while having steam shoot out our ears, and without descending into mild insanity triggered by psychological denial that we're not the experts we thought we were, and now everybody has seen that we're on the 'losing' side. :)
2. Second problem: is the current-controlled viewpoint really held by all scientists and engineers everywhere, while voltage control is terribly wrong? Nope. Look at the Ebers-Moll section of Sedra/Smith, Horowitz/Hill, or most any engineering text. Don't trust opinions from people on forums, instead go out and actually ask some engineering authors (many are online!) Ask semiconductor physicists. Ask professional engineers. [Their answers may surprise you](http://cr4.globalspec.com/comment/720033/Re-Voltage-vs-Current). And don't ask them about abstract models of black-box transistors, ask about the topic of this article: the internal physics: ask whether Vbe or Ib determines Ic, ask what is the origin of Ebers-Moll and the Shockley equation, and what role does Ib and hfe actually plau?)
3. Third problem: transient Ib currents seem to cause confusion. Whenever Vbe changes value, charges obviously must move during the changing profile of the depletion layer, and this requires a momentary charge-flow in the base lead. I've seen several people proclaiming that this proves that Ib "causes" Vbe. No, that's a clear attempt to twist facts. The potential barrier in a semiconductor junction isn't "caused" by current any more than the voltage across a capacitor sitting on a shelf is being "caused" by any continuing current. In truth it just means that a changing capacitor voltage always requires a momentary current. To explain the high frequency behavior of BJTs, we need Gummel-Poon and not just Ebers-Moll. Gummel-Poon is another voltage control model, just like Ebers-Moll. This issue doesn't apply to the low-freq or DC case where Ic=Is(e^Vbe/Vt) where Vbe isn't changing, and the values of Vbe, Ic, and Ib are all connected together. The Ebers-Moll model shows that Ic is proportional to Vbe, but in order to see this in simple direct fashion, we must ignore the Emitter- Base capacitance and any transient currents which are charging/discharging the Base capacitance during changing conditions.
4. Fourth problem: we've all been taught that BJT transistors are totally different than FET transistors. After all, BJTs are bipolar, require PN junctions, need both electrons and "holes." Well, this is wrong. There, I've said it. (Next flamewar can start now!) Transistors aren't inherently bipolar. Schockley didn't know what he was talking about at the time. Today it's too big of an error to try correcting, or even to face. The theory behind Schottky diodes, where metal and N-type doping cause rectification without holes, came later. Yet point-contact diodes predate everything. It's possible to use N-doped silicon to make metal-semiconductor junctions and construct a BJT transistor which contains no PN junctions and uses no holes. Build a model of the very first point-contact transistor using N-type germanium. No PN, just N--, N. (A BJT transistor which isn't bipolar? HERESY!)
All this stuff just highlights the central difference between FETs and BJTs: in FETs the insulating regions invade from the side and make the conductive path narrower. BJTs are very different, since their insulating region is permanently in position, cutting across the Emitter's conductive path, but it can be made so thin that it cannot block even an immense charge flow. If FETs are like "electricity shutters," then a BJT is like "electricity sunglasses" where you can alter the opacity. Make the barrier more and less conductive, rather than making a channel wider and narrower. Aaaaaand... holes aren't an absolute requirement for forming a depletion layer. We just need to sweep the mobile charges out of the silicon. In other words, BJTs don't need the "B," just the "JT." (Now just try to imagine a huge community like EEs and Techs all trying to admit the mistake, and attempting to go back and change the name of the Bipolar Junction Transistor to fit the facts! Ain't gonna happen.)
5. Fifth problem: the widespread, repeated, and confident claim that, when we shine light on a phototransistor, Ic changes, but Vbe does not. Ic can be anything, while Vbe remains zero. Uh. Hmm. That's not like the phototransistors I've used in the past. Those acted like photodiodes, with Vbe varying with illumination. Well, no matter how confident or how repeated the pronouncement, it's easier to just buy some PTs and see what actually happens. First control Ic with a Base connection and recorde Vbe versus Ic, then remove the Base wire and control Ic with light, again recording Vbe versus Ic. Or put it this way: do BJT phototransistors completely ignore the Shockley equation which rules all other BJTs?
6. Sixth problem: down inside any resistor, the current density is controlled by the value of e-field, but the e-field isn't determined by the current density. Huh? Try again: charges get accelerated by electrostatic fields, but the reverse is not true: an accelerating charge is not the cause of that e-field. At the macroscopic level, this means that voltage causes current. E-fields cause charges to accelerate, so voltage causes current. Voltage always causes current. Current cannot cause voltage.

Whaaaaat? Before you get in a lather, make note of the following. Yes, if we already know the values of the current and resistance, we can easily work backwards and calculate the voltage which was causing the current. Current can reveal the value of an unknown voltage, if resistance is known. But the resistor itself doesn't operate backwards: the e-field accelerates the mobile charges, and not the reverse. (Similarly, a gravitational potential pulls a dropped rock downwards, but if you manually accelerate a rock towards a surface, this doesn't create a gravity potential.) And so in diodes, Vf determines the diode current, but the current doesn't cause Vf. Yet isn't all of this crazy talk, because Ohm's law works fine when we assume that current causes voltage. Yes, that's right, and it's because Ohm's law ignores the internal physics. Ohm's law is a simplified abstract model; a mental tool, and a very useful one. It treats a resistor as a black box. But Ohm's law is "wrong" in that it incorrectly implies forward and reverse causation between e-fields and carrier drift. As a mental model, "current causes voltage" is incredibly useful. But if we start believing that this convenient mental model is actually true, it's a classic error called "reification." See where I'm going with this? The belief that BJTs are current controlled devices is a good example of the [Reification Fallacy](http://en.wikipedia.org/wiki/Reification_%28fallacy%29): a belief that a simplified abstract concept; a convenient mathematical model, has a real-world concrete existence. It also appears to be an example of Piagetian "Concrete Operational" thinking mode of childhood, where everything has to be real, and abstract mental models aren't accepted as valuable, or used as tools, since they don't exist in the real world.
 


