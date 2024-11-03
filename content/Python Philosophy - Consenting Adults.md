---
datetime: 2024-01-11 17:11
tags:
  - python
publish: true
url: python-consenting-adults
---
https://discuss.python.org/t/private-protected-modifier-and-notation/22356/10

> Python has a “consenting adults” policy – we use various idioms, such as leading underscores, to inform other programmers what methods, attributes, etc., shouldn’t be messed with, and then leave it up to them. If they do use or modify these private and/or internal objects, then any consequences of it not working correctly are their responsibility.
> However, this also means that people can extend functionality, or more easily work around bugs, because they have access to those private/internal data and functions.

作为一个成熟的 coder，Python 的 dark secrect/黑魔法都向你开放，但是你需要对滥用负责。

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