# content-injection-query-rules-demo

Create a Query Rule with "Return Custom Data" as a consequence that returns this type of object:

```javascript
{
    "injected": true, //Mandatory
    "image":"https://example.com/image.jpg", //Link of the image
    "button":"Click on Me", //Content of the button
    "target":"http://example.com", //Target of the click
    "position":5 //Position of the injected content in the result set - Mandatory
}
```