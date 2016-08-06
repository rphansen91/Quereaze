##Quereaze

[![Travis](https://img.shields.io/travis/rphansen91/Quereaze.svg?style=flat-square)](https://travis-ci.org/rphansen91/Quereaze)
[![Code Coverage](https://img.shields.io/codecov/c/github/rphansen91/Quereaze/master.svg?style=flat-square)](https://codecov.io/github/rphansen91/Quereaze)
[![version](https://img.shields.io/npm/v/quereaze.svg?style=flat-square)](https://www.npmjs.com/package/quereaze)
[![downloads](https://img.shields.io/npm/dm/quereaze.svg?style=flat-square)](http://npm-stat.com/charts.html?package=quereaze&from=2016-08-01)
[![ISC License](https://img.shields.io/npm/l/quereaze.svg?style=flat-square)](http://opensource.org/licenses/ISC)

> Easily build **IO UI's** that utilize `Undo, History, and Abort Http Request Logic`.
> Simple html syntax combined with declaritive typing allow the library to keep a
> **memoized** history of parameters.

[GITHUB](https://github.com/rphansen91/Quereaze)
================= 
[DEMO](https://rphansen91.github.io/Quereaze/) 
=================

Table of contents
=================

  * [Table of contents](#table-of-contents)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Constructor](#constructor)
    * [IO](#io)
    * [Http](#http)
  * [Conclusion](#conclusion)
  * [Dependencies](#dependencies)

Installation
============

`npm install quereaze -S`

Usage
=====

Constructor
-----------

> Used as constructor for [`QuereazeIO`](#io) and [`QuereazeHttp`](#http)

    * root: HTMLElement
    * defaults: JS Object describing parameters
    * template: Optional, can be supplied in constructor or inline with root

    Example: 

    {
        root: document.getElementById("root"),
        defaults: {
            strKey: "",
            numKey: 0,
            boolKey:  
        },
        template: `
            <input type="text" quereaze="strKey" />
            <input type="number" quereaze="numKey" />
            <input type="checkbox" quereaze="boolKey" />
            <button quereaze-submit>Submit</button>
        `
    }

1. String: (defaultValue = "")
    `<input type="text" quereaze="strKey" />`

2. Number: (defaultValue = 0)
    `<input type="number" quereaze="numKey" />`

3. Boolean: (defaultValue = false)
    `<input type="checkbox" quereaze="boolKey" />`

4. Submit On Click (Optional)
    `<button quereaze-submit>Submit</button>`

The `quereaze-submit` element is optional.
This is because all the `quereaze` elements
are wired with [rxjs.Observable](https://github.com/ReactiveX/rxjs) sequences.
These sequences emit the new query params 
whenever the `enter` key is pressed.

The template will be parsed and matched against the defaults supplied to Quereaze
The defaults can contain additional params but an error will throw if additional 
quereaze params are found in the template of the values in the 
template do not === the default values.

Once the constructor has been created it is sent of to one of the Quereaze 
sequences below to be wired up.

IO
--

    import { QuereazeIO } from 'quereaze';

    QuereazeIO({
        ...Constructor
    })
    ({
        onSubmit: ({ data, quereaze }) => {
            quereaze.save()
            quereaze.history; //Array of all submitted params
            data // Current 
        }
    })

With the simple declaritive syntax Quereaze is able to keep 
params synced and alert the onSubmit handler. All of the 
DOM interaction is abstracted and the new params can be used
to update the UI as needed.  

The `quereaze.history` Array also allows for a dead simple
integration of History or Undo actions.

HTTP
---- 

    import { QuereazeHttp } from 'quereaze';

    QuereazeHttp({
        ...Constructor
    })
    ({
        onSubmit: (params) => {
            // Show Loader
            return {
                method: "GET"|"POST"|"PUT"|"DELETE",
                url: "", // Enpoint, params available to construct
                body: params // Make changes to params if needed
            }
        },

        onSuccess: ({ data, quereaze }) => {
            // Stop Loader
            // Display response data
        },

        onError: (err) => console.log(err)
    })

With two additional handlers Quereaze is able to not only
keep form parameters in sync but also fire XHR responses
to a specified endpoints.

Conclusion
==========

The days of manually interacting with the DOM are long gone.
Browsers API's are constantly changing and deprecating
and working with them alongside complex Business logic is a 
very complicated task. Often leading to bugs and hours of 
focus spent not on the end goal but on StackOverflow.

With Quereaze, all the focus now is on the **3 main** 
components that make up a Robust IO Sttate Machine.

1. User Experience, Style
2. Where data lives, how it's accessed
3. Displaying Data

All the state management, HTMLInput interaction is 
abstracted away and given back to the user in a
chronological sequence of events which is much 
easier to reason with.

Dependencies
============

- [rxjs](https://www.npmjs.com/package/rxjs)