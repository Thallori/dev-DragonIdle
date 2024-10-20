
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
        { m: "Oh! We finally found you!" },
        { m: "Hello! We haven't met yet." },
        { m: "But we will soon! ♥" },
        { m: "Right at the end of the Vale, on top of the tower." },
        { m: "Try not to mention me. We weren't happy to see you back then." },
        { m: "Time is funny that way." },
        { m: "Better get to unsealing the world!" },
        {
            q: "We know how much you just loved doing that...",
            r1: ["Respond Curiously", 'intro1'],
            r2: ["Respond Menacingly", 'intro2', 'unlockCombat'],
        },
        { label: 'intro1', m: "Paitence, little one, everything has a proper order.", e: true },
        { label: 'intro2', ma: ["You always were a rude little thing.", 2800], e: true },
    ],
    loop1: [
        { id: 'loop1' },
        { m: "Oh! We finally found you!" },
        { m: "Hello! We haven't met yet." },
        { m: "But... No, we have met!" },
        { m: "Congratulations on getting past our giant, the old softie.", f: { pacifist: true }, next: 'p' },
        { m: "Congratulations on tearing apart our giant.", f: { genocide: true }, next: 'g' },
        //neutral
        { m: "Congradulations on besting our giant." },
        { m: "We hope the battle didn't hurt their garden too much.", f: { flawedPacifist: true } },
        { m: "Not that we'd know! ♥", f: { flawedPacifist: true }, next: 'fp' },
        { m: "We hope you enjoyed their garden, no one else will! ♥" },
        { label: 'fp', m: "After all, we left for the Republic and never looked back." },
        { m: "Don't take too long chasing us, little thing... Or do!" },
        { ma: ["We know how much you loved dissapointing us...", 3500], e: true },
        //pacifist
        { label: 'p', m: "We hope you enjoyed their flowers!" },
        { m: "Make sure to scrub all that acid off before heading back out! ♥" },
        { m: "You followed us to the Republic after that." },
        { m: "It would be so dissapointing, failing to outrun a little thing like you..." },
        { m: "Covered in little burns...", e: true },
        //genocide
        { label: 'g', m: "We hope you enjoyed trashing their gardens." },
        { m: "Next on the chopping block, our favourite Republic senators. ♥" },
        { m: "Don't keep us waiting too long, little thing... Or do!" },
        { ma: ["We know how much you loved to dissapointing us...", 3500], e: true },
    ],
    words: [
        { id: 'words' },
        { m: "It looks like you've found a word! Lucky you!" },
        { m: "We knew you could do it. ♥" },
        { m: "Unfortunately, the game developer hasn't implimented this yet!" },
        { m: "You can still collect them, but they are useless right now.", e: true },
    ],
    showHug: [
        { id: 'showHug' },
        { m: "Hello! We've been watching you and let us just say..." },
        { m: "You're a lot slower than we remember!" },
        { m: "Vale. Top of the tower. Ring any bells?" },
        { m: "...", f: { pacifist: true }, next: 'p' },
        //neutral
        { m: "Scared of getting your little nose bloody? We both know you can't die." },
        { m: "Not here and not now." },
        { m: "Or perhaps you've lost the taste for combat." },
        {
            q: "Did you know there's a way to get to us without hurting anyone?",
            r1: ["Yes", 'unlockedHugging3'],
            r2: ["No", 'unlockedHugging4'],
        },
        { label: 'unlockedHugging3', m: "Who told you?" },
        { m: "This better be the first time we're having this conversation." },
        { m: "It would be absolutely dreadful if this was part of the loop." },
        { m: "Of course, you could simply be a little liar! ♥", next: 'act2' },

        { label: 'unlockedHugging4', m: "Thank goodness!" },
        { m: "We always appreciate the opportunity for a lesson. ♥", next: 'act2' },
        //pacifist
        { label: 'p', m: "Oh. Nevermind. We just looked around this timeslice and..." },
        { m: "This really is all our fault." },
        { m: "You haven't even tried to kill anyone yet!" },
        { m: "Not even one of those cute animals!", f: { ultraPacifist: true } },
        {
            q: "Here, allow us introduce you to a wonderful opportunity...",
            r1: ["Refuse", 'unlockedHugging1'],
            r2: ["Accept", 'unlockedHugging2'],
        },
        { label: 'unlockedHugging1', m: "Aw. Don't get shy now." },
        { m: "There are ways to reach us without giving into a little murder. ♥"},
        { m: "Let us teach you a thing or two about the proper way to act...", next: 'act' },

        { label: 'unlockedHugging2', m: "Excellent! Another chance to disappoint us! ♥" },
        { label: 'act2', m: "Now then, we know it's hard, but..." },

        { label: 'act', m: "If you refuse to hurt someone, they'll eventually hear you out." },
        { m: "Everyone has a limit." },
        { m: "At our end of the time stream, you've been... Well, let's just say..." },
        { ma: ["Every rude little thing has to meet us sooner or later.", 3500], e: true },
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
        { label: 'n3', m: "It seems it can't be helped." },
        { m: "Just when you think the work is done, a little imperfect flec comes crawling out." },
        { m: "We're not worried, little one." },
        { m: "You'll fail like all the others." },
        { m: "Then we'll fix this disappointing incident..." },
        { ma: ["...and put you back where you belong...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE NEUTRAL ROUTE]", next: 'end' },
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
        //pacifist
        { label: 'p', m: "You're quite the surprise." },
        { m: "Our old friend doesn't easily stand down." },
        { m: "We're you nice to its flowers?" },
        { m: "Don't answer. It doesn't matter." },
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
        { m: "[MAX LEVEL INCREASED TO 6, MAX AREAS INCREASED TO 4, MECHANICS UNLOCKED]", next: 'end2' },
        //genocide
        { label: 'g', m: "You've been killing an awful lot of people to get our attention." },
        { m: "Those denizens may get rekindled to their optimum time." },
        { m: "But that doesn't mean they didn't die." },
        { m: "All this killing is quite rude." },
        { m: "It seems it can't be helped, your kind have never respected boundries." },
        { m: "Look at us, getting all worked up just thinking about it." },
        { m: "Go off now, murder your little heart out. You'll get bored." },
        { ma: ["Then we can begin repairing all the damage you've done...", 3500] },
        { m: "[YOU HAVE FINISHED ALPHA ONE ON THE COMBAT-ONLY ROUTE]", next: 'end' },
        //all
        { label: 'end', m: "[MAX LEVEL INCREASED TO 6, MAX AREAS INCREASED TO 4, MECHANICS UNLOCKED, AUTO USE BEST STANCE UNLOCKED]" },
        { label: 'end2', m: "[YOU MAY CONTINUE TO PLAY, BUT THERE IS ONLY PLACEHOLDER ASSETS AND UNFINISHED GAMEPLAY BEYOND THIS POINT]", e: true },
    ],

    combatDummy: [
        { id: 'combatDummy', combat: true },
        { m: "..." },
        { m: "You ain't gonna hurt me?", f: { pacifist: true }, next: 'p' },
        { m: "Hey bud, what's the big idea?" },
        {
            q: "Don't'cha know I don't get paid if I don't get hit?",
            r1: ["Apologize", 'combatDummy1'],
            r2: ["Offer New Job", 'combatDummy3'],
        },

        { label: 'p', m: "That's no good." },
        { m: "I ain't doin' me job if ya don't practice." },
        { m: "Wait, aren't ya one of those no-kill folks?" },
        {
            q: "Ya know, ya can't kill what ain't alive, dumbnuts.",
            r1: ["Apologize", 'combatDummy1'],
            r2: ["Confess Completionism", 'combatDummy2'],
            // r2: ["Confess Completionism", 'combatDummy2', 'unlockCombat'],
        },

        { label: 'combatDummy1', m: "Just don' do it again.", e: true },
        { label: 'combatDummy2', m: "That'll never happen if you keep acting up."},
        { m: "Some stuff just can't be got the nice way.", e: true },
        { label: 'combatDummy3', m: "No way, bud. I'm already doin' what I love.", e: true },
    ],
}