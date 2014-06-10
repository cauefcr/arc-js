---
layout: default
title: Arc.js
---

## Arc.js

This is an Arc-language interpreter written in JavaScript. It can run both on nodejs and on a web-site.

## REPL

<div id="repl">
  <div id="repl-txt"></div>
  <div id="holder"></div>
</div>

## Demo

#### Client side

1. [REPL (fullscreen)](demo_repl.html)
2. [Maze generator](demo_mg.html)
3. [Strange attractor generator](demo_at.html)
4. Sudoku solver (comming soon)
5. Othello player (comming soon)

#### Server side

1. Running on node server (comming soon)

## Features

| Stack based vm ( [visualizer](stack_visualizer.html) ) | Self-hosting compiler                                                  |
| First-class continuations                              | Tail call optimization                                                 |
| mac macro                                              | Almost of [anarki](https://github.com/arclanguage/anarki)'s functions. |
| user tagged objects (annotate)                         | defgeneric (object system)                                             |
| complex-args (let, fn)                                 | regexp (#/exp/)                                                        |
| Special syntax (:~.!)                                  | user defined special syntax (defss)                                    |
| User difined type function (deftf)                     | stack-tracer                                                           |

## How to install

You have to install __nodejs__ and __npm__ first.

    $ sudo npm install -g arc-js

Then, You can run __REPL__.

    $ arcjs
    arc> (pr 'hello-world)
    hello-world
    hello-world
    arc> (+ 1 2)
    3
    arc> (def average (x y) (/ (+ x y) 2))
    #<fn:average>
    arc> (average 2 4)
    3

## How to use in your web-site

### 1. Basic interface
In the HTML '<head>'
{% highlight html %}
<script type="text/javascript" src="arc.min.js"></script>
{% endhighlight %}
Then, You can run arc-language in your javascript.
{% highlight javascript %}
var arc_runner = ArcJS.context();
var res = arc_runner.evaluate("(+ 1 2 3 4)");
console.log(res); // 10
// FizzBuzz
var code = [
 "(prn 'Start_FizzBuzz)",
 "(for n 1 100",
 "  (prn (case (gcd n 15)",
 "         1 n",
 "         3 'Fizz",
 "         5 'Buzz",
 "         'FizzBuzz)))"].join("\n");
arc_runner.evaluate(code);  // 1, 2, Fizz ...
{% endhighlight %}
[Demo Page](demo_01.html)

### 2. Auto loading interface
In the HTML '<head>'
{% highlight html %}
<script type="text/javascript" src="arc.min.js"></script>
<!-- jQuery is required in arc-loader.js -->
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="arc-loader.js"></script>
{% endhighlight %}
Then, You can load arc files as follows.
{% highlight html %}
<script type="text/arc" src="fizzbuzz.arc"></script>
{% endhighlight %}
__fizzbuzz.arc__
{% highlight clojure %}
(def fizzbuzz (limit)
  (for x 1 limit
    (prn
      (aif (mappend [if (is 0 (arc.math::mod x car._)) cdr._] '((3 Fizz) (5 Buzz)))
           (string it)
           x))))
{% endhighlight %}
Then you can do following
{% highlight html %}
<script type="text/arc">
(fizzbuzz 3)
(fizzbuzz 100)
</script>
{% endhighlight %}
[Demo Page](demo_02.html)

## referred to

- [Arc Language](http://arclanguage.github.io/)
- [anarki](https://github.com/arclanguage/anarki)
- [3imp.pdf](http://www.cs.indiana.edu/~dyb/papers/3imp.pdf)
- [biwascheme](http://www.biwascheme.org/)

## License

    # ArcJS

    Copyright (c) 2012 Shin Aoyama
    -----------------
    Perl Foundations's Artistic License 2.0

    # Anarki

    Copyright (c) Paul Graham
    Copyright (c) Robert Morris
    Copyright (c) A lot of contributors (see https://github.com/arclanguage/anarki/graphs/contributors)
    -----------------
    Perl Foundations's Artistic License 2.0

    # Arc language

    Copyright (c) Paul Graham
    Copyright (c) Robert Morris
    -----------------
    Perl Foundations's Artistic License 2.0