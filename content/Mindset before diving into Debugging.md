---
datetime: 2024-02-05 17:04
tags:
  - dev
  - reading
publish: true
url: mindset-before-debugging
---
Reading notes of [Syntax Error #11: Debugging Python](https://www.syntaxerror.tech/syntax-error-11-debugging-python/)

# Debugging mindset
## Take a deep breath
When it comes to bug, firstly **stop!, take a deep breath** and assess the situation.
Rushing only leads to more issues in the long run.

A really common situation is:
> experienced developers(in their domain) have **a tendency to think we know what's happening and why and jump right into the code**. Then we try to read the code to identify the problem. It doesn't work because software is complex and mistakes often really difficult to spot(and may happens in other places. so make sure assess the situation!). Especially when we think what the outcome should be and it makes us not see the problems.

## Step-By-Step
Instead of making guesses and assumptions, it's best to adopt **a process**. A step-by-step approach where you double check everything and don't let yourself jump to conclusions.

![[breakpoint-never-hits-in-debug.png|450]]
The first, crucial step is to make sure the code you think is running, actually running.
There are many reasons it could happen.
- Modifying code != running code
- Prod/testing site != development site
- Automatic build&deploy tools aren't working

Make a small visual changes to make sure your code is actually running.

## Talk to them ducks: Rubber duck debugging
We tend to skip details when ourself think about the problem, which leads to omitting crucial details.
When we talk to someone else about the problem, we tend not to skip so since we know they are important and then we will notice what we actually missed earlier.

**brain dump** to notebook is also an alternative solution.

```dataview
TABLE WITHOUT ID
file.inlinks AS "Inlink files"
where file.name = this.file.name
```
```dataview
TABLE WITHOUT ID
file.outlinks AS "Outlink files"
where file.name = this.file.name
```