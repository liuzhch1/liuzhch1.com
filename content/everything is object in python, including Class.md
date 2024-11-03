---
date: 2023-12-25
tags:
  - Python
publish: true
url: everything-is-object-in-python
---
a Class itself a also a "object", whose `type`/`__class__` is usually `type` which constructed the Class object.

since `type` is a class
```python
# builtins.pyi
class type:
    ...
```
so following two statements create identical *type* object instances, which is a class called `X`
```python
class X:
    a = 1
X = type('X', (), dict(a=1))
```

u can treat `type` as a class builder.
normal class build objects; `type` build classes
so class is also a object