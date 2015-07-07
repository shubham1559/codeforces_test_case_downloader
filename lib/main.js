//var file = require("sdk/io/file");
var data = require("sdk/self").data;
//var windows = require("sdk/windows");
var contextMenu = require('sdk/context-menu');
var { Cc, Ci,Cu,C } = require("chrome");
var tabs = require("sdk/tabs");
const fileIO = require("sdk/io/file");

var system = require("sdk/system");
var wd=system.pathFor("ProfD");
var url= require("sdk/url");


Cu.import("resource://gre/modules/FileUtils.jsm");

var zpfilename="codeforces.zip";

var inputfile=fileIO.join(wd,"input.txt");
var outputfile= fileIO.join(wd,"output.txt");

var zipWriter = Cc["@mozilla.org/zipwriter;1"].createInstance(Ci.nsIZipWriter);

var zipFile = FileUtils.getFile("ProfD", [zpfilename], false);
/*
--------------
CONTEXT MENU
--------------
*/
contextMenu.Item({
    label: "Download Inputs & Outputs",
    contentScriptFile: "./inc.js", 
    onMessage: function on_message( inputt ) {        
        zipWriter.open(zipFile, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE);
        for(var i=0,z;z=inputt[i];i++)
        {
            processOne(z,i);
        }
        zipWriter.close();
        var pth=url.fromFilename(zipFile.path);
        tabs.open(pth);
    }
});
function writeTextToFile(text, filename) {
  var TextWriter = fileIO.open(filename, "w");
  if (!TextWriter.closed) {
    TextWriter.write(text);
    TextWriter.close();
  }
}
function addFileToInput(filename,basename)
{
    var savedFile = new FileUtils.File(filename);
    zipWriter.addEntryFile("inp/"+basename, zipWriter.COMPRESSION_BEST, savedFile, false);
}
function addFileToOutput(filename,basename)
{
    var savedFile = new FileUtils.File(filename);
    zipWriter.addEntryFile("out/"+basename, zipWriter.COMPRESSION_BEST, savedFile, false);
}
function processOne(val,index)
{
    var outname="output"+(index+1)+".txt";
    var inname="input"+(index+1)+".txt";
    writeTextToFile(val[0],inputfile);
    writeTextToFile(val[1],outputfile);
    addFileToInput(inputfile,inname);
    addFileToOutput(outputfile,outname);
}