/*

 XMS - Online Web Development

 Copyright (c) 2010 Cezar Lucan cezar.lucan@aws-dms.com
 Licensed under GPL license.
 http://www.aws-dms.com

 Date: 2010-10-24
*/
function awsNativeDOMSerializer(a){try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){alert("Xmlserializer not supported")}}return!1};
