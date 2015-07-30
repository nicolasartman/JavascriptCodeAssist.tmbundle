JavaScript Code Assist (Deprecated)
===================================

_This is deprecated, as it was just a fun little hack project and there are much better, widely supported tools that supercede its functionality._

This bundle's goal is to add basic code assist, similar to what webstorm/eclipse/etc have in terms of more sophisticated completions beyond simple word-based autocomplete.

Current Features
----------------

1. Completion (with option+escape) of any function in the current document, along with tab-stops for tabbing through its args.


Planned Features
----------------

* Completion suggestions sorted by proximity to the caret's location in the document
* Completion suggestions beyond the current file
  * How to implement this optimally may be a problem - should it be by tm project, by git project, by current directory, or perhaps based on requirejs includes or some other actual module system?
 

Features Under Consideration
----------------------------

* Completions including property names as well as functions (this will be more useful if property lookups are actually based on the object they are being looked up on, rather than plain word-based completion)


To Do
-----

* Build the completion index on something less frequent than a call to complete current word, perhaps save, and use the preexisting completions whenever it is invoked. Parsing the entire file works for now, but won't be fast enough for long.

Bug Reporting
-------------

If something doesn't work, please email me at nicolasartman at gmail and let me know what happened and, preferably, some of your code that triggered the failure (or any similarly failure-producing code).

License
-------

MIT License

Copyright (c) 2012 Nicolas Artman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
