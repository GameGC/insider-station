
export function removePropNonRef(obj:JSON|Object|any, propToDelete:string)
{
    removeProp(obj, propToDelete)
    return obj;
}

export function removeProp(obj:JSON|Object|any, propToDelete:string) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                removeProp(obj[property], propToDelete);
            } else {
                if (property === propToDelete) {
                    delete obj[property];
                }
            }
        }
        if(typeof obj[property] != "undefined"){
            if (obj[property] === propToDelete)
                delete obj[property];
        }
    }
}
export function removeProps(obj:JSON|Object|any, propsToDelete:string[]) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                removeProps(obj[property], propsToDelete);
            } else {
                for (let prop of propsToDelete) {
                    if (property === prop) {
                        delete obj[property];
                    }
                }
            }
        }
        if(typeof obj[property] != "undefined"){
            for (let prop of propsToDelete)
                if (obj[property] === prop)
                    delete obj[property];
        }
    }
}

export function removePropPartString(obj:JSON|Object|any, propToDelete:string):any
{
    let string = JSON.stringify(obj);
    string= string.split(propToDelete).join("");
    return JSON.parse(string)
}
export function removePropPartsString(obj:JSON|Object|any, propToDelete:string[]):any
{
    let string = JSON.stringify(obj);
    for (let str of propToDelete) {
        string= string.split(str).join("");
    }
    return JSON.parse(string)
}
export function replacePropPartString(obj:JSON|Object|any, propToDelete:string,propToRepl:string):any
{
    let string = JSON.stringify(obj);
    string= string.split(propToDelete).join(propToRepl);
    return JSON.parse(string)
}

export function mergeJson(target) {
    for (var argi = 1; argi < arguments.length; argi++) {
        var source = arguments[argi];
        for (var key in source) {
            if (!(key in target)) {
                target[key] = [];
            }
            for (var i = 0; i < source[key].length; i++) {
                target[key].push(source[key][i]);
            }
        }
    }
    return target;
}


export function toFixed(value:number, precision:number) {
    const power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}

declare global {
    export interface String {
        get_TikerHash(): number;
    }
}
String.prototype.get_TikerHash = function() {
    const sourceStr= this.toLowerCase();
    const alphabet = "0abcdefghijklmnopqrstuvwxyz";
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = alphabet.indexOf(sourceStr[i]);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
        hash = int16(hash)
    }
    return hash;
};;


function int16(v) {
    return (v << 16) >> 16;
}
