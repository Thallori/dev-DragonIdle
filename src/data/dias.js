
export default {
    //m: message
    //ma: [message with auto advance, how long to show in miliseconds]
    //q: question
    //rx: [responses, to label, run function]
    //f: flags in skillStore, only make line active if all flags match
    //next: always jump to label (useful if f has flags)
    //label: jump target
    //e: is end message
    intro: [
        { id: 'intro' },
        { m: "Oh! I finally found you!" },
        { m: "Hello! We haven't met yet." },
        { m: "But we will soon!" },
        { m: "Right at the end of the Sequence 3, at the top of the tower." },
        { m: "Try not to mention me. I wasn't happy to see you back then." },
        { m: "Time is funny that way." },
        { m: "Better get to unsealing the world!" },
        {
            q: "I know how much you just loved doing that...",
            r1: ["Respond Curiously", 'intro1'],
            r2: ["Respond Menacingly", 'intro2', 'unlockCombat'],
        },
        { label: 'intro1', m: "Paitence, little one, everything has a proper order.", e: true },
        { label: 'intro2', ma: ["You always were a rude little thing.", 2800], e: true },
    ],
    showHug: [
        { id: 'showHug' },
        { m: "Hello! We've been watching you and let us just say..." },
        { m: "You're a lot slower than we remember!" },
        { m: "Sequence 3. Top of the tower. Ring any bells?" },
        { m: "..." },
        { m: "Oh. Nevermind. We just looked around this timeslice and..." },
        { m: "This really is all our fault." },
        { m: "You haven't even tried to kill anyone yet!" },
        {
            q: "Here, allow us introduce you to a wonderful opportunity...",
            r1: ["Refuse", 'unlockedHugging1'],
            r2: ["Accept", 'unlockedHugging2'],
        },
        { label: 'unlockedHugging1', m: "Aw. Don't get shy now." },
        { m: "Every rude little thing has to obey time sooner or later...", e: true },
        { label: 'unlockedHugging2', ma: ["Can't wait for you to dissapoint us again, little thing!", 2800], e: true },
    ],

    dungeon2: [
        { id: 'dungeon2', combat: true },
        { m: "...Oh. Hello." },
        { m: "Are you the one who's been breaking our seals?" },
        { m: "Those weren't easy to put up." },
        { m: "...", f: { pacifist: true }, next: 'p' },
        { m: "...", f: { flawedPacifist: true }, next: 'fp' },
        { m: "...", f: { genocide: true }, next: 'g' },
        //neutral
        { m: "My you've been busy." },
        { m: "A little vandalism here, a little murder there." },
        {
            q: "Did you ever stop to think that the world was frozen for a reason?",
            r1: ["Yes", 'n1'],
            r2: ["No", 'n2'],
        },
        { label: 'n1', m: "Your actions say otherwise.", next: 'n3' },
        { label: 'n2', m: "Of course you didn't. Your kind have never respected boundries." },
        { label: 'n3', m: "I suppose it can't be helped." },
        { m: "Just when you think the work is done, a little imperfect flec comes crawling out." },
        { m: "We're not worried, little one." },
        { m: "You'll fail like all the others." },
        { m: "Then we'll fix this disappointing incident..." },
        { ma: ["...and put you back where you belong...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE NEUTRAL ROUTE]", next: 'end' },
        //pacifist
        { label: 'p', m: "You're quite the surprise." },
        { m: "Our old friend doesn't easily stand down." },
        { m: "We're you nice to its flowers?" },
        { m: "I suppose it doesn't matter." },
        { m: "You're still breaking the seals." },
        { m: "The world is frozen for a reason, you know." },
        { m: "Time doesn't make people happy." },
        {
            q: "Have you ever had a moment you wished could last forever?",
            r1: ["Yes", 'p1'],
            r2: ["No", 'p2'],
        },
        { label: 'p1', m: "Then you understand our work.", next: 'p3' },
        { label: 'p2', m: "Perhaps you're too young for that...", next: 'p3' },
        { label: 'p3', m: "We'd like you to give up. Even if you don't, we won't worry." },
        { m: "Listen carefully, little one." },
        { m: "You'll fail like all the others." },
        { m: "Then we'll fix this disappointing incident..." },
        { ma: ["...and put you back where you belong...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE PACIFIST ROUTE]"},
        { m: "[MAX LEVEL INCREASED TO 8]", next: 'end2' },
        //flawed pacifist
        { label: 'fp', m: "My you've been busy." },
        { m: "After starting as a simple vandal..." },
        { m: "You worked your way up to murder." },
        { m: "...Perhaps you're not completely lost." },
        {
            q: "Did you know the world was frozen for a reason?",
            r1: ["Yes", 'fp1'],
            r2: ["No", 'fp2'],
        },
        { label: 'fp1', m: "Then why do you persist, little one?", next: 'fp3' },
        { label: 'fp2', m: "Then listen carefully, little one..." },
        { label: 'fp3', m: "Time doesn't make people happy." },
        { m: "Being murdered especially doesn't make people happy." },
        { m: "We'd like you to give up. Even if you don't, we won't worry." },
        { m: "You'll fail like all the others." },
        { m: "Then we'll fix this disappointing incident..." },
        { ma: ["...and put you back where you belong...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE NEUTRAL+ ROUTE]", next: 'end' },
        //genocide
        { label: 'g', m: "You've been killing an awful lot of people to get our attention." },
        { m: "Those denizens may get rekindled to their optimum time." },
        { m: "But that doesn't mean they didn't die." },
        { m: "All this killing is quite rude." },
        { m: "I suppose it can't be helped, your kind have never respected boundries." },
        { m: "Look at us, getting all worked up just thinking about it." },
        { m: "Go off now, murder your little heart out. You'll get bored." },
        { ma: ["Then we can begin repairing all the damage you've done...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE COMBAT-ONLY ROUTE]", next: 'end' },
        //all
        { label: 'end', m: "[MAX LEVEL INCREASED TO 8, AUTO USE BEST STANCE UNLOCKED]" },
        { label: 'end2', m: "[YOU MAY CONTINUE TO PLAY, BUT THERE IS ONLY PLACEHOLDER ASSETS AND UNBALANCED GAMEPLAY BEYOND THIS POINT]", e: true },
    ],

    combatDummy: [
        { id: 'combatDummy', combat: true },
        { m: "..." },
        { m: "You ain't gonna hurt me?", f: { pacifist: true }, next: 'p' },
        { m: "Hey bud, what's up?" },
        {
            q: "Don'tcha know I don't get paid if I don't get hit.",
            r1: ["Apologize", 'combatDummy1'],
            r2: ["Offer New Job", 'combatDummy3'],
        },

        { label: 'p', m: "That's no good." },
        { m: "I ain't doin' me job if ya don't practice." },
        { m: "Wait, aren't ya one of those no-kill folks?" },
        {
            q: "Ya know, ya can't kill what ain't alive, dumbnuts.",
            r1: ["Apologize", 'combatDummy1'],
            r2: ["Confess Completionism", 'combatDummy2', 'unlockCombat'],
        },

        { label: 'combatDummy1', m: "Just don' do it again.", e: true },
        { label: 'combatDummy2', m: "That'll never happen if you keep acting up. Here, lemme teach ya a thing or two about max hits.", e: true },
        { label: 'combatDummy3', m: "No way, bud. I'm already doin' what I love.", e: true },
    ],
}