.. ArcJS documentation master file, created by
   sphinx-quickstart on Fri Jul 18 13:19:07 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

ArcJS - 0.1.x documentation
===========================

Contents
^^^^^^^^

.. toctree::
   :maxdepth: 2

   tutorial
   refs

What is ArcJS?
^^^^^^^^^^^^^^

ArcJS is an Arc-language implementation written in JavaScript.
It consists of a self-hosting compiler written in Arc and a StackVM written in JavaScript.

**Main features**

* It runs on its StackVM [#f1]_ so the Arc-code is compiled into asm-code in advance for performance.
* The Arc compiler is written in Arc itself. (Self-hosting compiler) [#f2]_
* macros, objects, first-class continuations and tail-call optimization are completely supported.
* Arc's characteristic features; default function, ssyntax are also supported.

**ArcJS's original features (Not in official Arc-language)**

* User defined ssyntax.
* clojure-like namepace system.
* new syntax (table, etc)
* stack tracer. (debuger)

.. [#f1] `vm.js <https://github.com/smihica/arc-js/blob/master/src/vm.js>`_
.. [#f2] `compiler.arc <https://github.com/smihica/arc-js/blob/master/src/arc/compiler.arc>`_

What is Arc-language?
^^^^^^^^^^^^^^^^^^^^^

Arc-language is a dialect of the Lisp programming language now under development by Paul Graham and Robert Morris.
Its simpler than Common-Lisp and more powerful than Scheme (IMO). [#f3]_

.. [#f3] `Official Home Page <http://arclanguage.org/>`_
