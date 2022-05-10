export default function extractParams(configString){
    var paramsObject = readHeader(Object(),configString);
    
    var configArrayNested = configString.split('\n')
        .map(function(d){
            //remove leading and trailing spaces
            return d.trim();
        })
        .filter(function(d){
            // remove empty lines
            return (d!="")
        })
        .filter(function(d){
            // remove comments
            return (!(
                d.startsWith("#")
            ));
        })
        .filter(function(d){
            // only keep lines with following pattern
            // param[:=]value
            return (d.match(/.*:|=.*/i));
        })
        .map(function(d){
            //split lines in key and value
            let indexOfFirstColonEqualSign = d.search(/:|=/i);
            let firstPart = d.substring(0,indexOfFirstColonEqualSign);
            let secondPart = d.substring(indexOfFirstColonEqualSign+1);
            return [firstPart,secondPart];
        })
        .map(function(d){
            //split values by ','
            return [d[0],d[1].split(',')];
        })
        ; 
    
    for (let i=0;i<configArrayNested.length;i++){
        let key=configArrayNested[i][0];
        let value=configArrayNested[i][1];
        paramsObject[key]=value;
    }
    return paramsObject;
}

function findValue(configString,paramToFind){
    //console.log(configString)
    return configString.split("\n")
        .filter(function(d){
            return d.includes(paramToFind)
        })[0]
        .replace(paramToFind,"")
        ;
}

function readHeader(configObject, configString){
    configObject.pedigreeMapping = Object();
    configObject.pedigreeMapping.paternalGrandfather = findValue(configString,"# paternalGrandfather=");
    configObject.pedigreeMapping.paternalGrandmother = findValue(configString,"# paternalGrandmother=");
    configObject.pedigreeMapping.maternalGrandfather = findValue(configString,"# maternalGrandfather=");
    configObject.pedigreeMapping.maternalGrandmother = findValue(configString,"# maternalGrandmother=");
    configObject.pedigreeMapping.father = findValue(configString,"# father=");
    configObject.pedigreeMapping.mother = findValue(configString,"# mother=");
    configObject.pedigreeMapping.siblings = findValue(configString,"# siblings=").split(',');
    configObject.pedigreeMapping.embryos = findValue(configString,"# embryos=").split(',');    
    return configObject;
}