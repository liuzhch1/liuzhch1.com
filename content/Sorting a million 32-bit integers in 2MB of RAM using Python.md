---
datetime: 2024-02-06 13:18
tags:
  - reading
publish: true
url: sort-million-integers-in-2mb-using-python
---
Original post from Guido Van Rossum:
[Sorting a million 32-bit integers in 2MB of RAM using Python](http://neopythonic.blogspot.com/2008/10/sorting-million-32-bit-integers-in-2mb.html)

The post analysis the above post:
[Analyzing "Sorting a million 32-bit integers in 2MB of RAM using Python"](https://www.bitecode.dev/p/analyzing-sorting-a-million-32-bit)

---
# Key point: usage of array, heapq and tempfile
With generators.

Using temporary files to store sorted chunks of integers, read those files with a generator/iterator, and merge them using `heapq.merge`.

Each time only a small chunk of integers is in memory, next chunk is read when the previous one is sorted.

循环顶着 Memory 上线，对 chunk 进行 sort，写入 `n` 个文件。

对于每个文件，每次读取一点 `m`，并用 generator iterator 给出 sort 好的数据。通过 heapq 来进行 merge。使用到的最多内存为 `n*m`。

# Summary
## What's the issue?
A 32-bit integer is 4 byte. So a million 32-bit integers are 4MB. Which exceed the 2MB limit.

We couldn't simplistically using `sorted` method to sort those numbers, which loads every number into memory.

## A million integer source
### `struct` module
Converts between Python values and C structs represented as Python bytes object.
It's more compact compared to saving as a txt.
```python
import random
import struct

numbers = [random.randint(-2**31, 2**31 - 1) for _ in range(1_000_000)]
with open("random_numbers.bin", "wb") as file:
    # 'i' is the letter used by the formatting mini-language of the 
    # struct module to turn a Python number into a C like signed integer
    # 'i' is signed integer with 4 bytes size
    file.write(struct.pack(len(numbers) * "i", *numbers))
```

## Read limited size data into memory
### `array` module
Compactly represent an array of basic values. Using much less memory than a list.
In `array("i")`, the `"i"` is the *typecode*. Which means elements in the array should be type `i`, which is C type signed int and python type int.
```python
def int_array_from_file(int_file, buffer_size=4000):
    int_array = array("i")
    int_array.frombytes(int_file.read(buffer_size))
    return int_array
```
The above code means we read chunks of 4000 bytes from the file and convert them to an array of python integers. Not the entire file into memory at once.

## Generator to yield integers
```python
def read_buffered_ints(int_file):
    while True:
        int_array = int_array_from_file(int_file)

        if not int_array:
            return None

        yield from int_array
```
Generator are lazy, they don't take much memory.

## Write each sorted chunk to a temporary file and got their generator
```python
int_arrays_generators = []
while True:
    int_array = int_array_from_file(int_file, 4000*10)
    if not int_array:
        break

    # For each chunk, we create a temp file...
    temp_file = tempfile.TemporaryFile()
    # we sort the arrays, convert them back into bytes, 
    # and put them in the file...
    array("i", sorted(int_array)).tofile(temp_file)
    # then save a generator ready to give us back those ints, 
    # in our list
    temp_file.seek(0)
    generator = read_buffered_ints(temp_file)
    int_arrays_generators.append(generator)
```
Each generator hold a temporary file, which is a sorted chunk of 4000*10 bytes. Each of them only take 4000 bytes one time in memory.

## Merge the sorted chunks using `heapq.merge`
### `heapq` module
Implementations of heap queue algorithm.
`heapq.merge` merge multiple sorted inputs into a single sorted output. Returns an iterator over the sorted values.

```python
import heapq
int_buffer = array("i")
# heapq.merge give us all integer IN ORDER
for integer in heapq.merge(*int_arrays_generators):
    # We store them all in an array, and once the array is big enough,
    # we append its content into the final result file
    int_buffer.append(integer)
    if len(int_buffer) >= 1000:
        int_buffer.tofile(final_result)
        del int_buffer[:]  # empty the array, it reached the size limit

# For the last array if it didn't reach 1000
if int_buffer:
    int_buffer.tofile(final_result)
```

# Source code
https://gist.github.com/ksamuel/2352d2c10d89f9bed3da6d45ac4c8ce3


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