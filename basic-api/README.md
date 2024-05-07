# Basic API
We are going to treat this as the very basics of creating an API.  We will look at HTTP as a basis, but will also touch on RPC, TCP, and proto-buffers.

## Terminology
I am going to write this from my own experience, so please bear-in-mind the terminology throughout will not necessarily be a 1-to-1 with some of the
terms you have heard in your CS program.  I try my best to adhere to industry standard, but where I have less exposure, I sometimes make things up 
as I go.

## Overview
What is an API?  An API is simply an interface that one application uses to transfer data to another.  Most commonly it is machine-to-machine, but we
can also publish our APIs to be public, which can be consumed by people as well.  
APIs use the various data formats to transfer said data, like binary or encoded strings.  One of the most common on the web is base64 encoded json data.
When choosing which format to send data in, it is usually best practice to consider how the data is to be consumed, then choose the most appropriate
format for that audience.  Web based applications almost entirely use encoded `json` as their format of choice, as it is easily parsed by both the 
javascript runtime of the browsers, and the humans that are building their various applications on top of it.  
Low-level systems on the other hand, often talk in binary, as there are rarely any humans that would need to interact with the data directly, and speed
and memory is of the utmost in these applications.  
Many different frameworks for APIs exist, and in specific languages you will probably find several that are worthy of use.  
A small non-exhaustive list of the most popular API frameworks:
- Flask (Python)
- Express (Javascript)
- .NET (C#)
- gRPC