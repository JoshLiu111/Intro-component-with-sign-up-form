# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say _"[Field Name] cannot be empty"_
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Looks like this is not an email"_

I also added a password rule (at least 8 characters and one number) and a success message after a valid submit.

### Screenshot

![Desktop layout of the sign up form showing email and password errors](./screenshot.png)

### Links

- Solution URL: [Frontend Mentor solution](https://www.frontendmentor.io/solutions/vanilla-javascript---rules-based-form-validation-with-aria-invalid-Cgu6ZaPgfc)
- Live Site URL: [intro-component-with-sign-up-form-six-alpha.vercel.app](https://intro-component-with-sign-up-form-six-alpha.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

**One rules table for every field.** Each input's `name` is a key in a `rules` object, and each value is an ordered list of `[test, message]` pairs. The same `validate` function from my previous project works for all four fields, and adding a field only means adding HTML and one entry in `rules`:

```js
const rules = {
  email: [
    [(v) => v !== "", "Email Address cannot be empty"],
    [isEmail, "Looks like this is not an email"],
  ],
  // firstName, lastName, password ...
};
```

The `name` in the HTML and the key in `rules` must match exactly. At first I mixed `pwd` and `password`, so `rules[input.name]` came back `undefined`.

**Three layers, each with one job.**

- `validate(value, list)` is pure logic: string in, first error message (or `""`) out. It never touches the DOM.
- `validateField(input)` handles one field: it finds the field's error element through `aria-describedby`, updates its text and `hidden`, sets `aria-invalid`, and returns `true` or `false`.
- The `submit` handler handles the whole form.

**Collect fields, check all, then decide.**

```js
const fields = [...form.elements].filter((el) => el.name);
const allOk = fields.map(validateField).every(Boolean);
```

- `form.elements` includes the button. Spreading it into an array and keeping only elements with a `name` leaves just the inputs.
- I use `map` first, then `every(Boolean)`. Calling `every(validateField)` directly would stop at the first invalid field, so the later fields would never show their errors.
- `every(Boolean)` passes the built-in `Boolean` function as the callback. It must be capitalised; `boolean` is not defined.

**Focus the first error.** When the form is invalid, `fields.find((el) => el.getAttribute("aria-invalid") === "true")` returns the first broken input, and `.focus()` moves the cursor there. The attribute value is a string, so I compare it with `"true"`, not `true`. Then `return` stops the success branch from running.

**Clear only the field being edited.** One `input` listener on the form uses `e.target` to reset just that field's `aria-invalid` and hide its error, so errors on the other fields stay visible until the user fixes them.

### AI Collaboration

I use AI as a learning partner to code better, not to skip the learning:

- Used Claude Code to write the HTML and CSS skeleton.
- Used Claude Code to explain the reasoning behind the skeleton's structure.
- Used AI to analyze the product scenario and the key points of the design.
- Wrote all of the JavaScript myself.
- Used AI to build a project notebook, where I manually fill in before, during and after notes (design analysis and planned JS flow, every blocker sorted by type, and a final review compared with similar projects) to organize my thinking, summarize the development process, and correct the mistakes I keep making.

## Author

- Website - [Josh Liu](https://my-portfolio-frontend-kappa-lemon.vercel.app/)
- Frontend Mentor - [@JoshLiu111](https://www.frontendmentor.io/profile/JoshLiu111)
