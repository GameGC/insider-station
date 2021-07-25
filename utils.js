function isNull(obj){
    if (typeof obj == 'undefined') return true;
    else if(obj==null) return true;
    return false;
}
// eslint-disable-next-line no-extend-native
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
//800384 is max
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
};

function int16(v) {
    return (v << 16) >> 16;
}
module .exports = String.prototype.hashCode
module .exports = String.prototype.isNull
module .exports = String.prototype.get_TikerHash
