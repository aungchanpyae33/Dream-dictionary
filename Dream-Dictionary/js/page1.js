"use strict";
const inputElement = document.querySelector("input");
const specItem = document.querySelector(".specItems");
let page2;
const url = "../DreamDictionary.json";

import { go } from "../component.js";
go(page2, url, inputElement, specItem);
