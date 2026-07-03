# Kodly — C Programming Curriculum
## Designed for ages 13–15 · No math knowledge assumed

Every concept follows the same 4-step pattern:
- 🌍 **World** — the real-life setting
- 💡 **Analogy** — the explanation without code
- 🎮 **Interact** — what the learner does before seeing syntax
- 🔒 **Concept Lock** — the one truth they must leave with
- ⚠️ **Gotcha** — the mistake every beginner makes

---

## Module 01 — Basics

### Lesson 1.1 — Variables

#### § 1.1 Variables — "Your Locker at School"

- 🌍 **World:** School corridor with numbered lockers
- 💡 **Analogy:** A locker has a name tag on it (variable name) and something inside (value). You can swap what's inside any time, but the locker stays in the same spot. Only one thing fits at a time.
- 🎮 **Interact:** Type any value into an on-screen locker → it appears on the label. Type something new → the old value visually pours out and the new one drops in.
- 🔒 **Concept Lock:** A variable is a named container. The name stays the same. The value inside can change. Every piece of data a program "remembers" lives in a variable.
- ⚠️ **Gotcha:** If you write `b = a`, and then change `a`, `b` does NOT change. You copied the value, not a live link.

---

#### § 1.2 Datatypes — "Wrong Container, Wrong Fit"

- 🌍 **World:** A kitchen shelf with different container types (water bottle, stamp pad, notepad)
- 💡 **Analogy:** A water bottle holds liquid (numbers). A single rubber stamp holds one letter (char). A notepad holds words (strings). Pouring water into a stamp pad breaks things. C has the same rules — each type of data needs the right shaped container.
  - `int` → whole numbers (no decimal)
  - `float` → decimal numbers
  - `char` → one single letter or symbol
- 🎮 **Interact:** Drag items (a price tag ₹50, a letter A, a word "hello") onto container silhouettes. Wrong drop bounces back with a plain-language reason. Right drop animates into the container.
- 🔒 **Concept Lock:** Every value has a type. The type decides what shape container it needs and what C can do with it. Putting the wrong type in the wrong container doesn't always crash — it silently loses information.
- ⚠️ **Gotcha:** `int score = 9.8;` → score becomes `9`, not `9.8`. No error. The decimal is silently cut off.

---

#### § 1.3 I/O — "Your Program Texts You"

- 🌍 **World:** A messaging app conversation
- 💡 **Analogy:** `printf` is your program sending you a message on screen. `scanf` is your program waiting for your reply. The `&` in scanf means "store the reply in THIS specific locker" — it's pointing at the locker by its address so the answer lands in the right place.
- 🎮 **Interact:** A half-written conversation appears on screen. The learner fills in the blanks — the format string, the variable name, the `&`. Hit Run → real simulated output appears that changes based on what they typed.
- 🔒 **Concept Lock:** Programs communicate through output (speaking) and input (listening). `printf` sends text out. `scanf` waits for text in. The `&` tells scanf which locker to fill — without it, the answer goes nowhere.
- ⚠️ **Gotcha:** Forgetting `&` in `scanf(&name)` is one of the most common beginner mistakes. No crash, but the value never gets stored.

---

### Lesson 1.2 — Operators

#### § 2.1 Arithmetic — "Splitting the Restaurant Bill"

- 🌍 **World:** A table of friends splitting a restaurant bill
- 💡 **Analogy:**
  - `+` — adding more items to the bill
  - `-` — removing someone's order
  - `*` — ordering 3 of the same thing (just adding it 3 times)
  - `/` — splitting the total equally among everyone
  - `%` — the leftover coins after splitting equally (17 samosas ÷ 5 friends = 3 each, **2 left over** — that's the modulus)
- 🎮 **Interact:** A virtual restaurant table. Add/remove items, watch the total update. A "split" button shows division. A "leftover" tray shows the remainder before the `%` symbol appears.
- 🔒 **Concept Lock:** `%` gives you the remainder after equal sharing — not the result of the division. `7 / 2 = 3` in C (whole numbers cut off decimals). `7 % 2 = 1` (what's left over).
- ⚠️ **Gotcha:** `7 / 2` in C gives `3`, not `3.5`. Whole-number division always drops the decimal. To get `3.5`, at least one number must be a decimal: `7.0 / 2`.

---

#### § 2.2 Shorthand Operators — "A Score Counter"

- 🌍 **World:** A video game score counter
- 💡 **Analogy:** Instead of saying "take my current score, add 100 to it, put it back in the score box" — you just press +100. That's `score += 100`. The bar animates up. Pull it down with `-=`. `=` replaces everything. `==` just checks — it doesn't touch the score at all.
- 🎮 **Interact:** A score display with operator buttons (`+= 50`, `-= 10`, `*= 2`). Each button animates the score changing. A separate "Is it equal to 100?" button shows `==` as a read-only check — no change.
- 🔒 **Concept Lock:** `+=` means "add to what's already there." `=` means "replace with this." `==` means "are these the same?" — it never changes anything. Mixing `=` and `==` is one of the most common bugs in all of C.
- ⚠️ **Gotcha:** `if (score = 100)` assigns 100 to score AND is always true. `if (score == 100)` actually checks. The single `=` is a trap.

---

#### § 2.3 Comparison — "The Weighing Scale"

- 🌍 **World:** A kitchen balance scale
- 💡 **Analogy:** Put two things on a scale. Is the left heavier? Lighter? Exactly equal? The answer is always one of two things: **Yes** or **No**. C stores Yes as `1` and No as `0` — but you never write those numbers yourself. You just write the comparison.
- 🎮 **Interact:** Drag weights onto two pans. Choose an operator (`<`, `>`, `==`, `!=`, `<=`, `>=`). The scale physically tilts and shows Yes / No. The C equivalent (1 or 0) reveals afterward.
- 🔒 **Concept Lock:** A comparison always produces exactly one result: true (1) or false (0). It never changes a value. Comparisons are the only way to make a program make a decision.
- ⚠️ **Gotcha:** `5 = 5` is an error (you can't assign to a literal). `5 == 5` is a comparison (result: 1). Always two equals signs when checking.

---

#### § 2.4 Logical Operators — "Club Entry Rules"

- 🌍 **World:** A club entrance with a bouncer
- 💡 **Analogy:**
  - `&&` — "You need to be on the guest list **AND** have a ticket. Either alone won't work."
  - `||` — "You can pay with cash **OR** card. One is enough."
  - `!` — "**NOT** raining" means the opposite of whatever raining's value is.
- 🎮 **Interact:** Toggle switches (on-list: yes/no, has-ticket: yes/no). Choose `&&` or `||`. See whether the gate opens. Then flip with `!`. No truth tables — just "does this combination let you through?"
- 🔒 **Concept Lock:** `&&` needs BOTH sides true. `||` needs at least ONE side true. `!` flips true↔false. These are the building blocks of every rule a program ever follows.
- ⚠️ **Gotcha:** `if (age > 12 && < 18)` is invalid. You must write each side fully: `if (age > 12 && age < 18)`.

---

#### § 2.5 Precedence — "Getting Ready in the Morning"

- 🌍 **World:** A morning routine (fixed steps in a fixed order)
- 💡 **Analogy:** You can't put your shoes on before your socks. You can't frost a cake before it bakes. Some things always happen before others. C calculates in a fixed order: `*` and `/` before `+` and `-`. Parentheses are like calling in a "priority order" — do this first, no matter what.
- 🎮 **Interact:** A simple expression like `2 + 3 * 4` appears. Learner guesses the answer. C reveals it's `14` (not `20`). Then brackets are added: `(2 + 3) * 4 = 20`. The two results animate side-by-side.
- 🔒 **Concept Lock:** C calculates in a fixed order. Multiplication and division happen before addition and subtraction. Parentheses always override that order.
- ⚠️ **Gotcha:** `2 + 3 * 4` = `14` not `20`. When unsure, add parentheses — they make your intention clear and your code safer.

---

## Module 02 — Decision Making

### Lesson 2.1 — The if Statement

#### § 3.1 if — "The School Canteen Gate"

- 🌍 **World:** A canteen with a gate that only opens for students with an ID
- 💡 **Analogy:** The guard checks one condition: "Do you have a student ID?" If yes → you walk through. If no → you wait outside. The code inside `{}` only runs when the condition is true.
- 🎮 **Interact:** Toggle "has ID" on/off. Watch the gate swing open or stay shut. Then the equivalent C code fades in — the learner can see exactly which line caused the gate to open.
- 🔒 **Concept Lock:** `if` runs its block ONLY when the condition is true. When false, the entire block is skipped, as if it isn't there.
- ⚠️ **Gotcha:** `if (score == 100);` — that semicolon after the condition makes the if do nothing, and the block below always runs regardless.

---

#### § 3.2 else / else if — "The Multi-Floor Lift"

- 🌍 **World:** A school lift with buttons for 3 floors
- 💡 **Analogy:** Press floor 1 → café. Press floor 2 → library. Press floor 3 → gym. Exactly one floor opens. If no recognised button is pressed, the doors stay shut (the `else` at the end). The lift doesn't try all floors — it checks from the top, finds the first match, and goes there.
- 🎮 **Interact:** A lift panel with 4 buttons (1, 2, 3, anything else). Press one → the lift animates to that floor. The matching `else if` block highlights in code view.
- 🔒 **Concept Lock:** `else if` chains are checked in order from top to bottom. The FIRST true condition runs its block. All others are skipped completely.
- ⚠️ **Gotcha:** Order matters. If two conditions could both be true, only the first one in the chain runs.

---

### Lesson 2.2 — The switch Statement

#### § 3.3 switch — "A Vending Machine"

- 🌍 **World:** A vending machine with numbered slots
- 💡 **Analogy:** Press 1 → chips. Press 2 → water. Press 3 → chocolate. Unknown number → nothing comes out (default). `break` means the machine stops after dispensing. Without `break`, it's like dominoes — it also triggers the next slot.
- 🎮 **Interact:** A vending machine UI. Press a number key. The matching slot lights up and "dispenses." Toggle break on/off per slot and watch fall-through happen (dominoes visual).
- 🔒 **Concept Lock:** `switch` matches one value to a list of cases. `break` stops it after the match. Without `break`, execution falls through to the next case automatically.
- ⚠️ **Gotcha:** Forgetting `break` — if case 2 has no break, and you press 2, cases 2 AND 3 AND 4... all run until a break is found.

---

## Module 03 — Loops

### Lesson 3.1 — for Loop

#### § 4.1 for — "Stamping 30 Envelopes"

- 🌍 **World:** A school office printing letters for every student
- 💡 **Analogy:** You know you have exactly 30 students. You stamp 30 envelopes. You don't ask "should I keep going?" each time — you already know the count. The for loop packages the counter into the loop itself: start here, keep going until this, move forward by this much.
- 🎮 **Interact:** An envelope stamping animation. Set the count (e.g. 5). Watch 5 envelopes slide in, get stamped, slide out. The loop counter ticks visibly. Change the count and replay.
- 🔒 **Concept Lock:** `for` loops are for when you know exactly how many times to repeat. The counter is part of the loop: `for (start; condition; step)`.
- ⚠️ **Gotcha:** `for (i = 0; i < 10; i++)` runs 10 times (0 through 9). `i <= 10` runs 11 times. Off-by-one is the most common loop bug.

---

### Lesson 3.2 — while Loop

#### § 4.2 while — "Keep Stirring Until It Thickens"

- 🌍 **World:** Cooking a sauce on a stove
- 💡 **Analogy:** You don't know how many stirs it takes. You just keep stirring and checking after each stir: "Is it thick yet?" If yes, stop. If no, stir again. The condition is checked at the START of each round.
- 🎮 **Interact:** A pot with a "stir" button and a thickness meter. Condition shown as a speech bubble ("is it thick?"). Each stir raises the meter slightly. When the condition is met, the loop stops and the code reveals.
- 🔒 **Concept Lock:** `while` checks its condition BEFORE each repetition. If the condition is false from the start, the loop body never runs — not even once.
- ⚠️ **Gotcha:** If the condition never becomes false, the loop runs forever and freezes the program. Always make sure something inside the loop moves toward making the condition false.

---

#### § 4.3 do-while — "Try the Door, Then Decide"

- 🌍 **World:** Knocking on a friend's door
- 💡 **Analogy:** You knock at least once. Then you listen. If no answer, knock again. You always knock the first time — you don't check first whether anyone's home. That's do-while: do the action, THEN check whether to repeat.
- 🎮 **Interact:** A door animation. The learner knocks once automatically. A "Did anyone answer?" prompt appears. If no, it knocks again. Toggle the "answered" state to see when it stops.
- 🔒 **Concept Lock:** `do-while` always runs its block at least once. The condition is checked AFTER the first run.
- ⚠️ **Gotcha:** Even if the condition is false from the start, a do-while runs once. This surprises people coming from while loops.

---

#### § 4.4 break and continue — "The Broken Printer in a Row"

- 🌍 **World:** A row of printers in the school library
- 💡 **Analogy:**
  - `continue` — "This printer is jammed. Skip it, go to the next one." The loop skips the rest of this round and moves to the next.
  - `break` — "The fire alarm goes off. Everyone stops immediately, doesn't matter how many printers are left." The loop exits completely.
- 🎮 **Interact:** A row of 6 printer icons. Some are flagged "jammed," one is flagged "alarm." Watch the loop work through them — jammed ones get skipped (continue), and the alarm one stops everything (break).
- 🔒 **Concept Lock:** `break` exits the entire loop immediately. `continue` skips only the current iteration and jumps to the next one.
- ⚠️ **Gotcha:** `break` inside a nested loop only exits the INNER loop, not all loops. Each `break` exits one level.

---

## Module 04 — Functions

### Lesson 4.1 — Defining Functions

#### § 5.1 Functions — "A Recipe Card"

- 🌍 **World:** A recipe card in a kitchen
- 💡 **Analogy:** You write the pizza recipe once on a card. Every Friday you follow the same card. You don't rewrite the recipe each time. A function is a named recipe — write it once, run it any time just by saying its name.
- 🎮 **Interact:** A recipe card editor. Write the "steps" (function body). See a "make pizza" button appear. Press it and the recipe runs. Press it again — same steps run again. Then the code reveals: defining vs calling.
- 🔒 **Concept Lock:** Defining a function writes the recipe. Calling a function follows it. You must call a function to make it run — just defining it does nothing.
- ⚠️ **Gotcha:** Writing a function and forgetting to call it is like writing a recipe and never cooking. The code exists, but never runs.

---

#### § 5.2 Parameters — "Ingredients You Hand the Recipe"

- 🌍 **World:** A recipe with blank slots ("serves ___ people", "___ cups of flour")
- 💡 **Analogy:** The recipe has blanks. When you start cooking, you fill in the blanks. Those blanks are parameters. Each time you make the recipe, you can fill in different values — one time for 4 people, one time for 10.
- 🎮 **Interact:** A recipe card with labeled blank fields (servings, ingredient name). The learner fills them in. Hits "make it." The function runs with those values. Change the values, run again.
- 🔒 **Concept Lock:** Parameters are the labeled inputs a function needs. They work like named slots filled in when you call the function. Each call can pass different values.
- ⚠️ **Gotcha:** C passes copies of values (pass by value). Changing a parameter inside a function does NOT change the original variable outside.

---

#### § 5.3 Return Values — "The Takeaway Counter"

- 🌍 **World:** A takeaway food counter
- 💡 **Analogy:** You order (call the function). The kitchen prepares it (runs the code). It hands your order back to you (return value). If you order a snack, you get back one snack — you can use it however you like. `void` functions are like delivery drops — they bring the food but don't wait for a signature.
- 🎮 **Interact:** A counter simulation. Input an order → the kitchen "processes" it → a tray slides back with the result. The learner sees the return value arrive back at the call site in code.
- 🔒 **Concept Lock:** `return` sends a value back to the place that called the function and immediately stops the function. The returned value can be stored or used directly.
- ⚠️ **Gotcha:** Reaching the end of a non-void function without `return` is undefined behaviour. Always return a value from a function that promises one.

---

#### § 5.4 Scope — "Variables Only Live in Their Kitchen"

- 🌍 **World:** A restaurant with separate kitchens for each dish
- 💡 **Analogy:** The flour in Kitchen A doesn't affect Kitchen B, even if both call it "flour." Variables inside a function are local — they only exist while that function is running, then they're gone. Two functions can have a variable with the same name and they'll never interfere.
- 🎮 **Interact:** Two side-by-side kitchen windows. Each has its own "flour" counter. Changing one doesn't move the other. Then a global variable appears — one shared jar on a shelf both kitchens can see.
- 🔒 **Concept Lock:** Variables declared inside a function can't be seen or used outside it. They're created when the function starts and destroyed when it ends.
- ⚠️ **Gotcha:** A local variable and a global variable can share the same name. The local one "shadows" the global inside the function — the global is unchanged.

---

## Module 05 — Arrays

### Lesson 5.1 — Arrays

#### § 6.1 Declaring — "A Row of School Lockers"

- 🌍 **World:** A school corridor with a row of identical lockers
- 💡 **Analogy:** 30 lockers in a row, all for the same type of thing (sports kits). The array name is the sign at the start of the row. Each locker has a number. `scores[0]` is locker zero. `scores[29]` is the last one. They're all in the same row (same type, same name).
- 🎮 **Interact:** A row of lockers appears. Set a size (e.g. 5). Each locker gets a slot for a value. Fill them in → the array fills visually. Reference `scores[2]` → locker 2 glows.
- 🔒 **Concept Lock:** An array is a fixed-size row of same-type containers with one name. You access each one by its index number, starting from 0.
- ⚠️ **Gotcha:** `int scores[5]` creates lockers 0, 1, 2, 3, 4. There is NO `scores[5]`. Accessing it is like opening a locker that doesn't exist — C won't warn you, but the result is garbage or a crash.

---

#### § 6.2 Index from 0 — "Why the First Locker Is Number Zero"

- 🌍 **World:** A measuring tape on the floor
- 💡 **Analogy:** Imagine standing at the entrance of the row and counting steps to reach each locker. The first locker needs 0 steps — you're already there. That's [0]. The second needs 1 step → [1]. Counting starts from where you're standing, not from 1.
- 🔒 **Concept Lock:** The first element is always index 0. The last element is always index `(size - 1)`. This is not a quirk — it's how all arrays in C work.
- ⚠️ **Gotcha:** Beginners instinctively write `array[1]` for the first element. In C, that's the SECOND element. `array[0]` is always first.

---

#### § 6.3 Loops + Arrays — "A Teacher Checking Every Locker"

- 🌍 **World:** A teacher doing a locker inspection
- 💡 **Analogy:** The teacher doesn't teleport to random lockers. She starts at locker 0, checks it, moves to locker 1, checks it... all the way to the last one. A for loop does exactly this — the counter IS the index.
- 🎮 **Interact:** A row of lockers with a teacher figure. The for loop runs and she walks from left to right, checking each. Change the array values → she reads the new ones. Edit the loop range → she stops earlier or goes further.
- 🔒 **Concept Lock:** Arrays and for loops are made for each other. The loop counter acts as the index. Always loop from `0` to `size - 1`.
- ⚠️ **Gotcha:** `for (i = 1; i <= size; i++)` skips locker 0 and goes one past the end. Start from 0, use `<` not `<=`.

---

#### § 6.4 2D Arrays — "Cinema Seating"

- 🌍 **World:** A cinema with rows and seat numbers
- 💡 **Analogy:** "Row 3, Seat 5" → `seats[3][5]`. Every seat has two coordinates. The first number is which row. The second is which seat within that row.
- 🎮 **Interact:** A cinema grid. Click a seat → it shows `seats[row][col]` coordinates. Fill in values for each seat. Loop through all rows and columns → every seat lights up in order.
- 🔒 **Concept Lock:** A 2D array is a grid. First index = row, second index = column. Use nested loops (one for rows, one for columns) to go through every element.
- ⚠️ **Gotcha:** `int grid[3][4]` has 3 rows and 4 columns. `grid[4][3]` is wrong — the indices are out of bounds.

---

## Module 06 — Strings

### Lesson 6.1 — Strings

#### § 7.1 char Arrays — "A Bead Necklace of Letters"

- 🌍 **World:** A craft bead necklace with one letter per bead
- 💡 **Analogy:** Each bead holds one letter. String them together and you have a word. C doesn't have a magic "word" type — a string is just a row of char values, like beads on a wire.
- 🎮 **Interact:** Bead-stringing interface. Type a word → each letter appears on a separate bead. The array fills one character at a time. Reference `word[0]` → first bead glows.
- 🔒 **Concept Lock:** A string in C is a char array. Each character is one element. There's no special string type — it's just a row of characters.
- ⚠️ **Gotcha:** `char grade = 'A'` is a single character. `char name[] = "A"` is a string (2 elements: 'A' and '\0'). Single quotes for chars, double quotes for strings.

---

#### § 7.2 Null Terminator — "The Clasp at the End"

- 🌍 **World:** A bead necklace with a clasp at the end
- 💡 **Analogy:** How does C know where the word ends? Every string has a special invisible bead at the end: `'\0'` (a zero). It's the clasp. Without it, C keeps reading past your word and finds random junk.
- 🎮 **Interact:** A necklace of letter beads. After the last letter, a special "clasp" bead appears (shown as `\0`). Removing the clasp → the reading arrow keeps going past the word into random memory.
- 🔒 **Concept Lock:** Every C string must end with `'\0'`. C uses this to know where the string stops. `"hello"` is actually 6 characters: h, e, l, l, o, \0.
- ⚠️ **Gotcha:** `char name[5] = "hello"` — no room for `'\0'`. The array needs to be `char name[6]`. Forgetting the null terminator causes undefined behaviour.

---

#### § 7.3 String Functions — "Tools for Working with Words"

- 🌍 **World:** A workshop with specialist tools for necklaces
- 💡 **Analogy:**
  - `strlen` — count the beads (not including the clasp)
  - `strcpy` — make an exact copy of a necklace design
  - `strcat` — clip two necklaces together into one
  - `strcmp` — check if two necklaces are bead-for-bead identical (returns 0 if equal)
- 🎮 **Interact:** Enter two words. Button panel: COUNT, COPY, JOIN, COMPARE. Each button animates the operation and shows the result before revealing the function name.
- 🔒 **Concept Lock:** Never use `=` to copy a string — it only copies the address. Use `strcpy`. Never use `==` to compare strings — use `strcmp`.
- ⚠️ **Gotcha:** `if (name == "hello")` always fails. Strings are arrays — `==` compares their addresses, not their letters. Use `strcmp(name, "hello") == 0`.

---

## Module 07 — Pointers

### Lesson 7.1 — Pointers

#### § 8.1 What Is a Pointer — "A Sticky Note With a Locker Number"

- 🌍 **World:** School lockers
- 💡 **Analogy:** You don't always carry the thing itself. Sometimes you carry a sticky note that says "it's in locker 42." That sticky note is a pointer. The number on it (42) is the address. The pointer doesn't hold the value — it holds the location of the value.
- 🎮 **Interact:** Two lockers: one holds a value (42), one holds a sticky note with the other locker's number. Click the sticky note → it highlights the target locker. Click "go to address" → the value appears.
- 🔒 **Concept Lock:** A pointer holds the memory address of another variable, not a value itself. It's a note that says "the thing you want is over there."
- ⚠️ **Gotcha:** An uninitialised pointer contains a garbage address. Using it is like following a sticky note that says a random room number. It points somewhere — just not somewhere safe.

---

#### § 8.2 & and * — "Find the Address / Go to the Address"

- 🌍 **World:** A postal address system
- 💡 **Analogy:**
  - `&x` — "What's the address of your house?" It gives you the location, not what's inside.
  - `*p` — "Go to that address and look inside." It follows the pointer and retrieves the value.
- 🎮 **Interact:** A street of houses. Click a house → `&house` appears (address number). Enter that address into a pointer → clicking `*pointer` walks you to the house and opens the door (shows value).
- 🔒 **Concept Lock:** `&` gives you the address of a variable. `*` follows an address to get what's stored there. They're opposites.
- ⚠️ **Gotcha:** `p` is the address (a number like 1024). `*p` is what lives at that address. Never confuse the map with the territory.

---

#### § 8.3 Pointers and Arrays — "The Sign at the Start of the Corridor"

- 🌍 **World:** School locker corridor
- 💡 **Analogy:** At the entrance of the locker row there's a sign with the starting address. The array name IS that sign — it's already a pointer to locker [0]. You don't need `&` for arrays; the name hands you the address automatically.
- 🔒 **Concept Lock:** An array name automatically acts as a pointer to its first element. `arr` and `&arr[0]` mean the same thing.
- ⚠️ **Gotcha:** You can use pointer arithmetic to move through an array (`arr + 1` points to the second element), but going past the end is undefined behaviour.

---

#### § 8.4 Pass by Address — "Lend the Actual Notebook, Not a Photocopy"

- 🌍 **World:** Lending vs photocopying a notebook
- 💡 **Analogy:** If I lend you my actual notebook, you write in it and I see the changes. If I photocopy it and give you the copy, you write and my original is untouched. Pass by value = photocopy. Pass by pointer = actual notebook.
- 🎮 **Interact:** Two notebook animations. In one: a copy is made, the original is unchanged after edits. In the other: the real notebook is passed, edits appear in the original. Then the C code for both reveals.
- 🔒 **Concept Lock:** Passing a pointer to a function lets that function modify the original variable. This is how `scanf` works — you pass `&variable` so scanf can fill the real locker.
- ⚠️ **Gotcha:** If you pass by value and try to modify the variable, the original won't change. This is the most common "why isn't my function working" bug.

---

## Module 08 — Structures

### Lesson 8.1 — Structures

#### § 9.1 struct — "A Student ID Card"

- 🌍 **World:** A student ID card
- 💡 **Analogy:** One student has multiple facts — name, age, grade, student number. Instead of four separate lockers for each piece of info, one ID card holds all of them together under one person's name. A struct bundles related data into one named package.
- 🎮 **Interact:** A blank ID card template. Fill in the fields (name, age, grade). The struct definition appears alongside, matching each field to a data type. Then "create a student" → a filled card animates into existence.
- 🔒 **Concept Lock:** A struct is a custom container that holds multiple related pieces of data under one name. It's a blueprint. Declaring a variable of that type creates the actual card.
- ⚠️ **Gotcha:** The struct definition (`struct Student {...}`) is the mould, not the object. You still need `struct Student s1;` to actually create one.

---

#### § 9.2 Accessing Members — "Reading the Fields on the Card"

- 🌍 **World:** Reading specific fields on an ID card
- 💡 **Analogy:** To read someone's name from their ID, you look at the name field. `student.name` means "this student's name field." The dot is like saying "this person's..." — it points to one specific field on the card.
- 🔒 **Concept Lock:** Use `.` to access a struct's fields directly. Use `->` when you have a pointer to a struct (`ptr->name` is the same as `(*ptr).name`).
- ⚠️ **Gotcha:** `student.name = "Ali"` doesn't work for strings — use `strcpy(student.name, "Ali")`. The dot notation is for accessing, not for copying strings.

---

#### § 9.3 Arrays of Structs — "A Stack of ID Cards"

- 🌍 **World:** A pile of student ID cards on a teacher's desk
- 💡 **Analogy:** 30 students → 30 ID cards. `class[0]` is the first card. `class[0].name` is that student's name. `class[1].age` is the second student's age. The array holds complete records, not just single values.
- 🎮 **Interact:** A deck of student cards. Loop through them → each card flips over revealing its fields. Accessing `class[i].name` highlights the name field on whichever card is current.
- 🔒 **Concept Lock:** An array of structs is a list of complete records. Index selects the record. Dot notation selects the field within that record.

---

## Module 09 — File I/O

### Lesson 9.1 — File I/O

#### § 10.1 fopen / fclose — "Opening and Closing a Notebook"

- 🌍 **World:** A physical ruled notebook
- 💡 **Analogy:** Before writing anything, you open the notebook. When you're done, you close it — so the ink sets and nothing gets smudged or lost. `fopen` opens the file (like opening the notebook). `fclose` seals it. Forgetting to close is like leaving the notebook open in the rain.
- 🎮 **Interact:** A notebook animation. `fopen` → notebook flips open. Write something → line appears. `fclose` → notebook snaps shut with a satisfying click. Remove the `fclose` → notebook stays open and a "data may be lost" warning appears.
- 🔒 **Concept Lock:** Always close a file after opening it. Data written to a file may not actually save until `fclose` is called.
- ⚠️ **Gotcha:** `fopen` returns `NULL` if the file doesn't exist or can't be opened. Always check: `if (file == NULL) { ... }` before using it.

---

#### § 10.2 fprintf / fscanf — "Write Into / Read From the Notebook"

- 🌍 **World:** Writing and reading lines in a ruled notebook
- 💡 **Analogy:** `fprintf` is writing a line in the notebook. `fscanf` is reading a line back out. The format strings work exactly like `printf` and `scanf` — just aimed at a file instead of the screen.
- 🔒 **Concept Lock:** `fprintf(file, ...)` writes to a file. `fscanf(file, ...)` reads from one. The file pointer tells C which notebook you're using.
- ⚠️ **Gotcha:** Reading past the end of a file doesn't crash — it returns `EOF`. Always check the return value of `fscanf` to know if it actually read something.

---

#### § 10.3 Error Handling — "The Notebook Is Missing"

- 🌍 **World:** Reaching into your bag for a notebook that isn't there
- 💡 **Analogy:** You go to write in your notebook and it's not in your bag. If you don't notice, you're writing in the air — nothing gets saved. The same happens if your program ignores a failed `fopen`.
- 🔒 **Concept Lock:** Always check if `fopen` succeeded before using the file. If it failed, the pointer is `NULL` and using it will crash the program.
- ⚠️ **Gotcha:** "w" mode creates or overwrites. "a" mode appends. "r" mode fails (returns NULL) if the file doesn't exist. Know which mode you need.

---

## Module 10 — Dynamic Memory

### Lesson 10.1 — Dynamic Memory

#### § 11.1 malloc / free — "Borrowing Extra Chairs for a Party"

- 🌍 **World:** Party planning — you don't know how many guests are coming
- 💡 **Analogy:** You call ahead and borrow chairs when you find out the guest count. After the party, you return them — they go back to the pool for someone else. `malloc` borrows memory. `free` returns it. If you forget to return, the chairs pile up and eventually there's no room for anyone.
- 🎮 **Interact:** A hall with a limited number of chairs. Enter a guest count → `malloc` reserves that many chairs. They glow "in use." Click `free` → they return to the pool. Remove `free` → chairs keep piling up, "Memory Full" warning appears.
- 🔒 **Concept Lock:** `malloc` gives you memory at runtime. `free` returns it. Every `malloc` needs exactly one matching `free`. Missing it is a memory leak.
- ⚠️ **Gotcha:** After `free(ptr)`, never use `ptr` again. The memory is gone — it might now belong to someone else.

---

#### § 11.2 calloc — "Pre-Cleaned Chairs"

- 🌍 **World:** A chair rental that delivers clean vs as-is
- 💡 **Analogy:** `calloc` gives you chairs that are already wiped clean — every byte is set to zero. `malloc` gives you chairs from the last party — there might be crumbs (old data). If you're building on top of zeroes, use `calloc`. If you're immediately overwriting everything, `malloc` is fine.
- 🔒 **Concept Lock:** `calloc` allocates memory AND zeroes it out. `malloc` allocates but leaves the old contents. Use `calloc` when you need a clean starting state.
- ⚠️ **Gotcha:** `calloc(n, size)` takes two arguments (count × size). `malloc(n * size)` takes one. Both reserve the same total bytes, but calloc zeroes them.

---

#### § 11.3 Memory Leaks — "Borrowed Chairs That Were Never Returned"

- 🌍 **World:** A hall that slowly fills with unreturned chairs from past parties
- 💡 **Analogy:** Every party that forgets to return chairs makes the hall a little fuller. Eventually there's no room for new parties. Memory leaks work the same — each unreturned `malloc` shrinks the available memory until the program runs out.
- 🔒 **Concept Lock:** A memory leak is an `malloc` with no matching `free`. Over a long-running program, leaks add up and can crash the system.
- ⚠️ **Gotcha:** No crash happens immediately — leaks are silent. They only cause problems eventually. Use tools like Valgrind to find them.

---

## Module 11 — Preprocessor & Macros

### Lesson 11.1 — Preprocessor

#### § 12.1 #define — "A Nickname That Never Changes"

- 🌍 **World:** Agreed-upon nicknames in a group chat
- 💡 **Analogy:** The whole team agrees: "MAX" always means 30 students. Whenever anyone writes `MAX` in a document, they mean 30. `#define MAX 30` works the same way — before the code even compiles, every occurrence of `MAX` is replaced with `30`. It's find-and-replace, not a variable.
- 🔒 **Concept Lock:** `#define` creates a text substitution. It runs before compilation. It has no type, no memory — just a name that gets replaced with its value.
- ⚠️ **Gotcha:** `#define PI 3.14` — no semicolon. If you write `#define PI 3.14;` and use it in `area = PI * r * r;`, you get `area = 3.14; * r * r;` — a syntax error.

---

#### § 12.2 #include — "Borrowing a Toolbox"

- 🌍 **World:** A shared tool cupboard in a workshop
- 💡 **Analogy:** `#include <stdio.h>` is borrowing the school's standard toolbox — it contains `printf`, `scanf`, and other tools. You didn't build them. You just borrow the whole toolbox at the start of your project.
- 🔒 **Concept Lock:** `#include` pastes the entire contents of another file into yours before compiling. `<stdio.h>` is the standard input/output toolbox. Without it, `printf` doesn't exist.
- ⚠️ **Gotcha:** `#include "myfile.h"` vs `#include <stdio.h>` — quotes look in the current directory first. Angle brackets look in the system library. Use `<>` for standard headers, `""` for your own.

---

#### § 12.3 Conditional Compilation — "A Light Switch in Your Code"

- 🌍 **World:** A light switch for a debug lamp
- 💡 **Analogy:** While building a project, you want extra info printed so you can see what's happening. When it's finished, you want that gone. `#ifdef DEBUG` is like a switch — when the DEBUG switch is on, the extra code compiles in. When off, it's as if those lines don't exist.
- 🔒 **Concept Lock:** Conditional compilation chooses which code gets COMPILED, not just which code runs. Skipped sections don't exist in the final program at all.
- ⚠️ **Gotcha:** `#ifdef` and `#endif` must always be paired. A missing `#endif` causes the preprocessor to skip everything to the end of the file.

---

## Module 12 — Recursion

### Lesson 12.1 — Recursion

#### § 13.1 Base Case — "The Smallest Russian Doll"

- 🌍 **World:** A set of Russian matryoshka nesting dolls
- 💡 **Analogy:** You open a doll → there's a slightly smaller doll inside. Open that → smaller again. At some point you reach a tiny solid doll with nothing inside — that's the base case. Without it, the dolls would open forever.
- 🎮 **Interact:** A set of 5 nesting dolls. Click to open each one. Watch the call stack grow on the right. The smallest doll hits "base case" → the stack unwinds from the bottom up.
- 🔒 **Concept Lock:** Every recursive function MUST have a base case — the condition that stops it from calling itself. Without it, the function calls itself forever and crashes (stack overflow).
- ⚠️ **Gotcha:** The base case must actually be reachable. If your function never makes progress toward the base case, it's infinite recursion.

---

#### § 13.2 Recursive Case — "Each Call Makes the Problem Smaller"

- 🌍 **World:** Russian dolls — each one is slightly smaller
- 💡 **Analogy:** The recursive case is the step that opens the next, smaller doll. Each call must move closer to the base case. If you open a doll and the next one is the same size — you'll never reach the solid one.
- 🔒 **Concept Lock:** The recursive call must pass a simpler or smaller version of the problem. The goal is always to shrink toward the base case.
- ⚠️ **Gotcha:** Recursion uses the call stack — each unfinished function takes memory. Very deep recursion (thousands of calls) can overflow the stack even if the base case is eventually reached.

---

#### § 13.3 Factorial — "How Many Ways Can 5 Friends Stand in a Line?"

- 🌍 **World:** A class photo — students arranging themselves in a row
- 💡 **Analogy:** With 5 students, how many different orders can they stand in? Whatever the answer is for 5, it's `5 × (the answer for 4)`. And the answer for 4 is `4 × (the answer for 3)`. Keep going until you reach 1 person — only one way to arrange one person. That's the base case.
- 🎮 **Interact:** 5 student icons. Each step "locks in" one student at the front. The remaining students recur. The multiplication builds visually as each level returns.
- 🔒 **Concept Lock:** Recursion solves a problem by using the solution to a smaller version of the same problem. The base case is the version small enough to answer directly.

---

## Module 13 — Linked Lists

### Lesson 13.1 — Linked Lists

#### § 14.1 Nodes — "A Treasure Hunt"

- 🌍 **World:** A multi-stage treasure hunt game
- 💡 **Analogy:** Each clue is a node. It has two things: a message (the data) and the location of the next clue (the pointer to the next node). The last clue says "You found it!" and points nowhere (`NULL`). Follow the chain from the first clue and you'll reach the treasure.
- 🎮 **Interact:** A treasure hunt map. Nodes appear as envelopes. Click one → read the message and the "next clue is at..." address. Follow it to the next envelope. Reach `NULL` → treasure found.
- 🔒 **Concept Lock:** A linked list node holds data AND a pointer to the next node. The last node points to `NULL`. The list is traversed by following pointers one at a time.
- ⚠️ **Gotcha:** Lose the head pointer and you lose the entire list — you can't start the treasure hunt without the first clue's address.

---

#### § 14.2 Traversal — "Following the Chain of Clues"

- 🌍 **World:** Following a treasure hunt chain
- 💡 **Analogy:** Start at the first envelope. Read it. Go where it says. Read that one. Go where it says. Stop when one says NULL. You can't jump to clue 4 directly — you have to walk the chain.
- 🔒 **Concept Lock:** To traverse a linked list, start at `head` and follow `->next` until `NULL`. You can't index into a linked list like an array.
- ⚠️ **Gotcha:** Checking `current != NULL` before accessing `current->data` is essential. Accessing NULL is an instant crash.

---

#### § 14.3 Insert and Delete — "Adding or Removing a Clue"

- 🌍 **World:** Redesigning a treasure hunt by changing clues
- 💡 **Analogy:**
  - **Insert:** Write a new clue card. Change the previous clue to point to your new one. Point your new one to the old next. The chain now routes through the new clue.
  - **Delete:** Change the previous clue to skip past the one you're removing. The removed clue is now bypassed — then free it.
- 🎮 **Interact:** An editable chain of envelopes. An "insert here" button appears between nodes — drag a new envelope in. A "remove" button on a node bypasses and removes it. Pointer arrows update visually.
- 🔒 **Concept Lock:** Inserting and deleting in a linked list only changes pointer values — no shifting of elements needed (unlike arrays). But you must update the right pointers in the right order.
- ⚠️ **Gotcha:** When deleting a node, save the `next` pointer BEFORE freeing the node. Freeing first makes it impossible to retrieve `next`.

---

## Module 14 — Sorting & Searching

### Lesson 14.1 — Bubble Sort

#### § 15.1 Bubble Sort — "The Heaviest Bubble Floats to the Top"

- 🌍 **World:** A bottle of water with bubbles of different sizes
- 💡 **Analogy:** Bubbles don't all rise at once. Each pass, neighbouring pairs swap if out of order. After one full pass, the heaviest has settled at the bottom (or lightest at the top, depending on the frame). Repeat for the rest. Eventually everything is in order.
- 🎮 **Interact:** A row of numbered cards. Press "one pass" → watch adjacent pairs compare and swap in slow motion. Run repeatedly until sorted. A counter shows how many swaps were needed.
- 🔒 **Concept Lock:** Bubble sort compares adjacent elements and swaps them if out of order. Each full pass places one more element in its final position.
- ⚠️ **Gotcha:** Bubble sort is very slow for large lists (it's one of the slowest sorts). It's taught because it's easy to understand — not because it's the best.

---

### Lesson 14.2 — Selection Sort

#### § 15.2 Selection Sort — "Always Pick the Smallest Card Left"

- 🌍 **World:** Sorting a hand of playing cards
- 💡 **Analogy:** Look through all the cards you're holding. Find the smallest. Pull it out and put it face-down in position 1. Now look through the rest. Find the next smallest. Put it in position 2. Repeat until done.
- 🎮 **Interact:** A spread of face-up cards. The "smallest finder" scans from left to right, highlighting the current minimum. When done scanning, it swaps that card into position. Repeat for each position.
- 🔒 **Concept Lock:** Selection sort finds the minimum of the unsorted portion and places it at the start, one element per pass. The sorted portion grows from left to right.
- ⚠️ **Gotcha:** Selection sort always makes the same number of comparisons regardless of how sorted the input is — it can't "notice" if the list is already sorted.

---

### Lesson 14.3 — Binary Search

#### § 15.3 Binary Search — "Open the Dictionary in the Middle"

- 🌍 **World:** Looking up a word in a physical dictionary
- 💡 **Analogy:** You don't start from A every time. Open to the middle. Is your word before or after this page? Tear away half the dictionary (mentally). Open the middle of what's left. Repeat. In 20 guesses, you can find one word out of a million.
- 🎮 **Interact:** A number line of 16 sorted values. Enter a target. Watch the "open in the middle" animation: the search zone shrinks by half each round. Count the steps. Compare to linear search (which checks every element from the start).
- 🔒 **Concept Lock:** Binary search ONLY works on sorted data. Each comparison eliminates half the remaining candidates. It is dramatically faster than checking one-by-one.
- ⚠️ **Gotcha:** If the data isn't sorted first, binary search gives wrong answers — it might skip the element you're looking for entirely.

---

## Module 15 — Capstone Projects

### Project A — Mini Calculator
- **Uses:** functions, I/O, switch, arithmetic operators
- **What it does:** User enters two numbers and an operator (+, -, *, /). Program performs the operation and prints the result. A `switch` routes to the right operation. Division-by-zero is handled gracefully.
- **Key concept in practice:** switch replaces a chain of if-else. Functions keep each operation clean and separate.

---

### Project B — Student Grade Tracker
- **Uses:** structs, arrays, file I/O, loops, string functions
- **What it does:** Stores up to 30 students (name + score). Loops through to find highest, lowest, and average. Saves results to a file. Can load them back next run.
- **Key concept in practice:** Arrays of structs — a real record system. File I/O makes it persistent.

---

### Project C — Simple Address Book
- **Uses:** structs, linked lists, dynamic memory, file I/O, string functions
- **What it does:** Add contacts (name + phone) to a linked list. Search by name. Delete a contact. Save the whole list to a file. Load it on next run.
- **Key concept in practice:** Linked list grows and shrinks dynamically. malloc/free for each node. Traversal + search + deletion in a real scenario.

---

## Teaching Rules — Non-Negotiables

These apply to every single section across all 16 modules:

1. **Analogy before syntax.** The real-world explanation always comes first. Code reveals only after the concept lands.
2. **No formulas.** If a concept involves math, frame it as a physical or everyday action (splitting, sharing, counting steps).
3. **Interactive before passive.** The learner does something — drags, toggles, fills in — before reading text.
4. **One concept lock per section.** Each section has exactly one non-replaceable truth. It must be visually distinct and memorable.
5. **Every gotcha is a real mistake.** Not invented edge cases. The most common actual mistake beginners make with that concept.
6. **Code last.** Syntax is the final reveal, not the introduction. The learner should be able to predict what the code says before they see it.
7. **No condescension.** 13–15 year olds understand complex systems (games, social apps, sports rules). Respect that. Use analogies from their world.
