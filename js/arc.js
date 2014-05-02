/*
 Arc-JS --- The Arc-Language's compiler, stack VM-interpreter written in Javascript.
 -----------------------------------------------------------------------------------
 License:  MIT License, Copyright (C) 2013 Shin Aoyama (@smihica)
 Site:     https://github.com/smihica/arc-js
*/
/** @file arc.js { */
var ArcJS = (function() {
  var ArcJS = this;
  ArcJS.version = '0.1.1';
/** @file classify.min.js { */
var classify=function(ns){function randomAscii(a){for(var b="";0<a;a--)b+=String.fromCharCode(32+Math.round(Math.random()*94));return b.replace(/'|"|\\/g,"@")}function ClassifyError(a){Error.apply(this,arguments),Error.captureStackTrace!==void 0&&Error.captureStackTrace(this,this.constructor),this.message=a}function createExceptionClass(a){var b=function(){ClassifyError.apply(this,arguments)};return b.prototype=new ClassifyError,b.prototype.name=a,b}function _atomic_p(a,b){return a===null||a===void 0||(b=typeof a)==="number"||b==="string"||b==="boolean"||a.valueOf!==Object.prototype.valueOf&&!(a instanceof Date)}function _clone(a,b){if(_atomic_p(a))return a;var c,d;if(a instanceof Date){c=new Date(a.getTime());if(b instanceof Date)for(d in b)b.hasOwnProperty(d)&&(c[d]=_clone(b[d],c[d]))}else if(typeof a=="function"){c=function(){return a.apply(this,arguments)};if(typeof b=="function")for(d in b)b.hasOwnProperty(d)&&(c[d]=_clone(b[d],c[d]))}else c=!_atomic_p(b)&&typeof b!="function"?b:new a.constructor;for(d in a)a.hasOwnProperty(d)&&(c[d]=_clone(a[d],c[d]));return c}function __super__(){return this.constructor.__super__.prototype}function inherits(a,b){a.__super__=b;var c=function(){};c.prototype=b.prototype,c.prototype.constructor=b,a.prototype=new c,a.prototype.__super__=__super__;var d=a[iop];return a[iop]=function(a){var c=b[iop];c&&c(a),d(a)},a}function method(a,b,c){a.prototype[b]=c}function mixin(a,b){var c=b.prototype;for(var d in c)d=="init"?a.prototype["init@"+b["@CLASSNAME"]]=c[d]:d!=="__super__"&&d!=="constructor"&&(a.prototype[d]=c[d]);var e=a[iop];a[iop]=function(a){var c=b[iop];c&&c(a),e(a)}}function check_interface(a,b){for(var c in b.prototype)if(b.prototype.hasOwnProperty(c)&&!a.prototype.hasOwnProperty(c))throw new DeclarationError("The class '"+a["@CLASSNAME"]+"' must provide property or method '"+c+"' imposed by '"+b["@CLASSNAME"]+"'.")}function hasProp(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function expand(a,b){if(!b)return a;var c,d,e,f=[],g="property,static,method,parent,mixin,implement".split(",");for(c in userDirectives)f.push(c);for(;;){var h=!1;for(c in b)if(0>g.indexOf(c)){if(0>f.indexOf(c))throw new ArgumentError("You gave '"+c+"' as definition, but the classify() excepts"+' only "'+g.concat(f).join(", ")+'".');hasProp(b[c])&&(h=!0)}else a[c]=b[c];if(!h)break;for(c in userDirectives)a[c]=a[c]||{};for(c in userDirectives){e=0;for(d in b[c]){e==0&&(a=userDirectives[c].one_time_fn(a)),a&&(a=userDirectives[c](a,d,b[c][d]));if(!a)throw new DeclarationError('directives must return context. ON YOUR directive "'+c+'"');delete b[c][d],e++}}b=a}return a}var classify=ns;ClassifyError.prototype=Error();var ArgumentError=createExceptionClass("ArgumentError"),DeclarationError=createExceptionClass("DeclarationError"),genclassid=function(a){return function(){return"ANONYMOUS_CLASS_"+ ++a}}(0),iop=randomAscii(64),userDirectives={},classify=function classify(name,def){var __class__,i,j,l,k,c,type,context;if((l=arguments.length)==1)return typeof name!="string"?classify(genclassid(),name):classify(name,{});if(l==2&&typeof name=="string"&&def instanceof Object){if(!name.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/))throw new ArgumentError('You give "'+name+'" as class name. But class name must be a valid variable name in JavaScript.');context={property:{},"static":{},method:{},parent:Object,mixin:[],implement:[]},context=expand(context,def);var inner_new_call_identifier=randomAscii(64);eval("__class__ = function "+name+"(arg) {"+"if (this.constructor === "+name+") {"+name+"['"+iop+"'](this);"+"if (arg !== '"+inner_new_call_identifier+"') "+("init"in context.method?"this.init.apply(this, arguments);":"_clone(arg, this);")+"return this;"+"}"+"var self = new "+name+"('"+inner_new_call_identifier+"');"+("init"in context.method?"self.init.apply(self, arguments);":"_clone(arg, self);")+"return self;"+"}"),__class__[iop]=function(a){for(var b in context.property)a[b]=_clone(context.property[b])},inherits(__class__,context.parent);for(j=0,l=context.mixin.length;j<l;j++)mixin(__class__,context.mixin[j]);for(i in context.method)context.method.hasOwnProperty(i)&&method(__class__,i,context.method[i]);__class__.prototype.constructor=__class__,__class__.prototype.__class__=__class__,__class__["@CLASSNAME"]=name;for(j=0,l=context.implement.length;j<l;j++)check_interface(__class__,context.implement[j]);for(i in context.static)__class__[i]=context.static[i];return typeof context.static.init=="function"&&context.static.init.call(__class__),__class__}throw new ArgumentError("Expects classify(name, definition) or classify(name) or classify(definition).")};return classify.addDirective=function(b,c,d){c.one_time_fn=d||function(a){return a},userDirectives[b]=c},classify.removeDirective=function(b){delete userDirectives[b]},classify.expand=expand,classify.error={ClassifyError:ClassifyError,ArgumentError:ArgumentError,DeclarationError:DeclarationError},classify}({});typeof exports!="undefined"&&(exports.classify=classify);/** @} */
/** @file stack.js { */
var Stack = classify("Stack", {
  property: {
    stack: []
  },
  method: {
    push: function(x, s) {
      this.stack[s] = x;
      return s + 1;
    },
    index_set: function(s, i, v) {
      var idx = s - i - 1;
      this.stack[idx] = v;
    },
    index: function(s, i) {
      var idx = s - i - 1;
      if (idx < 0) {
        throw new Error('idx is out of range.');
      }
      return this.stack[idx];
    },
    range_get: function(from, to) {
      return this.stack.slice(from, to+1);
    },
    save:      function(s) {
      var rt = new Stack();
      rt.stack = this.stack.slice(0, s);
      return rt;
    },
    restore:   function(s) {
      var len = s.stack.length;
      var after = this.stack.slice(len);
      this.stack = s.stack.concat(after);
      return len;
    },
    shift:     function(n, m, s) {
      for (var i = (n - 1); 0 <= i; i--) {
        this.index_set(s, i+m, this.index(s, i));
      }
      return s - m;
    }
  }
});
ArcJS.Stack = Stack;
/** @} */
/** @file symbol.js { */
var Symbol = classify("Symbol", {
  static: {
    tbl: {},
    get: function(name, evaluable_name) {
      var r = null;
      if (!(r = this.tbl[name])) {
        r = new Symbol(name, !!evaluable_name);
        this.tbl[name] = r;
      }
      return r;
    }
  },
  property: {
    name: null,
    evaluable_name: false
  },
  method: {
    init: function(n, evaluable_name) {
      this.name = n;
      this.evaluable_name = evaluable_name;
    }
  }
});
ArcJS.Symbol = Symbol;
/** @} */
/** @file cons.js { */
var Cons = function(car, cdr) {
  this.car = car; this.cdr = cdr;
}
ArcJS.Cons = Cons;
/** @} */
/** @file char.js { */
var Char = classify("Char", {
  static: {
    tbl: {},
    get: function(n) {
      var c = null;
      if (!(c = this.tbl[n])) {
        c = new Char(n);
        this.tbl[n] = c;
      }
      return c;
    }
  },
  property: { c: null },
  method: {
    init: function(c) {
      this.c = c;
    }
  }
});
ArcJS.Char = Char;
/** @} */
/** @file table.js { */
var Table = classify("Table", {
  static: {
    genkey: (function() {
      var i = 0;
      return function() {
        return '%___table_key_' + i++ + '___%';
      }
    })(),
    keying: function keying(obj) {
      var type_name = type(obj).name;
      var key;
      switch (type_name) {
      case 'string':
      case 'int':
      case 'num':
        key = obj+'';
        break;
      case 'sym':
        key = ((obj === nil) ? 'nil' :
               (obj === t)   ? 't' :
               obj.name);
        break;
      case 'cons':
        key = keying(car(obj)) + keying(cdr(obj));
        break;
      default:
        obj.key_for_table = obj.key_for_table || Table.genkey();
        key = obj.key_for_table;
        break;
      }
      return type_name + ':' + key;
    }
  },
  property: { src: null, key_src: null, n: 0 },
  method: {
    init: function() {
      this.src = {};
      this.key_src = {};
    },
    put: function(key, val) {
      var skey = Table.keying(key);
      if (!(skey in this.src)) this.n++;
      this.src[skey] = val;
      this.key_src[skey] = key;
    },
    get: function(key) {
      var skey = Table.keying(key);
      return this.src.hasOwnProperty(skey) ? this.src[skey] : nil;
    },
    rem: function(key) {
      var skey = Table.keying(key);
      if (skey in this.src) {
        this.n--;
        delete this.src[skey];
        delete this.key_src[skey];
      }
      return nil;
    },
    dump_to_list: function() {
      var rt = nil;
      for (var k in this.src) {
        var key = this.key_src[k];
        var val = this.src[k];
        rt = cons(cons(key, cons(val, nil)), rt);
      }
      return rt;
    },
    load_from_list: function(l) {
      while (l !== nil) {
        var c = car(l);
        this.put(car(c), cadr(c));
        l = cdr(l);
      }
      return this;
    },
    stringify_content: function() {
      return '()'; // TODO: mendokuse.
    }
  }
});
ArcJS.Table = Table;
/** @} */
/** @file closure.js { */
var Closure = classify('Closure', {
  property: {
    name: null,
    body: null,
    pc:   0,
    arglen: 0,
    dotpos: 0,
    closings: [],
    namespace: null
  },
  method: {
    init: function(body, pc, closinglen, arglen, dotpos, stack, stack_pointer, namespace) {
      this.body = body;
      this.pc   = pc;
      this.arglen = arglen;
      this.dotpos = dotpos;
      for (var i = 0; i<closinglen; i++)
        this.closings.push(stack.index(stack_pointer, i));
      this.namespace = namespace;
    },
    index: function(idx) {
      return this.closings[idx];
    }
  }
});
ArcJS.Closure = Closure;
/** @} */
/** @file call.js { */
var Call = classify("Call", {
  property: {
    name: null,
    fn: null,
    args: null
  },
  method: {
    init: function(fn, name, args) {
      if (fn) this.fn = fn;
      else if (name) this.name = name;
      this.args = args;
    },
    codegen: function() {
      var code;
      if (this.name) {
        code = [
          ['refer-global', this.name],
          ['indirect'],
          ['apply']
        ];
      } else {
        code = [
          ['constant', this.fn],
          ['apply']
        ];
      }
      var l = this.args.length;
      code.unshift(['argument']);
      code.unshift(['constant', l]);
      for (var i=l-1; -1 < i; i--) {
        code.unshift(['argument']);
        code.unshift(['constant', this.args[i]]);
      }
      return code;
    }
  }
});
ArcJS.Call = Call;
/** @} */
/** @file continuation.js { */
var Continuation = classify('Continuation', {
  parent: Closure,
  method: {
    init: function(stack, shift_num, stack_pointer, namespace) {
      Closure.prototype.init.call(
        this,
        [['refer-local', 0],
         ['nuate', stack.save(stack_pointer)], // stack restore
         ['continue-return', shift_num]], // return to outer frame.
        0,
        0,
        1,
        -1,
        stack,
        0,
        namespace);
    }
  }
});
ArcJS.Continuation = Continuation;
/** @} */
/** @file tagged.js { */
var Tagged = classify('Tagged', {
  property: { tag: null, obj: null },
  method: {
    init: function(tag, obj) {
      this.tag = tag;
      this.obj = obj
    }
  }
});
ArcJS.Tagged = Tagged;
/** @} */
/** @file box.js { */
var Box = classify('Box', {
  property: {
    v: null
  },
  method: {
    init: function(v) {
      this.v = v;
    },
    value: function(v) {
      if (argument.length === 1) this.v = v;
      else                       return this.v;
    },
    unbox: function() {
      return this.v;
    },
    setbox: function(v) {
      this.v = v;
    }
  }
});
ArcJS.Box = Box;
/** @} */
/** @file reader.js { */
var Reader = classify("Reader", {

  static: {
    EOF:    new Object(),
    DOT:    new Object(),
    LPAREN: new Object(),
    RPAREN: new Object(),
    LBRACK: new Object(),
    RBRACK: new Object(),
    QUOTE:            Symbol.get('quote'),
    QUASIQUOTE:       Symbol.get('quasiquote'),
    UNQUOTE:          Symbol.get('unquote'),
    UNQUOTE_SPLICING: Symbol.get('unquote-splicing'),
    NUMBER_PATTERN: /^[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)([eE][-+]?[0-9]+)?$/
  },

  property: {
    str: '',
    i: 0,
    slen: 0,
  },

  method: {
    init: function() {},

    load_source: function(str) {
      this.str = str;
      this.slen = str.length;
      this.i = 0;
    },

    whitespace_p: function(c) {
      return (-1 < String.fromCharCode(9,10,11,12,13,32).indexOf(c));
    },

    delimited: function(c) {
      return this.whitespace_p(c) || (-1 < '()[]";'.indexOf(c));
    },

    number_p: function(c) {
      return (-1 < '0123456789+-.'.indexOf(c));
    },

    readable_symbol_p: function(c) {
      return c === '|';
    },

    reader_macro_p: function(c) {
      return c === '#';
    },

    read_reader_macro: function(c) {
      if (c === '\\') {
        if (this.i < this.slen) return Char.get(this.str[this.i++]);
      }
      if (c === '/') {
        if (this.i < this.slen) return this.read_regexp();
      }
      var tok = this.read_thing();
      if (tok.length === 0) throw new Error("unexpected end-of-file while reading macro-char #" + c);
      switch (c) {
      case 'x':
        return parseInt(tok, 16);
      case 'd':
        return parseInt(tok, 10);
      case 'o':
        return parseInt(tok, 8);
      case 'b':
        return parseInt(tok, 2);
      }
    },

    read_list: function(bracketed) {
      var token;
      var lis = nil;
      while ((token = this.read_token()) !== Reader.EOF) {
        if (token === Reader.RPAREN) {
          if (bracketed) throw new Error("bracketed list terminated by parenthesis");
          return nreverse(lis, nil);
        }
        if (token === Reader.RBRACK) {
          if (!bracketed) throw new Error("parenthesized list terminated by bracket");
          return nreverse(lis, nil);
        }
        if (token === Reader.LPAREN) {
          lis = cons(this.read_list(), lis);
          continue;
        }
        if (token === Reader.LBRACK) {
          lis = cons(this.read_blist(), lis);
          continue;
        }
        if (token === Reader.DOT) {
          if (lis === nil) throw new Error("misplaced dot('.') while reading list.");
          var rest = this.read_expr();
          if (rest === Reader.DOT) throw new Error("misplaced dot('.') while reading list.");
          token = this.read_token();
          if (token === Reader.RPAREN) {
            if (bracketed) throw new Error("bracketed list terminated by parenthesis.");
            lis = nreverse(lis, rest);
            return lis;
          }
          if (token === Reader.RBRACK) {
            if (!bracketed) throw new Error("parenthesized list terminated by bracket.");
            lis = nreverse(lis, rest);
            return lis;
          }
          if (token === Reader.EOF) throw new Error("unexpected end-of-file while reading list.");
          throw new Error("more than one item following dot('.') while reading list.");
        }
        lis = cons(token, lis);
      }
      throw new Error("unexpected end-of-file while reading list");
    },

    read_blist: function() {
      var body = this.read_list(true);
      return cons(Symbol.get('%shortfn'), cons(body, nil));
    },

    read_thing: function() {
      var thing = '';
      while (this.i < this.slen) {
        var c = this.str[this.i];
        if (this.delimited(c)) {
          return thing;
        }
        thing += c;
        this.i++;
      }
      return thing;
    },

    read_number: function() {
      var tok = this.read_thing();
      if (tok.length === 0) return Reader.EOF;
      if (tok === '.')      return Reader.DOT;
      if (tok === '+inf.0') return Infinity;
      if (tok === '-inf.0') return -Infinity;
      if (tok.match(Reader.NUMBER_PATTERN))
        return this.make_number(tok);
      return this.read_symbol(tok);
    },

    make_number: function(tok) {
      var n = parseFloat(tok);
      // TODO flaction, imagine, +pattern.
      if (n === NaN) throw new Error("parsing failed the number " + tok);
      return n;
    },

    read_readable_symbol: function() {
      var c, acc = '';
      while (this.i < this.slen) {
        c = this.str[this.i++];
        if (c === '|') {
          return coerce(acc, s_sym);
        } else {
          acc += c;
        }
      }
      throw new Error("unexpected end-of-file while reading symbol");
    },

    read_symbol: function(tok) {
      if (arguments.length < 1) tok = this.read_thing();
      if (tok.length === 0) return Reader.EOF;
      return this.make_symbol(tok, false);
    },

    make_symbol: function(tok, readable) {
      if (tok === 'nil') return nil;
      if (tok === 't') return true;
      return Symbol.get(tok, readable);
    },

    read_string: function(delimiter, type, escape_only_delimiter) {
      delimiter = delimiter || '"';
      type = type || 'string';
      var str = '', esc = false;
      var escaped_char_tbl = {n: '\n', r: '\r', s: '\s', t: '\t'};
      while(this.i < this.slen) {
        var c = this.str[this.i++];
        // TODO more Escape patterns.
        if (esc) {
          esc = false;
          var escaped_char = ((escaped_char_tbl)[c]);
          if (escape_only_delimiter && !escaped_char && c !== delimiter) {
            str += '\\' + c;
          } else {
            if (escaped_char) {
              str += escaped_char;
            } else if (c === 'u' &&
                       this.i + 3 < this.slen &&
                       this.str.slice(this.i, this.i + 4).match(/^([0-9a-fA-F]{4})$/))
            {
              var n = parseInt(RegExp.$1, 16);
              str += String.fromCharCode(n);
              this.i += 4;
            } else {
              str += c;
            }
          }
          continue;
        } else {
          switch(c) {
          case '\\':
            esc = true;
            continue;
          case delimiter:
            return str;
          default:
            str += c;
            continue;
          }
        }
      }
      throw new Error("unexpected end-of-file while reading " + type);
    },

    read_regexp: function() {
      var str = this.read_string('/', 'regexp', true);
      return list(Symbol.get('annotate'), list(Reader.QUOTE, Symbol.get('regexp')), str);
    },

    read_token: function() {
      var c = '', tmp = '';
      outer:
      while (true) {
        if (this.slen <= this.i) return Reader.EOF;
        c = this.str[this.i++];
        if (this.whitespace_p(c)) { continue; }
        if (this.number_p(c)) { this.i--; return this.read_number(); }
        if (this.readable_symbol_p(c)) { return this.read_readable_symbol(); }
        if (this.reader_macro_p(c)) {
          c = this.str[this.i++];
          if (c === '|') {
            c = '';
            while (this.i < this.slen) {
              tmp = c;
              c = this.str[this.i++];
              if (tmp+c === '|#') continue outer;
            }
            return Reader.EOF;
          }
          return this.read_reader_macro(c);
        }
        switch (c) {
        case ";":
          while (this.i < this.slen) {
            c = this.str[this.i++];
            if (c === '\n' || c === '\r') continue outer;
          }
          return Reader.EOF;
        case '"': return this.read_string();
        case '(': return Reader.LPAREN;
        case ')': return Reader.RPAREN;
        case '[': return Reader.LBRACK;
        case ']': return Reader.RBRACK;
        case "'": {
          var obj = this.read_expr();
          if (obj === Reader.EOF) throw new Error("unexpected end-of-file following quotation-mark(')");
          return cons(Reader.QUOTE, cons(obj, nil));
        }
        case "`": {
          var obj = this.read_expr();
          if (obj === Reader.EOF) throw new Error("unexpected end-of-file following backquotation-mark(`)");
          return cons(Reader.QUASIQUOTE, cons(obj, nil));
        }
        case ',':
          if (this.slen <= this.i) throw new Error("unexpected end-of-file following comma(,)");
          c = this.str[this.i++];
          if (c === '@') {
            var obj = this.read_expr();
            return cons(Reader.UNQUOTE_SPLICING, cons(obj, nil));
          }
          this.i--;
          return cons(Reader.UNQUOTE, cons(this.read_expr(), nil));
        default:
          this.i--;
          return this.read_symbol();
        }
      }
    },

    read_expr: function() {
      var token = this.read_token();
      if (token === Reader.RPAREN) throw new Error("unexpected closing parenthesis");
      if (token === Reader.RBRACK) throw new Error("unexpected closing bracket");
      if (token === Reader.LPAREN) return this.read_list();
      if (token === Reader.LBRACK) return this.read_blist();
      return token;
    },

    completed_p: function() {
      return (this.slen <= this.i);
    },

    read: function(str) {
      if (str) this.load_source(str);
      return this.read_expr();
    }
  }
});
ArcJS.Reader = Reader;
/** @} */
/** @file namespace.js { */
var NameSpace = classify('NameSpace', {
  property: {
    name:     null,
    imports: null,
    primary:  {}
  },
  static: {
    tbl: {},
    root:  null,
    stack: [null],
    global_ns: null,
    default_ns_names: [
      '***global***',
      'arc.core.primitives',
      'arc.core.compiler',
      'arc.core'
    ],
    push: function(x) {
      this.stack.push(x);
      return x;
    },
    pop: function() {
      return this.stack.pop();
    },
    get: function(name, create) {
      var rt = NameSpace.tbl[name];
      if (!rt) {
        if (!create)
          throw new Error('the namespace "' + name + '" is not found.');
        else
          return new NameSpace(name, []);
      }
      return rt;
    },
    create_with_default: function(name, imports) {
      var df = NameSpace.default_ns_names;
      var default_ns = [];
      for (var i = 0, l = df.length; i < l; i++) {
        var ns = NameSpace.tbl[df[i]];
        if (ns) default_ns.push(ns);
      }
      imports = imports || [];
      return new NameSpace(name, default_ns.concat(imports));
    }
  },
  method: {
    init: function(name, imports) {
      this.name = name;
      this.imports = imports;
      NameSpace.tbl[name] = this;
    },
    set: function(name, val) {
      if (name.match(/\*\*\*.+\*\*\*/)) {
        NameSpace.global_ns.primary[name] = val;
      } else {
        this.primary[name] = val;
      }
    },
    setBox: function(name, val) {
      this.set(name, new Box(val));
    },
    get: function(name) {
      var v = this.primary[name];
      if (v) return v;
      for (var i = this.imports.length-1; -1<i; i--) {
        v = this.imports[i].primary[name];
        if (v) return v;
      }
      throw new Error('Unbound variable ' + stringify_for_disp(Symbol.get(name)));
    },
    has: function(name) {
      if (name in this.primary) return true;
      for (var i = this.imports.length-1; -1<i; i--)
        if (name in this.imports[i].primary) return true;
      return false;
    }
  }
});
ArcJS.NameSpace = NameSpace;
var global_ns     = new NameSpace('***global***', []);
NameSpace.global_ns = global_ns;
var primitives_ns = new NameSpace('arc.core.primitives', [global_ns]);
var compiler_ns   = new NameSpace('arc.core.compiler',   [global_ns, primitives_ns]);
var arc_ns        = new NameSpace('arc.core',            [global_ns, primitives_ns, compiler_ns]);

/** @} */
/** @file primitives.js { */
var Primitives = classify('Primitives', {
  static: {
    reader: new Reader(),
    all: []
  },
  property: {
    ns:   null,
    vars: {}
  },
  method: {
    init: function(ns_name) {
      this.ns = NameSpace.get(ns_name, true);
      Primitives.all.push(this);
    },
    define: function(def) {
      for (var n in def) {
        var f = def[n];
        if (f instanceof Array && typeof f[1] === 'function') {
          var options = f[0];
          f = f[1];
          f.dotpos = options['dot'];
          f.toString().match(/^function.*?\((.*?)\)/);
          var args = RegExp.$1;
          if (args === '') {
            f.arglen = 0;
          } else {
            var vs = args.split(/\s*,\s*/g);
            f.arglen = vs.length;
          }
          f.prim_name = n;
          this.vars[n] = f;
        }
      }
      return this;
    }
  }
});

/** @file core.js { */
var nil = (function() {
  var n = new Cons(null, null);
  n.car = n; n.cdr = n;
  return n;
})();
var t = true;

var is_nodejs = (typeof module !== 'undefined' && module.exports);

var s_int    = Symbol.get('int');
var s_num    = Symbol.get('num');
var s_string = Symbol.get('string');
var s_sym    = Symbol.get('sym');
var s_char   = Symbol.get('char');
var s_table  = Symbol.get('table');
var s_cons   = Symbol.get('cons');
var s_fn     = Symbol.get('fn');
var s_mac    = Symbol.get('mac');

var list_to_javascript_arr = function(lis) {
  if (lis !== nil && type(lis).name !== 'cons') return [lis];
  var rt = [];
  while (lis !== nil) {
    rt.push(car(lis));
    lis = cdr(lis);
  }
  return rt;
}

var javascript_arr_to_list = function(arr) {
  var l = arr.length;
  if (l === 0) return nil;
  var rt = cons(arr[0], nil);
  var tmp = rt;
  for (var i=1; i<l; i++) {
    tmp.cdr = cons(arr[i], nil);
    tmp = tmp.cdr;
  }
  return rt;
}

var flat_iter = function(lis, max_depth) {
  var rt = nil;
  if (max_depth < 1) return reverse(lis);
  while (lis !== nil) {
    var x = car(lis);
    if (x !== nil) {
      if (type(x) === s_cons) {
        var deeper = flat_iter(x, max_depth - 1);
        rt = append(deeper, rt);
      }
      else rt = cons(x, rt);
    }
    lis = cdr(lis);
  }
  return rt;
};

// use decycle from https://raw.github.com/douglascrockford/JSON-js/master/cycle.js
/** @file cycle.js { */
/*
    cycle.js
    2013-02-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true, regexp: true */

/*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
    retrocycle, stringify, test, toString
*/

if (typeof JSON.decycle !== 'function') {
    JSON.decycle = function decycle(object) {
        'use strict';

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form
//      {$ref: PATH}
// where the PATH is a JSONPath string that locates the first occurance.
// So,
//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));
// produces the string '[{"$ref":"$"}]'.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child member or
// property.

        var objects = [],   // Keep a reference to each unique object or array
            paths = [];     // Keep the path to each unique object or array

        return (function derez(value, path) {

// The derez recurses through the object, producing the deep copy.

            var i,          // The loop counter
                name,       // Property name
                nu;         // The new object or array

// typeof null === 'object', so go on if this value is really an object but not
// one of the weird builtin objects.

            if (typeof value === 'object' && value !== null &&
                    !(value instanceof Boolean) &&
                    !(value instanceof Date)    &&
                    !(value instanceof Number)  &&
                    !(value instanceof RegExp)  &&
                    !(value instanceof String)) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a $ref/path object. This is a hard way,
// linear search that will get slower as the number of unique objects grows.

                for (i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return {$ref: paths[i]};
                    }
                }

// Otherwise, accumulate the unique value and its path.

                objects.push(value);
                paths.push(path);

// If it is an array, replicate the array.

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                } else {

// If it is an object, replicate the object.

                    nu = {};
                    for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name],
                                path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            }
            return value;
        }(object, '$'));
    };
}


if (typeof JSON.retrocycle !== 'function') {
    JSON.retrocycle = function retrocycle($) {
        'use strict';

// Restore an object that was reduced by decycle. Members whose values are
// objects of the form
//      {$ref: PATH}
// are replaced with references to the value found by the PATH. This will
// restore cycles. The object will be mutated.

// The eval function is used to locate the values described by a PATH. The
// root object is kept in a $ variable. A regular expression is used to
// assure that the PATH is extremely well formed. The regexp contains nested
// * quantifiers. That has been known to have extremely bad performance
// problems on some browsers for very long strings. A PATH is expected to be
// reasonably short. A PATH is allowed to belong to a very restricted subset of
// Goessner's JSONPath.

// So,
//      var s = '[{"$ref":"$"}]';
//      return JSON.retrocycle(JSON.parse(s));
// produces an array containing a single element which is the array itself.

        var px =
            /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

        (function rez(value) {

// The rez function walks recursively through the object looking for $ref
// properties. When it finds one that has a value that is a path, then it
// replaces the $ref object with a reference to the value that is found by
// the path.

            var i, item, name, path;

            if (value && typeof value === 'object') {
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    for (i = 0; i < value.length; i += 1) {
                        item = value[i];
                        if (item && typeof item === 'object') {
                            path = item.$ref;
                            if (typeof path === 'string' && px.test(path)) {
                                value[i] = eval(path);
                            } else {
                                rez(item);
                            }
                        }
                    }
                } else {
                    for (name in value) {
                        if (typeof value[name] === 'object') {
                            item = value[name];
                            if (item) {
                                path = item.$ref;
                                if (typeof path === 'string' && px.test(path)) {
                                    value[name] = eval(path);
                                } else {
                                    rez(item);
                                }
                            }
                        }
                    }
                }
            }
        }($));
        return $;
    };
}
/** @} */
var stringify = function(x) {
  var type_name = type(x).name;
  switch (type_name) {
  case 'int':
    if (x === Infinity)  return '+inf.0';
    if (x === -Infinity) return '-inf.0';
    break;
  case 'num':
  case 'string':
    break;
  case 'sym':
    if (x === nil) return 'nil';
    if (x === t) return 't';
    return (x.evaluable_name) ? '|' + x.name + '|' : x.name;
  case 'cons':
    return "(" + stringify_list(x) + ")";
  case 'fn':
    return "#<" + (typeof x === 'function' ?
                   'prim' + (x.prim_name ? (":"+x.prim_name) : "") :
                   'fn' + (x.name ? (":"+x.name) : "")) + ">";
  case 'char':
    return "#\\" + x.c;
  case 'table':
    return '#<table n=' + x.n + /* ' | ' + x.stringify_content() + */ '>';
  }
  if (x instanceof Tagged) {
    return '#<tagged ' + type_name + ' ' + stringify(x.obj) + '>';
  }
  if (x instanceof Box)
    return '#<%boxing ' + stringify(x.unbox()) + '>';
  return JSON.stringify(JSON.decycle(x));
}

var stringify_list = function(cons) {
  var a = car(cons), d = cdr(cons);
  return stringify(a) +
    ((d === nil) ? '' :
     (d instanceof Cons) ?
     ' ' + stringify_list(d) :
     ' . ' + stringify(d));
};

var stringify_for_disp = function(x) {
  return (type(x).name === 'string') ? x : stringify(x);
}

var uniq_counter = 0;

var primitives_core = (new Primitives('arc.core.primitives')).define({
  'read': [{dot: -1}, function(str) {
    return Primitives.reader.read(str);
  }],
  'cons': [{dot: -1}, function(car, cdr) {
    return new Cons(car, cdr);
  }],
  'car':  [{dot: -1}, function(x) {
    if (x instanceof Cons) return x.car;
    throw new Error(stringify(x) + ' is not cons type.');
  }],
  'scar': [{dot: -1}, function(x, v) {
    if (x instanceof Cons) return (x.car = v);
    throw new Error(stringify(x) + ' is not cons type.');
  }],
  'cdr': [{dot: -1}, function(x) {
    if (x instanceof Cons) return x.cdr;
    throw new Error(stringify(x) + ' is not cons type.');
  }],
  'scdr': [{dot: -1}, function(x, v) {
    if (x instanceof Cons) return (x.cdr = v);
    throw new Error(stringify(x) + ' is not cons type.');
  }],

  /* c...r code generator
     (pr ((afn (d cs)
     (if (< 0 d)
     (+ (self (- d 1) (cons 'a cs)) (self (- d 1) (cons 'd cs)))
     (+ "'c" cs "r': [{dot: -1}, function(x) { return c"
     (intersperse "r(c" cs) "r(x" (n-of (len cs) ")")
     "; }],\n" )))
     4 nil))
  */
  'caar': [{dot: -1}, function(x) { return car(car(x)); }],
  'cdar': [{dot: -1}, function(x) { return cdr(car(x)); }],
  'cadr': [{dot: -1}, function(x) { return car(cdr(x)); }],
  'cddr': [{dot: -1}, function(x) { return cdr(cdr(x)); }],

  'caaar': [{dot: -1}, function(x) { return car(car(car(x))); }],
  'cdaar': [{dot: -1}, function(x) { return cdr(car(car(x))); }],
  'cadar': [{dot: -1}, function(x) { return car(cdr(car(x))); }],
  'cddar': [{dot: -1}, function(x) { return cdr(cdr(car(x))); }],
  'caadr': [{dot: -1}, function(x) { return car(car(cdr(x))); }],
  'cdadr': [{dot: -1}, function(x) { return cdr(car(cdr(x))); }],
  'caddr': [{dot: -1}, function(x) { return car(cdr(cdr(x))); }],
  'cdddr': [{dot: -1}, function(x) { return cdr(cdr(cdr(x))); }],

  'caaaar': [{dot: -1}, function(x) { return car(car(car(car(x)))); }],
  'cdaaar': [{dot: -1}, function(x) { return cdr(car(car(car(x)))); }],
  'cadaar': [{dot: -1}, function(x) { return car(cdr(car(car(x)))); }],
  'cddaar': [{dot: -1}, function(x) { return cdr(cdr(car(car(x)))); }],
  'caadar': [{dot: -1}, function(x) { return car(car(cdr(car(x)))); }],
  'cdadar': [{dot: -1}, function(x) { return cdr(car(cdr(car(x)))); }],
  'caddar': [{dot: -1}, function(x) { return car(cdr(cdr(car(x)))); }],
  'cdddar': [{dot: -1}, function(x) { return cdr(cdr(cdr(car(x)))); }],
  'caaadr': [{dot: -1}, function(x) { return car(car(car(cdr(x)))); }],
  'cdaadr': [{dot: -1}, function(x) { return cdr(car(car(cdr(x)))); }],
  'cadadr': [{dot: -1}, function(x) { return car(cdr(car(cdr(x)))); }],
  'cddadr': [{dot: -1}, function(x) { return cdr(cdr(car(cdr(x)))); }],
  'caaddr': [{dot: -1}, function(x) { return car(car(cdr(cdr(x)))); }],
  'cdaddr': [{dot: -1}, function(x) { return cdr(car(cdr(cdr(x)))); }],
  'cadddr': [{dot: -1}, function(x) { return car(cdr(cdr(cdr(x)))); }],
  'cddddr': [{dot: -1}, function(x) { return cdr(cdr(cdr(cdr(x)))); }],

  'list': [{dot: 0}, function($$) {
    for (var i=arguments.length-1, rt=nil; -1<i; i--)
      rt = cons(arguments[i], rt);
    return rt;
  }],
  'nthcdr': [{dot: -1}, function(n, lis) {
    for (;0 < n && lis !== nil;n--) lis = cdr(lis);
    return lis;
  }],
  'lastcons': [{dot: -1}, function(lis) {
    var rt = lis;
    while (type(lis) === s_cons) {
      rt = lis;
      lis = cdr(lis);
    }
    return rt;
  }],
  'consif': [{dot: -1}, function(n, lis) {
    return (n === nil) ? lis : cons(n, lis);
  }],
  'flat': [{dot: 1}, function(lis, $$) {
    var max_depth = Infinity;
    if (1 < arguments.length) max_depth = arguments[1];
    if (lis === nil) return nil;
    if (type(lis) !== s_cons) return cons(lis, nil);
    if (max_depth < 1) return lis;
    return nreverse(flat_iter(lis, max_depth));
  }],
  'firstn': [{dot: -1}, function(n, lis) {
    var rt = nil;
    while (lis !== nil && 0 < n) {
      rt = cons(car(lis), rt);
      lis = cdr(lis);
      n--;
    }
    return nreverse(rt)
  }],
  'len': [{dot: -1}, function(lis) {
    if (typeof lis === 'string') return lis.length;
    var i = 0;
    while (lis !== nil) {
      i++; lis = cdr(lis);
    }
    return i;
  }],
  'rev': [{dot: -1}, function(lis) {
    var rt = nil;
    while (lis !== nil) {
      rt = cons(car(lis), rt);
      lis = cdr(lis);
    }
    return rt;
  }],
  'nrev': [{dot: 1}, function(lis, $$) {
    var r = $$ || nil;
    var tmp;
    while (lis !== nil && 'cdr' in lis) {
      tmp = lis.cdr;
      lis.cdr = r;
      r = lis;
      lis = tmp;
    }
    return r;
  }],
  'uniq': [{dot: 0}, function($$) {
    var u = '%g'+uniq_counter;
    if (0 < arguments.length) {
      u += ('-' + arguments[0].name);
    }
    var rt = Symbol.get(u);
    uniq_counter++;
    return rt;
  }],
  'type': [{dot: -1}, function(x) {
    if (x === nil || x === t) return s_sym;
    var type = typeof x;
    switch (type) {
    case 'string':
      return s_string;
    case 'number':
      return ((isNaN(x))  ? Symbol.get('%javascript-NaN') :
              (!!(x % 1)) ? s_num :
              s_int);
    case 'function':
      return s_fn;
    case 'object':
      if (x instanceof Symbol)   return s_sym;
      if (x instanceof Cons)     return s_cons;
      if (x instanceof Closure)  return s_fn;
      if (x instanceof Char)     return s_char;
      if (x instanceof Table)    return s_table;
      if (x instanceof Tagged)   return x.tag;
    default:
      return Symbol.get('%javascript-' + type);
    }
  }],
  'err': [{dot: 0}, function($$) {
    var str = (
      Array.prototype.map.call(
        arguments,
        function(x) { return type(x) === s_string ? x : stringify(x); }
      ).join(' ') + '.');
    console.error(str);
    throw new Error('ERROR');
  }],
  '+': [{dot: 0}, function($$) {
    var l = arguments.length, rt = 0, num = false;
    if (l < 1) return 0;
    for (var i=l-1; 0<=i; i--) {
      var typ = type(arguments[i]);
      if (typeof arguments[i] === 'number') {
        num = true;
        rt += arguments[i];
      } else if (arguments[i] !== nil && type(arguments[i]) !== s_cons) {
        var rts = '';
        for (var i=l-1; 0<=i; i--) rts = coerce(arguments[i], s_string) + rts;
        return rts;
      }
    }
    if (num) return rt;
    return append.apply(this, arguments);
  }],
  'min': [{dot: 0}, function($$) {
    var l = arguments.length, rt = Infinity;
    for (var i=l-1; 0<=i; i--) rt = Math.min(rt, arguments[i]);
    return rt;
  }],
  'max': [{dot: 0}, function($$) {
    var l = arguments.length, rt = -Infinity;
    for (var i=l-1; 0<=i; i--) rt = Math.max(rt, arguments[i]);
    return rt;
  }],
  'rand': [{dot: 0}, function($$) {
    var l = arguments.length;
    if (l < 1) return Math.random();
    return Math.floor(Math.random() * $$);
  }],
  'append': [{dot: 0}, function($$) {
    var dotted = nil;
    for (var i=0, l=arguments.length, rt = nil; i<l; i++) {
      if (dotted !== nil) throw new Error(
        ('error: +(list): contract violation (' +
         Array.prototype.map.call(arguments, stringify).join(' ') + ')'));
      var lis = arguments[i];
      while (lis !== nil) {
        rt = cons(car(lis), rt);
        lis = cdr(lis);
        if (!(lis instanceof Cons)) { dotted = lis; break; }
      }
    }
    return nreverse(rt, dotted);
  }],
  'nconc': [{dot: 0}, function($$) {
    var l = arguments.length - 1;
    if (l < 0) return nil;
    var rt = null;
    for (var i=0; i<l; i++) {
      if (arguments[i] === nil) continue;
      rt = rt || arguments[i];
      var last = lastcons(arguments[i]);
      if (last.cdr !== nil) throw new Error("nconc: Can't concatenate dotted list.");
      while (i < l) {
        if (arguments[i+1] !== nil) break;
        i++;
      }
      if (i === l) break;
      last.cdr = arguments[i+1];
    }
    return rt || arguments[l];
  }],
  '-': [{dot: 1}, function(x, $$) {
    for (var i=1, l=arguments.length, rt = arguments[0]; i<l; i++)
      rt -= arguments[i];
    return (l === 1) ? (-rt) : rt;
  }],
  '*': [{dot: 0}, function($$) {
    for (var i=0, l=arguments.length, rt = 1; i<l; i++)
      rt *= arguments[i];
    return rt;
  }],
  '/': [{dot: 1}, function(x, $$) {
    for (var i=1, l=arguments.length, rt = arguments[0]; i<l; i++)
      rt /= arguments[i];
    return rt;
  }],
  '<': [{dot: 0}, function($$) {
    for (var i=1, l=arguments.length; i<l; i++) {
      if (!(arguments[i-1] < arguments[i])) return nil;
    }
    return t;
  }],
  '>': [{dot: 0}, function($$) {
    for (var i=1, l=arguments.length; i<l; i++) {
      if (!(arguments[i-1] > arguments[i])) return nil;
    }
    return t;
  }],
  '<=': [{dot: 0}, function($$) {
    for (var i=1, l=arguments.length; i<l; i++) {
      if (!(arguments[i-1] <= arguments[i])) return nil;
    }
    return t;
  }],
  '>=': [{dot: 0}, function($$) {
    for (var i=1, l=arguments.length; i<l; i++) {
      if (!(arguments[i-1] >= arguments[i])) return nil;
    }
    return t;
  }],
  'odd': [{dot: -1}, function(x) {
    return (x % 2) ? t : nil;
  }],
  'even': [{dot: -1}, function(x) {
    return (x % 2) ? nil : t;
  }],
  'mod': [{dot: -1}, function(x, y) {
    return (x % y);
  }],
  'no': [{dot: -1}, function(x) {
    return (x === nil) ? t : nil;
  }],
  'is': [{dot: -1}, function(a, b) {
    return (a === b) ? t : nil;
  }],
  '%mem': [{dot: -1}, function(test, lis) {
    while (lis !== nil) {
      if (car(lis) === test) return lis;
      lis = cdr(lis);
    }
    return nil;
  }],
  '%pos': [{dot: -1}, function(test, lis) {
    var i = 0;
    while (lis !== nil) {
      if (car(lis) === test) return i;
      lis = cdr(lis);
      i++;
    }
    return nil;
  }],
  'atom': [{dot: -1}, function(x) {
    return (type(x).name === 'cons') ? nil : t;
  }],
  'apply': [{dot: 1}, function(fn, $$) {
    for (var i=1, l=arguments.length-1, args=[]; i<l; i++)
      args[i-1] = arguments[i];
    if (0 < l) args = args.concat(list_to_javascript_arr(arguments[l]));
    return new Call(fn, null, args);
  }],
  'ssyntax': [{dot: 1}, function(s, $$) {
    if (s === nil || s === t) return nil;
    var sstr = s.name;
    var specials = this.ns.get('***special_syntax***').unbox().src;
    for (var i in specials) {
      var reg_fn = rep(specials[i]);
      var reg = car(reg_fn);
      var fn  = cdr(reg_fn);
      var mat = sstr.match(new RegExp(rep(reg)));
      if (mat) {
        if (1 < arguments.length) {
          return new Call(fn, null, mat.slice(1).map(read));
        }
        return t;
      }
    }
    return nil;
  }],
  'match': [{dot: -1}, function(reg, str) {
    var mat = str.match(new RegExp(rep(reg)));
    return mat ? javascript_arr_to_list(mat) : nil;
  }],
  '%pair': [{dot: -1}, function(lis) {
    var rt = nil, toggle = true;
    while (lis !== nil) {
      if (toggle) {
        rt = cons(cons(car(lis), nil), rt);
      } else {
        car(rt).cdr = cons(car(lis), nil);
      }
      lis = cdr(lis);
      toggle = !toggle;
    }
    return nreverse(rt);
  }],
  '%union': [{dot: -1}, function(test, lis1, lis2) {
    var arr = list_to_javascript_arr(lis1);
    while (lis2 !== nil) {
      var ca = car(lis2);
      if (arr.indexOf(ca) < 0) arr.push(ca);
      lis2 = cdr(lis2);
    }
    return javascript_arr_to_list(arr);
  }],
  'dedup': [{dot: -1}, function(lis) {
    var arr = list_to_javascript_arr(lis);
    var narr = [];
    for (var i=0, l=arr.length; i<l; i++) {
      if (narr.indexOf(arr[i]) < 0) narr.push(arr[i]);
    }
    return javascript_arr_to_list(narr);
  }],
  'table': [{dot: 0}, function($$) {
    var tbl = new Table();
    var l = arguments.length;
    if ((l % 2) === 1) throw new Error('(table) arguments must be even number.');
    for (var i = 0; i < l; i+=2) {
      tbl.put(arguments[i], arguments[i+1]);
    }
    return tbl;
  }],
  'ref': [{dot: -1}, function(obj, idx) {
    var val, typename = type(obj).name;
    switch (typename) {
    case 'string':
      if (idx < 0 || (obj.length - 1) < idx)
        throw new Error('The index is out of range. ' + idx + 'th of '+ stringify(obj) + '.');
      return Char.get(obj[idx]);
    case 'cons':
      for (var iter = obj, i = idx; 0 < i; i--) {
        if (iter === nil) throw new Error('The index is out of range. ' + idx + 'th of '+ stringify(obj) + '.');
        iter = cdr(iter);
      }
      return car(iter);
    case 'table':
      return obj.get(idx);
    }
    throw new Error('(ref obj idx) supports only cons or string or table. but ' + typename + ' given.');
  }],
  'sref': [{dot: -1}, function(obj, val, idx) {
    switch (type(obj).name) {
    case 'string':
      throw new Error('TODO: mutable string is not supported yet.');
      return val;
    case 'cons':
      for (var iter = obj, i = idx; 0 < i; i--) {
        if (iter === nil) throw new Error('The index is out of range. ' + idx + 'th of '+ stringify(obj) + '.');
        iter = cdr(iter);
      }
      scar(iter, val);
      return val;
    case 'table':
      obj.put(idx, val);
      return val;
    }
    throw new Error('(sref obj val idx) supports only cons or string or table. but ' + typename + ' given.');
  }],
  'dref': [{dot: -1}, function(obj, idx) {
    switch (type(obj).name) {
    case 'string':
      throw new Error('TODO: mutable string is not supported yet.');
      return nil;
    case 'cons':
      throw new Error('TODO: mutable string is not supported yet.');
      /* TODO Support! 
         for (var iter = obj, i = idx; 0 < i; i--) {
         if (iter === nil) throw new Error('The index is out of range. ' + idx + 'th of '+ stringify(obj) + '.');
         iter = cdr(iter);
         }
         scdr(iter, cddr(iter));
         return nil;
      */
    case 'table':
      obj.rem(idx);
      return nil;
    }
    throw new Error('(sref obj val idx) supports only cons or string or table. but ' + typename + ' given.');
  }],
  'annotate': [{dot: -1}, function(tag, obj) {
    if (type(tag).name !== 'sym')
      throw new Error("First argument must be a symbol " + stringify(tag));
    return new Tagged(tag, obj);
  }],
  'rep': [{dot: -1}, function(tagged) {
    return tagged.obj;
  }],
  'coerce': [{dot: 2}, function(obj, to_type, args) {
    /*
      A char can be coerced to int, string, or sym.
      A number can be coerced to int, char, or string (of specified base).
      A string can be coerced to sym, cons (char list), or int (of specified base).
      A list of characters can be coerced to a string.
      A symbol can be coerced to a string.
    */
    to_type = to_type.name;
    var from_type = type(obj).name;
    switch(from_type) {
    case 'char':
      switch(to_type) {
      case 'int':
      case 'num':
        return obj.c.charCodeAt(0);
      case 'sym':
        return Symbol.get(obj.c);
      case 'string':
        return obj.c[0];
      case 'char':
        return obj;
      }
      break;
    case 'num':
    case 'int':
      switch(to_type) {
      case 'char':
        return Char.get(String.fromCharCode(obj));
      case 'string':
        return (obj).toString(arguments[2] || 10);
      case 'int':
        return (obj | 0);
      case 'num':
        return obj;
      }
      break;
    case 'string':
      switch(to_type) {
      case 'sym':
        try {
          var r = read(obj);
          if (Primitives.reader.completed_p() &&
              type(r).name === 'sym')
            return r;
          return Symbol.get(obj, true);
        } catch (e) {
          // TODO: ignore only Reader Error.
          return Symbol.get(obj, true);
        }
      case 'cons':
        var lis = [];
        for (var i = 0, l = obj.length; i<l; i++)
          lis.push(Char.get(obj[i]));
        return javascript_arr_to_list(lis);
      case 'int':
        return (parseInt(obj, arguments[2] || 10) | 0);
      case 'num':
        return parseFloat(obj);
      case 'string':
        return obj;
      }
      break;
    case 'cons':
      switch(to_type) {
      case 'string':
        var rt = '';
        while (obj !== nil) {
          var c = car(obj);
          if(type(c).name === 'char') {
            rt += c.c;
          } else {
            // throw new Error('coerce of cons->string requires a proper list of Chars.');
            rt += coerce(c, s_string);
          }
          obj = cdr(obj);
        }
        return rt;
      case 'cons':
        return obj;
      case 'table':
        var rt = new Table();
        return rt.load_from_list(obj);
      }
      break;
    case 'sym':
      switch(to_type) {
      case 'string':
        if (obj === nil) return "";
        if (obj === t)   return "t";
        return obj.name;
      case 'sym':
        return obj;
      }
      break;
    case 'table':
      switch(to_type) {
      case 'cons':
        return obj.dump_to_list();
      }
      break;
    }
    throw new Error("Can't coerce " + from_type + " to " + to_type);
  }],
  'bound': [{dot: -1}, function(symbol) {
    return this.ns.has(symbol.name) ? t : nil;
  }],
  'newstring': [{dot: 1}, function(n, $$) {
    var c = Char.get("\u0000");
    if (1 < arguments.length) c = arguments[1];
    var nt = type(n).name, ct = type(c).name;
    if ((nt === 'int' || nt === 'num') && ct === 'char') {
      var rt = '';
      for (;0<n;n--) rt += c.c;
      return rt;
    }
    throw new Error('newstring requires int, char.');
  }],
  'string': [{dot: 0}, function($$) {
    var rt = '';
    for (var i = arguments.length-1; -1 < i; i--) {
      rt = coerce(arguments[i], s_string) + rt;
    }
    return rt;
  }],
  'isa': [{dot: -1}, function(x, typ) {
    return (type(x) === typ) ? t : nil;
  }],
  'acons': [{dot: -1}, function(x) {
    return (type(x) === s_cons) ? t : nil;
  }],
  'idfn': [{dot: -1}, function(x) { return x; }],
  'disp': [{dot: 1}, function(item, $$) {
    if (!is_nodejs) { throw new Error("'disp' is not supported in Browser."); }
    var stream = process.stdout;
    var l = arguments.length;
    if (0 < l) {
      if (1 < l) {
        stream = arguments[1];
      }
      stream.write(stringify_for_disp(item));
    }
    return nil;
  }],
  'pr': [{dot: 0}, function($$) {
    if (!is_nodejs) { throw new Error("'pr' is not supported in Browser."); }
    for (var i = 0, l = arguments.length; i < l; i++) {
      process.stdout.write(stringify_for_disp(arguments[i]));
    }
    return (0 < l) ? arguments[0] : nil;
  }],
  'prt': [{dot: 0}, function($$) {
    if (!is_nodejs) { throw new Error("'prt' is not supported in Browser."); }
    for (var i = 0, l = arguments.length; i < l; i++) {
      if (arguments[i] !== nil) process.stdout.write(stringify_for_disp(arguments[i]));
    }
    return (0 < l) ? arguments[0] : nil;
  }],
  'prn': [{dot: 0}, function($$) {
    if (0 < arguments.length) {
      var arr = Array.prototype.map.call(arguments, stringify_for_disp);
      console.log(arr.join(''));
      return arguments[0];
    }
    return nil;
  }],
  'msec': [{dot: -1}, function() {
    return +(new Date());
  }],
  'fn-name': [{dot: 1}, function(fn, $$) {
    var closurep = (fn instanceof Closure);
    if (!closurep && !(typeof fn === 'function')) {
      var typename = type(fn).name;
      throw new Error('fn-name expects only fn-type object as the first argument. but ' + typename + ' given.');
    }
    var name;
    if (1 < arguments.length) {
      name = coerce(arguments[1], s_string);
      if (closurep) {
        fn.name = name;
      } else {
        fn.prim_name = name;
      }
    } else {
      name = (closurep) ? fn.name : fn.prim_name;
    }
    return coerce(name || nil, s_sym);
  }],
  '***defns***': [{dot: -1}, function(name, opts) {
    name = coerce(name, s_string);
    opts = list_to_javascript_arr(opts);
    var import_flag = false;
    var imports = [];
    for (var i=0, l=opts.length; i<l; i++) {
      var import_name = coerce(opts[i], s_string);
      if (import_name === ':import') { import_flag = true; continue; }
      if (import_flag) {
        imports.push(NameSpace.get(import_name));
      }
    }
    var _ = NameSpace.create_with_default(name, imports);
    return nil;
  }],
  '***ns***': [{dot: -1}, function(name) {
    name = coerce(name, s_string);
    var ns = NameSpace.get(name);
    this.ns = ns;
    return nil;
  }],
  '***curr-ns***': [{dot: -1}, function() {
    return Symbol.get(this.ns.name);
  }]
});

var coerce      = primitives_core.vars.coerce;
var type        = primitives_core.vars.type;
var read        = primitives_core.vars.read;
var cons        = primitives_core.vars.cons;
var list        = primitives_core.vars.list;
var car         = primitives_core.vars.car;
var scar        = primitives_core.vars.scar;
var cdr         = primitives_core.vars.cdr;
var scdr        = primitives_core.vars.scdr;
var caar        = primitives_core.vars.caar;
var cadr        = primitives_core.vars.cadr;
var cddr        = primitives_core.vars.cddr;
var nthcdr      = primitives_core.vars.nthcdr;
var lastcons    = primitives_core.vars.lastcons;
var append      = primitives_core.vars.append;
var nconc       = primitives_core.vars.nconc;
var reverse     = primitives_core.vars.rev;
var nreverse    = primitives_core.vars.nrev;
var rep         = primitives_core.vars.rep;
var annotate    = primitives_core.vars.annotate;

ArcJS.nil       = nil;
ArcJS.t         = t;
ArcJS.type      = type;
ArcJS.stringify = stringify;
ArcJS.cons      = cons;
ArcJS.list      = list;
ArcJS.read      = read;
ArcJS.car       = car;
ArcJS.cdr       = cdr;
ArcJS.cadr      = cadr;
ArcJS.cddr      = cddr;
ArcJS.nreverse  = nreverse;
ArcJS.rep       = rep;
ArcJS.annotate  = annotate;
ArcJS.list_to_javascript_arr = list_to_javascript_arr;
ArcJS.javascript_arr_to_list = javascript_arr_to_list;
/** @} */
/** @} */
/** @file preload.js { */
var preloads = [];
var preload_vals = [];
// compiler
/** @file compiler.fasl { */
// This is an auto generated file.
// Compiled from ['src/arc/compiler.arc'].
// DON'T EDIT !!!
preloads.push([
[0,8,6,0,7,6,1,7,11,2,21,22,25],
[0,6,6,3,7,11,4,21,22,19,5,25],
[0,6,6,3,7,11,4,21,22,19,6,25],
[0,6,6,3,7,11,4,21,22,19,7,25],
[0,119,11,5,21,7,0,107,6,8,7,1,0,98,3,2,9,0,2,65,6,9,7,9,2,7,0,52,6,10,7,6,5,7,0,30,6,11,7,6,12,7,0,19,0,10,6,13,7,9,1,7,6,14,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,22,7,6,17,7,11,15,21,22,7,0,10,6,18,7,9,2,7,6,14,7,11,15,21,22,7,6,19,7,11,15,21,22,7,6,17,7,11,15,21,5,4,4,22,3,31,6,11,7,6,12,7,0,19,0,10,6,13,7,9,2,7,6,14,7,11,15,21,22,7,9,1,7,6,14,7,11,16,21,22,7,6,17,7,11,15,21,5,4,4,22,23,4,7,6,14,7,11,11,21,22,7,6,8,7,6,17,7,11,10,21,22,19,8,25],
[0,41,11,5,21,7,0,29,6,8,7,1,0,20,1,-1,6,13,7,0,8,6,20,7,6,1,7,11,15,21,22,7,9,0,7,6,17,7,11,15,21,5,4,2,22,7,6,14,7,11,11,21,22,7,6,21,7,6,17,7,11,10,21,22,19,21,25],
[0,96,11,5,21,7,0,84,6,8,7,1,0,75,3,2,6,22,7,0,10,9,2,7,12,7,6,14,7,11,15,21,22,7,0,30,6,9,7,9,2,7,0,19,0,10,6,13,7,9,1,7,6,14,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,22,7,6,17,7,11,15,21,22,7,0,21,6,23,7,9,2,7,0,10,6,18,7,9,2,7,6,14,7,11,15,21,22,7,6,17,7,11,15,21,22,7,9,2,7,6,24,7,11,15,21,5,6,4,22,7,6,14,7,11,11,21,22,7,6,25,7,6,17,7,11,10,21,22,19,25,25],
[0,43,11,5,21,7,0,31,6,8,7,1,0,22,2,1,0,12,6,25,7,6,26,7,9,1,7,6,17,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,27,7,6,17,7,11,10,21,22,19,27,25],
[0,158,11,5,21,7,0,146,6,8,7,1,0,137,1,0,0,8,9,0,7,6,1,7,11,28,21,22,7,6,1,7,12,7,14,20,0,8,0,0,7,1,1,102,1,-1,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,14,7,6,14,7,11,31,21,22,2,44,6,32,7,0,8,8,0,0,7,6,1,7,11,29,21,22,7,0,8,8,0,0,7,6,1,7,11,33,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,10,0,21,22,7,6,19,7,11,15,21,5,5,4,22,3,29,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,31,21,22,2,10,8,0,0,7,6,1,7,11,29,21,5,2,4,22,3,2,12,15,2,2,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,2,2,22,7,6,14,7,11,11,21,22,7,6,35,7,6,17,7,11,10,21,22,19,35,25],
[0,93,11,5,21,7,0,81,6,8,7,1,0,72,1,0,0,8,9,0,7,6,1,7,11,34,21,22,2,46,6,32,7,0,8,9,0,7,6,1,7,11,29,21,22,7,0,24,0,8,6,36,7,6,1,7,11,15,21,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,16,21,22,7,12,7,6,19,7,11,15,21,5,5,2,22,3,17,0,8,9,0,7,6,1,7,11,29,21,22,7,14,8,0,0,2,3,8,0,0,3,2,12,15,2,2,23,2,7,6,14,7,11,11,21,22,7,6,36,7,6,17,7,11,10,21,22,19,36,25],
[0,100,11,5,21,7,0,88,6,8,7,1,0,79,1,0,9,0,2,75,0,6,6,3,7,11,37,21,22,7,14,0,64,6,22,7,0,17,8,0,0,7,0,8,9,0,7,6,1,7,11,29,21,22,7,6,14,7,11,15,21,22,7,0,37,6,32,7,8,0,0,7,8,0,0,7,0,24,0,8,6,38,7,6,1,7,11,15,21,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,16,21,22,7,6,19,7,11,15,21,22,7,6,17,7,11,15,21,22,15,2,2,3,2,12,23,2,7,6,14,7,11,11,21,22,7,6,38,7,6,17,7,11,10,21,22,19,38,25],
[0,50,11,5,21,7,0,38,6,8,7,1,0,29,3,2,0,19,6,22,7,0,10,9,2,7,9,1,7,6,14,7,11,15,21,22,7,6,14,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,5,3,4,22,7,6,14,7,11,11,21,22,7,6,39,7,6,17,7,11,10,21,22,19,39,25],
[0,52,11,5,21,7,0,40,6,8,7,1,0,31,3,2,6,9,7,9,2,7,0,19,0,10,6,13,7,9,1,7,6,14,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,22,7,6,17,7,11,15,21,5,4,4,22,7,6,14,7,11,11,21,22,7,6,40,7,6,17,7,11,10,21,22,19,40,25],
[0,171,11,5,21,7,0,159,6,8,7,1,0,150,1,0,0,8,9,0,7,6,1,7,11,28,21,22,7,6,1,7,12,7,14,20,0,8,0,0,7,1,1,115,1,-1,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,14,7,6,14,7,11,31,21,22,2,57,6,39,7,6,41,7,0,8,8,0,0,7,6,1,7,11,29,21,22,7,0,35,6,32,7,6,41,7,0,8,8,0,0,7,6,1,7,11,33,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,10,0,21,22,7,6,19,7,11,15,21,22,7,6,19,7,11,15,21,5,5,4,22,3,29,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,31,21,22,2,10,8,0,0,7,6,1,7,11,29,21,5,2,4,22,3,2,12,15,2,2,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,2,2,22,7,6,14,7,11,11,21,22,7,6,42,7,6,17,7,11,10,21,22,19,42,25],
[0,156,11,5,21,7,0,144,6,8,7,1,0,135,3,2,12,7,14,20,0,8,0,0,7,9,2,7,1,2,89,1,-1,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,43,21,22,2,10,9,0,7,6,1,7,11,29,21,5,2,2,22,3,63,6,35,7,0,28,6,31,7,10,0,7,0,17,6,18,7,0,8,9,0,7,6,1,7,11,29,21,22,7,6,14,7,11,15,21,22,7,6,17,7,11,15,21,22,7,0,8,9,0,7,6,1,7,11,33,21,22,7,0,15,0,8,9,0,7,6,1,7,11,44,21,22,7,6,1,7,10,1,21,22,7,6,19,7,11,15,21,5,5,2,22,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,7,14,6,39,7,9,2,7,9,1,7,0,7,9,0,7,6,1,7,8,0,0,22,7,6,19,7,11,15,21,5,5,6,22,7,6,14,7,11,11,21,22,7,6,45,7,6,17,7,11,10,21,22,19,45,25],
[0,48,11,5,21,7,0,36,6,8,7,1,0,27,2,1,0,17,6,45,7,0,6,6,3,7,11,37,21,22,7,9,1,7,6,17,7,11,15,21,22,7,9,0,7,6,14,7,11,16,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,46,7,6,17,7,11,10,21,22,19,46,25],
[0,220,11,5,21,7,0,208,6,8,7,1,0,199,2,1,0,17,0,8,9,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,47,21,22,7,14,0,10,8,0,0,7,9,0,7,6,14,7,11,48,21,22,7,0,10,8,0,0,7,9,0,7,6,14,7,11,49,21,22,7,14,6,46,7,0,147,0,19,6,29,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,120,0,111,11,16,21,7,12,7,0,99,9,1,7,1,1,88,1,-1,0,8,9,0,7,6,1,7,11,29,21,22,7,0,71,0,62,6,51,7,0,53,0,17,6,13,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,50,21,22,7,0,28,0,19,6,34,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,8,0,1,7,6,14,7,11,52,21,22,7,6,17,7,11,51,21,22,7,8,0,0,7,6,14,7,11,16,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,8,22,7,6,14,7,11,11,21,22,7,6,53,7,6,17,7,11,10,21,22,19,53,25],
[1,0,164,1,-1,4,2,7,6,1,7,9,0,7,1,1,155,1,-1,10,0,7,6,1,7,12,7,14,20,0,8,0,0,7,9,0,7,1,2,125,1,-1,0,8,9,0,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,101,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,55,7,6,14,7,11,31,21,22,2,28,0,26,10,0,7,1,1,8,1,-1,13,7,6,1,7,10,0,5,2,2,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,51,0,10,8,0,0,7,6,56,7,6,14,7,11,31,21,22,2,28,0,26,10,0,7,1,1,8,1,-1,13,7,6,1,7,10,0,5,2,2,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,13,0,11,10,1,21,7,9,0,7,6,14,7,11,52,21,22,12,15,2,2,3,2,12,15,2,2,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,2,2,22,5,2,2,22,19,57,25],
[1,0,474,1,-1,0,8,9,0,7,6,1,7,11,57,21,22,2,19,0,17,0,8,9,0,7,6,1,7,11,54,21,22,7,6,50,7,6,14,7,11,31,21,22,3,2,12,2,434,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,55,7,6,14,7,11,31,21,22,2,21,0,19,1,0,3,1,-1,9,0,23,2,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,391,0,10,8,0,0,7,6,56,7,6,14,7,11,31,21,22,2,27,0,25,1,0,9,1,-1,6,58,7,6,1,7,11,59,21,5,2,2,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,354,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,285,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,60,7,6,14,7,11,31,21,22,2,68,0,66,9,0,7,1,1,41,1,-1,6,50,7,0,15,0,8,9,0,7,6,1,7,11,61,21,22,7,6,1,7,11,62,21,22,7,0,15,0,8,10,0,7,6,1,7,11,34,21,22,7,6,1,7,11,62,21,22,7,6,17,7,11,15,21,5,4,2,22,7,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,188,0,10,8,0,0,7,6,55,7,6,14,7,11,31,21,22,2,54,0,52,9,0,7,1,1,27,1,-1,6,50,7,9,0,7,0,15,0,8,10,0,7,6,1,7,11,34,21,22,7,6,1,7,11,62,21,22,7,6,17,7,11,15,21,5,4,2,22,7,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,124,0,10,8,0,0,7,6,56,7,6,14,7,11,31,21,22,2,73,0,71,9,0,7,1,1,46,1,-1,0,15,0,8,10,0,7,6,1,7,11,34,21,22,7,6,1,7,11,43,21,22,2,3,9,0,3,27,6,16,7,9,0,7,0,15,0,8,10,0,7,6,1,7,11,34,21,22,7,6,1,7,11,62,21,22,7,6,17,7,11,15,21,5,4,2,22,23,2,7,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,41,0,40,6,50,7,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,62,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,62,21,22,7,6,17,7,11,15,21,22,15,2,2,3,41,0,40,6,50,7,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,62,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,62,21,22,7,6,17,7,11,15,21,22,15,2,2,15,2,2,3,11,6,18,7,9,0,7,6,14,7,11,15,21,5,3,2,22,23,2,19,62,25],
[1,0,173,1,-1,0,8,9,0,7,6,1,7,11,57,21,22,2,19,0,17,0,8,9,0,7,6,1,7,11,54,21,22,7,6,50,7,6,14,7,11,31,21,22,3,2,12,2,133,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,60,7,6,14,7,11,31,21,22,2,34,0,32,1,0,16,1,-1,0,8,9,0,7,6,1,7,11,61,21,22,7,6,1,7,11,61,21,5,2,2,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,77,0,10,8,0,0,7,6,55,7,6,14,7,11,31,21,22,2,21,0,19,1,0,3,1,-1,9,0,23,2,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,46,0,10,8,0,0,7,6,56,7,6,14,7,11,31,21,22,2,27,0,25,1,0,9,1,-1,6,63,7,6,1,7,11,59,21,5,2,2,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,9,0,8,9,0,7,6,1,7,11,62,21,22,15,2,2,3,11,6,18,7,9,0,7,6,14,7,11,15,21,5,3,2,22,23,2,19,61,25],
[0,30,11,5,21,7,0,18,6,8,7,1,0,9,1,-1,9,0,7,6,1,7,11,61,21,5,2,2,22,7,6,14,7,11,11,21,22,7,6,60,7,6,17,7,11,10,21,22,19,60,25],
[1,0,84,2,-1,9,0,7,12,7,6,14,7,12,7,14,20,0,9,1,7,8,0,0,7,1,2,52,2,-1,9,1,2,41,0,8,9,1,7,6,1,7,11,34,21,22,7,0,23,0,14,0,8,9,1,7,6,1,7,11,29,21,22,7,6,1,7,10,1,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,10,0,21,5,3,3,22,3,9,9,0,7,6,1,7,11,64,21,5,2,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,3,3,22,19,52,25],
[0,119,11,5,21,7,0,107,6,8,7,1,0,98,2,1,0,8,9,1,7,6,1,7,11,43,21,22,2,12,6,65,7,9,0,7,6,14,7,11,50,21,5,3,3,22,3,77,6,39,7,0,67,0,8,9,1,7,6,1,7,11,29,21,22,7,0,51,0,8,9,1,7,6,1,7,11,33,21,22,7,0,35,0,26,6,66,7,0,17,0,8,9,1,7,6,1,7,11,44,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,23,3,7,6,14,7,11,11,21,22,7,6,66,7,6,17,7,11,10,21,22,19,66,25],
[0,192,11,5,21,7,0,180,6,8,7,1,0,171,2,1,0,8,9,1,7,6,1,7,11,67,21,22,2,97,6,22,7,0,86,0,77,11,16,21,7,12,7,0,65,1,0,56,1,-1,9,0,7,0,46,0,37,6,37,7,0,28,0,19,6,18,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,9,1,7,6,14,7,11,52,21,22,7,6,17,7,11,51,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,3,65,6,39,7,0,55,9,1,7,0,46,0,37,6,37,7,0,28,0,19,6,18,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,23,3,7,6,14,7,11,11,21,22,7,6,68,7,6,17,7,11,10,21,22,19,68,25],
[0,177,11,5,21,7,0,165,6,8,7,1,0,156,1,0,0,8,6,69,7,6,1,7,11,37,21,22,7,14,6,13,7,0,136,8,0,0,7,0,127,0,118,9,0,7,6,1,7,12,7,14,20,0,8,1,0,7,8,0,0,7,1,2,89,1,-1,0,8,9,0,7,6,1,7,11,34,21,22,2,33,0,8,9,0,7,6,1,7,11,29,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,10,0,21,22,7,6,14,7,11,15,21,5,3,2,22,3,47,6,51,7,0,37,0,8,9,0,7,6,1,7,11,29,21,22,2,10,0,8,9,0,7,6,1,7,11,29,21,22,3,2,6,70,7,0,10,10,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,7,6,14,7,11,11,21,22,7,6,71,7,6,17,7,11,10,21,22,19,71,25],
[1,0,22,1,-1,9,0,7,1,1,18,1,0,0,10,10,0,7,9,0,7,6,14,7,11,51,21,22,7,6,1,7,11,43,21,5,2,2,22,23,2,19,72,25],
[0,86,11,5,21,7,0,74,6,8,7,1,0,65,2,1,6,73,7,0,55,0,19,6,18,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,28,0,19,6,18,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,74,7,6,17,7,11,10,21,22,19,74,25],
[0,59,11,5,21,7,0,47,6,8,7,1,0,38,1,-1,6,2,7,0,28,0,19,6,18,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,6,14,7,11,11,21,22,7,6,75,7,6,17,7,11,10,21,22,19,75,25],
[0,284,11,5,21,7,0,272,6,8,7,1,0,263,4,3,6,65,7,0,253,0,235,6,9,7,0,226,9,3,7,0,217,0,208,6,10,7,0,199,6,6,7,0,190,0,154,6,11,7,0,145,6,76,7,0,136,0,127,6,50,7,0,118,9,2,7,0,109,0,100,6,39,7,0,91,6,77,7,0,82,0,19,6,13,7,0,10,9,1,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,55,0,46,6,23,7,0,37,6,77,7,0,28,0,19,6,18,7,0,10,9,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,78,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,28,0,19,6,18,7,0,10,9,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,10,9,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,5,22,7,6,14,7,11,11,21,22,7,6,79,7,6,17,7,11,10,21,22,19,79,25],
[0,82,11,6,21,7,0,70,6,80,7,0,61,0,10,6,81,7,6,82,7,6,14,7,11,11,21,22,7,1,0,29,2,-1,6,71,7,0,19,9,1,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,14,0,10,8,0,0,7,6,83,7,6,14,7,11,23,21,22,8,0,0,15,2,2,7,6,14,7,11,50,21,22,7,6,14,7,11,11,21,22,7,6,83,7,6,17,7,11,10,21,22,19,83,11,83,21,25],
[0,73,11,6,21,7,0,61,6,80,7,0,52,0,10,6,81,7,6,84,7,6,14,7,11,11,21,22,7,1,0,20,1,-1,6,72,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,14,0,10,8,0,0,7,6,85,7,6,14,7,11,23,21,22,8,0,0,15,2,2,7,6,14,7,11,50,21,22,7,6,14,7,11,11,21,22,7,6,85,7,6,17,7,11,10,21,22,19,85,11,85,21,25],
[0,73,11,6,21,7,0,61,6,80,7,0,52,0,10,6,81,7,6,86,7,6,14,7,11,11,21,22,7,1,0,20,2,-1,9,1,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,14,0,10,8,0,0,7,6,87,7,6,14,7,11,23,21,22,8,0,0,15,2,2,7,6,14,7,11,50,21,22,7,6,14,7,11,11,21,22,7,6,87,7,6,17,7,11,10,21,22,19,87,11,87,21,25],
[0,91,11,6,21,7,0,79,6,80,7,0,70,0,10,6,81,7,6,88,7,6,14,7,11,11,21,22,7,1,0,38,2,-1,9,1,7,0,28,0,19,6,18,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,14,0,10,8,0,0,7,6,89,7,6,14,7,11,23,21,22,8,0,0,15,2,2,7,6,14,7,11,50,21,22,7,6,14,7,11,11,21,22,7,6,89,7,6,17,7,11,10,21,22,19,89,11,89,21,25],
[0,82,11,6,21,7,0,70,6,80,7,0,61,0,10,6,81,7,6,90,7,6,14,7,11,11,21,22,7,1,0,29,2,-1,6,75,7,0,19,9,1,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,14,0,10,8,0,0,7,6,91,7,6,14,7,11,23,21,22,8,0,0,15,2,2,7,6,14,7,11,50,21,22,7,6,14,7,11,11,21,22,7,6,91,7,6,17,7,11,10,21,22,19,91,11,91,21,25],
[0,178,11,5,21,7,0,166,6,8,7,1,0,157,3,2,6,9,7,0,147,0,30,0,21,6,92,7,0,10,9,2,7,6,93,7,6,14,7,11,94,21,22,7,6,95,7,6,17,7,11,16,21,22,7,6,96,7,6,14,7,11,94,21,22,7,0,109,0,100,6,10,7,0,91,6,7,7,0,82,0,46,6,11,7,0,37,6,97,7,0,28,0,19,6,13,7,0,10,9,1,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,28,0,19,6,18,7,0,10,9,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,7,6,14,7,11,11,21,22,7,6,98,7,6,17,7,11,10,21,22,19,98,25],
[0,32,11,7,21,7,0,20,6,99,7,1,0,11,2,-1,9,1,7,9,0,7,6,14,7,11,100,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,50,7,6,17,7,11,10,21,22,19,101,25],
[0,32,11,7,21,7,0,20,6,99,7,1,0,11,2,-1,9,1,7,9,0,7,6,14,7,11,100,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,4,7,6,17,7,11,10,21,22,19,102,25],
[0,32,11,7,21,7,0,20,6,99,7,1,0,11,2,-1,9,1,7,9,0,7,6,14,7,11,100,21,5,3,3,22,7,6,14,7,11,11,21,22,7,6,93,7,6,17,7,11,10,21,22,19,103,25],
[1,0,139,2,-1,0,10,9,0,7,6,93,7,6,14,7,11,104,21,22,2,38,0,19,9,1,7,0,10,9,0,7,6,50,7,6,14,7,11,94,21,22,7,6,14,7,11,105,21,22,7,14,8,0,0,2,12,0,10,8,0,0,7,6,93,7,6,14,7,11,94,21,22,3,2,12,15,2,2,3,90,0,10,9,1,7,6,13,7,6,14,7,11,104,21,22,2,69,9,0,7,6,1,7,12,7,14,20,0,8,0,0,7,9,1,7,1,2,38,1,-1,9,0,2,34,0,14,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,10,0,22,2,3,9,0,3,16,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,10,1,21,5,2,2,22,3,2,12,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,2,3,22,3,11,9,1,7,9,0,7,6,14,7,11,106,21,5,3,3,22,23,3,19,105,25],
[1,0,32,3,-1,0,11,9,2,7,11,31,21,7,6,14,7,11,31,21,22,2,14,9,2,7,9,1,7,9,0,7,6,17,7,11,107,21,5,4,4,22,3,6,13,2,3,12,3,2,12,23,4,19,108,25],
[1,0,294,2,1,0,20,1,0,11,1,-1,9,0,7,6,93,7,6,14,7,11,104,21,5,3,2,22,7,9,0,7,6,14,7,11,105,21,22,2,147,0,21,11,109,21,7,0,11,11,30,21,7,9,0,7,6,14,7,11,110,21,22,7,6,14,7,11,51,21,22,7,14,0,121,6,3,7,12,7,6,14,7,12,7,14,20,0,9,0,7,9,1,7,8,0,0,7,8,1,0,7,1,4,86,2,-1,0,10,9,1,7,10,0,7,6,14,7,11,31,21,22,2,19,0,8,9,0,7,6,1,7,11,64,21,22,7,6,93,7,6,14,7,11,94,21,5,3,3,22,3,56,0,10,9,1,7,6,1,7,6,14,7,11,16,21,22,7,0,37,0,28,10,2,7,0,19,9,1,7,1,1,8,1,-1,10,0,7,6,1,7,9,0,5,2,2,22,7,10,3,7,6,14,7,11,110,21,22,7,6,14,7,11,51,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,10,1,21,5,3,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,22,15,2,2,3,126,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,43,21,22,2,19,9,1,7,0,8,9,0,7,6,1,7,11,29,21,22,7,6,14,7,11,52,21,5,3,3,22,3,92,9,0,7,6,1,7,12,7,14,20,0,8,0,0,7,9,1,7,1,2,62,1,-1,0,11,11,43,21,7,9,0,7,6,14,7,11,105,21,22,2,3,12,3,47,0,20,10,0,7,0,11,11,29,21,7,9,0,7,6,14,7,11,52,21,22,7,6,14,7,11,51,21,22,7,0,18,0,11,11,34,21,7,9,0,7,6,14,7,11,52,21,22,7,6,1,7,10,1,21,22,7,6,14,7,11,50,21,5,3,2,22,23,2,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,2,3,22,23,3,19,110,25],
[1,0,26,2,1,11,16,21,7,12,7,0,13,11,110,21,7,9,1,7,9,0,7,6,17,7,11,51,21,22,7,6,17,7,11,51,21,5,4,3,22,19,111,25],
[1,0,34,2,-1,9,1,7,1,1,22,1,-1,0,7,9,0,7,6,1,7,10,0,22,2,12,9,0,7,12,7,6,14,7,11,50,21,5,3,2,22,3,2,12,23,2,7,9,0,7,6,14,7,11,111,21,5,3,3,22,19,112,25],
[1,0,75,2,-1,9,1,2,71,0,17,0,8,9,1,7,6,1,7,11,29,21,22,7,9,0,7,6,14,7,11,106,21,22,2,19,0,8,9,1,7,6,1,7,11,34,21,22,7,9,0,7,6,14,7,11,113,21,5,3,3,22,3,34,0,8,9,1,7,6,1,7,11,29,21,22,7,0,17,0,8,9,1,7,6,1,7,11,34,21,22,7,9,0,7,6,14,7,11,113,21,22,7,6,14,7,11,50,21,5,3,3,22,3,2,12,23,3,19,113,25],
[1,0,75,2,-1,9,1,2,71,0,17,0,8,9,1,7,6,1,7,11,29,21,22,7,9,0,7,6,14,7,11,106,21,22,2,35,0,8,9,1,7,6,1,7,11,29,21,22,7,0,17,0,8,9,1,7,6,1,7,11,34,21,22,7,9,0,7,6,14,7,11,114,21,22,7,6,14,7,11,50,21,5,3,3,22,3,18,0,8,9,1,7,6,1,7,11,34,21,22,7,9,0,7,6,14,7,11,114,21,5,3,3,22,3,2,12,23,3,19,114,25],
[1,0,64,1,-1,0,8,9,0,7,6,1,7,11,43,21,22,2,3,12,3,52,0,8,9,0,7,6,1,7,11,115,21,22,2,12,9,0,7,12,7,6,14,7,11,50,21,5,3,2,22,3,32,0,8,9,0,7,6,1,7,11,29,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,116,21,22,7,6,14,7,11,50,21,5,3,2,22,23,2,19,116,25],
[1,0,80,1,-1,9,0,7,6,3,7,6,14,7,12,7,14,20,0,8,0,0,7,1,1,50,2,-1,0,8,9,1,7,6,1,7,11,43,21,22,2,3,6,117,3,38,0,8,9,1,7,6,1,7,11,115,21,22,2,3,9,0,3,27,0,8,9,1,7,6,1,7,11,34,21,22,7,0,10,9,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,10,0,21,5,3,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,3,2,22,19,118,25],
[1,0,129,3,2,0,8,9,0,7,6,1,7,11,67,21,22,2,10,0,8,9,0,7,6,1,7,11,29,21,22,3,2,12,2,19,9,2,7,14,8,0,0,2,3,8,0,0,3,10,9,1,7,14,8,0,0,2,3,8,0,0,3,2,12,15,2,2,15,2,2,3,2,12,7,14,8,0,0,2,3,8,0,0,3,14,9,2,2,3,9,1,3,2,12,7,14,8,0,0,2,3,8,0,0,3,2,12,15,2,2,15,2,2,2,67,0,8,9,2,7,6,1,7,11,29,21,22,7,0,49,0,8,9,1,7,6,1,7,11,29,21,22,7,0,33,0,8,9,2,7,6,1,7,11,34,21,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,0,8,9,0,7,6,1,7,11,29,21,22,7,6,17,7,11,119,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,3,2,12,23,4,19,119,25],
[1,0,32,1,-1,0,8,9,0,7,6,1,7,11,67,21,22,2,17,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,120,21,5,2,2,22,3,6,9,0,2,3,13,3,2,12,23,2,19,120,25],
[1,0,58,1,-1,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,43,21,22,2,10,9,0,7,6,1,7,11,29,21,5,2,2,22,3,32,0,8,9,0,7,6,1,7,11,29,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,121,21,22,7,6,14,7,11,50,21,5,3,2,22,23,2,19,121,25],
[1,0,57,1,-1,0,8,9,0,7,6,1,7,11,67,21,22,2,33,0,8,9,0,7,6,1,7,11,29,21,22,7,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,122,21,22,7,6,14,7,11,50,21,5,3,2,22,3,15,9,0,2,12,9,0,7,12,7,6,14,7,11,50,21,5,3,2,22,3,2,12,23,2,19,122,25],
[1,0,20,1,-1,0,10,9,0,7,13,7,6,14,7,11,123,21,22,7,14,8,0,0,2,3,8,0,0,3,2,9,0,15,2,2,23,2,19,124,25],
[1,0,71,1,-1,0,17,0,8,9,0,7,6,1,7,11,54,21,22,7,6,50,7,6,14,7,11,31,21,22,2,20,0,18,11,5,21,7,0,8,9,0,7,6,1,7,11,29,21,22,7,6,14,7,11,100,21,22,3,2,12,7,14,8,0,0,2,26,0,8,8,0,0,7,6,1,7,11,125,21,22,7,0,8,9,0,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,4,22,3,2,9,0,15,2,2,23,2,19,126,25],
[1,0,817,2,-1,0,8,9,1,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,747,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,18,7,6,14,7,11,31,21,22,2,29,0,27,1,0,11,1,0,6,18,7,9,0,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,696,0,10,8,0,0,7,6,13,7,6,14,7,11,31,21,22,2,241,0,239,9,0,7,1,1,221,2,1,0,8,9,1,7,6,1,7,11,127,21,22,2,91,0,8,6,128,7,6,1,7,11,37,21,22,7,14,0,69,6,13,7,0,60,8,0,0,7,0,51,0,42,6,22,7,0,33,0,24,0,8,9,1,7,6,1,7,11,15,21,22,7,0,8,8,0,0,7,6,1,7,11,15,21,22,7,6,14,7,11,129,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,15,2,2,7,10,0,7,6,14,7,11,130,21,5,3,3,22,3,121,6,13,7,0,111,9,1,7,0,102,0,17,0,8,9,0,7,6,1,7,11,30,21,22,7,6,14,7,6,14,7,11,131,21,22,2,38,0,36,0,8,9,0,7,6,1,7,11,29,21,22,7,0,20,11,31,21,7,0,8,9,1,7,6,1,7,11,116,21,22,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,130,21,22,3,39,0,38,0,10,6,65,7,9,0,7,6,14,7,11,50,21,22,7,0,20,11,31,21,7,0,8,9,1,7,6,1,7,11,116,21,22,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,130,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,23,3,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,445,0,10,8,0,0,7,6,22,7,6,14,7,11,31,21,22,2,311,0,309,9,0,7,1,1,291,2,1,0,8,9,1,7,6,1,7,11,28,21,22,7,14,0,11,11,29,21,7,8,0,0,7,6,14,7,11,52,21,22,7,14,0,8,8,0,0,7,6,1,7,11,127,21,22,2,107,0,11,11,33,21,7,8,1,0,7,6,14,7,11,52,21,22,7,14,0,16,1,0,7,1,-1,6,3,7,11,37,21,5,1,2,22,7,8,0,0,7,6,14,7,11,52,21,22,7,14,0,73,0,64,6,22,7,0,55,0,10,8,0,0,7,8,1,0,7,6,14,7,11,119,21,22,7,0,37,0,28,6,22,7,0,19,0,10,8,2,0,7,8,0,0,7,6,14,7,11,129,21,22,7,9,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,10,0,7,6,14,7,11,130,21,22,15,4,2,3,151,6,22,7,0,141,0,45,10,0,7,1,1,34,1,-1,0,8,9,0,7,6,1,7,11,29,21,22,7,0,17,0,8,9,0,7,6,1,7,11,33,21,22,7,10,0,7,6,14,7,11,130,21,22,7,6,14,7,11,15,21,5,3,2,22,7,8,1,0,7,6,14,7,11,111,21,22,7,0,88,0,17,0,8,9,0,7,6,1,7,11,30,21,22,7,6,14,7,6,14,7,11,131,21,22,2,31,0,29,0,8,9,0,7,6,1,7,11,29,21,22,7,0,13,11,31,21,7,8,0,0,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,130,21,22,3,32,0,31,0,10,6,65,7,9,0,7,6,14,7,11,50,21,22,7,0,13,11,31,21,7,8,0,0,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,130,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,7,22,15,4,2,23,3,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,124,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,17,0,8,8,0,0,7,6,1,7,11,54,21,22,7,6,96,7,6,14,7,11,31,21,22,2,33,0,17,0,10,8,0,0,7,9,0,7,6,14,7,11,105,21,22,7,6,1,7,11,43,21,22,2,13,0,11,11,5,21,7,8,0,0,7,6,14,7,11,100,21,22,3,2,12,3,2,12,15,2,2,7,14,8,0,0,2,35,0,33,0,24,0,8,8,0,0,7,6,1,7,11,125,21,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,7,9,0,7,6,14,7,11,130,21,22,3,23,0,22,9,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,130,21,5,3,2,22,7,9,1,7,6,14,7,11,52,21,22,15,2,2,15,2,2,3,48,0,10,8,0,0,7,6,96,7,6,14,7,11,31,21,22,2,36,0,8,9,1,7,6,1,7,11,124,21,22,7,14,0,10,8,0,0,7,9,1,7,6,14,7,11,31,21,22,2,3,9,1,3,11,0,10,8,0,0,7,9,0,7,6,14,7,11,130,21,22,15,2,2,3,2,9,1,15,2,2,23,3,19,130,25],
[1,0,11,2,1,9,1,7,9,0,7,6,14,7,11,130,21,5,3,3,22,19,132,25],
[1,0,329,2,-1,9,1,2,325,0,8,9,1,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,96,7,6,14,7,11,31,21,22,2,21,0,19,9,1,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,3,282,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,254,0,15,0,8,9,1,7,6,1,7,11,29,21,22,7,6,1,7,11,67,21,22,2,19,0,17,0,8,9,1,7,6,1,7,11,133,21,22,7,6,134,7,6,14,7,11,31,21,22,3,2,12,2,125,0,123,0,8,9,1,7,6,1,7,11,135,21,22,7,0,107,0,98,6,35,7,0,89,0,19,6,67,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,62,0,19,6,29,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,35,0,15,0,8,9,1,7,6,1,7,11,136,21,22,7,6,1,7,11,67,21,22,2,10,0,8,9,1,7,6,1,7,11,137,21,22,3,2,12,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,3,36,0,35,0,8,9,1,7,6,1,7,11,29,21,22,7,0,19,6,29,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,138,21,22,7,14,0,8,8,0,0,7,6,1,7,11,29,21,22,7,14,0,44,8,1,0,7,0,35,0,8,9,1,7,6,1,7,11,34,21,22,7,0,19,6,34,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,138,21,22,7,6,14,7,11,16,21,22,15,4,2,3,18,0,17,0,10,6,139,7,9,1,7,6,14,7,11,16,21,22,7,6,1,7,11,59,21,22,15,2,2,3,2,12,23,3,19,138,25],
[1,0,56,2,-1,1,0,25,1,-1,0,8,9,0,7,6,1,7,11,29,21,22,7,0,8,9,0,7,6,1,7,11,33,21,22,7,6,14,7,11,138,21,5,3,2,22,7,0,22,1,0,11,2,-1,9,1,7,9,0,7,6,14,7,11,15,21,5,3,3,22,7,9,1,7,9,0,7,6,17,7,11,110,21,22,7,6,14,7,11,111,21,5,3,3,22,19,129,25],
[1,0,82,1,-1,0,8,9,0,7,6,1,7,11,67,21,22,2,26,0,24,0,15,0,8,9,0,7,6,1,7,11,29,21,22,7,6,1,7,11,54,21,22,7,6,96,7,6,14,7,11,31,21,22,3,2,12,2,17,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,127,21,5,2,2,22,3,29,9,0,2,26,0,17,0,8,9,0,7,6,1,7,11,54,21,22,7,6,96,7,6,14,7,11,31,21,22,7,6,1,7,11,43,21,5,2,2,22,3,2,12,23,2,19,127,25],
[1,0,157,1,-1,9,0,2,153,0,8,9,0,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,96,7,6,14,7,11,31,21,22,2,10,0,8,9,0,7,6,1,7,11,15,21,22,3,121,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,93,0,8,9,0,7,6,1,7,11,29,21,22,7,14,0,8,8,0,0,7,6,1,7,11,67,21,22,2,19,0,17,0,8,8,0,0,7,6,1,7,11,29,21,22,7,6,134,7,6,14,7,11,31,21,22,3,2,12,2,17,0,15,0,8,8,0,0,7,6,1,7,11,33,21,22,7,6,1,7,11,15,21,22,3,9,0,8,8,0,0,7,6,1,7,11,140,21,22,15,2,2,7,14,0,24,0,15,0,8,9,0,7,6,1,7,11,34,21,22,7,6,1,7,11,140,21,22,7,8,0,0,7,6,14,7,11,16,21,22,15,2,2,3,18,0,17,0,10,6,139,7,9,0,7,6,14,7,11,16,21,22,7,6,1,7,11,59,21,22,15,2,2,3,2,12,23,2,19,140,25],
[1,0,71,4,-1,9,2,2,67,0,8,9,2,7,6,1,7,11,29,21,22,7,14,0,10,9,3,7,8,0,0,7,6,14,7,11,141,21,22,7,14,8,0,0,2,11,0,9,9,1,7,8,0,0,7,6,14,7,9,0,22,3,31,0,30,9,3,7,0,8,9,2,7,6,1,7,11,34,21,22,7,0,10,6,1,7,9,1,7,6,14,7,11,16,21,22,7,9,0,7,6,19,7,11,142,21,22,15,4,2,3,2,12,23,5,19,142,25],
[1,0,97,7,-1,0,21,9,6,7,0,8,9,5,7,6,1,7,11,29,21,22,7,6,3,7,9,3,7,6,19,7,11,142,21,22,7,14,8,0,0,2,3,8,0,0,3,68,0,17,9,6,7,0,8,9,5,7,6,1,7,11,33,21,22,7,6,14,7,11,141,21,22,7,14,8,0,0,2,9,0,7,8,0,0,7,6,1,7,9,2,22,3,38,0,17,9,6,7,0,8,9,5,7,6,1,7,11,44,21,22,7,6,14,7,11,141,21,22,7,14,8,0,0,2,9,0,7,8,0,0,7,6,1,7,9,1,22,3,8,0,7,9,6,7,6,1,7,9,0,22,15,2,2,15,2,2,15,2,2,23,8,19,143,25],
[1,0,235,3,-1,9,2,7,9,1,7,9,0,7,9,0,7,1,1,38,2,-1,6,144,7,0,28,9,1,7,0,19,9,0,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,7,9,0,7,1,1,29,1,-1,6,145,7,0,19,9,0,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,9,0,7,1,1,29,1,-1,6,146,7,0,19,9,0,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,9,0,7,1,1,114,1,-1,9,0,7,14,0,10,8,0,0,7,12,7,6,14,7,11,31,21,22,2,21,6,147,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,3,78,0,10,8,0,0,7,13,7,6,14,7,11,31,21,22,2,21,6,148,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,3,47,6,149,7,0,37,9,0,7,0,28,0,19,6,150,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,4,22,15,2,2,23,2,7,6,151,7,11,143,21,5,8,4,22,19,152,25],
[1,0,598,2,-1,0,8,9,1,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,96,7,6,14,7,11,31,21,22,2,30,0,17,0,10,9,1,7,9,0,7,6,14,7,11,105,21,22,7,6,1,7,11,43,21,22,2,10,9,1,7,6,1,7,11,15,21,5,2,5,22,3,2,12,3,546,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,534,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,18,7,6,14,7,11,31,21,22,2,21,0,19,1,0,3,1,0,12,23,2,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,491,0,10,8,0,0,7,6,13,7,6,14,7,11,31,21,22,2,50,0,48,9,0,7,1,1,30,2,-1,9,0,7,0,20,11,31,21,7,0,8,9,1,7,6,1,7,11,116,21,22,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,153,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,431,0,10,8,0,0,7,6,22,7,6,14,7,11,31,21,22,2,129,0,127,9,0,7,1,1,109,2,-1,0,18,11,29,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,0,18,11,33,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,14,11,31,21,7,0,36,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,153,21,5,3,2,22,7,8,0,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,22,7,0,22,9,0,7,0,13,11,31,21,7,8,0,1,7,10,0,7,6,17,7,11,108,21,22,7,6,14,7,11,153,21,22,7,6,17,7,11,108,21,5,4,6,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,292,0,10,8,0,0,7,6,65,7,6,14,7,11,31,21,22,2,57,0,55,9,0,7,1,1,37,1,0,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,153,21,5,3,2,22,7,9,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,5,2,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,225,0,10,8,0,0,7,6,32,7,6,14,7,11,31,21,22,2,57,0,55,9,0,7,1,1,37,1,0,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,153,21,5,3,2,22,7,9,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,5,2,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,158,0,10,8,0,0,7,6,9,7,6,14,7,11,31,21,22,2,70,0,68,9,0,7,1,1,50,2,-1,11,31,21,7,0,17,0,10,9,1,7,10,0,7,6,14,7,11,105,21,22,7,6,1,7,11,43,21,22,2,10,0,8,9,1,7,6,1,7,11,15,21,22,3,2,12,7,0,10,9,0,7,10,0,7,6,14,7,11,153,21,22,7,6,17,7,11,108,21,5,4,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,78,0,10,8,0,0,7,6,156,7,6,14,7,11,31,21,22,2,31,0,29,9,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,153,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,37,0,36,0,29,0,22,9,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,153,21,5,3,2,22,7,9,1,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,22,15,2,2,3,2,12,15,2,2,23,3,19,153,25],
[1,0,545,2,-1,0,8,9,1,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,521,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,18,7,6,14,7,11,31,21,22,2,21,0,19,1,0,3,1,-1,12,23,2,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,478,0,10,8,0,0,7,6,13,7,6,14,7,11,31,21,22,2,47,0,45,9,0,7,1,1,27,2,-1,9,0,7,0,17,10,0,7,0,8,9,1,7,6,1,7,11,116,21,22,7,6,14,7,11,113,21,22,7,6,14,7,11,157,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,421,0,10,8,0,0,7,6,22,7,6,14,7,11,31,21,22,2,126,0,124,9,0,7,1,1,106,2,-1,0,18,11,29,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,0,18,11,33,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,14,11,31,21,7,0,36,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,157,21,5,3,2,22,7,8,0,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,22,7,0,19,9,0,7,0,10,10,0,7,8,0,1,7,6,14,7,11,113,21,22,7,6,14,7,11,157,21,22,7,6,17,7,11,108,21,5,4,6,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,285,0,10,8,0,0,7,6,65,7,6,14,7,11,31,21,22,2,57,0,55,9,0,7,1,1,37,1,0,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,157,21,5,3,2,22,7,9,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,5,2,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,218,0,10,8,0,0,7,6,32,7,6,14,7,11,31,21,22,2,57,0,55,9,0,7,1,1,37,1,0,0,29,0,22,10,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,157,21,5,3,2,22,7,9,0,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,5,2,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,151,0,10,8,0,0,7,6,9,7,6,14,7,11,31,21,22,2,63,0,61,9,0,7,1,1,43,2,-1,11,31,21,7,0,10,9,1,7,10,0,7,6,14,7,11,105,21,22,2,10,0,8,9,1,7,6,1,7,11,15,21,22,3,2,12,7,0,10,9,0,7,10,0,7,6,14,7,11,157,21,22,7,6,17,7,11,108,21,5,4,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,78,0,10,8,0,0,7,6,156,7,6,14,7,11,31,21,22,2,31,0,29,9,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,157,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,37,0,36,0,29,0,22,9,0,7,1,1,11,1,-1,9,0,7,10,0,7,6,14,7,11,157,21,5,3,2,22,7,9,1,7,6,14,7,11,52,21,22,7,6,1,7,11,154,21,22,7,6,1,7,11,155,21,22,15,2,2,3,2,12,15,2,2,23,3,19,157,25],
[1,0,138,3,-1,9,1,7,6,3,7,6,14,7,12,7,14,20,0,9,0,7,8,0,0,7,9,2,7,1,3,104,2,-1,9,1,2,100,0,17,0,8,9,1,7,6,1,7,11,29,21,22,7,10,0,7,6,14,7,11,105,21,22,2,55,6,158,7,0,44,9,0,7,0,35,0,26,0,8,9,1,7,6,1,7,11,34,21,22,7,0,10,9,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,10,1,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,3,27,0,8,9,1,7,6,1,7,11,34,21,22,7,0,10,9,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,10,1,21,5,3,3,22,3,2,10,2,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,3,4,22,19,159,25],
[1,0,141,1,-1,0,17,0,8,9,0,7,6,1,7,11,29,21,22,7,6,160,7,6,14,7,11,31,21,22,2,17,0,8,9,0,7,6,1,7,11,33,21,22,7,6,1,7,11,161,21,5,2,2,22,3,106,0,17,0,8,9,0,7,6,1,7,11,29,21,22,7,6,162,7,6,14,7,11,31,21,22,2,10,9,0,7,6,1,7,11,33,21,5,2,2,22,3,79,0,17,0,8,9,0,7,6,1,7,11,29,21,22,7,6,163,7,6,14,7,11,31,21,22,2,26,0,24,0,15,0,8,9,0,7,6,1,7,11,164,21,22,7,6,1,7,11,133,21,22,7,6,162,7,6,14,7,11,31,21,22,3,2,12,2,33,0,8,9,0,7,6,1,7,11,33,21,22,7,0,15,0,8,9,0,7,6,1,7,11,164,21,22,7,6,1,7,11,135,21,22,7,6,14,7,11,16,21,5,3,2,22,3,2,12,23,2,19,161,25],
[1,0,129,2,-1,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,163,7,6,14,7,11,31,21,22,2,69,6,163,7,0,58,0,17,0,8,9,1,7,6,1,7,11,33,21,22,7,9,0,7,6,14,7,11,16,21,22,7,0,33,0,8,9,1,7,6,1,7,11,165,21,22,7,0,17,0,8,9,1,7,6,1,7,11,166,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,5,22,3,38,6,163,7,0,28,9,0,7,0,19,9,0,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,5,22,15,2,2,23,3,19,167,25],
[1,0,59,3,-1,0,8,9,2,7,6,1,7,11,43,21,22,2,3,9,0,3,47,0,8,9,2,7,6,1,7,11,34,21,22,7,9,1,7,0,28,0,8,9,2,7,6,1,7,11,29,21,22,7,9,1,7,0,10,6,168,7,9,0,7,6,14,7,11,15,21,22,7,6,17,7,11,152,21,22,7,6,17,7,11,169,21,5,4,4,22,23,4,19,169,25],
[1,0,111,2,-1,9,1,2,107,0,8,9,0,7,6,1,7,11,29,21,22,7,0,8,9,0,7,6,1,7,11,33,21,22,7,0,8,9,0,7,6,1,7,11,44,21,22,7,14,0,76,8,0,0,7,8,0,1,7,8,0,2,7,1,3,61,1,-1,0,17,9,0,7,0,8,10,0,7,6,1,7,11,154,21,22,7,6,14,7,11,105,21,22,7,14,8,0,0,2,3,8,0,0,3,36,0,10,9,0,7,10,1,7,6,14,7,11,105,21,22,7,14,8,0,0,2,3,8,0,0,3,19,0,10,9,0,7,10,2,7,6,14,7,11,105,21,22,7,14,8,0,0,2,3,8,0,0,3,2,12,15,2,2,15,2,2,15,2,2,23,2,7,9,1,7,6,14,7,11,112,21,22,15,4,4,3,2,12,23,3,19,170,25],
[1,0,1990,4,-1,0,8,9,3,7,6,1,7,11,54,21,22,7,14,0,10,8,0,0,7,6,96,7,6,14,7,11,31,21,22,2,45,9,3,7,9,2,7,0,10,9,3,7,9,1,7,6,14,7,11,105,21,22,2,21,0,19,6,150,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,3,2,9,0,7,6,17,7,11,152,21,5,4,7,22,3,1923,0,10,8,0,0,7,6,50,7,6,14,7,11,31,21,22,2,1822,0,8,9,3,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,18,7,6,14,7,11,31,21,22,2,112,0,110,9,0,7,1,1,92,1,-1,0,10,9,0,7,12,7,6,14,7,11,31,21,22,2,21,6,147,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,3,60,0,10,9,0,7,13,7,6,14,7,11,31,21,22,2,21,6,148,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,3,29,6,171,7,0,19,9,0,7,0,10,10,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,23,2,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,1688,0,10,8,0,0,7,6,13,7,6,14,7,11,31,21,22,2,270,0,268,9,0,7,9,1,7,9,2,7,1,3,246,2,-1,0,8,9,1,7,6,1,7,11,118,21,22,7,0,8,9,1,7,6,1,7,11,116,21,22,7,14,0,10,9,0,7,8,0,0,7,6,14,7,11,153,21,22,7,0,10,9,0,7,8,0,0,7,6,14,7,11,157,21,22,7,14,0,10,8,0,1,7,10,0,7,6,14,7,11,170,21,22,7,14,8,0,0,7,10,0,7,0,180,6,172,7,0,171,0,8,8,0,0,7,6,1,7,11,30,21,22,7,0,155,0,8,8,2,0,7,6,1,7,11,30,21,22,7,0,139,8,2,1,7,0,130,0,112,8,1,0,7,0,8,8,2,0,7,6,1,7,11,173,21,22,7,0,94,9,0,7,0,26,12,7,0,17,0,8,8,2,0,7,6,1,7,11,173,21,22,7,8,0,0,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,22,11,31,21,7,8,1,0,7,0,10,10,1,7,8,0,0,7,6,14,7,11,114,21,22,7,6,17,7,11,108,21,22,7,0,35,6,162,7,0,26,0,17,0,8,8,2,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,16,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,22,7,6,17,7,11,159,21,22,7,0,10,10,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,17,7,11,169,21,5,4,11,22,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,1408,0,10,8,0,0,7,6,22,7,6,14,7,11,31,21,22,2,346,0,344,9,0,7,9,1,7,9,2,7,1,3,322,2,-1,0,18,11,29,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,0,18,11,33,21,7,0,8,9,1,7,6,1,7,11,28,21,22,7,6,14,7,11,52,21,22,7,14,0,8,8,0,0,7,6,1,7,11,173,21,22,7,0,40,0,24,0,8,8,0,1,7,6,1,7,11,173,21,22,7,0,8,10,0,7,6,1,7,11,29,21,22,7,6,14,7,11,50,21,22,7,0,8,10,0,7,6,1,7,11,34,21,22,7,6,14,7,11,50,21,22,7,0,10,9,0,7,8,0,1,7,6,14,7,11,157,21,22,7,0,19,0,10,9,0,7,8,0,1,7,6,14,7,11,153,21,22,7,10,0,7,6,14,7,11,170,21,22,7,0,17,0,8,8,0,1,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,16,21,22,7,14,0,10,10,2,7,8,0,0,7,6,14,7,11,167,21,22,7,14,0,71,6,175,7,0,62,0,53,8,1,2,7,0,8,8,2,1,7,6,1,7,11,173,21,22,7,0,35,9,0,7,8,1,3,7,0,22,11,31,21,7,8,1,2,7,0,10,10,1,7,8,1,1,7,6,14,7,11,114,21,22,7,6,17,7,11,108,21,22,7,8,0,0,7,6,19,7,11,174,21,22,7,6,17,7,11,159,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,15,7,5,7,6,14,7,12,7,14,20,0,10,1,7,10,0,7,8,0,0,7,1,3,68,2,-1,0,8,9,1,7,6,1,7,11,43,21,22,2,3,9,0,3,56,0,8,9,1,7,6,1,7,11,34,21,22,7,0,39,0,8,9,1,7,6,1,7,11,29,21,22,7,10,1,7,10,2,7,0,19,6,168,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,22,7,6,14,7,10,0,21,5,3,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,3,6,22,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,1052,0,10,8,0,0,7,6,65,7,6,14,7,11,31,21,22,2,115,0,113,9,0,7,9,1,7,9,2,7,1,3,91,1,0,0,8,9,0,7,6,1,7,11,173,21,22,7,10,2,7,6,14,7,12,7,14,20,0,10,1,7,10,0,7,8,0,0,7,1,3,50,2,-1,0,8,9,1,7,6,1,7,11,43,21,22,2,3,9,0,3,38,0,8,9,1,7,6,1,7,11,34,21,22,7,0,21,0,8,9,1,7,6,1,7,11,29,21,22,7,10,1,7,10,2,7,9,0,7,6,19,7,11,174,21,22,7,6,14,7,10,0,21,5,3,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,5,3,2,22,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,927,0,10,8,0,0,7,6,32,7,6,14,7,11,31,21,22,2,142,0,140,9,0,7,9,1,7,9,2,7,1,3,118,3,-1,0,32,9,1,7,10,0,7,10,1,7,0,19,6,160,7,0,10,10,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,22,7,0,32,9,0,7,10,0,7,10,1,7,0,19,6,160,7,0,10,10,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,22,7,14,9,2,7,10,0,7,10,1,7,0,37,6,176,7,0,28,8,0,1,7,0,19,8,0,0,7,0,10,10,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,5,5,7,22,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,775,0,10,8,0,0,7,6,9,7,6,14,7,11,31,21,22,2,250,0,248,9,1,7,9,0,7,9,2,7,1,3,226,2,-1,9,1,7,10,0,7,10,1,7,10,1,7,10,2,7,10,0,7,9,0,7,1,4,51,2,-1,10,0,7,10,1,7,10,2,7,0,37,6,177,7,0,28,9,1,7,0,19,9,0,7,0,10,10,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,5,5,3,22,7,10,1,7,10,2,7,10,0,7,9,0,7,1,4,42,1,-1,10,0,7,10,1,7,10,2,7,0,28,6,178,7,0,19,9,0,7,0,10,10,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,5,5,2,22,7,10,1,7,10,2,7,10,0,7,9,0,7,1,4,42,1,-1,10,0,7,10,1,7,10,2,7,0,28,6,179,7,0,19,9,0,7,0,10,10,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,5,5,2,22,7,10,1,7,10,2,7,10,0,7,9,0,7,1,4,42,1,-1,10,0,7,10,1,7,10,2,7,0,28,6,180,7,0,19,9,0,7,0,10,10,3,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,5,5,2,22,7,6,151,7,11,143,21,5,8,3,22,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,515,0,10,8,0,0,7,6,156,7,6,14,7,11,31,21,22,2,234,0,232,9,0,7,9,1,7,9,2,7,1,3,210,1,-1,10,1,7,10,0,7,9,0,7,1,3,145,1,-1,6,181,7,0,135,9,0,7,0,126,0,117,6,168,7,0,108,0,99,6,171,7,0,90,6,1,7,0,81,0,72,6,168,7,0,63,0,54,10,0,7,10,1,7,10,2,7,0,10,6,3,7,9,0,7,6,14,7,11,131,21,22,2,30,0,28,6,182,7,0,19,6,14,7,0,10,9,0,7,6,183,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,3,2,6,184,7,6,19,7,11,174,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,2,22,7,14,0,8,10,2,7,6,1,7,11,161,21,22,7,14,8,0,0,2,9,8,0,0,7,6,1,7,8,1,0,5,2,6,22,3,35,6,185,7,0,25,10,2,7,0,16,0,7,6,3,7,6,1,7,8,1,0,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,6,22,15,4,2,23,2,7,0,8,9,3,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,22,3,271,0,270,0,45,0,38,0,8,9,3,7,6,1,7,11,34,21,22,7,0,22,0,15,0,8,9,3,7,6,1,7,11,34,21,22,7,6,1,7,11,30,21,22,7,6,1,7,11,15,21,22,7,6,14,7,11,16,21,22,7,6,1,7,11,173,21,22,7,0,86,0,8,9,3,7,6,1,7,11,29,21,22,7,9,2,7,9,1,7,0,8,9,0,7,6,1,7,11,161,21,22,7,14,8,0,0,2,53,0,51,6,182,7,0,42,0,24,0,15,0,8,9,3,7,6,1,7,11,34,21,22,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,16,21,22,7,0,10,8,0,0,7,6,183,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,3,2,6,184,15,2,2,7,6,19,7,11,174,21,22,7,6,14,7,12,7,14,20,0,9,1,7,9,2,7,8,0,0,7,9,0,7,1,4,106,2,-1,0,8,9,1,7,6,1,7,11,43,21,22,2,41,0,8,10,0,7,6,1,7,11,161,21,22,2,3,9,0,3,29,6,185,7,0,19,10,0,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,3,22,3,56,0,8,9,1,7,6,1,7,11,34,21,22,7,0,39,0,8,9,1,7,6,1,7,11,29,21,22,7,10,2,7,10,3,7,0,19,6,168,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,19,7,11,174,21,22,7,6,14,7,10,1,21,5,3,3,22,23,3,16,0,0,0,11,8,0,0,21,7,6,26,7,6,14,7,11,23,21,22,8,0,0,21,15,2,2,22,15,2,2,3,91,0,10,9,3,7,12,7,6,14,7,11,31,21,22,2,21,6,147,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,7,22,3,60,0,10,9,3,7,13,7,6,14,7,11,31,21,22,2,21,6,148,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,7,22,3,29,6,171,7,0,19,9,3,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,5,3,7,22,15,2,2,23,5,19,174,25],
[1,0,1995,2,-1,0,8,9,1,7,6,1,7,11,29,21,22,7,14,0,10,8,0,0,7,6,185,7,6,14,7,11,31,21,22,2,122,9,0,7,1,1,102,2,-1,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,14,0,35,6,185,7,0,26,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,16,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,37,8,0,0,7,0,28,9,1,7,0,19,10,0,7,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,17,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,16,21,22,7,6,14,7,11,50,21,5,3,5,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1851,0,10,8,0,0,7,6,172,7,6,14,7,11,31,21,22,2,149,9,0,7,1,1,129,5,-1,0,19,9,1,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,14,0,62,6,172,7,0,53,9,4,7,0,44,0,17,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,14,7,11,16,21,22,7,0,19,9,3,7,0,10,9,2,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,37,8,0,0,7,0,28,9,0,7,0,19,10,0,7,0,8,8,0,0,7,6,1,7,11,30,21,22,7,6,1,7,6,17,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,16,21,22,7,6,14,7,11,50,21,5,3,8,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1692,0,10,8,0,0,7,6,176,7,6,14,7,11,31,21,22,2,198,9,0,7,1,1,178,3,-1,0,19,9,2,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,14,0,8,8,0,0,7,6,1,7,11,30,21,22,7,14,0,21,9,1,7,0,12,10,0,7,8,0,0,7,6,14,7,6,17,7,11,16,21,22,7,6,14,7,11,186,21,22,7,14,0,8,8,0,0,7,6,1,7,11,30,21,22,7,14,0,28,6,176,7,0,19,0,10,8,2,0,7,6,14,7,6,14,7,11,16,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,77,8,3,0,7,0,68,0,28,6,187,7,0,19,0,10,8,0,0,7,6,1,7,6,14,7,11,16,21,22,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,32,8,1,0,7,0,23,9,0,7,0,14,10,0,7,8,2,0,7,8,0,0,7,6,14,7,6,19,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,16,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,16,21,22,7,6,14,7,11,50,21,5,3,12,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1484,0,10,8,0,0,7,6,181,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,181,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1407,0,10,8,0,0,7,6,182,7,6,14,7,11,31,21,22,2,76,9,0,7,1,1,56,3,-1,0,28,6,182,7,0,19,9,2,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,4,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1321,0,10,8,0,0,7,6,171,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,171,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1244,0,10,8,0,0,7,6,168,7,6,14,7,11,31,21,22,2,49,9,0,7,1,1,29,1,-1,6,188,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1185,0,10,8,0,0,7,6,144,7,6,14,7,11,31,21,22,2,76,9,0,7,1,1,56,3,-1,0,28,6,144,7,0,19,9,2,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,4,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1099,0,10,8,0,0,7,6,145,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,145,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,1022,0,10,8,0,0,7,6,146,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,146,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,945,0,10,8,0,0,7,6,149,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,149,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,868,0,10,8,0,0,7,6,147,7,6,14,7,11,31,21,22,2,49,9,0,7,1,1,29,1,-1,6,189,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,809,0,10,8,0,0,7,6,148,7,6,14,7,11,31,21,22,2,49,9,0,7,1,1,29,1,-1,6,190,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,750,0,10,8,0,0,7,6,175,7,6,14,7,11,31,21,22,2,49,9,0,7,1,1,29,1,-1,6,191,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,691,0,10,8,0,0,7,6,163,7,6,14,7,11,31,21,22,2,76,9,0,7,1,1,56,3,-1,0,28,6,163,7,0,19,9,2,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,4,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,605,0,10,8,0,0,7,6,177,7,6,14,7,11,31,21,22,2,76,9,0,7,1,1,56,3,-1,0,28,6,177,7,0,19,9,2,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,4,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,519,0,10,8,0,0,7,6,178,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,178,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,442,0,10,8,0,0,7,6,179,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,179,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,365,0,10,8,0,0,7,6,180,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,180,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,288,0,10,8,0,0,7,6,158,7,6,14,7,11,31,21,22,2,67,9,0,7,1,1,47,2,-1,0,19,6,158,7,0,10,9,1,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,3,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,211,0,10,8,0,0,7,6,150,7,6,14,7,11,31,21,22,2,49,9,0,7,1,1,29,1,-1,6,192,7,0,19,9,0,7,0,10,10,0,7,6,1,7,6,14,7,11,16,21,22,7,6,14,7,11,186,21,22,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,152,0,10,8,0,0,7,6,51,7,6,14,7,11,31,21,22,2,21,1,0,3,0,-1,6,183,23,1,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,121,0,10,8,0,0,7,6,162,7,6,14,7,11,31,21,22,2,47,1,0,29,1,-1,0,19,6,162,7,0,10,9,0,7,12,7,6,14,7,11,50,21,22,7,6,14,7,11,50,21,22,7,12,7,6,14,7,11,50,21,5,3,2,22,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,64,0,10,8,0,0,7,6,193,7,6,14,7,11,31,21,22,2,21,1,0,3,0,-1,6,194,23,1,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,33,0,10,8,0,0,7,6,160,7,6,14,7,11,31,21,22,2,21,1,0,3,1,-1,12,23,2,7,0,8,9,1,7,6,1,7,11,34,21,22,7,6,14,7,11,51,21,5,3,5,22,3,2,12,15,2,2,23,3,19,186,25],
[1,0,33,1,-1,0,23,0,10,9,0,7,12,7,6,14,7,11,130,21,22,7,12,7,12,7,6,195,7,6,19,7,11,174,21,22,7,6,3,7,6,14,7,11,186,21,5,3,2,22,19,196,25],
]);
preload_vals.push(["arc.core.compiler","1","***ns***","0","table","***macros***","***special_syntax***","***type_functions***","mac","assign","sref","annotate","(quote mac)","fn","2","list","+","3","quote","4","_","%shortfn","with","fn-name","5","rfn","self","afn","%pair","car","len","is","%if","cadr","cdr","if","and","uniq","or","let","def","it","aif","no","cddr","caselet","case","-","firstn","nthcdr","cons","apply","map1","reccase","type","unquote","unquote-splicing","find-qq-eval","\"cannot use ,@ after .\"","err","quasiquote","expand-qq","qq-pair","\",@ cannot be used immediately after `\"","nrev","do","withs","acons","w/uniq","g","idfn","compose","complement","***defns***","defns","ns","(quote special-syntax)","x","(x)","defss","special-syntax","regexp","\"^(.*[^:]):([^:].*)$\"","compose-ss","\"^\\\\~(.+)$\"","complement-ss","\"^(.+)\\\\.(.+)$\"","sexp-ss","\"^(.+)\\\\!(.+)$\"","sexp-with-quote-ss","\"^(.+?)::(.+)$\"","namespace","\"***\"","string","coerce","\"_type_fn***\"","sym","(quote type-function)","deftf","type-function","ref","***cons_type_fn***","***table_type_fn***","***string_type_fn***","isa","mem","%mem","%union","union","min","map","mappend","keep","set-minus","set-intersect","atom","dotted-to-proper","-1","dotted-pos","zip","dotted","dottify","undottify","ssyntax","ssexpand","rep","macex1","%complex-args?","arg","%complex-args","%macex","<","macex","caar","o","cadar","cddar","caddar","%%complex-args","\"Can't understand vars list\"","%complex-args-get-var","%pos","compile-lookup-let","compile-lookup","refer-let","refer-local","refer-free","refer-nil","refer-t","refer-global","indirect","7","compile-refer","find-free","flat","dedup","ccc","find-sets","box","make-boxes","ignore","tailp","return","exit-let","cdddr","caddr","cadddr","reduce-nest-exit","argument","collect-free","remove-globs","constant","close","rev","compile","enter-let","test","assign-let","assign-local","assign-free","assign-global","conti","shift","((apply))","(apply)","frame","preproc","jump","(argument)","(refer-nil)","(refer-t)","(enter-let)","(indirect)","halt","((halt))","(halt)","do-compile"]);
/** @} */
// arclib
/** @file arc.fasl { */
/** @} */
/** @} */
/** @file vm.js { */
var VM = classify("VM", {
  static: {
    operators:
/** @file operators.js { */
["frame",
 "close",
 "test",
 "jump",
 "conti",
 "shift",
 "constant",
 "argument",
 "refer-let",
 "refer-local",
 "refer-free",
 "refer-global",
 "refer-nil",
 "refer-t",
 "enter-let",
 "exit-let",
 "assign-let",
 "assign-local",
 "assign-free",
 "assign-global",
 "box",
 "indirect",
 "apply",
 "return",
 "continue-return",
 "halt"]
/** @} */
  },
  property: {
    x: null,
    p: 0,
    a: null,
    f: 0,
    l: 0,
    c: null,
    s: 0,
    count: 0,
    stack: null,
    reader: null,
    namespace: null,
    call_stack: null,
    recent_call_args: null,
    warn: null,
  },
  method: {
    init: function() {
      this.reader = new Reader();
      // initializing primitives.
      var prim_all = Primitives.all;
      for (var i = 0, l = prim_all.length; i<l; i++) {
        var prm = prim_all[i];
        var vars = prm.vars;
        for (var p in vars) {
          prm.ns.setBox(p, vars[p]);
        }
      }
      // starting with compiler namespace.
      this.ns = NameSpace.get('arc.core.compiler');
      this.init_def(preloads, preload_vals);
      // changing to user namespace.
      this.ns = NameSpace.create_with_default('user');
    },
    init_def: function(preloads, preload_vals) {
      var ops = VM.operators;
      for (var i=0,l=preloads.length; i<l; i++)
        (function(preload, preload_val) {
          for (var j=0,jl=preload.length; j<jl; j++)
            (function(line, vals) {
              var asm = [];
              for (var k=0,m=line.length; k<m; k++) {
                var op = ops[line[k]];
                switch (op) {
                case 'refer-local':
                case 'refer-free':
                case 'box':
                case 'test':
                case 'jump':
                case 'assign-local':
                case 'assign-free':
                case 'frame':
                case 'return':
                case 'continue-return':
                case 'conti':
                  asm.push([op, line[++k]|0]);
                  break;
                case 'exit-let':
                case 'shift':
                case 'refer-let':
                case 'assign-let':
                  asm.push([op, line[++k]|0, line[++k]|0]);
                  break;
                case 'close':
                  asm.push([op, line[++k]|0, line[++k]|0, line[++k]|0, line[++k]|0]);
                  break;
                case 'refer-global':
                case 'assign-global':
                  asm.push([op, vals[line[++k]|0]]);
                  break;
                case 'constant':
                  asm.push([op, this.reader.read(vals[line[++k]|0])]);
                  break;
                case 'indirect':
                case 'halt':
                case 'argument':
                case 'apply':
                case 'nuate':
                case 'refer-nil':
                case 'refer-t':
                case 'enter-let':
                  asm.push([op]);
                  break;
                default:
                }
              }
              this.set_asm(asm).run();
            }).call(this, preload[j], preload_val);
        }).call(this, preloads[i], preload_vals[i]);
    },
    set_asm: function(asm) {
      this.x = asm;
      return this;
    },
    load: function(codes) {
      this.x = [];
      while (codes !== nil) {
        var code = codes.car;
        var c = list_to_javascript_arr(code);
        c[0] = c[0].name;
        switch (c[0]) {
        case 'refer-local':
        case 'refer-free':
        case 'box':
        case 'test':
        case 'jump':
        case 'assign-local':
        case 'assign-free':
        case 'frame':
        case 'return':
        case 'continue-return':
        case 'conti':
          c[1] = (c[1]|0);
          break;
        case 'exit-let':
        case 'shift':
        case 'refer-let':
        case 'assign-let':
          c[1] = (c[1]|0);
          c[2] = (c[2]|0);
          break;
        case 'close':
          c[1] = (c[1]|0);
          c[2] = (c[2]|0);
          c[3] = (c[3]|0);
          c[4] = (c[4]|0);
          break;
        case 'refer-global':
        case 'assign-global':
          c[1] = (c[1].name);
          break;
        case 'constant':
        case 'indirect':
        case 'halt':
        case 'argument':
        case 'apply':
        case 'nuate':
        case 'refer-nil':
        case 'refer-t':
        case 'enter-let':
          break;
        }
        this.x.push(c);
        codes = codes.cdr;
      }
      return this;
    },
    load_string: function(asm) {
      var codes = this.reader.read(asm);
      this.load(codes);
      return this;
    },
    cleanup: function(globalp) {
      this.p = 0;
      this.a = null;
      this.f = 0;
      this.l = 0;
      this.c = null;
      this.s = 0;
      this.count = 0;
      this.stack = new Stack();
      this.call_stack = [];
      this.recent_call_args = [];
      this.warn = "";
      if (globalp) {
        this.x = null;
        this.ns = NameSpace.create_with_default('user');
      }
    },
    step: function() {
      return this.run(false, false, true);
    },
    arc_apply: function(fn, args) {
      var asm = [['frame', 0]];
      args.push(args.length);
      args.forEach(function(a) {
        asm.push.apply(asm, [['constant', a], ['argument']]);
      });
      asm.push.apply(asm, [['constant', fn], ['apply'], ['halt']]);
      asm[0][1] = asm.length - 1;
      this.cleanup();
      this.set_asm(asm);
      return this.run();
    },
    run_iter: function(step) {
      var n = 0, b = 0, v = 0, d = 0, m = 0, l = 0;
      n = n | 0; b = b | 0;
      v = v | 0; d = d | 0;
      m = m | 0; l = l | 0;
      var repeat = !step;
      do {
        var op = this.x[this.p];
        var code = op[0];
        switch (code) {
        case 'halt':
          return this.a;
        case 'enter-let':
          this.s = this.stack.push(this.l, this.s);
          this.l = this.s;
          this.p++;
          break;
        case 'exit-let':
          n = op[1];
          m = op[2];
          this.l -= n;
          this.s = this.l;
          this.l = this.stack.index(this.s, -m);
          this.p++;
          break;
        case 'refer-let':
          n = op[1];
          m = op[2];
          l = this.l;
          while (0 < n) { l = this.stack.index(l, 0); n--; }
          this.a = this.stack.index(l, m + 1);
          this.p++;
          break;
        case 'refer-local':
          n = op[1];
          this.a = this.stack.index(this.f, n + 1);
          this.p++;
          break;
        case 'refer-free':
          n = op[1];
          this.a = this.c.index(n);
          this.p++;
          break;
        case 'refer-global':
          this.a = this.ns.get(op[1]);
          this.x.splice(this.p, 1, ['constant', this.a]); // optimization
          this.p++;
          break;
        case 'refer-nil':
          this.a = nil;
          this.p++;
          break;
        case 'refer-t':
          this.a = t;
          this.p++;
          break;
        case 'indirect':
          this.a = this.a.unbox();
          this.p++;
          break;
        case 'constant':
          var obj = op[1];
          this.a = obj;
          this.p++;
          break;
        case 'close':
          n = op[1];
          b = op[2];
          v = op[3];
          d = op[4];
          this.a = new Closure(this.x, this.p + 1, n, v, d, this.stack, this.s, this.ns);
          this.p += b;
          this.s -= n;
          break;
        case 'box':
          n = op[1];
          this.stack.index_set(this.s, n + 1, new Box(this.stack.index(this.s, n + 1)));
          this.p++;
          break;
        case 'test':
          n = op[1];
          if (this.a !== nil) this.p++;
          else                this.p += n;
          break;
        case 'jump':
          n = op[1];
          this.p += n;
          break;
        case 'assign-let':
          n = op[1];
          m = op[2];
          l = this.l;
          while (0 < n) { l = this.stack.index(l, 0); n--; }
          this.stack.index(l, m + 1).setbox(this.a);
          this.p++;
          break;
        case 'assign-local':
          n = op[1];
          this.stack.index(this.f, n + 1).setbox(this.a);
          this.p++;
          break;
        case 'assign-free':
          n = op[1];
          this.c.index(n).setbox(this.a);
          this.p++;
          break;
        case 'assign-global':
          this.ns.setBox(op[1], this.a);
          this.p++;
          break;
        case 'frame':
          n = op[1];
          this.s = this.stack.push(
            [this.x, this.p + n],
            this.stack.push(
              this.f,
              this.stack.push(
                this.l,
                this.stack.push(
                  this.c,
                  this.s))));
          this.p++;
          break;
        case 'argument':
          this.s = this.stack.push(this.a, this.s);
          this.p++;
          break;
        case 'shift': // for tail-call only.
          n = op[1];
          m = op[2];
          this.s = this.stack.shift(n, m, this.s);
          this.ns = NameSpace.pop();
          this.call_stack.shift();
          this.p++;
          break;
        case 'apply':
          var fn = this.a;
          var fn_type = type(fn);
          if (fn_type !== s_fn) {
            var tfs = this.ns.get('***type_functions***');
            var tfn;
            if (tfs && (tfn = tfs.v.get(fn_type)) !== nil) {
              tfn = rep(tfn);
              // get original args len from the top of the stack..
              var vlen = this.stack.index(this.s, 0);
              // added fn as an argument.
              for (var k=0; k<vlen; k++) {
                this.stack.index_set(this.s, k, this.stack.index(this.s, k+1));
              }
              this.stack.index_set(this.s, k, fn);
              // restore args len + 1 into the top of the stack.
              this.s = this.stack.push(vlen + 1, this.s);
              fn = tfn;
            } else {
              throw new Error('Cannot invoke the type "' + fn_type.name + '". Please define the type function.');
            }
          }
          var vlen = this.stack.index(this.s, 0);
          var closurep = (fn instanceof Closure);
          var dotpos = fn.dotpos;
          // checking arglen.
          if ((dotpos < 0 && fn.arglen !== vlen) || (vlen < dotpos)) {
            throw new Error((closurep ? fn.name || 'nameless' : fn.prim_name) + ': arity mismatch;\n' +
                            'the expected number of arguments does not match the given number\n' +
                            'expected: ' + ((-1 < dotpos) ? ('>= ' + dotpos) : fn.arglen) + '\n' +
                            'given: ' + vlen);
          }
          this.recent_call_args = this.stack.range_get(this.s - 1 - vlen, this.s - 2);
          if (closurep) {
            this.x = fn.body;
            this.p = fn.pc;
            this.c = fn;
            NameSpace.push(this.ns);
            this.ns = fn.namespace;
            if (-1 < dotpos) {
              var lis = nil;
              for (var i = 0, l = (vlen - dotpos); i < l; i++) {
                lis = cons(this.stack.index(this.s, i + 1), lis);
              }
              var garbage_len = vlen - dotpos - 1;
              // when vlen === dotpos, this.s += 1 and lis is nil.
              this.s -= garbage_len;
              this.stack.index_set(this.s, 1, lis);
              this.stack.index_set(this.s, 0, vlen - garbage_len);
            }
            this.f = this.s;
            this.l = this.s;
            this.call_stack.unshift([fn.name, true]);
          } else {
            this.call_stack.unshift([fn.prim_name, false]);
            this.a = fn.apply(this, this.recent_call_args);
            this.call_stack.shift();
            if (this.a instanceof Call) {
              var code = this.a.codegen();
              this.s -= (vlen + 1);
              this.x = code;
              this.p = 0;
              this.a = nil;
            } else {
              var xp = this.stack.index(this.s, vlen + 1);
              this.x = xp[0];
              this.p = xp[1];
              this.f = this.stack.index(this.s, vlen + 2); // for continuation
              this.l = this.stack.index(this.s, vlen + 3); // for continuation
              this.c = this.stack.index(this.s, vlen + 4); // for continuation
              this.s = this.s - vlen - 5;
            }
          }
          break;
        case 'return':
          this.ns = NameSpace.pop();
          this.call_stack.shift();
          // don't break !!
        case 'continue-return':
          var n  = op[1];
          var ns = this.s - n;
          var xp = this.stack.index(ns, 0);
          this.x = xp[0];
          this.p = xp[1];
          this.f = this.stack.index(ns, 1);
          this.l = this.stack.index(ns, 2);
          this.c = this.stack.index(ns, 3);
          this.s = ns - 4;
          break;
        case 'conti':
          n = op[1];
          this.a = new Continuation(this.stack, n, this.s, this.ns);
          this.p++;
          break;
        case 'nuate':
          var stack = op[1];
          this.p++;
          this.s = this.stack.restore(stack);
          break;
        default:
          throw new Error('Error: Unknown operand. ' + code);
        }
        this.count++;
      } while (repeat);
    },
    run: function(asm_string, clean_all, step) {
      if (!step) this.cleanup(clean_all);
      if (asm_string)   this.load_string(asm_string);
      var ret = this.run_iter(step);
      var typ = type(ret);
      if (typ.name.match("^\%javascript\-.*$")) {
        this.warn += "[BUG]: Returned value is not arc-value '" + JSON.stringify(ret) + "'.\n"
      }
      return ret;
    },
    get_call_stack_string: function(lim) {
      lim = lim || Infinity;
      var default_name = '%NAMELESS';
      var res = "Stack Trace:\n_______________________________________\n";
      for (var i = 0, l = Math.min(this.call_stack.length, lim); i < l; i++) {
        var info = this.call_stack[i];
        var typ = info[1]; var args_str = "";
        if (i === 0) {
          args_str = "\n        EXECUTED " + stringify(cons(Symbol.get(info[0] || default_name), javascript_arr_to_list(this.recent_call_args)));
        }
        res += ("  " + i + "  " + (typ ? "fn" : "prim") + " '" + (info[0] || default_name) + "'" + args_str + "\n");
      }
      return res;
    }
  }
});
ArcJS.VM = VM;
/** @} */
/** @file context.js { */
var Context = classify("Context", {
  property: {
    vm: null
  },
  method: {
    init: function() {
      this.vm = new VM();
    },
    compile: function(expr) {
      var asm = [
        ['frame', 8],
        ['constant', expr],
        ['argument'],
        ['constant', 1],
        ['argument'],
        ['refer-global', 'do-compile'],
        ['indirect'],
        ['apply'],
        ['halt']
      ];
      this.vm.cleanup();
      this.vm.set_asm(asm);
      return this.vm.run();
    },
    eval_asm:  function(asm) {
      this.vm.cleanup();
      this.vm.load(asm);
      return this.vm.run();
    },
    eval_expr: function(expr) {
      var asm = this.compile(expr);
      return this.eval_asm(asm);
    },
    read: function(str) {
      return this.vm.reader.read(str);
    },
    evaluate: function(str) {
      var expr = this.read(str);
      var result = nil;
      while (expr !== Reader.EOF) {
        result = this.eval_expr(expr);
        expr = this.read();
      }
      return result;
    }
  }
});
ArcJS.Context = Context;
var default_context = null;
var context = function context() {
  if (default_context) return default_context;
  default_context = new Context();
  return default_context;
}
ArcJS.context = context;
/** @} */
  return ArcJS;
}).call(typeof exports !== 'undefined' ? exports : {});
/** @} */